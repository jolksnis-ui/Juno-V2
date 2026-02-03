'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AUTO_ROTATE_INTERVAL } from '@/lib/constants';

interface ProgressBarProps {
  /** Whether this progress bar is currently active */
  isActive: boolean;
  /** Whether auto-rotation is paused */
  isPaused: boolean;
  /** Whether the whole section is paused (out of view) */
  isExternallyPaused?: boolean;
  /** Unique key for progress animation reset */
  featureId: number;
  /** Background color class */
  bgColor: string;
  /** Fill color class */
  fillColor: string;
  /** Fill duration in seconds (default: same as AUTO_ROTATE_INTERVAL to match desktop) */
  durationSeconds?: number;
  /** Delay before fill starts in seconds (e.g. mobile: wait for expand animation) */
  delaySeconds?: number;
}

/**
 * Animated progress bar that fills over the auto-rotation interval.
 * Same logic, delay and appearance as desktop when durationSeconds/delaySeconds match section interval.
 */
export const ProgressBar = ({
  isActive,
  isPaused: _isPaused,
  isExternallyPaused = false,
  featureId,
  bgColor,
  fillColor,
  durationSeconds = AUTO_ROTATE_INTERVAL / 1000,
  delaySeconds = 0,
}: ProgressBarProps) => (
  <div className={cn('h-px w-full', bgColor)}>
    {isActive && !isExternallyPaused && (
      <motion.div
        key={`progress-${featureId}`}
        className={cn('h-full', fillColor)}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{
          duration: durationSeconds,
          delay: delaySeconds,
          ease: 'linear',
        }}
      />
    )}
  </div>
);
ProgressBar.displayName = 'ProgressBar';
