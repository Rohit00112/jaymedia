'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Calendar, MapPin, Award } from 'lucide-react';
import { useInView, useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface EventItemData {
  slug: string;
  title: string;
  category: string;
  seasonOrYear: string;
  location: string;
  description: string;
  highlights: string[];
  gradient: string;
  image: string;
}

const FEATURED_EVENTS: EventItemData[] = [
  {
    slug: 'miss-koshi',
    title: 'Miss Koshi Grand Pageant',
    category: 'Beauty Pageant & Youth Empowerment',
    seasonOrYear: 'Annual Flagship',
    location: 'Biratnagar, Koshi Province',
    description:
      'The premier regional beauty pageant and leadership platform for young women across Koshi Province. Centered on self-expression, cultural pride, social advocacy, and career elevation.',
    highlights: ['Grand Finale Broadcast', 'Intensive Mentorship Camp', 'Substantial Scholarships'],
    gradient: 'from-[#1E1928] via-[#2A1F36] to-black',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'mr-and-miss-little-koshi',
    title: 'Mr. & Miss Little Koshi',
    category: "Children's Talent & Personality Showcase",
    seasonOrYear: '7+ Successful Seasons',
    location: 'Biratnagar • Itahari • Dharan',
    description:
      "Eastern Nepal's most prestigious children's talent discovery event. Young participants undergo confidence building, public speaking, and stage performance training before a high-profile finale.",
    highlights: ['Multi-City Auditions', 'Personality Grooming', 'Eminent Jury'],
    gradient: 'from-[#01402b]/50 via-[#1B3236] to-black',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'nepal-kids-dancing-champion',
    title: 'Nepal Kids Dancing Champion',
    category: 'Youth Dance Championship',
    seasonOrYear: 'Annual Tournament',
    location: 'Biratnagar • Eastern Nepal',
    description:
      'Eastern Nepal’s premier children’s dancing reality talent tournament giving budding performers a grand televised stage under senior choreographic mentorship.',
    highlights: ['Provincial Audition Tours', 'Choreography Masterclasses', 'Broadcast Stagecraft'],
    gradient: 'from-[#281924] via-[#381e30] to-black',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'corporate-cultural-galas',
    title: 'Brand Launches & Cultural Galas',
    category: 'Corporate & Experiential',
    seasonOrYear: 'Continuous Productions',
    location: 'Biratnagar & Regional Venues',
    description:
      'Curated experiential productions, press meets, and award galas designed for leading consumer brands, industrial groups, and government agencies seeking flawless execution.',
    highlights: ['Custom Stage Architecture', 'VIP Protocol', 'Multicam Coverage'],
    gradient: 'from-[#282119] via-[#36291B] to-black',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function FeaturedEventsSection() {
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
        translateY: [40, 0],
        duration: 800,
        delay: anime.stagger(150),
      },
      '-=300'
    );
  }, [isInView, reducedMotion]);

  return (
    <section
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative bg-black text-white py-28 lg:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-white/10 font-rubik"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-24" style={{ opacity: 0 }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="section-label text-coral font-medium tracking-[0.2em] mb-4 block">
                FLAGSHIP PRODUCTIONS
              </span>
              <h2 className="editorial-headline text-white text-4xl sm:text-5xl lg:text-7xl font-rubik">
                WORK WORTH REMEMBERING.
              </h2>
            </div>
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 text-sm font-rubik font-semibold uppercase tracking-widest text-[#eef9ff]/80 hover:text-white transition-colors duration-300"
            >
              <span>View All Events &amp; Archive</span>
              <ArrowUpRight className="w-4 h-4 text-coral transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Featured Productions Layout */}
        <div ref={cardsRef} className="space-y-12">
          {FEATURED_EVENTS.map((event, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={event.slug}
                className={cn(
                  'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#0c0c11] border border-white/10 p-6 sm:p-10 lg:p-12 rounded-[10px] shadow-xl hover:border-coral/40 transition-all duration-500',
                  isReversed && 'lg:flex-row-reverse'
                )}
                style={{ opacity: 0 }}
              >
                {/* Visual Canvas Block */}
                <div
                  className={cn(
                    'lg:col-span-6 relative aspect-[16/10] overflow-hidden rounded-[10px] bg-black group',
                    isReversed && 'lg:order-2'
                  )}
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Cinematic dark gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 z-[1]" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#01402b]/90 border border-[#01402b] text-[#eef9ff] text-xs font-rubik font-medium tracking-wider uppercase rounded-[50px] backdrop-blur-sm">
                        <Award className="w-3.5 h-3.5 text-coral" />
                        {event.category}
                      </span>
                      <span className="text-coral font-rubik font-bold text-sm bg-black/60 px-2.5 py-0.5 rounded-[50px] border border-white/10">
                        0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-2xl sm:text-3xl lg:text-4xl font-rubik font-bold text-white mb-2 leading-tight drop-shadow-md">
                        {event.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-rubik text-[#eef9ff]/90">
                        <span className="inline-flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-[50px] border border-white/10">
                          <Calendar className="w-3.5 h-3.5 text-coral" />
                          {event.seasonOrYear}
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-[50px] border border-white/10">
                          <MapPin className="w-3.5 h-3.5 text-coral" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ambient accent circle */}
                  <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-coral/20 blur-3xl z-[2] pointer-events-none" />
                </div>

                {/* Editorial Details Block */}
                <div className={cn('lg:col-span-6 flex flex-col justify-between', isReversed && 'lg:order-1')}>
                  <div>
                    <span className="text-xs font-rubik tracking-widest text-coral uppercase block mb-3 font-medium">
                      Production Spotlight
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-rubik font-bold text-white mb-4">
                      {event.title}
                    </h3>
                    <p className="text-[#eef9ff]/80 text-base sm:text-lg font-rubik leading-relaxed mb-6">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-8">
                      <span className="text-xs uppercase tracking-widest font-rubik text-[#eef9ff]/50 block">
                        Key Hallmarks
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {event.highlights.map((highlight, hIdx) => (
                          <span
                            key={hIdx}
                            className="text-xs font-rubik px-3 py-1 bg-white/5 border border-white/10 text-[#eef9ff] rounded-[2px]"
                          >
                            ✓ {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Link
                      href={`/events/${event.slug}`}
                      className="group inline-flex items-center gap-3 px-6 py-3.5 bg-coral text-white font-rubik text-xs uppercase tracking-widest font-semibold rounded-[50px] hover:bg-coral-hover hover:scale-105 transition-all duration-300 shadow-md"
                    >
                      <span>Explore Production Details</span>
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

