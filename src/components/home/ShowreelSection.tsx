'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import anime from 'animejs';
import { ChevronDown, ChevronUp, Play, Tv } from 'lucide-react';
import { OFFICIAL_VIDEOS } from '@/config/videos-data';
import { cn, prefersReducedMotion } from '@/lib/utils';

export default function ShowreelSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const metaRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const activeVideo = OFFICIAL_VIDEOS[selectedIndex];

  const scrollPlaylist = (direction: 'up' | 'down') => {
    listRef.current?.scrollBy({
      top: direction === 'down' ? 180 : -180,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!metaRef.current || prefersReducedMotion()) return;
    anime({
      targets: metaRef.current,
      opacity: [0, 1],
      translateY: [6, 0],
      duration: 380,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    });
  }, [selectedIndex]);

  const handleSelectVideo = (index: number) => {
    setSelectedIndex(index);
    setIsPlaying(true);
  };

  return (
    <section
      id="showreel"
      className="border-b border-line bg-white py-20 md:py-24"
    >
      <div className="container-ed">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-line pb-5 md:mb-12 md:flex-row md:items-end">
          <div>
            <span className="eyebrow inline-flex items-center gap-2.5 text-forest">
              <span className="h-2.5 w-1 bg-forest" aria-hidden="true" />
              04 / Broadcast Screening Room
            </span>
            <h2 className="display mt-3 text-[clamp(2.1rem,4vw,3.6rem)] font-bold text-ink">
              Moments captured{' '}
              <span className="text-forest">on air.</span>
            </h2>
          </div>

          <a
            href="https://www.youtube.com/@JayMediaManagementPvtLtd"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline bg-white"
          >
            <Tv className="h-3.5 w-3.5 text-forest" />
            <span>YouTube Channel</span>
          </a>
        </div>

        {/* Flipped Monitor Layout: Scrollable Playlist LEFT, 16:9 Cinema Stage RIGHT */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Curated Playlist (Flush Matched Height + data-lenis-prevent) */}
          <div className="order-2 lg:order-1 lg:col-span-4 lg:relative">
            <div className="flex flex-col border border-line bg-paper-deep p-4 lg:absolute lg:inset-0">
              <div className="mb-3 flex shrink-0 items-center justify-between gap-2 border-b border-line pb-3">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
                  Production Playlist
                </span>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10.5px] font-medium text-muted">
                    {OFFICIAL_VIDEOS.length} Reels
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => scrollPlaylist('up')}
                      aria-label="Scroll playlist up"
                      className="inline-flex h-6 w-6 items-center justify-center rounded-[2px] border border-line bg-white text-ink transition-colors hover:border-forest hover:text-forest"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollPlaylist('down')}
                      aria-label="Scroll playlist down"
                      className="inline-flex h-6 w-6 items-center justify-center rounded-[2px] border border-line bg-white text-ink transition-colors hover:border-forest hover:text-forest"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div
                ref={listRef}
                data-lenis-prevent
                tabIndex={0}
                aria-label="Production video playlist"
                className="playlist-scroll min-h-0 max-h-[360px] flex-1 space-y-2 overflow-y-auto overscroll-contain pr-2 focus:outline-none lg:max-h-none"
              >
                {OFFICIAL_VIDEOS.map((video, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => handleSelectVideo(idx)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-[2px] border p-2 text-left transition-all',
                        isActive
                          ? 'border-forest bg-forest text-white'
                          : 'border-line bg-white text-ink hover:border-forest/50'
                      )}
                    >
                      <span
                        className={cn(
                          'mono w-5 shrink-0 text-center text-[10px] font-semibold',
                          isActive ? 'text-gold' : 'text-faint'
                        )}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <div className="relative aspect-video w-20 shrink-0 overflow-hidden rounded-[2px] bg-ink">
                        <Image
                          src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                          alt={video.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                        {isActive && (
                          <span className="absolute inset-0 flex items-center justify-center bg-forest/55">
                            <Play className="h-3.5 w-3.5 fill-gold text-gold" />
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <span
                          className={cn(
                            'block font-mono text-[9px] uppercase tracking-wider',
                            isActive ? 'text-gold' : 'text-forest'
                          )}
                        >
                          {video.category}
                        </span>
                        <p className="mt-0.5 line-clamp-2 text-xs font-bold leading-snug">
                          {video.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Active 16:9 Broadcast Monitor */}
          <div className="order-1 lg:order-2 lg:col-span-8">
            <div className="border-2 border-ink bg-paper-deep p-3">
              <div className="relative aspect-video w-full overflow-hidden rounded-[2px] bg-ink">
                {isPlaying ? (
                  <iframe
                    key={activeVideo.youtubeId}
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    aria-label={`Play ${activeVideo.title}`}
                    className="group relative flex h-full w-full items-center justify-center text-left"
                  >
                    <Image
                      src={`https://i.ytimg.com/vi/${activeVideo.youtubeId}/hqdefault.jpg`}
                      alt={activeVideo.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

                    <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-forest text-white shadow-2xl ring-2 ring-gold/60 transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-0.5 h-6 w-6 fill-gold text-gold" />
                    </span>

                    <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
                        {activeVideo.category}
                      </span>
                      <h3 className="display mt-1 text-xl font-bold sm:text-2xl">
                        {activeVideo.title}
                      </h3>
                    </div>
                  </button>
                )}
              </div>

              <div
                ref={metaRef}
                className="flex flex-wrap items-center justify-between gap-3 px-2 pb-1 pt-3"
              >
                <div>
                  <h3 className="display text-lg font-bold text-ink">
                    {activeVideo.title}
                  </h3>
                  <p className="text-xs text-muted">{activeVideo.subtitle}</p>
                </div>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-forest">
                  Reel {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                  {String(OFFICIAL_VIDEOS.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
