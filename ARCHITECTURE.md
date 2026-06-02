# Architecture — alignment with original portfolio

This repo is the **2026 evolution** of [Elli2022/my-headless-wordpress-portfolio](https://github.com/Elli2022/my-headless-wordpress-portfolio) (Capace internship, Nov 2023 – Feb 2024). The stack and goals are the same; some routes and data sources were extended for production and interviews.

## Tech stack (unchanged intent)

| Layer | Technology |
|--------|------------|
| Frontend | React 18, Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS + `globals.css` design tokens |
| CMS | Headless WordPress, ACF, WPGraphQL |
| Data | GraphQL via `src/lib/wp.ts` |
| Deploy | Vercel (frontend), AwardSpace (CMS) |

## Component map (original → this repo)

| Original component | This repo | Notes |
|------------------|-----------|--------|
| `Navigation` | `src/app/components/Navigation.tsx` | Black text links to Portfolio / about / contact |
| `Header` | `src/app/components/Header.tsx` | Hero kicker + HTML title |
| `ExploreButton` | `src/app/components/ExploreButton.tsx` | CMS CTA → `#projects` |
| `FilterCategory` | `src/app/components/FilterCategory.tsx` | Topic pills; **client-side** filter (no scroll jump) |
| `PostsContainer` | `src/app/components/PostsContainer.tsx` | Project grid below gallery |
| `ProjectPost` | `src/app/components/ProjectPost.tsx` | WP post detail (featured image + content) |
| `KeyFindings` | `src/app/components/KeyFindings.tsx` | ACF block on WP project posts |
| `PictureBlock` | `src/app/components/PictureBlock.tsx` | Full-width image + link |
| `LiveWorkButton` | `src/app/components/LiveWorkButton.tsx` | External live URL from ACF |
| `FreelanceSection` | `src/app/components/FreelanceSection.tsx` | Freelance CTA from CMS |
| `Footer` | `src/app/components/Footer.tsx` | Contact + copyright |
| `Modal` | `src/app/components/Modal.tsx` | Optional overlay (about/contact) |
| `PaginationControls` | `src/app/components/PaginationControls.tsx` | Gallery ‹ › controls |
| — | `ProjectShowcase.tsx` | **2026:** horizontal gallery + filter + grid |
| — | `src/data/projects.ts` | **2026:** interview case studies at `/work/[slug]` |

## Routes

| Route | Purpose | Data source |
|--------|---------|-------------|
| `/` | Home: Header, gallery, filters, grid, freelance | `getHome`, `getPages`, `projects.ts` |
| `/work/[slug]` | Interview case study (pitch, outcome, deploy links) | `src/data/projects.ts` |
| `/projects/[slug]` | Classic WP project post (KeyFindings, PictureBlock, …) | `getPost`, WP GraphQL |
| `/about`, `/contact` | CMS pages + fallbacks | `getAbout`, `getAll` |

## GraphQL helpers (`src/lib/queries/`)

| File | Role |
|------|------|
| `getHome.tsx` | Home page ACF (hero, freelance, gallery fields) |
| `getPages.tsx` | Nav link targets |
| `getPosts.tsx` | WP posts list + pagination + categories |
| `getPost.ts` | Single WP post + `PostInfo` (compat fields via `PostInfoCompat`) |
| `getAbout.tsx` | About page |
| `getAll.tsx` | Contact page |

## Data flow (home)

```
getHome + getPages
       ↓
  page.tsx (server)
       ↓
  Header, ExploreButton, ProjectShowcase (client filter + gallery), FreelanceSection, Footer
       ↓
  projects.ts → /work/[slug] case studies
```

## Data flow (WP project post)

```
/projects/[slug]
       ↓
  getPost(slug) + WP postBy query
       ↓
  Navigation → ProjectPost → PostInfo meta (compat) → Footer

  `KeyFindings`, `PictureBlock`, `LiveWorkButton` remain in the codebase for when full ACF blocks are exposed on WP; today only compat fields are available from GraphQL.
```

## Intentional differences from 2023 repo

1. **Case studies in code** (`/work/*`) — stable copy for recruiters when CMS posts are incomplete.
2. **Client-side category filter** — avoids jumping to top of page on pill click.
3. **Horizontal project gallery** — replaces single-feature carousel; keeps ‹ › navigation.
4. **Light theme locked** — original About used dark `Modal`; site now uses light beige palette throughout.
5. **Production URL** — `elli-wordpress-portfolio.vercel.app` (canonical).

## Original reference repos

- [my-headless-wordpress-portfolio](https://github.com/Elli2022/my-headless-wordpress-portfolio) — direct predecessor (same component names)
- [frontend-application](https://github.com/Elli2022/frontend-application) — Nov 2023 internship frontend
- [typescript-app-template](https://github.com/Elli2022/typescript-app-template)
- [fullstack-application](https://github.com/Elli2022/fullstack-application)
