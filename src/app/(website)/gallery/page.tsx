'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Eye, Filter } from 'lucide-react';
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
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    caption: 'Official crowning moment and evening gown presentation on the grand stage in Biratnagar.',
  },
  {
    id: '2',
    title: 'Little Koshi Talent Round',
    category: 'Mr. & Miss Little Koshi',
    aspect: 'aspect-square',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    caption: 'Young participants performing vocal recitations and creative showcases.',
  },
  {
    id: '3',
    title: 'Intelligent Beam Rigging',
    category: 'Stagecraft',
    aspect: 'aspect-[16/10]',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    caption: 'Calibrating dynamic DMX moving heads and atmospheric haze for arena productions.',
  },
  {
    id: '4',
    title: 'Corporate Brand Reveal Stage',
    category: 'Corporate Galas',
    aspect: 'aspect-[4/3]',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    caption: 'High-profile commercial unveiling with VIP executive seating protocol in Eastern Nepal.',
  },
  {
    id: '5',
    title: 'Traditional Cultural Round',
    category: 'Miss Koshi',
    aspect: 'aspect-square',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    caption: 'Contestants presenting handcrafted ethnic apparel representing Koshi Province heritage.',
  },
  {
    id: '6',
    title: 'Audition Caravan Itahari',
    category: 'Mr. & Miss Little Koshi',
    aspect: 'aspect-[16/10]',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    caption: 'Over 100 young talents auditioning during the regional screening caravan in Dharan and Itahari.',
  },
  {
    id: '7',
    title: 'Line Array Audio Tuning',
    category: 'Stagecraft',
    aspect: 'aspect-square',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    caption: 'Acoustic measurement and line array sound distribution across arena auditoriums.',
  },
  {
    id: '8',
    title: 'Executive Media Press Scrum',
    category: 'Corporate Galas',
    aspect: 'aspect-[4/3]',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    caption: 'Live television broadcast camera setup and press registration during flagship galas.',
  },
  {
    id: '9',
    title: 'Bootcamp Mentorship Clinic',
    category: 'Miss Koshi',
    aspect: 'aspect-[16/10]',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Personality coaching, catwalk choreography, and public speaking clinics with senior mentors.',
  },
  {
    id: '10',
    title: 'Nepal Kids Dancing Championship',
    category: 'Mr. & Miss Little Koshi',
    aspect: 'aspect-square',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',
    caption: 'High-energy contemporary and cultural dance choreography live on the Biratnagar arena stage.',
  },
  {
    id: '11',
    title: 'VIP Gala Dinner & Awards',
    category: 'Corporate Galas',
    aspect: 'aspect-[16/10]',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    caption: 'Prestigious corporate awards ceremony with illuminated banquet tables and live entertainment.',
  },
  {
    id: '12',
    title: 'Arena Lighting & Confetti Finale',
    category: 'Stagecraft',
    aspect: 'aspect-[4/3]',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    caption: 'Grand finale stage curtain call with cold pyrotechnics, atmospheric haze, and LED displays.',
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
    <div className="bg-black text-white min-h-screen font-rubik">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-black text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0c0c11] to-black opacity-90" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1 bg-[#01402b]/80 border border-[#01402b] text-[#eef9ff] text-xs font-rubik font-medium tracking-widest uppercase rounded-[50px]">
              Visual Vault
            </span>
            <span className="section-label text-coral font-medium tracking-[0.2em]">
              PRODUCTION ARCHIVE
            </span>
          </div>
          <h1 className="editorial-headline text-white text-5xl sm:text-6xl lg:text-8xl max-w-5xl leading-[0.95] mb-6 font-rubik">
            MOMENTS CAUGHT IN THE SPOTLIGHT.
          </h1>
          <p className="text-[#eef9ff]/80 text-lg sm:text-xl max-w-2xl font-rubik leading-relaxed">
            A curated photographic retrospective of live stages, crowning moments, and backstage mastery across
            Biratnagar and eastern Nepal.
          </p>
        </div>
      </section>

      {/* ─── Filter Bar ──────────────────────────────────────── */}
      <div className="sticky top-20 z-30 bg-black/95 backdrop-blur-md border-b border-white/10 py-4 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-4 no-scrollbar">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-coral shrink-0" />
            <span className="text-xs uppercase font-rubik tracking-wider text-[#eef9ff]/60 font-semibold mr-2 shrink-0">
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
                  'px-4 py-2 text-xs font-rubik uppercase tracking-wider font-medium transition-all rounded-[50px]',
                  selectedCategory === cat
                    ? 'bg-coral text-white shadow-md'
                    : 'bg-white/5 border border-white/10 text-[#eef9ff]/70 hover:bg-white/10 hover:text-white'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Gallery Grid ────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-6 sm:px-10 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIndex(index)}
                className={cn(
                  'group relative overflow-hidden bg-black border border-white/10 rounded-[10px] cursor-pointer shadow-lg hover:border-coral/50 transition-all duration-300',
                  photo.aspect
                )}
              >
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 opacity-90 group-hover:opacity-95 transition-opacity z-[1]" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-rubik px-3 py-1 bg-[#01402b]/90 border border-[#01402b] text-[#eef9ff] font-medium tracking-wider rounded-[50px] backdrop-blur-sm">
                      {photo.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-coral/80 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-rubik text-xl font-bold text-white mb-1 leading-snug drop-shadow-md">
                      {photo.title}
                    </h3>
                    <p className="text-xs font-rubik text-[#eef9ff]/85 line-clamp-2">
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
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-10"
        >
          {/* Top Bar with Close */}
          <div className="w-full max-w-5xl flex items-center justify-between text-white mb-4">
            <div>
              <span className="text-xs uppercase font-rubik tracking-wider text-coral font-semibold">
                {activePhoto.category}
              </span>
              <h4 className="font-rubik text-lg font-bold text-white">
                {activePhoto.title}
              </h4>
            </div>

            <button
              onClick={() => setActivePhotoIndex(null)}
              aria-label="Close Lightbox"
              className="text-white hover:text-coral transition-colors flex items-center gap-2 text-xs uppercase font-rubik tracking-wider"
            >
              <span>Close</span>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Image View with Full-Bleed Photograph */}
          <div className="relative w-full max-w-5xl aspect-video bg-black border border-white/10 rounded-[10px] overflow-hidden shadow-2xl">
            <Image
              src={activePhoto.image}
              alt={activePhoto.title}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-6 bg-black/85 backdrop-blur-md border-t border-white/10 z-10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-rubik text-xl sm:text-2xl font-bold text-white mb-1">{activePhoto.title}</h3>
                <p className="font-rubik text-xs sm:text-sm text-[#eef9ff]/80 max-w-2xl leading-relaxed">
                  {activePhoto.caption}
                </p>
              </div>
              <span className="text-[10px] uppercase font-rubik tracking-wider text-[#eef9ff]/50 shrink-0">
                Jay Media Archives • Biratnagar
              </span>
            </div>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-coral text-white flex items-center justify-center transition-colors z-20 border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next Photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-coral text-white flex items-center justify-center transition-colors z-20 border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Counter */}
          <div className="mt-4 text-xs font-rubik uppercase tracking-wider text-[#eef9ff]/50">
            {activePhotoIndex! + 1} of {filteredPhotos.length}
          </div>
        </div>
      )}
    </div>
  );
}

