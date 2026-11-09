'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Layers, Video, Rocket, Mic2 } from 'lucide-react';
import { useInView, useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface ServiceItem {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  span: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES: ServiceItem[] = [
  {
    slug: 'event-management',
    number: '01',
    title: 'Event Management & Execution',
    category: 'Flagship Service',
    description:
      'End-to-end planning, stage engineering, technical AV, lighting, and logistical execution for grand pageants, arena concerts, and gala celebrations.',
    span: 'lg:col-span-8',
    icon: Layers,
  },
  {
    slug: 'brand-experiences',
    number: '02',
    title: 'Brand Experiences & Activations',
    category: 'Experiential',
    description:
      'Immersive consumer activations and tailored experiential events designed to turn brands into memorable cultural conversations.',
    span: 'lg:col-span-4',
    icon: Sparkles,
  },
  {
    slug: 'media-production',
    number: '03',
    title: 'Media & Entertainment Production',
    category: 'Studio & Broadcast',
    description:
      'Cinematic multicam event broadcasting, commercial video production, photography, and high-impact digital content creation.',
    span: 'lg:col-span-4',
    icon: Video,
  },
  {
    slug: 'product-launches',
    number: '04',
    title: 'Product & Store Launches',
    category: 'Commercial',
    description:
      'Spectacular unveiling ceremonies, architectural lighting, VIP hospitality, and press coordination for high-profile market entrances.',
    span: 'lg:col-span-4',
    icon: Rocket,
  },
  {
    slug: 'press-events',
    number: '05',
    title: 'Press Events & Conferences',
    category: 'Corporate',
    description:
      'Professional stage design, audio synchronization, press kit distribution, and executive media management for strategic announcements.',
    span: 'lg:col-span-4',
    icon: Mic2,
  },
];

export default function ServicesSection() {
  const { ref: containerRef, isInView } = useInView({ threshold: 0.15, once: true });
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotion) {
      if (headerRef.current) headerRef.current.style.opacity = '1';
      if (cardsRef.current) {
        Array.from(cardsRef.current.children).forEach((child) => {
          (child as HTMLElement).style.opacity = '1';
          (child as HTMLElement).style.transform = 'none';
        });
      }
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
        targets: cardsRef.current?.children,
        opacity: [0, 1],
        translateY: [35, 0],
        duration: 700,
        delay: anime.stagger(120),
      },
      '-=300'
    );
  }, [isInView, reducedMotion]);

  return (
    <section
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative bg-ink text-white py-28 lg:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-divider"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 lg:mb-24" style={{ opacity: 0 }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="section-label text-coral font-medium tracking-[0.25em] mb-4 block">
                WHAT WE DO
              </span>
              <h2 className="editorial-headline text-white text-4xl sm:text-5xl lg:text-7xl">
                IDEAS INTO EXPERIENCES.
              </h2>
            </div>
            <p className="text-muted-grey text-base md:text-lg max-w-md font-body">
              From creative concept to backstage execution, we deliver world-class production standards in eastern Nepal.
            </p>
          </div>
        </div>

        {/* Asymmetrical Grid of Services */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={cn(
                  service.span,
                  'group relative bg-dark-surface p-8 sm:p-10 flex flex-col justify-between',
                  'border border-white/5 hover:border-coral/40 transition-all duration-500',
                  'hover:bg-[#202028]'
                )}
                style={{ opacity: 0 }}
              >
                {/* Background glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-coral/5 rounded-full blur-3xl pointer-events-none group-hover:bg-coral/15 transition-all duration-700" />

                <div>
                  {/* Top Bar: Number & Category & Arrow */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                    <span className="text-coral font-display font-bold text-lg tracking-wider">
                      {service.number}
                    </span>
                    <span className="text-xs uppercase tracking-widest font-display text-muted-grey">
                      {service.category}
                    </span>
                    <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/70 group-hover:text-coral group-hover:border-coral/40 group-hover:rotate-45 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-5 h-5 text-coral" />
                    <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white group-hover:text-coral transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-grey text-sm sm:text-base font-body leading-relaxed max-w-xl">
                    {service.description}
                  </p>
                </div>

                {/* Bottom link indicator */}
                <div className="mt-8 pt-4 flex items-center gap-2 text-xs font-display uppercase tracking-widest text-white/50 group-hover:text-coral transition-colors duration-300">
                  <span>Explore Capabilities</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

