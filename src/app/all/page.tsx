//src/app/all/page.tsx
import getAll from "@/lib/queries/getAll";
import getPages from "@/lib/queries/getPages";

export default async function All() {
  const allData = await getAll("/all");
  const navlinks = await getPages();
  const navHits = Object.values(navlinks?.edges ?? {}).map((hit: any) => hit.node);

  // This line may not be necessary unless you have a specific link named "Special Link"
  // const specialLink = navHits.find(hit => hit.title === "Special Link");

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
        <p className="mt-4">{allData?.allPage.presentingText}</p>
        <h1 className="text-5xl font-bold">{allData?.allPage.allPageTitle}</h1>
      </header>
    </main>
  );
}
