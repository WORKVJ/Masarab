import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { type BlogSummary, formatPostDate } from '@/lib/blog';

/** Cover image, or a branded placeholder when a post has none. Images are already resized WebP from the backend. */
export function Cover({ post, className = '', eager = false }: { post: BlogSummary; className?: string; eager?: boolean }) {
  if (post.cover) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={post.cover}
        alt={post.cover_alt || ''}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${className}`}
      />
    );
  }
  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br from-[#04121f] via-[#0a3a5c] to-[#0d7cae] ${className}`}>
      <div className="cad-blueprint-grid absolute inset-0 opacity-30" />
      <span className="absolute bottom-4 left-5 font-black uppercase tracking-tight text-white/90">Masar Arabia</span>
    </div>
  );
}

function Meta({ post }: { post: BlogSummary }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
      {post.category && <span className="rounded-full bg-sky-50 px-2.5 py-1 font-semibold text-[#0d7cae]">{post.category}</span>}
      <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" /> {post.reading_minutes} min read
      </span>
    </p>
  );
}

export default function PostCard({ post }: { post: BlogSummary }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgba(4,18,31,0.45)]">
      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
        <Cover post={post} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Meta post={post} />
        <h3 className="mt-3 text-lg font-bold leading-snug text-slate-950 group-hover:text-[#0d7cae]">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[#0d7cae]">
          Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

/** The newest post, shown large at the top of the first blog page. */
export function FeaturedPost({ post }: { post: BlogSummary }) {
  return (
    <article className="group relative grid overflow-hidden rounded-3xl border border-slate-200 bg-white lg:grid-cols-2">
      <div className="aspect-[16/10] overflow-hidden bg-slate-100 lg:aspect-auto lg:min-h-[380px]">
        <Cover post={post} eager />
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-10">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0d7cae]">Latest article</span>
        <div className="mt-4">
          <Meta post={post} />
        </div>
        <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl group-hover:text-[#0d7cae]">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && <p className="mt-4 line-clamp-4 leading-relaxed text-slate-600">{post.excerpt}</p>}
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d7cae]">
          Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
