'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import anime from 'animejs';
import { useInView, useReducedMotion } from '@/hooks';
import { imageReveal, EASING, DURATION } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ImageRevealProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  direction?: 'left' | 'bottom' | 'right';
  delay?: number;
  priority?: boolean;
}

export default function ImageReveal({
  src,
  alt,
  width,
  height,
  className,
  direction = 'left',
  delay = 0,
  priority = false,
}: ImageRevealProps) {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });
  const reducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = ref.current;
    const img = imageRef.current;
    if (!container || !img) return;

    if (reducedMotion) {
      container.style.clipPath = 'inset(0 0 0 0)';
      img.style.transform = 'scale(1)';
      return;
    }

    // Clip-path reveal on the container
    imageReveal(container, { delay, direction });

    // Subtle scale animation on the inner image
    anime({
      targets: img,
      scale: [1.15, 1],
      duration: DURATION.imageReveal + 200,
      delay,
      easing: EASING.dramatic,
    });
  }, [isInView, delay, direction, reducedMotion, ref]);

  const initialClip =
    direction === 'left'
      ? 'inset(0 100% 0 0)'
      : direction === 'right'
        ? 'inset(0 0 0 100%)'
        : 'inset(100% 0 0 0)';

  return (
    <div
      ref={ref}
      className={cn('overflow-hidden', className)}
      style={{
        clipPath: reducedMotion ? 'inset(0 0 0 0)' : initialClip,
        willChange: 'clip-path',
      }}
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        style={{
          transform: reducedMotion ? 'scale(1)' : 'scale(1.15)',
          willChange: 'transform',
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
}
