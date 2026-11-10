'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import Reveal from '@/components/motion/Reveal';
import AnimeStaggerContainer from '@/components/motion/AnimeStaggerContainer';
import { useEscapeKey, useBodyLock } from '@/hooks';
import { cn } from '@/lib/utils';

type GalleryCategory =
  | 'Eastern Echoes'
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
    category: 'Eastern Echoes',
    eyebrow: 'International Stadium Concert • 19 Dec 2026',
    title: 'Eastern Echoes — Atif Aslam Live',
    description:
      'Official concert poster, stage showcase, and Itahari Stadium (Rangasala) venue frames for Eastern Echoes on December 19, 2026 organized by Jay Media Management.',
    href: '/events/atif-aslam-live-in-nepal',
    linkLabel: 'Concert Details',
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
    title: 'Nepal Kids Idol — Nationwide Auditions',
    description:
      'Official nationwide audition campaign spanning all 77 districts of Nepal and international diaspora hubs.',
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
    href: '/contact',
    linkLabel: 'Inquire Stagecraft',
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
    title: 'Eastern Echoes — Atif Aslam Live Concert Poster',
    badge: 'Official Concert Poster',
    category: 'Eastern Echoes',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/atif-aslam-poster.jpg',
    caption:
      'Jay Media Management presents Eastern Echoes featuring Atif Aslam live at Itahari Stadium (Itahari Rangasala) on December 19, 2026. Official digital ticketing via Khalti by IME.',
  },
  {
    id: 'atif-aslam-banner',
    title: 'Eastern Echoes — Official Concert Showcase',
    badge: 'Headline Showcase',
    category: 'Eastern Echoes',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/atif-aslam-stage.jpg',
    caption:
      'Official showcase artwork for Eastern Echoes featuring Atif Aslam on Saturday, December 19, 2026 at Itahari Stadium.',
  },
  {
    id: 'atif-aslam-venue',
    title: 'Itahari Stadium (Itahari Rangasala) — Concert Arena',
    badge: 'Host Stadium Venue',
    category: 'Eastern Echoes',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/itahari-stadium.jpg',
    caption:
      'Itahari Stadium in Sunsari, Koshi Province — host arena for Eastern Echoes on December 19, 2026 (6:00 PM onwards).',
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
  },
  {
    id: 'koshi-2024-winner',
    title: 'Subha Laxmi Rai — Miss Koshi 2024 Winner',
    badge: 'Grand Winner • #16',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/koshi-winner.png',
    caption:
      'Contestant No. 16 from Itahari crowned Miss Koshi 2024 Season #8 Grand Winner.',
  },
  {
    id: 'koshi-2024-choice',
    title: "Organizer's Choice Winner — Miss Koshi 2024",
    badge: "Organizer's Choice",
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/koshi-organizers-choice.png',
    caption:
      "Honoring the Organizer's Choice titleholder of Miss Koshi Season #8.",
  },
  {
    id: 'koshi-2024-r1',
    title: 'Nishahangma Limbu — 1st Runner Up',
    badge: '1st Runner Up • #09',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/koshi-runner-1.png',
    caption:
      'Contestant No. 09 (Dharan) honored as 1st Runner Up at Miss Koshi 2024 Season #8.',
  },
  {
    id: 'koshi-2024-r2',
    title: '2nd Runner Up — Miss Koshi 2024',
    badge: '2nd Runner Up',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/koshi-runner-2.png',
    caption: 'Official 2nd Runner Up presentation of Miss Koshi 2024 Season #8.',
  },
  {
    id: 'koshi-2024-r3',
    title: '3rd Runner Up — Miss Koshi 2024',
    badge: '3rd Runner Up',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/koshi-runner-3.png',
    caption: 'Official 3rd Runner Up presentation of Miss Koshi 2024 Season #8.',
  },
  {
    id: 'koshi-2024-r4',
    title: '4th Runner Up — Miss Koshi 2024',
    badge: '4th Runner Up',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/koshi-runner-4.png',
    caption: 'Official 4th Runner Up presentation of Miss Koshi 2024 Season #8.',
  },
  {
    id: 'nki-poster-2',
    title: 'Nepal Kids Idol — Auditions Open Nationwide',
    badge: '77 Districts + Global',
    category: 'Nepal Kids Idol',
    aspect: 'aspect-[4/4.5]',
    image: '/images/official/nki-poster.png',
    caption:
      'National & international audition call spanning all 77 districts of Nepal plus global diaspora centers with Rs. 20 Lakhs prize pool.',
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
  'Eastern Echoes',
  'Miss Koshi 2024',
  'Nepal Kids Idol',
  'Mr. & Miss Little Koshi',
  'Stagecraft',
  'Corporate Galas',
] as const;

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(GALLERY_PHOTOS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/gallery')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.photos) && data.photos.length > 0) {
          setPhotos(data.photos);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const filteredPhotos =
    selectedCategory === 'All'
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

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
        eyebrow="Photo Gallery"
        title="Productions & event moments."
        description="Official concert posters, pageant titleholder portraits, and live stage photography across Itahari, Biratnagar, and Koshi Province."
        meta={[
          { label: 'Photos', value: `${photos.length} official frames` },
          { label: 'Collections', value: `${GALLERY_SECTIONS.length} events` },
          { label: 'Region', value: 'Koshi Province' },
          { label: 'Studio', value: 'Central Mall, Biratnagar' },
        ]}
      />

      {/* Category Filter Bar */}
      <div className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur-md">
        <div className="container-ed flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
          {CATEGORIES.map((category) => {
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
                  'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
                  active
                    ? 'bg-forest text-white shadow-2xs'
                    : 'bg-paper-deep text-muted hover:bg-sand hover:text-ink'
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grouped Event Sections */}
      <section className="py-14 md:py-18">
        <div className="container-ed space-y-16">
          {visibleSections.map((section) => {
            const sectionPhotos = photos.filter(
              (photo) => photo.category === section.category
            );
            if (sectionPhotos.length === 0) return null;

            return (
              <div
                key={section.category}
                className="border-t border-line pt-10 first:border-t-0 first:pt-0"
              >
                {/* Section Header */}
                <Reveal className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-forest">
                      {section.eyebrow}
                    </span>
                    <h2 className="mt-1 text-2xl font-semibold text-ink">
                      {section.title}
                    </h2>
                    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
                      {section.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {section.ticketUrl && (
                      <a
                        href={section.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary py-2 text-xs"
                      >
                        <span>Buy Tickets (Khalti)</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}

                    {section.href && (
                      <Link
                        href={section.href}
                        className="btn btn-outline py-2 text-xs"
                      >
                        <span>{section.linkLabel || 'View Event'}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </Reveal>

                {/* Photo Grid */}
                <AnimeStaggerContainer
                  className={cn(
                    'grid gap-6',
                    sectionPhotos.length === 1
                      ? 'max-w-xl grid-cols-1'
                      : 'sm:grid-cols-2 lg:grid-cols-3'
                  )}
                >
                  {sectionPhotos.map((photo) => (
                    <figure
                      key={photo.id}
                      className="card-hover group flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => openPhotoById(photo.id)}
                        aria-label={`Open ${photo.title}`}
                        className={cn(
                          'relative block w-full overflow-hidden bg-paper-deep text-left',
                          photo.aspect
                        )}
                      >
                        <Image
                          src={photo.image}
                          alt={photo.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="img-zoom object-cover"
                        />
                      </button>

                      <figcaption className="flex flex-1 flex-col justify-between p-4">
                        <div>
                          <span className="text-xs font-medium text-forest">
                            {photo.badge || photo.category}
                          </span>
                          <h3 className="mt-1 text-base font-semibold text-ink transition-colors group-hover:text-forest">
                            {photo.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                            {photo.caption}
                          </p>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </AnimeStaggerContainer>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setActivePhotoIndex(null)}
          className="animate-fade-up fixed inset-0 z-[100] flex flex-col justify-between bg-ink/95 p-4 text-white backdrop-blur-sm sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 border-b border-white/15 pb-3"
          >
            <div>
              <span className="text-xs text-white/70">
                {activePhoto.category}
              </span>
              <h2 className="text-base font-semibold text-white sm:text-lg">
                {activePhoto.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setActivePhotoIndex(null)}
              autoFocus
              aria-label="Close gallery lightbox"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors hover:bg-white hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto my-4 flex w-full max-w-5xl flex-1 items-center justify-center"
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-0 z-20 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-ink/80 text-white transition-colors hover:bg-white hover:text-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="relative h-[60vh] w-full max-w-4xl sm:h-[68vh]">
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
              className="absolute right-0 z-20 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-ink/80 text-white transition-colors hover:bg-white hover:text-ink"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto w-full max-w-5xl border-t border-white/15 pt-3 text-xs text-white/75"
          >
            {activePhoto.caption}
          </div>
        </div>
      )}

      <CtaBand />
    </div>
  );
}
