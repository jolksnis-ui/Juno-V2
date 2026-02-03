'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { FadeInView } from '@/components/ui/fade-in-view';
import { DotPattern } from '@/components/ui/dot-pattern';
import { FONT, CONTAINER_MAX_WIDTH, IMAGES } from '@/lib/constants';

const CHECK_ICON_SRC = '/images/about/icon-park-outline_check-one.svg';

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
    <section className="what-we-do-section relative bg-juno-50 px-3 py-16 md:px-6 lg:py-24">
      <DotPattern />

      <div className="relative mx-auto" style={{ maxWidth: CONTAINER_MAX_WIDTH }}>
        {/* Header with image – mobile/tablet: 40px body↔image, 40px image↔first service row */}
        <div className="mb-10 flex flex-col items-center gap-10 text-center lg:mb-16 lg:gap-12">
          {/* Text content – tablet: max-w 696px, centered */}
          <ScrollReveal mode="slide" className="max-w-[700px] md:max-w-[600px] md:mx-auto">
            <div className="flex flex-col items-center gap-5">
              <span className={cn('w-fit rounded border border-juno-200 bg-juno-100 px-1.5 py-1 text-sm text-juno-700', FONT.mono)}>
                Our services
              </span>
              <h2 className={cn('w-full text-[44px] leading-[48px] text-juno-900 lg:text-[60px] lg:!leading-[64px]', FONT.serif)}>
                What we do
              </h2>
              <p className="text-base leading-normal text-juno-700">
                Juno provides a range of payment and account services designed to
                support both individual users and corporate clients.
              </p>
            </div>
          </ScrollReveal>

          {/* Image – same scale/blue tint as Compliance & Infrastructure; mobile/tablet: 320px; desktop: 480px */}
          <FadeInView
            delay={0.2}
            className="relative h-[320px] w-full overflow-hidden rounded-md lg:h-[480px]"
          >
            <Image
              src={IMAGES.aboutServicePreview}
              alt="Modern business building, Nanjing, China"
              fill
              className="object-cover infrastructure-tab-image"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-md bg-[rgba(20,40,75,0.08)]"
              aria-hidden
            />
            {/* Balance left (dark) and right (bright): lift left, tame right */}
            <div
              className="pointer-events-none absolute inset-0 rounded-md"
              style={{
                background: 'linear-gradient(to right, rgba(255,255,255,0.1) 0%, transparent 38%, transparent 62%, rgba(0,0,0,0.14) 100%)',
              }}
              aria-hidden
            />
            {/* Harmonious center lift – soft radial so doors read a little lighter */}
            <div
              className="pointer-events-none absolute inset-0 rounded-md"
              style={{
                background: 'radial-gradient(ellipse 75% 70% at 50% 50%, rgba(255,255,255,0.09) 0%, transparent 65%)',
              }}
              aria-hidden
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
              className="flex items-center gap-6 border-b border-juno-300 py-6 lg:items-start lg:py-8"
            >
              <div className="flex shrink-0 items-center justify-center lg:mt-[10px]">
                <Image
                  src={CHECK_ICON_SRC}
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 block"
                  aria-hidden
                />
              </div>
              <span className={cn('text-2xl leading-[28px] text-juno-900 lg:text-4xl lg:leading-[40px]', FONT.serif)}>
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
