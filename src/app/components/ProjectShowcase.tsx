"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  portfolioProjects,
  projectCategories,
  type ProjectCategory,
  type PortfolioProject,
} from "@/data/projects";
import RobustImage from "./RobustImage";

export type ShowcaseProject = Pick<
  PortfolioProject,
  "slug" | "name" | "summary" | "categories" | "thumbnailSources"
>;

type ProjectShowcaseProps = {
  projects?: ShowcaseProject[];
};

export default function ProjectShowcase({
  projects = portfolioProjects,
}: ProjectShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(
    null
  );

  const filtered = useMemo(() => {
    if (!activeCategory) return projects;
    return projects.filter((project) =>
      project.categories.includes(activeCategory)
    );
  }, [projects, activeCategory]);

  return (
    <div className="project-showcase">
      <section
        className="category-links topic-row"
        aria-label="Filter projects by topic"
      >
        <button
          type="button"
          className={`topic-pill category-link ${
            activeCategory === null ? "topic-pill-active" : ""
          }`}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={`topic-pill category-link ${
              activeCategory === category ? "topic-pill-active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </section>

      <section className="project-gallery" aria-label="Project gallery">
        <div className="project-gallery-track">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="gallery-card"
            >
              <div className="gallery-card-media">
                <RobustImage
                  sources={project.thumbnailSources}
                  alt={`${project.name} preview`}
                  className="gallery-card-image"
                />
              </div>
              <div className="gallery-card-info">
                <h3 className="gallery-card-title">{project.name}</h3>
                <p className="gallery-card-summary">{project.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="posts-grid" aria-label="Project list">
        {filtered.map((project) => (
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
                  <span
                    key={category}
                    className="topic-pill topic-pill-static"
                  >
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
    </div>
  );
}
