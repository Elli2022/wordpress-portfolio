import getHome from "@/lib/queries/getHome";
import getPages from "@/lib/queries/getPages";
import Navigation from "./components/Navigation";
import ProjectShowcase from "./components/ProjectShowcase";
import { homeFallback } from "@/lib/fallback-content";

interface NavLink {
  id: string;
  title: string;
  uri: string;
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

export default async function Home() {
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
      <Navigation
        portfolioLink={mainLinks.portfolio}
        aboutLink={mainLinks.about}
        contactLink={mainLinks.contact}
      />

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
        <ProjectShowcase />
      </div>

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
