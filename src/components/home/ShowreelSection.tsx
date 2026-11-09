'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import Image from 'next/image';
import { Play, X, ExternalLink } from 'lucide-react';
import { useInView, useReducedMotion, useEscapeKey, useBodyLock } from '@/hooks';

export default function ShowreelSection() {
  const { ref: containerRef, isInView } = useInView({ threshold: 0.15, once: true });
  const reducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const reelBoxRef = useRef<HTMLDivElement>(null);

  useEscapeKey(() => setIsOpen(false), isOpen);
  useBodyLock(isOpen);

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotion) {
      if (headerRef.current) headerRef.current.style.opacity = '1';
      if (reelBoxRef.current) reelBoxRef.current.style.opacity = '1';
      return;
    }

    const tl = anime.timeline({ easing: 'easeOutCubic' });

    tl.add({
      targets: headerRef.current,
      opacity: [0, 1],
      translateY: [25, 0],
      duration: 600,
    }).add(
      {
        targets: reelBoxRef.current,
        opacity: [0, 1],
        scale: [0.97, 1],
        duration: 800,
      },
      '-=300'
    );
  }, [isInView, reducedMotion]);

  return (
    <section
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative bg-[#FAFAF8] text-[#101014] py-28 lg:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-black/10 font-rubik"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16" style={{ opacity: 0 }}>
          <span className="section-label text-coral font-medium tracking-[0.2em] mb-4 block">
            CINEMATIC SHOWREEL
          </span>
          <h2 className="editorial-headline text-[#101014] text-4xl sm:text-5xl lg:text-7xl mb-6 font-rubik">
            A GLIMPSE INTO WHAT WE CREATE.
          </h2>
          <p className="text-[#4A4A52] text-base sm:text-lg font-rubik">
            Experience the energy, choreography, and emotion captured live across our stage productions and grand finales.
          </p>
        </div>

        {/* Video Thumbnail Screen */}
        <div
          ref={reelBoxRef}
          className="relative aspect-video max-w-5xl mx-auto bg-[#0c0c11] overflow-hidden border border-white/10 rounded-[10px] group cursor-pointer shadow-2xl"
          onClick={() => setIsOpen(true)}
          style={{ opacity: 0 }}
        >
          {/* Real concert & stage production stock backdrop */}
          <Image
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80"
            alt="Jay Media live concert and stage production showreel"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
          {/* Backdrop Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 z-10 pointer-events-none" />

          {/* Video Metadata Overlay */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-coral animate-ping" />
            <span className="text-xs uppercase font-rubik tracking-wider text-white font-medium">
              Jay Media Production Reel
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between text-xs text-[#eef9ff]/70 font-rubik">
            <span>Official Channel: Jay Media Management Pvt. Ltd.</span>
            <span className="text-coral flex items-center gap-1 font-medium">
              Click to Play Broadcast <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Central Play Button */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-coral/30 animate-ping duration-1000" />
              {/* Main Button */}
              <button
                type="button"
                aria-label="Play showreel video"
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-coral flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-coral-hover transition-all duration-300"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Video Player */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div className="relative w-full max-w-5xl aspect-video bg-black border border-white/10 rounded-[10px] shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close video player"
              className="absolute -top-12 right-0 text-white hover:text-coral transition-colors flex items-center gap-2 text-xs font-rubik uppercase tracking-wider"
            >
              <span>Close</span>
              <X className="w-6 h-6" />
            </button>

            {/* Embedded YouTube / Video Player */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed?listType=search&list=Jay+Media+Management+Biratnagar+Nepal&autoplay=1"
              title="Jay Media Management Official Productions"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}

