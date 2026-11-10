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
  const cleanEyebrow = eyebrow.replace(/^\d+\s*\/\s*/, '');

  const linkClassName = cn(
    'group inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200',
    onDarkSurface
      ? 'text-white/80 hover:text-gold'
      : 'text-forest hover:text-ink'
  );

  const linkInner = link ? (
    <>
      <span>{link.label}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </>
  ) : null;

  return (
    <div className={cn('mb-12 md:mb-14', className)}>
      <Reveal>
        <p
          className={cn(
            'text-xs font-semibold uppercase tracking-[0.14em]',
            onDarkSurface ? 'text-gold' : 'text-forest'
          )}
        >
          {cleanEyebrow}
        </p>

        <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2
            className={cn(
              'display max-w-2xl text-balance text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-tight',
              onDarkSurface ? 'text-white' : 'text-ink'
            )}
          >
            {title}
          </h2>

          <div className="flex flex-col items-start gap-3 md:items-end">
            {description && (
              <p
                className={cn(
                  'max-w-md text-sm leading-relaxed md:text-right md:text-base',
                  onDarkSurface ? 'text-white/75' : 'text-muted'
                )}
              >
                {description}
              </p>
            )}

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
        </div>
      </Reveal>
    </div>
  );
}
