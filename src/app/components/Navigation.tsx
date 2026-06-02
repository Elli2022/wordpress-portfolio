// components/Navigation.tsx
import React from 'react';

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

const Navigation: React.FC<NavigationProps> = ({ portfolioLink, aboutLink, contactLink }) => {
  return (
    <nav className="nav-container">
      {/* Vänster länk */}
      <div className="nav-left">
        {portfolioLink && (
          <a href={portfolioLink.uri} className="link">
            {portfolioLink.title}
          </a>
        )}
      </div>

      {/* Höger länkar */}
      <div className="nav-right">
        {aboutLink && (
          <a href={aboutLink.uri} className="link">
            {aboutLink.title}
          </a>
        )}
        {contactLink && (
          <a href={contactLink.uri} className="link">
            {contactLink.title}
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
