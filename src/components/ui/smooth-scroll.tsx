'use client';

import { ReactNode, useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';

interface SmoothScrollContextType {
  scrollToTop: () => void;
  lockScroll: () => void;
  unlockScroll: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scrollToTop: () => {},
  lockScroll: () => {},
  unlockScroll: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Provides smooth scrolling behavior for page content.
 * Manages Lenis instance and exposes scroll control via context.
 */
const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing for smooth stop
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    /**
     * Keeps Lenis in sync with requestAnimationFrame.
     */
    const handleRaf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(handleRaf);
    };

    requestAnimationFrame(handleRaf);

    return () => {
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  /**
   * Locks scroll during page transitions to prevent user scrolling.
   */
  const lockScroll = () => {
    if (!lenisRef.current) return;
    lenisRef.current.stop();
  };

  /**
   * Unlocks scroll after page transitions complete.
   */
  const unlockScroll = () => {
    if (!lenisRef.current) return;
    lenisRef.current.start();
  };

  /**
   * Manually resets scroll position to top and unlocks scroll.
   * Called by PageTransition component after exit animation completes.
   */
  const scrollToTop = () => {
    if (!lenisRef.current) return;
    
    lenisRef.current.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    lenisRef.current.start();
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollToTop, lockScroll, unlockScroll }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

SmoothScroll.displayName = 'SmoothScroll';

export default SmoothScroll;
