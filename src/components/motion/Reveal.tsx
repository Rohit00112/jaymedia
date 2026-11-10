'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  threshold?: number;
  style?: CSSProperties;
}

export default function Reveal({
  as: Tag = 'div',
  children,
  className,
  delay = 0,
  y = 18,
  once = true,
  threshold = 0.08,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -32px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [once, threshold, reducedMotion]);

  const visible = reducedMotion || inView;

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${y}px, 0)`,
        transitionProperty: 'opacity, transform',
        transitionDuration: '580ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: delay ? `${delay}s` : undefined,
        willChange: visible ? 'auto' : 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
