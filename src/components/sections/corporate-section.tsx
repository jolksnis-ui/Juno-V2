'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/section-header';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ANIMATION, TRANSITION, IMAGES, BADGE_TEXT, AUTO_ROTATE_INTERVAL, FONT, CONTAINER_MAX_WIDTH } from '@/lib/constants';

/** Corporate feature data structure */
interface CorporateFeature {
  id: number;
  title: string;
  description: string;
}

/** Row heights for active/inactive states */
const ROW_HEIGHT = {
  active: 140,
  inactive: 84,
} as const;

/** Feature data for corporate clients */
const CORPORATE_FEATURES: CorporateFeature[] = [
  {
    id: 1,
    title: 'Instant payments',
    description: 'Send funds to other Juno Money users instantly.',
  },
  {
    id: 2,
    title: 'Exchange in 30+ currencies',
    description:
      'Convert between major currencies with competitive rates and full transparency.',
  },
  {
    id: 3,
    title: 'Fast account creation',
    description:
      'Get started in minutes with streamlined onboarding and verification.',
  },
  {
    id: 4,
    title: 'Dedicated account manager',
    description:
      'Personal support from experts who understand your business needs.',
  },
  {
    id: 5,
    title: 'Withdraw',
    description:
      'Access your funds anytime with flexible withdrawal options worldwide.',
  },
  {
    id: 6,
    title: 'Accept payments',
    description:
      'Receive payments from clients globally with minimal fees and fast settlement.',
  },
];

/**
 * Corporate section with two-column card layout
 * Left side: background image with transfer card overlay
 * Right side: interactive feature list with click-based auto-rotation
 */
const CorporateSection = () => {
  const [activeFeature, setActiveFeature] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  /** Advances to the next feature (wraps around) */
  const nextFeature = useCallback(() => {
    setActiveFeature((current) => (current % CORPORATE_FEATURES.length) + 1);
  }, []);

  /** Handles feature click - sets active and pauses auto-rotation briefly */
  const handleFeatureClick = (id: number) => {
    setActiveFeature(id);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), AUTO_ROTATE_INTERVAL);
  };

  // Auto-rotation effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(nextFeature, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, nextFeature]);

  return (
    <section className="relative bg-juno-50 px-6 py-24">
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <Image
          src={IMAGES.corporateBg}
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto" style={{ maxWidth: CONTAINER_MAX_WIDTH }}>
        <ScrollReveal mode="slide">
          <SectionHeader
            badge={BADGE_TEXT.corporate}
            title={
              <>
                {`Payment solutions `}
                <br />
                for corporate clients.
              </>
            }
            action={<GetStartedButton label="Open Account" variant="dark" />}
          />
        </ScrollReveal>

        {/* Two-column card */}
        <div className="mt-16 flex h-[600px] overflow-hidden rounded-md border border-juno-300 bg-white/56">
          {/* Left: Image with transfer card overlay */}
          <ImageSide />

          {/* Right: Feature list */}
          <FeaturesSide
            activeFeature={activeFeature}
            isPaused={isPaused}
            onFeatureClick={handleFeatureClick}
          />
        </div>
      </div>
    </section>
  );
};
CorporateSection.displayName = 'CorporateSection';

/** Left side with background image and transfer card overlay */
const ImageSide = () => (
  <div className="relative flex-1 overflow-hidden border-r border-juno-300">
    {/* Background image */}
    <Image
      src={IMAGES.corporateBg}
      alt="Modern corporate office"
      fill
      className="object-cover"
    />

    {/* Frosted glass overlay */}
    <div className="absolute inset-0 bg-white/12 backdrop-blur-[6px]" />

    {/* Transfer card - centered */}
    <div className="absolute inset-0 flex items-center justify-center">
      <TransferCard />
    </div>
  </div>
);

/** Transfer card component showing a sample transaction */
const TransferCard = () => (
  <div className="w-[400px] overflow-hidden rounded-lg border border-juno-300 bg-white shadow-[0px_4px_8px_0px_rgba(0,0,0,0.04)]">
    {/* Header with avatar */}
    <div className="flex items-end gap-3 px-6 pt-6">
      <div className="relative size-[52px] overflow-hidden rounded-md border border-white">
        <Image
          src={IMAGES.avatarJohn}
          alt="John Sanderson"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] font-medium uppercase leading-5 text-juno-600">
          transfer to
        </span>
        <span className="text-sm font-semibold leading-5 text-juno-900">
          John Sanderson
        </span>
      </div>
    </div>

    {/* Amount section */}
    <div className="mt-4 flex flex-col gap-5">
      <div className="h-px bg-juno-200" />
      <div className="flex flex-col gap-2 px-6">
        <span className="text-[11px] font-medium uppercase leading-[14px] text-juno-600">
          Total:
        </span>
        <span className="text-[32px] font-semibold leading-normal text-juno-900">
          $1,840
        </span>
        <span className="text-[11px] font-medium uppercase leading-[14px] text-juno-600">
          Invoice payout for development services.
        </span>
      </div>
      <div className="h-px bg-juno-200" />
    </div>

    {/* Action button */}
    <div className="flex h-[52px] items-center justify-center bg-juno-100 p-1">
      <span className="text-[13px] font-semibold uppercase text-juno-800">
        Transfer instantly
      </span>
    </div>
  </div>
);

/** Right side with interactive feature list */
const FeaturesSide = ({
  activeFeature,
  isPaused,
  onFeatureClick,
}: {
  activeFeature: number;
  isPaused: boolean;
  onFeatureClick: (id: number) => void;
}) => (
  <div
    className="flex w-[440px] shrink-0 flex-col justify-center p-10"
    role="tablist"
    aria-label="Corporate features"
  >
    {CORPORATE_FEATURES.map((feature) => (
      <FeatureItem
        key={feature.id}
        feature={feature}
        isActive={activeFeature === feature.id}
        isPaused={isPaused}
        onClick={() => onFeatureClick(feature.id)}
      />
    ))}
  </div>
);

/** Individual feature item with expand/collapse animation on click */
const FeatureItem = ({
  feature,
  isActive,
  isPaused,
  onClick,
}: {
  feature: CorporateFeature;
  isActive: boolean;
  isPaused: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="group w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-juno-900/50"
    aria-pressed={isActive}
  >
    {/* Container with height animation for smooth expand/collapse */}
    <motion.div
      animate={{ height: isActive ? ROW_HEIGHT.active : ROW_HEIGHT.inactive }}
      transition={{ ...TRANSITION, duration: ANIMATION.medium }}
      className="flex flex-col justify-center overflow-hidden py-2"
    >
      {/* Title - always visible, animates style between active/inactive */}
      <motion.h3
        animate={{
          fontSize: isActive ? '32px' : '20px',
          lineHeight: isActive ? '1.25' : '1.4',
          color: isActive ? 'var(--juno-gray-900)' : 'var(--juno-gray-700)',
        }}
        transition={{ ...TRANSITION, duration: ANIMATION.fast }}
        className={cn(
          'transition-colors duration-200',
          FONT.serif,
          !isActive && 'group-hover:text-juno-900'
        )}
      >
        {feature.title}
      </motion.h3>

      {/* Description - slides in from below, slides out upward */}
      <AnimatePresence>
        {isActive && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ ...TRANSITION, duration: ANIMATION.fast }}
            className="mt-3 text-base leading-normal text-juno-700"
          >
            {feature.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>

    {/* Progress bar with fill animation */}
    <ProgressBar
      isActive={isActive}
      isPaused={isPaused}
      featureId={feature.id}
      bgColor="bg-juno-300"
      fillColor="bg-juno-900"
    />
  </button>
);

/** Animated progress bar that fills over the auto-rotation interval */
const ProgressBar = ({
  isActive,
  isPaused,
  featureId,
  bgColor,
  fillColor,
}: {
  isActive: boolean;
  isPaused: boolean;
  featureId: number;
  bgColor: string;
  fillColor: string;
}) => (
  <div className={cn('h-px w-full', bgColor)}>
    {isActive && (
      <motion.div
        key={`progress-${featureId}`}
        className={cn('h-full', fillColor)}
        initial={{ width: '0%' }}
        animate={{ width: isPaused ? undefined : '100%' }}
        transition={{
          duration: AUTO_ROTATE_INTERVAL / 1000,
          ease: 'linear',
        }}
      />
    )}
  </div>
);

export { CorporateSection };
