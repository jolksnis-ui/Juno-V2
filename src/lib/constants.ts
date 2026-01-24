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

/** Micro-interaction animation durations in seconds */
export const ANIMATION_MICRO = {
  fast: 0.2,
  medium: 0.3,
  slow: 0.4,
} as const;

/** Stagger animation delays in seconds */
export const ANIMATION_DELAYS = {
  small: 0.05,
  medium: 0.1,
  large: 0.2,
  xlarge: 0.3,
} as const;

/** Auto-rotation interval for carousels (ms) */
export const AUTO_ROTATE_INTERVAL = 5000;

/** Update interval for Singapore time display (ms) */
export const TIME_UPDATE_INTERVAL = 60000;

/** Container max width used across sections */
export const CONTAINER_MAX_WIDTH = '1392px';

/** Max-width values for various components */
export const MAX_WIDTHS = {
  sectionHeader: '600px',
  faqAnswer: '800px',
  leadershipGrid: '1256px',
  section: '1440px',
  email: '600px',
} as const;

/** Component dimensions */
export const DIMENSIONS = {
  buttonHeight: '52px',
  tabButtonWidth: '172px',
  dotPatternSize: '156px',
  singaporeTimeWidth: '275px',
} as const;

/** Row heights for expandable feature lists */
export const ROW_HEIGHT = {
  active: 140,
  inactive: 84,
  securityActive: 210,
  securityInactive: 100,
} as const;

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
  everydayBankingHero: '/images/everyday-banking-hero.jpg',
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
  // Stepper images - Mobile versions
  stepperAccountProtectionMobile: '/images/Stepper/AccountProtection(M).png',
  stepperComplianceMobile: '/images/Stepper/Compliance(M).png',
  stepperSecurePaymentsMobile: '/images/Stepper/SecurePay(M).png',
  stepperTrustedInfrastructureMobile: '/images/Stepper/TrustedInfra(M).png',
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

/** Validation limits for form fields */
export const VALIDATION_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  phoneMax: 30,
  messageMin: 10,
  messageMax: 5000,
} as const;

/** Email template color palette */
export const EMAIL_COLORS = {
  text: '#18181B',
  textSecondary: '#70707B',
  border: '#E4E4E7',
  background: '#F4F4F5',
  footer: '#A0A0AB',
} as const;
