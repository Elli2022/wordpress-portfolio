import React from "react";

interface NavLink {
  id: string;
  title: string;
  uri: string;
}

interface NavigationProps {
  portfolioLink?: NavLink;
  aboutLink?: NavLink;
  contactLink?: NavLink;
  /** Match 2023 home: no border, bold right links with spacing */
  variant?: "default" | "home";
}

const Navigation: React.FC<NavigationProps> = ({
  portfolioLink,
  aboutLink,
  contactLink,
  variant = "default",
}) => {
  const isHome = variant === "home";

  return (
    <nav
      className={isHome ? "home-nav-2023" : "nav-container"}
      aria-label="Primary navigation"
    >
      <div className="nav-left">
        {portfolioLink ? (
          <a href={portfolioLink.uri} className="link">
            {portfolioLink.title}
          </a>
        ) : null}
      </div>
      <div className="nav-right">
        {aboutLink ? (
          <a
            href={aboutLink.uri}
            className={isHome ? "home-nav-side-link" : "link"}
          >
            {aboutLink.title}
          </a>
        ) : null}
        {contactLink ? (
          <a
            href={contactLink.uri}
            className={isHome ? "home-nav-side-link" : "link"}
          >
            {contactLink.title}
          </a>
        ) : null}
      </div>
    </nav>
  );
};

export default Navigation;
