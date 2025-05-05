import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { motion as motionImport } from "framer-motion";

interface AnimatedGradientCircleProps {
  className?: string;
  size?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  lineOpacity?: number;
  strokeBase?: number;
  strokeMax?: number;
}

// Type for the mask-type CSS property
type MaskType = "luminance" | "alpha";

const AnimatedGradientCircleInner: React.FC<AnimatedGradientCircleProps> = ({
  className = "",
  size = "100%",
  delay = 0,
  duration = 1.5,
  staggerDelay = 0.05,
  lineOpacity = 1,
  strokeBase = 2,
  strokeMax = 7.5,
}) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Generate a unique ID for the mask based on the pathname to avoid conflicts
  const maskId = `circleMask-${pathname?.replace(/\//g, "-") || "home"}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate the required number of lines
  const totalLines = 28;
  const lines = Array.from({ length: totalLines }, (_, i) => {
    // Calculate vertical position based on line index
    const y = 18.0781 + (i * (1037.34 - 18.0781)) / (totalLines - 1);

    // Calculate colors for gradient effect
    // Starting from purple (#563085) and transitioning to blue (#098FD4)
    const progress = i / (totalLines - 1);

    // RGB values for interpolation
    const r1 = 86,
      g1 = 48,
      b1 = 133; // #563085
    const r2 = 9,
      g2 = 143,
      b2 = 212; // #098FD4

    // Interpolate RGB values
    const r = Math.round(r1 + progress * (r2 - r1));
    const g = Math.round(g1 + progress * (g2 - g1));
    const b = Math.round(b1 + progress * (b2 - b1));

    // Convert back to hex with increased opacity
    const color = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    // Significantly increase stroke width for more visibility
    let strokeWidth;

    if (i < totalLines / 2) {
      strokeWidth =
        strokeBase + (i / (totalLines / 2)) * (strokeMax - strokeBase);
    } else {
      strokeWidth =
        strokeMax -
        ((i - totalLines / 2) / (totalLines / 2)) * (strokeMax - strokeBase);
    }

    return { y, color, strokeWidth, index: i };
  });

  // Static SVG container - for server-side rendering and initial client render
  if (!mounted) {
    return (
      <div
        className={`relative mx-auto ${className}`}
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1062 1062"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        >
          <mask
            id={maskId}
            style={{ maskType: "luminance" as MaskType }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1062"
            height="1062"
          >
            <path
              d="M0 530.736C0 823.855 237.617 1061.47 530.735 1061.47C823.852 1061.47 1061.47 823.855 1061.47 530.736C1061.47 237.619 823.852 0 530.735 0C237.617 0 0 237.619 0 530.736Z"
              fill="white"
            />
          </mask>
          <g mask={`url(#${maskId})`}>
            {lines.map((line) => (
              <path
                key={line.index}
                d={`M-248.105 ${line.y}H1340.55`}
                stroke={line.color}
                strokeWidth={line.strokeWidth}
                strokeMiterlimit="10"
                opacity="0"
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }

  // Animation variants for the animated version
  const lineVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (i: number) => ({
      opacity: lineOpacity,
      pathLength: 1,
      transition: {
        pathLength: {
          delay: delay + i * staggerDelay,
          duration: duration * 0.6,
          ease: "easeOut",
        },
        opacity: {
          delay: delay + i * staggerDelay,
          duration: duration * 0.3,
          ease: "easeIn",
        },
      },
    }),
  };

  // Client-side only animated version
  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1062 1062"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        <mask
          id={maskId}
          style={{ maskType: "luminance" as MaskType }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1062"
          height="1062"
        >
          <path
            d="M0 530.736C0 823.855 237.617 1061.47 530.735 1061.47C823.852 1061.47 1061.47 823.855 1061.47 530.736C1061.47 237.619 823.852 0 530.735 0C237.617 0 0 237.619 0 530.736Z"
            fill="white"
          />
        </mask>
        <g mask={`url(#${maskId})`}>
          {lines.map((line) => (
            <motionImport.path
              key={line.index}
              d={`M-248.105 ${line.y}H1340.55`}
              stroke={line.color}
              strokeWidth={line.strokeWidth}
              strokeMiterlimit="10"
              initial="hidden"
              animate="visible"
              custom={line.index}
              variants={lineVariants}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

// Use a non-SSR component to avoid hydration issues
const AnimatedGradientCircle = (props: AnimatedGradientCircleProps) => (
  <AnimatedGradientCircleInner {...props} />
);

// Export with no SSR to completely avoid hydration issues
export default dynamic(() => Promise.resolve(AnimatedGradientCircle), {
  ssr: false,
});
