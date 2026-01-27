import { cn } from '@/lib/utils';

interface DotPatternProps {
  /** Dot color (hex or CSS color) */
  color?: string;
  /** Grid spacing in pixels */
  size?: number;
  /** Dot radius in pixels */
  dotSize?: number;
  /** Pattern opacity (0-1) */
  opacity?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Subtle dot grid pattern for section backgrounds
 * Creates a professional, textured look without distraction
 */
export const DotPattern = ({
  color = '#18181B',
  size = 24,
  dotSize = 1,
  opacity = 0.02,
  className,
}: DotPatternProps) => (
  <div
    className={cn('pointer-events-none absolute inset-0', className)}
    style={{ opacity }}
    aria-hidden="true"
  >
    <div
      className="size-full"
      style={{
        backgroundImage: `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  </div>
);
DotPattern.displayName = 'DotPattern';
