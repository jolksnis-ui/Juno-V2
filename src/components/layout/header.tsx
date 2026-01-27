'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { AnimatedMenuIcon } from '@/components/ui/icons';
import { AppLink } from '@/components/ui/app-link';
import { cn } from '@/lib/utils';
import { CONTAINER_MAX_WIDTH } from '@/lib/constants';

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

interface HeaderProps {
  /** Whether to use dark theme (black background) */
  isDark?: boolean;
}

/**
 * Header component with centered menu button and auth buttons
 * Includes animated menu icon and full-screen expanded navigation
 * Supports dark theme for corporate page with smooth color transitions
 */
export function Header({ isDark = false }: HeaderProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) {
      setHidden(true);
      if (expanded) setExpanded(false);
    } else {
      setHidden(false);
    }
  });

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
        when: "afterChildren",
      }
    },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  } as const;

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={cn(
        'fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500 ease-out',
        isDark 
          ? 'border-[#3f3f46] bg-[#18181B]' 
          : 'border-[#d1d1d6] bg-white'
      )}
    >
      {/* Header Bar */}
      <div className="px-4 md:px-7">
        <div
          className="relative mx-auto flex items-center justify-between py-4 md:py-[18px]"
          style={{ maxWidth: CONTAINER_MAX_WIDTH }}
        >
          {/* Logo */}
          <AppLink
            href="/"
            className="relative z-50 flex items-center"
            onClick={() => setExpanded(false)}
            aria-label="Juno home"
          >
            <Image
              src="/images/Header/logo.svg"
              alt="Juno logo"
              width={112}
              height={28}
              priority
              className={cn(
                'h-7 w-auto transition-[filter] duration-500 ease-out',
                isDark && 'brightness-0 invert'
              )}
            />
          </AppLink>

          {/* Centered Menu Button */}
          <motion.button
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? 'Close menu' : 'Open menu'}
            aria-expanded={expanded}
            className={cn(
              'absolute left-1/2 z-50 flex size-10 -translate-x-1/2 items-center justify-center rounded transition-colors duration-500',
              isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
            )}
            initial="closed"
            animate={expanded ? "open" : "closed"}
            whileHover={expanded ? "hoverExpanded" : "hoverClosed"}
          >
            <AnimatedMenuIcon isOpen={expanded} size={24} color={isDark ? '#ffffff' : '#18181B'} />
          </motion.button>

          {/* Auth Buttons */}
          <div className="relative z-50 flex items-center gap-2">
            <AppLink
              href="/login"
              className={cn(
                'hidden h-9 items-center justify-center rounded border px-3 font-[family-name:var(--font-geist-mono)] text-xs transition-all duration-500 ease-out sm:flex md:px-4 md:text-sm',
                isDark
                  ? 'border-white/80 text-white hover:bg-white/10'
                  : 'border-[#d1d1d6] text-[#18181B] hover:bg-black/5'
              )}
            >
              Log in
            </AppLink>
            <AppLink
              href="/open-account"
              className={cn(
                'flex h-9 items-center justify-center rounded px-3 font-[family-name:var(--font-geist-mono)] text-xs transition-all duration-500 ease-out md:px-4 md:text-sm',
                isDark
                  ? 'bg-white text-[#18181B] hover:bg-white/90'
                  : 'bg-[#18181B] text-white hover:bg-[#18181B]/90'
              )}
            >
              Open account
            </AppLink>
          </div>
        </div>
      </div>

      {/* Expanded Menu */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(
              'overflow-hidden border-t transition-colors duration-500',
              isDark ? 'border-[#3f3f46]' : 'border-[#d1d1d6]'
            )}
          >
            <div className="px-4 py-8 md:px-7 md:py-12">
              {/* Navigation Section */}
              <motion.div variants={itemVariants} className="mx-auto w-full max-w-7xl">
                {/* Two-column Navigation Grid */}
                <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                  {/* Row 1 */}
                  <NavLink href={NAV_ITEMS.left[0].href} onClick={() => setExpanded(false)} isDark={isDark}>
                    {NAV_ITEMS.left[0].label}
                  </NavLink>
                  <NavLink href={NAV_ITEMS.right[0].href} onClick={() => setExpanded(false)} isDark={isDark}>
                    {NAV_ITEMS.right[0].label}
                  </NavLink>
                  {/* Row 2 */}
                  <NavLink href={NAV_ITEMS.left[1].href} onClick={() => setExpanded(false)} isDark={isDark}>
                    {NAV_ITEMS.left[1].label}
                  </NavLink>
                  <NavLink href={NAV_ITEMS.right[1].href} onClick={() => setExpanded(false)} isDark={isDark}>
                    {NAV_ITEMS.right[1].label}
                  </NavLink>
                </div>
              </motion.div>

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
  isDark = false,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  isDark?: boolean;
}) => (
  <AppLink
    href={href}
    onClick={onClick}
    className={cn(
      'block whitespace-nowrap text-center border-b py-4 font-[family-name:var(--font-prata)] text-3xl font-light transition-all duration-200 md:py-6 md:text-5xl',
      isDark
        ? 'border-[#3f3f46] text-[#a1a1aa] hover:text-white hover:border-white'
        : 'border-[#d1d1d6] text-[#71717A] hover:text-[#18181B] hover:border-[#18181B]'
    )}
  >
    {children}
  </AppLink>
);
