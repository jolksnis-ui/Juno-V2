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
