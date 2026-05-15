'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

export function SafeImage({ src, alt, ...props }: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setRetryCount(0);
    setIsError(false);
  }, [src]);

  const handleError = () => {
    if (retryCount < 2) {
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        const separator = typeof src === 'string' && src.includes('?') ? '&' : '?';
        setImgSrc(`${src}${separator}retry=${retryCount + 1}`);
      }, 1000);
    } else {
      setIsError(true);
    }
  };

  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-secondary/20 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        N/A
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
