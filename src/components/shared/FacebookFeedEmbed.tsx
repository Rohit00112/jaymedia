'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface FacebookFeedEmbedProps {
  pageUrl?: string;
  height?: number;
}

/**
 * Responsive official Meta Page Plugin timeline iframe for Jay Media Management.
 * Uses ResizeObserver clamped to Meta's supported 280px–500px bounds and sets
 * data-lenis-prevent so wheel/touch gestures scroll inside the timeline cleanly.
 */
export default function FacebookFeedEmbed({
  pageUrl = siteConfig.social.facebook,
  height = 580,
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
  )}&tabs=timeline&width=${containerWidth}&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <div className="border-2 border-ink bg-paper-deep p-2.5">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-3">
        <div className="min-w-0">
          <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
            @JayMediaManagement
          </span>
          <span className="block truncate text-xs font-semibold text-ink">
            Official Facebook Timeline
          </span>
        </div>

        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 rounded-[2px] border border-line-strong bg-paper-deep px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-forest hover:bg-forest hover:text-white"
        >
          <span>Open Page</span>
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>

      <div
        ref={containerRef}
        data-lenis-prevent
        className="playlist-scroll relative mx-auto w-full max-w-[500px] overflow-x-hidden overflow-y-auto overscroll-contain bg-white"
        style={{ height }}
      >
        {!loaded && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex flex-col justify-between border-b border-line bg-white p-6"
          >
            <div className="space-y-3">
              <div className="h-28 w-full animate-pulse bg-paper-deep" />
              <div className="h-4 w-48 animate-pulse bg-paper-deep" />
              <div className="h-3 w-64 animate-pulse bg-paper-deep" />
            </div>
            <div className="space-y-2.5">
              <div className="h-24 w-full animate-pulse bg-paper-deep" />
              <div className="h-24 w-full animate-pulse bg-paper-deep" />
            </div>
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

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-white px-4 py-2.5 text-[11px] text-muted">
        <span>Scroll inside frame to browse recent dispatches</span>
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-forest hover:underline"
        >
          facebook.com/JayMediaManagement
        </a>
      </div>
    </div>
  );
}
