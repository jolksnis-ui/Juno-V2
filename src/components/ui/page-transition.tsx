'use client';

import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '@/components/ui/smooth-scroll';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Handles page transitions with enter animations.
 * Coordinates with SmoothScroll to reset scroll position when navigation completes.
 * (FrozenRouter removed so navigation and other pages work correctly with Next.js 16.)
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
        scrollToTop();
      }}
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="min-h-screen w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
