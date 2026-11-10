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
  duration = 48,
}: MarqueeProps) {
  const onPorcelain = tone === 'light';

  return (
    <div
      className={cn(
        'marquee select-none border-y py-3.5 md:py-4',
        onPorcelain
          ? 'border-line bg-paper-deep text-ink'
          : 'border-forest bg-forest text-white',
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
                    'display whitespace-nowrap px-4 text-sm font-bold uppercase tracking-[0.14em] md:px-5 md:text-base',
                    onPorcelain
                      ? index % 2 === 1
                        ? 'text-forest'
                        : 'text-ink'
                      : index % 2 === 1
                        ? 'text-gold'
                        : 'text-white'
                  )}
                >
                  {item}
                </span>
                <span
                  className={cn(
                    'font-mono text-xs font-semibold',
                    onPorcelain ? 'text-line-strong' : 'text-white/35'
                  )}
                >
                  /
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
