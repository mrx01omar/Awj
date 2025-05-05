import React from "react";
import PlayButton from "./PlayButton";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  withPlayButton?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  withPlayButton = false,
  className = "",
  type = "button",
  disabled = false,
}) => {
  const baseClasses = "btn";
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
  };

  const sizeClasses = {
    sm: "text-sm py-2 px-4",
    md: "text-base py-3 px-6",
    lg: "text-lg py-4 px-8",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const buttonContent = (
    <div className="flex items-center gap-2">
      {children}
      {withPlayButton && (
        <PlayButton size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"} />
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={classes}
      type={type}
      disabled={disabled}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
