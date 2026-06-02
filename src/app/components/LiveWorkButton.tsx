import React from "react";

interface LiveWorkButtonProps {
  buttonText: string;
  buttonUrl: string;
}

export default function LiveWorkButton({
  buttonText,
  buttonUrl,
}: LiveWorkButtonProps) {
  if (!buttonUrl || buttonUrl === "#") return null;

  return (
    <a
      href={buttonUrl}
      target="_blank"
      rel="noreferrer"
      className="btn live-work-button"
    >
      {buttonText} →
    </a>
  );
}
