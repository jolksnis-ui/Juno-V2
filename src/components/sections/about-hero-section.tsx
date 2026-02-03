'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TRANSITION, FONT } from '@/lib/constants';

/**
 * About page hero section with badge, title, body text, and horizontal lines
 * Dark theme matching design
 */
const AboutHeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative flex w-full flex-col items-center bg-[#18181B] px-3 pt-[116px] pb-0 md:px-6 lg:min-h-[640px] lg:justify-center lg:pt-[168px]"
    >
      {/* Content */}
      <div className="flex max-w-[600px] flex-col items-center gap-6 text-center md:max-w-[600px]">
        {/* Badge - same palette as other dark-section subtitles */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION, delay: 0.05 }}
          className={cn(
            'w-fit rounded border border-juno-700 bg-white/[0.08] px-1.5 py-1 text-[13px] lg:text-sm text-juno-300',
            FONT.mono
          )}
        >
          Regulated payment platform
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION, delay: 0.1 }}
          className={cn(
            'w-full text-[46px] leading-[50px] text-white lg:text-[64px] lg:leading-[68px]',
            FONT.serif
          )}
        >
          About Juno
        </motion.h1>

        {/* Body text - two paragraphs (same size/color as Corporate hero) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION, delay: 0.3 }}
          className="flex flex-col gap-4 text-base leading-normal text-[#e4e4e7]"
        >
          <p>
            Juno is a payments platform providing secure and compliant
            financial services for individual and corporate clients. We
            operate in regulated environments and focus on reliability,
            transparency, and operational excellence across all payment flows.
          </p>
          <p>
            Our platform supports both everyday financial needs and complex
            business operations, enabling clients to manage, move, and protect
            funds with confidence.
          </p>
        </motion.div>
      </div>

      {/* Five white lines – 64px below body on mobile/tablet; at bottom on desktop */}
      <div className="mt-16 -mx-3 w-[calc(100%+1.5rem)] flex flex-col pb-0 md:-mx-6 md:w-[calc(100%+3rem)] lg:mt-auto">
        <div className="h-0.5 w-full bg-white" />
        <div className="mt-5 h-0.5 w-full bg-white" />
        <div className="mt-4 h-0.5 w-full bg-white" />
        <div className="mt-3 h-0.5 w-full bg-white" />
        <div className="mt-2 h-0.5 w-full bg-white" />
      </div>
    </motion.section>
  );
};
AboutHeroSection.displayName = 'AboutHeroSection';

export { AboutHeroSection };
