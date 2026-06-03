"use client";

import { useEffect, useMemo, useState } from "react";
import {
  portfolioProjects,
  type ProjectCategory,
  type PortfolioProject,
} from "@/data/projects";
import FilterCategory from "./FilterCategory";
import PostsContainer from "./PostsContainer";
import HomePagination from "./HomePagination";

export type ShowcaseProject = Pick<
  PortfolioProject,
  "slug" | "name" | "summary" | "categories" | "thumbnailSources"
>;

type ProjectShowcaseProps = {
  projects?: ShowcaseProject[];
};

const PER_PAGE = 6;

export default function ProjectShowcase({
  projects = portfolioProjects,
}: ProjectShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(
    null
  );
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!activeCategory) return projects;
    return projects.filter((project) =>
      project.categories.includes(activeCategory)
    );
  }, [projects, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <div className="project-showcase-2023">
      <FilterCategory
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <PostsContainer posts={paginated} />
      <HomePagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
