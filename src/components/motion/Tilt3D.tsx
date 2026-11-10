import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

export default function Tilt3D({ children, className }: Tilt3DProps) {
  return <div className={cn(className)}>{children}</div>;
}
