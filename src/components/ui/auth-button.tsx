'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

interface AuthSubmitButtonProps {
  /** Button is disabled when form is invalid */
  isValid: boolean;
  /** Shows loading state during form submission */
  isSubmitting: boolean;
  /** Button text when not submitting */
  children: React.ReactNode;
  /** Text shown during submission */
  loadingText?: string;
  /** Additional class names */
  className?: string;
}

/**
 * Styled submit button for auth forms
 * Handles disabled state based on form validity and submission status
 */
export function AuthSubmitButton({
  isValid,
  isSubmitting,
  children,
  loadingText = 'Please wait...',
  className,
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={!isValid || isSubmitting}
      className={cn(
        'h-12 w-full md:w-auto rounded bg-white text-sm text-juno-900 transition-colors',
        'hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50',
        FONT.mono,
        className
      )}
    >
      {isSubmitting ? loadingText : children}
    </button>
  );
}
