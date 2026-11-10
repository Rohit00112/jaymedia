'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import anime from 'animejs';
import { cn, prefersReducedMotion } from '@/lib/utils';

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

/**
 * Minimal 3D spatial tilt container with anime.js spring reset.
 */
export default function Tilt3D({
  children,
  className,
  maxTilt = 6,
  scale = 1.012,
  glare = true,
}: Tilt3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion() || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;

    anime.remove(cardRef.current);
    cardRef.current.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(
      2
    )}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`;

    if (glareRef.current) {
      glareRef.current.style.opacity = '1';
      glareRef.current.style.background = `radial-gradient(circle at ${(
        x * 100
      ).toFixed(1)}% ${(y * 100).toFixed(
        1
      )}%, rgba(255,255,255,0.22), transparent 60%)`;
    }
  }

  function handleMouseLeave() {
    if (!cardRef.current) return;
    anime({
      targets: cardRef.current,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 700,
      easing: 'easeOutElastic(1, .6)',
      update: () => {
        if (cardRef.current && !cardRef.current.style.transform.includes('perspective')) {
          cardRef.current.style.transform = `perspective(1100px) ${cardRef.current.style.transform}`;
        }
      },
      complete: () => {
        if (cardRef.current) {
          cardRef.current.style.transform =
            'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
      },
    });
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'box-shadow 300ms ease',
      }}
      className={cn('relative', className)}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300"
        />
      )}
    </div>
  );
}

