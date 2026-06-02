import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "../../components/SiteShell";
import ProjectScreenshot from "../../components/ProjectScreenshot";
import { getMainNavLinks } from "@/lib/nav";
import { getProjectBySlug, portfolioProjects } from "@/data/projects";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export default async function WorkProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const { portfolio, about, contact } = await getMainNavLinks();

  return (
    <SiteShell portfolioLink={portfolio} aboutLink={about} contactLink={contact}>
      <Link href="/" className="back-link">
        ← Back to portfolio
      </Link>

      <header className="mt-6 mb-8">
        <p className="uppercase tracking-wide text-sm text-gray-600">Case study</p>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">{project.name}</h1>
        <p className="text-lg mt-4 text-gray-700">{project.summary}</p>
        <p className="text-sm mt-2 text-gray-500">
          {project.role} · {project.period}
        </p>
        <div className="topic-row mt-5">
          {project.categories.map((category) => (
            <span key={category} className="topic-pill topic-pill-static">
              {category}
            </span>
          ))}
        </div>
      </header>

      <section className="case-study-grid">
        <article className="case-study-card">
          <h2>60-second pitch</h2>
          <p className="case-pitch">{project.pitch}</p>

          <h2 className="case-subheading">About the project</h2>
          <p>{project.description}</p>

          <h3 className="case-subheading">Outcome</h3>
          <p className="case-outcome">{project.outcome}</p>

          <h3 className="case-subheading">What I focused on</h3>
          <ul className="case-list">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="case-subheading">What I learned</h3>
          <ul className="case-list">
            {project.learned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="case-subheading">Tech stack</h3>
          <div className="topic-row case-tech">
            {project.techStack.map((tech) => (
              <span key={tech} className="topic-pill topic-pill-static">
                {tech}
              </span>
            ))}
          </div>

          <div className="case-actions">
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              View live project
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              View GitHub repo
            </a>
          </div>
        </article>

        <article className="case-study-card">
          <h2>Project screenshots</h2>
          <p className="screenshot-note">
            Previews from the live deploy. If a preview fails to load, use the live link below.
          </p>
          <div className="screenshot-grid">
            {project.screenshots.map((shot) => (
              <ProjectScreenshot
                key={shot.label}
                src={shot.src}
                alt={`${project.name} — ${shot.label}`}
                label={shot.label}
                href={project.deployUrl}
              />
            ))}
          </div>
        </article>
      </section>
    </SiteShell>
  );
}
