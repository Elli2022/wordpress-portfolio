# Headless WordPress Portfolio

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06b6d4)
![WPGraphQL](https://img.shields.io/badge/CMS-WPGraphQL-6b21a8)
![Status](https://img.shields.io/badge/Status-Live-success)

**Produktion (kanonisk URL):** [https://elli-wordpress-portfolio.vercel.app](https://elli-wordpress-portfolio.vercel.app)

**GitHub:** [github.com/Elli2022/wordpress-portfolio](https://github.com/Elli2022/wordpress-portfolio)

Capace-praktikportfolio (Malmö, nov 2023 – feb 2024), moderniserad 2026 — samma visuella identitet som originalet, stabil deploy, intervjuklara case studies och tydlighet kring AI-användning.

**Ursprungsrepo (arkiverat):** [My-Headless-Wordpress-Portfolio](https://github.com/Elli2022/My-Headless-Wordpress-Portfolio) — all detaljerad dokumentation om komponenter, sidor och GraphQL är **sammanslagen** i detta repo, inget går förlorat:

| Dokument | Innehåll |
|----------|----------|
| [docs/HISTORY.md](./docs/HISTORY.md) | Tidslinje v1 (2023) → v2 (2026), vad som bevarats |
| [legacy/my-headless-wordpress-portfolio-2023/](./legacy/my-headless-wordpress-portfolio-2023/) | **Hela 2023-kodbaser** (importerad från My-Headless-Wordpress-Portfolio) |
| [docs/history/README-My-Headless-Wordpress-Portfolio-2023.md](./docs/history/README-My-Headless-Wordpress-Portfolio-2023.md) | **Hela original-README** (ordagrant) |
| [docs/CODEBASE.md](./docs/CODEBASE.md) | Uppdaterad referens: komponenter, sidor, queries, 2023→2026 |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Kort teknisk karta och komponentmappning |

---

## Är den redo för produktion?

**Ja.** För junior-/praktikroller och rekryterare som vill se headless CMS, React/Next.js och genomtänkt projektflöde är portfolion **redo att skickas**.

| Kontroll | Status |
|----------|--------|
| Live på Vercel | ✅ [elli-wordpress-portfolio.vercel.app](https://elli-wordpress-portfolio.vercel.app) |
| Startsida, About, Contact | ✅ 200 |
| Case studies `/work/[slug]` | ✅ 7 projekt |
| WordPress GraphQL (CMS) | ✅ [elliportfolio.atwebpages.com/graphql](http://elliportfolio.atwebpages.com/graphql) |
| `main` pushad till GitHub | ✅ |
| Bygge lokalt (`npm run build`) | ✅ |

**Vad som imponerar på rekryterare**

- **Headless-arkitektur** — WordPress för innehåll, Next.js för upplevelsen (inte bara en WordPress-tema-sida).
- **Case study först** — filter med topic pills → intern sida med pitch/outcome/learned → *sedan* live-demo och GitHub.
- **7 deployade projekt** med tydlig progression (API-sök, byrå-UI, blogg-evolution, små demos).
- **Ärlig AI-sektion** på About — visar mognad och transparens (2026-arbetsätt), inte “dold” AI.
- **Produktionsmindset** — fallbacks när CMS-sidor saknas, lokala screenshots, robust bildladdning.

**Vad som är “bra nog”, inte perfekt**

- About/Contact kommer ofta från **fallback i kod** om sidorna inte finns i WordPress (fungerar bra, men nämn gärna i intervju).
- Övriga demos ligger kvar på **Netlify** (medvetet — det är separata praktikprojekt, inte portfolion själv).
- LinkedIn är inte länkad än (medvetet val).

---

## Om mig (samma innehåll som på sajten)

**Eleonora Nocentini Sköldebrink** · junior utvecklare · Malmö, Sverige

Jag bygger tydliga, minimala gränssnitt — från praktikprototyper på **Capace** till produktionsnära headless-upplägg med React, Next.js och WordPress GraphQL.

Praktiken (nov 2023 – feb 2024) gav verklig byråvana: kundnära layouter, API-drivna appar och den här portfolion. 2026 moderniserade jag kodbasen för stabil deploy på Vercel — med AI-assisterad utveckling, men alltid granskat och testat av mig innan det ship:as.

**Det jag tar med till ett team**

- React & Next.js (App Router, TypeScript)
- Headless WordPress · WPGraphQL · ACF
- API-drivna UI (loading, tomt tillstånd, fel)
- Tydliga case studies och läsbar komponentstruktur
- Deploy och underhåll av uppdelad CMS + frontend

**Så använder jag AI (transparent)**

Jag använder AI-verktyg för att snabba upp boilerplate, refaktorering och dokumentation — på samma sätt som många team jobbar 2026. Jag ship:ar inte kod jag inte kan förklara: jag läser diffen, kör appen lokalt och fixar det som går sönder. Så portfolion kunde förnyas utan att byta arkitektur.

**Kontakt**

- E-post: [eleonora.nocentini@gmail.com](mailto:eleonora.nocentini@gmail.com)
- GitHub: [github.com/Elli2022](https://github.com/Elli2022)
- Plats: Malmö, Sverige

På sajten: [About](https://elli-wordpress-portfolio.vercel.app/about) · [Contact](https://elli-wordpress-portfolio.vercel.app/contact)

---

## URL:er — snabbreferens

### Portfolion (denna app)

| Vad | URL |
|-----|-----|
| **Live (produktion)** | https://elli-wordpress-portfolio.vercel.app |
| **Startsida** | https://elli-wordpress-portfolio.vercel.app/ |
| **About** | https://elli-wordpress-portfolio.vercel.app/about |
| **Contact** | https://elli-wordpress-portfolio.vercel.app/contact |
| **Case study (flaggskepp)** | https://elli-wordpress-portfolio.vercel.app/work/wordpress-portfolio-headless |
| **Repo** | https://github.com/Elli2022/wordpress-portfolio |

### CMS (WordPress + GraphQL)

| Vad | URL |
|-----|-----|
| **GraphQL-endpoint** | http://elliportfolio.atwebpages.com/graphql |
| **CMS-dokumentation** | `wordpress/README.md`, `wordpress/HOSTING_GRATIS.md` |

### Praktikprojekt (live demos — Netlify)

| Projekt | Live | Case study på portfolion |
|---------|------|---------------------------|
| Headless Portfolio | [Vercel](https://elli-wordpress-portfolio.vercel.app) | [/work/wordpress-portfolio-headless](https://elli-wordpress-portfolio.vercel.app/work/wordpress-portfolio-headless) |
| Pokémon Search | [pokemon-search-application.netlify.app](https://pokemon-search-application.netlify.app) | [/work/pokemon-search-app](https://elli-wordpress-portfolio.vercel.app/work/pokemon-search-app) |
| Advokatbyrå Site | [w-advokatbyra-malmo.netlify.app](https://w-advokatbyra-malmo.netlify.app) | [/work/advokatbyra-site](https://elli-wordpress-portfolio.vercel.app/work/advokatbyra-site) |
| Next.js Auth Blog (modern) | [my-nextjs-project-modernized.netlify.app](https://my-nextjs-project-modernized.netlify.app) | [/work/nextjs-auth-blog-modernized](https://elli-wordpress-portfolio.vercel.app/work/nextjs-auth-blog-modernized) |
| Auth Blog Platform | [auth-blog-platform.netlify.app](https://auth-blog-platform.netlify.app) | [/work/auth-blog-platform](https://elli-wordpress-portfolio.vercel.app/work/auth-blog-platform) |
| Calculator App | [calculator-app-elli2022.netlify.app](https://calculator-app-elli2022.netlify.app) | [/work/calculator-app](https://elli-wordpress-portfolio.vercel.app/work/calculator-app) |
| Nic Cage Snacks Shop | [nic-cage-snacks.netlify.app](https://nic-cage-snacks.netlify.app) | [/work/nic-cage-snacks-shop](https://elli-wordpress-portfolio.vercel.app/work/nic-cage-snacks-shop) |

> **Obs:** Den gamla Netlify-URL:en för *själva portfolion* (`elli-wordpress-portfolio.netlify.app`) ska peka om till Vercel via `netlify.toml` om den siten fortfarande är kopplad. Kanonisk adress är alltid Vercel ovan.

---

## Intervjuguide (≈3 minuter)

1. Öppna [startsidan](https://elli-wordpress-portfolio.vercel.app/) — visa **karusell** och **topic pills** (React, Next.js, WordPress …).
2. Filtrera t.ex. **JavaScript** → öppna **Advokatbyrå** → läs **60-sekunders pitch**, **outcome**, **what I learned**.
3. Klicka **View live project** *efter* kontext (visar produkt­tänk).
4. Avsluta med flaggskeppet: **Headless Portfolio** — förklara WordPress ↔ Next.js ↔ Vercel/AwardSpace.
5. Om AI kommer upp: hänvisa till [About](https://elli-wordpress-portfolio.vercel.app/about) — du använder AI som verktyg, du äger arkitekturen och kan förklara tradeoffs.

**Tre projekt att prioritera i samtal**

1. Headless WordPress Portfolio (arkitektur + praktik)
2. Pokémon Search App (API, states, UX)
3. Advokatbyrå Site (förtroende, hierarki, kundnära UI)

---

## Arkitektur

```
WordPress (ACF + WPGraphQL)  ──GraphQL──►  Next.js 14 (App Router)
     AwardSpace CMS                         Vercel frontend
```

| Lager | Roll |
|--------|------|
| **WordPress** | Home hero, About/Contact när sidor finns i CMS |
| **Next.js** | UI, topic pills, horisontellt galleri, case studies på `/work/[slug]` |
| **`portfolio-cms.php`** | GraphQL-kompatibilitet för legacy-fält |
| **`src/data/projects.ts`** | Projekt, copy, deploy-URL:er, screenshots |
| **`src/lib/fallback-content.ts`** | About/Contact/Home när CMS saknar sidor |

### Användarflöde

```
Besökare → Startsida (filter / galleri / grid)
         → /work/[slug]  (case study)
         → Live demo + GitHub
```

---

## Funktioner

- Case study-flöde **innan** externa live-länkar
- Headless CMS-innehåll där det är konfigurerat
- Graceful fallbacks när About/Contact saknas i WordPress
- Responsivt grid + topic-filter (`?category=`)
- Startsida-karusell med alla deployade projekt + extra GitHub-repos
- Robusta projektbilder: lokal PNG → mShots → thum.io → placeholder
- Playwright-skript för att fånga om screenshots (`npm run screenshots`)

---

## Skärmdumpar

Live startsida: [elli-wordpress-portfolio.vercel.app](https://elli-wordpress-portfolio.vercel.app) (galleri, topic pills, projektgrid).

### Case study — Headless Portfolio (desktop)

![Case study — Headless WordPress Portfolio](./public/screenshots/projects/wordpress-portfolio-headless/desktop.png)

*Live:* [/work/wordpress-portfolio-headless](https://elli-wordpress-portfolio.vercel.app/work/wordpress-portfolio-headless)

### Case study — Pokémon Search (desktop)

![Case study — Pokémon Search App](./public/screenshots/projects/pokemon-search-app/desktop.png)

*Live:* [/work/pokemon-search-app](https://elli-wordpress-portfolio.vercel.app/work/pokemon-search-app)

### Case study — Advokatbyrå (desktop)

![Case study — Advokatbyrå Site](./public/screenshots/projects/advokatbyra-site/desktop.png)

*Live:* [/work/advokatbyra-site](https://elli-wordpress-portfolio.vercel.app/work/advokatbyra-site)

### Övriga projekt (thumbnails i repot)

Varje projekt har `desktop.png`, `mobile.png` och `thumb.png` under:

`public/screenshots/projects/[slug]/`

| Slug | Mapp |
|------|------|
| `wordpress-portfolio-headless` | `public/screenshots/projects/wordpress-portfolio-headless/` |
| `pokemon-search-app` | `public/screenshots/projects/pokemon-search-app/` |
| `advokatbyra-site` | `public/screenshots/projects/advokatbyra-site/` |
| `nextjs-auth-blog-modernized` | `public/screenshots/projects/nextjs-auth-blog-modernized/` |
| `auth-blog-platform` | `public/screenshots/projects/auth-blog-platform/` |
| `calculator-app` | `public/screenshots/projects/calculator-app/` |
| `nic-cage-snacks-shop` | `public/screenshots/projects/nic-cage-snacks-shop/` |

Uppdatera captures efter ändrade deploy-URL:er:

```bash
npm run screenshots
```

---

## Deploy

| Plattform | Projekt | URL |
|-----------|---------|-----|
| **Vercel** (produktion) | `wordpress-portfolio` | https://elli-wordpress-portfolio.vercel.app |
| **Netlify** (övriga demos) | separata repos | se tabell ovan |

- Deploy sker från **`main`** via Vercel Git-integration.
- Miljövariabel `wordpressApiKey` måste finnas i Vercel (Settings → Environment Variables).
- `NEXT_PUBLIC_DEPLOY_URL` ska matcha Vercel-URL:en.

---

## Lokal utveckling

```bash
git clone https://github.com/Elli2022/wordpress-portfolio.git
cd wordpress-portfolio
npm install
cp .env.local.example .env.local   # sätt wordpressApiKey
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000)

Om dev-servern strular efter krasch: `rm -rf .next node_modules/.cache` och starta om.

Produktionslikt lokalt:

```bash
npm run build && npm run start
```

---

## Miljövariabler

```bash
# .env.local
wordpressApiKey=http://elliportfolio.atwebpages.com/graphql
NEXT_PUBLIC_DEPLOY_URL=https://elli-wordpress-portfolio.vercel.app
```

| Variabel | Syfte |
|----------|--------|
| `wordpressApiKey` | GraphQL-endpoint till WordPress |
| `NEXT_PUBLIC_DEPLOY_URL` | Bas-URL för previews / metadata |

---

## Routes

| Route | Syfte |
|--------|--------|
| `/` | Galleri, topic pills, projektgrid |
| `/work/[slug]` | Case study (pitch, outcome, screenshots, live + GitHub) |
| `/about` | Om mig (CMS eller fallback) |
| `/contact` | Kontakt (CMS eller fallback) |
| `/projects/[slug]` | WordPress-inlägg (t.ex. `hello-world`) |
| `/all` | Legacy/alternativ kontaktväg |

---

## Viktiga filer

| Fil | Innehåll |
|-----|----------|
| `src/data/projects.ts` | Alla projekt, deploy-URL:er, intervjucopy |
| `src/lib/fallback-content.ts` | About, Contact, Home-fallback |
| `src/lib/wp.ts` | GraphQL-klient (returnerar `null` om nyckel saknas) |
| `src/lib/project-images.ts` | Bildfallback-kedja |
| `src/app/components/ProjectShowcase.tsx` | Galleri, filter, grid på startsidan |
| `docs/CODEBASE.md` | Detaljerad komponent- och sidreferens (från ursprungsrepo) |
| `wordpress/mu-plugins/portfolio-cms.php` | CMS GraphQL-kompatibilitet |
| `netlify.toml` | 301-redirect av gammal portfolio-Netlify → Vercel |

---

## Relaterade repos (nov 2023, Capace)

| Repo | Roll |
|------|------|
| **[wordpress-portfolio](https://github.com/Elli2022/wordpress-portfolio)** | **Kanoniskt** — kod, deploy, dokumentation |
| [My-Headless-Wordpress-Portfolio](https://github.com/Elli2022/My-Headless-Wordpress-Portfolio) | Arkiverat — 2023-praktiksnapshot; pekar hit |
| [frontend-application](https://github.com/Elli2022/frontend-application) | Tidigare praktik-frontend |
| [typescript-app-template](https://github.com/Elli2022/typescript-app-template) | Mall |
| [fullstack-application](https://github.com/Elli2022/fullstack-application) | Fullstack-övning |
| [nextjs-auth-blog-modernized](https://github.com/Elli2022/nextjs-auth-blog-modernized) | Auth-blogg (demo) |

---

## CMS-setup

Se [wordpress/README.md](./wordpress/README.md) och [wordpress/HOSTING_GRATIS.md](./wordpress/HOSTING_GRATIS.md) för lokal Docker-setup, ACF JSON och import av innehåll.

---

## Licens & användning

Portfolio för rekrytering och praktik/demo. Kontakta mig via e-post ovan vid frågor om kod eller walkthrough.
