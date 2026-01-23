'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { AnimatedMenuIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';

/** Navigation items for expanded menu */
const NAV_ITEMS = {
  left: [
    { label: 'Everyday banking', href: '/everyday-banking' },
    { label: 'Corporate account', href: '/corporate-account' },
  ],
  right: [
    { label: 'About us', href: '/about' },
    { label: 'Contact us', href: '/contact-us' },
  ],
};

/**
 * Header component with centered menu button and auth buttons
 * Includes animated menu icon and full-screen expanded navigation
 */
export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHasScrolled(latest > 20);

    if (latest > previous && latest > 150) {
      setHidden(true);
      if (expanded) setExpanded(false);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={cn(
        'fixed left-0 right-0 top-0 z-50 border-b border-[#d1d1d6] bg-white transition-colors duration-300',
        expanded && 'bg-white'
      )}
    >
      {/* Header Bar */}
      <div className="relative flex items-center justify-between px-7 py-[18px]">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-50"
          onClick={() => setExpanded(false)}
        >
          <span className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold text-[#18181B]">
            Juno
          </span>
        </Link>

        {/* Centered Menu Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? 'Close menu' : 'Open menu'}
          aria-expanded={expanded}
          className="absolute left-1/2 z-50 flex size-10 -translate-x-1/2 items-center justify-center rounded hover:bg-black/5"
        >
          <AnimatedMenuIcon isOpen={expanded} size={24} color="#18181B" />
        </button>

        {/* Auth Buttons */}
        <div className="relative z-50 flex items-center gap-1">
          <button className="flex h-9 items-center justify-center rounded border border-[#d1d1d6] px-4 font-[family-name:var(--font-geist-mono)] text-sm text-[#18181B] transition-colors hover:bg-black/5">
            Log in
          </button>
          <button className="flex h-9 items-center justify-center rounded bg-[#18181B] px-4 font-[family-name:var(--font-geist-mono)] text-sm text-white transition-colors hover:bg-[#18181B]/90">
            Open account
          </button>
        </div>
      </div>

      {/* Expanded Menu */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[#d1d1d6]"
          >
            <div className="flex gap-16 px-7 pb-12 pt-12">
              {/* Navigation Section */}
              <div className="flex flex-1 flex-col gap-6">
                {/* Navigation Badge */}
                <span className="w-fit rounded border border-[#E4E4E7] bg-[#F4F4F5] px-1.5 py-1 font-[family-name:var(--font-geist-mono)] text-sm text-[#3F3F46]">
                  Navigation
                </span>

                {/* Two-column Navigation */}
                <div className="flex gap-16">
                  {/* Left Column */}
                  <div className="flex flex-1 flex-col gap-6">
                    {NAV_ITEMS.left.map((item) => (
                      <NavLink key={item.label} href={item.href} onClick={() => setExpanded(false)}>
                        {item.label}
                      </NavLink>
                    ))}
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-1 flex-col gap-6">
                    {NAV_ITEMS.right.map((item) => (
                      <NavLink key={item.label} href={item.href} onClick={() => setExpanded(false)}>
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phone Mockup */}
              <div className="relative hidden size-[360px] shrink-0 overflow-hidden rounded-md border border-[#d1d1d6] bg-[#F4F4F5] lg:block">
                <DotPattern color="#000000" opacity={0.12} />
                <div className="absolute left-1/2 top-8 h-[480px] w-[240px] -translate-x-1/2">
                  <Image
                    src="/images/Mobile Mockup.png"
                    alt="Juno app preview"
                    fill
                    className="object-contain object-top"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/** Navigation link component for expanded menu */
const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="whitespace-nowrap border-b border-[#d1d1d6] py-6 font-[family-name:var(--font-fraunces)] text-5xl font-light text-[#3F3F46] transition-colors hover:text-[#18181B]"
  >
    {children}
  </Link>
);
