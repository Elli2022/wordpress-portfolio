import getAll from "@/lib/queries/getAll";
import { contactFallback } from "@/lib/fallback-content";
import ContactPageView from "../components/ContactPageView";

export default async function Contact() {
  const contactData = await getAll("/contact");

  const title =
    contactData?.allPage?.allPageTitle ?? contactFallback.allPageTitle;
  const subtitle =
    contactData?.allPage?.orkarInteMer ?? contactFallback.orkarInteMer;
  const content = contactData?.content ?? contactFallback.content;

  return (
    <ContactPageView
      title={title}
      subtitle={subtitle}
      contentHtml={content}
    />
  );
}
