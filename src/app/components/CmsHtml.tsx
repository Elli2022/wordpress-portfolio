type CmsHtmlProps = {
  html?: string | null;
  className?: string;
};

export default function CmsHtml({ html, className = "cms-content" }: CmsHtmlProps) {
  if (!html) return null;
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
