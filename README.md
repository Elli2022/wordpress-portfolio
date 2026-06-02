# Headless WordPress Portfolio

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06b6d4)
![WPGraphQL](https://img.shields.io/badge/CMS-WPGraphQL-6b21a8)

A modern portfolio frontend built with Next.js and TypeScript, powered by headless WordPress content through WPGraphQL.

## Features

- Server-rendered project listing and detail pages
- Cursor-based pagination for WordPress posts
- Responsive card-based portfolio layout
- Reusable query layer for CMS content fetching

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS + custom global styles
- WordPress + WPGraphQL

## Screenshots

### Home Page
![Home page screenshot](./public/screenshots/homepage.png)

## Local Development

```bash
npm install
npm run dev
```

Runs at `http://localhost:3000`.

## Environment Variables

Create `.env.local`:

```bash
wordpressApiKey=https://your-wordpress-graphql-endpoint
NEXT_PUBLIC_DEPLOY_URL=https://elli-wordpress-portfolio.netlify.app
```

## Project Structure

- `src/app/page.tsx` - Home page and project grid
- `src/app/projects/[slugs]/page.tsx` - Project detail route
- `src/lib/queries/` - GraphQL query helpers
- `src/lib/wp.ts` - Shared WordPress GraphQL client
