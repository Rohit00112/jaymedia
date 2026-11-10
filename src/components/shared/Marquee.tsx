import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  tone?: 'dark' | 'light';
  className?: string;
  duration?: number;
}

export default function Marquee({
  items,
  tone = 'dark',
  className,
  duration = 52,
}: MarqueeProps) {
  const light = tone === 'light';

  return (
    <div
      className={cn(
        'marquee select-none border-y py-4 md:py-5',
        light ? 'border-cream/15 bg-transparent' : 'border-line bg-paper-deep',
        className
      )}
      aria-hidden="true"
    >
      <div
        className="marquee-track"
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item, index) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span
                  className={cn(
                    'display whitespace-nowrap px-4 text-[clamp(1.35rem,2.6vw,2.4rem)]',
                    light ? 'text-cream/85' : 'text-ink',
                    index % 2 === 1 && 'serif italic'
                  )}
                >
                  {item}
                </span>
                <span
                  className={cn(
                    'mx-4 inline-block h-px w-8 md:mx-7 md:w-12',
                    light ? 'bg-gold/60' : 'bg-line-strong'
                  )}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
