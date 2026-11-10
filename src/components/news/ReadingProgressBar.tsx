'use client';

import { useEffect, useState } from 'react';

/**
 * Editorial reading progress bar across the top of news articles.
 * Uses hardware-accelerated scaleX for 60fps scrolling without layout reflows.
 */
export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const currentProgress = Math.min(
          1,
          Math.max(0, window.scrollY / scrollHeight)
        );
        setProgress(currentProgress);
      } else {
        setProgress(0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] pointer-events-none bg-paper-deep/60"
    >
      <div
        className="h-full bg-forest transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `scaleX(${progress})`,
          transformOrigin: 'left',
        }}
      />
    </div>
  );
}

