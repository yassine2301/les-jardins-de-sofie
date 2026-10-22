import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { navigate } from './runtime';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
};

const Link = forwardRef<HTMLAnchorElement, Props>(function Link(
  { href, prefetch: _prefetch, replace = false, scroll: _scroll, onClick, ...props }, ref
) {
  return <a {...props} ref={ref} href={href} onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey ||
        event.altKey || event.shiftKey || props.target || props.download || href.startsWith('#')) return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin || !['http:', 'https:'].includes(url.protocol)) return;
    event.preventDefault();
    navigate(href, replace);
  }} />;
});

export default Link;
