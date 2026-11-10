import Image from 'next/image';
import { cn } from '@/lib/utils';

interface RevealImageProps {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: boolean;
  delay?: number;
}

export default function RevealImage({
  src,
  alt,
  aspect = 'aspect-[4/3]',
  className,
  imageClassName,
  sizes = '100vw',
  priority = false,
}: RevealImageProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-paper-deep',
        aspect,
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn('object-cover', imageClassName)}
      />
    </div>
  );
}
