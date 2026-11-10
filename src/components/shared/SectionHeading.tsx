import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  link?: { href: string; label: string };
  tone?: 'dark' | 'light';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  tone = 'dark',
  className,
}: SectionHeadingProps) {
  const onDarkSurface = tone === 'light';
  const linkClassName = cn(
    'group inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300',
    onDarkSurface ? 'text-white/75 hover:text-gold' : 'text-ink-soft hover:text-forest'
  );
  const linkInner = link ? (
    <>
      {link.label}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </>
  ) : null;

  return (
    <div className={cn('mb-10 md:mb-12', className)}>
      <div
        className={cn(
          'flex items-center justify-between gap-6 border-b pb-3',
          onDarkSurface ? 'border-white/20' : 'border-line'
        )}
      >
        <span
          className={cn(
            'eyebrow inline-flex items-center gap-2.5',
            onDarkSurface ? 'text-gold' : 'text-forest'
          )}
        >
          <span
            className={cn(
              'h-2.5 w-1',
              onDarkSurface ? 'bg-gold' : 'bg-forest'
            )}
            aria-hidden="true"
          />
          {eyebrow}
        </span>

        {link &&
          (link.href.startsWith('http') ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {linkInner}
            </a>
          ) : (
            <Link href={link.href} className={linkClassName}>
              {linkInner}
            </Link>
          ))}
      </div>

      <div className="mt-6 grid gap-5 md:mt-7 md:grid-cols-12 md:items-end md:gap-10">
        <Reveal className="md:col-span-7">
          <h2
            className={cn(
              'display text-balance text-[clamp(2rem,4vw,3.6rem)] font-bold',
              onDarkSurface ? 'text-white' : 'text-ink'
            )}
          >
            {title}
          </h2>
        </Reveal>

        {description && (
          <Reveal delay={80} className="md:col-span-5">
            <p
              className={cn(
                'max-w-md text-pretty text-sm leading-relaxed md:ml-auto md:text-[0.95rem]',
                onDarkSurface ? 'text-white/75' : 'text-muted'
              )}
            >
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
