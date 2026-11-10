import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  threshold?: number;
  style?: CSSProperties;
}

export default function Reveal({
  as: Tag = 'div',
  children,
  className,
  style,
}: RevealProps) {
  return (
    <Tag className={cn(className)} style={style}>
      {children}
    </Tag>
  );
}
