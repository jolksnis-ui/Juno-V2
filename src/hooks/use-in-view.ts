'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

interface UseInViewOptions {
  /** Ratio of element visible to consider "in view" (0–1). When below this, considered out of view. */
  threshold?: number;
  /** Root margin (e.g. "100px" to trigger earlier). */
  rootMargin?: string;
}

/**
 * Returns true when the element is in view (above threshold).
 * Used to pause auto-rotation when section is scrolled past (avoids layout jump below).
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.05, rootMargin = '0px' } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isInView];
}
