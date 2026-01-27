import { cn } from '@/lib/utils';
import { FONT, MAX_WIDTHS } from '@/lib/constants';

interface SectionHeaderProps {
  /** Optional badge text displayed above title */
  badge?: string;
  /** Main title - can be string or JSX for line breaks */
  title: React.ReactNode;
  /** Optional subtitle/description below title */
  subtitle?: string;
  /** Optional action element (e.g., button) on the right */
  action?: React.ReactNode;
  /** Text alignment */
  align?: 'center' | 'left';
  /** Color theme */
  theme?: 'light' | 'dark';
  /** Maximum width for title */
  titleMaxWidth?: string;
  /** Additional CSS classes for container */
  className?: string;
}

/**
 * Reusable section header with badge, title, subtitle, and optional action
 * Supports both light and dark themes
 */
export const SectionHeader = ({
  badge,
  title,
  subtitle,
  action,
  align = 'left',
  theme = 'light',
  titleMaxWidth = MAX_WIDTHS.sectionHeader,
  className,
}: SectionHeaderProps) => {
  const isDark = theme === 'dark';

  // Centered layout (no action, centered text)
  if (align === 'center') {
    return (
      <div
        className={cn(
          'mx-auto flex flex-col items-center gap-6 text-center',
          className
        )}
        style={{ maxWidth: titleMaxWidth }}
      >
        {badge && (
          <span
            className={cn(
              'w-fit rounded border px-1.5 py-1 text-sm',
              FONT.mono,
              isDark
                ? 'border-juno-700 bg-white/[0.08] text-juno-300'
                : 'border-juno-200 bg-juno-100 text-juno-700'
            )}
          >
            {badge}
          </span>
        )}
        <h2
          className={cn(
            'text-[36px] leading-none md:text-[60px] md:leading-[1.13]',
            FONT.serif,
            isDark ? 'text-white' : 'text-juno-900'
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'text-lg leading-normal',
              isDark ? 'text-juno-200' : 'text-juno-700'
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  // Left-aligned layout with optional action
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {badge && (
        <span
          className={cn(
            'w-fit rounded border px-1.5 py-1 text-sm',
            FONT.mono,
            isDark
              ? 'border-juno-700 bg-white/[0.08] text-juno-300'
              : 'border-juno-200 bg-juno-100 text-juno-700'
          )}
        >
          {badge}
        </span>
      )}
      <div className="flex items-center justify-between">
        <h2
          className={cn(
            'text-[60px] leading-[1.13]',
            FONT.serif,
            isDark ? 'text-white' : 'text-juno-900'
          )}
          style={{ maxWidth: titleMaxWidth }}
        >
          {title}
        </h2>
        {action}
      </div>
      {subtitle && (
        <p
          className={cn(
            'text-lg leading-normal',
            isDark ? 'text-juno-200' : 'text-juno-700'
          )}
          style={{ maxWidth: titleMaxWidth }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
SectionHeader.displayName = 'SectionHeader';
