import type { MetadataRoute } from 'next';
import { ALL_ROUTES, SITE_URL } from '@/lib/routes';

/** /sitemap.xml — every page, so search engines discover them all. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ALL_ROUTES.map((path) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/products') || path === '/contact' ? 0.8 : 0.6,
  }));
}
