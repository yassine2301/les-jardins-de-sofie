import { type ImgHTMLAttributes } from 'react';
import { assetUrl } from './runtime';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string | { src: string };
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
};

export default function Image({ src, fill, priority, quality: _quality,
  unoptimized: _unoptimized, style, loading, ...props }: Props) {
  return <img {...props} src={assetUrl(typeof src === 'string' ? src : src.src)}
    loading={priority ? 'eager' : loading ?? 'lazy'} decoding="async"
    style={fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%', ...style } : style} />;
}
