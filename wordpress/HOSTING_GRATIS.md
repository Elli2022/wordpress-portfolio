# Gratis WordPress.org-host för portfolio-GraphQL

> **English:** [HOSTING.md](./HOSTING.md)

Det här ersätter **WordPress.com betalplan** (där du inte kan installera WPGraphQL).  
Du behöver **WordPress.org** på en host som tillåter plugins — helt gratis.

Rekommenderad host: **[InfinityFree](https://infinityfree.net)** (0 kr, plugins tillåtna).

---

## Steg 1 — Skapa gratis konto (ca 5 min)

1. Gå till https://infinityfree.net och skapa konto.
2. **Create Account** → välj gratis subdomän, t.ex. `dittnamn.epizy.com`.
3. Vänta tills kontot är aktivt (ofta några minuter).

---

## Steg 2 — Installera WordPress.org (inte WordPress.com)

1. Logga in på **InfinityFree Control Panel** → **Control Panel** för ditt konto.
2. Öppna **Softaculous** (eller **WordPress installer**).
3. Installera **WordPress** till webbroot (`htdocs` / `public_html`).
4. Notera:
   - Admin-URL: `https://dittnamn.epizy.com/wp-admin`
   - Användarnamn och lösenord du valde vid installation.

---

## Steg 3 — Ladda upp portfolio-CMS-filer från detta repo

På din dator (i repots `wordpress/`-mapp):

```bash
./scripts/build-hosting-package.sh
```

Det skapar `hosting/portfolio-cms-upload.zip`.

Via **InfinityFree File Manager** (eller FTP):

| Fil i zip | Ladda upp till |
|-----------|----------------|
| `mu-plugins/portfolio-cms.php` | `htdocs/wp-content/mu-plugins/portfolio-cms.php` |
| `acf-json/*.json` | `htdocs/wp-content/acf-json/` |

Skapa mappen `mu-plugins` om den inte finns.

---

## Steg 4 — Installera de tre plugins (gratis)

I wp-admin: **Plugins → Add New**, sök och **Installera + Aktivera**:

1. **WPGraphQL**
2. **Advanced Custom Fields**
3. **WPGraphQL for ACF**

(Samma lista finns i `plugins-required.txt`.)

---

## Steg 5 — Synka ACF-fält

1. **Custom Fields** i admin-menyn.
2. Om du ser **Sync available** för fältgrupperna → klicka **Sync**.
3. Annars: fält laddas automatiskt från `wp-content/acf-json/`.

Fältgrupper som matchar ditt Next.js-projekt:

- `homePage` (sida slug `home`)
- `aboutPage` (sida slug `about`)
- `allPage` (sida slug `all`)
- `PostInfo` (alla inlägg)

---

## Steg 6 — Importera exempelinnehåll (valfritt)

Exportera från lokal Docker-setup:

```bash
./scripts/export-content.sh
```

Importera på hosten:

1. **Plugins → Add New** → installera **WordPress Importer** (engångs).
2. **Tools → Import → WordPress** → välj `hosting/portfolio-content-export.xml`.

Eller skapa sidor manuellt med exakt dessa **sidtitlar** (viktigt för navigation i Next.js):

| Slug | Titel (exakt) |
|------|----------------|
| `home` | Home |
| `about` | about me. |
| `contact` | contact. |
| `portfolio` | Portfolio. |
| `all` | All |

Skapa minst 6 **inlägg** (posts) med slug `project-1` … `project-6` om du vill testa paginering.

---

## Steg 7 — Permalänkar och startsida

1. **Settings → Permalinks** → välj **Post name** → Save.
2. **Settings → Reading** → **A static page** → Front page: **Home**.

---

## Steg 8 — Testa GraphQL

Öppna i webbläsaren:

`https://dittnamn.epizy.com/graphql`

Testfråga:

```graphql
{
  page(id: "/home", idType: URI) {
    homePage {
      homePageTitle
      presentingText
    }
  }
  posts(first: 2) {
    nodes {
      title
      slug
      PostInfo {
        subtitle
      }
    }
  }
}
```

`PostInfo` fungerar tack vare `mu-plugins/portfolio-cms.php` (omskrivs internt till compat-fält).

---

## Steg 9 — Koppla Next.js (ingen ändring i `src/`)

I repots rot:

```bash
cp .env.local.example .env.local
```

Redigera `.env.local`:

```bash
wordpressApiKey=https://dittnamn.epizy.com/graphql
```

```bash
npm install
npm run dev
```

På **Vercel**: lägg samma variabel under Project → Settings → Environment Variables.

---

## Felsökning

| Problem | Lösning |
|---------|---------|
| GraphQL 404 | Kontrollera att **WPGraphQL** är aktivt. Testa `/graphql`. |
| `PostInfo` / tomma fält | Kontrollera att `portfolio-cms.php` ligger i `mu-plugins`. |
| CORS-fel från Vercel | mu-plugin sätter `*` lokalt; i produktion kan du begränsa till din Vercel-URL i `portfolio-cms.php`. |
| Sidtitlar i nav fel | Titlar måste matcha: `Portfolio.`, `about me.`, `contact.` |
| WordPress.com | Fungerar **inte** för WPGraphQL — använd InfinityFree eller annan WP.org-host. |

---

## Andra gratis alternativ (samma steg)

- **ByetHost** + Softaculous WordPress  
- **Freehostia** (begränsad, men plugins ofta OK)  
- **Egen VPS gratis tier** (Oracle Cloud) — mer tekniskt

Undvik **WordPress.com Free** — där kan du inte installera WPGraphQL.
