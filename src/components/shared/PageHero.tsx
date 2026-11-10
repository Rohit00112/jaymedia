import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import RevealImage from '@/components/motion/RevealImage';
import { Tilt3D } from '@/components/motion';
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
        'relative overflow-hidden border-b border-line bg-paper-deep py-12 md:py-16',
        className
      )}
    >
      <div className="container-ed">
        {breadcrumb && (
          <div className="mb-6">
            <Link
              href={breadcrumb.href}
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-forest"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-forest transition-transform duration-200 group-hover:-translate-x-1" />
              {breadcrumb.label}
            </Link>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Reveal as="div" className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">
              {cleanEyebrow}
            </p>
            <h1 className="display mt-3 max-w-[18ch] text-balance text-[clamp(2.4rem,4.8vw,4.2rem)] font-bold tracking-tight text-ink">
              {title}
            </h1>
          </Reveal>

          <div className="lg:col-span-5">
            {description && (
              <Reveal delay={60}>
                <p className="text-base leading-relaxed text-muted">
                  {description}
                </p>
              </Reveal>
            )}

            {meta && (
              <Reveal delay={110}>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5">
                  {meta.map((item) => (
                    <div key={item.label}>
                      <dt className="text-xs text-muted">{item.label}</dt>
                      <dd className="mt-1 text-sm font-semibold text-ink">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
          </div>
        </div>

        {image && (
          <div className="mt-10">
            <Tilt3D maxTilt={3} scale={1.005}>
              <RevealImage
                src={image}
                alt={imageAlt}
                aspect="aspect-[2/1]"
                sizes="(max-width: 1408px) 100vw, 1344px"
                priority
                parallax={false}
                className="rounded-lg border border-line bg-[#020816]"
              />
            </Tilt3D>
          </div>
        )}
      </div>
    </section>
  );
}
