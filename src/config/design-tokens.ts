/**
 * Design tokens for Jay Media Management Pvt. Ltd.
 * Visual System: Swiss Broadcast Atelier — Gallery White, Cool Porcelain,
 * Deep Emerald (#01402B), Brushed Brass Gold (#C89B3C), and crisp Carbon Ink.
 */

export const colors = {
  // Architectural Daylight Gallery Surfaces
  paper: '#FFFFFF',
  paperDeep: '#F2F4F2',
  cream: '#FFFFFF',
  card: '#FFFFFF',
  sand: '#EAEDEA',

  // Carbon Ink
  ink: '#0C1410',
  inkSoft: '#223028',
  muted: '#4B5952',
  faint: '#64736B',

  // Brand Emerald & Brass Gold
  accent: '#01402B',
  accentHover: '#02593C',
  accentSoft: '#E3EEE8',
  forest: '#01402B',
  forestSoft: '#E3EEE8',
  gold: '#C89B3C',

  // Architectural Lines & Status
  line: 'rgba(12, 20, 16, 0.12)',
  lineStrong: 'rgba(12, 20, 16, 0.28)',
  lineSoft: 'rgba(12, 20, 16, 0.06)',
  danger: '#B83227',
  success: '#01402B',
} as const;

export const fonts = {
  display: '"Bricolage Grotesque", "Plus Jakarta Sans", sans-serif',
  sans: '"Plus Jakarta Sans", "Rubik", "Helvetica Neue", Arial, sans-serif',
  serif: '"Bricolage Grotesque", "Plus Jakarta Sans", sans-serif',
  mono: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace',
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
  sm: '2px',
  md: '4px',
  lg: '6px',
  pill: '999px',
} as const;

export const motion = {
  duration: {
    instant: '180ms',
    fast: '340ms',
    reveal: '750ms',
    media: '1200ms',
    page: '550ms',
    sectionEntrance: 600,
    textReveal: 600,
    imageReveal: 800,
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
