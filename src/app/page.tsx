import Link from "next/link";
import getHome from "@/lib/queries/getHome";
import getPages from "@/lib/queries/getPages";
import {
  getProjectsByCategory,
  projectCategories,
} from "@/data/projects";
import ProjectCarousel from "./components/ProjectCarousel";
import ProjectThumbnail from "./components/ProjectThumbnail";
import { getCarouselSlides } from "@/data/carousel-slides";
import { homeFallback } from "@/lib/fallback-content";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

interface NavLink {
  id: string;
  title: string;
  uri: string;
}

function getParam(searchParams: SearchParams, key: string, fallback = ""): string {
  const value = searchParams[key];
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value ?? fallback;
}

/** CMS may still point at legacy /projects/ or #posts — both should scroll to the grid. */
function normalizeExploreWorksUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed || trimmed === "/projects" || trimmed === "/projects/") {
    return "#projects";
  }
  if (trimmed === "#posts" || trimmed === "/posts" || trimmed === "/posts/") {
    return "#projects";
  }
  return trimmed;
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const activeCategory = getParam(searchParams, "category");
  const showcaseProjects = getProjectsByCategory(activeCategory || undefined);
  const carouselSlides = getCarouselSlides();

  const [cmsHome, navData] = await Promise.all([getHome("/home"), getPages()]);
  const homePage = cmsHome?.homePage ?? homeFallback;

  const navHits: NavLink[] = (navData?.edges ?? []).map((hit: { node: NavLink }) => hit.node);
  const mainLinks = {
    portfolio:
      navHits.find((hit) => hit.title === "Portfolio.") ??
      ({ id: "fallback-portfolio", uri: "/", title: "Portfolio." } as NavLink),
    about:
      navHits.find((hit) => hit.title === "about me.") ??
      ({ id: "fallback-about", uri: "/about/", title: "about me." } as NavLink),
    contact:
      navHits.find((hit) => hit.title === "contact.") ??
      ({ id: "fallback-contact", uri: "/contact/", title: "contact." } as NavLink),
  };

  const heroTitle = homePage.homePageTitle.replace("fueled", "fueled<br />");

  return (
    <main className="page-shell">
      <nav className="nav-container" aria-label="Primary navigation">
        <div className="nav-left">
          <a key={mainLinks.portfolio.id} href={mainLinks.portfolio.uri} className="link">
            {mainLinks.portfolio.title}
          </a>
        </div>
        <div className="nav-right">
          <a key={mainLinks.about.id} href={mainLinks.about.uri} className="link">
            {mainLinks.about.title}
          </a>
          <a key={mainLinks.contact.id} href={mainLinks.contact.uri} className="link">
            {mainLinks.contact.title}
          </a>
        </div>
      </nav>

      <header className="hero">
        <p className="hero-kicker">{homePage.presentingText}</p>
        <h1
          className="hero-title"
          dangerouslySetInnerHTML={{
            __html: heroTitle,
          }}
        />
        {homePage.buttonUrl && homePage.buttonText && (
          <a href={normalizeExploreWorksUrl(homePage.buttonUrl)} className="btn">
            {homePage.buttonText}
          </a>
        )}
      </header>

      <div id="projects">
        <ProjectCarousel slides={carouselSlides} />
      </div>

      <section className="category-links topic-row" aria-label="Filter projects by topic">
        <Link
          href="/"
          className={`topic-pill category-link ${!activeCategory ? "topic-pill-active" : ""}`}
        >
          All
        </Link>
        {projectCategories.map((category) => (
          <Link
            key={category}
            href={`/?category=${encodeURIComponent(category)}`}
            className={`topic-pill category-link ${
              activeCategory === category ? "topic-pill-active" : ""
            }`}
          >
            {category}
          </Link>
        ))}
      </section>

      <section className="posts-grid" aria-label="Project list">
        {showcaseProjects.map((project) => (
          <article key={project.slug} className="post-card showcase-card">
            <Link href={`/work/${project.slug}`} className="post-card-media image-container">
                <ProjectThumbnail
                  sources={project.thumbnailSources}
                  alt={`${project.name} thumbnail`}
                />
            </Link>
            <div className="post-info">
              <Link href={`/work/${project.slug}`}>
                <h2 className="post-title">{project.name}</h2>
              </Link>
              <p className="post-subtitle">{project.summary}</p>
              <div className="topic-row thumb-topics">
                {project.categories.map((category) => (
                  <span key={category} className="topic-pill topic-pill-static">
                    {category}
                  </span>
                ))}
              </div>
              <Link href={`/work/${project.slug}`} className="case-study-link">
                Read case study →
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="freelance-section">
        <p className="freelance-title">{homePage.freelanceProjects.freelanceTitle}</p>
        <h3 className="freelance-description">
          {homePage.freelanceProjects.freelanceDescription}
        </h3>
        <a
          href={homePage.freelanceProjects.freelanceContactUrl}
          className="btn"
        >
          {homePage.freelanceProjects.freelanceProjectsButton}
        </a>
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </main>
  );
}
