import { AuthLayout } from '@/components/layout/auth-layout';
import { AppLink } from '@/components/ui/app-link';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

/**
 * Forgot password - Step 4: Success confirmation
 * Password has been changed, prompt to login
 */
export default function ForgotPasswordSuccessPage() {
  return (
    <AuthLayout>
      <div className="text-center">
        <div className="mb-6 text-5xl">✓</div>
        <h1 className={cn('mb-4 text-2xl leading-[28px] text-white lg:text-3xl', FONT.serif)}>
          Password Changed
        </h1>
        <p className={cn('mb-8 text-white/60', FONT.mono)}>
          Your password has been successfully reset.
          You can now log in with your new password.
        </p>

        <AppLink
          href="/login"
          className={cn(
            'inline-block rounded bg-white px-8 py-3 text-sm text-juno-900 transition-colors hover:bg-white/90',
            FONT.mono
          )}
        >
          Log In
        </AppLink>
      </div>
    </AuthLayout>
  );
}
