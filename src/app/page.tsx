import Link from "next/link";
import Image from "next/image";
import getHome from "@/lib/queries/getHome";
import getPages from "@/lib/queries/getPages";
import getPosts from "@/lib/queries/getPosts";
import PaginationControls from "./components/PaginationControls";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

interface NavLink {
  id: string;
  title: string;
  uri: string;
}

interface Post {
  id: string;
  slug: string;
  title: string;
  PostInfo?: {
    subtitle?: string;
  };
  featuredImage?: {
    node?: {
      mediaItemUrl?: string;
      altText?: string | null;
    };
  };
}

function getParam(searchParams: SearchParams, key: string, fallback = ""): string {
  const value = searchParams[key];
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value ?? fallback;
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const page = Number(getParam(searchParams, "page", "1"));
  const perPage = Number(getParam(searchParams, "per_page", "6"));
  const afterCursor = getParam(searchParams, "after");
  const beforeCursor = getParam(searchParams, "before");

  const [{ posts, pageInfo }, homeData, navData] = await Promise.all([
    getPosts(page, perPage, afterCursor, beforeCursor),
    getHome("/home"),
    getPages(),
  ]);

  const navHits: NavLink[] = (navData?.edges ?? []).map((hit: { node: NavLink }) => hit.node);
  const mainLinks = {
    portfolio: navHits.find((hit) => hit.title === "Portfolio."),
    about: navHits.find((hit) => hit.title === "about me."),
    contact: navHits.find((hit) => hit.title === "contact."),
  };
  const otherLinks = navHits.filter(
    (hit) => !["Portfolio.", "about me.", "contact."].includes(hit.title),
  );

  const heroTitle =
    homeData?.homePage?.homePageTitle?.replace("fueled", "fueled<br />") ?? "Creative work";

  return (
    <main className="page-shell">
      <nav className="nav-container" aria-label="Primary navigation">
        <div className="nav-left">
          {mainLinks.portfolio && (
            <a key={mainLinks.portfolio.id} href={mainLinks.portfolio.uri} className="link">
              {mainLinks.portfolio.title}
            </a>
          )}
        </div>
        <div className="nav-right">
          {mainLinks.about && (
            <a key={mainLinks.about.id} href={mainLinks.about.uri} className="link">
              {mainLinks.about.title}
            </a>
          )}
          {mainLinks.contact && (
            <a key={mainLinks.contact.id} href={mainLinks.contact.uri} className="link">
              {mainLinks.contact.title}
            </a>
          )}
        </div>
      </nav>

      <header className="hero">
        <p className="hero-kicker">{homeData?.homePage?.presentingText}</p>
        <h1
          className="hero-title"
          dangerouslySetInnerHTML={{
            __html: heroTitle,
          }}
        />
        {homeData?.homePage?.buttonUrl && homeData?.homePage?.buttonText && (
          <a href={homeData.homePage.buttonUrl} className="btn">
            {homeData.homePage.buttonText}
          </a>
        )}
      </header>

      <section className="chip-links" aria-label="Project categories">
        {otherLinks.map((link) => (
          <a key={link.id} href={link.uri} className="chip-link">
            {link.title}
          </a>
        ))}
      </section>

      <section className="posts-grid" aria-label="Project list">
        {(posts as Post[]).map((post) => {
          const imageUrl = post.featuredImage?.node?.mediaItemUrl;
          return (
            <Link key={post.id} href={`/projects/${post.slug}`} className="post-card">
              <div className="post-card-media">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={post.featuredImage?.node?.altText || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="post-card-fallback">No preview available</div>
                )}
              </div>
              <div className="post-info">
                <h2 className="post-title">{post.title}</h2>
                {post.PostInfo?.subtitle && <p className="post-subtitle">{post.PostInfo.subtitle}</p>}
              </div>
            </Link>
          );
        })}
        {(!posts || (posts as Post[]).length === 0) && (
          <div className="post-card-fallback-panel">
            Portfolio items are currently unavailable. Please check the CMS connection.
          </div>
        )}
      </section>

      <PaginationControls
        hasNextPage={Boolean(pageInfo?.hasNextPage)}
        hasPrevPage={page > 1}
        endCursor={pageInfo?.endCursor ?? ""}
        startCursor={pageInfo?.startCursor ?? ""}
      />

      <section className="freelance-section">
        <p className="freelance-title">{homeData?.homePage?.freelanceProjects?.freelanceTitle}</p>
        <h3 className="freelance-description">
          {homeData?.homePage?.freelanceProjects?.freelanceDescription}
        </h3>
        {homeData?.homePage?.freelanceProjects?.freelanceProjectsLink?.url && (
          <a
            href={homeData.homePage.freelanceProjects.freelanceProjectsLink.url}
            className="btn"
          >
            {homeData?.homePage?.freelanceProjects?.freelanceProjectsButton || "Get in touch"}
          </a>
        )}
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </main>
  );
}
