'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import anime from 'animejs';
import { useInView, useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface AnimeStaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  distance?: number;
  duration?: number;
  direction?: 'up' | 'left';
}

export default function AnimeStaggerContainer({
  children,
  className,
  stagger = 85,
  delay = 40,
  distance = 26,
  duration = 750,
  direction = 'up',
}: AnimeStaggerContainerProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    once: true,
    threshold: 0.12,
  });
  const reducedMotion = useReducedMotion();
  const hasPlayed = useRef(false);

  useEffect(() => {
    const container = ref.current;
    if (!container || !isInView || hasPlayed.current) return;
    hasPlayed.current = true;

    const items = Array.from(container.children) as HTMLElement[];
    if (items.length === 0) return;

    if (reducedMotion) {
      items.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const anim = anime({
      targets: items,
      opacity: [0, 1],
      translateY: direction === 'up' ? [distance, 0] : 0,
      translateX: direction === 'left' ? [-distance, 0] : 0,
      duration,
      delay: anime.stagger(stagger, { start: delay }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    });

    return () => anim.pause();
  }, [isInView, stagger, delay, distance, duration, direction, reducedMotion, ref]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
