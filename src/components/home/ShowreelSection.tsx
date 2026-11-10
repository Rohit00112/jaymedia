'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { OFFICIAL_VIDEOS } from '@/config/videos-data';
import { cn } from '@/lib/utils';

export default function ShowreelSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeVideo = OFFICIAL_VIDEOS[selectedIndex];

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
        <SectionHeading
          eyebrow="Videos & Highlights"
          title="Watch our live productions."
          description="Highlights, grand finales, and official announcements from our YouTube archive."
          link={{
            href: 'https://www.youtube.com/@JayMediaManagementPvtLtd',
            label: 'YouTube Channel',
          }}
        />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Active 16:9 Video Player */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-lg border border-line bg-paper-deep">
              <div className="relative aspect-video w-full overflow-hidden bg-ink">
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
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/35 transition-opacity group-hover:bg-ink/25" />

                    <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white text-ink shadow-lg transition-transform duration-200 group-hover:scale-105">
                      <Play className="ml-0.5 h-6 w-6 fill-ink text-ink" />
                    </span>
                  </button>
                )}
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-forest">
                  {activeVideo.category}
                </p>
                <h3 className="display mt-1 text-xl font-bold text-ink">
                  {activeVideo.title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {activeVideo.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Clean Video Playlist */}
          <div className="lg:col-span-4">
            <div
              data-lenis-prevent
              className="playlist-scroll max-h-[480px] space-y-2.5 overflow-y-auto overscroll-contain pr-1"
            >
              {OFFICIAL_VIDEOS.map((video, idx) => {
                const isActive = idx === selectedIndex;
                return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => handleSelectVideo(idx)}
                    className={cn(
                      'flex w-full items-center gap-3.5 rounded-lg border p-3 text-left transition-colors',
                      isActive
                        ? 'border-forest bg-forest text-white'
                        : 'border-line bg-paper-deep/50 text-ink hover:border-forest/50 hover:bg-white'
                    )}
                  >
                    <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded bg-ink">
                      <Image
                        src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={video.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'block text-[11px] font-medium',
                          isActive ? 'text-gold' : 'text-forest'
                        )}
                      >
                        {video.category}
                      </span>
                      <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug">
                        {video.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
