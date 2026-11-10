'use client';

import {
  Children,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useReducedMotion } from '@/hooks';
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
  delay = 0,
  distance = 20,
  duration = 560,
  direction = 'up',
}: AnimeStaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.06,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [reducedMotion]);

  const visible = reducedMotion || inView;
  const items = Children.toArray(children);

  return (
    <div ref={containerRef} className={cn(className)}>
      {items.map((child, idx) => {
        const itemDelay = delay + idx * stagger;
        const hiddenTransform =
          direction === 'left'
            ? `translate3d(${distance}px, 0, 0)`
            : `translate3d(0, ${distance}px, 0)`;

        return (
          <div
            key={idx}
            className="flex flex-col [&>*]:flex-1"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translate3d(0, 0, 0)' : hiddenTransform,
              transitionProperty: 'opacity, transform',
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: `${itemDelay}ms`,
              willChange: visible ? 'auto' : 'opacity, transform',
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
