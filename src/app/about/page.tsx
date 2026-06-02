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
      <header className="text-center mt-10 mb-8">
        <p className="mt-4 uppercase tracking-wide text-sm text-gray-600">
          {presentingText}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">{title}</h1>
      </header>

      <section className="case-study-card max-w-3xl mx-auto">
        <CmsHtml html={content} />
      </section>
    </SiteShell>
  );
}
