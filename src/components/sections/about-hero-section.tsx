'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TRANSITION, FONT } from '@/lib/constants';

/** Decorative line heights for bottom border effect */
const LINE_HEIGHTS = [20, 16, 12, 8, 4];

/**
 * About page hero section with centered title and decorative bottom lines
 * Dark theme matching Figma design
 */
const AboutHeroSection = () => {
  return (
    <div className="flex flex-col gap-0.5 bg-juno-900">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex min-h-[558px] w-full flex-col items-center justify-center px-6 py-24"
      >
        {/* Content */}
        <div className="flex max-w-[600px] flex-col items-center gap-6 text-center">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TRANSITION, delay: 0.1 }}
            className={cn('text-5xl leading-tight md:text-6xl lg:text-[64px] lg:leading-[72px] text-white', FONT.serif)}
          >
            About Juno
          </motion.h1>

          {/* Body text - two paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TRANSITION, delay: 0.3 }}
            className="flex flex-col gap-4 text-base leading-normal text-juno-200"
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
      </motion.section>

      {/* Decorative lines - full width */}
      <div className="flex flex-col gap-0.5">
        {LINE_HEIGHTS.map((height) => (
          <div
            key={height}
            className="w-full bg-juno-800"
            style={{ height: `${height}px` }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
};
AboutHeroSection.displayName = 'AboutHeroSection';

export { AboutHeroSection };
