import getAbout from "@/lib/queries/getAbout";
import { aboutFallback } from "@/lib/fallback-content";
import AboutPageView from "../components/AboutPageView";

export default async function About() {
  const aboutData = await getAbout("/about");

  const presentingText =
    aboutData?.aboutPage?.presentingText ?? aboutFallback.presentingText;
  const title =
    aboutData?.aboutPage?.aboutPageTitle ?? aboutFallback.aboutPageTitle;
  const content = aboutData?.content ?? aboutFallback.content;

  return (
    <AboutPageView
      presentingText={presentingText}
      title={title}
      contentHtml={content}
    />
  );
}
