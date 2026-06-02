"use client";

import RobustImage from "./RobustImage";

type ProjectThumbnailProps = {
  sources: string[];
  alt: string;
};

export default function ProjectThumbnail({ sources, alt }: ProjectThumbnailProps) {
  return <RobustImage sources={sources} alt={alt} />;
}
