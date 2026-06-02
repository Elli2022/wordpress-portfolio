"use client";

import { useState } from "react";

type ProjectScreenshotProps = {
  src: string;
  alt: string;
  label: string;
  href: string;
};

export default function ProjectScreenshot({
  src,
  alt,
  label,
  href,
}: ProjectScreenshotProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <figure className="screenshot-figure">
      <a href={href} target="_blank" rel="noreferrer" className="screenshot-link">
        <img
          src={imgSrc}
          alt={alt}
          onError={() => setImgSrc("/images/screenshot-placeholder.svg")}
        />
      </a>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
