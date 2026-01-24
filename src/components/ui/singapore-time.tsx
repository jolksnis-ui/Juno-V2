'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { TIME_UPDATE_INTERVAL, DIMENSIONS } from '@/lib/constants';

interface SingaporeTimeProps {
  className?: string;
}

/** Formats current time in Singapore timezone */
const formatSingaporeTime = () => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Singapore',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return formatter.format(new Date());
};

/**
 * Displays live Singapore time (SGT) on a single line
 * Format: "Singapore · SGT · HH:MM AM"
 */
const SingaporeTime = ({ className }: SingaporeTimeProps) => {
  // null = not yet hydrated, string = hydrated with time value
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    // Set initial time via microtask to avoid synchronous setState in effect
    const timeoutId = setTimeout(() => setTime(formatSingaporeTime()), 0);

    // Update every minute
    const interval = setInterval(() => {
      setTime(formatSingaporeTime());
    }, TIME_UPDATE_INTERVAL);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, []);

  // Prevent hydration mismatch by showing placeholder until client-side
  const displayTime = time ?? '--:-- --';

  return (
    <span
      style={{ width: DIMENSIONS.singaporeTimeWidth }}
      className={cn('text-right font-mono text-sm text-juno-500', className)}
    >
      Singapore · SGT · {displayTime}
    </span>
  );
};
SingaporeTime.displayName = 'SingaporeTime';

export { SingaporeTime, type SingaporeTimeProps };
