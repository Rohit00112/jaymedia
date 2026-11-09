/**
 * Design tokens for Jay Media Management Pvt. Ltd.
 * Centralized theme values — colors, typography, spacing, motion, radius.
 * Official token specification from DESIGN.md.
 */

export const colors = {
  // Brand cinematic palette
  ink: '#101014',
  darkSurface: '#1B1B21',
  warmIvory: '#F5F2EC',
  coral: '#FF594F',
  mutedGrey: '#99979A',
  white: '#FFFFFF',

  // Official Dashboard Surface & Text Tokens
  surfaceBase: '#000000',
  surfaceMuted: '#e3e3e1',
  textPrimary: '#ffffff',
  textSecondary: '#eef9ff',
  textTertiary: '#01402b',

  // Interactive Accents
  coralHover: '#E84D43',
  coralLight: 'rgba(255, 89, 79, 0.12)',
  overlay: 'rgba(16, 16, 20, 0.65)',
  overlayHeavy: 'rgba(16, 16, 20, 0.85)',
  divider: 'rgba(153, 151, 154, 0.2)',
} as const;

export const fonts = {
  primary: '"Rubik", sans-serif',
  display: '"Space Grotesk", sans-serif',
  body: '"DM Sans", sans-serif',
  sizes: {
    xs: '14px',
    sm: '16px',
    md: '18px',
    lg: '20px',
    xl: '28px',
    '2xl': '32px',
  },
  lineHeights: {
    base: '24px',
  },
  weights: {
    base: 400,
  },
} as const;

export const spacing = {
  1: '4px',
  2: '5px',
  3: '6px',
  4: '8px',
  5: '10px',
  6: '16px',
  7: '24px',
  8: '25px',
} as const;

export const radius = {
  xs: '2px',
  sm: '10px',
  md: '50px',
} as const;

export const motion = {
  duration: {
    instant: '300ms',
    fast: '500ms',
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
export type Spacing = typeof spacing;
export type Radius = typeof radius;
