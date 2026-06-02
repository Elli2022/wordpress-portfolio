import WP from "../wp";

type NullablePostInfo = {
  branding?: string;
  subtitle?: string;
  projectintrotext?: string;
  projectdescription?: string;
  clientheading?: string;
  date?: string;
  client?: string;
} | null;

type GetPostResult = {
  data?: {
    postBy?: {
      PostInfo?: NullablePostInfo;
      content?: string;
    } | null;
  };
  errors?: Array<{ message: string }>;
};

async function getPost(slug: string): Promise<GetPostResult | null> {
  const query = `
    query getPost($slug: String!) {
      postBy(slug: $slug) {
        PostInfo {
          branding
          subtitle
          projectintrotext
          projectdescription
          clientheading
          date
          client
        }
        content
      }
    }
  `;

  try {
    const data = await WP(query, { slug });
    return data as GetPostResult;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default getPost;
