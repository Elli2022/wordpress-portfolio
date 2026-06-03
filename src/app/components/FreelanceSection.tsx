import React from "react";

interface FreelanceSectionProps {
  freelanceTitle: string;
  freelanceDescription: string;
  freelanceContactUrl: string;
  freelanceProjectsButton: string;
}

export default function FreelanceSection({
  freelanceTitle,
  freelanceDescription,
  freelanceContactUrl,
  freelanceProjectsButton,
}: FreelanceSectionProps) {
  return (
    <section className="freelance-section freelance-2023">
      <p className="freelance-eyebrow">{freelanceTitle}</p>
      <br />
      <h3 className="freelance-headline">{freelanceDescription}</h3>
      <a href={freelanceContactUrl} className="btn btn-freelance">
        {freelanceProjectsButton}
      </a>
    </section>
  );
}
