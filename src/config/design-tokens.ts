/**
 * Design tokens for Jay Media Management.
 * Centralized theme values — colors, typography, spacing, motion.
 */

export const colors = {
  ink: '#101014',
  darkSurface: '#1B1B21',
  warmIvory: '#F5F2EC',
  coral: '#FF594F',
  mutedGrey: '#99979A',
  white: '#FFFFFF',
  // Extended palette
  coralHover: '#E84D43',
  coralLight: 'rgba(255, 89, 79, 0.12)',
  overlay: 'rgba(16, 16, 20, 0.65)',
  overlayHeavy: 'rgba(16, 16, 20, 0.85)',
  divider: 'rgba(153, 151, 154, 0.2)',
} as const;

export const fonts = {
  display: '"Space Grotesk", sans-serif',
  body: '"DM Sans", sans-serif',
} as const;

export const motion = {
  duration: {
    buttonHover: 200,
    navigation: 250,
    textReveal: 650,
    imageReveal: 850,
    sectionEntrance: 650,
    projectTransition: 550,
    pageTransition: 350,
  },
  easing: {
    smooth: 'cubicBezier(0.33, 0, 0.2, 1)',
    entrance: 'cubicBezier(0.0, 0.0, 0.2, 1)',
    exit: 'cubicBezier(0.4, 0.0, 1, 1)',
    dramatic: 'cubicBezier(0.16, 1, 0.3, 1)',
    spring: 'spring(1, 80, 10, 0)',
  },
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Colors = typeof colors;
export type Motion = typeof motion;

