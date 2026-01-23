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

/** Container max width used across sections */
export const CONTAINER_MAX_WIDTH = '1392px';

/** Hero video URL - city skyline from Pexels */
export const HERO_VIDEO_URL =
  'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4';

/** Font family class names for consistent typography */
export const FONT = {
  serif: 'font-[family-name:var(--font-prata)]',
  mono: 'font-[family-name:var(--font-geist-mono)]',
} as const;

/** Image paths */
export const IMAGES = {
  mobileMockup: '/images/Mobile Mockup.png',
  laptopMockup: '/images/laptop-mockup.png',
  corporateBg: '/images/corporate-bg.jpg',
  avatarJohn: '/images/avatar-john.jpg',
  valuesDotPattern: '/images/values-dot-pattern.png',
  // About page images
  aboutOffice: '/images/about/office-interior.jpg',
  aboutServicePreview: '/images/about/service-preview.jpg',
  visionMockup: '/images/about/vision-mockup.png',
  missionVisionMock: '/images/about/Mission & Vision Mock.png',
  leaderCeo: '/images/about/leader-ceo.jpg',
  leaderCompliance: '/images/about/leader-compliance.jpg',
  leaderCoo: '/images/about/leader-coo.jpg',
  // Individual features images
  featureInstantPayments: '/images/Individual-features/Instant payments.svg',
  featureExchange: '/images/Individual-features/Exchange.svg',
  featureFastAccount: '/images/Individual-features/Fast Account Creation.svg',
  featureDedicatedManager: '/images/Individual-features/Dedicated Account Manager.svg',
  featureWithdraw: '/images/Individual-features/Withdraw.svg',
  featureAcceptPayments: '/images/Individual-features/Accept Payment.svg',
  featuresSectionBg: '/images/about/individual features background.png',
  // Corporate features images
  corpBg: '/images/Corporate-features/Background.png',
  corpInstantPayments: '/images/Corporate-features/Instant Payments.svg',
  corpExchange: '/images/Corporate-features/Exchange.svg',
  corpFastAccount: '/images/Corporate-features/Fast Account Creation.svg',
  corpDedicatedManager: '/images/Corporate-features/Dedicated Account Manager.svg',
  corpWithdraw: '/images/Corporate-features/Withdraw.svg',
  corpAcceptPayments: '/images/Corporate-features/Accept Payments.svg',
  // Stepper images (Security section)
  stepperAccountProtection: '/images/Stepper/Account Protection.png',
  stepperComplianceKyc: '/images/Stepper/Compliance & KYC.png',
  stepperSecurePayments: '/images/Stepper/Secure Payments.png',
  stepperTrustedInfrastructure: '/images/Stepper/Trusted infrascrutcture.png',
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
