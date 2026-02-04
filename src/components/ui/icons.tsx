import { motion } from 'framer-motion';
import { MENU_ICON_COLOR } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

interface AnimatedMenuIconProps extends IconProps {
  isOpen: boolean;
  isHovered?: boolean;
}

const t = { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const };

/**
 * Animated menu icon: 2-line burger morphs smoothly into X (cross) and back.
 * Same two lines animate with rotate + translate; no swap.
 */
export const AnimatedMenuIcon = ({
  isOpen,
  isHovered = false,
  className,
  size = 24,
  color = MENU_ICON_COLOR,
}: AnimatedMenuIconProps) => {
  const topVariants = {
    closed: { rotate: 0, y: 0, scale: 1, strokeWidth: 1.4, transition: t },
    open: { rotate: 45, y: 2, scale: 0.92, strokeWidth: 1.6, transition: t },
    hoverClosed: { rotate: 0, y: -1, scale: 1, strokeWidth: 1.4, transition: { ...t, duration: 0.2 } },
    hoverExpanded: { rotate: 45, y: 2, scale: 0.96, strokeWidth: 1.6, transition: { ...t, duration: 0.2 } },
  };

  const bottomVariants = {
    closed: { rotate: 0, y: 0, scale: 1, strokeWidth: 1.4, transition: t },
    open: { rotate: -45, y: -2, scale: 0.92, strokeWidth: 1.6, transition: t },
    hoverClosed: { rotate: 0, y: 1, scale: 1, strokeWidth: 1.4, transition: { ...t, duration: 0.2 } },
    hoverExpanded: { rotate: -45, y: -2, scale: 0.96, strokeWidth: 1.6, transition: { ...t, duration: 0.2 } },
  };

  const state: 'closed' | 'open' | 'hoverClosed' | 'hoverExpanded' =
    isHovered && isOpen ? 'hoverExpanded' : isHovered && !isOpen ? 'hoverClosed' : isOpen ? 'open' : 'closed';

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className, 'origin-center')}
      aria-hidden="true"
    >
      <motion.line
        x1="2"
        y1="10"
        x2="22"
        y2="10"
        variants={topVariants}
        animate={state}
        initial={false}
        className="origin-center"
      />
      <motion.line
        x1="2"
        y1="14"
        x2="22"
        y2="14"
        variants={bottomVariants}
        animate={state}
        initial={false}
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

/** Eye icon for Transparency value and password visibility toggle */
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

/** Eye-off icon for password visibility toggle (hide password) */
export const EyeOffIcon = ({ className, size = 24, color = "currentColor" }: IconProps) => (
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
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
EyeOffIcon.displayName = "EyeOffIcon";

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
