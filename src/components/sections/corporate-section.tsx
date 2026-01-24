'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/section-header';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ProgressBar } from '@/components/ui/progress-bar';
import { ANIMATION, TRANSITION, IMAGES, BADGE_TEXT, AUTO_ROTATE_INTERVAL, FONT, CONTAINER_MAX_WIDTH, ROW_HEIGHT, BUTTON_TEXT } from '@/lib/constants';

/** Corporate feature data structure */
interface CorporateFeature {
  id: number;
  title: string;
  description: string;
  image: string;
}

/** Feature data for corporate clients */
const CORPORATE_FEATURES: CorporateFeature[] = [
  {
    id: 1,
    title: 'Instant payments',
    description: 'Send funds to other Juno Money users instantly.',
    image: IMAGES.corpInstantPayments,
  },
  {
    id: 2,
    title: 'Exchange in 30+ currencies',
    description:
      'Convert between major currencies with competitive rates and full transparency.',
    image: IMAGES.corpExchange,
  },
  {
    id: 3,
    title: 'Fast account creation',
    description:
      'Get started in minutes with streamlined onboarding and verification.',
    image: IMAGES.corpFastAccount,
  },
  {
    id: 4,
    title: 'Dedicated account manager',
    description:
      'Personal support from experts who understand your business needs.',
    image: IMAGES.corpDedicatedManager,
  },
  {
    id: 5,
    title: 'Withdraw',
    description:
      'Access your funds anytime with flexible withdrawal options worldwide.',
    image: IMAGES.corpWithdraw,
  },
  {
    id: 6,
    title: 'Accept payments',
    description:
      'Receive payments from clients globally with minimal fees and fast settlement.',
    image: IMAGES.corpAcceptPayments,
  },
];

/**
 * Corporate section with two-column card layout
 * Desktop: Left image, right interactive feature list with auto-rotation
 * Mobile: Vertical accordion with image appearing below active card
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

  const currentFeature =
    CORPORATE_FEATURES.find((f) => f.id === activeFeature) || CORPORATE_FEATURES[0];

  return (
    <section className="relative bg-juno-50 px-4 py-16 md:py-24 md:px-6">
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
        {/* Desktop Header */}
        <div className="hidden md:block">
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
              action={<GetStartedButton label={BUTTON_TEXT.openAccount} variant="dark" />}
            />
          </ScrollReveal>
        </div>

        {/* Mobile Header - Centered layout */}
        <div className="flex flex-col items-center gap-6 text-center md:hidden">
          <span
            className={cn(
              'w-fit rounded border border-juno-200 bg-juno-100 px-1.5 py-1 text-sm text-juno-700',
              FONT.mono
            )}
          >
            {BADGE_TEXT.corporate}
          </span>
          <h2 className={cn('text-[32px] leading-[1.13] text-juno-900', FONT.serif)}>
            Payment solutions for corporate clients.
          </h2>
          <GetStartedButton
            label={BUTTON_TEXT.openAccount}
            variant="dark"
            className="w-full"
          />
        </div>

        {/* Desktop: Two-column card */}
        <div className="mt-16 hidden h-[600px] overflow-hidden rounded-md border border-juno-300 bg-white/56 md:flex">
          {/* Left: Animated feature image */}
          <FeatureImage feature={currentFeature} />

          {/* Right: Feature list */}
          <FeaturesSide
            activeFeature={activeFeature}
            isPaused={isPaused}
            onFeatureClick={handleFeatureClick}
          />
        </div>

        {/* Mobile: Accordion Layout */}
        <div className="mt-8 overflow-hidden rounded-md border border-juno-300 bg-white md:hidden">
          <MobileCorporateAccordion
            features={CORPORATE_FEATURES}
            activeId={activeFeature}
            isPaused={isPaused}
            onFeatureClick={handleFeatureClick}
          />
        </div>
      </div>
    </section>
  );
};
CorporateSection.displayName = 'CorporateSection';

/** Left side with animated feature image */
const FeatureImage = ({ feature }: { feature: CorporateFeature }) => (
  <div className="relative w-1/2 overflow-hidden border-r border-juno-300">
    {/* Blurred background image */}
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={IMAGES.corpBg}
        alt=""
        fill
        className="object-cover opacity-30 blur-sm"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />
    </div>

    {/* Centered animated feature icon */}
    <div className="absolute inset-0 flex items-center justify-center py-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ ...TRANSITION, duration: ANIMATION.medium }}
          className="relative h-full aspect-[1/2]"
        >
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
      </AnimatePresence>
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
    className="flex w-1/2 flex-col justify-center p-10"
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

/** Individual feature item with expand/collapse animation on click (Desktop) */
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

/** Mobile accordion container for corporate features */
const MobileCorporateAccordion = ({
  features,
  activeId,
  isPaused,
  onFeatureClick,
}: {
  features: CorporateFeature[];
  activeId: number;
  isPaused: boolean;
  onFeatureClick: (id: number) => void;
}) => (
  <div className="flex flex-col">
    {features.map((feature, index) => (
      <MobileCorporateItem
        key={feature.id}
        feature={feature}
        isActive={feature.id === activeId}
        isPaused={isPaused}
        isLast={index === features.length - 1}
        onClick={() => onFeatureClick(feature.id)}
      />
    ))}
  </div>
);

/** Mobile feature item - smooth animated transitions between states (Light theme) */
const MobileCorporateItem = ({
  feature,
  isActive,
  isPaused,
  isLast,
  onClick,
}: {
  feature: CorporateFeature;
  isActive: boolean;
  isPaused: boolean;
  isLast: boolean;
  onClick: () => void;
}) => (
  <div className={cn(!isLast && !isActive && 'border-b border-juno-300')}>
    {/* Title - always visible, clickable when inactive, animates size/color */}
    <button
      onClick={!isActive ? onClick : undefined}
      className={cn(
        'w-full px-4 py-4 text-center',
        !isActive && 'cursor-pointer'
      )}
      aria-label={!isActive ? `View ${feature.title}` : undefined}
      disabled={isActive}
    >
      <motion.h3
        animate={{
          fontSize: isActive ? '22px' : '18px',
          color: isActive ? 'var(--juno-gray-900)' : 'var(--juno-gray-600)',
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={cn('leading-tight', FONT.serif)}
      >
        {feature.title}
      </motion.h3>
    </button>

    {/* Expandable content - animates height in/out smoothly */}
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          {/* Description - fades in and pushes content */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="px-4 pb-4 text-center text-base leading-relaxed text-juno-700"
          >
            {feature.description}
          </motion.p>

          {/* Progress bar - above image */}
          <ProgressBar
            isActive={isActive}
            isPaused={isPaused}
            featureId={feature.id}
            bgColor="bg-juno-300"
            fillColor="bg-juno-900"
          />

          {/* Image container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="relative h-[280px] overflow-hidden"
          >
            {/* Blurred background */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={IMAGES.corpBg}
                alt=""
                fill
                className="object-cover opacity-30 blur-sm"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />
            </div>

            {/* Feature image */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="relative h-[240px] w-[180px]"
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export { CorporateSection };
