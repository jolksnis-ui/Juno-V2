'use client';

import { forwardRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GetStartedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button text - defaults to "Get Started" */
  label?: string;
  /** Visual variant - dark (default) or light */
  variant?: 'dark' | 'light';
  /** Loading state for form submissions */
  isLoading?: boolean;
  /** Text shown during loading state */
  loadingLabel?: string;
}

/**
 * Primary CTA button with sliding chevron animation
 * Supports dark/light variants and loading state for forms
 */
const GetStartedButton = forwardRef<HTMLButtonElement, GetStartedButtonProps>(
  (
    {
      className,
      label = 'Get Started',
      variant = 'dark',
      isLoading = false,
      loadingLabel = 'Sending...',
      disabled,
      ...props
    },
    ref
  ) => {
    const isLight = variant === 'light';
    const displayLabel = isLoading ? loadingLabel : label;

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'group relative inline-flex h-[52px] items-center justify-center overflow-hidden rounded-md px-8 text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          isLight
            ? 'bg-white text-[#18181B] focus-visible:ring-[#18181B]'
            : 'bg-[#18181B] text-white focus-visible:ring-white',
          className
        )}
        {...props}
      >
        <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
          {displayLabel}
        </span>
        {!isLoading && (
          <i
            className={cn(
              'absolute bottom-1 right-1 top-1 z-10 grid w-1/4 place-items-center rounded-sm transition-all duration-500 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95',
              isLight ? 'bg-[#18181B]/10' : 'bg-white/15'
            )}
            aria-hidden="true"
          >
            <ChevronRight
              size={16}
              strokeWidth={2}
              className={isLight ? 'text-[#18181B]' : 'text-white'}
            />
          </i>
        )}
      </button>
    );
  }
);
GetStartedButton.displayName = 'GetStartedButton';

export { GetStartedButton, type GetStartedButtonProps };
