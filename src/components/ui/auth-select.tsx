'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

interface AuthSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Error message to display below select */
  error?: string;
  /** Placeholder text shown when no option is selected */
  placeholder?: string;
  /** Options to display */
  options: { value: string; label: string }[];
}

/**
 * Dark-themed select for auth pages
 * Transparent background with white text for premium feel
 */
const AuthSelect = React.forwardRef<HTMLSelectElement, AuthSelectProps>(
  ({ className, error, placeholder, options, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <select
          className={cn(
            'h-12 w-full cursor-pointer appearance-none rounded-lg border border-white/20 bg-white/5 px-4 pr-10 text-sm text-white outline-none transition-colors',
            FONT.mono,
            'hover:border-white/30 hover:bg-white/[0.08]',
            'focus:border-white/40 focus:bg-white/10',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-red-500/60' : '',
            // Custom white arrow for dark background
            'bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27rgba(255,255,255,0.6)%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E")] bg-[length:20px_20px] bg-[right_12px_center] bg-no-repeat',
            className
          )}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        >
          {placeholder && (
            <option value="" className="bg-black text-white/40">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-black text-white">
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-xs text-red-400" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);
AuthSelect.displayName = 'AuthSelect';

export { AuthSelect, type AuthSelectProps };
