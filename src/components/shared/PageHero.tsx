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
        'relative overflow-hidden border-b border-line bg-paper pt-10 md:pt-14',
        className
      )}
    >
      <div
        className="bloom pointer-events-none absolute -right-32 top-0 h-[30rem] w-[30rem] rounded-full bg-accent-soft/70 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="bloom-slow pointer-events-none absolute -left-32 top-40 h-[24rem] w-[24rem] rounded-full bg-forest-soft/60 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-ed relative">
        <div className="flex items-center justify-between gap-6 border-b border-line pb-4">
          <div className="flex items-center gap-4">
            {breadcrumb ? (
              <Link
                href={breadcrumb.href}
                className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-ink"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-accent transition-transform duration-500 group-hover:-translate-x-1" />
                {breadcrumb.label}
              </Link>
            ) : (
              <span className="eyebrow flex items-center gap-2 text-faint">
                <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                Jay Media / Index
              </span>
            )}
          </div>
          <span className="eyebrow hidden items-center gap-2 text-faint sm:flex">
            <span className="h-1 w-1 rounded-full bg-forest/70" aria-hidden="true" />
            Biratnagar, Nepal
          </span>
        </div>

        <div className="grid gap-8 pb-10 pt-10 lg:grid-cols-12 lg:gap-10 lg:pb-14 lg:pt-14">
          <Reveal as="div" className="lg:col-span-8">
            <span className="eyebrow flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              {eyebrow}
            </span>
            <h1 className="display mt-6 max-w-[17ch] text-balance text-[clamp(2.6rem,6.4vw,6.2rem)] text-ink">
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
                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-5">
                  {meta.map((item) => (
                    <div key={item.label}>
                      <dt className="eyebrow text-[8px] text-faint">
                        {item.label}
                      </dt>
                      <dd className="mt-2 text-sm leading-snug text-ink-soft">
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
            aspect={
              compact
                ? 'aspect-[16/10] md:aspect-[21/9]'
                : 'aspect-[16/11] md:aspect-[16/7]'
            }
            sizes="(max-width: 1408px) 100vw, 1344px"
            priority
            parallax
            className="rounded-[0.5rem]"
          />
        </div>
      )}

      <div
        className={cn(
          'container-ed relative flex items-center justify-between gap-4',
          image ? 'pb-6 pt-4 md:pb-8' : 'pb-12 pt-10 md:pb-16 md:pt-12'
        )}
      >
        <span className="eyebrow text-faint">
          {image ? imageAlt || eyebrow : 'Jay Media Management'}
        </span>
        <span className="eyebrow hidden text-faint md:block">
          Est. Biratnagar
        </span>
      </div>
    </section>
  );
}
