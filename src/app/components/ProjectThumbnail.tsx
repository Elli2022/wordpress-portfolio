"use client";

import { useState } from "react";

type ProjectThumbnailProps = {
  src: string;
  alt: string;
};

export default function ProjectThumbnail({ src, alt }: ProjectThumbnailProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc("/images/screenshot-placeholder.svg")}
    />
  );
}
