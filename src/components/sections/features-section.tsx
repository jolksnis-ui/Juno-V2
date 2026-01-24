'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';
import { SectionHeader } from '@/components/ui/section-header';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { ProgressBar } from '@/components/ui/progress-bar';
import {
  ANIMATION,
  TRANSITION,
  AUTO_ROTATE_INTERVAL,
  IMAGES,
  BADGE_TEXT,
  BUTTON_TEXT,
  FONT,
  CONTAINER_MAX_WIDTH,
  ROW_HEIGHT,
} from '@/lib/constants';

/** Feature data structure */
interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
}

/** Features with corresponding images */
const FEATURES: Feature[] = [
  {
    id: 1,
    title: 'Instant payments',
    description: 'Send funds to other Juno Money users instantly.',
    image: IMAGES.featureInstantPayments,
  },
  {
    id: 2,
    title: 'Exchange in 30+ currencies',
    description:
      'Convert between currencies with competitive rates and real-time pricing.',
    image: IMAGES.featureExchange,
  },
  {
    id: 3,
    title: 'Fast account creation',
    description:
      'Get started in minutes with our streamlined onboarding process.',
    image: IMAGES.featureFastAccount,
  },
  {
    id: 4,
    title: 'Dedicated account manager',
    description:
      'Personal support from experts who understand your financial needs.',
    image: IMAGES.featureDedicatedManager,
  },
  {
    id: 5,
    title: 'Withdraw',
    description: 'Access your funds anytime with flexible withdrawal options.',
    image: IMAGES.featureWithdraw,
  },
  {
    id: 6,
    title: 'Accept payments',
    description: 'Receive payments from anywhere in the world seamlessly.',
    image: IMAGES.featureAcceptPayments,
  },
];

/**
 * Features section with auto-rotating feature list
 * Desktop: Dark theme with clickable/hoverable features and corresponding images
 * Mobile: Vertical accordion with image appearing below active card
 */
const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  /** Advances to the next feature (wraps around) */
  const nextFeature = useCallback(() => {
    setActiveFeature((current) => (current % FEATURES.length) + 1);
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
    FEATURES.find((f) => f.id === activeFeature) || FEATURES[0];

  return (
    <section className="relative bg-juno-900 px-4 py-16 md:py-24 md:px-6">
      <DotPattern color="#ffffff" />

      <div className="relative mx-auto" style={{ maxWidth: CONTAINER_MAX_WIDTH }}>
        {/* Desktop Header */}
        <div className="hidden md:block">
          <SectionHeader
            badge={BADGE_TEXT.individual}
            title="Payment solutions for individual clients."
            action={<GetStartedButton variant="light" label={BUTTON_TEXT.openAccount} />}
            theme="dark"
          />
        </div>

        {/* Mobile Header - Centered layout */}
        <div className="flex flex-col items-center gap-6 text-center md:hidden">
          <span
            className={cn(
              'w-fit rounded border border-juno-700 bg-white/[0.08] px-1.5 py-1 text-sm text-juno-300',
              FONT.mono
            )}
          >
            {BADGE_TEXT.individual}
          </span>
          <h2 className={cn('text-[32px] leading-[1.13] text-white', FONT.serif)}>
            Payment solutions for individual clients.
          </h2>
          <GetStartedButton
            variant="light"
            label={BUTTON_TEXT.openAccount}
            className="w-full"
          />
        </div>

        {/* Desktop: Content Box */}
        <div className="mt-16 hidden h-[600px] overflow-hidden rounded-md border border-juno-700 bg-white/[0.04] md:flex">
          {/* Left: Feature List */}
          <div className="flex w-1/2 flex-col justify-center p-10">
            <FeatureList
              features={FEATURES}
              activeId={activeFeature}
              isPaused={isPaused}
              onFeatureClick={handleFeatureClick}
            />
          </div>

          {/* Right: Image Area */}
          <div className="relative w-1/2 border-l border-juno-700">
            <FeatureImage feature={currentFeature} />
          </div>
        </div>

        {/* Mobile: Accordion Layout */}
        <div className="mt-8 overflow-hidden rounded-md border border-juno-700 bg-white/[0.04] md:hidden">
          <MobileFeatureAccordion
            features={FEATURES}
            activeId={activeFeature}
            isPaused={isPaused}
            onFeatureClick={handleFeatureClick}
          />
        </div>
      </div>
    </section>
  );
};
FeaturesSection.displayName = 'FeaturesSection';

/** Feature list with active/inactive states */
const FeatureList = ({
  features,
  activeId,
  isPaused,
  onFeatureClick,
}: {
  features: Feature[];
  activeId: number;
  isPaused: boolean;
  onFeatureClick: (id: number) => void;
}) => (
  <div className="flex w-full flex-col">
    {features.map((feature) => (
      <FeatureItem
        key={feature.id}
        feature={feature}
        isActive={feature.id === activeId}
        isPaused={isPaused}
        onClick={() => onFeatureClick(feature.id)}
      />
    ))}
  </div>
);

/** Individual feature item with expand/collapse animation */
const FeatureItem = ({
  feature,
  isActive,
  isPaused,
  onClick,
}: {
  feature: Feature;
  isActive: boolean;
  isPaused: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="group w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
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
          color: isActive ? '#FFFFFF' : 'var(--juno-gray-400)',
        }}
        transition={{ ...TRANSITION, duration: ANIMATION.fast }}
        className={cn(
          'transition-colors duration-200',
          FONT.serif,
          !isActive && 'group-hover:text-juno-300'
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
            className="mt-3 text-base leading-normal text-juno-300"
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
      bgColor="bg-juno-700"
      fillColor="bg-white"
    />
  </button>
);

/** Right side image area with blur backdrop and centered content (Desktop) */
const FeatureImage = ({ feature }: { feature: Feature }) => (
  <>
    {/* Static blurred background */}
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={IMAGES.featuresSectionBg}
        alt=""
        fill
        className="object-cover opacity-30 blur-sm"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
    </div>

    {/* Centered image/card */}
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ ...TRANSITION, duration: ANIMATION.medium }}
          className="relative h-[400px] w-[300px]"
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
  </>
);

/** Mobile accordion container for features */
const MobileFeatureAccordion = ({
  features,
  activeId,
  isPaused,
  onFeatureClick,
}: {
  features: Feature[];
  activeId: number;
  isPaused: boolean;
  onFeatureClick: (id: number) => void;
}) => (
  <div className="flex flex-col">
    {features.map((feature, index) => (
      <MobileFeatureItem
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

/** Mobile feature item - smooth animated transitions between states */
const MobileFeatureItem = ({
  feature,
  isActive,
  isPaused,
  isLast,
  onClick,
}: {
  feature: Feature;
  isActive: boolean;
  isPaused: boolean;
  isLast: boolean;
  onClick: () => void;
}) => (
  <div className={cn(!isLast && !isActive && 'border-b border-juno-700')}>
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
          color: isActive ? '#FFFFFF' : 'var(--juno-gray-400)',
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
            className="px-4 pb-4 text-center text-base leading-relaxed text-juno-300"
          >
            {feature.description}
          </motion.p>

          {/* Progress bar - above image */}
          <ProgressBar
            isActive={isActive}
            isPaused={isPaused}
            featureId={feature.id}
            bgColor="bg-juno-700"
            fillColor="bg-white"
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
                src={IMAGES.featuresSectionBg}
                alt=""
                fill
                className="object-cover opacity-30 blur-sm"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
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

export { FeaturesSection };
