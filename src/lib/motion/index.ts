/**
 * Anime.js motion utilities for Jay Media Management.
 * Centralized animation presets respecting reduced-motion preferences.
 */
import anime from 'animejs';
import { prefersReducedMotion } from '@/lib/utils';
import { motion as motionTokens } from '@/config/design-tokens';

// ─── Easing Presets ────────────────────────────────────────
export const EASING = {
  smooth: 'cubicBezier(0.33, 0, 0.2, 1)',
  entrance: 'cubicBezier(0.0, 0.0, 0.2, 1)',
  exit: 'cubicBezier(0.4, 0.0, 1, 1)',
  dramatic: 'cubicBezier(0.16, 1, 0.3, 1)',
  spring: 'spring(1, 80, 10, 0)',
} as const;

// ─── Duration Presets ──────────────────────────────────────
export const DURATION = motionTokens.duration;

// ─── Safe Animate ──────────────────────────────────────────
// Wraps anime() to skip or shorten animations when reduced motion is preferred.
type AnimeParams = Parameters<typeof anime>[0];

export function safeAnimate(params: AnimeParams): ReturnType<typeof anime> | null {
  if (prefersReducedMotion()) {
    // Immediately set end state for reduced motion
    if (typeof params === 'object' && params !== null) {
      const targets = (params as Record<string, unknown>).targets;
      if (targets) {
        const animeParams = params as Record<string, unknown>;
        return anime({
          ...animeParams,
          duration: 0,
          delay: 0,
        });
      }
    }
    return null;
  }
  return anime(params);
}

// ─── Animation Presets ─────────────────────────────────────

/** Fade in and slide up */
export function fadeInUp(
  targets: string | Element | Element[] | NodeListOf<Element>,
  options: { delay?: number; duration?: number; distance?: number; stagger?: number } = {}
) {
  const { delay = 0, duration = DURATION.sectionEntrance, distance = 40, stagger = 0 } = options;
  return safeAnimate({
    targets,
    opacity: [0, 1],
    translateY: [distance, 0],
    duration,
    delay: stagger ? anime.stagger(stagger, { start: delay }) : delay,
    easing: EASING.dramatic,
  });
}

/** Fade in only */
export function fadeIn(
  targets: string | Element | Element[] | NodeListOf<Element>,
  options: { delay?: number; duration?: number } = {}
) {
  const { delay = 0, duration = DURATION.sectionEntrance } = options;
  return safeAnimate({
    targets,
    opacity: [0, 1],
    duration,
    delay,
    easing: EASING.entrance,
  });
}

/** Text reveal — word by word */
export function textReveal(
  targets: string | Element | Element[] | NodeListOf<Element>,
  options: { delay?: number; duration?: number; stagger?: number } = {}
) {
  const { delay = 0, duration = DURATION.textReveal, stagger = 60 } = options;
  return safeAnimate({
    targets,
    opacity: [0, 1],
    translateY: ['100%', '0%'],
    duration,
    delay: anime.stagger(stagger, { start: delay }),
    easing: EASING.dramatic,
  });
}

/** Image reveal with clip path */
export function imageReveal(
  targets: string | Element | Element[] | NodeListOf<Element>,
  options: { delay?: number; duration?: number; direction?: 'left' | 'bottom' | 'right' } = {}
) {
  const { delay = 0, duration = DURATION.imageReveal, direction = 'left' } = options;
  const clipFrom =
    direction === 'left'
      ? 'inset(0 100% 0 0)'
      : direction === 'right'
        ? 'inset(0 0 0 100%)'
        : 'inset(100% 0 0 0)';
  return safeAnimate({
    targets,
    clipPath: [clipFrom, 'inset(0 0 0 0)'],
    duration,
    delay,
    easing: EASING.dramatic,
  });
}

/** Subtle scale animation */
export function scaleIn(
  targets: string | Element | Element[] | NodeListOf<Element>,
  options: { delay?: number; duration?: number; from?: number } = {}
) {
  const { delay = 0, duration = DURATION.imageReveal, from = 1.15 } = options;
  return safeAnimate({
    targets,
    scale: [from, 1],
    opacity: [0, 1],
    duration,
    delay,
    easing: EASING.dramatic,
  });
}

/** Staggered children entrance */
export function staggerEntrance(
  targets: string | Element | Element[] | NodeListOf<Element>,
  options: { delay?: number; duration?: number; stagger?: number } = {}
) {
  const { delay = 0, duration = DURATION.sectionEntrance, stagger = 80 } = options;
  return safeAnimate({
    targets,
    opacity: [0, 1],
    translateY: [30, 0],
    duration,
    delay: anime.stagger(stagger, { start: delay }),
    easing: EASING.dramatic,
  });
}

/** Line draw animation for SVGs */
export function drawLine(
  targets: string | Element | Element[] | NodeListOf<Element>,
  options: { delay?: number; duration?: number } = {}
) {
  const { delay = 0, duration = 1200 } = options;
  return safeAnimate({
    targets,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration,
    delay,
    easing: EASING.smooth,
  });
}
