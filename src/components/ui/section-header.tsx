import { cn } from '@/lib/utils';

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
  titleMaxWidth = '600px',
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
              'w-fit rounded border px-1.5 py-1 font-[family-name:var(--font-geist-mono)] text-sm',
              isDark
                ? 'border-[#3F3F46] bg-white/[0.08] text-[#D1D1D6]'
                : 'border-[#E4E4E7] bg-[#F4F4F5] text-[#3F3F46]'
            )}
          >
            {badge}
          </span>
        )}
        <h2
          className={cn(
            'font-[family-name:var(--font-fraunces)] text-[60px] leading-[1.13]',
            isDark ? 'text-white' : 'text-[#18181B]'
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'text-lg leading-normal',
              isDark ? 'text-[#E4E4E7]' : 'text-[#3F3F46]'
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
            'w-fit rounded border px-1.5 py-1 font-[family-name:var(--font-geist-mono)] text-sm',
            isDark
              ? 'border-[#3F3F46] bg-white/[0.08] text-[#D1D1D6]'
              : 'border-[#E4E4E7] bg-[#F4F4F5] text-[#3F3F46]'
          )}
        >
          {badge}
        </span>
      )}
      <div className="flex items-center justify-between">
        <h2
          className={cn(
            'font-[family-name:var(--font-fraunces)] text-[60px] leading-[1.13]',
            isDark ? 'text-white' : 'text-[#18181B]'
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
            isDark ? 'text-[#E4E4E7]' : 'text-[#3F3F46]'
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
