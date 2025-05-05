import React from "react";

interface PlayButtonProps {
  size?: "sm" | "md" | "lg";
}

const PlayButton: React.FC<PlayButtonProps> = ({ size = "md" }) => {
  const dimensions = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  return (
    <span
      className={`inline-flex items-center justify-center ${dimensions[size]}`}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 1L10 6L2 11V1Z" fill="currentColor" />
      </svg>
    </span>
  );
};

export default PlayButton;
