import React from "react";
import Image from "next/image";

interface CircleProps {
  variant?: "purple" | "gradient";
  size?: string;
  className?: string;
}

const Circle: React.FC<CircleProps> = ({
  variant = "purple",
  size = "100%",
  className = "",
}) => {
  const src =
    variant === "purple"
      ? "/awj-svg/circle-purple.svg"
      : "/awj-svg/circle-gradient.svg";

  return (
    <div
      className={`relative ${className} pointer-events-none will-change-transform`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt="AWJ Circle"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default Circle;
