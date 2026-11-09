'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import anime from 'animejs';
import { useInView, useReducedMotion } from '@/hooks';
import { fadeInUp, fadeIn, scaleIn, EASING, DURATION } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Animation = 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight';

interface ScrollRevealProps {
  as?: ElementType;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
}

export default function ScrollReveal({
  as: Component = 'div',
  animation = 'fadeUp',
  delay = 0,
  duration = DURATION.sectionEntrance,
  className,
  children,
}: ScrollRevealProps) {
  const { ref, isInView } = useInView({ once: true, threshold: 0.15 });
  const reducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const el = ref.current;
    if (!el) return;

    // Reduced motion: show immediately
    if (reducedMotion) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    switch (animation) {
      case 'fadeUp':
        fadeInUp(el, { delay, duration });
        break;
      case 'fadeIn':
        fadeIn(el, { delay, duration });
        break;
      case 'scaleIn':
        scaleIn(el, { delay, duration, from: 0.95 });
        break;
      case 'slideLeft':
        anime({
          targets: el,
          opacity: [0, 1],
          translateX: [60, 0],
          duration,
          delay,
          easing: EASING.dramatic,
        });
        break;
      case 'slideRight':
        anime({
          targets: el,
          opacity: [0, 1],
          translateX: [-60, 0],
          duration,
          delay,
          easing: EASING.dramatic,
        });
        break;
    }
  }, [isInView, animation, delay, duration, reducedMotion, ref]);

  return (
    <Component
      ref={ref}
      className={cn(className)}
      style={{
        opacity: reducedMotion ? 1 : 0,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Component>
  );
}
