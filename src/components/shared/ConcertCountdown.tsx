'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConcertCountdownProps {
  targetDate?: string;
  label?: string;
  compact?: boolean;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const targetMs = new Date(targetIso).getTime();
  const nowMs = Date.now();
  const diff = targetMs - nowMs;

  if (diff <= 0 || Number.isNaN(diff)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isLive: false,
  };
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export default function ConcertCountdown({
  targetDate = '2026-12-19T18:00:00+05:45',
  label = 'Countdown to Concert • Dec 19, 2026 (6:00 PM)',
  compact = false,
  className,
}: ConcertCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => {
      setTimeLeft(calculateTimeLeft(targetDate));
    };

    const initialTimer = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 1000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, [targetDate]);

  const units = [
    {
      key: 'days',
      label: 'Days',
      value: timeLeft ? pad2(timeLeft.days) : '--',
    },
    {
      key: 'hours',
      label: 'Hours',
      value: timeLeft ? pad2(timeLeft.hours) : '--',
    },
    {
      key: 'minutes',
      label: 'Minutes',
      value: timeLeft ? pad2(timeLeft.minutes) : '--',
    },
    {
      key: 'seconds',
      label: 'Seconds',
      value: timeLeft ? pad2(timeLeft.seconds) : '--',
    },
  ];

  return (
    <div
      aria-label={label}
      className={cn(
        'rounded-xl border border-line bg-paper-deep/70 p-3.5 sm:p-4',
        className
      )}
    >
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-forest">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span>{label}</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-forest">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-forest" />
          {timeLeft?.isLive ? 'Gates Open' : 'Live Timer'}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {units.map((unit, idx) => (
          <div
            key={unit.key}
            className={cn(
              'flex flex-col items-center justify-center rounded-lg border border-line bg-white px-2 text-center shadow-2xs transition-colors',
              compact ? 'py-2' : 'py-2.5 sm:py-3',
              idx === 3 && 'border-forest/25 bg-forest-soft/35'
            )}
          >
            <span
              suppressHydrationWarning
              className={cn(
                'mono font-semibold leading-none tracking-tight',
                compact
                  ? 'text-lg sm:text-xl'
                  : 'text-xl sm:text-2xl md:text-[1.65rem]',
                idx === 3 ? 'text-forest' : 'text-ink'
              )}
            >
              {unit.value}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

