import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/routes';
import { ALL_ROUTES } from '@/lib/productRoutes';
import { getPosts } from '@/lib/blog';

/** /sitemap.xml — every page plus every published blog post, so search engines discover them all. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [...ALL_ROUTES, '/blog'].map((path) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: path === '/' || path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/products') || path === '/contact' ? 0.8 : 0.6,
  }));
  const posts = (await getPosts({ pageSize: 500 })).results.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
