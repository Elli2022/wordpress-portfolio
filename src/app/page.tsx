// src/app/page.tsx
import React from "react";
import Link from "next/link";
import getHome from "@/lib/queries/getHome";
import getPages from "@/lib/queries/getPages";
import getPosts from "@/lib/queries/getPosts";
import PaginationControls from "./components/PaginationControls";

const originReposNov2023 = [
  { name: "frontend-application", url: "https://github.com/Elli2022/frontend-application" },
  { name: "typescript-app-template", url: "https://github.com/Elli2022/typescript-app-template" },
  { name: "nextjs-auth-blog-modernized", url: "https://github.com/Elli2022/nextjs-auth-blog-modernized" },
  { name: "fullstack-application", url: "https://github.com/Elli2022/fullstack-application" },
  { name: "wordpress-portfolio", url: "https://github.com/Elli2022/wordpress-portfolio" },
];

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Array.isArray(searchParams["page"]) ? searchParams["page"][0] : searchParams["page"] ?? "1";
  const perPage = Array.isArray(searchParams["per_page"]) ? searchParams["per_page"][0] : searchParams["per_page"] ?? "6";
  const endCursor = Array.isArray(searchParams["after"]) ? searchParams["after"][0] : searchParams["after"] ?? "";
  const beforeCursor = Array.isArray(searchParams["before"]) ? searchParams["before"][0] : searchParams["before"] ?? "";
  const { posts = [], pageInfo } = await getPosts(Number(page), Number(perPage), endCursor, beforeCursor);
  const data = await getHome("/home");
  const navlinks = await getPages();
  const navHits = Object.values(navlinks?.edges ?? {}).map((hit: any) => hit.node);

  const mainLinks = {
    portfolio: navHits.find((hit: any) => hit.title === "Portfolio."),
    about: navHits.find((hit: any) => hit.title === "about me."),
    contact: navHits.find((hit: any) => hit.title === "contact."),
  };

  const portfolioLink = mainLinks.portfolio ?? { id: "fallback-portfolio", uri: "/", title: "Portfolio." };
  const aboutLink = mainLinks.about ?? { id: "fallback-about", uri: "/about/", title: "about me." };
  const contactLink = mainLinks.contact ?? { id: "fallback-contact", uri: "/all/", title: "contact." };

  const otherLinks = navHits.filter(
    (hit: any) => !["Portfolio.", "about me.", "contact."].includes(hit.title)
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d6dbdc] to-white text-black px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <nav className="nav-container">
          <div className="nav-left">
            <a key={portfolioLink.id} href={portfolioLink.uri} className="link">
              {portfolioLink.title}
            </a>
          </div>
          <div className="nav-right">
            <a key={aboutLink.id} href={aboutLink.uri} className="link">
              {aboutLink.title}
            </a>
            <a key={contactLink.id} href={contactLink.uri} className="link">
              {contactLink.title}
            </a>
          </div>
        </nav>

        <header className="text-center mt-10 mb-10">
          <p className="mt-4 uppercase tracking-wide text-sm">
            {data?.homePage.presentingText}
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold leading-tight"
            dangerouslySetInnerHTML={{
              __html: data?.homePage.homePageTitle.replace(
                "fueled",
                "fueled<br>"
              ),
            }}
          />
        </header>

        <div className="text-center mb-10">
          <a href={data?.homePage.buttonUrl} className="btn inline-block my-4">
            {data?.homePage.buttonText}
          </a>
          <div className="other-links-container">
            {otherLinks.map((link: any) => (
              <a
                key={link.id}
                href={link.uri}
                className="link inline-block mx-2 my-2"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>

        <section className="posts-container">
          {posts.map((post: any) => (
            <Link key={post.id} href={`/projects/${post.slug}`} className="post-card">
              <div className="image-container">
                {post.featuredImage?.node?.mediaItemUrl ? (
                  <img
                    src={post.featuredImage.node.mediaItemUrl}
                    alt={post.title}
                  />
                ) : (
                  <div className="image-placeholder">No image yet</div>
                )}
              </div>
              <div className="post-info">
                <h2 className="post-title">{post.title}</h2>
                <p>{post?.PostInfo?.subtitle ?? ""}</p>
              </div>
            </Link>
          ))}
        </section>

        <PaginationControls
          hasNextPage={pageInfo.hasNextPage}
          hasPrevPage={Number(page) > 1}
          endCursor={pageInfo.endCursor}
          startCursor={pageInfo.startCursor}
          data={undefined}
          beforeCursor={""}
          posts={""}
        />

        <div className="mt-10 text-center">
          <p className="text-xl">
            {data?.homePage.freelanceProjects.freelanceTitle}
          </p>
          <h3 className="text-3xl md:text-5xl font-semibold mt-2">
            {data?.homePage.freelanceProjects.freelanceDescription}
          </h3>
          <a
            href={data?.homePage.freelanceProjects.freelanceContactUrl}
            className="btn bg-[var(--primary-color)] hover:bg-[var(--hover-color)] mt-6"
          >
            {data?.homePage.freelanceProjects.freelanceProjectsButton}
          </a>
        </div>

        <section className="mt-14 text-center">
          <h3 className="text-xl font-semibold mb-3">Original repos from Nov 2023</h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {originReposNov2023.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="repo-pill"
              >
                {repo.name}
              </a>
            ))}
          </div>
        </section>

        <footer className="text-center py-8 mt-8">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
