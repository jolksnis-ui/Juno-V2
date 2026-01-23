'use client';

import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';
import { ValueCard } from '@/components/ui/value-card';
import { FadeInView } from '@/components/ui/fade-in-view';
import { ShieldIcon, ScaleIcon, GearIcon, EyeIcon, UsersIcon } from '@/components/ui/icons';
import { FONT, CONTAINER_MAX_WIDTH } from '@/lib/constants';

/**
 * Values section with dark theme and 2-row grid of value cards
 * Left side has section header, right side has 2x3 grid (5 cards)
 */
const ValuesSection = () => {
  /** Values data with icons */
  const values = [
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

  return (
    <section className="relative bg-juno-900 px-6 py-24">
      {/* Dot pattern background */}
      <DotPattern className="absolute inset-0" />

      <div className="relative mx-auto" style={{ maxWidth: CONTAINER_MAX_WIDTH }}>
        <div className="flex flex-col gap-4">
          {/* First row: Header + 2 cards */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Header card (left) */}
            <FadeInView className="flex h-80 flex-col justify-center gap-6 rounded-md p-6">
              <span className={cn('w-fit rounded border border-juno-700 bg-white/[0.08] px-1.5 py-1 text-sm text-juno-300', FONT.mono)}>
                How we operate
              </span>
              <h2 className={cn('text-[56px] leading-[1.14] text-white', FONT.serif)}>
                Our values
              </h2>
              <p className="text-base leading-normal text-juno-200">
                Our values guide how we build and operate secure, compliant
                financial services.
              </p>
            </FadeInView>

            {/* First 2 value cards */}
            {values.slice(0, 2).map((value, index) => (
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
            {values.slice(2).map((value, index) => (
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
