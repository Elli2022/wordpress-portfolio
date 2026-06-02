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
}

const Navigation: React.FC<NavigationProps> = ({
  portfolioLink,
  aboutLink,
  contactLink,
}) => {
  return (
    <nav className="nav-container" aria-label="Primary navigation">
      <div className="nav-left">
        {portfolioLink ? (
          <a href={portfolioLink.uri} className="nav-pill">
            {portfolioLink.title}
          </a>
        ) : null}
      </div>
      <div className="nav-right">
        {aboutLink ? (
          <a href={aboutLink.uri} className="nav-pill">
            {aboutLink.title}
          </a>
        ) : null}
        {contactLink ? (
          <a href={contactLink.uri} className="nav-pill">
            {contactLink.title}
          </a>
        ) : null}
      </div>
    </nav>
  );
};

export default Navigation;
