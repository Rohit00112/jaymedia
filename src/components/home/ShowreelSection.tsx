'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, X } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { useEscapeKey, useBodyLock } from '@/hooks';

export default function ShowreelSection() {
  const [isOpen, setIsOpen] = useState(false);

  useEscapeKey(() => setIsOpen(false), isOpen);
  useBodyLock(isOpen);

  return (
    <section
      id="showreel"
      className="border-b border-line bg-surface py-20 md:py-28 lg:py-32"
    >
      <div className="container-ed">
        <SectionHeading
          eyebrow="05 / The showreel"
          title={
            <>
              A glimpse of{' '}
              <span className="serif text-coral">the energy.</span>
            </>
          }
          description="Direction, choreography, lighting, and broadcast — captured live across our stages."
          link={{ href: '/gallery', label: 'Photo archive' }}
        />

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Play the Jay Media production showreel"
          className="group relative block aspect-[16/9] w-full overflow-hidden bg-surface-alt text-left"
        >
          <Image
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1800&q=85"
            alt="Jay Media live concert and stage production"
            fill
            sizes="100vw"
            className="img-zoom object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-80"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40"
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <span className="eyebrow flex items-center gap-3 text-paper/70">
                <span className="h-2 w-2 bg-coral" aria-hidden="true" />
                Jay Media production reel
              </span>
              <span className="eyebrow hidden shrink-0 whitespace-nowrap text-paper/65 sm:block">
                04:12 / 2025
              </span>
            </div>

            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="display block text-[clamp(2rem,5vw,5rem)] text-paper">
                  Play the reel
                </span>
                <span className="mt-3 block text-[10px] uppercase tracking-[0.2em] text-paper/65">
                  Stage · Broadcast · Backstage
                </span>
              </div>

              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-paper/30 text-paper transition-all duration-500 group-hover:border-coral group-hover:bg-coral group-hover:text-ink md:h-24 md:w-24">
                <Play className="h-5 w-5 fill-current md:h-7 md:w-7" />
              </span>
            </div>
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Jay Media showreel"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8"
        >
          <div className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              autoFocus
              aria-label="Close showreel"
              className="absolute -top-12 right-0 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-paper transition-colors hover:text-coral"
            >
              Close
              <X className="h-5 w-5" />
            </button>

            <div className="aspect-video w-full overflow-hidden border border-line bg-black">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed?listType=search&list=Jay+Media+Management+Biratnagar+Nepal&autoplay=1"
                title="Jay Media Management official productions"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
