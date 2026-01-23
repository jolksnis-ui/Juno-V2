import { cn } from '@/lib/utils';

interface ArrowIconProps {
  /** Arrow direction - up-right points diagonally, right points horizontally */
  direction?: 'up-right' | 'right';
  /** Stroke color */
  color?: string;
  /** Icon size in pixels */
  size?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable arrow icon with configurable direction
 * Used in CTA buttons and links throughout the site
 */
export const ArrowIcon = ({
  direction = 'up-right',
  color = 'currentColor',
  size = 16,
  className,
}: ArrowIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(direction === 'up-right' ? '-rotate-45' : 'rotate-45', className)}
    aria-hidden="true"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);
ArrowIcon.displayName = 'ArrowIcon';

interface ArrowRightIconProps {
  /** Stroke color */
  color?: string;
  /** Icon size in pixels */
  size?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Arrow pointing to top-right (diagonal)
 * Used in "Open account" buttons
 */
export const ArrowUpRightIcon = ({
  color = 'currentColor',
  size = 20,
  className,
}: ArrowRightIconProps) => (
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
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);
ArrowUpRightIcon.displayName = 'ArrowUpRightIcon';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const MenuIcon = ({ className, size = 24, color = "currentColor" }: IconProps) => (
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
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
MenuIcon.displayName = "MenuIcon";

export const XIcon = ({ className, size = 24, color = "currentColor" }: IconProps) => (
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
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);
XIcon.displayName = "XIcon";

interface AnimatedMenuIconProps {
  isOpen: boolean;
  className?: string;
  size?: number;
  color?: string;
}

/**
 * Animated menu icon with smooth transition from burger to X
 * Uses CSS transitions for the morphing effect
 */
export const AnimatedMenuIcon = ({
  isOpen,
  className,
  size = 24,
  color = "currentColor",
}: AnimatedMenuIconProps) => (
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
    {/* Top line - rotates to form X */}
    <line
      x1="4"
      y1="8"
      x2="20"
      y2="8"
      className="origin-center transition-transform duration-300 ease-out"
      style={{
        transform: isOpen ? 'translateY(4px) rotate(45deg)' : 'none',
      }}
    />
    {/* Middle line - fades out */}
    <line
      x1="4"
      y1="12"
      x2="20"
      y2="12"
      className="transition-opacity duration-200 ease-out"
      style={{ opacity: isOpen ? 0 : 1 }}
    />
    {/* Bottom line - rotates to form X */}
    <line
      x1="4"
      y1="16"
      x2="20"
      y2="16"
      className="origin-center transition-transform duration-300 ease-out"
      style={{
        transform: isOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
      }}
    />
  </svg>
);
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
