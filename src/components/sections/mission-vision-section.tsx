'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/section-header';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { FadeInView } from '@/components/ui/fade-in-view';
import { DotPattern } from '@/components/ui/dot-pattern';
import { IMAGES, FONT, CONTAINER_MAX_WIDTH, TRANSITION, ANIMATION } from '@/lib/constants';

type MissionVisionTab = 'mission' | 'vision';

const MISSION_VISION_TABS: { id: MissionVisionTab; label: string }[] = [
  { id: 'mission', label: 'Mission' },
  { id: 'vision', label: 'Vision' },
];

/** Tab switcher – same styling as homepage account section (mobile/tablet only) */
const TabSwitcher = ({
  activeTab,
  onTabChange,
}: {
  activeTab: MissionVisionTab;
  onTabChange: (tab: MissionVisionTab) => void;
}) => (
  <div
    className="mx-auto flex w-full max-w-[420px] overflow-hidden rounded border border-juno-300 bg-white"
    role="tablist"
    aria-label="Mission and Vision"
  >
    {MISSION_VISION_TABS.map((tab, index) => (
      <button
        key={tab.id}
        type="button"
        role="tab"
        aria-selected={activeTab === tab.id}
        tabIndex={activeTab === tab.id ? 0 : -1}
        onClick={() => onTabChange(tab.id)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const next = MISSION_VISION_TABS[(index + 1) % 2];
            onTabChange(next.id);
          }
        }}
        className={cn(
          'flex h-[44px] flex-1 cursor-pointer items-center justify-center whitespace-nowrap px-3 text-[15px] transition-colors duration-150 sm:px-4',
          FONT.mono,
          activeTab === tab.id
            ? 'bg-juno-100 text-juno-900'
            : 'bg-white text-juno-500 hover:text-juno-900',
          index === 0 && 'border-r border-juno-300'
        )}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

/**
 * Mission & Vision section
 * Desktop: 3-column layout (Mission card, mockup, Vision card)
 * Mobile/tablet: tabs (Mission / Vision) + single frame
 */
const MissionVisionSection = () => {
  const [activeTab, setActiveTab] = useState<MissionVisionTab>('mission');

  return (
    <section className="relative bg-juno-25 px-3 py-16 md:px-6 lg:py-24">
      <DotPattern />

      <div className="relative mx-auto" style={{ maxWidth: CONTAINER_MAX_WIDTH }}>
        {/* Header */}
        <ScrollReveal mode="slide">
          <SectionHeader
            align="center"
            badge="Our purpose and direction"
            title="Mission & Vision"
            titleMaxWidth="600px"
            className="mb-8 lg:mb-16"
          />
        </ScrollReveal>

        {/* Mobile only: tabs (32px below header), then single frame (24px below tabs) */}
        <div className="mt-[32px] md:hidden">
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="mt-6">
            <AnimatePresence mode="wait">
              {activeTab === 'mission' && (
                <motion.div
                  key="mission"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: ANIMATION.medium, ease: TRANSITION.ease }}
                  className="relative flex h-[360px] flex-col items-center justify-center overflow-hidden rounded-md border border-juno-300 bg-juno-100 p-8 text-center"
                >
                  <div
                    className="pointer-events-none absolute inset-0 bg-[length:3px_3px] bg-center bg-repeat bg-[radial-gradient(circle,_rgba(24,24,27,0.07)_0.5px,_transparent_0.5px)]"
                    aria-hidden="true"
                  />
                  <div className="relative z-10 flex w-full flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <span className={cn('text-sm text-juno-400', FONT.mono)}>
                        What drives us
                      </span>
                      <h3 className={cn('text-4xl leading-[1.2] text-juno-900', FONT.serif)}>
                        Our mission
                      </h3>
                    </div>
                    <p className="text-sm leading-normal text-juno-700">
                      To provide secure, compliant, and reliable payment services for
                      individual and corporate clients operating in regulated financial
                      environments.
                    </p>
                  </div>
                </motion.div>
              )}
              {activeTab === 'vision' && (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: ANIMATION.medium, ease: TRANSITION.ease }}
                  className="relative flex h-[360px] flex-col items-center justify-center overflow-hidden rounded-md border border-juno-300 bg-juno-100 p-8 text-center"
                >
                  <div
                    className="pointer-events-none absolute inset-0 bg-[length:3px_3px] bg-center bg-repeat bg-[radial-gradient(circle,_rgba(24,24,27,0.07)_0.5px,_transparent_0.5px)]"
                    aria-hidden="true"
                  />
                  <div className="relative z-10 flex w-full flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <span className={cn('text-sm text-juno-400', FONT.mono)}>
                        Where we&apos;re heading
                      </span>
                      <h3 className={cn('text-4xl leading-[1.2] text-juno-900', FONT.serif)}>
                        Our vision
                      </h3>
                    </div>
                    <p className="text-sm leading-normal text-juno-700">
                      To build a trusted financial platform that enables secure and
                      scalable financial operations while meeting the highest regulatory
                      standards.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Tablet only: Mission and Vision side by side, same frame style as mobile, gap as desktop (gap-4) */}
        <div className="mt-[32px] hidden grid-cols-2 gap-4 md:grid lg:hidden">
          {/* Our Mission frame – same style as mobile */}
          <div className="relative flex h-[360px] flex-col items-center justify-center overflow-hidden rounded-md border border-juno-300 bg-juno-100 p-8 text-center">
            <div
              className="pointer-events-none absolute inset-0 bg-[length:3px_3px] bg-center bg-repeat bg-[radial-gradient(circle,_rgba(24,24,27,0.07)_0.5px,_transparent_0.5px)]"
              aria-hidden="true"
            />
            <div className="relative z-10 flex w-full flex-col gap-4">
              <div className="flex flex-col gap-3">
                <span className={cn('text-sm text-juno-400', FONT.mono)}>
                  What drives us
                </span>
                <h3 className={cn('text-4xl leading-[1.2] text-juno-900', FONT.serif)}>
                  Our mission
                </h3>
              </div>
              <p className="text-sm leading-normal text-juno-700">
                To provide secure, compliant, and reliable payment services for
                individual and corporate clients operating in regulated financial
                environments.
              </p>
            </div>
          </div>
          {/* Our Vision frame – same style as mobile */}
          <div className="relative flex h-[360px] flex-col items-center justify-center overflow-hidden rounded-md border border-juno-300 bg-juno-100 p-8 text-center">
            <div
              className="pointer-events-none absolute inset-0 bg-[length:3px_3px] bg-center bg-repeat bg-[radial-gradient(circle,_rgba(24,24,27,0.07)_0.5px,_transparent_0.5px)]"
              aria-hidden="true"
            />
            <div className="relative z-10 flex w-full flex-col gap-4">
              <div className="flex flex-col gap-3">
                <span className={cn('text-sm text-juno-400', FONT.mono)}>
                  Where we&apos;re heading
                </span>
                <h3 className={cn('text-4xl leading-[1.2] text-juno-900', FONT.serif)}>
                  Our vision
                </h3>
              </div>
              <p className="text-sm leading-normal text-juno-700">
                To build a trusted financial platform that enables secure and
                scalable financial operations while meeting the highest regulatory
                standards.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: 3-column grid (Mission card, mockup, Vision card) */}
        <div className="hidden items-center gap-4 lg:grid lg:grid-cols-3">
          {/* Mission card */}
          <FadeInView
            delay={0.1}
            className="flex h-[440px] flex-col items-center justify-center rounded-md border border-juno-300 bg-juno-100 p-8 text-center"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <span className={cn('text-sm text-juno-400', FONT.mono)}>
                  What drives us
                </span>
                <h3 className={cn('text-4xl leading-[1.2] text-juno-900 lg:leading-[40px]', FONT.serif)}>
                  Our mission
                </h3>
              </div>
              <p className="text-sm leading-normal text-juno-700">
                To provide secure, compliant, and reliable payment services for
                individual and corporate clients operating in regulated financial
                environments.
              </p>
            </div>
          </FadeInView>

          {/* Vision mockup (center) */}
          <FadeInView
            delay={0.2}
            className="relative h-[440px] overflow-hidden rounded-md border border-juno-300 bg-juno-100"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[length:3px_3px] bg-center bg-repeat bg-[radial-gradient(circle,_rgba(24,24,27,0.10)_0.5px,_transparent_0.5px)]"
              aria-hidden="true"
            />
            <Image
              src={IMAGES.missionVisionMock}
              alt="Mission and vision interface mockup"
              width={640}
              height={640}
              className="relative h-full w-full object-cover"
              priority
            />
          </FadeInView>

          {/* Vision card */}
          <FadeInView
            delay={0.3}
            className="flex h-[440px] flex-col items-center justify-center rounded-md border border-juno-300 bg-juno-100 p-8 text-center"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <span className={cn('text-sm text-juno-400', FONT.mono)}>
                  Where we&apos;re heading
                </span>
                <h3 className={cn('text-4xl leading-[1.2] text-juno-900 lg:leading-[40px]', FONT.serif)}>
                  Our vision
                </h3>
              </div>
              <p className="text-sm leading-normal text-juno-700">
                To build a trusted financial platform that enables secure and
                scalable financial operations while meeting the highest regulatory
                standards.
              </p>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
};
MissionVisionSection.displayName = 'MissionVisionSection';

export { MissionVisionSection };
