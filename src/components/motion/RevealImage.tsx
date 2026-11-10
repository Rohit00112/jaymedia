'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
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

/**
 * Image wrapper with a clip-path entrance and a gentle internal scale.
 * Parallax uses native scroll-driven animation where the browser supports it.
 */
export default function RevealImage({
  src,
  alt,
  aspect = 'aspect-[4/3]',
  className,
  imageClassName,
  sizes = '100vw',
  priority = false,
  parallax = false,
  delay = 0,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
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

    // Never leave above-the-fold media clipped while waiting for the observer.
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.98 && rect.bottom > 0) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden bg-sand',
        aspect,
        className
      )}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {/* The observer watches this unclipped frame; clipping the same element
          would collapse its intersection rect and the reveal would never fire. */}
      <div
        className={cn(
          'media-reveal absolute inset-0 overflow-hidden',
          visible && 'is-visible'
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            'media-reveal-img object-cover',
            parallax && 'parallax-img',
            imageClassName
          )}
        />
      </div>
    </div>
  );
}
