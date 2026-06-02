"use client";

import type { ProjectCategory } from "@/data/projects";
import { projectCategories } from "@/data/projects";

type FilterCategoryProps = {
  activeCategory: ProjectCategory | null;
  onCategoryChange: (category: ProjectCategory | null) => void;
};

/** Topic pills — client-side only (no route change, no scroll jump). */
export default function FilterCategory({
  activeCategory,
  onCategoryChange,
}: FilterCategoryProps) {
  return (
    <section
      className="category-links topic-row"
      aria-label="Filter projects by topic"
    >
      <button
        type="button"
        className={`topic-pill category-link ${
          activeCategory === null ? "topic-pill-active" : ""
        }`}
        onClick={() => onCategoryChange(null)}
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
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </section>
  );
}
