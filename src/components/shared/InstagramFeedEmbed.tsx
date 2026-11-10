'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface InstagramFeedEmbedProps {
  profileUrl?: string;
  height?: number;
}

export default function InstagramFeedEmbed({
  profileUrl = siteConfig.social.instagram ||
    'https://www.instagram.com/jaymediamanagement/',
  height = 500,
}: InstagramFeedEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  const cleanUrl = profileUrl.replace(/\/+$/, '');
  const embedSrc = `${cleanUrl}/embed/`;

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <span className="text-xs font-medium text-ink">
          @jaymediamanagement
        </span>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-forest hover:underline"
        >
          <span>Open Instagram</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div
        className="playlist-scroll relative w-full overflow-x-hidden overflow-y-auto bg-white"
        style={{ height }}
      >
        {!loaded && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 space-y-3 bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 animate-pulse rounded-full bg-paper-deep" />
              <div className="space-y-2">
                <div className="h-3.5 w-36 animate-pulse rounded bg-paper-deep" />
                <div className="h-3 w-24 animate-pulse rounded bg-paper-deep" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="aspect-square animate-pulse rounded bg-paper-deep" />
              <div className="aspect-square animate-pulse rounded bg-paper-deep" />
              <div className="aspect-square animate-pulse rounded bg-paper-deep" />
              <div className="aspect-square animate-pulse rounded bg-paper-deep" />
              <div className="aspect-square animate-pulse rounded bg-paper-deep" />
              <div className="aspect-square animate-pulse rounded bg-paper-deep" />
            </div>
          </div>
        )}

        <iframe
          title="Jay Media Management Official Instagram Feed"
          src={embedSrc}
          scrolling="yes"
          style={{ border: 'none', width: '100%', height: `${height}px` }}
          allow="encrypted-media; picture-in-picture; web-share"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}

