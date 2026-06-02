#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WP_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${WP_DIR}"

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "Created wordpress/.env from .env.example"
fi

# shellcheck disable=SC1091
set -a
source .env
set +a

WP_URL="http://wordpress"
GRAPHQL_URL="http://localhost:${WP_PORT:-8081}/graphql"

echo "Starting WordPress stack..."
docker compose up -d db wordpress

echo "Waiting for WordPress to respond..."
for i in $(seq 1 60); do
  if docker compose run --rm wpcli wp core is-installed --url="${WP_URL}" >/dev/null 2>&1; then
    INSTALLED=1
    break
  fi
  if docker compose run --rm wpcli wp core version --url="${WP_URL}" >/dev/null 2>&1; then
    INSTALLED=0
    break
  fi
  sleep 3
done

if [[ "${INSTALLED:-}" == "" ]]; then
  echo "WordPress did not become ready in time." >&2
  exit 1
fi

if [[ "${INSTALLED}" == "0" ]]; then
  echo "Installing WordPress core..."
  docker compose run --rm wpcli wp core install \
    --url="${WP_URL}" \
    --title="${WP_SITE_TITLE:-Portfolio CMS}" \
    --admin_user="${WP_ADMIN_USER:-admin}" \
    --admin_password="${WP_ADMIN_PASSWORD:-admin}" \
    --admin_email="${WP_ADMIN_EMAIL:-admin@example.local}" \
    --skip-email
fi

echo "Installing GraphQL plugins..."
docker compose run --rm wpcli wp plugin install wp-graphql --activate --force
docker compose run --rm wpcli wp plugin install advanced-custom-fields --activate --force
docker compose run --rm wpcli wp plugin install wpgraphql-acf --activate --force

echo "ACF field groups are loaded from wp-content/acf-json (see mu-plugins/portfolio-cms.php)."
echo "In wp-admin, open Custom Fields once if groups need a manual sync."

permalink_page_id() {
  local slug="$1"
  docker compose run --rm wpcli wp post list --post_type=page --name="${slug}" --field=ID --format=ids 2>/dev/null | tr -d '\r'
}

create_page_if_missing() {
  local slug="$1"
  local title="$2"
  local id
  id="$(permalink_page_id "${slug}")"
  if [[ -z "${id}" ]]; then
    docker compose run --rm wpcli wp post create \
      --post_type=page \
      --post_status=publish \
      --post_title="${title}" \
      --post_name="${slug}" \
      --porcelain
  else
    echo "${id}"
  fi
}

echo "Creating pages expected by the Next.js app..."
HOME_ID="$(create_page_if_missing home "Home")"
ABOUT_ID="$(create_page_if_missing about "about me.")"
CONTACT_ID="$(create_page_if_missing contact "contact.")"
PORTFOLIO_ID="$(create_page_if_missing portfolio "Portfolio.")"
ALL_ID="$(create_page_if_missing all "All")"

docker compose run --rm wpcli wp option update show_on_front page
docker compose run --rm wpcli wp option update page_on_front "${HOME_ID}"
docker compose run --rm wpcli wp rewrite structure '/%postname%/' --hard
docker compose run --rm wpcli wp rewrite flush --hard

seed_home_fields() {
  docker compose run --rm wpcli wp eval "
    if (function_exists('update_field')) {
      update_field('presentingText', 'Design & development portfolio', ${HOME_ID});
      update_field('homePageTitle', 'Creative work fueled by curiosity', ${HOME_ID});
      update_field('buttonText', 'Explore works', ${HOME_ID});
      update_field('buttonUrl', '#posts', ${HOME_ID});
      update_field('freelanceProjects', [
        'freelanceTitle' => 'Freelance',
        'freelanceDescription' => 'Available for new projects',
        'freelanceProjectsButton' => 'Let\\'s talk',
        'freelanceProjectsLink' => ['title' => 'Contact', 'url' => '/contact', 'target' => ''],
      ], ${HOME_ID});
    }
  "
}

seed_about_fields() {
  docker compose run --rm wpcli wp eval "
    if (function_exists('update_field')) {
      update_field('presentingText', 'About me', ${ABOUT_ID});
      update_field('aboutPageTitle', 'Eleonora Nocentini Sköldebrink', ${ABOUT_ID});
    }
  "
}

seed_all_fields() {
  docker compose run --rm wpcli wp eval "
    if (function_exists('update_field')) {
      update_field('allPageTitle', 'contact.', ${ALL_ID});
      update_field('orkarInteMer', 'Available for freelance projects — let us build something meaningful together.', ${ALL_ID});
    }
  "
}

seed_home_fields
seed_about_fields
seed_all_fields

create_sample_post() {
  local slug="$1"
  local title="$2"
  local existing
  existing="$(docker compose run --rm wpcli wp post list --post_type=post --name="${slug}" --field=ID --format=ids 2>/dev/null | tr -d '\r')"
  if [[ -n "${existing}" ]]; then
    echo "${existing}"
    return
  fi
  local post_id
  post_id="$(docker compose run --rm wpcli wp post create \
    --post_type=post \
    --post_status=publish \
    --post_title="${title}" \
    --post_name="${slug}" \
    --post_content="<p>Sample project content for ${title}.</p>" \
    --porcelain)"
  docker compose run --rm wpcli wp eval "
    if (function_exists('update_field')) {
      update_field('subtitle', 'Sample subtitle', ${post_id});
      update_field('branding', 'Brand', ${post_id});
      update_field('projectintrotext', 'Intro text', ${post_id});
      update_field('projectdescription', '<p>Description</p>', ${post_id});
      update_field('clientheading', 'Client', ${post_id});
      update_field('date', '2024', ${post_id});
      update_field('client', 'Example client', ${post_id});
    }
  "
  echo "${post_id}"
}

echo "Creating sample portfolio posts..."
for i in 1 2 3 4 5 6; do
  create_sample_post "project-${i}" "Project ${i}" >/dev/null
done

echo ""
echo "Setup complete."
  echo "  WordPress admin: http://localhost:${WP_PORT:-8081}/wp-admin"
echo "  GraphQL endpoint: ${GRAPHQL_URL}"
echo "  Login: ${WP_ADMIN_USER:-admin} / ${WP_ADMIN_PASSWORD:-admin}"
echo ""
echo "Next.js: copy ../.env.local.example to ../.env.local and run npm run dev from the repo root."
