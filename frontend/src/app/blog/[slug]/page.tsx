import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronRight, Clock, Mail, PenLine } from 'lucide-react';
import { SITE_URL } from '@/lib/routes';
import { pageMetadata } from '@/lib/seo';
import { formatPostDate, getPost, getPosts } from '@/lib/blog';
import PostCard from '@/components/blog/PostCard';
import CtaBand from '@/components/sections/CtaBand';

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Article not found', robots: { index: false } };
  const meta = pageMetadata({
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || `${post.title} — Masar Arabia blog.`,
    path: `/blog/${post.slug}`,
    image: post.cover ? { url: post.cover, alt: post.cover_alt || post.title } : undefined,
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: post.author ? [post.author] : undefined,
      section: post.category || undefined,
    },
  };
}

const json = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const more = (await getPosts({ pageSize: 4 })).results.filter((p) => p.slug !== post.slug).slice(0, 3);
  const share = [
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}` },
    { label: 'X', href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}` },
  ];

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.seo_description || post.excerpt,
      image: post.cover ? [`${SITE_URL}${post.cover}`] : undefined,
      datePublished: post.published_at,
      dateModified: post.updated_at,
      author: { '@type': post.author && post.author !== 'Masar Arabia' ? 'Person' : 'Organization', name: post.author || 'Masar Arabia' },
      publisher: { '@type': 'Organization', name: 'Masar Arabia', logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo-dark.png` } },
      mainEntityOfPage: url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(ld) }} />

      <article className="bg-white">
        <header className="relative overflow-hidden pt-32 pb-10 sm:pt-36 lg:pt-40">
          <div className="cad-blueprint-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
              <Link href="/" className="hover:text-[#0d7cae]">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/blog" className="hover:text-[#0d7cae]">
                Blog
              </Link>
              {post.category && (
                <>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="hover:text-[#0d7cae]">
                    {post.category}
                  </Link>
                </>
              )}
            </nav>

            <h1 className="mt-6 text-[32px] font-black leading-[1.1] tracking-[-0.025em] text-slate-950 text-balance sm:text-[44px]">{post.title}</h1>
            {post.excerpt && <p className="mt-5 text-lg leading-relaxed text-slate-600 sm:text-xl">{post.excerpt}</p>}

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-slate-200 py-4 text-sm text-slate-600">
              {post.author && (
                <span className="inline-flex items-center gap-2">
                  <PenLine className="h-4 w-4 text-[#0d7cae]" /> {post.author}
                </span>
              )}
              <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#0d7cae]" /> {post.reading_minutes} min read
              </span>
            </div>
          </div>
        </header>

        {post.cover && (
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover} alt={post.cover_alt || ''} className="aspect-[16/9] w-full rounded-3xl object-cover" fetchPriority="high" />
          </div>
        )}

        {/* body HTML is cleaned by the backend (nh3) before it is stored */}
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.body }} />

          <footer className="mt-14 flex flex-col gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#0d7cae]">
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="mr-1 text-slate-500">Share</span>
              {share.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-slate-200 px-3.5 py-1.5 font-semibold text-slate-700 hover:border-[#0d7cae] hover:text-[#0d7cae]"
                >
                  {s.label}
                </a>
              ))}
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}`}
                className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-700 hover:border-[#0d7cae] hover:text-[#0d7cae]"
                aria-label="Share by email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </footer>
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-[#f6f9fc] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-black uppercase tracking-tight text-slate-950 sm:text-3xl">More articles</h2>
              <Link href="/blog" className="text-sm font-semibold text-[#0d7cae] hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {more.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
