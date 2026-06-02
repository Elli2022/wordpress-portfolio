import Link from "next/link";
import type { ShowcaseProject } from "./ProjectShowcase";
import RobustImage from "./RobustImage";

type PostsContainerProps = {
  posts: ShowcaseProject[];
};

export default function PostsContainer({ posts }: PostsContainerProps) {
  if (posts.length === 0) {
    return (
      <p className="post-card-fallback-panel">
        No projects in this category yet.
      </p>
    );
  }

  return (
    <section className="posts-grid" aria-label="Project list">
      {posts.map((project) => (
        <article key={project.slug} className="post-card showcase-card">
          <Link
            href={`/work/${project.slug}`}
            className="post-card-media image-container"
          >
            <RobustImage
              sources={project.thumbnailSources}
              alt={`${project.name} thumbnail`}
              className="gallery-card-image"
            />
          </Link>
          <div className="post-info">
            <Link href={`/work/${project.slug}`}>
              <h2 className="post-title">{project.name}</h2>
            </Link>
            <p className="post-subtitle">{project.summary}</p>
            <div className="topic-row thumb-topics">
              {project.categories.map((category) => (
                <span key={category} className="topic-pill topic-pill-static">
                  {category}
                </span>
              ))}
            </div>
            <Link href={`/work/${project.slug}`} className="case-study-link">
              Read case study →
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
