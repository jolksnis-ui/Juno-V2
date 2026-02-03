'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '@/components/layout/auth-layout';
import { AuthInput } from '@/components/ui/auth-input';
import { AuthSubmitButton } from '@/components/ui/auth-button';
import { AppLink } from '@/components/ui/app-link';
import { loginSchema, type LoginFormValues } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

/**
 * Login page with split-screen layout
 * Left: Email + Password form, Right: Full-bleed video
 */
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  /** Handle form submission (UI only) */
  const onSubmit = async (data: LoginFormValues) => {
    // Simulate API call
    console.log('Login attempt:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <AuthLayout>
      <h1 className={cn('mb-10 text-3xl text-white lg:text-4xl', FONT.serif)}>
        Welcome to Juno
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <AuthInput
          type="email"
          placeholder="Email"
          autoComplete="email"
          aria-label="Email address"
          aria-required="true"
          error={errors.email?.message}
          {...register('email')}
        />

        <AuthInput
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          aria-label="Password"
          aria-required="true"
          error={errors.password?.message}
          {...register('password')}
        />

        <AuthSubmitButton
          isValid={isValid}
          isSubmitting={isSubmitting}
          loadingText="Signing in..."
        >
          Continue
        </AuthSubmitButton>
      </form>

      {/* Links */}
      <div className={cn('mt-8 space-y-4 text-sm', FONT.mono)}>
        <AppLink
          href="/forgot-password"
          className="block text-white/60 transition-colors hover:text-white"
        >
          Forgot password?
        </AppLink>
        <p className="text-white/40">
          Don&apos;t have an account?{' '}
          <AppLink
            href="/open-account"
            className="text-white/60 underline transition-colors hover:text-white"
          >
            Open an account
          </AppLink>
        </p>
      </div>
    </AuthLayout>
  );
}
