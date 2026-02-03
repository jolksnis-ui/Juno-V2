'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';
import { SectionHeader } from '@/components/ui/section-header';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { AppLink } from '@/components/ui/app-link';
import { ANIMATION, ANIMATION_MICRO, TRANSITION, IMAGES, BUTTON_TEXT, FONT, ACCOUNT_SECTION } from '@/lib/constants';

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
  /** Mobile/tablet only; desktop always uses mockupSrc */
  mobileMockupSrc?: string;
  mockupAlt: string;
  mockupWidth: number;
  mockupHeight: number;
  features: Feature[];
}

/** Content configuration for each tab */
const TAB_CONTENT: Record<AccountTab, TabContent> = {
  personal: {
    clientLabel: 'Personal account',
    title: 'Tailored, individual\npayment solutions',
    description:
      "As a high net worth individual, if you're looking for a completely unique service that offers you secure and discrete execution of all of your financial affairs, then Juno Money has the solution.",
    mockupSrc: IMAGES.accountSectionPersonal,
    mobileMockupSrc: IMAGES.accountSectionPersonalMobile,
    mockupAlt: 'Juno personal account dashboard',
    mockupWidth: 570,
    mockupHeight: 1140,
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
    mockupSrc: IMAGES.accountSectionBusiness,
    mockupAlt: 'Juno business account dashboard',
    mockupWidth: 1490,
    mockupHeight: 994,
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
  const learnMoreHref = activeTab === 'personal' ? '/everyday-banking' : '/corporate-account';

  return (
    <section className="relative overflow-x-hidden bg-juno-25 py-16 lg:pt-[96px] lg:pb-[96px]">
      <DotPattern />

      <div className="relative mx-auto max-w-[1440px] px-3 md:px-6 lg:px-6">
        {/* Desktop Header – badge, title, subtitle (same frame/palette as other sections) */}
        <div className="hidden lg:block">
          <ScrollReveal mode="slide" className="flex flex-col items-center">
            <SectionHeader
              align="center"
              badge={ACCOUNT_SECTION.badge}
              title={
                <>
                  Get the best out of
                  <br />
                  Juno Money
                </>
              }
              subtitle={ACCOUNT_SECTION.subtitle}
            />
          </ScrollReveal>
        </div>

        {/* Mobile Header – badge, title, subtitle (tablet: max-w 600px) */}
        <div className="flex flex-col items-center gap-6 lg:hidden md:mx-auto md:max-w-[600px]">
          <span
            className={cn(
              'w-fit text-center rounded border border-juno-200 bg-juno-100 px-1.5 py-1 text-[13px] text-juno-700',
              FONT.mono
            )}
          >
            {ACCOUNT_SECTION.badge}
          </span>
          <div className="flex w-full flex-col gap-6 text-center">
            <h2
              className={cn(
                'w-full text-juno-900 text-[44px] leading-[48px]',
                FONT.serif
              )}
            >
              {ACCOUNT_SECTION.title.replace(/\n/g, ' ')}
            </h2>
            <p className="text-base leading-normal text-juno-700">
              {ACCOUNT_SECTION.subtitle}
            </p>
          </div>
        </div>

        {/* Tab Switcher – 32px below body text on mobile/tablet, 36px on desktop (tablet: within 600px) */}
        <div className="mt-[32px] flex justify-center lg:mt-9 md:mx-auto md:max-w-[600px]">
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Desktop Content Area – desktop mockup only (do not touch) */}
        <div className="mt-16 hidden gap-10 lg:flex">
          {/* Left: Text content */}
          <AnimatePresence mode="wait">
            <LeftContent key={activeTab} content={content} learnMoreHref={learnMoreHref} />
          </AnimatePresence>

          {/* Right: Mockup area */}
          <div className="flex-1">
            <MockupContainer activeTab={activeTab} content={content} useMobileMockup={false} />

            {/* Features Grid */}
            <AnimatePresence mode="wait">
              <FeaturesGrid key={activeTab} features={content.features} />
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Content Area – 24px below tabs; 40px from mockup to title; 32px between Learn More and accordion (mobile/tablet) */}
        <div className="mt-6 flex flex-col items-center gap-[32px] lg:hidden">
          {/* Mockup first on mobile – uses mobileMockupSrc when set (e.g. Individual(M).png for personal) */}
          <div className="w-full self-stretch">
            <MockupContainer activeTab={activeTab} content={content} useMobileMockup />
          </div>

          {/* Text content – centered in frame for mobile/tablet (tablet: max-w 600px for title, body, Learn More) */}
          <div className="w-full md:mx-auto md:max-w-[600px]">
            <AnimatePresence mode="wait">
              <MobileContent key={activeTab} content={content} learnMoreHref={learnMoreHref} />
            </AnimatePresence>
          </div>

          {/* Features Accordion – 32px above (backstop from Learn More) */}
          <div className="w-full self-stretch">
            <AnimatePresence mode="wait">
              <FeaturesAccordion key={`accordion-${activeTab}`} features={content.features} />
            </AnimatePresence>
          </div>
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
    className="mx-auto flex w-full max-w-[420px] overflow-hidden rounded border border-juno-300 bg-white"
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
          'flex h-[44px] flex-1 cursor-pointer items-center justify-center whitespace-nowrap px-3 text-[15px] transition-colors duration-150 sm:px-4 lg:h-auto lg:py-3 lg:text-base',
          FONT.mono,
          activeTab === tab.id
            ? 'bg-juno-100 text-juno-900'
            : 'bg-white text-juno-500 hover:text-juno-900',
          index === 0 && 'border-r border-juno-300'
        )}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

const LearnMoreLink = ({ href }: { href: string }) => (
  <AppLink
    href={href}
    className={cn(
      'group mt-8 inline-flex items-center justify-center gap-3 text-base transition-colors',
      'text-juno-700 hover:text-juno-900'
    )}
  >
    <span className="flex size-8 items-center justify-center rounded-[4px] bg-juno-900 transition-colors group-hover:bg-juno-700">
      <ArrowUpRight size={22} strokeWidth={1.4} className="text-white" />
    </span>
    <span className={FONT.mono}>{BUTTON_TEXT.learnMore}</span>
  </AppLink>
);
LearnMoreLink.displayName = 'LearnMoreLink';

/** Left side content with label, title, description and CTA (Desktop) */
const LeftContent = ({ content, learnMoreHref }: { content: TabContent; learnMoreHref: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ ...TRANSITION, duration: ANIMATION.medium }}
    className="w-[440px] shrink-0 py-6"
  >
    <span className={cn('text-sm text-juno-400', FONT.mono)}>
      {content.clientLabel}
    </span>
    <h3
      className={cn(
        'mt-3 whitespace-pre-line text-[44px] leading-[48px] lg:leading-[48px] text-juno-900',
        FONT.serif
      )}
    >
      {content.title}
    </h3>
    <p className="mt-4 text-base leading-normal text-juno-700">
      {content.description}
    </p>
    <LearnMoreLink href={learnMoreHref} />
  </motion.div>
);

/** Mobile text content with label, title, description and link – centered in frame for mobile/tablet */
const MobileContent = ({ content, learnMoreHref }: { content: TabContent; learnMoreHref: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ ...TRANSITION, duration: ANIMATION.medium }}
    className="flex w-full max-w-full flex-col items-center px-0 text-center mt-2 lg:mt-0"
  >
    <span className={cn('text-sm text-juno-400', FONT.mono)}>
      {content.clientLabel}
    </span>
    <h3
      className={cn(
        'mt-3 w-full text-[32px] leading-[36px] text-juno-900',
        FONT.serif
      )}
    >
      {content.title.replace(/\n/g, ' ')}
    </h3>
    <p className="mt-4 w-full text-base leading-normal text-juno-700 text-center">
      {content.description}
    </p>
    {/* Learn more link with arrow */}
    <LearnMoreLink href={learnMoreHref} />
  </motion.div>
);

/** Inner motion div so we can use content-based animation (personal: slide from below; business: scale). */
const MockupMotionDiv = ({
  activeTab,
  useMobileMockup,
  src,
  content,
  isBusinessMobile,
  isPersonalMobile,
}: {
  activeTab: AccountTab;
  useMobileMockup: boolean;
  src: string;
  content: TabContent;
  isBusinessMobile: boolean;
  isPersonalMobile: boolean;
}) => (
  <motion.div
    initial={
      isPersonalMobile
        ? { opacity: 0, y: 24 }
        : { opacity: 0, scale: 0.95 }
    }
    animate={
      isPersonalMobile
        ? { opacity: 1, y: 0 }
        : { opacity: 1, scale: 1 }
    }
    exit={
      isPersonalMobile
        ? { opacity: 0, y: 24 }
        : { opacity: 0, scale: 1.05 }
    }
    transition={{ ...TRANSITION, duration: ANIMATION.medium }}
    className={cn(
      // Mobile/tablet: Business stays centered; Personal is pinned to bottom
      isBusinessMobile && 'flex shrink-0 items-center justify-center',
      isPersonalMobile && 'absolute bottom-0 left-0 right-0 flex justify-center'
    )}
  >
    <Image
      src={src}
      alt={content.mockupAlt}
      width={content.mockupWidth}
      height={content.mockupHeight}
      className={cn(
        'pointer-events-none object-contain',
        isBusinessMobile && 'h-[340px] w-[510px] shrink-0',
        isPersonalMobile && 'h-[320px] w-auto',
        !useMobileMockup && 'lg:h-auto lg:w-auto',
        activeTab === 'personal' ? 'lg:max-h-[616px]' : 'lg:max-h-[476px]'
      )}
      priority
    />
  </motion.div>
);

/** Mockup container with centered device image. Desktop uses mockupSrc; mobile/tablet uses mobileMockupSrc when set. */
const MockupContainer = ({
  activeTab,
  content,
  useMobileMockup = false,
}: {
  activeTab: AccountTab;
  content: TabContent;
  useMobileMockup?: boolean;
}) => {
  const src = useMobileMockup && content.mobileMockupSrc ? content.mobileMockupSrc : content.mockupSrc;
  const isPersonalMobile = useMobileMockup && activeTab === 'personal';
  const isBusinessMobile = useMobileMockup && activeTab === 'business';
  return (
  <div className="relative h-[360px] overflow-hidden rounded-md border border-juno-300 bg-juno-100 lg:h-[620px]">
    {/* Always items-center so exiting business stays centered (no fall). Personal uses absolute bottom. Gap between graphic and device on mobile/tablet via padding. */}
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle,_rgba(24,24,27,0.10)_0.5px,_transparent_0.5px)] bg-center bg-repeat bg-[length:3px_3px] p-4 lg:p-0">
      <AnimatePresence mode="wait">
        <MockupMotionDiv
          key={activeTab}
          activeTab={activeTab}
          useMobileMockup={useMobileMockup}
          src={src}
          content={content}
          isBusinessMobile={isBusinessMobile}
          isPersonalMobile={isPersonalMobile}
        />
      </AnimatePresence>
    </div>
  </div>
  );
};

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
      className="flex flex-col overflow-hidden rounded border border-juno-200"
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

/** Plus/minus icon – same as FAQ (stroke #3f3f46, 1.5px) */
const AccordionPlusMinusIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#3f3f46"
    strokeWidth="1.5"
    strokeLinecap="round"
    className="shrink-0 transition-transform duration-200"
    aria-hidden
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <motion.line
      x1="12"
      y1="5"
      x2="12"
      y2="19"
      initial={false}
      animate={{ opacity: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
      transition={{ duration: ANIMATION_MICRO.fast }}
    />
  </svg>
);

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
      className="flex w-full cursor-pointer items-center justify-between px-4 py-4"
      aria-expanded={isExpanded}
    >
      <div className="flex items-center gap-3">
        <span className="size-[6px] rounded-full bg-juno-900" />
        <span className={cn('text-sm text-juno-900', FONT.mono)}>
          {feature.label}
        </span>
      </div>
      <AccordionPlusMinusIcon isOpen={isExpanded} />
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
          <p className="px-4 pb-4 text-[15px] leading-[22.5px] text-juno-700 lg:text-base lg:leading-relaxed">
            {feature.description}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export { AccountSection };
