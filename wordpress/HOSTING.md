# Free WordPress.org hosting for portfolio GraphQL

Use **WordPress.org** on a host that allows plugins — not **WordPress.com** paid plans (you cannot install WPGraphQL there).

**Recommended:** [InfinityFree](https://infinityfree.net) (free, plugins allowed).

> Swedish version: [HOSTING_GRATIS.md](./HOSTING_GRATIS.md)

---

## Step 1 — Create a free account (~5 min)

1. Go to https://infinityfree.net and sign up.
2. **Create Account** → choose a free subdomain, e.g. `yourname.epizy.com`.
3. Wait until the account is active (usually a few minutes).

---

## Step 2 — Install WordPress.org (not WordPress.com)

1. Log in to **InfinityFree Control Panel** → open your site’s control panel.
2. Open **Softaculous** (or **WordPress installer**).
3. Install **WordPress** to the web root (`htdocs` / `public_html`).
4. Note your admin URL (`https://yourname.epizy.com/wp-admin`) and credentials.

---

## Step 3 — Upload portfolio CMS files from this repo

On your machine, in the repo’s `wordpress/` folder:

```bash
./scripts/build-hosting-package.sh
```

This creates `hosting/portfolio-cms-upload.zip`.

Upload via **File Manager** or FTP:

| File in zip | Upload to |
|-------------|-----------|
| `mu-plugins/portfolio-cms.php` | `htdocs/wp-content/mu-plugins/portfolio-cms.php` |
| `acf-json/*.json` | `htdocs/wp-content/acf-json/` |

Create `mu-plugins` if it does not exist.

---

## Step 4 — Install the three plugins (free)

In wp-admin: **Plugins → Add New**, search, **Install + Activate**:

1. **WPGraphQL**
2. **Advanced Custom Fields**
3. **WPGraphQL for ACF**

(Same list in `plugins-required.txt`.)

---

## Step 5 — Sync ACF fields

1. Open **Custom Fields** in the admin menu.
2. If you see **Sync available** for field groups → click **Sync**.
3. Otherwise fields load from `wp-content/acf-json/`.

Field groups used by Next.js:

- `homePage` (page slug `home`)
- `aboutPage` (page slug `about`)
- `allPage` (page slug `all`)
- `PostInfo` (all posts)

---

## Step 6 — Import sample content (optional)

Export from local Docker:

```bash
./scripts/export-content.sh
```

Import on the host:

1. Install **WordPress Importer** (one-time).
2. **Tools → Import → WordPress** → `hosting/portfolio-content-export.xml`.

Or create pages manually with these **exact titles** (required for navigation):

| Slug | Title (exact) |
|------|----------------|
| `home` | Home |
| `about` | about me. |
| `contact` | contact. |
| `portfolio` | Portfolio. |
| `all` | All |

Create at least 6 **posts** with slugs `project-1` … `project-6` to test pagination.

---

## Step 7 — Permalinks and front page

1. **Settings → Permalinks** → **Post name** → Save.
2. **Settings → Reading** → **A static page** → Front page: **Home**.

---

## Step 8 — Test GraphQL

Open: `https://yourname.epizy.com/graphql`

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

`PostInfo` works via `mu-plugins/portfolio-cms.php` (compat field mapping).

---

## Step 9 — Connect Next.js (no `src/` changes)

From repo root:

```bash
cp .env.local.example .env.local
```

Set:

```bash
wordpressApiKey=https://yourname.epizy.com/graphql
```

```bash
npm install
npm run dev
```

On **Vercel**: add the same variable under Project → Settings → Environment Variables.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| GraphQL 404 | Ensure **WPGraphQL** is active; test `/graphql`. |
| `PostInfo` / empty fields | Confirm `portfolio-cms.php` is in `mu-plugins`. |
| CORS from Vercel | Restrict origin in `portfolio-cms.php` for production. |
| Wrong nav labels | Titles must be exactly: `Portfolio.`, `about me.`, `contact.` |
| WordPress.com | Does **not** support WPGraphQL — use InfinityFree or another WP.org host. |

---

## Other free options

- **ByetHost** + Softaculous  
- **Freehostia** (limited)  
- **Oracle Cloud free tier** (more technical)

Avoid **WordPress.com Free** — no custom WPGraphQL install.
