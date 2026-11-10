'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface FacebookFeedEmbedProps {
  pageUrl?: string;
  height?: number;
}

export default function FacebookFeedEmbed({
  pageUrl = siteConfig.social.facebook,
  height = 500,
}: FacebookFeedEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(500);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      const measured = entries[0]?.contentRect.width;
      if (measured && measured > 0) {
        const clamped = Math.max(280, Math.min(500, Math.floor(measured)));
        setContainerWidth((prev) =>
          Math.abs(prev - clamped) >= 16 ? clamped : prev
        );
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const pluginSrc = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    pageUrl
  )}&tabs=timeline&width=${containerWidth}&height=${height}&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`;

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <span className="text-xs font-medium text-ink">
          @JayMediaManagement
        </span>
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-forest hover:underline"
        >
          <span>Open Facebook</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div
        ref={containerRef}
        className="playlist-scroll relative mx-auto w-full max-w-[500px] overflow-x-hidden overflow-y-auto bg-white"
        style={{ height }}
      >
        {!loaded && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 space-y-3 bg-white p-5"
          >
            <div className="h-24 w-full animate-pulse rounded-lg bg-paper-deep" />
            <div className="h-4 w-40 animate-pulse rounded bg-paper-deep" />
            <div className="h-28 w-full animate-pulse rounded-lg bg-paper-deep" />
          </div>
        )}

        <iframe
          title="Jay Media Management Official Facebook Feed"
          src={pluginSrc}
          width={containerWidth}
          height={height}
          scrolling="yes"
          style={{ border: 'none', width: '100%', height: `${height}px` }}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
