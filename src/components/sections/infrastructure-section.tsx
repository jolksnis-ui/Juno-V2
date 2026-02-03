'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';
import { SectionHeader } from '@/components/ui/section-header';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { TRANSITION, ANIMATION, FONT, CONTAINER_MAX_WIDTH } from '@/lib/constants';

/** Tab content data – images from about folder: Entrance Hall Interior Space, Street Cloud Day */
const TABS = {
  compliance: {
    image: '/images/about/modern-lounge-room-interior-office-building.jpg',
    features: [
      { number: '01.', title: 'KYC and client verification' },
      { number: '02.', title: 'AML and transaction monitoring' },
      { number: '03.', title: 'Risk-based compliance controls' },
      { number: '04.', title: 'Ongoing regulatory oversight' },
      { number: '05.', title: 'Compliance across individual and corporate services' },
    ],
  },
  infrastructure: {
    image: '/images/about/modern-architectural-entrance-with-glass-facade-urban-landscape.jpg',
    features: [
      { number: '01.', title: 'Bank-grade hosting and security' },
      { number: '02.', title: 'Redundant systems architecture' },
      { number: '03.', title: '99.99% uptime guarantee' },
      { number: '04.', title: 'Real-time monitoring' },
      { number: '05.', title: 'Disaster recovery protocols' },
    ],
  },
};

type TabKey = keyof typeof TABS;

/**
 * Trust, Security & Infrastructure section
 * Dark theme with tab switcher, hero image, and 5-column feature grid
 */
const InfrastructureSection = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('compliance');
  const currentTab = TABS[activeTab];

  return (
    <section className="infrastructure-section relative bg-juno-900 px-3 py-16 md:px-6 lg:pb-28 lg:pt-24">
      {/* Dot pattern background */}
      <DotPattern className="absolute inset-0" />

      <div className="relative mx-auto" style={{ maxWidth: CONTAINER_MAX_WIDTH }}>
        {/* Header */}
        <ScrollReveal mode="slide">
          <SectionHeader
            align="center"
            theme="dark"
            badge="How we ensure trust"
            title={
              <>
                Trust, security &<br />
                infrastructure
              </>
            }
            subtitle="Juno is built on secure, compliant, and resilient foundations to support regulated financial operations."
            titleMaxWidth="600px"
          />
        </ScrollReveal>

        {/* Tab switcher – same params as Mission & Vision: 32px below header, 24px above image (mobile/tablet); keep dark colors */}
        <div className="mt-[32px] mb-6 flex justify-center lg:mt-9 lg:mb-[64px]">
          <div className="mx-auto flex w-full max-w-[420px] overflow-hidden rounded border border-juno-700 bg-white/[0.02]">
            <TabButton
              label="Compliance"
              isActive={activeTab === 'compliance'}
              onClick={() => setActiveTab('compliance')}
            />
            <TabButton
              label="Infrastructure"
              isActive={activeTab === 'infrastructure'}
              onClick={() => setActiveTab('infrastructure')}
            />
          </div>
        </div>

        {/* Content – mobile/tablet: 40px between image frame and numbered list (01…) */}
        <div className="flex flex-col gap-10 lg:gap-12">
          {/* Hero image – unified filter so Compliance and Infrastructure match in color, contrast and clarity */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: ANIMATION.fast }}
              className="relative h-[320px] w-full overflow-hidden rounded-md border border-juno-700 lg:h-[480px]"
            >
              <Image
                src={currentTab.image}
                alt={activeTab === 'compliance' ? 'Modern lounge office building' : 'Modern architectural entrance with glass facade, urban landscape'}
                fill
                className={cn(
                  'object-cover infrastructure-tab-image',
                  activeTab === 'compliance' && 'compliance-tab-image'
                )}
                priority
              />
              {/* Very subtle blue tint – single layer, no gradient to avoid banding */}
              <div
                className="pointer-events-none absolute inset-0 rounded-md bg-[rgba(20,40,75,0.08)]"
                aria-hidden
              />
              {/* Compliance only: balance window (top) and floor (bottom) – darken top, lift bottom */}
              {activeTab === 'compliance' && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-md"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.08) 100%)',
                  }}
                  aria-hidden
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Features grid */}
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-5">
            {currentTab.features.map((feature, index) => (
              <motion.div
                key={`${activeTab}-${feature.number}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...TRANSITION, delay: 0.05 * index }}
                className="flex flex-col-reverse items-center justify-center border-b border-juno-700 px-4 py-7 text-center lg:flex-col lg:items-start lg:justify-between lg:border-b-0 lg:border-l lg:px-6 lg:py-6 lg:text-left"
              >
                <h3 className={cn('mt-8 w-full text-2xl leading-[28px] text-white lg:mb-24 lg:mt-0 lg:w-auto lg:leading-[28px]', FONT.serif)}>
                  {feature.title}
                </h3>
                <span className={cn('block w-full text-center text-5xl text-juno-600 lg:w-auto lg:text-left', FONT.mono)}>
                  {feature.number}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
InfrastructureSection.displayName = 'InfrastructureSection';

export { InfrastructureSection };

/** Tab button – desktop: same structure as home page (Personal/Business) tabs (height, font size); colors unchanged */
const TabButton = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex h-[44px] flex-1 cursor-pointer items-center justify-center whitespace-nowrap px-3 text-[15px] transition-colors duration-150 sm:px-4 lg:h-auto lg:py-3 lg:text-base',
      FONT.mono,
      isActive
        ? 'bg-juno-800 text-white'
        : 'text-juno-400 hover:text-white',
      'border-r border-juno-700 last:border-r-0'
    )}
    aria-pressed={isActive}
  >
    {label}
  </button>
);
