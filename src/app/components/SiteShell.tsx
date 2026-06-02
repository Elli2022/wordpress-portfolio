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
    <main className="page-shell">
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
