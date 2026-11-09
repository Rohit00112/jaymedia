'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, Eye, Sparkles, Filter } from 'lucide-react';
import { useEscapeKey, useBodyLock } from '@/hooks';
import { cn } from '@/lib/utils';

interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Miss Koshi' | 'Mr. & Miss Little Koshi' | 'Stagecraft' | 'Corporate Galas';
  aspect: string;
  colorScheme: string;
  caption: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: '1',
    title: 'Miss Koshi Coronation Ceremony',
    category: 'Miss Koshi',
    aspect: 'aspect-[4/3]',
    colorScheme: 'from-[#2A1B36] to-[#120F18]',
    caption: 'Official crowning moment on the grand stage in Biratnagar.',
  },
  {
    id: '2',
    title: 'Little Koshi Talent Round',
    category: 'Mr. & Miss Little Koshi',
    aspect: 'aspect-square',
    colorScheme: 'from-[#1B2A24] to-[#0F1814]',
    caption: 'Young participants performing vocal recitations in Dharan.',
  },
  {
    id: '3',
    title: 'Intelligent Beam Rigging',
    category: 'Stagecraft',
    aspect: 'aspect-[16/10]',
    colorScheme: 'from-[#1E202B] to-[#101015]',
    caption: 'Calibrating dynamic DMX moving heads and atmospheric haze.',
  },
  {
    id: '4',
    title: 'Corporate Brand Reveal Stage',
    category: 'Corporate Galas',
    aspect: 'aspect-[4/3]',
    colorScheme: 'from-[#2A231B] to-[#18130F]',
    caption: 'High-profile commercial unveiling with VIP seating protocol.',
  },
  {
    id: '5',
    title: 'Traditional Cultural Round',
    category: 'Miss Koshi',
    aspect: 'aspect-square',
    colorScheme: 'from-[#361B22] to-[#180F12]',
    caption: 'Contestants presenting handcrafted ethnic apparel representing Koshi Province.',
  },
  {
    id: '6',
    title: 'Audition Caravan Itahari',
    category: 'Mr. & Miss Little Koshi',
    aspect: 'aspect-[16/10]',
    colorScheme: 'from-[#1B2936] to-[#0F1418]',
    caption: 'Over 100 young talents auditioning during the Itahari screening caravan.',
  },
  {
    id: '7',
    title: 'Line Array Audio Tuning',
    category: 'Stagecraft',
    aspect: 'aspect-square',
    colorScheme: 'from-[#231B2A] to-[#130F18]',
    caption: 'Acoustic measurement and sound distribution across arena seating.',
  },
  {
    id: '8',
    title: 'Executive Media Press Scrum',
    category: 'Corporate Galas',
    aspect: 'aspect-[4/3]',
    colorScheme: 'from-[#2A1B1B] to-[#180F0F]',
    caption: 'Live television journalists and photographers covering keynote speeches.',
  },
  {
    id: '9',
    title: 'Bootcamp Mentorship Clinic',
    category: 'Miss Koshi',
    aspect: 'aspect-[16/10]',
    colorScheme: 'from-[#1B2E2A] to-[#0F1816]',
    caption: 'Personality coaching and public speaking training with senior mentors.',
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
      : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  useEscapeKey(() => setActivePhotoIndex(null), activePhotoIndex !== null);
  useBodyLock(activePhotoIndex !== null);

  const handleNext = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div className="bg-warm-ivory text-ink min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-ink text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-dark-surface to-ink opacity-90" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="section-label text-coral font-medium tracking-[0.25em] mb-4 block">
            PRODUCTION ARCHIVE
          </span>
          <h1 className="editorial-headline text-white text-5xl sm:text-6xl lg:text-8xl max-w-5xl leading-[0.95] mb-6">
            MOMENTS CAUGHT IN THE SPOTLIGHT.
          </h1>
          <p className="text-muted-grey text-lg sm:text-xl max-w-2xl font-body leading-relaxed">
            A curated photographic retrospective of live stages, crowning moments, and backstage mastery across
            Biratnagar and eastern Nepal.
          </p>
        </div>
      </section>

      {/* ─── Filter Bar ──────────────────────────────────────── */}
      <div className="sticky top-20 z-30 bg-warm-ivory/95 backdrop-blur-md border-b border-divider py-4 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-4 no-scrollbar">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-coral shrink-0" />
            <span className="text-xs uppercase font-display tracking-widest text-ink/60 font-semibold mr-2 shrink-0">
              Filter:
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActivePhotoIndex(null);
                }}
                className={cn(
                  'px-4 py-2 text-xs font-display uppercase tracking-widest transition-all rounded-none',
                  selectedCategory === cat
                    ? 'bg-ink text-white shadow-sm'
                    : 'bg-white border border-ink/10 text-ink/70 hover:bg-ink/5'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Gallery Grid ────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIndex(index)}
                className={cn(
                  'group relative overflow-hidden bg-gradient-to-br border border-ink/10 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300',
                  photo.aspect,
                  photo.colorScheme
                )}
              >
                {/* Visual texture overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10 bg-gradient-to-t from-ink/90 via-transparent to-ink/30 opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-display px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-coral tracking-wider">
                      {photo.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center text-coral group-hover:scale-110 transition-transform">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold text-white mb-1 leading-snug">
                      {photo.title}
                    </h3>
                    <p className="text-xs font-body text-white/70 line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Fullscreen Lightbox Modal ───────────────────────── */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-10"
        >
          {/* Top Bar with Close */}
          <div className="w-full max-w-5xl flex items-center justify-between text-white mb-4">
            <div>
              <span className="text-xs uppercase font-display tracking-widest text-coral font-semibold">
                {activePhoto.category}
              </span>
              <h4 className="font-display text-lg font-bold text-white">
                {activePhoto.title}
              </h4>
            </div>

            <button
              onClick={() => setActivePhotoIndex(null)}
              aria-label="Close Lightbox"
              className="text-white/70 hover:text-coral transition-colors flex items-center gap-2 text-xs uppercase font-display tracking-widest"
            >
              <span>Close</span>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Image View */}
          <div className="relative w-full max-w-5xl aspect-video bg-gradient-to-br from-[#1F1F28] to-ink border border-white/10 flex items-center justify-center p-8 overflow-hidden shadow-2xl">
            <div className="text-center max-w-xl text-white">
              <Sparkles className="w-10 h-10 text-coral mx-auto mb-4 animate-pulse" />
              <h3 className="font-display text-3xl font-bold mb-3">{activePhoto.title}</h3>
              <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed mb-4">
                {activePhoto.caption}
              </p>
              <span className="text-[11px] uppercase font-display tracking-widest text-white/40 block">
                Jay Media Management Production Archives • Biratnagar, Nepal
              </span>
            </div>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-coral text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next Photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-coral text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Counter */}
          <div className="mt-4 text-xs font-display uppercase tracking-widest text-white/50">
            {activePhotoIndex! + 1} of {filteredPhotos.length}
          </div>
        </div>
      )}
    </div>
  );
}
