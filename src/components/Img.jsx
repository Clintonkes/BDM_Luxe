import { useState } from 'react';
import { sized, srcSet } from '@/lib/img';

/**
 * Lazy, responsive photo. If the image ever fails to load it is replaced by a
 * branded mow-stripe gradient, so the layout never shows a broken image.
 */
export default function Img({ src, alt, sizes = '100vw', className = '', priority = false, width = 1600, height = 1067, style }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div role="img" aria-label={alt} style={style} className={`mow-diag bg-gradient-to-br from-loam via-ink-2 to-ink ${className}`} />
    );
  }
  return (
    <img
      src={sized(src, 1200)}
      srcSet={srcSet(src)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchpriority={priority ? 'high' : undefined}
      onError={() => setFailed(true)}
      style={style}
      className={`bg-loam object-cover ${className}`}
    />
  );
}
