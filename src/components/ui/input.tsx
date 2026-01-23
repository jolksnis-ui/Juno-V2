'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Error message to display below input */
  error?: string;
}

/**
 * Minimalist input with top border styling
 * Supports focus, error, and disabled states
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <input
          type={type}
          className={cn(
            'h-16 w-full border-t bg-transparent p-3 text-base text-[#18181B] outline-none transition-colors',
            'font-[family-name:var(--font-geist-mono)] placeholder:text-[#A0A0AB]',
            'focus:border-[#18181B]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-[#EF4444]' : 'border-[#A0A0AB]',
            className
          )}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {error && (
          <span className="text-xs text-[#EF4444]" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input, type InputProps };
