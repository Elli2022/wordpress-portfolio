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
    <section className="freelance-section">
      <p className="freelance-title">{freelanceTitle}</p>
      <h3 className="freelance-description">{freelanceDescription}</h3>
      <a href={freelanceContactUrl} className="btn">
        {freelanceProjectsButton}
      </a>
    </section>
  );
}
