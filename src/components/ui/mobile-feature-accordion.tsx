'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ProgressBar } from '@/components/ui/progress-bar';
import { FONT } from '@/lib/constants';

/** Feature item structure for mobile accordion */
interface FeatureItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

/** Theme configuration for light/dark variants */
interface ThemeConfig {
  /** Border color class for inactive items */
  borderColor: string;
  /** Active title color (CSS value) */
  activeTitleColor: string;
  /** Inactive title color (CSS value) */
  inactiveTitleColor: string;
  /** Description text color class */
  descriptionColor: string;
  /** Progress bar background color class */
  progressBgColor: string;
  /** Progress bar fill color class */
  progressFillColor: string;
  /** Overlay color class for image background */
  overlayColor: string;
}

const THEMES: Record<'light' | 'dark', ThemeConfig> = {
  light: {
    borderColor: 'border-juno-300',
    activeTitleColor: 'var(--juno-gray-900)',
    inactiveTitleColor: 'var(--juno-gray-600)',
    descriptionColor: 'text-juno-700',
    progressBgColor: 'bg-juno-300',
    progressFillColor: 'bg-juno-900',
    overlayColor: 'bg-white/40',
  },
  dark: {
    borderColor: 'border-juno-700',
    activeTitleColor: '#FFFFFF',
    inactiveTitleColor: 'var(--juno-gray-400)',
    descriptionColor: 'text-juno-300',
    progressBgColor: 'bg-juno-700',
    progressFillColor: 'bg-white',
    overlayColor: 'bg-black/40',
  },
};

interface MobileFeatureAccordionProps {
  /** Array of feature items to display */
  features: FeatureItem[];
  /** Currently active feature ID */
  activeId: number;
  /** Whether auto-rotation is paused */
  isPaused: boolean;
  /** Callback when a feature is clicked */
  onFeatureClick: (id: number) => void;
  /** Theme variant */
  theme?: 'light' | 'dark';
  /** Background image for expanded items */
  backgroundImage: string;
}

/**
 * Mobile accordion for feature carousels
 * Supports light/dark themes with animated expansion
 */
export const MobileFeatureAccordion = ({
  features,
  activeId,
  isPaused,
  onFeatureClick,
  theme = 'dark',
  backgroundImage,
}: MobileFeatureAccordionProps) => (
  <div className="flex flex-col">
    {features.map((feature, index) => (
      <MobileFeatureItem
        key={feature.id}
        feature={feature}
        isActive={feature.id === activeId}
        isPaused={isPaused}
        isLast={index === features.length - 1}
        onClick={() => onFeatureClick(feature.id)}
        theme={theme}
        backgroundImage={backgroundImage}
      />
    ))}
  </div>
);
MobileFeatureAccordion.displayName = 'MobileFeatureAccordion';

interface MobileFeatureItemProps {
  feature: FeatureItem;
  isActive: boolean;
  isPaused: boolean;
  isLast: boolean;
  onClick: () => void;
  theme: 'light' | 'dark';
  backgroundImage: string;
}

/** Mobile feature item with smooth animated transitions */
const MobileFeatureItem = ({
  feature,
  isActive,
  isPaused,
  isLast,
  onClick,
  theme,
  backgroundImage,
}: MobileFeatureItemProps) => {
  const config = THEMES[theme];

  return (
    <div className={cn(!isLast && !isActive && `border-b ${config.borderColor}`)}>
      {/* Title - always visible, clickable when inactive */}
      <button
        onClick={!isActive ? onClick : undefined}
        className={cn('w-full px-4 py-4 text-center', !isActive && 'cursor-pointer')}
        aria-label={!isActive ? `View ${feature.title}` : undefined}
        disabled={isActive}
      >
        <motion.h3
          animate={{
            fontSize: isActive ? '22px' : '18px',
            color: isActive ? config.activeTitleColor : config.inactiveTitleColor,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className={cn('leading-tight', FONT.serif)}
        >
          {feature.title}
        </motion.h3>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className={cn('px-4 pb-4 text-center text-base leading-relaxed', config.descriptionColor)}
            >
              {feature.description}
            </motion.p>

            {/* Progress bar */}
            <ProgressBar
              isActive={isActive}
              isPaused={isPaused}
              featureId={feature.id}
              bgColor={config.progressBgColor}
              fillColor={config.progressFillColor}
            />

            {/* Image container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="relative h-[280px] overflow-hidden"
            >
              {/* Blurred background */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={backgroundImage}
                  alt=""
                  fill
                  className="object-cover opacity-30 blur-sm"
                  aria-hidden="true"
                />
                <div className={cn('absolute inset-0 backdrop-blur-md', config.overlayColor)} />
              </div>

              {/* Feature image */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="relative h-[240px] w-[180px]"
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
MobileFeatureItem.displayName = 'MobileFeatureItem';
