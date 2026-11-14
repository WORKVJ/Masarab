import { revalidateTag } from 'next/cache';
import { SITE_SETTINGS_TAG } from '@/lib/siteSettings';
import { BLOG_TAG } from '@/lib/blog';

const KNOWN_TAGS = new Set([SITE_SETTINGS_TAG, BLOG_TAG]);

/**
 * Called by the Django backend (directly on 127.0.0.1, never through Nginx) after Contact Details or a
 * blog post are saved in the admin panel, so the website shows the change on its next visit.
 * Body: { "tags": ["site-settings" | "blog", ...] } — no body means the contact details.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get('x-revalidate-secret') !== secret) {
    return Response.json({ ok: false }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as { tags?: unknown } | null;
  const asked = Array.isArray(body?.tags) ? body.tags : [SITE_SETTINGS_TAG];
  const tags = asked.filter((t): t is string => typeof t === 'string' && KNOWN_TAGS.has(t));
  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  return Response.json({ ok: true, tags });
}
