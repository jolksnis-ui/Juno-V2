'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { DIMENSIONS } from '@/lib/constants';

interface SingaporeTimeProps {
  className?: string;
}

/** Chars for airport-style scramble before revealing the final text */
const CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ·: -.@#*';

const LOCATIONS: { label: string; timeZone: string; abbr: string }[] = [
  { label: 'Singapore', timeZone: 'Asia/Singapore', abbr: 'SGT' },
  { label: 'Hong Kong', timeZone: 'Asia/Hong_Kong', abbr: 'HKT' },
  { label: 'UAE', timeZone: 'Asia/Dubai', abbr: 'GST' },
  { label: 'Turkey', timeZone: 'Europe/Istanbul', abbr: 'TRT' },
  { label: 'Swiss', timeZone: 'Europe/Zurich', abbr: 'CET' },
  { label: 'UK', timeZone: 'Europe/London', abbr: 'GMT' },
  { label: 'Germany', timeZone: 'Europe/Berlin', abbr: 'CET' },
  { label: 'Canada', timeZone: 'America/Toronto', abbr: 'EST' },
  { label: 'Australia', timeZone: 'Australia/Sydney', abbr: 'AEST' },
  { label: 'US NY', timeZone: 'America/New_York', abbr: 'EST' },
  { label: 'Cyprus', timeZone: 'Asia/Nicosia', abbr: 'EET' },
];

const formatTime = (timeZone: string) => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(new Date());
};

const pick = (s: string) => s[Math.floor(Math.random() * s.length)];

const SCRAMBLE_TICK_MS = 100;
const PAUSE_BETWEEN_STEPS_MS = 60;
/** Delay after time (before next city). 6 s. */
const DELAY_AFTER_TIME_BEFORE_NEXT_CITY_MS = 6000;

/**
 * Displays live time for a rotating list of global locations.
 * Format: "Location · TZ · HH:MM:SS AM"
 * Time (with seconds) updates every second.
 * Order: city → zone → time (shuffle→settle each), then 6 s delay, then next location.
 */
const SingaporeTime = ({ className }: SingaporeTimeProps) => {
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [displayChars, setDisplayChars] = useState('');

  const loc = LOCATIONS[index];
  const displayTime = time ?? formatTime(loc.timeZone);

  // Set and update time for current timezone (on mount, on index change, every second for live seconds)
  useEffect(() => {
    const update = () => setTime(formatTime(loc.timeZone));
    const t = setTimeout(update, 0);
    const i = setInterval(update, 1000);
    return () => {
      clearTimeout(t);
      clearInterval(i);
    };
  }, [loc.timeZone]);

  // Shuffle in order: city → zone → time. Only the current part shuffles; the rest stay fixed.
  // Defer runStep(0) to next tick so Strict Mode cleanup doesn't kill the interval before it runs.
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let startId: ReturnType<typeof setTimeout> | null = null;

    const parts = [loc.label, loc.abbr, formatTime(loc.timeZone)];

    const runStep = (s: number) => {
      const targetPart = parts[s];
      const arr = targetPart.split('');
      const settleTicks = arr.map(() => 10 + Math.floor(Math.random() * 7));
      const maxSettle = Math.max(...settleTicks, 1);

      setStep(s);
      setDisplayChars(arr.map(() => pick(CHARSET)).join(''));
      setAnimating(true);

      let tick = 0;
      intervalId = setInterval(() => {
        tick += 1;
        setDisplayChars(
          arr.map((_, i) => (tick >= settleTicks[i] ? arr[i] : pick(CHARSET))).join('')
        );
        if (tick > maxSettle) {
          if (intervalId) clearInterval(intervalId);
          intervalId = null;
          if (s < 2) {
            timeoutId = setTimeout(() => runStep(s + 1), PAUSE_BETWEEN_STEPS_MS);
          } else {
            setAnimating(false);
            timeoutId = setTimeout(
              () => setIndex((i) => (i + 1) % LOCATIONS.length),
              DELAY_AFTER_TIME_BEFORE_NEXT_CITY_MS
            );
          }
        }
      }, SCRAMBLE_TICK_MS);
    };

    startId = setTimeout(() => runStep(0), 0);

    return () => {
      if (startId) clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [index, loc.abbr, loc.label, loc.timeZone]);

  const city = step === 0 && animating ? displayChars : loc.label;
  const zone = step === 1 && animating ? displayChars : loc.abbr;
  const timeStr = step === 2 && animating ? displayChars : displayTime;

  return (
    <span
      suppressHydrationWarning
      style={{ width: DIMENSIONS.singaporeTimeWidth }}
      className={cn('text-right font-mono text-sm text-juno-500', className)}
    >
      {city} · {zone} · {timeStr}
    </span>
  );
};
SingaporeTime.displayName = 'SingaporeTime';

export { SingaporeTime, type SingaporeTimeProps };
