import getHome from "@/lib/queries/getHome";
import getPages from "@/lib/queries/getPages";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import ExploreButton from "./components/ExploreButton";
import ProjectShowcase from "./components/ProjectShowcase";
import FreelanceSection from "./components/FreelanceSection";
import Footer from "./components/Footer";
import { homeFallback } from "@/lib/fallback-content";

interface NavLink {
  id: string;
  title: string;
  uri: string;
}

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
    <main className="page-shell page-light">
      <Navigation
        portfolioLink={mainLinks.portfolio}
        aboutLink={mainLinks.about}
        contactLink={mainLinks.contact}
      />

      <Header
        presentingText={homePage.presentingText}
        titleHtml={heroTitle}
      />

      {homePage.buttonUrl && homePage.buttonText ? (
        <ExploreButton
          buttonText={homePage.buttonText}
          buttonUrl={normalizeExploreWorksUrl(homePage.buttonUrl)}
        />
      ) : null}

      <div id="projects">
        <ProjectShowcase />
      </div>

      <FreelanceSection
        freelanceTitle={homePage.freelanceProjects.freelanceTitle}
        freelanceDescription={homePage.freelanceProjects.freelanceDescription}
        freelanceContactUrl={homePage.freelanceProjects.freelanceContactUrl}
        freelanceProjectsButton={homePage.freelanceProjects.freelanceProjectsButton}
      />

      <Footer />
    </main>
  );
}
