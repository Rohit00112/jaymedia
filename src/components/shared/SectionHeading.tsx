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
  className,
}: SectionHeadingProps) {
  const cleanEyebrow = eyebrow.replace(/^\d+\s*\/\s*/, '');

  const linkInner = link ? (
    <>
      <span>{link.label}</span>
      <ArrowUpRight className="h-4 w-4" />
    </>
  ) : null;

  return (
    <Reveal
      className={cn(
        'mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end',
        className
      )}
    >
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-forest">
          {cleanEyebrow}
        </p>
        <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        )}
      </div>

      {link &&
        (link.href.startsWith('http') ? (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link shrink-0"
          >
            {linkInner}
          </a>
        ) : (
          <Link href={link.href} className="text-link shrink-0">
            {linkInner}
          </Link>
        ))}
    </Reveal>
  );
}
