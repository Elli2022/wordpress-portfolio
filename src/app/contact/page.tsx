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
      <header className="content-header">
        <p className="content-eyebrow">{contactFallback.presentingText}</p>
        <h1 className="content-title">{title}</h1>
        <p className="content-lead">{subtitle}</p>
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
