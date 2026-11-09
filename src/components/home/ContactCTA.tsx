'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import Link from 'next/link';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { useInView, useReducedMotion } from '@/hooks';
import { siteConfig } from '@/config/site';

export default function ContactCTA() {
  const { ref: containerRef, isInView } = useInView({ threshold: 0.2, once: true });
  const reducedMotion = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotion) {
      if (contentRef.current) contentRef.current.style.opacity = '1';
      return;
    }

    anime({
      targets: contentRef.current,
      opacity: [0, 1],
      translateY: [35, 0],
      duration: 800,
      easing: 'easeOutCubic',
    });
  }, [isInView, reducedMotion]);

  return (
    <section
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative bg-warm-ivory text-ink py-28 lg:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={contentRef}
          className="relative bg-ink text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl border border-ink/20"
          style={{ opacity: 0 }}
        >
          {/* Ambient coral glow in corner */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-coral/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <span className="section-label text-coral font-medium tracking-[0.25em] mb-4 block">
                START A CONVERSATION
              </span>
              <h2 className="editorial-headline text-white text-4xl sm:text-5xl lg:text-7xl mb-6">
                HAVE AN IDEA? LET&apos;S MAKE IT HAPPEN.
              </h2>
              <p className="text-muted-grey text-base sm:text-lg font-body max-w-2xl leading-relaxed mb-8">
                Whether you are planning a regional beauty pageant, a high-stakes corporate launch, or an ambitious
                creative campaign, Jay Media Management brings unmatched stagecraft and production mastery to the table.
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-white/70 font-body">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-coral" /> {siteConfig.location.address}, {siteConfig.location.city}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Mail className="w-4 h-4 text-coral" /> {siteConfig.contact.email}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-start lg:items-end">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-coral text-white font-display font-semibold text-sm tracking-widest uppercase hover:bg-coral-hover hover:scale-[1.02] transition-all duration-300 text-center"
              >
                <span>Request Project Proposal</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 bg-transparent border border-white/20 text-white font-display text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-300 text-center"
              >
                <span>Explore Capabilities</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

