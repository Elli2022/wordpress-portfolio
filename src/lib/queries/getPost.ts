import WP from "../wp";

/** Fields exposed by `PostInfoCompat` in wordpress/mu-plugins/portfolio-cms.php */
export type PostInfo = {
  branding?: string;
  subtitle?: string;
  projectintrotext?: string;
  projectdescription?: string;
  clientheading?: string;
  date?: string;
  client?: string;
};

export type WpPostDetail = {
  title: string;
  content: string;
  featuredImage?: {
    node?: {
      mediaItemUrl?: string;
      altText?: string | null;
    };
  };
  PostInfo?: PostInfo | null;
};

type GetPostResult = {
  data?: {
    post?: WpPostDetail | null;
  };
  errors?: Array<{ message: string }>;
};

async function getPost(slug: string): Promise<GetPostResult | null> {
  const uri = slug.startsWith("/") ? slug : `/${slug}`;

  const query = `
    query getPost($uri: ID!) {
      post(id: $uri, idType: URI) {
        title
        content
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
        PostInfo {
          branding
          subtitle
          projectintrotext
          projectdescription
          clientheading
          date
          client
        }
      }
    }
  `;

  try {
    const data = (await WP(query, { uri })) as GetPostResult;
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export function getPostInfoFromResult(result: GetPostResult | null) {
  return result?.data?.post ?? null;
}

export default getPost;
