import React from "react";

type PictureBlockProps = {
  pictureBlock: {
    picture?: {
      mediaItemUrl?: string;
      altText?: string;
    };
    replaceurl?: string;
    replacetext?: string;
  };
};

export default function PictureBlock({ pictureBlock }: PictureBlockProps) {
  const url = pictureBlock.picture?.mediaItemUrl;
  if (!url) return null;

  const linkUrl = pictureBlock.replaceurl || "#";
  const label = pictureBlock.replacetext || "View next";

  return (
    <section className="picture-block">
      <img
        src={url}
        alt={pictureBlock.picture?.altText || ""}
        className="picture-block-image"
      />
      <div className="picture-block-cta">
        <a href={linkUrl} className="btn">
          {label} →
        </a>
      </div>
    </section>
  );
}
