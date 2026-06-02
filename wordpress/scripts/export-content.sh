#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WP_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
OUT_DIR="${WP_DIR}/hosting"
WXR="${OUT_DIR}/portfolio-content-export.xml"

cd "${WP_DIR}"

if ! docker compose ps wordpress 2>/dev/null | grep -q "Up"; then
  echo "Starting WordPress..."
  docker compose up -d db wordpress
  sleep 5
fi

mkdir -p "${OUT_DIR}"

echo "Exporting pages and posts to WXR..."
docker compose run --rm wpcli wp export \
  --dir=/var/www/html/wp-content/uploads \
  --filename_format=portfolio-export.xml \
  --post_type=page,post \
  --skip_comments

docker compose run --rm wpcli sh -c \
  "cp /var/www/html/wp-content/uploads/portfolio-export.xml /var/www/html/wp-content/uploads/export-copy.xml && ls -la /var/www/html/wp-content/uploads/*.xml" 2>/dev/null || true

# Copy export from container volume to hosting folder
docker compose run --rm --entrypoint sh wpcli -c \
  "cat /var/www/html/wp-content/uploads/portfolio-export.xml" > "${WXR}" 2>/dev/null || \
  docker compose run --rm wpcli wp export --stdout > "${WXR}"

if [[ -s "${WXR}" ]]; then
  echo "Created: ${WXR}"
  echo "Import in wp-admin: Tools -> Import -> WordPress"
else
  echo "Export may have failed. Run manually:" >&2
  echo "  docker compose run --rm wpcli wp export --stdout > hosting/portfolio-content-export.xml" >&2
  exit 1
fi
