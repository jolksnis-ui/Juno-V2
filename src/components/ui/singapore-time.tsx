'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SingaporeTimeProps {
  className?: string;
}

/**
 * Displays live Singapore time (SGT) on a single line
 * Format: "Singapore · SGT · HH:MM AM"
 */
const SingaporeTime = ({ className }: SingaporeTimeProps) => {
  const [time, setTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const formatSingaporeTime = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Singapore',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      return formatter.format(new Date());
    };

    setTime(formatSingaporeTime());

    // Update every minute
    const interval = setInterval(() => {
      setTime(formatSingaporeTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch by not rendering time until mounted
  if (!mounted) {
    return (
      <span
        className={cn(
          'w-[275px] text-right font-mono text-sm text-[#70707B]',
          className
        )}
      >
        Singapore · SGT · --:-- --
      </span>
    );
  }

  return (
    <span
      className={cn(
        'w-[275px] text-right font-mono text-sm text-[#70707B]',
        className
      )}
    >
      Singapore · SGT · {time}
    </span>
  );
};
SingaporeTime.displayName = 'SingaporeTime';

export { SingaporeTime, type SingaporeTimeProps };
