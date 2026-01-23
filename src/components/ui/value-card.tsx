'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TRANSITION } from '@/lib/constants';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...TRANSITION, delay }}
      className={cn(
        'relative flex h-80 flex-col justify-between overflow-hidden rounded-md border border-[#3F3F46] bg-white/[0.02] p-8',
        className
      )}
    >
      {/* Dot pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, #A0A0AB 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Header: Number + Icon */}
      <div className="relative flex items-center justify-between">
        <span className="w-10 font-[family-name:var(--font-geist-mono)] text-lg text-[#A0A0AB]">
          {number}
        </span>
        <div className="flex size-6 items-center justify-center text-[#D1D1D6]">
          {icon}
        </div>
      </div>

      {/* Content: Title + Description */}
      <div className="relative flex flex-col gap-3">
        <h3 className="font-[family-name:var(--font-fraunces)] text-2xl leading-8 text-white">
          {title}
        </h3>
        <p className="text-sm leading-normal text-[#A0A0AB]">{description}</p>

        {/* Bottom border gradient */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-[#3F3F46] via-[#51525C] to-[#3F3F46]" />
      </div>
    </motion.div>
  );
};
ValueCard.displayName = 'ValueCard';
