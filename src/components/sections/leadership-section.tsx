'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/section-header';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { FaqAccordion } from '@/components/ui/faq-accordion';
import { FadeInView } from '@/components/ui/fade-in-view';
import { DotPattern } from '@/components/ui/dot-pattern';
import { FONT, CONTAINER_MAX_WIDTH } from '@/lib/constants';

/** Leadership team data */
const LEADERS = [
  {
    name: 'Martin Klein',
    role: 'Head of Compliance & Risk',
    description:
      'Leads regulatory compliance, risk management frameworks, and ongoing oversight across all platform operations.',
    image: '/images/about/leader-compliance.jpg',
    size: 'small' as const,
  },
  {
    name: 'Alexander Weber',
    role: 'Chief Executive Officer',
    description:
      "Oversees Juno's strategic direction, business development, and long-term growth within regulated financial environments.",
    image: '/images/about/leader-ceo.jpg',
    size: 'large' as const,
  },
  {
    name: 'Sophia Grace',
    role: 'Chief Operating Officer',
    description:
      'Responsible for operational execution, internal controls, and scalable service delivery across individual and corporate clients.',
    image: '/images/about/leader-coo.jpg',
    size: 'small' as const,
  },
];

/** FAQ data */
const FAQS = [
  {
    question: 'Is Juno a regulated financial institution?',
    answer:
      'Juno operates within regulated financial environments and applies strict compliance, AML, and KYC standards across its services.',
  },
  {
    question: "Who can use Juno's services?",
    answer:
      'Our services are available to both individual users and corporate clients who meet our compliance and verification requirements.',
  },
  {
    question: 'How does Juno ensure security and compliance?',
    answer:
      'We implement bank-grade security measures, including encryption, multi-factor authentication, and continuous monitoring, alongside comprehensive compliance frameworks.',
  },
  {
    question: 'Does Juno support corporate and cross-border payments?',
    answer:
      'Yes, Juno provides full support for corporate accounts and cross-border payment services with competitive rates and fast settlement times.',
  },
  {
    question: 'Where does Juno operate?',
    answer:
      'Juno operates in regulated jurisdictions and serves clients internationally, subject to applicable regulatory requirements.',
  },
];

/**
 * Leadership section with team cards and FAQ accordion
 * Light background with two distinct parts
 */
const LeadershipSection = () => {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const handleToggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <section className="relative bg-juno-50 px-3 py-16 md:px-6 lg:py-24">
      <DotPattern />

      <div className="relative mx-auto" style={{ maxWidth: CONTAINER_MAX_WIDTH }}>
        {/* Part 1: Leadership Team – 48px above divider on mobile/tablet */}
        <div className="mb-12 lg:mb-24">
          {/* Header */}
          <ScrollReveal mode="slide">
            <SectionHeader
              align="center"
              badge="Leadership"
              title={
                <>
                  Experienced leadership
                  <br />
                  in regulated finance
                </>
              }
              subtitle="Juno is led by experienced professionals with deep expertise in regulated financial services and operational risk."
              titleMaxWidth="600px"
              className="mb-10 lg:mb-16"
            />
          </ScrollReveal>

          {/* Leadership cards – mobile: stacked; tablet: grid 3 cols equal height; desktop: flex row, original gap and card heights */}
          <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:grid-rows-1 md:items-stretch md:gap-4 lg:flex lg:flex-row lg:justify-center lg:gap-6 lg:items-center">
            {LEADERS.map((leader, index) => (
              <LeaderCard
                key={leader.name}
                {...leader}
                delay={0.1 * index}
              />
            ))}
          </div>
        </div>

        {/* Divider – 48px above FAQ subtitle on mobile/tablet */}
        <div className="mb-12 h-px w-full bg-juno-300 lg:mb-24" />

        {/* Part 2: FAQ */}
        <div>
          {/* Header */}
          <ScrollReveal mode="slide">
            <SectionHeader
              align="center"
              badge="Frequently asked questions"
              title="Answers to common questions"
              subtitle="Below you'll find answers to common questions about how Juno operates."
              titleMaxWidth="600px"
              className="mb-10 lg:mb-16"
            />
          </ScrollReveal>

          {/* FAQ accordion list – mobile/tablet: 40px gap from header to first Q&A */}
          <div className="mx-auto flex max-w-[1256px] flex-col gap-3">
            {FAQS.map((faq, index) => (
              <FaqAccordion
                key={faq.question}
                number={`Q${index + 1}.`}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                onToggle={() => handleToggleFaq(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
LeadershipSection.displayName = 'LeadershipSection';

export { LeadershipSection };

/** Leadership card component */
const LeaderCard = ({
  name,
  role,
  description,
  image,
  size,
  delay = 0,
}: {
  name: string;
  role: string;
  description: string;
  image: string;
  size: 'small' | 'large';
  delay?: number;
}) => {
  const isLarge = size === 'large';

  return (
    <FadeInView
      delay={delay}
      className={cn(
        'flex h-[600px] w-full max-w-none flex-col overflow-hidden rounded-md border border-juno-300 md:min-h-0 md:max-w-[400px] md:h-full lg:h-auto lg:max-w-none',
        isLarge && 'lg:w-[440px]',
        !isLarge && 'lg:w-[400px]'
      )}
    >
      {/* Image – tablet only: fixed height 320px (width follows screen); desktop: fixed height by size */}
      <div
        className={cn(
          'relative min-h-0 w-full flex-1 overflow-hidden border-b border-juno-300 bg-white md:h-[320px] md:flex-none md:shrink-0 lg:flex-none',
          isLarge ? 'lg:h-[400px]' : 'lg:h-[342px]'
        )}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Content – mobile: height fits text + dot; tablet: fills rest of card; desktop: natural height (original) */}
      <div className="relative flex min-h-0 shrink-0 flex-col items-center justify-start gap-4 bg-white px-6 pt-6 pb-8 text-center md:flex-1 md:shrink md:min-h-0 lg:flex-initial lg:px-8 lg:pt-8 lg:pb-10">
        <DotPattern color="var(--juno-gray-400)" opacity={0.04} />

        <div className="relative flex flex-col gap-3">
          <span className={cn('text-sm text-juno-400', FONT.mono)}>
            {role}
          </span>
          <h3 className={cn('text-2xl leading-[28px] text-juno-900 lg:leading-[28px]', FONT.serif)}>
            {name}
          </h3>
          <p className="text-[15px] leading-normal text-juno-700 lg:text-sm">{description}</p>
        </div>

        {/* Decorative dot */}
        <div className="relative mt-2 size-1.5 rounded-sm bg-juno-700" />
      </div>
    </FadeInView>
  );
};
