import WP from "../wp";

export default async function getPosts(
  page = 1,
  perPage = 6,
  afterCursor = "",
  beforeCursor = ""
) {
  try {
    let queryArgs = {};

    if (afterCursor) {
      queryArgs = { after: afterCursor, first: perPage };
    } else if (beforeCursor && page > 1) {
      queryArgs = { before: beforeCursor, last: perPage };
    } else {
      queryArgs = { first: perPage };
    }

    const resPost = await WP(
      `query GetPosts($after: String, $first: Int, $last: Int, $before: String) {
        posts(after: $after, first: $first, last: $last, before: $before) {
          edges {
            node {
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
              PostInfo {
                subtitle
              }
            }
            cursor
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
        }
      }`,
      queryArgs
    );

    if (!resPost?.data) {
      return {
        posts: [],
        pageInfo: {
          startCursor: "",
          endCursor: "",
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }

    return {
      posts: resPost?.data?.posts?.edges?.map(
        (edge: { node: any }) => edge.node
      ),
      pageInfo: resPost?.data?.posts?.pageInfo,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      posts: [],
      pageInfo: {
        startCursor: "",
        endCursor: "",
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}
