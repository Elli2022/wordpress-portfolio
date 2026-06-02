export const homeFallback = {
  presentingText: "Multidisciplinary designer",
  homePageTitle: "Driven by passion, fueled by curiosity",
  buttonText: "Explore works",
  buttonUrl: "#posts",
  freelanceProjects: {
    freelanceTitle: "Available for freelance projects",
    freelanceDescription: "Let us build something meaningful together.",
    freelanceProjectsButton: "Let us talk",
    freelanceContactUrl: "/contact/",
  },
};

/**
 * Fallback copy when WordPress pages are missing or empty.
 * Live site prefers CMS (GraphQL) when about/contact pages exist in WP.
 * Project showcase copy lives in src/data/projects.ts (code, not CMS).
 */

export const aboutFallback = {
  presentingText: "About me",
  aboutPageTitle: "Eleonora Nocentini Sköldebrink",
  content: `
    <p class="lead"><strong>Junior developer</strong> based in Malmö, Sweden.</p>
    <p>
      I build clear, minimal interfaces — from internship prototypes at
      <strong>Capace</strong> to production-minded headless setups with React,
      Next.js, and WordPress GraphQL.
    </p>
    <p>
      My internship (Nov 2023 – Feb 2024) gave me real agency practice: client-style
      layouts, API-driven apps, and this portfolio. In 2026 I modernized the codebase
      for stable deploy on Vercel — with AI-assisted development, but always reviewed
      and tested by me before shipping.
    </p>
    <p class="contact-label">What I bring to a team</p>
    <ul class="skills-list">
      <li>React & Next.js (App Router, TypeScript)</li>
      <li>Headless WordPress · WPGraphQL · ACF</li>
      <li>API-driven UIs (loading, empty, and error states)</li>
      <li>Clear case studies and readable component structure</li>
      <li>Deploying and maintaining split CMS + frontend setups</li>
    </ul>
    <p class="contact-label">How I use AI (transparently)</p>
    <p>
      I use AI tools to speed up boilerplate, refactors, and documentation — the same way
      many teams work in 2026. I do not ship code I cannot explain: I read the diff, run the
      app locally, and fix what breaks. That is how this portfolio was refreshed while keeping
      the original architecture intact.
    </p>
    <p class="contact-label">Contact</p>
    <p>
      <a href="mailto:eleonora.nocentini@gmail.com">eleonora.nocentini@gmail.com</a>
    </p>
    <div class="social-row">
      <a href="https://github.com/Elli2022" target="_blank" rel="noreferrer">GitHub</a>
    </div>
  `,
};

export const contactFallback = {
  presentingText: "Contact",
  allPageTitle: "contact.",
  orkarInteMer:
    "Junior frontend / fullstack · Malmö · open to internship, junior, and freelance.",
  content: `
    <p>
      I am looking for a team where I can grow — contribute UI and integration work,
      learn from code review, and ship small features with support. Happy to walk through
      any case study here live (about 5 minutes per project).
    </p>
    <p>
      <strong>Email</strong><br />
      <a href="mailto:eleonora.nocentini@gmail.com">eleonora.nocentini@gmail.com</a>
    </p>
    <p>
      <strong>GitHub</strong><br />
      <a href="https://github.com/Elli2022" target="_blank" rel="noreferrer">github.com/Elli2022</a>
    </p>
    <p>
      <strong>Location</strong><br />
      Malmö, Sweden
    </p>
  `,
};
