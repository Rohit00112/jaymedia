'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top of page"
      className="fixed bottom-32 right-4.5 sm:bottom-20 sm:right-7 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/95 text-ink shadow-md backdrop-blur-md transition-all duration-200 hover:border-forest hover:bg-forest hover:text-white focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

