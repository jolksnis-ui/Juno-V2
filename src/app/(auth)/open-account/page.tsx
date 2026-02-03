'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '@/components/layout/auth-layout';
import { AuthInput } from '@/components/ui/auth-input';
import { AuthSelect } from '@/components/ui/auth-select';
import { AuthTextarea } from '@/components/ui/auth-textarea';
import { AuthSubmitButton } from '@/components/ui/auth-button';
import { AppLink } from '@/components/ui/app-link';
import { openAccountSchema, type OpenAccountFormValues } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

/** Estimated turnover options */
const TURNOVER_OPTIONS = [
  { value: 'under-100k', label: 'Under $100,000' },
  { value: '100k-500k', label: '$100,000 - $500,000' },
  { value: '500k-1m', label: '$500,000 - $1,000,000' },
  { value: '1m-5m', label: '$1,000,000 - $5,000,000' },
  { value: '5m-10m', label: '$5,000,000 - $10,000,000' },
  { value: 'over-10m', label: 'Over $10,000,000' },
];

/**
 * Open account enquiry page
 * Collects information for account opening review
 */
export default function OpenAccountPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<OpenAccountFormValues>({
    resolver: zodResolver(openAccountSchema),
    mode: 'onChange',
  });

  /** Handle form submission (UI only) */
  const onSubmit = async (data: OpenAccountFormValues) => {
    // Simulate API call
    console.log('Account enquiry:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSuccess(true);
  };

  return (
    <AuthLayout>
      {isSuccess ? (
        <div className="text-center">
          <div className="mb-6 text-5xl">✓</div>
          <h1 className={cn('mb-4 text-2xl leading-[28px] text-white lg:text-3xl', FONT.serif)}>
            Enquiry Submitted
          </h1>
          <p className={cn('mb-8 text-white/60', FONT.mono)}>
            Thank you for your interest. Our team will review your application
            and contact you within 48 hours.
          </p>
          <AppLink
            href="/"
            className={cn(
              'inline-block rounded bg-white px-6 py-3 text-sm text-juno-900 transition-colors hover:bg-white/90',
              FONT.mono
            )}
          >
            Back to home
          </AppLink>
        </div>
      ) : (
        <>
          <h1 className={cn('mb-2 text-3xl text-white lg:text-4xl', FONT.serif)}>
            Open an Account
          </h1>
          <p className={cn('mb-8 text-white/60', FONT.mono)}>
            Complete the form below and we&apos;ll be in touch.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Honeypot field - hidden from users, catches bots */}
            <input
              type="text"
              className="absolute -left-[9999px] opacity-0"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              {...register('honeypot')}
            />

            <AuthInput
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              aria-label="Full name"
              aria-required="true"
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            <AuthInput
              type="email"
              placeholder="Email"
              autoComplete="email"
              aria-label="Email address"
              aria-required="true"
              error={errors.email?.message}
              {...register('email')}
            />

            <AuthSelect
              placeholder="Estimated Annual Turnover"
              options={TURNOVER_OPTIONS}
              aria-label="Estimated annual turnover"
              aria-required="true"
              error={errors.estimatedTurnover?.message}
              {...register('estimatedTurnover')}
            />

            <AuthTextarea
              placeholder="Tell us about your banking needs..."
              aria-label="Message"
              aria-required="true"
              error={errors.message?.message}
              {...register('message')}
            />

            <AuthSubmitButton
              isValid={isValid}
              isSubmitting={isSubmitting}
              loadingText="Submitting..."
            >
              Submit Enquiry
            </AuthSubmitButton>
          </form>

          {/* Links */}
          <div className={cn('mt-6 text-sm', FONT.mono)}>
            <p className="text-white/40">
              Already have an account?{' '}
              <AppLink
                href="/login"
                className="text-white/60 underline transition-colors hover:text-white"
              >
                Log in
              </AppLink>
            </p>
          </div>
        </>
      )}
    </AuthLayout>
  );
}
