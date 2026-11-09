'use client';

import { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from '@/hooks';
import { textReveal } from '@/lib/motion';
import { cn } from '@/lib/utils';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

interface TextRevealProps {
  text: string;
  as?: HeadingTag;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function TextReveal({
  text,
  as: Tag = 'h2',
  className,
  delay = 0,
  stagger = 60,
}: TextRevealProps) {
  const { ref, isInView } = useInView({ once: true, threshold: 0.15 });
  const reducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const words = text.split(' ');

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    if (reducedMotion) {
      wordsRef.current.forEach((el) => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
      return;
    }

    const targets = wordsRef.current.filter(Boolean);
    if (targets.length > 0) {
      textReveal(targets, { delay, stagger });
    }
  }, [isInView, delay, stagger, reducedMotion]);

  return (
    <Tag ref={ref as unknown as React.Ref<never>} className={cn(className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="word-mask"
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
          }}
        >
          <span
            ref={(el) => {
              if (el) wordsRef.current[i] = el;
            }}
            style={{
              display: 'inline-block',
              opacity: reducedMotion ? 1 : 0,
              transform: reducedMotion ? 'translateY(0)' : 'translateY(100%)',
              willChange: 'opacity, transform',
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
