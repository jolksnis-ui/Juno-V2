'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';
import { SectionHeader } from '@/components/ui/section-header';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { ANIMATION, TRANSITION, IMAGES, BUTTON_TEXT, FONT } from '@/lib/constants';

/** Tab types for the account switcher */
type AccountTab = 'personal' | 'business';

/** Feature item structure */
interface Feature {
  label: string;
  description: string;
}

/** Tab content data structure */
interface TabContent {
  clientLabel: string;
  title: string;
  description: string;
  mockupSrc: string;
  mockupAlt: string;
  mockupWidth: number;
  mockupHeight: number;
  features: Feature[];
}

/** Content configuration for each tab */
const TAB_CONTENT: Record<AccountTab, TabContent> = {
  personal: {
    clientLabel: 'Personal clients',
    title: 'Tailored, individual\npayment solutions',
    description:
      'Multi-currency accounts, instant internal transfers and international online payments — all in one platform. LuxePay offers everything your business needs to simplify your global payments and financial operations.',
    mockupSrc: IMAGES.mobileMockup,
    mockupAlt: 'Juno mobile app showing account dashboard',
    mockupWidth: 280,
    mockupHeight: 560,
    features: [
      {
        label: 'Funds',
        description:
          'Securely add funds to your account and receive payments in just a few steps. Track balances in real time and stay in control of your money at all times.',
      },
      {
        label: 'Payments',
        description:
          'Send payments worldwide through a streamlined experience built for speed and reliability. Manage transactions effortlessly, wherever your business operates.',
      },
      {
        label: 'Trading',
        description:
          'Access a wide range of supported currencies and manage them from one place. Convert, hold, and trade with full visibility and transparent pricing.',
      },
    ],
  },
  business: {
    clientLabel: 'Business clients',
    title: 'Grow beyond\nborders with a\ncorporate account',
    description:
      "As a high net worth individual, if you're looking for a completely unique service that offers you secure and discrete execution of all of your financial affairs, then Juno Money has the solution.",
    mockupSrc: IMAGES.laptopMockup,
    mockupAlt: 'Juno business dashboard on laptop',
    mockupWidth: 600,
    mockupHeight: 400,
    features: [
      {
        label: 'Payments',
        description:
          'Send and receive domestic and international payments through a unified corporate platform. Execute high-volume transactions reliably across multiple jurisdictions.',
      },
      {
        label: 'Liquidity',
        description:
          'Manage corporate balances efficiently with multi-currency accounts and instant internal transfers. Maintain full visibility and control over company funds.',
      },
      {
        label: 'FX & Treasury',
        description:
          'Convert, hold, and manage multiple currencies with transparent pricing. Support treasury operations and reduce exposure through streamlined currency management.',
      },
    ],
  },
};

const TABS: { id: AccountTab; label: string }[] = [
  { id: 'personal', label: 'Personal account' },
  { id: 'business', label: 'Business account' },
];

/**
 * Account section with Personal/Business tab switcher
 * Desktop: Side-by-side layout with text left, mockup and features right
 * Mobile: Stacked layout with mockup, text, and accordion features
 */
const AccountSection = () => {
  const [activeTab, setActiveTab] = useState<AccountTab>('personal');
  const content = TAB_CONTENT[activeTab];

  return (
    <section className="relative bg-juno-25 py-16 md:py-[96px]">
      <DotPattern />

      <div className="relative mx-auto max-w-[1440px] px-4 md:px-6">
        <ScrollReveal mode="slide" className="flex flex-col items-center">
          <SectionHeader
            align="center"
            title={
              <>
                Get the best out of
                <br />
                Juno Money.
              </>
            }
            subtitle="We provide a highly personalised service to corporate entities, institutions and high net worth individuals, including secure, competitive and discrete execution of cross-border payments and settlement services."
          />
        </ScrollReveal>

        {/* Tab Switcher */}
        <ScrollReveal
          mode="slide"
          className="mx-auto"
          offset={['start 0.95', 'end 0.2']}
        >
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        </ScrollReveal>

        {/* Desktop Content Area */}
        <div className="mt-16 hidden gap-10 md:flex">
          {/* Left: Text content */}
          <AnimatePresence mode="wait">
            <LeftContent key={activeTab} content={content} />
          </AnimatePresence>

          {/* Right: Mockup area */}
          <div className="flex-1">
            <MockupContainer activeTab={activeTab} content={content} />

            {/* Features Grid */}
            <AnimatePresence mode="wait">
              <FeaturesGrid key={activeTab} features={content.features} />
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Content Area */}
        <div className="mt-8 flex flex-col gap-8 md:hidden">
          {/* Mockup first on mobile */}
          <MockupContainer activeTab={activeTab} content={content} />

          {/* Text content */}
          <AnimatePresence mode="wait">
            <MobileContent key={activeTab} content={content} />
          </AnimatePresence>

          {/* Features Accordion */}
          <AnimatePresence mode="wait">
            <FeaturesAccordion key={`accordion-${activeTab}`} features={content.features} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
AccountSection.displayName = 'AccountSection';

/** Tab switcher component */
const TabSwitcher = ({
  activeTab,
  onTabChange,
}: {
  activeTab: AccountTab;
  onTabChange: (tab: AccountTab) => void;
}) => (
  <div
    className="mx-auto mt-9 flex w-full max-w-[344px] overflow-hidden rounded border border-juno-300 bg-white"
    role="tablist"
    aria-label="Account type"
  >
    {TABS.map((tab, index) => (
      <button
        key={tab.id}
        role="tab"
        aria-selected={activeTab === tab.id}
        tabIndex={activeTab === tab.id ? 0 : -1}
        onClick={() => onTabChange(tab.id)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const nextTab = TABS[(index + 1) % 2];
            onTabChange(nextTab.id);
          }
        }}
        className={cn(
          'flex-1 px-4 py-3 text-sm transition-colors duration-150',
          FONT.mono,
          activeTab === tab.id
            ? 'bg-juno-100 text-juno-900'
            : 'bg-white text-juno-500 hover:bg-juno-50',
          index === 0 && 'border-r border-juno-300'
        )}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

/** Left side content with label, title, description and CTA (Desktop) */
const LeftContent = ({ content }: { content: TabContent }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ ...TRANSITION, duration: ANIMATION.medium }}
    className="w-[340px] shrink-0 py-6"
  >
    <span className={cn('text-sm text-juno-400', FONT.mono)}>
      {content.clientLabel}
    </span>
    <h3
      className={cn(
        'mt-3 whitespace-pre-line text-[40px] leading-[1.2] text-juno-900',
        FONT.serif
      )}
    >
      {content.title}
    </h3>
    <p className="mt-4 text-lg leading-normal text-juno-700">
      {content.description}
    </p>
    <div className="mt-8">
      <GetStartedButton variant="dark" label={BUTTON_TEXT.learnMore} />
    </div>
  </motion.div>
);

/** Mobile text content with label, title, description and link */
const MobileContent = ({ content }: { content: TabContent }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ ...TRANSITION, duration: ANIMATION.medium }}
    className="flex flex-col"
  >
    <span className={cn('text-sm text-juno-400', FONT.mono)}>
      {content.clientLabel}
    </span>
    <h3
      className={cn(
        'mt-3 whitespace-pre-line text-3xl leading-tight text-juno-900',
        FONT.serif
      )}
    >
      {content.title}
    </h3>
    <p className="mt-4 text-base leading-normal text-juno-700">
      {content.description}
    </p>
    {/* Learn more link with arrow */}
    <a
      href="#"
      className="mt-6 inline-flex items-center gap-3 text-sm font-medium text-juno-900"
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-juno-100">
        <ArrowUpRight size={16} />
      </span>
      {BUTTON_TEXT.learnMore}
    </a>
  </motion.div>
);

/** Mockup container with centered device image */
const MockupContainer = ({
  activeTab,
  content,
}: {
  activeTab: AccountTab;
  content: TabContent;
}) => (
  <div className="relative h-[400px] overflow-hidden rounded-md border border-juno-300 bg-juno-100 md:h-[620px]">
    <DotPattern size={16} dotSize={0.5} opacity={0.12} />

    {/* Centered mockup */}
    <div className="absolute inset-0 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ ...TRANSITION, duration: ANIMATION.medium }}
        >
          <Image
            src={content.mockupSrc}
            alt={content.mockupAlt}
            width={content.mockupWidth}
            height={content.mockupHeight}
            className="pointer-events-none max-h-[350px] w-auto md:max-h-none"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
);

/** Features grid below the mockup (Desktop) */
const FeaturesGrid = ({ features }: { features: Feature[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ ...TRANSITION, duration: ANIMATION.medium, delay: 0.1 }}
    className="mt-10 grid grid-cols-3 gap-8"
  >
    {features.map((feature) => (
      <FeatureCard key={feature.label} feature={feature} />
    ))}
  </motion.div>
);

/** Individual feature card (Desktop) */
const FeatureCard = ({ feature }: { feature: Feature }) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2">
      <span className="size-[6px] rounded-full bg-juno-900" />
      <span className={cn('text-sm text-juno-900', FONT.mono)}>
        {feature.label}
      </span>
    </div>
    <p className="text-base leading-relaxed text-juno-700">
      {feature.description}
    </p>
  </div>
);

/** Features accordion for mobile with expandable items */
const FeaturesAccordion = ({ features }: { features: Feature[] }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ ...TRANSITION, duration: ANIMATION.medium, delay: 0.1 }}
      className="flex flex-col overflow-hidden rounded-md border border-juno-200"
    >
      {features.map((feature, index) => (
        <AccordionItem
          key={feature.label}
          feature={feature}
          isExpanded={expandedIndex === index}
          onToggle={() => handleToggle(index)}
          isLast={index === features.length - 1}
        />
      ))}
    </motion.div>
  );
};

/** Individual accordion item */
const AccordionItem = ({
  feature,
  isExpanded,
  onToggle,
  isLast,
}: {
  feature: Feature;
  isExpanded: boolean;
  onToggle: () => void;
  isLast: boolean;
}) => (
  <div className={cn('bg-white', !isLast && 'border-b border-juno-200')}>
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between px-4 py-4"
      aria-expanded={isExpanded}
    >
      <div className="flex items-center gap-3">
        <span className="size-[6px] rounded-full bg-juno-900" />
        <span className={cn('text-sm text-juno-900', FONT.mono)}>
          {feature.label}
        </span>
      </div>
      {isExpanded ? (
        <Minus size={24} className="text-juno-500" />
      ) : (
        <Plus size={24} className="text-juno-500" />
      )}
    </button>
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <p className="px-4 pb-4 text-base leading-relaxed text-juno-700">
            {feature.description}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export { AccountSection };
