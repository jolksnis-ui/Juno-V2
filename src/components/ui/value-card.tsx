'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { IMAGES, FONT } from '@/lib/constants';
import { FadeInView } from '@/components/ui/fade-in-view';

interface ValueCardProps {
  /** Card number (e.g., "01") */
  number: string;
  /** Icon element to display */
  icon: ReactNode;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Animation delay for staggered entrance */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Dark theme value card with number, icon, title, and description
 * Features dot pattern background texture and bottom border gradient
 */
export const ValueCard = ({
  number,
  icon,
  title,
  description,
  delay = 0,
  className,
}: ValueCardProps) => {
  return (
    <FadeInView
      delay={delay}
      className={cn(
        'relative flex h-80 flex-col justify-between overflow-hidden rounded-md border border-juno-700 bg-white/[0.02] p-8',
        className
      )}
    >
      {/* Dot pattern background - 156px tile size, 32% opacity per Figma */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage: `url('${IMAGES.valuesDotPattern}')`,
          backgroundSize: '156px 156px',
          backgroundPosition: 'top left',
        }}
        aria-hidden="true"
      />

      {/* Header: Number + Icon */}
      <div className="relative flex items-center justify-between">
        <span className={cn('w-10 text-lg text-juno-400', FONT.mono)}>
          {number}
        </span>
        <div className="flex size-6 items-center justify-center text-juno-300">
          {icon}
        </div>
      </div>

      {/* Content: Title + Description */}
      <div className="relative flex flex-col gap-3">
        <h3 className={cn('text-2xl leading-8 text-white', FONT.serif)}>
          {title}
        </h3>
        <p className="text-sm leading-normal text-juno-400">{description}</p>

        {/* Bottom border gradient */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-juno-700 via-juno-600 to-juno-700" />
      </div>
    </FadeInView>
  );
};
ValueCard.displayName = 'ValueCard';
