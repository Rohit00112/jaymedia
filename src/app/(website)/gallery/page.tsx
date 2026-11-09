'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import CtaBand from '@/components/shared/CtaBand';
import { useEscapeKey, useBodyLock } from '@/hooks';
import { cn } from '@/lib/utils';

interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Miss Koshi' | 'Mr. & Miss Little Koshi' | 'Stagecraft' | 'Corporate Galas';
  aspect: string;
  image: string;
  caption: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: '1',
    title: 'Miss Koshi Coronation Ceremony',
    category: 'Miss Koshi',
    aspect: 'aspect-[4/3]',
    image:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Official crowning moment and evening gown presentation on the grand stage in Biratnagar.',
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
  {
    id: '5',
    title: 'Traditional Cultural Round',
    category: 'Miss Koshi',
    aspect: 'aspect-square',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Contestants presenting handcrafted ethnic apparel representing Koshi Province heritage.',
  },
  {
    id: '6',
    title: 'Audition Caravan Itahari',
    category: 'Mr. & Miss Little Koshi',
    aspect: 'aspect-[16/10]',
    image:
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Over 100 young talents auditioning during the regional screening caravan in Dharan and Itahari.',
  },
  {
    id: '7',
    title: 'Line Array Audio Tuning',
    category: 'Stagecraft',
    aspect: 'aspect-square',
    image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Acoustic measurement and line array sound distribution across arena auditoriums.',
  },
  {
    id: '8',
    title: 'Executive Media Press Scrum',
    category: 'Corporate Galas',
    aspect: 'aspect-[4/3]',
    image:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Live television broadcast camera setup and press registration during flagship galas.',
  },
  {
    id: '9',
    title: 'Bootcamp Mentorship Clinic',
    category: 'Miss Koshi',
    aspect: 'aspect-[16/10]',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Personality coaching, catwalk choreography, and public speaking clinics with senior mentors.',
  },
  {
    id: '10',
    title: 'Nepal Kids Dancing Championship',
    category: 'Mr. & Miss Little Koshi',
    aspect: 'aspect-square',
    image:
      'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',
    caption:
      'High-energy contemporary and cultural dance choreography live on the Biratnagar arena stage.',
  },
  {
    id: '11',
    title: 'VIP Gala Dinner & Awards',
    category: 'Corporate Galas',
    aspect: 'aspect-[16/10]',
    image:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Prestigious corporate awards ceremony with illuminated banquet tables and live entertainment.',
  },
  {
    id: '12',
    title: 'Arena Lighting & Confetti Finale',
    category: 'Stagecraft',
    aspect: 'aspect-[4/3]',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Grand finale stage curtain call with cold pyrotechnics, atmospheric haze, and LED displays.',
  },
];

const CATEGORIES = [
  'All',
  'Miss Koshi',
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
    <div className="min-h-screen bg-surface text-paper">
      <PageHero
        eyebrow="Production archive"
        title={
          <>
            Moments caught in{' '}
            <span className="serif text-coral">the spotlight.</span>
          </>
        }
        description="A curated photographic retrospective of live stages, crowning moments, and backstage mastery across Biratnagar and Eastern Nepal."
        image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Concert and stage lighting production"
        compact
        meta={[
          { label: 'Archive', value: '12 selected frames' },
          { label: 'Categories', value: '04 collections' },
          { label: 'Region', value: 'Koshi Province' },
          { label: 'Studio', value: 'Biratnagar, Nepal' },
        ]}
      />

      {/* Filter bar */}
      <div className="sticky top-20 z-30 border-b border-line bg-surface/95 backdrop-blur-xl">
        <div className="container-ed flex items-center gap-6 overflow-x-auto py-4 no-scrollbar">
          <span className="eyebrow shrink-0 text-faint">Filter</span>
          <div className="flex shrink-0 items-center gap-6">
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
                  'group flex items-baseline gap-1.5 whitespace-nowrap text-[10px] uppercase tracking-[0.18em] transition-colors',
                  selectedCategory === category
                    ? 'text-coral'
                    : 'text-faint hover:text-paper'
                )}
              >
                <span className="text-[8px] tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      <section className="bg-surface py-12 md:py-20">
        <div className="container-ed">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filteredPhotos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setActivePhotoIndex(index)}
                aria-label={`Open ${photo.title}`}
                className={cn(
                  'group relative mb-4 block w-full overflow-hidden bg-surface-alt text-left',
                  photo.aspect
                )}
              >
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="img-zoom object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="eyebrow text-[8px] text-paper/70">
                      {photo.category}
                    </span>
                    <span className="eyebrow text-[8px] text-paper/60">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    <h2 className="display text-xl leading-none text-paper md:text-2xl">
                      {photo.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-paper/60">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <p className="mt-10 text-center text-[10px] uppercase tracking-[0.2em] text-faint">
            Showing {filteredPhotos.length} of {GALLERY_PHOTOS.length} frames
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-[70] flex flex-col bg-black/96 p-4 backdrop-blur-md sm:p-8"
        >
          <div className="mx-auto flex w-full max-w-6xl items-start justify-between gap-4">
            <div>
              <span className="eyebrow text-coral">
                {activePhoto.category}
              </span>
              <h2 className="display mt-2 text-xl text-paper sm:text-2xl">
                {activePhoto.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setActivePhotoIndex(null)}
              autoFocus
              aria-label="Close gallery lightbox"
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-line text-paper transition-colors hover:border-coral hover:text-coral"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative mx-auto mt-4 flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center">
            <div className="relative h-full max-h-[70vh] w-full overflow-hidden bg-black">
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
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-line bg-black/60 text-paper transition-colors hover:border-coral hover:bg-coral hover:text-ink sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-line bg-black/60 text-paper transition-colors hover:border-coral hover:bg-coral hover:text-ink sm:right-4"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mx-auto mt-4 flex w-full max-w-6xl flex-col justify-between gap-3 border-t border-line pt-4 sm:flex-row sm:items-center">
            <p className="max-w-2xl text-xs leading-relaxed text-muted">
              {activePhoto.caption}
            </p>
            <span className="eyebrow shrink-0 text-faint">
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
