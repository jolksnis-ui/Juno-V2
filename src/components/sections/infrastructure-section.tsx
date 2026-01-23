'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';
import { SectionHeader } from '@/components/ui/section-header';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { TRANSITION, ANIMATION } from '@/lib/constants';

/** Tab content data */
const TABS = {
  compliance: {
    image: '/images/about/office-interior.jpg',
    features: [
      { number: '01.', title: 'KYC and client verification' },
      { number: '02.', title: 'AML and transaction monitoring' },
      { number: '03.', title: 'Risk-based compliance controls' },
      { number: '04.', title: 'Ongoing regulatory oversight' },
      { number: '05.', title: 'Compliance across individual and corporate services' },
    ],
  },
  infrastructure: {
    image: '/images/about/office-interior.jpg',
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
    <section className="relative bg-[#18181B] px-6 pb-28 pt-24">
      {/* Dot pattern background */}
      <DotPattern className="absolute inset-0" />

      <div className="relative mx-auto max-w-[1392px]">
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
            className="mb-9"
          />
        </ScrollReveal>

        {/* Tab switcher */}
        <div className="mb-16 flex justify-center">
          <div className="inline-flex overflow-hidden rounded border border-[#3F3F46] bg-white/[0.02]">
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

        {/* Content */}
        <div className="flex flex-col gap-12">
          {/* Hero image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: ANIMATION.fast }}
              className="relative aspect-[1392/440] w-full overflow-hidden rounded-md border border-[#3F3F46]"
            >
              <Image
                src={currentTab.image}
                alt="Modern office interior"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Features grid */}
          <div className="grid grid-cols-1 gap-0 md:grid-cols-5">
            {currentTab.features.map((feature, index) => (
              <motion.div
                key={`${activeTab}-${feature.number}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...TRANSITION, delay: 0.05 * index }}
                className="flex flex-col justify-between border-l border-[#3F3F46] px-6 py-6"
              >
                <h3 className="mb-24 font-[family-name:var(--font-fraunces)] text-2xl leading-8 text-white">
                  {feature.title}
                </h3>
                <span className="font-[family-name:var(--font-geist-mono)] text-5xl text-[#51525C]">
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

/** Tab button component */
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
      'w-[172px] px-4 py-3 font-[family-name:var(--font-geist-mono)] text-sm transition-colors',
      isActive
        ? 'bg-[#26272B] text-white'
        : 'text-[#A0A0AB] hover:text-white'
    )}
    aria-pressed={isActive}
  >
    {label}
  </button>
);
