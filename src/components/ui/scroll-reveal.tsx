'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TRANSITION } from '@/lib/constants';

interface ScrollRevealProps extends MotionProps {
  children: ReactNode;
  className?: string;
  /**
   * Animation mode:
   * - 'fade': Simple opacity fade (default)
   * - 'slide': Slide up with opacity
   * - 'parallax': Slower movement relative to scroll
   */
  mode?: 'fade' | 'slide' | 'parallax';
  /**
   * Custom duration adjustment
   */
  duration?: number;
}

export function ScrollReveal({
  children,
  className,
  mode = 'slide',
  duration,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Opacity: fade in as it enters, fade out as it leaves
  // 0 -> 0.3: fade in
  // 0.3 -> 0.8: stay visible
  // 0.8 -> 1.0: fade out
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  
  // Y-axis movement
  // Slide: moves up as it enters
  const ySlide = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  
  // Parallax: constant movement throughout
  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const style = {
    opacity,
    y: mode === 'parallax' ? yParallax : mode === 'slide' ? ySlide : 0,
  };

  return (
    <motion.div
      ref={ref}
      style={style}
      className={cn('will-change-[opacity,transform]', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
