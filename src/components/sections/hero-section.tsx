'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { SingaporeTime } from '@/components/ui/singapore-time';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { TRANSITION, FONT, HERO_VIDEO_URL } from '@/lib/constants';

/**
 * Full-viewport hero section with dramatic fade-in animation
 * Min height 800px ensures video is always visible on small screens
 */
const HeroSection = () => {
  return (
    <motion.section
      className="flex min-h-[800px] min-h-dvh w-full flex-col bg-juno-25"
    >
      {/* Top: Headline + Singapore Time (aligned to bottom of headline) */}
      <header className="flex flex-wrap items-end justify-between gap-6 px-7 pb-9 pt-36">
        <ScrollReveal mode="slide" className="w-[696px] max-w-full">
          <h1 className={cn('text-5xl leading-none text-juno-900 md:text-6xl lg:text-[72px]', FONT.serif)}>
            Payment services,
            <br />
            Redefined.
          </h1>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...TRANSITION, delay: 0.5 }}
          className="hidden sm:block"
        >
          <SingaporeTime />
        </motion.div>
      </header>

      {/* Middle: Hero Video (min height ensures visibility on small screens) */}
      <div className="relative min-h-[320px] flex-1 overflow-hidden">
        <ScrollReveal mode="fade" className="absolute inset-0 size-full">
          <video
            className="size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
        </ScrollReveal>
      </div>

      {/* Bottom: Description + CTA */}
      <footer className="flex flex-col items-start justify-between gap-8 bg-juno-25 px-6 pb-16 pt-12 md:flex-row md:items-center">
        <ScrollReveal mode="slide" className="w-[696px] max-w-full">
          <p className="text-lg leading-normal text-juno-800 lg:text-[18px]">
            We provide a highly personalised service to corporate entities,
            institutions and high net worth individuals, including secure,
            competitive and discrete execution of cross-border payments and
            settlement services.
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...TRANSITION, delay: 0.7 }}
        >
          <GetStartedButton />
        </motion.div>
      </footer>
    </motion.section>
  );
};
HeroSection.displayName = 'HeroSection';

export { HeroSection };
