import React from "react";
import Navigation from "./Navigation";
import type { NavLink } from "@/lib/nav";

type SiteShellProps = {
  portfolioLink: NavLink;
  aboutLink: NavLink;
  contactLink: NavLink;
  children: React.ReactNode;
};

export default function SiteShell({
  portfolioLink,
  aboutLink,
  contactLink,
  children,
}: SiteShellProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#d6dbdc] to-white text-black px-6 py-10 md:px-12">
      <div className="mx-auto max-w-5xl">
        <Navigation
          portfolioLink={portfolioLink}
          aboutLink={aboutLink}
          contactLink={contactLink}
        />
        {children}
      </div>
    </main>
  );
}
