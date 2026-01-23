'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Provides smooth scrolling behavior for page content.
 */
const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const pathname = usePathname();
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

  useEffect(() => {
    if (!lenisRef.current) {
      return;
    }

    /**
     * Ensures navigation always resets to the top.
     */
    const handleScrollTop = () => {
      lenisRef.current?.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    handleScrollTop();
  }, [pathname]);

  return <>{children}</>;
};

SmoothScroll.displayName = 'SmoothScroll';

export default SmoothScroll;
