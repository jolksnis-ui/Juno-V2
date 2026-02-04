'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

interface LoginInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Error message to display below input */
  error?: string;
}

/**
 * Underline-style input for login page (matches contact form behavior)
 * Hover and focus states like contact form Input
 */
const LoginInput = React.forwardRef<HTMLInputElement, LoginInputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <input
          type={type}
          className={cn(
            'h-12 w-full border-b bg-transparent pb-2 pt-1 text-base text-juno-900 outline-none transition-colors',
            FONT.mono,
            'placeholder:text-juno-400',
            'hover:border-juno-600',
            'focus:border-juno-900',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-destructive' : 'border-juno-400',
            className
          )}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {error && (
          <span className="text-xs text-destructive" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);
LoginInput.displayName = 'LoginInput';

export { LoginInput, type LoginInputProps };
