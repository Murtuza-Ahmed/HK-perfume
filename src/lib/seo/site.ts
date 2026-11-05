// Canonical site URL used for absolute SEO URLs (og:url, og:image, canonical,
// sitemap, JSON-LD). Google and social crawlers require absolute URLs.
export const SITE_URL = "https://hk-perfume.vercel.app";

/** Prefix a root-relative path with the site URL. Absolute URLs pass through. */
export function abs(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
