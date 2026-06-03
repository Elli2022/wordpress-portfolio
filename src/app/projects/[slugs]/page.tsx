import { notFound } from "next/navigation";
import Navigation from "../../components/Navigation";
import ProjectPost from "../../components/ProjectPost";
import Footer from "../../components/Footer";
import { getMainNavLinks } from "@/lib/nav";
import getPost, { getPostInfoFromResult } from "@/lib/queries/getPost";
import WP from "@/lib/wp";

export async function generateStaticParams() {
  const posts = await WP(`
    query GetPosts {
      posts(first: 100) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  if (!posts?.data?.posts?.edges) {
    return [];
  }

  return posts.data.posts.edges
    .filter((edge: { node?: { slug?: string } }) => edge?.node?.slug)
    .map((edge: { node: { slug: string } }) => ({ slugs: edge.node.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: { slugs: string };
}) {
  const postResult = await getPost(params.slugs);
  const post = getPostInfoFromResult(postResult);

  if (!post?.title) {
    notFound();
  }

  const { portfolio, about, contact } = await getMainNavLinks();
  const postInfo = post.PostInfo;

  return (
    <main className="page-shell page-light">
      <Navigation
        portfolioLink={portfolio}
        aboutLink={about}
        contactLink={contact}
      />

      <ProjectPost postData={post} />

      {postInfo ? (
        <section className="case-study-card wp-project-meta">
          {postInfo.branding ? (
            <p className="content-eyebrow">{postInfo.branding}</p>
          ) : null}
          {postInfo.subtitle ? (
            <p className="content-lead">{postInfo.subtitle}</p>
          ) : null}
          {postInfo.projectintrotext ? (
            <h2 className="content-title">{postInfo.projectintrotext}</h2>
          ) : null}
          {postInfo.projectdescription ? (
            <p className="content-lead">{postInfo.projectdescription}</p>
          ) : null}

          <div className="wp-project-meta-row">
            {postInfo.clientheading && postInfo.client ? (
              <div>
                <p className="content-eyebrow">{postInfo.clientheading}</p>
                <p>{postInfo.client}</p>
              </div>
            ) : null}
            {postInfo.date ? (
              <div>
                <p className="content-eyebrow">Date</p>
                <p>{postInfo.date}</p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}
