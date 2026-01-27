'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

interface AuthTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error message to display below textarea */
  error?: string;
}

/**
 * Dark-themed textarea for auth pages
 * Transparent background with white text, auto-expands
 */
const AuthTextarea = React.forwardRef<HTMLTextAreaElement, AuthTextareaProps>(
  ({ className, error, onInput, rows = 3, ...props }, ref) => {
    /** Auto-resize textarea based on content */
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      const target = e.currentTarget;
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
      onInput?.(e);
    };

    return (
      <div className="flex flex-col gap-1">
        <textarea
          rows={rows}
          className={cn(
            'min-h-24 w-full resize-none rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors',
            FONT.mono,
            'placeholder:text-white/40',
            'hover:border-white/30 hover:bg-white/[0.08]',
            'focus:border-white/40 focus:bg-white/10',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-red-500/60' : '',
            className
          )}
          ref={ref}
          onInput={handleInput}
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
AuthTextarea.displayName = 'AuthTextarea';

export { AuthTextarea, type AuthTextareaProps };
