'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

import HeroScene from '@/components/three/HeroScene';

const HEADLINE_WORDS = ['WE', 'CREATE', 'MOMENTS', 'THAT', 'MOVE', 'PEOPLE.'];

export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      // Immediately show everything
      const targets = [
        overlayRef.current,
        labelRef.current,
        supportRef.current,
        ctaRef.current,
        scrollRef.current,
      ];
      targets.forEach((el) => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
      // Reveal headline words
      if (headlineRef.current) {
        const wordSpans = headlineRef.current.querySelectorAll('.word-mask span');
        wordSpans.forEach((span) => {
          (span as HTMLElement).style.opacity = '1';
          (span as HTMLElement).style.transform = 'none';
        });
      }
      // Show CTA buttons
      if (ctaRef.current) {
        const buttons = ctaRef.current.children;
        Array.from(buttons).forEach((btn) => {
          (btn as HTMLElement).style.opacity = '1';
          (btn as HTMLElement).style.transform = 'none';
        });
      }
      return;
    }

    // Set initial states
    if (overlayRef.current) {
      overlayRef.current.style.opacity = '0.95';
    }
    if (labelRef.current) {
      labelRef.current.style.opacity = '0';
      labelRef.current.style.transform = 'translateY(20px)';
    }
    if (supportRef.current) {
      supportRef.current.style.opacity = '0';
      supportRef.current.style.transform = 'translateY(16px)';
    }
    if (ctaRef.current) {
      const buttons = ctaRef.current.children;
      Array.from(buttons).forEach((btn) => {
        (btn as HTMLElement).style.opacity = '0';
        (btn as HTMLElement).style.transform = 'translateY(20px)';
      });
    }
    if (scrollRef.current) {
      scrollRef.current.style.opacity = '0';
    }

    const tl = anime.timeline({ easing: 'easeOutCubic' });

    // 1. Overlay fades down
    tl.add({
      targets: overlayRef.current,
      opacity: [0.95, 0.65],
      duration: 600,
    }, 0);

    // 2. Label fades in + slides up
    tl.add({
      targets: labelRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 500,
    }, 200);

    // 3. Headline words reveal
    if (headlineRef.current) {
      const wordSpans = headlineRef.current.querySelectorAll('.word-mask span');
      tl.add({
        targets: wordSpans,
        opacity: [0, 1],
        translateY: ['100%', '0%'],
        duration: 600,
        delay: anime.stagger(50),
      }, 400);
    }

    // 4. Supporting text fades in
    tl.add({
      targets: supportRef.current,
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 500,
    }, 800);

    // 5. CTA buttons stagger in
    if (ctaRef.current) {
      tl.add({
        targets: ctaRef.current.children,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        delay: anime.stagger(100),
      }, 1000);
    }

    // 6. Scroll indicator fades in
    tl.add({
      targets: scrollRef.current,
      opacity: [0, 1],
      duration: 400,
    }, 1400);

    return () => {
      tl.pause();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background gradient placeholder ───────────────── */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-ink via-dark-surface to-ink"
        aria-hidden="true"
      />

      {/* ── Three.js atmosphere ───────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HeroScene />
      </div>

      {/* ── Dark gradient overlay ─────────────────────────── */}
      <div
        ref={overlayRef}
        className={cn(
          'absolute inset-0 z-[1]',
          'bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80'
        )}
        aria-hidden="true"
      />

      {/* ── Content ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-10 font-rubik">
        {/* Label & Prestige Badge */}
        <div
          ref={labelRef}
          className="flex flex-col sm:flex-row items-center gap-3 mb-6 md:mb-8"
        >
          <span className="px-3.5 py-1 bg-[#01402b]/90 border border-[#01402b] text-[#eef9ff] text-xs font-rubik font-medium tracking-widest uppercase rounded-[50px] shadow-sm">
            Koshi Province • Biratnagar
          </span>
          <span className="section-label text-coral font-medium tracking-[0.2em]">
            CREATIVE PRODUCTION &amp; EVENT MANAGEMENT
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className={cn(
            'editorial-headline text-white font-rubik',
            'text-5xl md:text-7xl lg:text-8xl xl:text-9xl',
            'max-w-6xl mb-6 md:mb-8'
          )}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span key={i} className="word-mask mr-[0.25em] last:mr-0">
              <span>{word}</span>
            </span>
          ))}
        </h1>

        {/* Supporting text */}
        <p
          ref={supportRef}
          className="text-lg md:text-xl text-[#eef9ff]/90 max-w-xl font-rubik mb-10 md:mb-12 font-normal leading-relaxed"
        >
          Turning ambitious ideas into extraordinary experiences.
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/events"
            className={cn(
              'inline-flex items-center justify-center',
              'bg-coral text-white font-rubik font-medium',
              'text-sm tracking-wider uppercase',
              'px-8 py-4 rounded-[50px]',
              'transition-all duration-300 shadow-lg',
              'hover:bg-coral-hover hover:scale-[1.03] hover:brightness-110',
              'focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-black'
            )}
          >
            Explore Our Work
          </Link>
          <Link
            href="/contact"
            className={cn(
              'inline-flex items-center justify-center',
              'bg-transparent border border-[#eef9ff]/40 text-[#eef9ff] font-rubik font-medium',
              'text-sm tracking-wider uppercase',
              'px-8 py-4 rounded-[50px]',
              'transition-all duration-300',
              'hover:bg-white/10 hover:border-white hover:scale-[1.03]',
              'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'
            )}
          >
            Let&apos;s Collaborate
          </Link>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-[10px] font-display tracking-[0.3em] uppercase">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-white/50 animate-bounce" />
      </div>
    </section>
  );
}
