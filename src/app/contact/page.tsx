import getAll from "@/lib/queries/getAll";
import { getMainNavLinks } from "@/lib/nav";
import { contactFallback } from "@/lib/fallback-content";
import SiteShell from "../components/SiteShell";
import CmsHtml from "../components/CmsHtml";

export default async function Contact() {
  const contactData = await getAll("/contact");
  const { portfolio, about, contact } = await getMainNavLinks();

  const title =
    contactData?.allPage?.allPageTitle ?? contactFallback.allPageTitle;
  const subtitle =
    contactData?.allPage?.orkarInteMer ?? contactFallback.orkarInteMer;
  const content = contactData?.content ?? contactFallback.content;

  return (
    <SiteShell portfolioLink={portfolio} aboutLink={about} contactLink={contact}>
      <header className="text-center mt-10 mb-8">
        <p className="mt-4 uppercase tracking-wide text-sm text-gray-600">
          {contactFallback.presentingText}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">{title}</h1>
        <p className="text-lg mt-4 text-gray-700">{subtitle}</p>
      </header>

      <section className="case-study-card max-w-3xl mx-auto text-center">
        <CmsHtml html={content} />
        <div className="case-actions justify-center mt-8">
          <a
            href="https://github.com/Elli2022"
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            GitHub
          </a>
          <a
            href="https://elli-wordpress-portfolio.vercel.app"
            className="btn btn-secondary"
          >
            Portfolio home
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
