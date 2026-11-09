import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  tone?: 'dark' | 'light';
  className?: string;
}

export default function Marquee({
  items,
  tone = 'dark',
  className,
}: MarqueeProps) {
  const light = tone === 'light';

  return (
    <div
      className={cn(
        'select-none overflow-hidden border-y py-4 md:py-5',
        light ? 'border-line-dark bg-bone' : 'border-line bg-surface',
        className
      )}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span
                  className={cn(
                    'display whitespace-nowrap px-1 text-[clamp(1.7rem,3.4vw,3.4rem)]',
                    light ? 'text-ink' : 'text-paper/85'
                  )}
                >
                  {item}
                </span>
                <span className="mx-5 text-sm text-coral md:mx-8" aria-hidden="true">
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
