import { SERVER_API } from './siteSettings';

/** Cache tag the backend refreshes (POST /revalidate-cache) whenever a post is saved or deleted in the panel. */
export const BLOG_TAG = 'blog';

export interface BlogSummary {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  cover_alt: string;
  category: string;
  author: string;
  published_at: string;
  updated_at: string;
  reading_minutes: number;
}

export interface BlogPost extends BlogSummary {
  body: string;
  seo_title: string;
  seo_description: string;
}

export interface BlogPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: BlogSummary[];
}

export const BLOG_PAGE_SIZE = 9;
const EMPTY: BlogPage = { count: 0, next: null, previous: null, results: [] };

async function get<T>(path: string): Promise<T | null> {
  if (!SERVER_API) return null;
  try {
    const res = await fetch(`${SERVER_API}/blog/${path}`, { next: { tags: [BLOG_TAG], revalidate: 3600 } });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null; // backend down: the blog shows its empty state instead of an error page
  }
}

/** Server components only. */
export async function getPosts({ page = 1, category = '', pageSize = BLOG_PAGE_SIZE } = {}): Promise<BlogPage> {
  const qs = new URLSearchParams({ page: String(page), page_size: String(pageSize) });
  if (category) qs.set('category', category);
  return (await get<BlogPage>(`?${qs}`)) ?? EMPTY;
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (!/^[a-z0-9-]{1,220}$/.test(slug)) return null;
  return get<BlogPost>(`${slug}/`);
}

export async function getCategories(): Promise<string[]> {
  return (await get<string[]>('categories/')) ?? [];
}

const DATE = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Riyadh' });
export const formatPostDate = (iso: string) => DATE.format(new Date(iso));
