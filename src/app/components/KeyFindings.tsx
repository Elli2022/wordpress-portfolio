import React from "react";

export type KeyFindingsBlock = {
  basics?: string;
  basicstext?: string;
  goals?: string;
  goalstext?: string;
  problems?: string;
  problemstext?: string;
  solutions?: string;
  solutionstext?: string;
};

type KeyFindingsProps = {
  keyFindingsBlock: KeyFindingsBlock | null | undefined;
};

export default function KeyFindings({ keyFindingsBlock }: KeyFindingsProps) {
  if (!keyFindingsBlock) return null;

  const sections = [
    { title: keyFindingsBlock.basics, text: keyFindingsBlock.basicstext },
    { title: keyFindingsBlock.goals, text: keyFindingsBlock.goalstext },
    { title: keyFindingsBlock.problems, text: keyFindingsBlock.problemstext },
    { title: keyFindingsBlock.solutions, text: keyFindingsBlock.solutionstext },
  ].filter((s) => s.title || s.text);

  return (
    <div className="key-findings-grid">
      {sections.map((section) => (
        <div key={section.title} className="key-findings-card">
          {section.title ? <h2>{section.title}</h2> : null}
          {section.text ? <p>{section.text}</p> : null}
        </div>
      ))}
    </div>
  );
}
