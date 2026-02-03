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
    <section className="relative bg-juno-900 px-3 py-16 md:px-6 lg:px-6 lg:py-24">
      {/* Dot pattern background */}
      <DotPattern className="absolute inset-0" />

      <div className="relative mx-auto" style={{ maxWidth: CONTAINER_MAX_WIDTH }}>
        {/* Mobile: 1 col stack. Tablet (md): 2 cols – row1 header, row2 cards 1–2, row3 cards 3–4, row4 card 5 centered. Desktop (lg): 3 cols as before */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-4">
          {/* Header card – subtitle, title, body max-w 600px (mobile/tablet); full width on tablet row (col-span-2); 32px back-up below text; title↔body 24px (gap-6) */}
          <FadeInView className="mx-auto mb-8 flex min-h-0 w-full max-w-[600px] flex-col items-center justify-center gap-6 rounded-md p-0 text-center md:col-span-2 lg:col-span-1 lg:mb-0 lg:max-w-none lg:h-80 lg:p-6">
            <span className={cn('w-fit rounded border border-juno-700 bg-white/[0.08] px-1.5 py-1 text-sm text-juno-300', FONT.mono)}>
              How we operate
            </span>
            <h2 className={cn('w-full text-[44px] leading-[48px] text-white lg:text-[60px] lg:!leading-[64px]', FONT.serif)}>
              Our values
            </h2>
            <p className="text-base leading-normal text-juno-200">
              Our values guide how we build and operate secure, compliant
              financial services.
            </p>
          </FadeInView>

          {/* Cards 01, 02 – row 2 on tablet */}
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

          {/* Cards 03, 04 – row 3 on tablet */}
          {values.slice(2, 4).map((value, index) => (
            <ValueCard
              key={value.number}
              number={value.number}
              icon={value.icon}
              title={value.title}
              description={value.description}
              delay={0.1 * (index + 3)}
            />
          ))}

          {/* Card 05 – row 4 on tablet (centered); desktop: row 2 col 3, same as 03 and 04 */}
          <div className="md:col-span-2 md:flex md:justify-center lg:col-span-1 lg:block">
            <ValueCard
              key={values[4].number}
              number={values[4].number}
              icon={values[4].icon}
              title={values[4].title}
              description={values[4].description}
              delay={0.5}
              className="md:w-[calc((100%-1rem)/2)] lg:w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
ValuesSection.displayName = 'ValuesSection';

export { ValuesSection };
