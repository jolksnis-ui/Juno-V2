'use client';

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
  const { scrollToTop } = useSmoothScroll();

  return (
    <AnimatePresence 
      mode="wait" 
      onExitComplete={() => {
        // Reset scroll position only after the exit animation finishes
        // This prevents the user from seeing the page jump to top before it disappears
        scrollToTop();
      }}
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
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
