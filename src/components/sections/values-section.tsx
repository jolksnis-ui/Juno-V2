'use client';

import { motion } from 'framer-motion';
import { DotPattern } from '@/components/ui/dot-pattern';
import { ValueCard } from '@/components/ui/value-card';
import { TRANSITION } from '@/lib/constants';

/** Shield icon for Security */
const ShieldIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/** Scale icon for Regulatory */
const ScaleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v18" />
    <path d="M5 6l7-3 7 3" />
    <path d="M5 6v6c0 1.1.9 2 2 2h2" />
    <path d="M19 6v6c0 1.1-.9 2-2 2h-2" />
  </svg>
);

/** Gear icon for Operations */
const GearIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

/** Eye icon for Transparency */
const EyeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/** Users icon for Client Focus */
const UsersIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/** Values data with icons */
const VALUES = [
  {
    number: '01.',
    title: 'Security by default',
    description:
      'Security is embedded across our infrastructure, systems, and processes — not added as an afterthought.',
    icon: <ShieldIcon />,
  },
  {
    number: '02.',
    title: 'Regulatory integrity',
    description:
      'We operate in regulated environments and apply strict compliance, AML, and KYC standards across the platform.',
    icon: <ScaleIcon />,
  },
  {
    number: '03.',
    title: 'Operational excellence',
    description:
      'Our systems are designed for reliability, scalability, and consistent performance across individual and corporate use cases.',
    icon: <GearIcon />,
  },
  {
    number: '04.',
    title: 'Transparency',
    description:
      'We prioritise clear processes, straightforward communication, and transparent pricing across all services.',
    icon: <EyeIcon />,
  },
  {
    number: '05.',
    title: 'Client focus',
    description:
      'We build solutions around real client needs, offering tailored services for both private and corporate clients.',
    icon: <UsersIcon />,
  },
];

/**
 * Values section with dark theme and 2-row grid of value cards
 * Left side has section header, right side has 2x3 grid (5 cards)
 */
const ValuesSection = () => {
  return (
    <section className="relative bg-[#18181B] px-6 py-24">
      {/* Dot pattern background */}
      <DotPattern className="absolute inset-0" />

      <div className="relative mx-auto max-w-[1392px]">
        <div className="flex flex-col gap-4">
          {/* First row: Header + 2 cards */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Header card (left) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={TRANSITION}
              className="flex h-80 flex-col justify-center gap-6 rounded-md p-6"
            >
              <span className="w-fit rounded border border-[#3F3F46] bg-white/[0.08] px-1.5 py-1 font-[family-name:var(--font-geist-mono)] text-sm text-[#D1D1D6]">
                How we operate
              </span>
              <h2 className="font-[family-name:var(--font-fraunces)] text-[56px] leading-[1.14] text-white">
                Our values
              </h2>
              <p className="text-base leading-normal text-[#E4E4E7]">
                Our values guide how we build and operate secure, compliant
                financial services.
              </p>
            </motion.div>

            {/* First 2 value cards */}
            {VALUES.slice(0, 2).map((value, index) => (
              <ValueCard
                key={value.number}
                number={value.number}
                icon={value.icon}
                title={value.title}
                description={value.description}
                delay={0.1 * (index + 1)}
              />
            ))}
          </div>

          {/* Second row: 3 cards */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {VALUES.slice(2).map((value, index) => (
              <ValueCard
                key={value.number}
                number={value.number}
                icon={value.icon}
                title={value.title}
                description={value.description}
                delay={0.1 * (index + 3)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
ValuesSection.displayName = 'ValuesSection';

export { ValuesSection };
