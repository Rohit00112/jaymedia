import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import RevealImage from '@/components/motion/RevealImage';
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
        'relative overflow-hidden border-b border-line bg-paper-deep pt-8 md:pt-12',
        className
      )}
    >
      <div className="container-ed relative">
        <div className="flex items-center justify-between gap-6 border-b border-line pb-4">
          <div className="flex items-center gap-4">
            {breadcrumb ? (
              <Link
                href={breadcrumb.href}
                className="group inline-flex items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-forest"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-forest transition-transform duration-300 group-hover:-translate-x-1" />
                {breadcrumb.label}
              </Link>
            ) : (
              <span className="eyebrow text-faint">Jay Media Directory</span>
            )}
          </div>
          <span className="eyebrow hidden text-faint sm:block">
            Biratnagar, Nepal
          </span>
        </div>

        <div className="grid gap-8 pb-10 pt-8 lg:grid-cols-12 lg:gap-10 lg:pb-12 lg:pt-12">
          <Reveal as="div" className="lg:col-span-8">
            <span className="eyebrow inline-flex items-center gap-2.5 text-forest">
              <span className="h-2.5 w-1 bg-forest" aria-hidden="true" />
              {eyebrow}
            </span>
            <h1 className="display mt-5 max-w-[18ch] text-balance text-[clamp(2.4rem,5.4vw,4.8rem)] font-bold text-ink">
              {title}
            </h1>
          </Reveal>

          <div className="self-end lg:col-span-4">
            {description && (
              <Reveal delay={90}>
                <p className="max-w-md text-pretty text-sm leading-relaxed text-muted md:text-[0.95rem]">
                  {description}
                </p>
              </Reveal>
            )}

            {meta && (
              <Reveal delay={150}>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5">
                  {meta.map((item) => (
                    <div key={item.label}>
                      <dt className="eyebrow text-[9px] text-faint">
                        {item.label}
                      </dt>
                      <dd className="mt-1.5 text-sm font-medium leading-snug text-ink">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
          </div>
        </div>
      </div>

      {image && (
        <div className="container-ed">
          <RevealImage
            src={image}
            alt={imageAlt}
            aspect="aspect-[2/1]"
            sizes="(max-width: 1408px) 100vw, 1344px"
            priority
            parallax={false}
            className="rounded-[4px] border border-line bg-[#020816]"
          />
        </div>
      )}

      <div
        className={cn(
          'container-ed relative flex items-center justify-between gap-4',
          image ? 'pb-6 pt-4 md:pb-8' : 'pb-10 pt-4 md:pb-12'
        )}
      >
        <span className="eyebrow text-faint">
          {image ? imageAlt || eyebrow : 'Jay Media Management'}
        </span>
        <span className="eyebrow hidden text-faint md:block">Est. 2013</span>
      </div>
    </section>
  );
}
