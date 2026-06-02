const apiKey = process.env.wordpressApiKey;

const WP = async (query: string, variables?: any) => {
  try {
    if (!apiKey) {
      throw new Error("Missing wordpressApiKey environment variable.");
    }

    const res = await fetch(`${apiKey}`, {
      method: "POST",
      next: { revalidate: 1 },
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: variables || null,
      }),
    });

    if (!res.ok) {
      throw new Error(`WordPress GraphQL request failed with ${res.status}.`);
    }

    const data = await res.json();

    if (data?.errors?.length) {
      console.error("WPGraphQL errors:", data.errors);
    }

    return data;
  } catch (err: any) {
    console.error(err);
    return null;
  }
};

export default WP;
