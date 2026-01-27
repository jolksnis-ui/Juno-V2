'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AUTO_ROTATE_INTERVAL } from '@/lib/constants';

interface ProgressBarProps {
  /** Whether this progress bar is currently active */
  isActive: boolean;
  /** Whether auto-rotation is paused */
  isPaused: boolean;
  /** Unique key for progress animation reset */
  featureId: number;
  /** Background color class */
  bgColor: string;
  /** Fill color class */
  fillColor: string;
}

/**
 * Animated progress bar that fills over the auto-rotation interval
 * Used in feature lists to indicate auto-rotation progress
 */
export const ProgressBar = ({
  isActive,
  isPaused,
  featureId,
  bgColor,
  fillColor,
}: ProgressBarProps) => (
  <div className={cn('h-px w-full', bgColor)}>
    {isActive && (
      <motion.div
        key={`progress-${featureId}`}
        className={cn('h-full', fillColor)}
        initial={{ width: '0%' }}
        animate={{ width: isPaused ? undefined : '100%' }}
        transition={{
          duration: AUTO_ROTATE_INTERVAL / 1000,
          ease: 'linear',
        }}
      />
    )}
  </div>
);
ProgressBar.displayName = 'ProgressBar';
