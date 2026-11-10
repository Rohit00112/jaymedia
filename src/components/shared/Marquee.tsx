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
                    'display whitespace-nowrap px-3 text-[clamp(1.4rem,2.8vw,2.6rem)]',
                    light ? 'text-cream/85' : 'text-ink',
                    index % 2 === 1 && 'serif italic'
                  )}
                >
                  {item}
                </span>
                <span
                  className={cn(
                    'mx-5 text-[0.55rem] md:mx-8',
                    light ? 'text-gold' : 'text-accent'
                  )}
                >
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
