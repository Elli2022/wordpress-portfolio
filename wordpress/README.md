# WordPress GraphQL CMS (portfolio backend)

Det här är **WordPress-backenden** för [wordpress-portfolio](https://github.com/Elli2022/wordpress-portfolio). Next.js-appen i `src/` är oförändrad; den hämtar fortfarande data via `wordpressApiKey` mot `/graphql`.

## Vad som ingår

| Komponent | Syfte |
|-----------|--------|
| [WPGraphQL](https://www.wpgraphql.com/) | Exponerar WordPress som GraphQL API |
| [Advanced Custom Fields](https://www.advancedcustomfields.com/) | Fält som appen frågar efter (`homePage`, `aboutPage`, `allPage`, `PostInfo`) |
| [WPGraphQL for ACF](https://github.com/wp-graphql/wpgraphql-acf) | Gör ACF-fält tillgängliga i GraphQL |
| `acf-json/` | Fältdefinitioner som matchar befintliga queries i Next.js |
| Docker Compose | Lokal WordPress + MariaDB |

## Snabbstart

**Krav:** Docker Desktop (eller Docker Engine + Compose v2)

```bash
cd wordpress
chmod +x scripts/setup.sh
./scripts/setup.sh
```

Skriptet:

1. Startar WordPress på port **8081** som standard (ändras i `.env`; undvik 8080 om den redan är upptagen)
2. Installerar WPGraphQL, ACF och WPGraphQL for ACF
3. Skapar sidor (`/home`, `/about`, `/contact`, …) och exempel-inlägg
4. Fyller ACF-fält med startvärden

Koppla Next.js (från repots rot):

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

`.env.local` ska innehålla:

```bash
wordpressApiKey=http://localhost:8081/graphql
```

## GraphQL-test

Öppna [http://localhost:8081/graphql](http://localhost:8081/graphql) i webbläsaren (GraphiQL IDE) och kör t.ex.:

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

## Sidor och innehåll som appen förväntar sig

| URI / slug | GraphQL / användning |
|------------|----------------------|
| `/home` | `getHome("/home")` — ACF-grupp `homePage` |
| `/about` | `getAbout("/about")` — `aboutPage` |
| `/all` | `getAll` — `allPage` |
| Sidtitlar `Portfolio.`, `about me.`, `contact.` | Navigation i `page.tsx` |
| Inlägg (posts) | Paginering + `/projects/[slug]` med ACF `PostInfo` |

Redigera innehåll i wp-admin: **http://localhost:8081/wp-admin**

## Kommandon

```bash
# Starta/stoppa
docker compose up -d
docker compose down

# Loggar
docker compose logs -f wordpress

# WP-CLI (exempel)
docker compose run --rm wpcli wp plugin list
docker compose run --rm wpcli wp acf sync
```

## Produktion

För riktig drift (t.ex. managed WordPress, WP Engine, eller egen server):

1. Installera samma tre plugins manuellt
2. Importera fältgrupper från `acf-json/` (ACF → Tools → Import, eller `wp acf sync` om JSON ligger i `wp-content/acf-json`)
3. Sätt `wordpressApiKey` i Vercel/hosting till din publika URL, t.ex. `https://cms.example.com/graphql`
4. Se till att CORS tillåter din Next.js-domän (mu-plugin `portfolio-cms.php` sätter `*` lokalt; i produktion bör du begränsa till din frontend-URL)

## Filer (ändrar inte Next.js `src/`)

```
wordpress/
├── docker-compose.yml
├── .env.example
├── mu-plugins/portfolio-cms.php
├── acf-json/          # Fält som matchar GraphQL-queries
├── scripts/setup.sh
└── README.md
```
