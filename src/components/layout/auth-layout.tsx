'use client';

import Image from 'next/image';
import { VIDEOS } from '@/lib/constants';
import { AppLink } from '@/components/ui/app-link';

interface AuthLayoutProps {
  /** Form content for left panel */
  children: React.ReactNode;
}

/**
 * Split-screen layout for auth pages
 * Left: Logo + centered form content, Right: Full-bleed video
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Form */}
      <div className="flex w-full flex-col bg-black px-6 py-8 md:w-1/2 md:px-12 lg:px-20">
        {/* Logo - links back to home */}
        <AppLink href="/" className="mb-auto" aria-label="Back to home">
          <Image
            src="/images/Header/logo.svg"
            alt="Juno"
            width={100}
            height={25}
            className="h-6 w-auto brightness-0 invert"
            priority
          />
        </AppLink>

        {/* Form Content - centered */}
        <div className="my-auto max-w-md text-center">{children}</div>

        {/* Spacer for vertical centering */}
        <div className="mt-auto" />
      </div>

      {/* Right Panel - Full-bleed Video */}
      <div className="relative hidden w-1/2 overflow-hidden bg-black md:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src={VIDEOS.animatedCurrencies} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
