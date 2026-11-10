'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import { useEscapeKey, useBodyLock } from '@/hooks';
import { cn } from '@/lib/utils';

interface GalleryPhoto {
  id: string;
  title: string;
  category:
    | 'Miss Koshi 2024'
    | 'Nepal Kids Idol'
    | 'Mr. & Miss Little Koshi'
    | 'Stagecraft'
    | 'Corporate Galas';
  aspect: string;
  image: string;
  caption: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'koshi-2024-all',
    title: 'Miss Koshi 2024 Season #8 — Grand Titleholders',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[4/4.6]',
    image: '/images/official/koshi-2024-cover.png',
    caption:
      'Congratulations to all winners and runners-up of Miss Koshi 2024 Season #8 presented by Jay Media Management.',
  },
  {
    id: 'koshi-2024-winner',
    title: 'Subha Laxmi Rai — Miss Koshi Winner',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[3/4]',
    image: '/images/official/koshi-winner.png',
    caption:
      'Contestant No. 16 from Itahari crowned Miss Koshi 2024 Season #8 Winner.',
  },
  {
    id: 'koshi-2024-choice',
    title: "Organizer's Choice Winner — Miss Koshi 2024",
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[3/4]',
    image: '/images/official/koshi-organizers-choice.png',
    caption:
      "Honoring the Organizer's Choice titleholder of Miss Koshi Season #8.",
  },
  {
    id: 'koshi-2024-r1',
    title: '1st Runner Up — Miss Koshi 2024',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[3/4]',
    image: '/images/official/koshi-runner-1.png',
    caption: 'Official 1st Runner Up presentation of Miss Koshi 2024.',
  },
  {
    id: 'koshi-2024-r2',
    title: '2nd Runner Up — Miss Koshi 2024',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[3/4]',
    image: '/images/official/koshi-runner-2.png',
    caption: 'Official 2nd Runner Up presentation of Miss Koshi 2024.',
  },
  {
    id: 'koshi-2024-r3',
    title: '3rd Runner Up — Miss Koshi 2024',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[3/4]',
    image: '/images/official/koshi-runner-3.png',
    caption: 'Official 3rd Runner Up presentation of Miss Koshi 2024.',
  },
  {
    id: 'koshi-2024-r4',
    title: '4th Runner Up — Miss Koshi 2024',
    category: 'Miss Koshi 2024',
    aspect: 'aspect-[3/4]',
    image: '/images/official/koshi-runner-4.png',
    caption: 'Official 4th Runner Up presentation of Miss Koshi 2024.',
  },
  {
    id: 'nki-poster-1',
    title: 'Nepal Kids Idol — Jury Announcement',
    category: 'Nepal Kids Idol',
    aspect: 'aspect-[4/5]',
    image: '/images/official/nki-cover.png',
    caption:
      'Celebrated vocalist Mrs. Lochan Bhattarai joining the official jury panel for Nepal Kids Idol Season One.',
  },
  {
    id: 'nki-poster-2',
    title: 'Nepal Kids Idol — Auditions Open Nationwide',
    category: 'Nepal Kids Idol',
    aspect: 'aspect-[4/3.4]',
    image: '/images/official/nki-poster.png',
    caption:
      'National & international audition call spanning all 77 districts of Nepal plus global diaspora centers.',
  },
  {
    id: '2',
    title: 'Little Koshi Talent Round',
    category: 'Mr. & Miss Little Koshi',
    aspect: 'aspect-square',
    image:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Young participants performing vocal recitations and creative showcases.',
  },
  {
    id: '3',
    title: 'Intelligent Beam Rigging',
    category: 'Stagecraft',
    aspect: 'aspect-[16/10]',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Calibrating dynamic DMX moving heads and atmospheric haze for arena productions.',
  },
  {
    id: '4',
    title: 'Corporate Brand Reveal Stage',
    category: 'Corporate Galas',
    aspect: 'aspect-[4/3]',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    caption:
      'High-profile commercial unveiling with VIP executive seating protocol in Eastern Nepal.',
  },
];

const CATEGORIES = [
  'All',
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

  const activePhoto =
    activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

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
        description="A curated photographic retrospective of live stages, crowning moments, and backstage mastery across Biratnagar and Eastern Nepal."
        image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Concert and stage lighting production"
        compact
        meta={[
          { label: 'Archive', value: '12 official & studio frames' },
          { label: 'Categories', value: '05 collections' },
          { label: 'Region', value: 'Koshi Province' },
          { label: 'Studio', value: 'Central Mall, Biratnagar' },
        ]}
      />

      <div className="sticky top-[var(--nav-height)] z-30 border-b border-line bg-paper/92 backdrop-blur-xl">
        <div className="container-ed flex items-center gap-6 overflow-x-auto py-4 no-scrollbar">
          <span className="eyebrow shrink-0 text-faint">Filter</span>
          <div className="flex shrink-0 items-stretch gap-6">
            {CATEGORIES.map((category, index) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setActivePhotoIndex(null);
                }}
                aria-pressed={selectedCategory === category}
                className={cn(
                  'group relative flex items-baseline gap-1.5 whitespace-nowrap py-1 text-[12px] font-medium tracking-[0.005em] transition-colors',
                  selectedCategory === category
                    ? 'text-ink'
                    : 'text-muted hover:text-ink'
                )}
              >
                <span className="font-mono text-[8px] tabular-nums text-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {category}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-px w-full origin-left bg-accent transition-transform duration-300',
                    selectedCategory === category
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  )}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-paper py-12 md:py-16">
        <div className="container-ed">
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {filteredPhotos.map((photo, index) => (
              <figure
                key={photo.id}
                className="mb-5 break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => setActivePhotoIndex(index)}
                  aria-label={`Open ${photo.title}`}
                  className={cn(
                    'group relative block w-full overflow-hidden rounded-[0.6rem] border border-line bg-sand text-left shadow-2xs transition-all duration-300 hover:border-forest hover:shadow-md',
                    photo.aspect
                  )}
                >
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="img-zoom object-cover"
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-cream text-ink opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </button>

                <figcaption className="mt-3 flex items-start justify-between gap-4 border-t border-line pt-3">
                  <div>
                    <h2 className="display text-base leading-snug text-ink md:text-lg">
                      {photo.title}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                      {photo.caption}
                    </p>
                  </div>
                  <span className="eyebrow mt-0.5 shrink-0 text-[7px] text-accent">
                    {photo.category}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-10 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
            Showing {filteredPhotos.length} of {GALLERY_PHOTOS.length} frames
          </p>
        </div>
      </section>

      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="backdrop-in fixed inset-0 z-[80] flex flex-col bg-ink/96 p-4 backdrop-blur-md sm:p-8"
        >
          <div className="mx-auto flex w-full max-w-6xl items-start justify-between gap-4">
            <div>
              <span className="eyebrow text-gold">{activePhoto.category}</span>
              <h2 className="display mt-2 text-xl text-cream sm:text-2xl">
                {activePhoto.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setActivePhotoIndex(null)}
              autoFocus
              aria-label="Close gallery lightbox"
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              <X className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
            </button>
          </div>

          <div className="relative mx-auto mt-4 flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center">
            <div className="relative h-full max-h-[70vh] w-full overflow-hidden rounded-[0.3rem] bg-black">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 bg-ink/70 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 bg-ink/70 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink sm:right-4"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mx-auto mt-4 flex w-full max-w-6xl flex-col justify-between gap-3 border-t border-cream/15 pt-4 sm:flex-row sm:items-center">
            <p className="max-w-2xl text-xs leading-relaxed text-cream/65">
              {activePhoto.caption}
            </p>
            <span className="eyebrow shrink-0 text-cream/50">
              {String(activePhotoIndex! + 1).padStart(2, '0')} /{' '}
              {String(filteredPhotos.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}

      <CtaBand />
    </div>
  );
}
