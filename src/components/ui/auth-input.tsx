'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Error message to display below input */
  error?: string;
}

/**
 * Dark-themed input for auth pages
 * Transparent background with white text for premium feel
 */
const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <input
          type={type}
          className={cn(
            'h-12 w-full rounded-lg border border-white/20 bg-white/5 px-4 text-sm text-white outline-none transition-colors',
            FONT.mono,
            'placeholder:text-white/40',
            'hover:border-white/30 hover:bg-white/[0.08]',
            'focus:border-white/40 focus:bg-white/10',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-red-500/60' : '',
            className
          )}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-400" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);
AuthInput.displayName = 'AuthInput';

export { AuthInput, type AuthInputProps };
