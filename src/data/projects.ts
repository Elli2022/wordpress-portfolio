import {
  buildProjectScreenshots,
  getProjectImageSources,
} from "@/lib/project-images";

export type ProjectCategory =
  | "React"
  | "Next.js"
  | "WordPress"
  | "Fullstack"
  | "JavaScript"
  | "UI/UX";

export type ProjectScreenshot = {
  sources: string[];
  label: string;
};

export type PortfolioProject = {
  slug: string;
  name: string;
  summary: string;
  pitch: string;
  description: string;
  outcome: string;
  learned: string[];
  role: string;
  period: string;
  techStack: string[];
  highlights: string[];
  categories: ProjectCategory[];
  deployUrl: string;
  liveAvailable?: boolean;
  liveStatusNote?: string;
  repoUrl: string;
  thumbnailSources: string[];
  screenshots: ProjectScreenshot[];
};

function projectMedia(slug: string, deployUrl: string) {
  return {
    thumbnailSources: getProjectImageSources(slug, deployUrl, "thumb"),
    screenshots: buildProjectScreenshots(slug, deployUrl),
  };
}

export const projectCategories: ProjectCategory[] = [
  "React",
  "Next.js",
  "WordPress",
  "Fullstack",
  "JavaScript",
  "UI/UX",
];

/** Flagship projects appear first on the homepage grid. */
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "wordpress-portfolio-headless",
    name: "Headless WordPress Portfolio",
    summary:
      "Agency internship portfolio — rebuilt headless with WordPress GraphQL, Next.js, and a 2026 stability refresh.",
    pitch:
      "I rebuilt my Capace internship portfolio so content editors can use WordPress while visitors get a fast Next.js site — without rewriting the original frontend queries.",
    description:
      "This is my main internship deliverable from Capace (Malmö). The first version connected a Next.js frontend to WordPress via WPGraphQL and ACF. In 2026 I modernized the runtime (null-safety, clearer data layer, Vercel deploy) and added a compatibility mu-plugin so legacy GraphQL fields still work.",
    outcome:
      "Live portfolio on Vercel, CMS on AwardSpace, and a case-study flow (filter → project page → live deploy). The 2026 refresh used AI-assisted tooling; I verified builds, GraphQL, and deploys myself.",
    learned: [
      "How to separate content (CMS) from presentation (Next.js) in a real project",
      "Why compatibility layers matter when you must not break existing queries",
      "Deploying and debugging a split frontend + CMS setup on free hosting tiers",
    ],
    role: "Fullstack portfolio · internship centerpiece",
    period: "Capace · Nov 2023 – Feb 2024 · refreshed 2026",
    techStack: ["Next.js 14", "TypeScript", "WordPress", "WPGraphQL", "ACF"],
    highlights: [
      "Headless architecture: WordPress admin, Next.js public site",
      "Custom `portfolio-cms.php` GraphQL compatibility for legacy fields",
      "Topic-pill filtering and internal case studies before external links",
    ],
    categories: ["WordPress", "Next.js", "Fullstack"],
    deployUrl: "https://elli-wordpress-portfolio.vercel.app",
    repoUrl: "https://github.com/Elli2022/wordpress-portfolio",
    ...projectMedia(
      "wordpress-portfolio-headless",
      "https://elli-wordpress-portfolio.vercel.app"
    ),
  },
  {
    slug: "pokemon-search-app",
    name: "Pokémon Search App",
    summary:
      "Live API search with clear loading, results, and empty states — built to practice real frontend data handling.",
    pitch:
      "I built a search UI on top of a public API and focused on the parts recruiters notice: feedback while loading, useful empty states, and readable results.",
    description:
      "During the Capace internship I needed a project that proved I could work with asynchronous data, not only static layouts. Users search Pokémon by name; the app fetches from an external API and renders cards with consistent spacing and hierarchy.",
    outcome:
      "Deployed demo on Netlify that I can walk through in under a minute: search → loading → results → no-results state.",
    learned: [
      "Structuring async UI states (loading, success, empty, error)",
      "Keeping fetch logic separate from presentation components",
      "Designing result cards for quick scanning",
    ],
    role: "Frontend developer · API integration",
    period: "Capace · 2023–2024",
    techStack: ["React", "JavaScript", "REST API", "CSS"],
    highlights: [
      "Debounced-style search interaction against live API data",
      "Explicit loading and empty-state messaging",
      "Responsive result grid",
    ],
    categories: ["React", "JavaScript", "Fullstack"],
    deployUrl: "https://pokemon-search-application.netlify.app",
    repoUrl: "https://github.com/Elli2022/pokemon-search-app",
    ...projectMedia(
      "pokemon-search-app",
      "https://pokemon-search-application.netlify.app"
    ),
  },
  {
    slug: "advokatbyra-site",
    name: "Advokatbyrå Site",
    summary:
      "Client-style law firm site — trust, service clarity, and a simple path to contact.",
    pitch:
      "I practiced building for a serious brand: fewer distractions, stronger hierarchy, and navigation that helps a visitor understand services before contacting the firm.",
    description:
      "This project simulates a professional law firm website. The goal was not flashy animation but credibility — clear service sections, readable typography, and a contact path that feels appropriate for legal services.",
    outcome:
      "A deployable demo I use to show UI judgment: when to keep layouts calm and content-forward.",
    learned: [
      "Information architecture for service-based businesses",
      "Visual hierarchy that signals trust (spacing, headings, contrast)",
      "Responsive layout without overcomplicating the codebase",
    ],
    role: "UI-focused frontend build",
    period: "Capace · 2023–2024",
    techStack: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "Service sections structured for scanning",
      "Contact journey kept short and obvious",
      "Mobile-friendly layout",
    ],
    categories: ["JavaScript", "UI/UX"],
    deployUrl: "https://w-advokatbyra-malmo.netlify.app",
    repoUrl: "https://github.com/Elli2022/w-advokatbyra-site",
    ...projectMedia(
      "advokatbyra-site",
      "https://w-advokatbyra-malmo.netlify.app"
    ),
  },
  {
    slug: "nextjs-auth-blog-modernized",
    name: "Next.js Auth Blog (Modernized)",
    summary:
      "Modernized blog UI with stronger reading flow and structure ready for auth and CMS later.",
    pitch:
      "I took an earlier blog prototype and refactored it toward something maintainable: clearer article layout and components that could later connect to auth and a CMS.",
    description:
      "Part of a progression during the internship: prototype first, then modernize. This version improves typography, spacing, and component boundaries compared to the first auth-blog iteration.",
    outcome:
      "Cleaner Netlify demo that shows I can evolve my own code instead of only starting from scratch.",
    learned: [
      "Refactoring UI without changing the whole stack",
      "Planning component boundaries for future features",
      "Deploying iterative versions of the same idea",
    ],
    role: "Frontend developer",
    period: "Capace · 2023–2024",
    techStack: ["Next.js", "React", "TypeScript", "CSS"],
    highlights: [
      "Improved article reading hierarchy",
      "Auth-ready structure (routes/components)",
      "Paired with earlier `auth-blog-platform` prototype",
    ],
    categories: ["Next.js", "React", "Fullstack"],
    deployUrl: "https://my-nextjs-project-modernized.netlify.app",
    repoUrl: "https://github.com/Elli2022/nextjs-auth-blog-modernized",
    ...projectMedia(
      "nextjs-auth-blog-modernized",
      "https://my-nextjs-project-modernized.netlify.app"
    ),
  },
  {
    slug: "auth-blog-platform",
    name: "Auth Blog Platform",
    summary:
      "First blog-platform iteration — routing, reusable blocks, and content hierarchy.",
    pitch:
      "This was my earlier blog experiment: prove I could structure pages and reusable UI before adding auth and CMS complexity.",
    description:
      "An internship stepping-stone project. I focused on page structure, post lists, and reusable UI patterns. The modernized version above builds directly on lessons from this repo.",
    outcome:
      "Working baseline deployed on Netlify; clear progression story together with the modernized repo.",
    learned: [
      "Laying out content-first pages",
      "Reusable card and list components",
      "When to stop adding features and refactor instead",
    ],
    role: "Frontend developer",
    period: "Capace · 2023–2024",
    techStack: ["Next.js", "React", "JavaScript"],
    highlights: [
      "Content hierarchy for posts",
      "Reusable layout blocks",
      "Foundation for the modernized version",
    ],
    categories: ["Next.js", "React", "Fullstack"],
    deployUrl: "https://auth-blog-platform.netlify.app",
    repoUrl: "https://github.com/Elli2022/auth-blog-platform",
    ...projectMedia("auth-blog-platform", "https://auth-blog-platform.netlify.app"),
  },
  {
    slug: "calculator-app",
    name: "Calculator App",
    summary:
      "Small React app — state, input handling, and immediate feedback in a tight UI.",
    pitch:
      "A deliberately small project to show I understand interaction logic: every click updates state predictably and the UI always reflects the current value.",
    description:
      "Compact calculator built to practice event handling and state updates without the noise of a larger codebase. Useful as a talking point for fundamentals in interviews.",
    outcome:
      "Deployed micro-demo that demonstrates discipline in a small surface area.",
    learned: [
      "Managing UI state for sequential operations",
      "Clear affordances for buttons and results",
      "Keeping logic readable in a small component tree",
    ],
    role: "Frontend practice",
    period: "Capace · 2023–2024",
    techStack: ["React", "JavaScript", "CSS"],
    highlights: [
      "Button and keyboard-style input handling",
      "Predictable state transitions",
      "Minimal, readable UI",
    ],
    categories: ["JavaScript", "React"],
    deployUrl: "https://calculator-app-elli2022.netlify.app",
    repoUrl: "https://github.com/Elli2022/calculator-app",
    ...projectMedia(
      "calculator-app",
      "https://calculator-app-elli2022.netlify.app"
    ),
  },
  {
    slug: "nic-cage-snacks-shop",
    name: "Nic Cage Snacks Shop",
    summary:
      "Playful shop concept — product cards, theme, and a light checkout-style flow.",
    pitch:
      "Even a fun brief can demonstrate real patterns: product listing, visual hierarchy, and a simple purchase path — I used humor in the theme but serious structure in the UI.",
    description:
      "A creative internship brief turned into a storefront-style demo. The value is in catalog layout, product presentation, and showing personality without sacrificing usability.",
    outcome:
      "Memorable portfolio piece that still answers “can you build a product grid and CTA flow?”",
    learned: [
      "Product card patterns and catalog grids",
      "Balancing brand/playfulness with usable layout",
      "Shipping a themed idea as a real deploy",
    ],
    role: "Frontend developer · concept",
    period: "Capace · 2023–2024",
    techStack: ["React", "JavaScript", "CSS"],
    highlights: [
      "Themed product presentation",
      "Card-based catalog",
      "Lightweight checkout-style flow",
    ],
    categories: ["React", "JavaScript", "UI/UX"],
    deployUrl: "https://nic-cage-snacks.netlify.app",
    repoUrl: "https://github.com/Elli2022/nic-cage-snacks-shop",
    ...projectMedia("nic-cage-snacks-shop", "https://nic-cage-snacks.netlify.app"),
  },
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category?: string) {
  if (!category) return portfolioProjects;
  return portfolioProjects.filter((project) =>
    project.categories.includes(category as ProjectCategory)
  );
}
