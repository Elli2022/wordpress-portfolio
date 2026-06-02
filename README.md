# WordPress Portfolio

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![WordPress](https://img.shields.io/badge/CMS-WordPress%20GraphQL-21759b)
![Status](https://img.shields.io/badge/Status-Modernizing-success)

`wordpress-portfolio` is Elli's first real agency practice project (Capace, Malmo, Nov-Feb), now rebuilt to run again with a modernized and more stable setup.

## Overview

- Headless portfolio frontend built in `Next.js` + `TypeScript`
- Content is served from WordPress via `WPGraphQL`
- Home, About, All and Project detail pages come from CMS data
- Pagination and slug-based project routes are server rendered

## Project Goals (2026 refresh)

- Keep the original visual identity and content structure
- Improve runtime stability and null-safe rendering
- Reduce legacy dependencies and maintenance risk
- Prepare for safer hosting/deployment going forward

## Recommended CMS Hosting (free-tier friendly)

If AwardSpace feels limiting, the best smoother alternatives are:

- `WordPress on Cloudflare Tunnel + cheap VPS` (most control, stable GraphQL)
- `WordPress on Railway/Render/Fly.io` (check current free-tier limits)
- `Self-hosted WordPress + managed DB` with WPGraphQL plugins

For this repo, the frontend stays unchanged while CMS hosting can be swapped by updating `wordpressApiKey`.

## Local Development

```bash
npm install
npm run dev
```

App URL: `http://localhost:3000`

## Environment Variables

```bash
wordpressApiKey=https://your-wordpress-graphql-endpoint
NEXT_PUBLIC_DEPLOY_URL=https://your-frontend-deploy-url
```

## Main Code Areas

- `src/app/page.tsx` home + project grid
- `src/app/projects/[slugs]/page.tsx` project detail route
- `src/pages/queries/` GraphQL query helpers
- `src/pages/api/wp.tsx` shared WordPress request function
- `wordpress/mu-plugins/portfolio-cms.php` WPGraphQL compatibility bridge

## Historical Snapshot Tags

Legacy timeline tags are preserved from the 2023-2024 development period.
