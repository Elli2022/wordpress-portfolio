# Repository structure — wordpress-portfolio-site (v0)

First experiments with headless WordPress + Next.js (30 Nov 2023). Imported from [wordpress-portfolio-site](https://github.com/Elli2022/wordpress-portfolio-site).

## Role in the timeline

| | |
|---|---|
| **v0** | First GraphQL proof-of-concept, navbar, hero, explore button |
| **v1** | [My-Headless-Wordpress-Portfolio](../legacy/my-headless-wordpress-portfolio-2023/) — full internship portfolio |
| **v2** | Root `src/` — 2026 production app |

Commit messages in this phase are mostly `import snapshot from wp-portfolio-…` (incremental local milestones).

## Historical deploy

- Netlify: `bright-cupcake-c0c47f.netlify.app` (see repo homepage on GitHub)

## File tree (May 2024 snapshot)

```
src/app/page.tsx          # single home page, inline nav + hero
src/lib/wp.tsx
src/lib/queries/getHome.tsx
src/lib/queries/getAbout.tsx
src/pages/queries/...     # duplicate query paths (early refactor)
src/pages/api/wp.tsx
```

No About/Contact routes, no component library, no project gallery yet.

## Full snapshot in repo

[legacy/wordpress-portfolio-site/](../../legacy/wordpress-portfolio-site/)

## Git log export

[git-log-portfolio-site.txt](./git-log-portfolio-site.txt)
