'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface RevealImageProps {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: boolean;
  delay?: number;
}

export default function RevealImage({
  src,
  alt,
  aspect = 'aspect-[4/3]',
  className,
  imageClassName,
  sizes = '100vw',
  priority = false,
  delay = 0,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(priority);

  useEffect(() => {
    if (priority || reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, reducedMotion]);

  const visible = priority || reducedMotion || inView;

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden bg-paper-deep',
        aspect,
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(1.04)',
          transitionProperty: 'opacity, transform',
          transitionDuration: '700ms',
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDelay: delay ? `${delay}s` : undefined,
        }}
        className={cn('object-cover', imageClassName)}
      />
    </div>
  );
}
