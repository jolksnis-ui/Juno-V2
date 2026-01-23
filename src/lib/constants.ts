/**
 * Design tokens and constants for Juno Bank
 * Centralized values to eliminate hard-coded magic numbers
 */

/** Animation durations in seconds (for Framer Motion) */
export const ANIMATION = {
  fast: 0.6,
  medium: 0.8,
  slow: 1.2,
} as const;

/** Common transition settings for dramatic feel */
export const TRANSITION = {
  ease: [0.25, 0.1, 0.25, 1.0],
  duration: 1.2,
} as const;

/** Auto-rotation interval for carousels (ms) */
export const AUTO_ROTATE_INTERVAL = 5000;

/** Image paths */
export const IMAGES = {
  mobileMockup: '/images/Mobile Mockup.png',
  laptopMockup: '/images/laptop-mockup.png',
  corporateBg: '/images/corporate-bg.jpg',
  avatarJohn: '/images/avatar-john.jpg',
  // About page images
  aboutOffice: '/images/about/office-interior.jpg',
  aboutServicePreview: '/images/about/service-preview.jpg',
  leaderCeo: '/images/about/leader-ceo.jpg',
  leaderCompliance: '/images/about/leader-compliance.jpg',
  leaderCoo: '/images/about/leader-coo.jpg',
} as const;

/** Button text constants */
export const BUTTON_TEXT = {
  openAccount: 'Open account',
  getStarted: 'Get Started',
  learnMore: 'Learn more',
  transferInstantly: 'Transfer instantly',
} as const;

/** Badge text constants */
export const BADGE_TEXT = {
  corporate: 'For corporate clients',
  individual: 'Tailored for individual clients',
} as const;
