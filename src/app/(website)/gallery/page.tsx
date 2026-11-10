'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import { Tilt3D } from '@/components/motion';
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
    <div className="min-h-screen bg-paper text-ink">
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

      {/* Minimal Architectural Filter Bar */}
      <div className="sticky top-[4.5rem] z-30 border-b border-line bg-paper/95 backdrop-blur-xl">
        <div className="container-ed flex items-center justify-between gap-4 overflow-x-auto py-4 no-scrollbar">
          <div className="flex shrink-0 items-center gap-6">
            <span className="eyebrow shrink-0 text-faint">Filter</span>
            {CATEGORIES.map((category, idx) => {
              const active = selectedCategory === category;
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
                    'relative whitespace-nowrap pb-1.5 font-sans text-xs font-medium transition-colors duration-200',
                    active ? 'text-ink' : 'text-muted hover:text-ink'
                  )}
                >
                  <span className="mono mr-1.5 text-[9.5px] text-faint">
                    0{idx + 1}
                  </span>
                  {category}
                  {active && (
                    <span
                      className="absolute inset-x-0 bottom-0 h-[1.5px] bg-ink"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grouped Event Sections */}
      <section className="py-14 md:py-20">
        <div className="container-ed space-y-16 md:space-y-24">
          {visibleSections.map((section, sectionIdx) => {
            const sectionPhotos = GALLERY_PHOTOS.filter(
              (photo) => photo.category === section.category
            );
            if (sectionPhotos.length === 0) return null;

            const featuredPhoto = sectionPhotos.find(
              (p) => p.featuredInSection
            );
            const gridPhotos = featuredPhoto
              ? sectionPhotos.filter((p) => p.id !== featuredPhoto.id)
              : sectionPhotos;

            return (
              <div
                key={section.category}
                className="border-t border-ink/15 pt-10 first:border-t-0 first:pt-0"
              >
                {/* Section Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-end">
                  <div>
                    <span className="eyebrow inline-flex items-center gap-2 text-forest">
                      <span
                        className="h-2.5 w-1 bg-forest"
                        aria-hidden="true"
                      />
                      0{sectionIdx + 1} / {section.eyebrow}
                    </span>
                    <h2 className="display mt-2 text-2xl font-bold text-ink sm:text-3xl md:text-4xl">
                      {section.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted sm:text-sm">
                      {section.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-[2px] border border-line bg-paper-deep px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {String(sectionPhotos.length).padStart(2, '0')}{' '}
                      {sectionPhotos.length === 1 ? 'Frame' : 'Frames'}
                    </span>

                    {section.ticketUrl && (
                      <a
                        href={section.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-[2px] bg-forest px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-ink"
                      >
                        <span>Buy Tickets (Khalti)</span>
                        <ArrowUpRight className="h-3 w-3 text-gold" />
                      </a>
                    )}

                    {section.href && (
                      <Link
                        href={section.href}
                        className="inline-flex items-center gap-1.5 rounded-[2px] border border-ink/20 bg-white px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-forest hover:text-forest"
                      >
                        <span>{section.linkLabel || 'View Event'}</span>
                        <ArrowUpRight className="h-3 w-3 text-forest" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Optional Lead Plate (e.g., Miss Koshi 2024 Titleholders Cover) */}
                {featuredPhoto && (
                  <div className="mb-8 grid items-center gap-6 rounded-[2px] border border-line bg-paper-deep/50 p-5 sm:p-7 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <Tilt3D maxTilt={5} scale={1.01}>
                        <button
                          type="button"
                          onClick={() => openPhotoById(featuredPhoto.id)}
                          aria-label={`Open ${featuredPhoto.title}`}
                          className="group relative block aspect-[4/4.4] w-full overflow-hidden rounded-[2px] border border-ink/15 bg-white text-left"
                        >
                          <Image
                            src={featuredPhoto.image}
                            alt={featuredPhoto.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 42vw"
                            className="img-zoom object-cover"
                          />
                          <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-[2px] bg-white/95 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </button>
                      </Tilt3D>
                    </div>

                    <div className="flex flex-col justify-between lg:col-span-7 lg:pl-4">
                      <div>
                        <span className="eyebrow text-forest">
                          Lead Exhibition Plate &bull; {featuredPhoto.category}
                        </span>
                        <h3 className="display mt-2 text-2xl font-bold text-ink sm:text-3xl">
                          {featuredPhoto.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {featuredPhoto.caption}
                        </p>

                        <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-4 sm:grid-cols-3">
                          <div>
                            <dt className="eyebrow text-[9px] text-faint">
                              Season #8 Winner
                            </dt>
                            <dd className="mt-1 text-xs font-semibold text-ink">
                              Subha Laxmi Rai (#16)
                            </dd>
                          </div>
                          <div>
                            <dt className="eyebrow text-[9px] text-faint">
                              1st Runner Up
                            </dt>
                            <dd className="mt-1 text-xs font-semibold text-ink">
                              Nishahangma Limbu (#09)
                            </dd>
                          </div>
                          <div>
                            <dt className="eyebrow text-[9px] text-faint">
                              Coronation Stage
                            </dt>
                            <dd className="mt-1 text-xs font-semibold text-ink">
                              Biratnagar, Koshi
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => openPhotoById(featuredPhoto.id)}
                          className="btn btn-accent"
                        >
                          <span>Inspect Full Frame</span>
                          <ArrowUpRight className="h-4 w-4 text-gold" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Unified 3D-Tilted Photo Grid for this Event */}
                <div
                  className={cn(
                    'grid gap-6',
                    gridPhotos.length === 1
                      ? 'max-w-2xl grid-cols-1'
                      : 'sm:grid-cols-2 lg:grid-cols-3'
                  )}
                >
                  {gridPhotos.map((photo, index) => (
                    <Tilt3D
                      key={photo.id}
                      maxTilt={4.5}
                      scale={1.01}
                      className="h-full"
                    >
                      <figure className="group flex h-full flex-col justify-between rounded-[2px] border border-line bg-white p-3 transition-colors duration-300 hover:border-forest">
                        <button
                          type="button"
                          onClick={() => openPhotoById(photo.id)}
                          aria-label={`Open ${photo.title}`}
                          className={cn(
                            'relative block w-full overflow-hidden rounded-[2px] bg-[#040d1a] text-left',
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
                            className="absolute inset-0 bg-ink/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            aria-hidden="true"
                          />

                          <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 translate-y-1 items-center justify-center rounded-[2px] bg-white/95 text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </button>

                        <figcaption className="mt-3.5 flex flex-1 flex-col justify-between px-1 pb-1">
                          <div>
                            <div className="flex items-baseline justify-between gap-3">
                              <h3 className="display text-base font-bold text-ink transition-colors group-hover:text-forest md:text-lg">
                                {photo.title}
                              </h3>
                              <span className="eyebrow shrink-0 text-[9px] text-faint">
                                0{index + 1}
                              </span>
                            </div>
                            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                              {photo.caption}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                            <span>{photo.badge || photo.category}</span>
                            <button
                              type="button"
                              onClick={() => openPhotoById(photo.id)}
                              className="inline-flex items-center gap-1 text-forest hover:underline"
                            >
                              <span>Expand</span>
                              <ArrowUpRight className="h-3 w-3" />
                            </button>
                          </div>
                        </figcaption>
                      </figure>
                    </Tilt3D>
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

      {/* Clean Minimal Full-Screen Lightbox */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setActivePhotoIndex(null)}
          className="backdrop-in fixed inset-0 z-[100] flex flex-col justify-between bg-ink/95 p-4 text-white backdrop-blur-md sm:p-6 md:p-10"
        >
          {/* Top Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 border-b border-white/15 pb-4"
          >
            <div>
              <span className="eyebrow text-gold">{activePhoto.category}</span>
              <h2 className="display mt-1 text-lg font-bold text-white sm:text-2xl">
                {activePhoto.title}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <span className="mono hidden text-xs text-white/60 sm:inline">
                {String(activePhotoIndex! + 1).padStart(2, '0')} /{' '}
                {String(filteredPhotos.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => setActivePhotoIndex(null)}
                autoFocus
                aria-label="Close gallery lightbox"
                className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-white/20 bg-white/10 text-white transition-colors hover:bg-white hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Center Image Stage */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto my-4 flex w-full max-w-6xl flex-1 items-center justify-center"
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-0 z-20 flex h-11 w-11 items-center justify-center rounded-[2px] border border-white/20 bg-ink/80 text-white transition-colors hover:bg-white hover:text-ink sm:left-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="relative h-[58vh] w-full max-w-4xl sm:h-[68vh]">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-0 z-20 flex h-11 w-11 items-center justify-center rounded-[2px] border border-white/20 bg-ink/80 text-white transition-colors hover:bg-white hover:text-ink sm:right-2"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Bottom Caption & Filmstrip */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto w-full max-w-6xl border-t border-white/15 pt-4"
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <p className="max-w-2xl text-xs leading-relaxed text-white/75 sm:text-sm">
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
                      aria-label={`View ${thumb.title}`}
                      className={cn(
                        'relative h-11 w-11 shrink-0 overflow-hidden rounded-[2px] border transition-opacity',
                        isCurrent
                          ? 'border-gold opacity-100'
                          : 'border-white/20 opacity-45 hover:opacity-85'
                      )}
                    >
                      <Image
                        src={thumb.image}
                        alt={thumb.title}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <CtaBand />
    </div>
  );
}
