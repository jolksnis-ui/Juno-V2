'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/section-header';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { useAutoRotate } from '@/hooks/use-auto-rotate';
import { ANIMATION, TRANSITION, IMAGES, FONT, MAX_WIDTHS, CONTAINER_MAX_WIDTH, SECURITY_SECTION } from '@/lib/constants';

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
    mobileImage: IMAGES.stepperAccountProtectionMobile, // /images/Stepper/AccountProtection(M).png (mobile/tablet carousel)
  },
  {
    id: 2,
    label: 'Compliance & KYC',
    title: 'Streamlined verification for faster onboarding',
    description:
      'Robust KYC, AML, and risk-based checks ensure full compliance with regulatory requirements across all supported jurisdictions.',
    image: IMAGES.stepperComplianceKyc,
    mobileImage: IMAGES.stepperComplianceMobile,
  },
  {
    id: 3,
    label: 'Security at scale',
    title: 'Move money globally with confidence',
    description:
      'Reliable payment infrastructure designed to handle high volumes while maintaining speed, accuracy, and security.',
    image: IMAGES.stepperSecurePayments,
    mobileImage: IMAGES.stepperSecurePaymentsMobile,
  },
  {
    id: 4,
    label: 'Trusted infrastructure',
    title: 'Enterprise-grade reliability you can count on',
    description:
      'Built on resilient, audited systems to support regulated financial operations with high availability and operational stability.',
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
  // Mobile carousel keeps the current auto-rotate behavior.
  const { active: activeMobileFeature, handleManualNav } = useAutoRotate({
    itemCount: SECURITY_FEATURES.length,
  });

  const currentMobileFeature =
    SECURITY_FEATURES.find((f) => f.id === activeMobileFeature) || SECURITY_FEATURES[0];

  return (
    <section className="relative bg-juno-900 pb-0 lg:pb-4">
      {/* Header */}
      <div className="px-3 py-16 md:px-6 lg:px-0 lg:pt-[100px] lg:pb-16">
        <ScrollReveal mode="slide">
          <SectionHeader
            align="center"
            theme="dark"
            badge={SECURITY_SECTION.badge}
            title={
              <>
                Security & compliance
                <br />
                you can trust
              </>
            }
            subtitle={SECURITY_SECTION.subtitle}
            titleMaxWidth="696px"
            className="lg:!max-w-[696px]"
          />
        </ScrollReveal>
      </div>

      {/* Desktop: Scroll-pinned stepper layout */}
      <DesktopScrollStepper features={SECURITY_FEATURES} />

      {/* Mobile: Carousel layout */}
      <MobileCarousel
        currentFeature={currentMobileFeature}
        activeId={activeMobileFeature}
        onPrev={() => handleManualNav('prev')}
        onNext={() => handleManualNav('next')}
      />
    </section>
  );
};
SecuritySection.displayName = 'SecuritySection';

/** Desktop scroll-pinned stepper (01→04) */
const DesktopScrollStepper = ({ features }: { features: SecurityFeature[] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [pinState, setPinState] = useState<'before' | 'pinned' | 'after'>('before');

  const steps = features.length;
  const phoneFrameHeightPx = 640;
  // Step heights between dividers (requested).
  const activeStepHeightPx = 148;
  const inactiveStepHeightPx = 76;
  // Total rail height stays constant (1 active + rest inactive).
  const stepperRailHeightPx = activeStepHeightPx + inactiveStepHeightPx * (steps - 1);
  // Vertically center the rail relative to the phone.
  const railTopPx = Math.round((phoneFrameHeightPx - stepperRailHeightPx) / 2);

  // Drive step index from scroll position (works with Lenis smooth scroll)
  const prevIdxRef = useRef(0);
  const pinStateRef = useRef<'before' | 'pinned' | 'after'>('before');
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;

    const updateActiveIdx = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
      const scrollableHeight = rect.height - viewportHeight;
      if (scrollableHeight <= 0) {
        rafId = requestAnimationFrame(updateActiveIdx);
        return;
      }

      // Explicit "pin" (stop-in-place) behavior:
      // - before: content sits at top of the section
      // - pinned: content is fixed to viewport while you scroll through the section
      // - after: content sits at bottom of the section
      const nextPinState: 'before' | 'pinned' | 'after' =
        rect.top > 0 ? 'before' : rect.bottom < viewportHeight ? 'after' : 'pinned';
      if (nextPinState !== pinStateRef.current) {
        pinStateRef.current = nextPinState;
        setPinState(nextPinState);
      }

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      const nextIdx = Math.min(steps - 1, Math.max(0, Math.floor(progress * steps)));
      if (nextIdx !== prevIdxRef.current) {
        prevIdxRef.current = nextIdx;
        setActiveIdx(nextIdx);
      }
      rafId = requestAnimationFrame(updateActiveIdx);
    };

    rafId = requestAnimationFrame(updateActiveIdx);
    return () => cancelAnimationFrame(rafId);
  }, [steps]);

  const activeFeature = features[activeIdx] ?? features[0];
  const rowHeightsPx = features.map((_, idx) =>
    idx === activeIdx ? activeStepHeightPx : inactiveStepHeightPx
  );
  // Cumulative offsets for divider placement.
  const boundaryOffsetsPx = rowHeightsPx.reduce<number[]>((acc, h) => {
    acc.push((acc[acc.length - 1] ?? 0) + h);
    return acc;
  }, [0]);
  const phoneAspect = 444 / 905; // must match center phone container
  const phoneWidthPx = phoneFrameHeightPx * phoneAspect;
  // Gap under the phone so separators never pass through it.
  // Keep it tight so dividers visually reach the phone container edges.
  const separatorGapPx = Math.round(phoneWidthPx + 16);

  return (
    <div
      ref={containerRef}
      className="relative mb-0 hidden w-full lg:block"
      style={{ height: `${steps * 100}vh` }}
      aria-label="Security features stepper"
    >
      <div
        className={cn(
          'relative flex h-screen w-full items-center justify-center',
          pinState === 'pinned' && 'fixed inset-x-0 top-0',
          pinState === 'before' && 'absolute inset-x-0 top-0',
          pinState === 'after' && 'absolute inset-x-0 bottom-0'
        )}
      >
        {/* Full-width row separators (kept symmetric around the phone) */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-[640px] -translate-y-1/2">
          {Array.from({ length: steps + 1 }).map((_, i) => {
            if (i === 0) return null; // no divider above the first point
            const isActiveBoundary = i === activeIdx + 1;
            const colorClass = isActiveBoundary ? 'bg-white' : 'bg-juno-700';
            return (
              <motion.div
                key={`sep-${i}`}
                className="absolute inset-x-0"
                animate={{ top: railTopPx + (boundaryOffsetsPx[i] ?? 0) }}
                transition={{ ...TRANSITION, duration: ANIMATION.fast }}
                aria-hidden="true"
              >
                <div className="flex w-full items-center">
                  <div className={cn('h-px flex-1', colorClass)} />
                  <div style={{ width: `${separatorGapPx}px` }} />
                  <div className={cn('h-px flex-1', colorClass)} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div
          className="relative z-10 mx-auto h-[640px] w-full px-6 text-left"
          style={{ maxWidth: CONTAINER_MAX_WIDTH }}
        >
          <div className="relative z-10 grid h-full w-full max-w-[1392px] px-[14px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            {/* Left list */}
            <div className="relative h-full pr-6 xl:pr-12">
              <div
                className="absolute left-0 right-0 flex flex-col"
                style={{ top: `${railTopPx}px`, height: `${stepperRailHeightPx}px` }}
              >
                {features.map((feature, idx) => {
                  const isActive = idx === activeIdx;
                  const number = `${String(feature.id).padStart(2, '0')}.`;
                  return (
                    <motion.div
                      key={feature.id}
                      className="flex w-full flex-col items-center justify-center"
                      animate={{ height: rowHeightsPx[idx] ?? inactiveStepHeightPx }}
                      transition={{ ...TRANSITION, duration: ANIMATION.fast }}
                    >
                      <div
                        className="flex w-full items-center justify-start gap-1"
                      >
                        <span
                          className={cn(
                            'w-12 shrink-0 leading-none tracking-[0.05em] transition-all duration-500 ease-out',
                            FONT.mono,
                            isActive ? 'text-[18px] leading-[22px]' : 'text-[16px]',
                            isActive ? 'text-white' : 'text-juno-500'
                          )}
                        >
                          {number}
                        </span>
                        <span
                          className={cn(
                            'transition-all duration-500 ease-out',
                            isActive
                              ? cn('text-[34px] leading-[38px] text-white', FONT.serif)
                              : cn('text-[20px] leading-[1.25] text-juno-400', FONT.serif)
                          )}
                        >
                          {feature.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Center phone */}
            <div className="flex h-full w-[380px] items-center justify-center px-6 xl:px-8">
              <div className="relative h-full aspect-[444/905]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeFeature.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeFeature.image}
                      alt={activeFeature.label}
                      fill
                      sizes="(min-width: 1024px) 420px, 320px"
                      className="pointer-events-none object-contain"
                      quality={100}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right description (only active) */}
            <div className="relative h-full pl-6 xl:pl-12">
              <div
                className="absolute left-0 right-0 flex flex-col"
                style={{ top: `${railTopPx}px`, height: `${stepperRailHeightPx}px` }}
              >
                {features.map((feature, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <motion.div
                      key={feature.id}
                      className="flex w-full flex-col items-center justify-center"
                      animate={{ height: rowHeightsPx[idx] ?? inactiveStepHeightPx }}
                      transition={{ ...TRANSITION, duration: ANIMATION.fast }}
                    >
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ ...TRANSITION, duration: ANIMATION.fast }}
                            className="w-full max-w-[360px]"
                          >
                            <p className="text-base leading-[1.25] text-juno-300">
                              {feature.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
DesktopScrollStepper.displayName = 'DesktopScrollStepper';

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
  <div className="relative border-t border-juno-700 lg:hidden">
    {/* Content area – tablet: max-w 600px for 4 points + body text */}
    <div className="px-3 pt-16 md:px-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFeature.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ ...TRANSITION, duration: ANIMATION.fast }}
          className="flex flex-col items-center gap-4 text-center md:mx-auto md:max-w-[600px]"
        >
          <span
            className={cn(
              'w-fit text-[16px] leading-none tracking-[0.02em] text-juno-400',
              FONT.mono
            )}
            aria-hidden
          >
            {String(currentFeature.id).padStart(2, '0')}.
          </span>
          <h3 className={cn('text-[28px] leading-[32px] text-white', FONT.serif)}>
            {currentFeature.label}
          </h3>
          <p className="text-[15px] leading-normal text-[#D1D1D6]">
            {currentFeature.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>

    {/* Navigation: chevron buttons (same default/hover as dark header Log in button, mobile/tablet) */}
    <div className="mt-2 flex items-center justify-between px-3 py-6 md:px-6">
      {/* Prev: left chevron, stroke 1.5 */}
      <button
        onClick={onPrev}
        className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded border border-[#3F3F46] text-white transition-all duration-500 ease-out hover:border-[#A0A0AB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-[#18181B]"
        aria-label="Previous feature"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M15 18l-6-6 6-6" />
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

      {/* Next: right chevron, stroke 1.5 */}
      <button
        onClick={onNext}
        className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded border border-[#3F3F46] text-white transition-all duration-500 ease-out hover:border-[#A0A0AB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-[#18181B]"
        aria-label="Next feature"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>

    {/* Mobile mockup – original 320×400 when it fits, scales down on narrow screens without bottom gap */}
    <div className="flex items-end justify-center px-3 pb-0 md:px-6">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentFeature.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-[320px] max-w-full shrink-0 aspect-[4/5] leading-none"
        >
          <Image
            src={currentFeature.mobileImage}
            alt={currentFeature.label}
            fill
            sizes="(max-width: 745px) 100vw, 320px"
            className="object-contain object-center"
            priority
            unoptimized
          />
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
);
MobileCarousel.displayName = 'MobileCarousel';

export { SecuritySection };
