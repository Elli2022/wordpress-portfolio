"use client";

import { useState } from "react";

type RobustImageProps = {
  sources: string[];
  alt: string;
  className?: string;
};

export default function RobustImage({ sources, alt, className }: RobustImageProps) {
  const safeSources =
    sources.length > 0 ? sources : ["/images/screenshot-placeholder.svg"];
  const [index, setIndex] = useState(0);
  const src = safeSources[Math.min(index, safeSources.length - 1)];

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        setIndex((current) => {
          if (current >= safeSources.length - 1) return current;
          return current + 1;
        });
      }}
    />
  );
}
