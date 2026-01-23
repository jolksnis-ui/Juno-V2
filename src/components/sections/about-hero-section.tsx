'use client';

import { motion } from 'framer-motion';
import { DotPattern } from '@/components/ui/dot-pattern';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { TRANSITION } from '@/lib/constants';

/**
 * About page hero section (50% viewport height)
 * Dark theme with centered title and dot pattern background
 */
const AboutHeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative flex min-h-[50vh] w-full flex-col items-center justify-center bg-[#18181B] px-6 py-24"
    >
      {/* Dot pattern background */}
      <DotPattern className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 flex max-w-[600px] flex-col items-center gap-6 text-center">
        {/* Badge */}
        <ScrollReveal mode="slide">
          <span className="w-fit rounded border border-[#3F3F46] bg-white/[0.08] px-1.5 py-1 font-[family-name:var(--font-geist-mono)] text-sm text-[#D1D1D6]">
            About Juno
          </span>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal mode="slide">
          <h1 className="font-[family-name:var(--font-fraunces)] text-5xl leading-[1.13] text-white md:text-[60px]">
            Building trust in
            <br />
            regulated finance
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION, delay: 0.3 }}
          className="text-lg leading-normal text-[#E4E4E7]"
        >
          We provide secure, compliant, and reliable payment services for
          individual and corporate clients operating in regulated financial
          environments.
        </motion.p>
      </div>
    </motion.section>
  );
};
AboutHeroSection.displayName = 'AboutHeroSection';

export { AboutHeroSection };
