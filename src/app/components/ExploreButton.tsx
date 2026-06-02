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
    <div className="text-center">
      <a href={buttonUrl} className="btn">
        {buttonText}
      </a>
    </div>
  );
}
