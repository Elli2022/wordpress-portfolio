import getAll from "@/lib/queries/getAll";
import { contactFallback } from "@/lib/fallback-content";
import ContactPageView from "../components/ContactPageView";

export default async function All() {
  const allData = await getAll("/all");

  const title = allData?.allPage?.allPageTitle ?? contactFallback.allPageTitle;
  const subtitle =
    allData?.allPage?.orkarInteMer ?? contactFallback.orkarInteMer;
  const content = allData?.content ?? contactFallback.content;

  return (
    <ContactPageView
      title={title}
      subtitle={subtitle}
      contentHtml={content}
    />
  );
}
