# Repository structure — 2023 snapshot

Frozen reference from [My-Headless-Wordpress-Portfolio](https://github.com/Elli2022/My-Headless-Wordpress-Portfolio) `main` (last push 2026-04-27). Preserved when consolidating into `wordpress-portfolio`.

## Live URLs (historical)

| Period | Frontend URL |
|--------|----------------|
| 2023–2024 internship | `my-headless-wordpress-portfolio.vercel.app` |
| 2026+ canonical | `elli-wordpress-portfolio.vercel.app` |

## Package (2023)

- **name:** `wp-portfolio`
- **Next.js:** 14.0.4
- **Router:** App Router (`src/app/`)
- **GraphQL helper:** `src/lib/api/wp.tsx` (2026: `src/lib/wp.ts`)

## File tree (2023)

```
src/app/
  page.tsx
  layout.tsx
  globals.css
  about/page.tsx
  contact/page.tsx
  projects/[slugs]/page.tsx
  components/
    Navigation.tsx
    Header.tsx
    Footer.tsx
    ExploreButton.tsx
    FilterCategory.tsx
    FreelanceSection.tsx
    PostsContainer.tsx      # note: PostContainer.tsx in 2023 listing (typo variant)
    ProjectPost.tsx
    KeyFindings.tsx
    PictureBlock.tsx
    LiveWorkButton.tsx
    Modal.tsx
    NextProjectText.tsx
    PaginationControls.tsx
src/lib/
  api/wp.tsx
  queries/
    getHome.tsx
    getPages.tsx
    getPost.tsx
    getPosts.tsx
public/images/portfolioFoto.jpg
```

## Path mapping → 2026

| 2023 | 2026 |
|------|------|
| `src/lib/api/wp.tsx` | `src/lib/wp.ts` |
| `src/lib/queries/*.tsx` | `src/lib/queries/*.ts` |
| `PostContainer.tsx` | `PostsContainer.tsx` |
| Home posts from WP only | `src/data/projects.ts` + `/work/[slug]` |
| — | `ProjectShowcase.tsx`, `wordpress/`, `docs/` |

## Full README (verbatim)

See [README-My-Headless-Wordpress-Portfolio-2023.md](./README-My-Headless-Wordpress-Portfolio-2023.md) — complete text from the original repository README (620 lines).
