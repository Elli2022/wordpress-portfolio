# Codebase reference — Headless WordPress Portfolio

Merged technical reference from the Capace internship portfolio (Nov 2023 – Feb 2024) and the 2026 update in [wordpress-portfolio](https://github.com/Elli2022/wordpress-portfolio).

**Canonical repo:** [github.com/Elli2022/wordpress-portfolio](https://github.com/Elli2022/wordpress-portfolio)  
**Live:** [elli-wordpress-portfolio.vercel.app](https://elli-wordpress-portfolio.vercel.app)  
**2023 snapshot:** [legacy/my-headless-wordpress-portfolio-2023/](../legacy/my-headless-wordpress-portfolio-2023/)

**History:** [HISTORY.md](./HISTORY.md) · [original README verbatim](./history/README-My-Headless-Wordpress-Portfolio-2023.md) · [2023 structure](./history/STRUCTURE-2023.md)

Overview: [ARCHITECTURE.md](../ARCHITECTURE.md) · Recruiter guide: [README.md](../README.md)

---

## Introduction

This project was built during an internship at **Capace Media Group AB**. It is a dynamic portfolio using **Headless WordPress** (CMS) and **React / Next.js** (frontend), with **Tailwind CSS** and **GraphQL** for data.

The **2026 repo** keeps the same component names and GraphQL intent as the 2023 original, and adds interview-ready case studies, a horizontal project gallery, and production hardening on Vercel.

---

## Technologies and tools

| Layer | Technology |
|--------|------------|
| Frontend | React 18, Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS + `src/app/globals.css` design tokens |
| CMS | Headless WordPress, ACF, WPGraphQL |
| Data | GraphQL via `src/lib/wp.ts` |
| Deploy | Vercel (frontend), AwardSpace (CMS) |

---

## Site structure (pages)

| Route | File | Purpose | Data source |
|--------|------|---------|-------------|
| `/` | `src/app/page.tsx` | Hero, explore CTA, gallery, topic filters, grid, freelance, footer | `getHome`, `getPages`, `src/data/projects.ts` |
| `/work/[slug]` | `src/app/work/[slug]/page.tsx` | Interview case study (pitch, outcome, screenshots, live + GitHub) | `src/data/projects.ts` |
| `/projects/[slug]` | `src/app/projects/[slugs]/page.tsx` | Classic WordPress project post | `getPost`, WP GraphQL |
| `/about` | `src/app/about/page.tsx` | About (CMS or fallback) | `getAbout`, `fallback-content.ts` |
| `/contact` | `src/app/contact/page.tsx` | Contact (CMS or fallback) | `getAll`, `fallback-content.ts` |
| `/all` | `src/app/all/page.tsx` | Legacy / alternate contact path | `getAll` |

### Home page composition (`src/app/page.tsx`)

```
Navigation
  → Header (presentingText + titleHtml from CMS)
  → ExploreButton (CMS button → #projects)
  → ProjectShowcase
       → FilterCategory (topic pills, client-side)
       → horizontal gallery + PaginationControls
       → PostsContainer (project grid → /work/[slug])
  → FreelanceSection (CMS freelance block)
  → Footer
```

### WordPress project page (`src/app/projects/[slugs]/page.tsx`)

```
Navigation
  → ProjectPost (featured image + HTML content)
  → PostInfo meta (subtitle, client, dates — compat fields)
  → Footer
```

> **2026 note:** `KeyFindings`, `PictureBlock`, and `LiveWorkButton` are implemented and ready; full ACF **blocks** require extending `wordpress/mu-plugins/portfolio-cms.php` on the CMS. Today GraphQL exposes `PostInfoCompat` fields only.

### Case study page (`src/app/work/[slug]/page.tsx`)

```
Navigation
  → pitch, outcome, learned, tech stack
  → ProjectScreenshot (desktop/mobile)
  → links to live demo + GitHub
```

---

## Path mapping (2023 → 2026)

| 2023 (original) | 2026 (this repo) |
|-----------------|------------------|
| `src/pages/index.tsx` | `src/app/page.tsx` |
| `src/pages/queries/getPost.tsx` | `src/lib/queries/getPost.ts` |
| `src/pages/queries/getPosts.tsx` | `src/lib/queries/getPosts.ts` |
| `src/lib/wp.tsx` | `src/lib/wp.ts` |
| `Project/[slug]/page.tsx` (Pages Router) | `src/app/projects/[slugs]/page.tsx` |
| — | `src/app/work/[slug]/page.tsx` (new) |
| — | `src/data/projects.ts` (new) |
| — | `src/app/components/ProjectShowcase.tsx` (new) |

---

## GraphQL layer

### `src/lib/wp.ts`

Central helper for all WordPress GraphQL requests.

**Functionality**

- Uses `fetch` with `POST` and JSON body `{ query, variables }`.
- Reads endpoint from `process.env.wordpressApiKey`.
- Logs GraphQL errors; returns `null` if the key is missing.
- Uses Next.js `revalidate: 60` for cached fetches.

**Example**

```ts
import WP from "@/lib/wp";

const result = await WP(`query { posts { nodes { title } } }`);
```

### `getHome.ts` — `src/lib/queries/getHome.ts`

Fetches the home page ACF block: hero title, presenting text, explore button, freelance section, project gallery fields.

```ts
const page = await getHome("/home");
const homePage = page?.homePage ?? homeFallback;
```

### `getPages.ts` — `src/lib/queries/getPages.ts`

Fetches all pages for dynamic navigation (`Portfolio.`, `about me.`, `contact.`).

### `getPosts.ts` — `src/lib/queries/getPosts.ts`

Posts list with cursor pagination and categories (used where WP posts are listed).

```ts
getPosts(1, 6, "", "", "categoryId");
```

### `getPost.ts` — `src/lib/queries/getPost.ts`

Single post by URI/slug. Returns `title`, `content`, `featuredImage`, and `PostInfo` compat fields.

```ts
const result = await getPost("hello-world");
const post = getPostInfoFromResult(result);
```

### `getAbout.ts` / `getAll.ts`

About and Contact page content from WordPress, with fallbacks in `src/lib/fallback-content.ts`.

### `generateStaticParams`

Both `/projects/[slugs]` and `/work/[slug]` prebuild paths at build time from WP slugs and `projects.ts` respectively.

---

## Components

All live under `src/app/components/` unless noted.

### Navigation

Navigation bar with Next.js `Link` routes: portfolio (home), about, contact.

**Props:** `portfolioLink`, `aboutLink`, `contactLink` — `{ id, title, uri }`.

**2026:** Uses `.link` (black text), not blue pill buttons.

```tsx
<Navigation
  portfolioLink={{ id: "1", title: "Portfolio.", uri: "/" }}
  aboutLink={{ id: "2", title: "about me.", uri: "/about/" }}
  contactLink={{ id: "3", title: "contact.", uri: "/contact/" }}
/>
```

### Header

Welcoming hero: `presentingText` + HTML `titleHtml` (`dangerouslySetInnerHTML`).

```tsx
<Header
  presentingText="Welcome"
  titleHtml="Ideas <br /> fueled by design."
/>
```

### Footer

Contact email, GitHub link, copyright. Class: `site-footer`.

### ExploreButton

CTA button from CMS. On home, URL is normalized to `#projects` when CMS still says `/projects`.

```tsx
<ExploreButton buttonText="explore works." buttonUrl="#projects" />
```

### FilterCategory

Renders topic/category pills.

**2026:** Client-side filter via callback (no full-page navigation — avoids scroll jump). Used inside `ProjectShowcase`.

```tsx
<FilterCategory
  categories={[{ databaseId: 1, name: "React" }]}
  activeCategoryId={activeId}
  onSelectCategory={setActiveId}
/>
```

### PostsContainer

Grid of project cards linking to `/work/[slug]`.

**Props:** `hasPosts`, `filteredPosts`.

### ProjectPost

WP post detail: featured image (`next/image`) + HTML body.

**Props:** `postData: WpPostDetail`.

### ProjectShowcase *(2026 only)*

Composes gallery, `FilterCategory`, `PostsContainer`, and `PaginationControls` for the home page.

### KeyFindings

ACF block UI: Basics, Goals, Problems, Solutions in a grid.

**Props:** `keyFindingsBlock` with `basics`, `basicstext`, `goals`, `goalstext`, etc.

### PictureBlock

Full-width image + optional link CTA.

### LiveWorkButton

External project URL. Hidden when URL is empty or `#`.

### FreelanceSection

Freelance title, description, mailto/URL, button text from CMS.

### Modal

Overlay with escape / click-outside close. **2023:** About page used dark modal. **2026:** About uses light `SiteShell`; `Modal` remains available for reuse.

### PaginationControls *(2026)*

Gallery ‹ › buttons and slide counter.

### NextProjectText *(original; optional)*

Centered overlay text for “next project” prompts. Can be wired from `PictureBlock.nextprojecttext` when full WP blocks return.

### Other helpers

| Component | Role |
|-----------|------|
| `SiteShell` | Nav + layout wrapper for About/Contact |
| `CmsHtml` | Safe-ish HTML rendering for CMS pages |
| `ProjectScreenshot` | Desktop/mobile shots on case studies |
| `RobustImage` | Fallback chain for broken image URLs |

---

## About page

**2023:** Dark full-screen `Modal`, photo, social links.  
**2026:** `src/app/about/page.tsx` — light layout, `SiteShell`, content from `getAbout` or `aboutFallback` in `src/lib/fallback-content.ts` (includes AI transparency section).

---

## Features (combined)

| Feature | 2023 | 2026 |
|---------|------|------|
| Dynamic nav from WP pages | ✅ | ✅ |
| Post/project cards from data | ✅ WP | ✅ `projects.ts` + WP |
| Category / topic filtering | ✅ router | ✅ client-side pills |
| Pagination | ✅ WP cursors | ✅ gallery controls |
| Freelance CTA from CMS | ✅ | ✅ |
| Case studies before live link | — | ✅ `/work/[slug]` |
| Local screenshots + capture script | — | ✅ `npm run screenshots` |
| CMS fallbacks | partial | ✅ `fallback-content.ts` |

---

## Contact

**Developer:** Eleonora Nocentini Sköldebrink  
**Organization:** Capace Media Group AB (internship)  
**Email:** [eleonora.nocentini@gmail.com](mailto:eleonora.nocentini@gmail.com)

---

## Related repositories

| Repo | Role |
|------|------|
| [wordpress-portfolio](https://github.com/Elli2022/wordpress-portfolio) | **Canonical** — production code + this documentation |
| [My-Headless-Wordpress-Portfolio](https://github.com/Elli2022/My-Headless-Wordpress-Portfolio) | Archived — 2023 internship snapshot |
| [frontend-application](https://github.com/Elli2022/frontend-application) | Earlier internship frontend |
| [typescript-app-template](https://github.com/Elli2022/typescript-app-template) | Template used in coursework |
| [fullstack-application](https://github.com/Elli2022/fullstack-application) | Fullstack practice |

---

*This file preserves the detailed structure from the original README and updates paths and behavior for the 2026 codebase. Nothing from the original spec is removed — evolved pieces are marked with **2026**.*
