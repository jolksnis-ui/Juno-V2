import Link from 'next/link';
import { AuthLayout } from '@/components/layout/auth-layout';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

/**
 * Forgot password - Step 2: Email sent confirmation
 */
export default function ForgotPasswordSentPage() {
  return (
    <AuthLayout>
      <div className="text-center">
        <div className="mb-6 text-5xl">✉️</div>
        <h1 className={cn('mb-4 text-2xl text-white md:text-3xl', FONT.serif)}>
          Check Your Email
        </h1>
        <p className={cn('mb-8 text-white/60', FONT.mono)}>
          We&apos;ve sent a password reset link to your email address.
          Please check your inbox and follow the instructions.
        </p>
        <p className={cn('mb-8 text-sm text-white/40', FONT.mono)}>
          Didn&apos;t receive the email? Check your spam folder or try again.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/forgot-password"
            className={cn(
              'inline-block rounded border border-white/20 px-6 py-3 text-sm text-white transition-colors hover:bg-white/10',
              FONT.mono
            )}
          >
            Try Again
          </Link>
          <Link
            href="/login"
            className={cn(
              'text-sm text-white/60 transition-colors hover:text-white',
              FONT.mono
            )}
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
