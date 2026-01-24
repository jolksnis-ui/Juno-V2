'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '@/components/layout/auth-layout';
import { AuthInput } from '@/components/ui/auth-input';
import { AuthSubmitButton } from '@/components/ui/auth-button';
import { resetPasswordSchema, type ResetPasswordFormValues } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

/**
 * Reset password page - Step 3: Enter new password
 * User arrives here from email link
 */
export default function ResetPasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
  });

  /** Handle form submission */
  const onSubmit = async (data: ResetPasswordFormValues) => {
    // Simulate API call
    console.log('Password reset:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Navigate to success page
    router.push('/forgot-password/success');
  };

  return (
    <AuthLayout>
      <h1 className={cn('mb-2 text-3xl text-white md:text-4xl', FONT.serif)}>
        Reset Password
      </h1>
      <p className={cn('mb-8 text-white/60', FONT.mono)}>
        Enter your new password below.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <AuthInput
          type="password"
          placeholder="New Password"
          autoComplete="new-password"
          aria-label="New password"
          aria-required="true"
          error={errors.password?.message}
          {...register('password')}
        />

        <AuthInput
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
          aria-label="Confirm new password"
          aria-required="true"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        {/* Password requirements hint */}
        <ul className={cn('text-xs text-white/40', FONT.mono)}>
          <li>• At least 8 characters</li>
          <li>• One uppercase letter</li>
          <li>• One lowercase letter</li>
          <li>• One number</li>
        </ul>

        <AuthSubmitButton
          isValid={isValid}
          isSubmitting={isSubmitting}
          loadingText="Resetting..."
        >
          Reset Password
        </AuthSubmitButton>
      </form>
    </AuthLayout>
  );
}
