import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
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
    <div
      className={cn(
        'mb-14 flex flex-col gap-8 border-b pb-8 md:mb-20 md:flex-row md:items-end md:justify-between',
        light ? 'border-line-dark' : 'border-line',
        className
      )}
    >
      <div className="max-w-4xl">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-coral" aria-hidden="true" />
          <span
            className={cn('eyebrow', light ? 'text-coral-deep' : 'text-coral')}
          >
            {eyebrow}
          </span>
        </div>
        <h2
          className={cn(
            'display mt-5 text-[clamp(2.4rem,5.6vw,5.6rem)]',
            light ? 'text-ink' : 'text-paper'
          )}
        >
          {title}
        </h2>
      </div>

      {(description || link) && (
        <div className="flex max-w-sm flex-col items-start gap-6 md:items-end md:text-right">
          {description && (
            <p
              className={cn(
                'text-sm leading-relaxed md:text-base',
                light ? 'text-ink/65' : 'text-muted'
              )}
            >
              {description}
            </p>
          )}
          {link && (
            <Link
              href={link.href}
              className={cn(
                'text-link',
                light ? 'text-ink hover:text-ink/70' : 'text-paper hover:text-coral'
              )}
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
