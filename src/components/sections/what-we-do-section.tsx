'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { TRANSITION } from '@/lib/constants';

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
    <section className="relative bg-[#FAFAFA] px-6 py-24">
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
        {/* Header with image */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          {/* Left: Text content */}
          <ScrollReveal mode="slide" className="max-w-[600px]">
            <div className="flex flex-col gap-5">
              <span className="w-fit rounded border border-[#E4E4E7] bg-[#F4F4F5] px-1.5 py-1 font-[family-name:var(--font-geist-mono)] text-sm text-[#3F3F46]">
                Our services
              </span>
              <h2 className="font-[family-name:var(--font-fraunces)] text-[56px] leading-[1.14] text-[#18181B]">
                What we do
              </h2>
              <p className="text-base leading-normal text-[#3F3F46]">
                Juno provides a range of payment and account services designed to
                support both individual users and corporate clients.
              </p>
            </div>
          </ScrollReveal>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...TRANSITION, delay: 0.2 }}
            className="relative h-[172px] w-[240px] overflow-hidden rounded-md"
          >
            <Image
              src="/images/about/service-preview.jpg"
              alt="Modern office environment"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Services list */}
        <div className="border-t border-[#D1D1D6]">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...TRANSITION, delay: 0.1 * index }}
              className="flex items-center gap-6 border-b border-[#D1D1D6] py-8"
            >
              <div className="flex items-center pt-1">
                <CheckCircleIcon />
              </div>
              <span className="font-[family-name:var(--font-fraunces)] text-4xl leading-[1.2] text-[#18181B]">
                {service}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
WhatWeDoSection.displayName = 'WhatWeDoSection';

export { WhatWeDoSection };

/** Check circle icon */
const CheckCircleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#18181B"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
