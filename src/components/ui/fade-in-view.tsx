'use client';

import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TRANSITION } from '@/lib/constants';

/** Direction options for the slide animation */
type Direction = 'up' | 'down' | 'left' | 'right';

interface FadeInViewProps extends Omit<MotionProps, 'initial' | 'whileInView' | 'viewport' | 'transition'> {
  children: ReactNode;
  className?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Slide direction (default: 'up') */
  direction?: Direction;
  /** Distance to travel in pixels (default: 20) */
  distance?: number;
  /** Custom duration override */
  duration?: number;
}

/** Maps direction to initial offset values */
const getInitialOffset = (direction: Direction, distance: number) => {
  const offsets: Record<Direction, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };
  return offsets[direction];
};

/**
 * Animated wrapper that fades in and slides content when it enters the viewport.
 * Replaces repeated motion.div patterns with whileInView animations.
 */
export const FadeInView = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 20,
  duration,
  ...props
}: FadeInViewProps) => {
  const offset = getInitialOffset(direction, distance);

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{
        ...TRANSITION,
        duration: duration ?? TRANSITION.duration,
        delay,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
FadeInView.displayName = 'FadeInView';
