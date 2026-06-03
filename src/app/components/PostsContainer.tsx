import Link from "next/link";
import type { ShowcaseProject } from "./ProjectShowcase";
import RobustImage from "./RobustImage";

type PostsContainerProps = {
  posts: ShowcaseProject[];
};

export default function PostsContainer({ posts }: PostsContainerProps) {
  if (posts.length === 0) {
    return (
      <div className="posts-grid-2023-empty">
        <p>No projects found in this category.</p>
      </div>
    );
  }

  return (
    <div className="posts-grid-2023" aria-label="Project grid">
      {posts.map((project) => {
        const label = project.categories[0]?.toUpperCase() ?? "PROJECT";

        return (
          <div key={project.slug} className="posts-grid-2023-item">
            <Link href={`/work/${project.slug}`} className="posts-grid-2023-link">
              <div className="posts-grid-2023-media">
                <RobustImage
                  sources={project.thumbnailSources}
                  alt={project.name}
                  className="posts-grid-2023-image"
                />
              </div>
              <div className="posts-grid-2023-caption">
                <p className="posts-grid-2023-label">{label}</p>
                <h2 className="posts-grid-2023-title">{project.name}</h2>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
