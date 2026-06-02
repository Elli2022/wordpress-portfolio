// src/pages/projects/[slugs]/page.tsx


import React from "react";
import Image from "next/image";
import getPages from "@/lib/queries/getPages";
import Navigation from "../../components/Navigation";
import WP from "@/lib/wp";
import getPost from "@/lib/queries/getPost";
import { notFound } from "next/navigation";


interface Post {
  title: string;
  content: string;
  featuredImage: {
    node: {
      mediaItemUrl: string;
      slug: string;
    };
  };
  slug: string;
}

interface PostNode {
  featuredImage: {
    node: {
      slug: string;
    };
  };
  slug: string;
}

interface ProjectPageProps {
  post: Post;
}

interface FeaturedImageNode {
  mediaItemUrl: string;
  slug: string;
}

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
  }`);

  if (!posts?.data?.posts?.edges) {
    return [];
  }

  return posts.data.posts.edges
    .filter((edge: { node?: { slug?: string } }) => edge?.node?.slug)
    .map((edge: { node: { slug: string } }) => ({ slugs: edge.node.slug }));
}

const ProjectPage = async ({ params }: { params: { slugs: string } }) => {
  // Hämta data från WP
  const resPost = await WP(`
    query GetPostBySlug($slug: String!) {
      postBy(slug: $slug) {
        id
        title
        content
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
        slug
      }
    }`,
    { slug: params.slugs }
  );
  const globalPostData = resPost?.data?.postBy ?? null;

  // Hämta ytterligare data med getPost
  const additionalData = await getPost(params.slugs);
  const postInfo = additionalData?.data?.postBy?.PostInfo ?? null;

  const navlinks = await getPages();
  const navHits = navlinks?.edges?.map((edge: any) => edge.node) ?? [];
  const mainLinks = {
    portfolio: navHits.find((hit: any) => hit.title === "Portfolio."),
    about: navHits.find((hit: any) => hit.title === "about me."),
    contact: navHits.find((hit: any) => hit.title === "contact."),
  };

  if (!globalPostData) {
    notFound();
  }

  // När data är hämtad, renderas sidan
  return (
    <div>
    <Navigation 
      portfolioLink={mainLinks.portfolio}
      aboutLink={mainLinks.about}
      contactLink={mainLinks.contact}
    />
    <h1>{globalPostData.title}</h1> 
    {globalPostData.featuredImage?.node?.mediaItemUrl && (
      <Image
        src={globalPostData.featuredImage.node.mediaItemUrl}
        alt={globalPostData.featuredImage.node.altText || globalPostData.title}
        width={1200}
        height={760}
        className="h-auto w-full"
      />
    )}
    <div dangerouslySetInnerHTML={{ __html: globalPostData.content }} />

    <div>
      {postInfo ? (
        <>
          <h2>{postInfo.branding}</h2>
          <p>{postInfo.subtitle}</p>
          <p>{postInfo.projectintrotext}</p>
          <p>{postInfo.projectdescription}</p>
          <p>{postInfo.clientheading}</p>
          <p>{postInfo.date}</p>
          <p>{postInfo.client}</p>
        </>
      ) : (
        <p>Project details are being updated in CMS.</p>
      )}
    </div>
  </div>
  );
};

export default ProjectPage;
