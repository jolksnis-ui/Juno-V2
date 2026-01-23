'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

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
            'min-h-16 w-full resize-none border-t bg-transparent p-3 text-base text-[#18181B] outline-none transition-colors',
            'font-[family-name:var(--font-geist-mono)] placeholder:text-[#A0A0AB]',
            'focus:border-[#18181B]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-[#EF4444]' : 'border-[#A0A0AB]',
            className
          )}
          ref={ref}
          onInput={handleInput}
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
Textarea.displayName = 'Textarea';

export { Textarea, type TextareaProps };
