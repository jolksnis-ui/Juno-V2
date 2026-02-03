'use client';

import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '@/components/ui/smooth-scroll';
import { FrozenRouter } from '@/components/ui/frozen-router';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Handles elegant page transitions with exit/enter animations.
 * Uses FrozenRouter to preserve old page content during exit animation.
 * Coordinates with SmoothScroll to reset scroll position at the perfect moment.
 */
export const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const { scrollToTop, lockScroll } = useSmoothScroll();
  const prevPathname = useRef(pathname);

  // Lock scroll when pathname changes (navigation starts)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      lockScroll();
      prevPathname.current = pathname;
    }
  }, [pathname, lockScroll]);

  return (
    <AnimatePresence 
      mode="wait" 
      onExitComplete={() => {
        // Reset scroll position only after the exit animation finishes
        // This prevents the user from seeing the page jump to top before it disappears
        // scrollToTop also unlocks scroll
        scrollToTop();
      }}
    >
      <motion.div
        key={pathname}
        // IMPORTANT: avoid transforms/filters here.
        // `position: sticky` (used by the desktop Security stepper) breaks when any ancestor
        // has `transform`/`filter` applied (common with page transition animations).
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.76, 0, 0.24, 1], // Elegant custom bezier curve
        }}
        className="min-h-screen w-full"
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
