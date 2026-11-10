/**
 * Design tokens for Jay Media Management Pvt. Ltd.
 * Product identity: The Light Table — warm paper, forest ink, terracotta signal.
 * These values mirror the CSS custom properties declared in globals.css.
 */

export const colors = {
  // Paper & Stone surfaces
  paper: '#FAF9F6',
  paperDeep: '#ECEBE7',
  cream: '#FFFFFF',
  card: '#FFFFFF',
  sand: '#E3E3E1',

  // Ink
  ink: '#0F1A15',
  inkSoft: '#263830',
  muted: '#4C5B53',
  faint: '#5F6E66',

  // Brand Emerald & Gold Signal
  accent: '#01402B',
  accentHover: '#02593C',
  accentSoft: '#E4EFE9',
  forest: '#01402B',
  forestSoft: '#E3EBE5',
  gold: '#D9B15B',

  // Lines & states
  line: 'rgba(1, 64, 43, 0.13)',
  lineStrong: 'rgba(1, 64, 43, 0.28)',
  lineSoft: 'rgba(1, 64, 43, 0.065)',
  danger: '#A8341D',
  success: '#01402B',
} as const;

export const fonts = {
  display: '"Fraunces", "Rubik", Georgia, serif',
  sans: '"Rubik", "Instrument Sans", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
  mono: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',
} as const;

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '24px',
  6: '32px',
  7: '48px',
  8: '64px',
  9: '96px',
} as const;

export const radius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  pill: '999px',
} as const;

export const motion = {
  duration: {
    instant: '200ms',
    fast: '380ms',
    reveal: '900ms',
    media: '1500ms',
    page: '650ms',
    // Numeric durations consumed by the anime.js presets.
    sectionEntrance: 650,
    textReveal: 650,
    imageReveal: 850,
  },
  easing: {
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
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
