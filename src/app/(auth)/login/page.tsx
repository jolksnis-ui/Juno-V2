'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { AuthSubmitButton } from '@/components/ui/auth-button';
import { AppLink } from '@/components/ui/app-link';
import { LoginInput } from '@/components/ui/login-input';
import { LoginPasswordInput } from '@/components/ui/login-password-input';
import { loginSchema, type LoginFormValues } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { FONT, IMAGES } from '@/lib/constants';

/**
 * Login page – white card layout with form (left), image (right).
 * Underline inputs with hover/focus like contact form. Responsive: stacks form above image.
 */
export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log('Login attempt:', { ...data, rememberMe });
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <div className="min-h-screen bg-juno-800 px-4 py-6 md:px-6 md:py-8 lg:flex lg:flex-col lg:items-center lg:justify-center lg:py-12">
      {/* Brand above card */}
      <h1
        className={cn(
          'text-center text-2xl font-semibold text-white md:text-3xl',
          FONT.serif
        )}
      >
        junomoney
      </h1>

      {/* White card: form + image (stacked on small, side-by-side on lg) */}
      <div className="mx-auto mt-6 w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-xl md:mt-8 lg:mt-10 lg:flex lg:min-h-[560px]">
        {/* Left: form (first on mobile, left on desktop) */}
        <div className="flex flex-1 flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <h2 className={cn('text-2xl font-semibold text-juno-900 sm:text-3xl', FONT.serif)}>
            Log in
          </h2>
          <p className="mt-2 text-sm text-juno-500 sm:text-base">
            Welcome back! Please enter your details.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 space-y-6"
          >
            <LoginInput
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              aria-label="Email address"
              aria-required="true"
              error={errors.email?.message}
              {...register('email')}
            />

            <LoginPasswordInput
              placeholder="Password"
              autoComplete="current-password"
              aria-required="true"
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-juno-400 text-juno-900 focus:ring-juno-900"
                  aria-label="Remember for 30 days"
                />
                <span className={cn('text-sm text-juno-900', FONT.mono)}>
                  Remember for 30 days
                </span>
              </label>
              <AppLink
                href="/forgot-password"
                className={cn('text-sm text-juno-900 underline-offset-4 hover:underline', FONT.mono)}
              >
                Forgot password
              </AppLink>
            </div>

            <AuthSubmitButton
              isValid={isValid}
              isSubmitting={isSubmitting}
              loadingText="Signing in..."
              className={cn(
                'flex h-12 w-full items-center justify-center gap-2 rounded bg-juno-900 px-6 text-white transition-colors',
                'hover:bg-juno-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-juno-900 focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                FONT.mono
              )}
            >
              Log in
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 17L17 7" />
                <path d="M17 7H7V17" />
              </svg>
            </AuthSubmitButton>
          </form>

          <p className={cn('mt-6 text-center text-sm text-juno-500', FONT.mono)}>
            Don&apos;t have an account?{' '}
            <AppLink
              href="/open-account"
              className="text-juno-900 underline underline-offset-4 hover:no-underline"
            >
              Open an account
            </AppLink>
          </p>
        </div>

        {/* Right: image (below form on mobile, right panel on lg) */}
        <div className="relative min-h-[240px] flex-1 sm:min-h-[280px] lg:min-w-[420px]">
          <Image
            src={IMAGES.loginPanel}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 420px"
            priority
          />
        </div>
      </div>

      {/* Footer */}
      <p
        className={cn(
          'mt-6 text-center text-xs text-juno-500 sm:text-sm md:mt-8',
          FONT.mono
        )}
      >
        © Juno Money 2025 | All rights reserved.
      </p>
    </div>
  );
}
