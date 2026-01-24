'use client';

import { useState, useEffect, useCallback } from 'react';
import { AUTO_ROTATE_INTERVAL } from '@/lib/constants';

interface UseAutoRotateOptions {
  /** Total number of items to rotate through */
  itemCount: number;
  /** Auto-rotation interval in ms (default: AUTO_ROTATE_INTERVAL) */
  interval?: number;
  /** Starting item (1-indexed, default: 1) */
  initialItem?: number;
}

interface UseAutoRotateReturn {
  /** Currently active item (1-indexed) */
  active: number;
  /** Whether auto-rotation is paused */
  isPaused: boolean;
  /** Set active item directly */
  setActive: (id: number) => void;
  /** Go to next item (wraps around) */
  next: () => void;
  /** Go to previous item (wraps around) */
  prev: () => void;
  /** Handle item click - sets active and pauses rotation */
  handleClick: (id: number) => void;
  /** Handle manual navigation - pauses rotation briefly */
  handleManualNav: (direction: 'prev' | 'next') => void;
}

/**
 * Hook for auto-rotating carousel/feature list functionality
 * Manages active state, auto-rotation, and pause on interaction
 */
export function useAutoRotate({
  itemCount,
  interval = AUTO_ROTATE_INTERVAL,
  initialItem = 1,
}: UseAutoRotateOptions): UseAutoRotateReturn {
  const [active, setActive] = useState(initialItem);
  const [isPaused, setIsPaused] = useState(false);

  /** Advances to the next item (wraps around) */
  const next = useCallback(() => {
    setActive((current) => (current % itemCount) + 1);
  }, [itemCount]);

  /** Goes to the previous item (wraps around) */
  const prev = useCallback(() => {
    setActive((current) => (current === 1 ? itemCount : current - 1));
  }, [itemCount]);

  /** Handles item click - sets active and pauses auto-rotation briefly */
  const handleClick = useCallback(
    (id: number) => {
      setActive(id);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), interval);
    },
    [interval]
  );

  /** Handles manual navigation - pauses auto-rotation briefly */
  const handleManualNav = useCallback(
    (direction: 'prev' | 'next') => {
      setIsPaused(true);
      if (direction === 'prev') {
        prev();
      } else {
        next();
      }
      setTimeout(() => setIsPaused(false), interval);
    },
    [prev, next, interval]
  );

  // Auto-rotation effect
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [isPaused, next, interval]);

  return {
    active,
    isPaused,
    setActive,
    next,
    prev,
    handleClick,
    handleManualNav,
  };
}
