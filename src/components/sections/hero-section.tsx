'use client';

import { motion } from 'framer-motion';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { SingaporeTime } from '@/components/ui/singapore-time';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ANIMATION, TRANSITION } from '@/lib/constants';

/** Hero video URL - city skyline from Pexels */
const HERO_VIDEO_URL =
  'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4';

/**
 * Full-viewport hero section with dramatic fade-in animation
 * Min height 800px ensures video is always visible on small screens
 */
const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="flex min-h-[800px] min-h-dvh w-full flex-col bg-[#fcfcfc]"
    >
      {/* Top: Headline + Singapore Time (aligned to bottom of headline) */}
      <header className="flex flex-wrap items-end justify-between gap-6 px-7 pb-9 pt-36">
        <ScrollReveal mode="slide" className="w-[696px] max-w-full">
          <h1 className="font-[family-name:var(--font-fraunces)] text-5xl leading-none text-[#18181B] md:text-6xl lg:text-[72px]">
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
      <footer className="flex flex-col items-start justify-between gap-8 bg-[#fcfcfc] px-6 pb-16 pt-12 md:flex-row md:items-center">
        <ScrollReveal mode="slide" className="w-[696px] max-w-full">
          <p className="text-lg leading-normal text-[#26272B] lg:text-[18px]">
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
