'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { FadeInView } from '@/components/ui/fade-in-view';
import { DotPattern } from '@/components/ui/dot-pattern';
import { CheckCircleIcon } from '@/components/ui/icons';
import { FONT, CONTAINER_MAX_WIDTH, IMAGES } from '@/lib/constants';

/** Services list data */
const SERVICES = [
  'Personal & corporate accounts',
  'Domestic & cross-border payments',
  'Multi-currency management',
  'Secure fund transfers',
];

/**
 * What We Do section with header + image layout and services list
 * Light background with subtle dot pattern
 */
const WhatWeDoSection = () => {
  return (
    <section className="relative bg-juno-50 px-6 py-24">
      <DotPattern />

      <div className="relative mx-auto" style={{ maxWidth: CONTAINER_MAX_WIDTH }}>
        {/* Header with image */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          {/* Left: Text content */}
          <ScrollReveal mode="slide" className="max-w-[600px]">
            <div className="flex flex-col gap-5">
              <span className={cn('w-fit rounded border border-juno-200 bg-juno-100 px-1.5 py-1 text-sm text-juno-700', FONT.mono)}>
                Our services
              </span>
              <h2 className={cn('text-[56px] leading-[1.14] text-juno-900', FONT.serif)}>
                What we do
              </h2>
              <p className="text-base leading-normal text-juno-700">
                Juno provides a range of payment and account services designed to
                support both individual users and corporate clients.
              </p>
            </div>
          </ScrollReveal>

          {/* Right: Image */}
          <FadeInView
            delay={0.2}
            className="relative h-[172px] w-[240px] overflow-hidden rounded-md"
          >
            <Image
              src={IMAGES.aboutServicePreview}
              alt="Modern office environment"
              fill
              className="object-cover"
            />
          </FadeInView>
        </div>

        {/* Services list */}
        <div className="border-t border-juno-300">
          {SERVICES.map((service, index) => (
            <FadeInView
              key={service}
              direction="left"
              delay={0.1 * index}
              className="flex items-center gap-6 border-b border-juno-300 py-8"
            >
              <div className="flex items-center pt-1">
                <CheckCircleIcon color="var(--juno-gray-900)" />
              </div>
              <span className={cn('text-4xl leading-[1.2] text-juno-900', FONT.serif)}>
                {service}
              </span>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
};
WhatWeDoSection.displayName = 'WhatWeDoSection';

export { WhatWeDoSection };
