import WP from "../wp";

export default async function getAll(uri: string = "/all") {
  try {
    const res = await WP(
      `
        query getAll($uri: ID!) {
            page(id: $uri, idType: URI) {
              content
              id
              allPage {
                allPageTitle
                fieldGroupName
                orkarInteMer
              }
            }
          }

        `,
      { uri }
    );

    if (!res?.data) {
      throw `error couldn't fetch api`;
    }
    const data = res?.data?.page;
    return data;
  } catch (error) {
    console.error(error);
  }
}
