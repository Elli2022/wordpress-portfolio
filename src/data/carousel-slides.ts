import { portfolioProjects } from "./projects";

export type CarouselSlide = {
  slug: string;
  name: string;
  summary: string;
  href: string;
  thumbnailSources: string[];
};

const extraRepos: { name: string; url: string }[] = [
  {
    name: "frontend-application",
    url: "https://github.com/Elli2022/frontend-application",
  },
  {
    name: "typescript-app-template",
    url: "https://github.com/Elli2022/typescript-app-template",
  },
  {
    name: "fullstack-application",
    url: "https://github.com/Elli2022/fullstack-application",
  },
];

function githubPreviewSources(url: string) {
  const encoded = encodeURIComponent(url);
  return [
    `https://s.wordpress.com/mshots/v1/${encoded}?w=1200`,
    "/images/screenshot-placeholder.svg",
  ];
}

/** All deployed projects + extra GitHub repos for the homepage carousel. */
export function getCarouselSlides(): CarouselSlide[] {
  const projectSlides: CarouselSlide[] = portfolioProjects.map((project) => ({
    slug: project.slug,
    name: project.name,
    summary: project.summary,
    href: `/work/${project.slug}`,
    thumbnailSources: project.thumbnailSources,
  }));

  const portfolioRepoUrls = new Set(
    portfolioProjects.map((project) => project.repoUrl)
  );

  const repoSlides: CarouselSlide[] = extraRepos
    .filter((repo) => !portfolioRepoUrls.has(repo.url))
    .map((repo) => ({
      slug: repo.name,
      name: repo.name,
      summary: "Internship repository · Nov 2023",
      href: repo.url,
      thumbnailSources: githubPreviewSources(repo.url),
    }));

  return [...projectSlides, ...repoSlides];
}
