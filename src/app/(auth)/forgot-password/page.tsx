'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '@/components/layout/auth-layout';
import { AuthInput } from '@/components/ui/auth-input';
import { AuthSubmitButton } from '@/components/ui/auth-button';
import { AppLink } from '@/components/ui/app-link';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

/**
 * Forgot password page - Step 1: Enter email
 */
export default function ForgotPasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  /** Handle form submission */
  const onSubmit = async (data: ForgotPasswordFormValues) => {
    // Simulate API call
    console.log('Password reset request:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Navigate to confirmation page
    router.push('/forgot-password/sent');
  };

  return (
    <AuthLayout>
      <h1 className={cn('mb-2 text-3xl text-white lg:text-4xl', FONT.serif)}>
        Forgot Password
      </h1>
      <p className={cn('mb-8 text-white/60', FONT.mono)}>
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>

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

        <AuthSubmitButton
          isValid={isValid}
          isSubmitting={isSubmitting}
          loadingText="Sending..."
        >
          Send Reset Link
        </AuthSubmitButton>
      </form>

      {/* Back to login */}
      <div className={cn('mt-8 text-sm', FONT.mono)}>
        <AppLink
          href="/login"
          className="text-white/60 transition-colors hover:text-white"
        >
          ← Back to login
        </AppLink>
      </div>
    </AuthLayout>
  );
}
