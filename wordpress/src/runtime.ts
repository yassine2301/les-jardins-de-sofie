export type JdsConfig = {
  assetsUrl: string;
  shopifyDomain: string;
  storefrontToken: string;
  customerAccountUrl?: string;
  customerStateUrl?: string;
  customerActionUrl?: string;
};

declare global {
  interface Window {
    __JDS_CONFIG__: JdsConfig;
  }
}

export function assetUrl(src: string) {
  if (/^\/(?:images|videos)\//.test(src)) {
    return `${window.__JDS_CONFIG__.assetsUrl.replace(/\/$/, '')}${src}`;
  }
  return src;
}

export function navigate(href: string, replace = false) {
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) {
    window.location.assign(url.href);
    return;
  }
  if (replace) window.history.replaceState(null, '', url.href);
  else window.history.pushState(null, '', url.href);
  window.dispatchEvent(new Event('jds:navigate'));
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
}

export const router = {
  push: (href: string) => navigate(href),
  replace: (href: string) => navigate(href, true),
  back: () => window.history.back(),
  refresh: () => window.location.reload(),
  prefetch: () => undefined,
};

export function routeSnapshot() {
  return window.location.pathname + window.location.search;
}

export function subscribeRoute(callback: () => void) {
  window.addEventListener('popstate', callback);
  window.addEventListener('jds:navigate', callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener('jds:navigate', callback);
  };
}
