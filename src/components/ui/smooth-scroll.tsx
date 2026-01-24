'use client';

import { ReactNode, useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';

interface SmoothScrollContextType {
  scrollToTop: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scrollToTop: () => {},
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
   * Manually resets scroll position to top.
   * Called by PageTransition component after exit animation completes.
   */
  const scrollToTop = () => {
    if (!lenisRef.current) return;
    
    lenisRef.current.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollToTop }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

SmoothScroll.displayName = 'SmoothScroll';

export default SmoothScroll;
