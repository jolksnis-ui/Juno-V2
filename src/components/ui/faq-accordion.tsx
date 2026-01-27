'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FONT, ANIMATION_MICRO, TRANSITION, MAX_WIDTHS } from '@/lib/constants';

interface FaqAccordionProps {
  /** Question number (e.g., "Q1") */
  number: string;
  /** The question text */
  question: string;
  /** The answer text */
  answer: string;
  /** Whether the accordion is expanded */
  isOpen: boolean;
  /** Callback when accordion is toggled */
  onToggle: () => void;
}

/**
 * Expandable FAQ item with smooth height animation
 * Features plus/minus icon toggle and slide-down answer reveal
 */
export const FaqAccordion = ({
  number,
  question,
  answer,
  isOpen,
  onToggle,
}: FaqAccordionProps) => {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-md border border-juno-300 bg-white/60',
        isOpen && 'bg-white'
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between p-6"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className={cn('w-10 text-base text-juno-400', FONT.mono)}>
            {number}
          </span>
          <span className={cn('text-left text-2xl leading-8 text-juno-900', FONT.serif)}>
            {question}
          </span>
        </div>
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded border border-juno-300"
          aria-hidden="true"
        >
          <PlusMinusIcon isOpen={isOpen} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: ANIMATION_MICRO.medium, ease: TRANSITION.ease }}
          >
            <div className="border-t border-juno-300 px-6 pb-6 pt-6">
              <p style={{ maxWidth: MAX_WIDTHS.faqAnswer }} className="text-base leading-normal text-juno-700">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
FaqAccordion.displayName = 'FaqAccordion';

/** Animated plus/minus icon */
const PlusMinusIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--juno-gray-900)"
    strokeWidth="1.5"
    strokeLinecap="round"
    className="transition-transform duration-200"
  >
    {/* Horizontal line (always visible) */}
    <line x1="5" y1="12" x2="19" y2="12" />
    {/* Vertical line (hidden when open) */}
    <motion.line
      x1="12"
      y1="5"
      x2="12"
      y2="19"
      initial={false}
      animate={{ opacity: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
      transition={{ duration: ANIMATION_MICRO.fast }}
    />
  </svg>
);
