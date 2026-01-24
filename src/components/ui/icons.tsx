import { motion, MotionConfig } from 'framer-motion';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

interface AnimatedMenuIconProps extends IconProps {
  isOpen: boolean;
}

/**
 * Animated menu icon with smooth transition from burger to X
 * Uses Framer Motion for elegant sequential animation
 */
export const AnimatedMenuIcon = ({
  isOpen,
  className,
  size = 24,
  color = "currentColor",
}: AnimatedMenuIconProps) => {
  const transition = { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] };

  const topVariants = {
    closed: {
      rotate: 0,
      y: 0,
      transition: {
        rotate: { ...transition, duration: 0.2 },
        y: { ...transition, delay: 0.2 }
      }
    },
    open: {
      rotate: 45,
      y: 4,
      transition: {
        y: { ...transition, duration: 0.2 },
        rotate: { ...transition, delay: 0.2 }
      }
    },
    hoverClosed: {
      y: -3,
      transition: { ...transition, duration: 0.2 }
    },
    hoverExpanded: {
      rotate: 45,
      y: 4,
      scale: 1.1,
      transition: { ...transition, duration: 0.2 }
    }
  };

  const centerVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
    hoverClosed: { opacity: 1 },
    hoverExpanded: { opacity: 0 }
  };

  const bottomVariants = {
    closed: {
      rotate: 0,
      y: 0,
      transition: {
        rotate: { ...transition, duration: 0.2 },
        y: { ...transition, delay: 0.2 }
      }
    },
    open: {
      rotate: -45,
      y: -4,
      transition: {
        y: { ...transition, duration: 0.2 },
        rotate: { ...transition, delay: 0.2 }
      }
    },
    hoverClosed: {
      y: 3,
      transition: { ...transition, duration: 0.2 }
    },
    hoverExpanded: {
      rotate: -45,
      y: -4,
      scale: 1.1,
      transition: { ...transition, duration: 0.2 }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Top line */}
      <motion.line
        x1="4"
        y1="8"
        x2="20"
        y2="8"
        variants={topVariants}
        className="origin-center"
      />
      {/* Middle line */}
      <motion.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        variants={centerVariants}
        className="origin-center"
      />
      {/* Bottom line */}
      <motion.line
        x1="4"
        y1="16"
        x2="20"
        y2="16"
        variants={bottomVariants}
        className="origin-center"
      />
    </motion.svg>
  );
};
AnimatedMenuIcon.displayName = "AnimatedMenuIcon";

/** Shield icon for Security value */
export const ShieldIcon = ({ className, size = 24, color = "currentColor" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
ShieldIcon.displayName = "ShieldIcon";

/** Scale icon for Regulatory value */
export const ScaleIcon = ({ className, size = 24, color = "currentColor" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 3v18" />
    <path d="M5 6l7-3 7 3" />
    <path d="M5 6v6c0 1.1.9 2 2 2h2" />
    <path d="M19 6v6c0 1.1-.9 2-2 2h-2" />
  </svg>
);
ScaleIcon.displayName = "ScaleIcon";

/** Gear icon for Operations value */
export const GearIcon = ({ className, size = 24, color = "currentColor" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
GearIcon.displayName = "GearIcon";

/** Eye icon for Transparency value */
export const EyeIcon = ({ className, size = 24, color = "currentColor" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
EyeIcon.displayName = "EyeIcon";

/** Users icon for Client Focus value */
export const UsersIcon = ({ className, size = 24, color = "currentColor" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
UsersIcon.displayName = "UsersIcon";

/** Check circle icon for service lists */
export const CheckCircleIcon = ({ className, size = 24, color = "currentColor" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
CheckCircleIcon.displayName = "CheckCircleIcon";

/** Simple checkmark icon for success states */
export const CheckIcon = ({ className, size = 24, color = "currentColor" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
CheckIcon.displayName = "CheckIcon";
