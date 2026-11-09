import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  image?: string;
  imageAlt?: string;
  breadcrumb?: { label: string; href: string };
  meta?: { label: string; value: string }[];
  compact?: boolean;
  className?: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  breadcrumb,
  meta,
  compact = false,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-line bg-surface',
        className
      )}
    >
      {image && (
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
      )}

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-surface"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"
        aria-hidden="true"
      />

      <div
        className={cn(
          'container-ed relative z-10 flex flex-col justify-end',
          compact
            ? 'min-h-[52vh] pt-32 pb-12 md:min-h-[58vh] md:pt-40 md:pb-16'
            : 'min-h-[68vh] pt-36 pb-12 md:min-h-[76vh] md:pt-44 md:pb-16'
        )}
      >
        {breadcrumb && (
          <Link
            href={breadcrumb.href}
            className="eyebrow mb-10 inline-flex items-center gap-2 text-paper/70 transition-colors hover:text-paper"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-coral" />
            {breadcrumb.label}
          </Link>
        )}

        <div className={cn(!breadcrumb && 'mt-auto')}>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-coral" aria-hidden="true" />
            <span className="eyebrow text-paper/70">{eyebrow}</span>
          </div>

          <h1 className="display mt-6 max-w-[17ch] text-[clamp(2.9rem,8.6vw,8.8rem)] text-paper">
            {title}
          </h1>

          {(description || meta) && (
            <div className="mt-10 grid gap-8 border-t border-line pt-7 md:grid-cols-12">
              {description && (
                <p className="max-w-xl text-base leading-relaxed text-muted md:col-span-6 md:text-lg">
                  {description}
                </p>
              )}

              {meta && (
                <dl className="grid grid-cols-2 gap-x-8 gap-y-6 md:col-span-5 md:col-start-8">
                  {meta.map((item) => (
                    <div key={item.label} className="border-t border-line pt-3">
                      <dt className="eyebrow text-faint">{item.label}</dt>
                      <dd className="mt-2 text-sm text-paper">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
