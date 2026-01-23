'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/section-header';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { FadeInView } from '@/components/ui/fade-in-view';
import { DotPattern } from '@/components/ui/dot-pattern';
import { IMAGES, FONT, CONTAINER_MAX_WIDTH } from '@/lib/constants';

/**
 * Mission & Vision section with 3-column layout
 * Left: Mission card, Center: Phone mockup, Right: Vision card
 */
const MissionVisionSection = () => {
  return (
    <section className="relative bg-juno-25 px-6 py-24">
      <DotPattern />

      <div className="relative mx-auto" style={{ maxWidth: CONTAINER_MAX_WIDTH }}>
        {/* Header */}
        <ScrollReveal mode="slide">
          <SectionHeader
            align="center"
            badge="Our purpose and direction"
            title="Mission & Vision"
            titleMaxWidth="600px"
            className="mb-16"
          />
        </ScrollReveal>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Mission card */}
          <FadeInView
            delay={0.1}
            className="flex h-[441px] flex-col items-center justify-center rounded-md border border-juno-300 bg-juno-100 p-8 text-center"
          >
            <div className="flex flex-col gap-4">
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
          </FadeInView>

          {/* Vision mockup (center) */}
          <FadeInView
            delay={0.2}
            className="relative h-[441px] overflow-hidden rounded-md border border-juno-300"
          >
            <Image
              src={IMAGES.visionMockup}
              alt="Juno platform interface preview"
              fill
              className="object-cover opacity-[0.02]"
            />
          </FadeInView>

          {/* Vision card */}
          <FadeInView
            delay={0.3}
            className="flex h-[441px] flex-col items-center justify-center rounded-md border border-juno-300 bg-juno-100 p-8 text-center"
          >
            <div className="flex flex-col gap-4">
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
          </FadeInView>
        </div>
      </div>
    </section>
  );
};
MissionVisionSection.displayName = 'MissionVisionSection';

export { MissionVisionSection };
