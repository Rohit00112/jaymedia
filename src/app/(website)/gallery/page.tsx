'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Maximize2,
  Sparkles,
  Ticket,
  Images,
} from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import { useEscapeKey, useBodyLock } from '@/hooks';
import { cn } from '@/lib/utils';

type GalleryCategory =
  | 'Atif Aslam Live in Nepal'
  | 'Miss Koshi 2024'
  | 'Nepal Kids Idol'
  | 'Mr. & Miss Little Koshi'
  | 'Stagecraft'
  | 'Corporate Galas';

interface GalleryPhoto {
  id: string;
  title: string;
  badge?: string;
  category: GalleryCategory;
  aspect: string;
  image: string;
  caption: string;
  featuredInSection?: boolean;
}

interface GallerySectionMeta {
  category: GalleryCategory;
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  ticketUrl?: string;
  accentTone?: 'concert' | 'default';
}

const GALLERY_SECTIONS: GallerySectionMeta[] = [
  {
    category: 'Atif Aslam Live in Nepal',
    eyebrow: 'International Stadium Concert • 19 Dec 2026',
    title: 'Atif Aslam Live in Nepal — Subah Aye Na Tour',
    description:
      'Official tour poster, stage showcase, and Itahari Stadium (Rangasala) venue frames for the December 19, 2026 concert organized by Jay Media Management.',
    href: '/events/atif-aslam-live-in-nepal',
    linkLabel: 'Concert Dossier',
    ticketUrl: 'https://events.khalti.com/events/ET26BJD3F93W',
    accentTone: 'concert',
  },
  {
    category: 'Miss Koshi 2024',
    eyebrow: 'Annual Flagship Pageant • Season #8',
    title: 'Miss Koshi 2024 — Grand Finale & Titleholders',
    description:
      'Official coronation cover and individual winner and runner-up portraits from the Miss Koshi 2024 Season #8 Grand Finale in Biratnagar.',
    href: '/events/miss-koshi',
    linkLabel: 'View Miss Koshi',
  },
  {
    category: 'Nepal Kids Idol',
    eyebrow: 'National Television Reality Show • Season One',
    title: 'Nepal Kids Idol — Jury & Nationwide Auditions',
    description:
      'Official celebrity jury announcements and nationwide audition campaign posters spanning all 77 districts of Nepal and international diaspora hubs.',
    href: '/events/nepal-kids-idol',
    linkLabel: 'View Nepal Kids Idol',
  },
  {
    category: 'Mr. & Miss Little Koshi',
    eyebrow: "Children's Talent & Confidence Platform • 7+ Seasons",
    title: 'Mr. & Miss Little Koshi',
    description:
      'Stage showcases and talent rounds celebrating young participants across Biratnagar, Itahari, and Dharan.',
    href: '/events/mr-and-miss-little-koshi',
    linkLabel: 'View Little Koshi',
  },
  {
    category: 'Stagecraft',
    eyebrow: 'Technical Production & Acoustics',
    title: 'Concert Rigging & Stagecraft',
    description:
      'Intelligent DMX beam choreography, line-array sound engineering, and modular stage trussing across Koshi Province.',
    href: '/services',
    linkLabel: 'Explore Services',
  },
  {
    category: 'Corporate Galas',
    eyebrow: 'Brand Launches & Executive Events',
    title: 'Corporate Galas & Commercial Unveils',
    description:
      'Turnkey commercial reveals, VIP hospitality protocols, and live broadcast execution.',
    href: '/contact',
    linkLabel: 'Inquire for Events',
  },
];

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'atif-aslam-poster',
    title: 'Atif Aslam Live in Nepal — Subah Aye Na Tour (Eastern Echoes)',
    badge: 'Official Tour Poster',
    category: 'Atif Aslam Live in Nepal',
    aspect: 'aspect-[4/4.8]',
    image: '/images/official/atif-aslam-poster.jpg',
    caption:
      'Jay Media Management presents Atif Aslam Live in Nepal at Itahari Stadium (Itahari Rangasala) on December 19, 2026. Official digital ticketing via Khalti by IME.',
  },
  {
    id: 'atif-aslam-banner',
    title: 'Subah Aye Na Tour — Official Concert Showcase',
    badge: 'Headline Showcase',
    category: 'Atif Aslam Live in Nepal',
    aspect: 'aspect-[4/4.8]',
    image: '/images/official/atif-aslam-stage.jpg',
    caption:
      'Official showcase artwork for Atif Aslam Live in Nepal: Subah Aye Na Tour (Eastern Echoes) on Saturday, December 19, 2026.',
  },
  {
    id: 'atif-aslam-venue',
    title: 'Itahari Stadium (Itahari Rangasala) — Concert Arena',
    badge: 'Host Stadium Venue',
    category: 'Atif Aslam Live in Nepal',
    aspect: 'aspect-[4/4.8]',
    image: '/images/official/itahari-stadium.jpg',
    caption:
      'Itahari Stadium in Sunsari, Koshi Province — host arena for Atif Aslam Live in Nepal on December 19, 2026 (6:00 PM onwards).',
  },
  {
    id: 'koshi-2024-all',
    title: 'Miss Koshi 2024 Season #8 — Grand Titleholders Roster',
    badge: 'Season #8 Laureates',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/koshi-2024-cover.png',
    caption:
      'Complete winners and runners-up roster of Miss Koshi 2024 Season #8 crowned by Jay Media Management Pvt. Ltd. in Biratnagar.',
    featuredInSection: true,
  },
  {
    id: 'koshi-2024-winner',
    title: 'Subha Laxmi Rai — Miss Koshi 2024 Winner',
    badge: 'Grand Winner • #16',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[3/3.8]',
    image: '/images/official/koshi-winner.png',
    caption:
      'Contestant No. 16 from Itahari crowned Miss Koshi 2024 Season #8 Grand Winner.',
  },
  {
    id: 'koshi-2024-choice',
    title: "Organizer's Choice Winner — Miss Koshi 2024",
    badge: "Organizer's Choice",
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[3/3.8]',
    image: '/images/official/koshi-organizers-choice.png',
    caption:
      "Honoring the Organizer's Choice titleholder of Miss Koshi Season #8.",
  },
  {
    id: 'koshi-2024-r1',
    title: 'Nishahangma Limbu — 1st Runner Up',
    badge: '1st Runner Up • #09',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[3/3.8]',
    image: '/images/official/koshi-runner-1.png',
    caption:
      'Contestant No. 09 (Dharan) honored as 1st Runner Up at Miss Koshi 2024 Season #8.',
  },
  {
    id: 'koshi-2024-r2',
    title: '2nd Runner Up — Miss Koshi 2024',
    badge: '2nd Runner Up',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[3/3.8]',
    image: '/images/official/koshi-runner-2.png',
    caption: 'Official 2nd Runner Up presentation of Miss Koshi 2024 Season #8.',
  },
  {
    id: 'koshi-2024-r3',
    title: '3rd Runner Up — Miss Koshi 2024',
    badge: '3rd Runner Up',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[3/3.8]',
    image: '/images/official/koshi-runner-3.png',
    caption: 'Official 3rd Runner Up presentation of Miss Koshi 2024 Season #8.',
  },
  {
    id: 'koshi-2024-r4',
    title: '4th Runner Up — Miss Koshi 2024',
    badge: '4th Runner Up',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[3/3.8]',
    image: '/images/official/koshi-runner-4.png',
    caption: 'Official 4th Runner Up presentation of Miss Koshi 2024 Season #8.',
  },
  {
    id: 'nki-poster-1',
    title: 'Nepal Kids Idol — Jury Announcement (Lochan Bhattarai)',
    badge: 'Official Jury Panel',
    category: 'Nepal Kids Idol',
    aspect: 'aspect-[4/4.6]',
    image: '/images/official/nki-cover.png',
    caption:
      'Celebrated vocalist Mrs. Lochan Bhattarai joining the official jury panel for Nepal Kids Idol Season One.',
  },
  {
    id: 'nki-poster-2',
    title: 'Nepal Kids Idol — Auditions Open Nationwide',
    badge: '77 Districts + Global',
    category: 'Nepal Kids Idol',
    aspect: 'aspect-[4/4.6]',
    image: '/images/official/nki-poster.png',
    caption:
      'National & international audition call spanning all 77 districts of Nepal plus global diaspora centers with Rs. 20 Lakhs prize pool.',
  },
  {
    id: 'nki-judge-ananda',
    title: 'Nepal Kids Idol — Lead Jury Panelist Ananda Karki',
    badge: 'Lead Jury Maestro',
    category: 'Nepal Kids Idol',
    aspect: 'aspect-[4/4.6]',
    image: '/images/official/judge-ananda.png',
    caption:
      'Nepali playback maestro Ananda Karki on the official Nepal Kids Idol television jury panel.',
  },
  {
    id: '2',
    title: 'Little Koshi Talent Round Showcase',
    badge: 'Youth Showcase',
    category: 'Mr. & Miss Little Koshi',
    aspect: 'aspect-[16/10]',
    image:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Young participants performing vocal recitations, traditional attire walks, and creative talent showcases.',
  },
  {
    id: '3',
    title: 'Intelligent DMX Beam Rigging & Acoustics',
    badge: 'Arena Stagecraft',
    category: 'Stagecraft',
    aspect: 'aspect-[16/10]',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Calibrating dynamic DMX moving heads, LED video backdrops, and atmospheric haze for arena productions.',
  },
  {
    id: '4',
    title: 'Corporate Brand Reveal & VIP Gala Stage',
    badge: 'Executive Gala',
    category: 'Corporate Galas',
    aspect: 'aspect-[16/10]',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    caption:
      'High-profile commercial unveiling with VIP executive seating protocol in Eastern Nepal.',
  },
];

const CATEGORIES = [
  'All',
  'Atif Aslam Live in Nepal',
  'Miss Koshi 2024',
  'Nepal Kids Idol',
  'Mr. & Miss Little Koshi',
  'Stagecraft',
  'Corporate Galas',
] as const;

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredPhotos =
    selectedCategory === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === selectedCategory);

  const visibleSections =
    selectedCategory === 'All'
      ? GALLERY_SECTIONS
      : GALLERY_SECTIONS.filter((sec) => sec.category === selectedCategory);

  const activePhoto =
    activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  const openPhotoById = (photoId: string) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photoId);
    if (idx !== -1) {
      setActivePhotoIndex(idx);
    }
  };

  useEscapeKey(() => setActivePhotoIndex(null), activePhotoIndex !== null);
  useBodyLock(activePhotoIndex !== null);

  const handleNext = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex(
      (prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  };

  useEffect(() => {
    if (activePhotoIndex === null) return;

    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setActivePhotoIndex((prev) =>
          prev === null ? prev : (prev + 1) % filteredPhotos.length
        );
      }
      if (event.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev === null
            ? prev
            : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        );
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [activePhotoIndex, filteredPhotos.length]);

  return (
    <div className="min-h-screen bg-paper-deep text-ink">
      <PageHero
        eyebrow="Production archive"
        title={
          <>
            Moments caught in{' '}
            <span className="serif italic text-accent">the spotlight.</span>
          </>
        }
        description="A curated photographic retrospective of live stadium concerts, pageant coronations, and broadcast stagecraft across Itahari, Biratnagar, and Koshi Province."
        image="/images/official/atif-aslam-banner.jpg"
        imageAlt="Atif Aslam Live in Nepal concert and stage lighting production"
        compact
        meta={[
          {
            label: 'Archive',
            value: `${GALLERY_PHOTOS.length} official frames`,
          },
          {
            label: 'Collections',
            value: `0${GALLERY_SECTIONS.length} event sections`,
          },
          { label: 'Region', value: 'Koshi Province' },
          { label: 'Studio', value: 'Central Mall, Biratnagar' },
        ]}
      />

      {/* Sticky Architectural Filter Bar */}
      <div className="sticky top-[4.5rem] z-30 border-b border-ink/15 bg-white/95 shadow-[0_10px_24px_-18px_rgba(12,20,16,0.18)] backdrop-blur-xl">
        <div className="container-ed flex items-center justify-between gap-4 overflow-x-auto py-3.5 no-scrollbar">
          <div className="flex shrink-0 items-center gap-2">
            <span className="inline-flex items-center gap-1.5 pr-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
              <Images className="h-3.5 w-3.5" />
              Collections
            </span>

            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              const count =
                category === 'All'
                  ? GALLERY_PHOTOS.length
                  : GALLERY_PHOTOS.filter((p) => p.category === category)
                      .length;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setActivePhotoIndex(null);
                  }}
                  aria-pressed={active}
                  className={cn(
                    'inline-flex items-center gap-2 whitespace-nowrap rounded-[3px] border px-3.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-200',
                    active
                      ? 'border-forest bg-forest text-white shadow-xs'
                      : 'border-line bg-paper-deep/70 text-ink-soft hover:border-forest hover:bg-white hover:text-forest'
                  )}
                >
                  <span>{category}</span>
                  <span
                    className={cn(
                      'rounded-[2px] px-1.5 py-0.5 text-[9px] tabular-nums',
                      active
                        ? 'bg-white/20 text-gold'
                        : 'bg-white text-muted'
                    )}
                  >
                    {String(count).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grouped Event Exhibition Sections */}
      <section className="py-12 md:py-16">
        <div className="container-ed space-y-14 md:space-y-20">
          {visibleSections.map((section, sectionIdx) => {
            const sectionPhotos = GALLERY_PHOTOS.filter(
              (photo) => photo.category === section.category
            );
            if (sectionPhotos.length === 0) return null;

            const isConcertSection = section.accentTone === 'concert';
            const featuredPhoto = sectionPhotos.find((p) => p.featuredInSection);
            const gridPhotos = featuredPhoto
              ? sectionPhotos.filter((p) => p.id !== featuredPhoto.id)
              : sectionPhotos;

            return (
              <div
                key={section.category}
                className={cn(
                  'overflow-hidden rounded-[6px] border p-6 sm:p-8 lg:p-10',
                  isConcertSection
                    ? 'border-forest/30 bg-gradient-to-br from-[#031426] via-[#062138] to-[#022c1e] text-white shadow-[0_24px_56px_-24px_rgba(2,18,36,0.55)]'
                    : 'border-ink/15 bg-white shadow-[0_16px_40px_-28px_rgba(12,20,16,0.12)]'
                )}
              >
                {/* Section Header */}
                <div
                  className={cn(
                    'mb-8 flex flex-col justify-between gap-5 border-b pb-6 lg:flex-row lg:items-end',
                    isConcertSection ? 'border-white/15' : 'border-line'
                  )}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-[2px] px-2.5 py-1',
                          isConcertSection
                            ? 'bg-gold text-ink'
                            : 'bg-forest text-white'
                        )}
                      >
                        {isConcertSection && <Sparkles className="h-3 w-3" />}
                        0{sectionIdx + 1} / {section.category}
                      </span>
                      <span
                        className={
                          isConcertSection ? 'text-gold' : 'text-forest'
                        }
                      >
                        {section.eyebrow}
                      </span>
                    </div>

                    <h2
                      className={cn(
                        'display mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl',
                        isConcertSection ? 'text-white' : 'text-ink'
                      )}
                    >
                      {section.title}
                    </h2>
                    <p
                      className={cn(
                        'mt-2 max-w-2xl text-xs leading-relaxed sm:text-sm',
                        isConcertSection ? 'text-white/75' : 'text-muted'
                      )}
                    >
                      {section.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={cn(
                        'rounded-[3px] border px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]',
                        isConcertSection
                          ? 'border-white/20 bg-white/10 text-white'
                          : 'border-line bg-paper-deep text-ink-soft'
                      )}
                    >
                      {String(sectionPhotos.length).padStart(2, '0')}{' '}
                      {sectionPhotos.length === 1 ? 'Frame' : 'Frames'}
                    </span>

                    {section.ticketUrl && (
                      <a
                        href={section.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-[3px] bg-gold px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-0.5"
                      >
                        <Ticket className="h-3.5 w-3.5" />
                        <span>Buy Tickets (Khalti)</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}

                    {section.href && (
                      <Link
                        href={section.href}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-[3px] border px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors',
                          isConcertSection
                            ? 'border-white/25 bg-white/10 text-white hover:bg-white hover:text-ink'
                            : 'border-forest bg-forest text-white hover:bg-ink'
                        )}
                      >
                        <span>{section.linkLabel || 'View Event'}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Optional Lead Featured Showcase Card (e.g., Miss Koshi 2024 Grand Titleholders Cover) */}
                {featuredPhoto && (
                  <div className="mb-8 grid items-center gap-6 rounded-[5px] border border-line bg-paper-deep/65 p-4 sm:p-6 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <button
                        type="button"
                        onClick={() => openPhotoById(featuredPhoto.id)}
                        aria-label={`Open ${featuredPhoto.title}`}
                        className="group relative block aspect-[4/4.4] w-full overflow-hidden rounded-[4px] border border-ink/15 bg-white text-left shadow-sm"
                      >
                        <Image
                          src={featuredPhoto.image}
                          alt={featuredPhoto.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          className="img-zoom object-cover"
                        />
                        {featuredPhoto.badge && (
                          <span className="absolute left-3 top-3 rounded-[2px] bg-forest px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-gold shadow-xs">
                            {featuredPhoto.badge}
                          </span>
                        )}
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-[2px] bg-ink/85 px-3 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-xs transition-colors group-hover:bg-forest">
                          <Maximize2 className="h-3 w-3 text-gold" />
                          <span>Expand Cover</span>
                        </span>
                      </button>
                    </div>

                    <div className="flex flex-col justify-between lg:col-span-7 lg:pl-4">
                      <div>
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
                          Lead Exhibition Plate &bull; {featuredPhoto.category}
                        </span>
                        <h3 className="display mt-2 text-2xl font-bold text-ink sm:text-3xl">
                          {featuredPhoto.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                          {featuredPhoto.caption}
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-4 sm:grid-cols-3">
                          <div>
                            <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                              Season #8 Winner
                            </span>
                            <span className="mt-1 block text-xs font-bold text-forest">
                              Subha Laxmi Rai (#16)
                            </span>
                          </div>
                          <div>
                            <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                              1st Runner Up
                            </span>
                            <span className="mt-1 block text-xs font-bold text-ink">
                              Nishahangma Limbu (#09)
                            </span>
                          </div>
                          <div>
                            <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                              Coronation Stage
                            </span>
                            <span className="mt-1 block text-xs font-bold text-ink">
                              Biratnagar, Koshi
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => openPhotoById(featuredPhoto.id)}
                          className="btn btn-accent"
                        >
                          <Maximize2 className="h-3.5 w-3.5 text-gold" />
                          <span>Inspect Full Resolution</span>
                        </button>
                        <Link
                          href="/events/miss-koshi"
                          className="btn btn-outline bg-white"
                        >
                          <span>Miss Koshi Dossier</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Unified Grid for this Event's Photos */}
                <div
                  className={cn(
                    'grid gap-6',
                    gridPhotos.length === 1
                      ? 'max-w-2xl grid-cols-1'
                      : 'sm:grid-cols-2 lg:grid-cols-3'
                  )}
                >
                  {gridPhotos.map((photo, index) => (
                    <figure
                      key={photo.id}
                      className={cn(
                        'group flex flex-col justify-between overflow-hidden rounded-[5px] border p-3 transition-all duration-300 hover:-translate-y-1',
                        isConcertSection
                          ? 'border-white/15 bg-white/[0.06] hover:border-gold/60 hover:bg-white/[0.1]'
                          : 'border-line bg-paper-deep/40 hover:border-forest hover:bg-white hover:shadow-[0_18px_36px_-22px_rgba(1,64,43,0.22)]'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => openPhotoById(photo.id)}
                        aria-label={`Open ${photo.title}`}
                        className={cn(
                          'relative block w-full overflow-hidden rounded-[3px] bg-[#040d1a] text-left',
                          photo.aspect
                        )}
                      >
                        <Image
                          src={photo.image}
                          alt={photo.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="img-zoom object-cover"
                          loading={
                            sectionIdx === 0 && index < 3 ? 'eager' : 'lazy'
                          }
                        />

                        <span
                          className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          aria-hidden="true"
                        />

                        {/* Top Floating Badge */}
                        <div className="pointer-events-none absolute inset-x-2.5 top-2.5 flex items-center justify-between gap-2">
                          {photo.badge && (
                            <span
                              className={cn(
                                'rounded-[2px] px-2.5 py-1 font-mono text-[8.5px] font-bold uppercase tracking-[0.14em] shadow-xs backdrop-blur-md',
                                isConcertSection
                                  ? 'bg-gold text-ink'
                                  : 'bg-ink/80 text-white'
                              )}
                            >
                              {photo.badge}
                            </span>
                          )}
                          <span className="ml-auto rounded-[2px] bg-ink/70 px-2 py-0.5 font-mono text-[8.5px] font-semibold text-white/90 backdrop-blur-xs">
                            0{index + 1}
                          </span>
                        </div>

                        {/* Bottom Hover Expand Pill */}
                        <span className="absolute bottom-3 right-3 inline-flex translate-y-1 items-center gap-1.5 rounded-[2px] bg-white px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ink opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <Maximize2 className="h-3 w-3 text-forest" />
                          <span>View Frame</span>
                        </span>
                      </button>

                      <figcaption className="mt-3.5 flex flex-1 flex-col justify-between px-1 pb-1">
                        <div>
                          <h3
                            className={cn(
                              'display text-base font-bold leading-snug md:text-lg',
                              isConcertSection
                                ? 'text-white group-hover:text-gold'
                                : 'text-ink group-hover:text-forest'
                            )}
                          >
                            {photo.title}
                          </h3>
                          <p
                            className={cn(
                              'mt-1.5 line-clamp-2 text-xs leading-relaxed',
                              isConcertSection ? 'text-white/70' : 'text-muted'
                            )}
                          >
                            {photo.caption}
                          </p>
                        </div>

                        <div
                          className={cn(
                            'mt-3 flex items-center justify-between border-t pt-2.5 font-mono text-[9px] uppercase tracking-[0.14em]',
                            isConcertSection
                              ? 'border-white/15 text-gold'
                              : 'border-line text-forest'
                          )}
                        >
                          <span>{photo.category}</span>
                          <button
                            type="button"
                            onClick={() => openPhotoById(photo.id)}
                            className="inline-flex items-center gap-1 font-semibold hover:underline"
                          >
                            <span>Lightbox</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </button>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            );
          })}

          <p className="mt-10 border-t border-line pt-8 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Showing {filteredPhotos.length} of {GALLERY_PHOTOS.length} official
            frames across {visibleSections.length}{' '}
            {visibleSections.length === 1 ? 'event section' : 'event sections'}
          </p>
        </div>
      </section>

      {/* Full-Screen Interactive Lightbox Modal with Thumbnail Filmstrip */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setActivePhotoIndex(null)}
          className="backdrop-in fixed inset-0 z-[100] flex flex-col justify-between bg-[#060d14]/96 p-4 text-white backdrop-blur-lg sm:p-6 lg:p-8"
        >
          {/* Top Lightbox Header */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto flex w-full max-w-6xl items-start justify-between gap-4 border-b border-white/15 pb-3.5"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                <span>{activePhoto.category}</span>
                {activePhoto.badge && (
                  <>
                    <span className="text-white/30">&bull;</span>
                    <span className="text-white/80">{activePhoto.badge}</span>
                  </>
                )}
              </div>
              <h2 className="display mt-1 text-lg font-bold text-white sm:text-2xl">
                {activePhoto.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden rounded-[2px] border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 sm:inline-block">
                {String(activePhotoIndex! + 1).padStart(2, '0')} /{' '}
                {String(filteredPhotos.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => setActivePhotoIndex(null)}
                autoFocus
                aria-label="Close gallery lightbox"
                className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:border-gold hover:bg-gold hover:text-ink"
              >
                <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>
          </div>

          {/* Center Image Stage */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto my-3 flex w-full max-w-6xl flex-1 items-center justify-center"
          >
            <div className="relative h-[56vh] w-full overflow-hidden rounded-[4px] border border-white/10 bg-black/70 sm:h-[64vh]">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-contain p-2 sm:p-4"
              />
            </div>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-ink/85 text-white shadow-lg transition-colors hover:border-gold hover:bg-gold hover:text-ink sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-ink/85 text-white shadow-lg transition-colors hover:border-gold hover:bg-gold hover:text-ink sm:right-4"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Bottom Caption + Interactive Thumbnail Filmstrip */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto w-full max-w-6xl border-t border-white/15 pt-3.5"
          >
            <p className="mb-3 text-xs leading-relaxed text-white/80 sm:text-sm">
              {activePhoto.caption}
            </p>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {filteredPhotos.map((thumb, idx) => {
                const isCurrent = idx === activePhotoIndex;
                return (
                  <button
                    key={thumb.id}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    aria-label={`Jump to ${thumb.title}`}
                    className={cn(
                      'relative h-12 w-16 shrink-0 overflow-hidden rounded-[2px] border transition-all',
                      isCurrent
                        ? 'border-2 border-gold ring-2 ring-gold/40'
                        : 'border-white/20 opacity-55 hover:opacity-90'
                    )}
                  >
                    <Image
                      src={thumb.image}
                      alt={thumb.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <CtaBand />
    </div>
  );
}
