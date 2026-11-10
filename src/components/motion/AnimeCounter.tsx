'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useInView, useReducedMotion } from '@/hooks';

interface AnimeCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  formatLocale?: boolean;
  duration?: number;
  className?: string;
}

export default function AnimeCounter({
  target,
  prefix = '',
  suffix = '',
  decimals = 0,
  formatLocale = true,
  duration = 1400,
  className,
}: AnimeCounterProps) {
  const { ref, isInView } = useInView<HTMLSpanElement>({
    once: true,
    threshold: 0.25,
  });
  const reducedMotion = useReducedMotion();
  const hasPlayed = useRef(false);

  const formatValue = (num: number) => {
    const fixed = decimals > 0 ? Number(num.toFixed(decimals)) : Math.round(num);
    const formatted = formatLocale
      ? fixed.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : String(fixed);
    return `${prefix}${formatted}${suffix}`;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || !isInView || hasPlayed.current) return;
    hasPlayed.current = true;

    if (reducedMotion) {
      el.textContent = formatValue(target);
      return;
    }

    const tracker = { value: 0 };
    const anim = anime({
      targets: tracker,
      value: target,
      duration,
      easing: 'easeOutExpo',
      update: () => {
        if (ref.current) {
          ref.current.textContent = formatValue(tracker.value);
        }
      },
    });

    return () => anim.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, target, reducedMotion, duration]);

  return (
    <span ref={ref} className={className}>
      {formatValue(target)}
    </span>
  );
}
