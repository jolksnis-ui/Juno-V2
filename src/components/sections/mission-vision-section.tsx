'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { TRANSITION, IMAGES } from '@/lib/constants';

/**
 * Mission & Vision section with 3-column layout
 * Left: Mission card, Center: Phone mockup, Right: Vision card
 */
const MissionVisionSection = () => {
  return (
    <section className="relative bg-[#FCFCFC] px-6 py-24">
      {/* Dot pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, #18181B 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1392px]">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...TRANSITION, delay: 0.1 }}
            className="flex h-[441px] flex-col items-center justify-center rounded-md border border-[#D1D1D6] bg-[#F4F4F5] p-8 text-center"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <span className="font-[family-name:var(--font-geist-mono)] text-sm text-[#A0A0AB]">
                  What drives us
                </span>
                <h3 className="font-[family-name:var(--font-fraunces)] text-4xl leading-[1.2] text-[#18181B]">
                  Our mission
                </h3>
              </div>
              <p className="text-sm leading-normal text-[#3F3F46]">
                To provide secure, compliant, and reliable payment services for
                individual and corporate clients operating in regulated financial
                environments.
              </p>
            </div>
          </motion.div>

          {/* Phone mockup (center) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...TRANSITION, delay: 0.2 }}
            className="relative flex h-[480px] items-center justify-center overflow-hidden rounded-md border border-[#D1D1D6] bg-[#F4F4F5]"
          >
            {/* Dot pattern background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle, #A0A0AB 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 w-[280px]">
              <Image
                src={IMAGES.mobileMockup}
                alt="Juno mobile app showing account dashboard"
                width={280}
                height={560}
                className="h-auto w-full"
              />
            </div>
          </motion.div>

          {/* Vision card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...TRANSITION, delay: 0.3 }}
            className="flex h-[441px] flex-col items-center justify-center rounded-md border border-[#D1D1D6] bg-[#F4F4F5] p-8 text-center"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <span className="font-[family-name:var(--font-geist-mono)] text-sm text-[#A0A0AB]">
                  Where we&apos;re heading
                </span>
                <h3 className="font-[family-name:var(--font-fraunces)] text-4xl leading-[1.2] text-[#18181B]">
                  Our vision
                </h3>
              </div>
              <p className="text-sm leading-normal text-[#3F3F46]">
                To build a trusted financial platform that enables secure and
                scalable financial operations while meeting the highest regulatory
                standards.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
MissionVisionSection.displayName = 'MissionVisionSection';

export { MissionVisionSection };
