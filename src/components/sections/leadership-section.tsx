'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { FaqAccordion } from '@/components/ui/faq-accordion';
import { TRANSITION } from '@/lib/constants';

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
        {/* Part 1: Leadership Team */}
        <div className="mb-24">
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
              className="mb-16"
            />
          </ScrollReveal>

          {/* Leadership cards */}
          <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
            {LEADERS.map((leader, index) => (
              <LeaderCard
                key={leader.name}
                {...leader}
                delay={0.1 * index}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mb-24 h-px w-full bg-[#D1D1D6]" />

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
              className="mb-16"
            />
          </ScrollReveal>

          {/* FAQ accordion list */}
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...TRANSITION, delay }}
      className={`flex flex-col overflow-hidden rounded-md border border-[#D1D1D6] ${
        isLarge ? 'w-[440px]' : 'w-[400px]'
      }`}
    >
      {/* Image */}
      <div
        className={`relative w-full overflow-hidden border-b border-[#D1D1D6] bg-white ${
          isLarge ? 'h-[400px]' : 'h-[342px]'
        }`}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-4 bg-white px-8 pb-10 pt-8 text-center">
        {/* Dot pattern background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, #A0A0AB 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-3">
          <span className="font-[family-name:var(--font-geist-mono)] text-sm text-[#A0A0AB]">
            {role}
          </span>
          <h3 className="font-[family-name:var(--font-fraunces)] text-2xl leading-8 text-[#18181B]">
            {name}
          </h3>
          <p className="text-sm leading-normal text-[#3F3F46]">{description}</p>
        </div>

        {/* Decorative dot */}
        <div className="relative mt-2 size-1.5 rounded-sm bg-[#3F3F46]" />
      </div>
    </motion.div>
  );
};
