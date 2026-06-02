//src/app/about/page.tsx
import getAbout from "@/lib/queries/getAbout";
import getPages from "@/lib/queries/getPages";

export default async function About() {
  const aboutData = await getAbout("/about");
  const navlinks = await getPages();
  const navHits = Object.values(navlinks?.edges ?? {}).map((hit: any) => hit.node);
  const deployUrl =
    process.env.NEXT_PUBLIC_DEPLOY_URL || "https://elli-wordpress-portfolio.vercel.app";

  const specialLink = navHits.find((hit) => hit.title === "Special Link");

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d6dbdc] to-white text-black p-24">
      <nav className="flex justify-between items-center">
        {navHits.map((hit: any) => (
          <a key={hit.id} href={hit.uri} className="link">
            {hit.title}
          </a>
        ))}
      </nav>
      <header className="text-center mt-10">
        <p className="mt-4">{aboutData?.aboutPage.presentingText}</p>
        <h1 className="text-5xl font-bold">
          {aboutData?.aboutPage.aboutPageTitle}
        </h1>
      </header>
      <div className="text-center">
        <p>{aboutData?.content}</p>
        <p className="mt-4 text-sm">
          Live deploy:{" "}
          <a className="underline" href={deployUrl} target="_blank" rel="noreferrer">
            {deployUrl}
          </a>
        </p>
        {specialLink && (
          <a href={specialLink.uri} className="btn">
            {specialLink.title}
          </a>
        )}
      </div>
    </main>
  );
}
