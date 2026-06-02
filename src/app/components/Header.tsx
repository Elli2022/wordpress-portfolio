import React from "react";

interface HeaderProps {
  titleHtml: string;
  presentingText: string;
}

export default function Header({ titleHtml, presentingText }: HeaderProps) {
  return (
    <header className="hero">
      <p className="hero-kicker">{presentingText}</p>
      <h1
        className="hero-title"
        dangerouslySetInnerHTML={{ __html: titleHtml }}
      />
    </header>
  );
}
