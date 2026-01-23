'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/section-header';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ANIMATION, TRANSITION, IMAGES, FONT } from '@/lib/constants';

/** Security feature data structure */
interface SecurityFeature {
  id: number;
  label: string;
  title: string;
  description: string;
}

/** Security feature data for each section */
const SECURITY_FEATURES: SecurityFeature[] = [
  {
    id: 1,
    label: 'Account Protection',
    title: 'Earn interest on your Bitcoin, paid every day',
    description:
      'Multi-layer security, real-time monitoring, and account-level controls safeguard user funds and access at all times.',
  },
  {
    id: 2,
    label: 'Compliance & KYC',
    title: 'Streamlined verification for faster onboarding',
    description:
      'Automated identity verification, regulatory reporting, and built-in compliance workflows keep your business audit-ready.',
  },
  {
    id: 3,
    label: 'Secure payments at scale',
    title: 'Move money globally with confidence',
    description:
      'Enterprise-grade encryption and fraud detection enable millions of transactions without compromising security.',
  },
  {
    id: 4,
    label: 'Trusted infrastructure',
    title: 'Enterprise-grade reliability you can count on',
    description:
      'Bank-grade hosting, redundant systems, and 99.99% uptime ensure your operations never skip a beat.',
  },
];

/** Row heights for active/inactive states */
const ROW_HEIGHT = {
  active: 210,
  inactive: 100,
} as const;

/**
 * Security section with hover-based animations
 * Full-width rows with phone mockup absolutely centered on top
 */
const SecuritySection = () => {
  const [activeFeature, setActiveFeature] = useState(1);

  return (
    <section className="relative bg-juno-900 py-[100px]">
      {/* Header */}
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

      {/* Content area */}
      <div className="relative mx-auto mt-16 h-[640px] w-full max-w-[1440px]">
        {/* Feature rows - offset from top to give phone overlap room */}
        <div
          className="absolute left-0 top-[65px] flex w-full flex-col"
          role="tablist"
          aria-label="Security features"
        >
          {SECURITY_FEATURES.map((feature) => (
            <FeatureRow
              key={feature.id}
              feature={feature}
              isActive={activeFeature === feature.id}
              onHover={() => setActiveFeature(feature.id)}
            />
          ))}
        </div>

        {/* Phone mockup - responsive sizing between lg (1024px) and xl (1280px) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="lg:w-[260px] xl:w-[320px]">
            <Image
              src={IMAGES.mobileMockup}
              alt="Juno app dashboard showing account balance"
              width={320}
              height={640}
              className="pointer-events-none h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
SecuritySection.displayName = 'SecuritySection';

/** Full-width feature row with left title and right description */
const FeatureRow = ({
  feature,
  isActive,
  onHover,
}: {
  feature: SecurityFeature;
  isActive: boolean;
  onHover: () => void;
}) => (
  <motion.div
    role="tab"
    tabIndex={0}
    aria-selected={isActive}
    onMouseEnter={onHover}
    onFocus={onHover}
    animate={{ height: isActive ? ROW_HEIGHT.active : ROW_HEIGHT.inactive }}
    transition={{ ...TRANSITION, duration: ANIMATION.medium }}
    className={cn(
      'flex w-full cursor-pointer items-center justify-between overflow-hidden border-b px-16',
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
);

export { SecuritySection };
