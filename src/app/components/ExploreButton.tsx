import React from "react";

interface ExploreButtonProps {
  buttonText: string;
  buttonUrl: string;
}

export default function ExploreButton({
  buttonText,
  buttonUrl,
}: ExploreButtonProps) {
  return (
    <div className="explore-wrap">
      <a href={buttonUrl} className="btn btn-explore">
        {buttonText} <span aria-hidden>→</span>
      </a>
    </div>
  );
}
