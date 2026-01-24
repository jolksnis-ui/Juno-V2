'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/section-header';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ProgressBar } from '@/components/ui/progress-bar';
import {
  ANIMATION,
  TRANSITION,
  IMAGES,
  FONT,
  ROW_HEIGHT,
  MAX_WIDTHS,
  AUTO_ROTATE_INTERVAL,
} from '@/lib/constants';

/** Security feature data structure */
interface SecurityFeature {
  id: number;
  label: string;
  title: string;
  description: string;
  image: string;
  mobileImage: string;
}

/** Security feature data for each section */
const SECURITY_FEATURES: SecurityFeature[] = [
  {
    id: 1,
    label: 'Account Protection',
    title: 'Earn interest on your Bitcoin, paid every day',
    description:
      'Multi-layer security, real-time monitoring, and account-level controls safeguard user funds and access at all times.',
    image: IMAGES.stepperAccountProtection,
    mobileImage: IMAGES.stepperAccountProtectionMobile,
  },
  {
    id: 2,
    label: 'Compliance & KYC',
    title: 'Streamlined verification for faster onboarding',
    description:
      'Automated identity verification, regulatory reporting, and built-in compliance workflows keep your business audit-ready.',
    image: IMAGES.stepperComplianceKyc,
    mobileImage: IMAGES.stepperComplianceMobile,
  },
  {
    id: 3,
    label: 'Secure payments at scale',
    title: 'Move money globally with confidence',
    description:
      'Enterprise-grade encryption and fraud detection enable millions of transactions without compromising security.',
    image: IMAGES.stepperSecurePayments,
    mobileImage: IMAGES.stepperSecurePaymentsMobile,
  },
  {
    id: 4,
    label: 'Trusted infrastructure',
    title: 'Enterprise-grade reliability you can count on',
    description:
      'Bank-grade hosting, redundant systems, and 99.99% uptime ensure your operations never skip a beat.',
    image: IMAGES.stepperTrustedInfrastructure,
    mobileImage: IMAGES.stepperTrustedInfrastructureMobile,
  },
];

/**
 * Security section with auto-rotating feature display
 * Desktop: Full-width rows with centered phone mockup
 * Mobile: Carousel with navigation arrows and dots
 */
const SecuritySection = () => {
  const [activeFeature, setActiveFeature] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  /** Advances to the next feature (wraps around) */
  const nextFeature = useCallback(() => {
    setActiveFeature((current) => (current % SECURITY_FEATURES.length) + 1);
  }, []);

  /** Goes to the previous feature (wraps around) */
  const prevFeature = useCallback(() => {
    setActiveFeature((current) =>
      current === 1 ? SECURITY_FEATURES.length : current - 1
    );
  }, []);

  /** Handles manual navigation - pauses auto-rotation briefly */
  const handleManualNav = useCallback(
    (direction: 'prev' | 'next') => {
      setIsPaused(true);
      if (direction === 'prev') {
        prevFeature();
      } else {
        nextFeature();
      }
      setTimeout(() => setIsPaused(false), AUTO_ROTATE_INTERVAL);
    },
    [prevFeature, nextFeature]
  );

  // Auto-rotation effect (pauses on manual navigation)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextFeature, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, nextFeature]);

  const currentFeature =
    SECURITY_FEATURES.find((f) => f.id === activeFeature) || SECURITY_FEATURES[0];

  return (
    <section className="relative bg-juno-900">
      {/* Header */}
      <div className="px-4 py-16 md:px-0 md:py-[100px]">
        <ScrollReveal mode="slide">
          <SectionHeader
            align="center"
            theme="dark"
            title={
              <>
                Security & compliance
                <br />
                you can trust
              </>
            }
            subtitle="Juno combines enterprise-grade security features with world-class compliance tooling to help businesses operate safely, securely, and at scale."
            titleMaxWidth="696px"
          />
        </ScrollReveal>
      </div>

      {/* Desktop: Row-based layout */}
      <div
        className="relative mx-auto hidden h-[640px] w-full md:block"
        style={{ maxWidth: MAX_WIDTHS.section }}
      >
        {/* Feature rows */}
        <div
          className="absolute left-0 top-[65px] flex w-full flex-col"
          aria-label="Security features"
        >
          {SECURITY_FEATURES.map((feature) => (
            <FeatureRow
              key={feature.id}
              feature={feature}
              isActive={activeFeature === feature.id}
            />
          ))}
        </div>

        {/* Stepper image - desktop */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative w-[clamp(220px,calc(220px+(100vw-1024px)*0.39),320px)]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentFeature.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={currentFeature.image}
                  alt={currentFeature.label}
                  width={320}
                  height={640}
                  className="pointer-events-none h-auto w-full"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            {/* Invisible placeholder to maintain height */}
            <Image
              src={SECURITY_FEATURES[0].image}
              alt=""
              width={320}
              height={640}
              className="invisible h-auto w-full"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Mobile: Carousel layout */}
      <MobileCarousel
        currentFeature={currentFeature}
        activeId={activeFeature}
        onPrev={() => handleManualNav('prev')}
        onNext={() => handleManualNav('next')}
      />
    </section>
  );
};
SecuritySection.displayName = 'SecuritySection';

/** Mobile carousel with arrows, dots, and bottom-flush mockup */
const MobileCarousel = ({
  currentFeature,
  activeId,
  onPrev,
  onNext,
}: {
  currentFeature: SecurityFeature;
  activeId: number;
  onPrev: () => void;
  onNext: () => void;
}) => (
  <div className="relative border-t border-juno-700 md:hidden">
    {/* Content area */}
    <div className="px-4 pt-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFeature.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ ...TRANSITION, duration: ANIMATION.fast }}
          className="flex flex-col gap-4 text-center"
        >
          <span className="text-base text-juno-300">{currentFeature.label}</span>
          <h3 className={cn('text-[32px] leading-tight text-white', FONT.serif)}>
            {currentFeature.title}
          </h3>
          <p className="text-base leading-normal text-juno-200">
            {currentFeature.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>

    {/* Navigation: arrows and dots */}
    <div className="flex items-center justify-between px-4 py-6">
      {/* Diamond-shaped prev button */}
      <button
        onClick={onPrev}
        className="flex size-[51px] rotate-45 items-center justify-center bg-juno-700/50 text-white transition-colors hover:bg-juno-700"
        aria-label="Previous feature"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="-rotate-45"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="flex gap-2">
        {SECURITY_FEATURES.map((feature) => (
          <span
            key={feature.id}
            className={cn(
              'size-3 rounded-full transition-colors',
              activeId === feature.id ? 'bg-white' : 'bg-juno-600'
            )}
            aria-label={`Step ${feature.id} of ${SECURITY_FEATURES.length}`}
          />
        ))}
      </div>

      {/* Diamond-shaped next button */}
      <button
        onClick={onNext}
        className="flex size-[51px] rotate-45 items-center justify-center bg-juno-700/50 text-white transition-colors hover:bg-juno-700"
        aria-label="Next feature"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="-rotate-45"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>

    {/* Mobile mockup - flush to bottom */}
    <div className="relative flex justify-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentFeature.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="w-[300px] max-w-full"
        >
          <Image
            src={currentFeature.mobileImage}
            alt={currentFeature.label}
            width={300}
            height={399}
            className="h-auto w-full"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
);
MobileCarousel.displayName = 'MobileCarousel';

/** Full-width feature row with left title and right description */
const FeatureRow = ({
  feature,
  isActive,
}: {
  feature: SecurityFeature;
  isActive: boolean;
}) => (
  <div className="flex w-full flex-col">
    <motion.div
      animate={{ height: isActive ? ROW_HEIGHT.securityActive : ROW_HEIGHT.securityInactive }}
      transition={{ ...TRANSITION, duration: ANIMATION.medium }}
      className={cn(
        'flex w-full items-center justify-between overflow-hidden border-b px-16',
        isActive ? 'border-white py-10' : 'border-juno-700'
      )}
    >
      {/* Left: Label + Title (stacked with gap) */}
      <div
        className={cn(
          'flex flex-col',
          isActive ? 'justify-center gap-[30px]' : 'h-full justify-center'
        )}
      >
        {/* Micro headline - always visible */}
        <span className="w-[360px] text-base leading-[1.25] text-juno-300">
          {feature.label}
        </span>

        {/* H3 Title - appears below label when active */}
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ ...TRANSITION, duration: ANIMATION.fast }}
              className={cn('w-[360px] text-[32px] leading-[1.25] text-white', FONT.serif)}
            >
              {feature.title}
            </motion.h3>
          )}
        </AnimatePresence>
      </div>

      {/* Right: Description (animates in when active, aligned to bottom) */}
      <div
        className={cn('flex w-[360px]', isActive ? 'h-full items-end' : 'hidden')}
      >
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ ...TRANSITION, duration: ANIMATION.fast }}
              className="text-base leading-[1.25] text-juno-300"
            >
              {feature.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>

    {/* Progress bar showing auto-rotation timing */}
    <ProgressBar
      isActive={isActive}
      isPaused={false}
      featureId={feature.id}
      bgColor="bg-juno-700"
      fillColor="bg-white"
    />
  </div>
);

export { SecuritySection };
