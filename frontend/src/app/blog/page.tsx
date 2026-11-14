import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Newspaper } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { BLOG_PAGE_SIZE, getCategories, getPosts } from '@/lib/blog';
import PageHero from '@/components/sections/PageHero';
import PostCard, { FeaturedPost } from '@/components/blog/PostCard';
import CtaBand from '@/components/sections/CtaBand';

const DESCRIPTION =
  'News, technical guides and procurement insights from Masar Arabia for industrial plants across Saudi Arabia: cooling, water treatment, electrical, instrumentation and more.';

type Search = { page?: string; category?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<Search> }): Promise<Metadata> {
  const { page, category } = await searchParams;
  const meta = pageMetadata({ title: 'Blog – Industrial Insights & Technical Guides', description: DESCRIPTION, path: '/blog' });
  // filtered and later pages point search engines at the main blog page
  return page || category ? { ...meta, robots: { index: false, follow: true } } : meta;
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const category = (sp.category ?? '').slice(0, 80);
  const [data, categories] = await Promise.all([getPosts({ page, category }), getCategories()]);
  const pages = Math.max(1, Math.ceil(data.count / BLOG_PAGE_SIZE));
  const showFeatured = page === 1 && !category && data.results.length > 0;
  const [featured, ...rest] = data.results;
  const grid = showFeatured ? rest : data.results;

  const href = (p: number, c = category) => {
    const qs = new URLSearchParams();
    if (c) qs.set('category', c);
    if (p > 1) qs.set('page', String(p));
    return `/blog${qs.size ? `?${qs}` : ''}`;
  };

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Masar Arabia <span className="text-[#0d7cae]">Blog</span>
          </>
        }
        intro="News, technical guides and procurement insights for the plants that power the Kingdom."
        crumbs={[{ label: 'Blog', href: '/blog' }]}
      />

      <section id="articles" className="relative bg-[#f6f9fc] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {categories.length > 0 && (
            <nav aria-label="Blog categories" className="mb-10 flex flex-wrap gap-2">
              <Chip href={href(1, '')} on={!category}>
                All articles
              </Chip>
              {categories.map((c) => (
                <Chip key={c} href={href(1, c)} on={category.toLowerCase() === c.toLowerCase()}>
                  {c}
                </Chip>
              ))}
            </nav>
          )}

          {data.count === 0 ? (
            <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-sky-50 text-[#0d7cae]">
                <Newspaper className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-xl font-bold text-slate-950">{category ? 'No articles in this category yet' : 'Articles are on the way'}</h2>
              <p className="mt-2 text-slate-600">
                {category ? 'Try another category, or see every article.' : 'Our team is preparing technical guides and industry news. In the meantime, we are happy to answer your questions directly.'}
              </p>
              <Link
                href={category ? '/blog' : '/contact'}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0d7cae] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0369a1]"
              >
                {category ? 'All articles' : 'Contact our team'} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <>
              {showFeatured && <FeaturedPost post={featured} />}
              {grid.length > 0 && (
                <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 ${showFeatured ? 'mt-8 lg:mt-10' : ''}`}>
                  {grid.map((p) => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </div>
              )}

              {pages > 1 && (
                <nav aria-label="Pages" className="mt-12 flex items-center justify-between gap-4 text-sm">
                  {page > 1 ? (
                    <Link href={href(page - 1)} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 hover:border-[#0d7cae] hover:text-[#0d7cae]">
                      <ChevronLeft className="h-4 w-4" /> Newer
                    </Link>
                  ) : (
                    <span />
                  )}
                  <span className="text-slate-500">
                    Page {page} of {pages}
                  </span>
                  {page < pages ? (
                    <Link href={href(page + 1)} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 hover:border-[#0d7cae] hover:text-[#0d7cae]">
                      Older <ChevronRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span />
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function Chip({ href, on, children }: { href: string; on: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={on ? 'page' : undefined}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        on ? 'bg-[#0d7cae] text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-[#0d7cae] hover:ring-[#0d7cae]'
      }`}
    >
      {children}
    </Link>
  );
}
