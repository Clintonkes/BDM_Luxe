import { site } from '@/config/site';

/**
 * The same build is served from https://<user>.github.io/BDM_Luxe/ and from a
 * custom domain root, so the router basename is worked out at runtime from the
 * first path segment rather than baked in at build time.
 */
function detectBasename() {
  if (typeof window === 'undefined') return '/';
  const first = window.location.pathname.split('/')[1] || '';
  return first.toLowerCase() === site.deploy.repoBase.toLowerCase() ? `/${first}` : '/';
}

export const routerBasename = detectBasename();

/** Absolute canonical origin (custom domain or github.io), set at build time. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || site.deploy.domain || site.deploy.githubUrl).replace(/\/+$/, '');

export const absoluteUrl = (path = '/') => `${SITE_URL}${path === '/' ? '/' : path}`;
