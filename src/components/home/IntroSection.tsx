'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView, useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

export default function IntroSection() {
  const { ref: containerRef, isInView } = useInView({ threshold: 0.2, once: true });
  const reducedMotion = useReducedMotion();
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotion) {
      [labelRef.current, headlineRef.current, textRef.current, imageRef.current, linkRef.current].forEach(
        (el) => {
          if (el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        }
      );
      return;
    }

    const tl = anime.timeline({ easing: 'easeOutCubic' });

    tl.add({
      targets: labelRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 500,
    })
      .add(
        {
          targets: headlineRef.current,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 700,
        },
        '-=300'
      )
      .add(
        {
          targets: textRef.current,
          opacity: [0, 1],
          translateY: [25, 0],
          duration: 650,
        },
        '-=400'
      )
      .add(
        {
          targets: linkRef.current,
          opacity: [0, 1],
          translateX: [-15, 0],
          duration: 500,
        },
        '-=350'
      )
      .add(
        {
          targets: imageRef.current,
          opacity: [0, 1],
          scale: [0.95, 1],
          duration: 900,
          easing: 'easeOutQuart',
        },
        '-=700'
      );
  }, [isInView, reducedMotion]);

  return (
    <section
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative bg-warm-ivory text-ink py-28 lg:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-divider"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span
              ref={labelRef}
              className="section-label mb-6 text-coral font-medium tracking-[0.25em]"
              style={{ opacity: 0 }}
            >
              ABOUT JAY MEDIA MANAGEMENT
            </span>

            <h2
              ref={headlineRef}
              className="editorial-headline text-ink text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-8 leading-[0.95]"
              style={{ opacity: 0 }}
            >
              CREATIVITY MEETS EXTRAORDINARY EXECUTION.
            </h2>

            <div
              ref={textRef}
              className="space-y-6 text-ink/80 text-lg md:text-xl font-body leading-relaxed max-w-2xl"
              style={{ opacity: 0 }}
            >
              <p>
                Headquartered near Traffic Chowk in Biratnagar, Nepal,{' '}
                <strong className="text-ink font-semibold">Jay Media Management Pvt. Ltd.</strong> is a
                pioneering media production and event management agency led by Chairperson Jay Raj Rai and CEO
                Nisha Khatiwada Rai.
              </p>
              <p className="text-base md:text-lg text-ink/70">
                We conceptualize, engineer, and orchestrate iconic stage productions, regional pageants, and high-impact
                corporate experiences across the Koshi Province and nationwide. We do not just build stages — we curate
                unforgettable cultural milestones.
              </p>
            </div>

            <div className="mt-10">
              <Link
                ref={linkRef}
                href="/about"
                className="group inline-flex items-center gap-3 text-sm font-display font-semibold uppercase tracking-widest text-ink hover:text-coral transition-colors duration-300"
                style={{ opacity: 0 }}
              >
                <span>Discover Our Story & Leadership</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 text-coral" />
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] bg-dark-surface overflow-hidden shadow-2xl border border-ink/10"
              style={{ opacity: 0 }}
            >
              {/* Graphic background composition with rich ambient lighting */}
              <div className="absolute inset-0 bg-gradient-to-tr from-ink via-dark-surface to-[#2A2A35]" />
              
              {/* Subtle visual grid & watermark */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF594F_1px,transparent_1px)] [background-size:24px_24px]" />

              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase tracking-widest font-display text-white/50">
                    Biratnagar • Nepal
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-coral animate-pulse" />
                </div>

                <div className="space-y-3">
                  <div className="inline-block px-3 py-1 bg-coral/20 border border-coral/40 text-coral text-xs uppercase tracking-widest font-display">
                    Established Agency
                  </div>
                  <h3 className="text-2xl font-display text-white font-semibold leading-tight">
                    East Nepal&apos;s Flagship Stage Production House
                  </h3>
                  <p className="text-sm text-white/60 font-body">
                    Organizers of Miss Koshi &amp; Mr. and Miss Little Koshi grand pageants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
