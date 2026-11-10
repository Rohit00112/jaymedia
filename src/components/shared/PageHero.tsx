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
          <div className="mb-4">
            <Link
              href={breadcrumb.href}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{breadcrumb.label}</span>
            </Link>
          </div>
        )}

        <div className="max-w-3xl">
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
        </div>

        {meta && meta.length > 0 && (
          <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs text-muted">{item.label}</dt>
                <dd className="mt-0.5 text-sm font-medium text-ink">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {breadcrumb && image && (
          <div className="relative mt-8 aspect-[16/7] w-full overflow-hidden rounded-xl border border-line bg-sand">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
