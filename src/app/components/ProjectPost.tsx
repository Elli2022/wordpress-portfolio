import Image from "next/image";
import React from "react";
import type { WpPostDetail } from "@/lib/queries/getPost";

type ProjectPostProps = {
  postData: WpPostDetail;
};

export default function ProjectPost({ postData }: ProjectPostProps) {
  const imageUrl = postData.featuredImage?.node?.mediaItemUrl;
  const alt = postData.featuredImage?.node?.altText || postData.title;

  return (
    <article className="project-post">
      {imageUrl ? (
        <div className="project-post-hero">
          <Image
            src={imageUrl}
            alt={alt || ""}
            width={1200}
            height={640}
            className="project-post-image"
            priority
          />
        </div>
      ) : null}
      <div className="project-post-body case-study-card">
        <h1 className="content-title">{postData.title}</h1>
        {postData.content ? (
          <div
            className="cms-content"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        ) : null}
      </div>
    </article>
  );
}
