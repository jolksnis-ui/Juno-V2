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
    overlayColor: 'bg-white/30',
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
  /** Progress bar delay in seconds (e.g. wait for expand animation so bar matches desktop logic) */
  progressDelaySeconds?: number;
  /** Pause the progress bar when section is out of view */
  isExternallyPaused?: boolean;
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
  progressDelaySeconds = 0,
  isExternallyPaused = false,
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
        progressDelaySeconds={progressDelaySeconds}
        isExternallyPaused={isExternallyPaused}
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
  progressDelaySeconds?: number;
  isExternallyPaused?: boolean;
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
  progressDelaySeconds = 0,
  isExternallyPaused = false,
}: MobileFeatureItemProps) => {
  const config = THEMES[theme];

  return (
    <div className={cn(!isLast && !isActive && `border-b ${config.borderColor}`)}>
      {/* Inactive: clickable title row. Active: title + body live in one frame below. */}
      {!isActive && (
        <button
          onClick={onClick}
          className="flex w-full cursor-pointer items-center justify-center px-4 py-4 text-center"
          aria-label={`View ${feature.title}`}
        >
          <motion.h3
            animate={{ fontSize: '18px', color: config.inactiveTitleColor }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className={cn('leading-[22px]', FONT.serif)}
          >
            {feature.title}
          </motion.h3>
        </button>
      )}

      {/* Expandable content: one frame (headline + body, 12px gap, 16px padding) then progress + image */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            {/* Single frame: headline + body, 12px between them, 16px left/right, 24px top/bottom */}
            <div className="px-4 py-6">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={cn('text-center text-[24px] leading-[28px]', FONT.serif)}
                style={{ color: config.activeTitleColor }}
              >
                {feature.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                className={cn('mt-3 text-center text-[15px] leading-[22.5px] lg:text-base lg:leading-relaxed', config.descriptionColor)}
              >
                {feature.description}
              </motion.p>
            </div>

            {/* Progress bar – same logic/duration as desktop; delay so it starts after expand */}
            <ProgressBar
              isActive={isActive}
              isPaused={isPaused}
              isExternallyPaused={isExternallyPaused}
              featureId={feature.id}
              bgColor={config.progressBgColor}
              fillColor={config.progressFillColor}
              delaySeconds={progressDelaySeconds}
            />

            {/* Image container – same background as desktop for each point (section bg + overlay + blur) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="relative h-[320px] overflow-hidden"
            >
              {/* Background – identical to desktop: section bg image, object-cover, overlay + 3px blur (per point) */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={backgroundImage}
                  alt=""
                  fill
                  className="object-cover"
                  aria-hidden="true"
                />
                <div className={cn('absolute inset-0 backdrop-blur-[3px]', config.overlayColor)} />
              </div>

              {/* Feature image – same graphics as desktop, slightly larger on mobile/tablet for visibility */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="relative h-[300px] w-[225px]"
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
