'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
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

/**
 * A small, dependency-free reveal primitive.
 * The `js` class on <html> is set before paint, so content stays visible
 * when JavaScript is unavailable or fails.
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
  threshold = 0.12,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn('reveal', visible && 'is-visible', className)}
      style={
        {
          ...style,
          '--reveal-delay': `${delay}ms`,
          '--reveal-y': `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
