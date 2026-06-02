"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

function getScrollStep(track: HTMLDivElement) {
  const card = track.querySelector<HTMLElement>(".gallery-card");
  if (!card) return 336;
  const styles = getComputedStyle(track);
  const gap = parseFloat(styles.columnGap || styles.gap || "16") || 16;
  return card.offsetWidth + gap;
}

export default function ProjectShowcase({
  projects = portfolioProjects,
}: ProjectShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(
    null
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const filtered = useMemo(() => {
    if (!activeCategory) return projects;
    return projects.filter((project) =>
      project.categories.includes(activeCategory)
    );
  }, [projects, activeCategory]);

  const syncScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = getScrollStep(track);
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const index =
      step > 0 ? Math.min(Math.round(track.scrollLeft / step), filtered.length - 1) : 0;

    setPageIndex(Math.max(0, index));
    setCanScrollPrev(track.scrollLeft > 8);
    setCanScrollNext(track.scrollLeft < maxScroll - 8);
  }, [filtered.length]);

  const scrollGallery = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollBy({
        left: direction * getScrollStep(track),
        behavior: "smooth",
      });
    },
    []
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollTo({ left: 0 });
    setPageIndex(0);
    syncScrollState();

    const onScroll = () => syncScrollState();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [filtered, syncScrollState]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") scrollGallery(-1);
      if (event.key === "ArrowRight") scrollGallery(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scrollGallery]);

  const total = filtered.length;

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
        <div className="gallery-viewport">
          <div ref={trackRef} className="project-gallery-track">
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
        </div>

        {total > 0 ? (
          <div className="gallery-nav-row">
            <div
              className="gallery-controls"
              role="group"
              aria-label="Gallery navigation"
            >
              <button
                type="button"
                className="gallery-nav-btn gallery-nav-prev"
                onClick={() => scrollGallery(-1)}
                disabled={!canScrollPrev}
                aria-label="Previous projects"
              >
                <span aria-hidden>‹</span>
              </button>
              <span className="gallery-nav-counter" aria-live="polite">
                <span className="gallery-nav-counter-current">{pageIndex + 1}</span>
                <span className="gallery-nav-counter-sep">/</span>
                <span className="gallery-nav-counter-total">{total}</span>
              </span>
              <button
                type="button"
                className="gallery-nav-btn gallery-nav-next"
                onClick={() => scrollGallery(1)}
                disabled={!canScrollNext}
                aria-label="Next projects"
              >
                <span aria-hidden>›</span>
              </button>
            </div>
          </div>
        ) : null}
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
