import { useState, useEffect } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

export function SafeImage({ src, alt, fill, className, priority: _priority, sizes: _sizes, ...props }: SafeImageProps) {
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
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={fill ? `absolute inset-0 h-full w-full ${className ?? ''}` : className}
    />
  );
}
