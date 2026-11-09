'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star, Users, MapPin } from 'lucide-react';
import { useInView, useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

export default function LittleKoshiFeature() {
  const { ref: containerRef, isInView } = useInView({ threshold: 0.2, once: true });
  const reducedMotion = useReducedMotion();
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotion) {
      if (leftColRef.current) leftColRef.current.style.opacity = '1';
      if (rightColRef.current) rightColRef.current.style.opacity = '1';
      return;
    }

    const tl = anime.timeline({ easing: 'easeOutCubic' });

    tl.add({
      targets: leftColRef.current,
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 700,
    }).add(
      {
        targets: rightColRef.current,
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 700,
      },
      '-=500'
    );
  }, [isInView, reducedMotion]);

  return (
    <section
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative bg-ink text-white py-28 lg:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-divider"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-coral/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase */}
          <div ref={leftColRef} className="lg:col-span-6" style={{ opacity: 0 }}>
            <div className="relative aspect-[4/3] bg-dark-surface border border-white/10 p-8 sm:p-12 flex flex-col justify-between overflow-hidden group shadow-2xl">
              {/* Graphic background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A24] via-dark-surface to-[#121217]" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-coral/10 rounded-full blur-2xl" />

              {/* Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-coral/20 border border-coral/40 text-coral text-xs uppercase font-display tracking-widest">
                  <Star className="w-3.5 h-3.5 fill-coral" />
                  Youth Stage Production
                </span>
                <span className="text-white/40 text-xs font-display uppercase tracking-widest">
                  Biratnagar • Nepal
                </span>
              </div>

              {/* Center quote */}
              <div className="relative z-10 my-8">
                <p className="font-display text-2xl sm:text-3xl text-white font-medium leading-snug">
                  &ldquo;A platform where young talent discovers courage, poise, and unshakeable confidence.&rdquo;
                </p>
                <p className="mt-3 text-xs uppercase tracking-widest text-muted-grey font-display">
                  — Jay Media Management Children&apos;s Division
                </p>
              </div>

              {/* Footnote badge */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-coral" /> Auditions: Biratnagar • Itahari • Dharan
                </span>
                <span className="font-display text-coral uppercase tracking-widest">
                  7+ Seasons Completed
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial narrative */}
          <div ref={rightColRef} className="lg:col-span-6 flex flex-col justify-center" style={{ opacity: 0 }}>
            <span className="section-label text-coral font-medium tracking-[0.25em] mb-4 block">
              FLAGSHIP CHILDREN&apos;S SHOWCASE
            </span>

            <h2 className="editorial-headline text-white text-4xl sm:text-5xl lg:text-6xl mb-6">
              EVERY STAR BEGINS WITH A STAGE.
            </h2>

            <div className="space-y-4 text-muted-grey text-base sm:text-lg font-body leading-relaxed mb-8">
              <p>
                <strong className="text-white font-medium">Mr. and Miss Little Koshi</strong> is Eastern
                Nepal&apos;s celebrated annual pageant engineered specifically to nurture confidence, stage presence,
                and personal expression in children and youth.
              </p>
              <p className="text-sm sm:text-base text-muted-grey/90">
                Over multiple successful editions, the competition has mobilized hundreds of children across
                Biratnagar, Itahari, and Dharan through rigorous grooming, public speaking clinics, and personality
                workshops led by seasoned mentors before culminating in a televised grand finale.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/10 mb-8">
              <div>
                <span className="text-3xl sm:text-4xl font-display font-bold text-coral block">
                  7+
                </span>
                <span className="text-xs font-display text-muted-grey uppercase tracking-wider block mt-1">
                  Seasons
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-display font-bold text-coral block">
                  3
                </span>
                <span className="text-xs font-display text-muted-grey uppercase tracking-wider block mt-1">
                  Hub Cities
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-display font-bold text-coral block">
                  100s
                </span>
                <span className="text-xs font-display text-muted-grey uppercase tracking-wider block mt-1">
                  Alumni
                </span>
              </div>
            </div>

            <div>
              <Link
                href="/events/mr-and-miss-little-koshi"
                className="group inline-flex items-center gap-3 text-sm font-display font-semibold uppercase tracking-widest text-white hover:text-coral transition-colors duration-300"
              >
                <span>Explore Seasons &amp; Past Winners</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform text-coral" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
