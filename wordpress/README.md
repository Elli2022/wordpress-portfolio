# WordPress GraphQL CMS (portfolio backend)

This folder is the **WordPress backend** for [wordpress-portfolio](https://github.com/Elli2022/wordpress-portfolio). The Next.js app in `src/` at the repo root is unchanged — it fetches data via `wordpressApiKey` pointing at `/graphql`.

## What is included

| Component | Purpose |
|-----------|---------|
| [WPGraphQL](https://www.wpgraphql.com/) | Exposes WordPress as a GraphQL API |
| [Advanced Custom Fields](https://www.advancedcustomfields.com/) | Fields the app queries (`homePage`, `aboutPage`, `allPage`, `PostInfo`) |
| [WPGraphQL for ACF](https://github.com/wp-graphql/wpgraphql-acf) | ACF fields in GraphQL |
| `acf-json/` | Field definitions matching Next.js queries |
| Docker Compose | Local WordPress + MariaDB |

## Quick start

**Requirements:** Docker Desktop (or Docker Engine + Compose v2)

```bash
cd wordpress
chmod +x scripts/setup.sh
./scripts/setup.sh
```

The script:

1. Starts WordPress on port **8081** by default (change in `.env`; avoid 8080 if busy)
2. Installs WPGraphQL, ACF, and WPGraphQL for ACF
3. Creates pages (`/home`, `/about`, `/contact`, …) and sample posts
4. Seeds ACF fields with starter values

Connect Next.js (from repo root):

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

`.env.local` should contain:

```bash
wordpressApiKey=http://localhost:8081/graphql
```

## GraphQL test

Open [http://localhost:8081/graphql](http://localhost:8081/graphql) and run:

```graphql
query {
  page(id: "/home", idType: URI) {
    homePage {
      homePageTitle
      presentingText
    }
  }
  posts(first: 3) {
    edges {
      node {
        title
        slug
        PostInfo {
          subtitle
        }
      }
    }
  }
}
```

## Pages and content the app expects

| URI / slug | GraphQL / usage |
|------------|-----------------|
| `/home` | `getHome("/home")` — ACF group `homePage` |
| `/about` | `getAbout("/about")` — `aboutPage` |
| `/all` | `getAll` — `allPage` |
| Page titles `Portfolio.`, `about me.`, `contact.` | Navigation in `page.tsx` |
| Posts | Pagination + `/projects/[slug]` with ACF `PostInfo` |

Edit content in wp-admin: **http://localhost:8081/wp-admin**

## Commands

```bash
docker compose up -d
docker compose down
docker compose logs -f wordpress
docker compose run --rm wpcli wp plugin list
docker compose run --rm wpcli wp acf sync
```

## Production

For real hosting (managed WordPress, WP Engine, AwardSpace, etc.):

1. Install the same three plugins
2. Import field groups from `acf-json/` (ACF → Tools → Import, or `wp acf sync` if JSON is in `wp-content/acf-json`)
3. Set `wordpressApiKey` on Vercel to your public URL, e.g. `https://cms.example.com/graphql`
4. Restrict CORS to your frontend domain in production (`portfolio-cms.php` uses `*` for local dev)

**Free hosting guide:** [HOSTING.md](./HOSTING.md)

## Files (does not modify Next.js `src/`)

```
wordpress/
├── docker-compose.yml
├── .env.example
├── mu-plugins/portfolio-cms.php
├── acf-json/
├── scripts/setup.sh
├── README.md
└── HOSTING.md
```
