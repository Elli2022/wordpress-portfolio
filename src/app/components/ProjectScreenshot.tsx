"use client";

import RobustImage from "./RobustImage";

type ProjectScreenshotProps = {
  sources: string[];
  alt: string;
  label: string;
  href: string;
};

export default function ProjectScreenshot({
  sources,
  alt,
  label,
  href,
}: ProjectScreenshotProps) {
  return (
    <figure className="screenshot-figure">
      <a href={href} target="_blank" rel="noreferrer" className="screenshot-link">
        <RobustImage sources={sources} alt={alt} />
      </a>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
