'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Play, Video as VideoIcon } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { OFFICIAL_VIDEOS, type VideoReelItem } from '@/config/videos-data';
import type { VideoDocument } from '@/lib/backend/schemas';
import { cn } from '@/lib/utils';
import { getYouTubeThumbnail, getYouTubeEmbedUrl } from '@/lib/youtube';

type VideoItem = VideoDocument | VideoReelItem;

interface ShowreelSectionProps {
  initialVideos?: VideoItem[];
}

export default function ShowreelSection({ initialVideos }: ShowreelSectionProps) {
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    if (initialVideos && initialVideos.length > 0) {
      return initialVideos;
    }
    return OFFICIAL_VIDEOS;
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync if initialVideos changes (e.g. server revalidation)
  useEffect(() => {
    if (initialVideos && initialVideos.length > 0) {
      setVideos(initialVideos);
    }
  }, [initialVideos]);

  // Fallback client fetch to pick up dynamic updates if no initial SSR list was passed
  useEffect(() => {
    let active = true;
    if (!initialVideos || initialVideos.length === 0) {
      fetch('/api/videos')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (active && Array.isArray(data?.videos) && data.videos.length > 0) {
            setVideos(data.videos);
          }
        })
        .catch(() => {});
    }
    return () => {
      active = false;
    };
  }, [initialVideos]);

  const activeVideo = videos[selectedIndex] || videos[0] || null;

  const handleSelectVideo = (index: number) => {
    setSelectedIndex(index);
    setIsPlaying(true);
  };

  if (!activeVideo) {
    return null;
  }

  const activeThumbnail = getYouTubeThumbnail(activeVideo.youtubeId);
  const activeEmbedUrl = getYouTubeEmbedUrl(activeVideo.youtubeId, true);

  return (
    <section
      id="showreel"
      className="border-b border-line bg-paper-deep/50 py-16 md:py-20"
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

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Active 16:9 Video Player */}
          <Reveal className="lg:col-span-8">
            <div className="overflow-hidden rounded-xl border border-line bg-white transition-shadow duration-300 hover:shadow-sm">
              <div className="relative aspect-video w-full overflow-hidden bg-ink">
                {isPlaying ? (
                  <iframe
                    key={activeVideo.youtubeId}
                    className="h-full w-full"
                    src={activeEmbedUrl}
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
                    {activeThumbnail ? (
                      <Image
                        src={activeThumbnail}
                        alt={activeVideo.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="img-zoom object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-paper-deep text-muted">
                        <VideoIcon className="h-10 w-10 text-muted" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-ink/30 transition-opacity duration-300 group-hover:bg-ink/20" />

                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-0.5 h-5 w-5 fill-ink text-ink" />
                    </span>
                  </button>
                )}
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-forest">
                  {activeVideo.category}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-ink">
                  {activeVideo.title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {activeVideo.subtitle}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Video Playlist */}
          <Reveal delay={0.08} className="lg:col-span-4">
            <div className="playlist-scroll max-h-[460px] space-y-2 overflow-y-auto pr-1">
              {videos.map((video, idx) => {
                const isActive = idx === selectedIndex;
                const thumb = getYouTubeThumbnail(video.youtubeId);
                return (
                  <button
                    key={video.id || video.youtubeId}
                    type="button"
                    onClick={() => handleSelectVideo(idx)}
                    className={cn(
                      'group flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-all duration-200',
                      isActive
                        ? 'border-forest bg-forest-soft/70 text-ink shadow-2xs'
                        : 'border-line bg-white text-ink hover:-translate-y-0.5 hover:border-line-strong hover:shadow-2xs'
                    )}
                  >
                    <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg bg-ink">
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt={video.title}
                          fill
                          sizes="96px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-paper-deep text-muted">
                          <VideoIcon className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="block text-[11px] font-medium text-forest">
                        {video.category}
                      </span>
                      <p className="mt-0.5 line-clamp-2 text-xs font-medium leading-snug text-ink transition-colors group-hover:text-forest">
                        {video.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
