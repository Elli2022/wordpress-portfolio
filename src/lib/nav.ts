import getPages from "@/lib/queries/getPages";

export type NavLink = {
  id: string;
  title: string;
  uri: string;
};

export async function getMainNavLinks() {
  const navlinks = await getPages();
  const navHits = Object.values(navlinks?.edges ?? {}).map((hit: any) => hit.node);

  return {
    portfolio:
      navHits.find((hit) => hit.title === "Portfolio.") ??
      ({ id: "fallback-portfolio", uri: "/", title: "Portfolio." } as NavLink),
    about:
      navHits.find((hit) => hit.title === "about me.") ??
      ({ id: "fallback-about", uri: "/about/", title: "about me." } as NavLink),
    contact:
      navHits.find((hit) => hit.title === "contact.") ??
      ({ id: "fallback-contact", uri: "/contact/", title: "contact." } as NavLink),
    all: navHits,
  };
}
