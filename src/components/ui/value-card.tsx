'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { IMAGES, FONT, DIMENSIONS } from '@/lib/constants';
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
        'relative flex h-[260px] flex-col justify-between overflow-hidden rounded-md border border-juno-700 bg-white/[0.02] px-4 pt-4 pb-6 lg:h-80 lg:p-8',
        className
      )}
    >
      {/* Dot pattern background - 156px tile size, 32% opacity per Figma */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage: `url('${IMAGES.valuesDotPattern}')`,
          backgroundSize: `${DIMENSIONS.dotPatternSize} ${DIMENSIONS.dotPatternSize}`,
          backgroundPosition: 'top left',
        }}
        aria-hidden="true"
      />
      {/* Same 3px dot canvas as Mission center card / Business–Corporate account frame */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 bg-[length:3px_3px] bg-center bg-repeat bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_0.5px,_transparent_0.5px)]"
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
        <h3 className={cn('text-2xl leading-[28px] text-white lg:leading-[28px]', FONT.serif)}>
          {title}
        </h3>
        <p className="text-[15px] leading-normal text-juno-400 lg:text-sm">{description}</p>

        {/* Bottom border gradient */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-juno-700 via-juno-600 to-juno-700" />
      </div>
    </FadeInView>
  );
};
ValueCard.displayName = 'ValueCard';
