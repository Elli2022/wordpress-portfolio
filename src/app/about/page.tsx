import getAbout from "@/lib/queries/getAbout";
import { getMainNavLinks } from "@/lib/nav";
import { aboutFallback } from "@/lib/fallback-content";
import SiteShell from "../components/SiteShell";
import CmsHtml from "../components/CmsHtml";

export default async function About() {
  const aboutData = await getAbout("/about");
  const { portfolio, about, contact } = await getMainNavLinks();

  const presentingText =
    aboutData?.aboutPage?.presentingText ?? aboutFallback.presentingText;
  const title =
    aboutData?.aboutPage?.aboutPageTitle ?? aboutFallback.aboutPageTitle;
  const content = aboutData?.content ?? aboutFallback.content;

  return (
    <SiteShell portfolioLink={portfolio} aboutLink={about} contactLink={contact}>
      <header className="content-header">
        <p className="content-eyebrow">{presentingText}</p>
        <h1 className="content-title">{title}</h1>
      </header>

      <section className="case-study-card max-w-3xl mx-auto">
        <CmsHtml html={content} />
      </section>
    </SiteShell>
  );
}
