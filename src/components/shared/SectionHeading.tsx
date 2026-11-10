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
  const light = tone === 'light';

  return (
    <div className={cn('mb-10 md:mb-14', className)}>
      <div
        className={cn(
          'flex items-center justify-between gap-6 border-b pb-3',
          light ? 'border-cream/20' : 'border-line'
        )}
      >
        <span
          className={cn(
            'eyebrow flex items-center gap-2.5',
            light ? 'text-gold' : 'text-accent'
          )}
        >
          <span
            className={cn('h-px w-6', light ? 'bg-gold' : 'bg-accent')}
            aria-hidden="true"
          />
          {eyebrow}
        </span>

        {link && (
          <Link
            href={link.href}
            className={cn(
              'group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300',
              light
                ? 'text-cream/60 hover:text-cream'
                : 'text-muted hover:text-ink'
            )}
          >
            {link.label}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      <div className="mt-6 grid gap-5 md:mt-8 md:grid-cols-12 md:items-end md:gap-10">
        <Reveal className="md:col-span-7">
          <h2
            className={cn(
              'display text-balance text-[clamp(2.1rem,4.4vw,4.4rem)]',
              light ? 'text-cream' : 'text-ink'
            )}
          >
            {title}
          </h2>
        </Reveal>

        {description && (
          <Reveal delay={80} className="md:col-span-4 md:col-start-9">
            <p
              className={cn(
                'max-w-md text-pretty text-sm leading-relaxed md:text-[0.95rem]',
                light ? 'text-cream/65' : 'text-muted'
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
