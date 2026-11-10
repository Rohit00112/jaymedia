import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
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
  className,
}: PageHeroProps) {
  const cleanEyebrow = eyebrow.replace(/^\d+\s*\/\s*/, '');

  return (
    <section
      className={cn(
        'border-b border-line bg-paper-deep/60 py-10 md:py-14',
        className
      )}
    >
      <div className="container-ed">
        {breadcrumb && (
          <Reveal y={10} className="mb-4">
            <Link
              href={breadcrumb.href}
              className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span>{breadcrumb.label}</span>
            </Link>
          </Reveal>
        )}

        <Reveal y={14} className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-forest">
            {cleanEyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-3 text-base leading-relaxed text-muted">
              {description}
            </p>
          )}
        </Reveal>

        {meta && meta.length > 0 && (
          <Reveal
            y={12}
            delay={0.08}
            as="dl"
            className="mt-7 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-4"
          >
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs text-muted">{item.label}</dt>
                <dd className="mt-0.5 text-sm font-medium text-ink">
                  {item.value}
                </dd>
              </div>
            ))}
          </Reveal>
        )}

        {breadcrumb && image && (
          <Reveal
            y={16}
            delay={0.14}
            className="group relative mt-8 aspect-[16/7] w-full overflow-hidden rounded-xl border border-line bg-sand"
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="img-zoom object-cover"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
