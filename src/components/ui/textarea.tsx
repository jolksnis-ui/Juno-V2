'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error message to display below textarea */
  error?: string;
}

/**
 * Minimalist textarea with top border styling and auto-expand
 * Matches Input component styling for consistency
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, onInput, rows = 1, ...props }, ref) => {
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
            'min-h-16 w-full resize-none border-t bg-transparent p-3 text-base text-juno-900 outline-none transition-colors',
            FONT.mono,
            'placeholder:text-juno-400',
            'focus:border-juno-900',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-destructive' : 'border-juno-400',
            className
          )}
          ref={ref}
          onInput={handleInput}
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
Textarea.displayName = 'Textarea';

export { Textarea, type TextareaProps };
