import React from "react";

interface HeaderProps {
  titleHtml: string;
  presentingText: string;
}

export default function Header({ titleHtml, presentingText }: HeaderProps) {
  return (
    <header className="hero hero-2023">
      <p className="hero-kicker">{presentingText}</p>
      <h1
        className="hero-title hero-title-2023"
        dangerouslySetInnerHTML={{ __html: titleHtml }}
      />
    </header>
  );
}
