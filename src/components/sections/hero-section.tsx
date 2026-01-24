'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { SingaporeTime } from '@/components/ui/singapore-time';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { TRANSITION, FONT, HERO_VIDEO_URL, BUTTON_TEXT } from '@/lib/constants';

/**
 * Full-viewport hero section with dramatic fade-in animation
 * Mobile: centered layout with time below headline
 * Desktop: left-aligned with time on the right
 */
const HeroSection = () => {
  return (
    <motion.section className="flex min-h-dvh w-full flex-col bg-juno-25 md:min-h-[800px]">
      {/* Top: Headline + Singapore Time */}
      <header className="flex flex-col items-center gap-2 px-4 pb-6 pt-24 text-center md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-6 md:px-7 md:pb-9 md:pt-36 md:text-left">
        <ScrollReveal mode="slide" className="w-[696px] max-w-full">
          <h1
            className={cn(
              'text-5xl leading-none text-juno-900 md:text-6xl lg:text-[72px]',
              FONT.serif
            )}
          >
            Payment services,
            <br />
            Redefined.
          </h1>
        </ScrollReveal>

        {/* Time: below headline on mobile, right side on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...TRANSITION, delay: 0.5 }}
        >
          <SingaporeTime />
        </motion.div>
      </header>

      {/* Middle: Hero Video */}
      <div className="relative min-h-[200px] flex-1 overflow-hidden md:min-h-[320px]">
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
      <footer className="flex flex-col items-center gap-6 bg-juno-25 px-4 pb-12 pt-8 text-center md:flex-row md:items-center md:justify-between md:gap-8 md:px-6 md:pb-16 md:pt-12 md:text-left">
        <ScrollReveal mode="slide" className="w-[696px] max-w-full">
          <p className="text-base leading-normal text-juno-800 md:text-lg">
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
          className="w-full md:w-auto"
        >
          <GetStartedButton
            label={BUTTON_TEXT.openAccount}
            className="w-full md:w-auto"
          />
        </motion.div>
      </footer>
    </motion.section>
  );
};
HeroSection.displayName = 'HeroSection';

export { HeroSection };
