import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimeStaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  distance?: number;
  duration?: number;
  direction?: 'up' | 'left';
}

export default function AnimeStaggerContainer({
  children,
  className,
}: AnimeStaggerContainerProps) {
  return <div className={cn(className)}>{children}</div>;
}
