import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, LayoutGrid } from 'lucide-react';
import { CATEGORIES } from '@/lib/masarContent';
import { categoryHref, quoteHref } from '@/lib/routes';
import PageHero from '@/components/sections/PageHero';
import CategoryProducts from '@/components/sections/CategoryProducts';
import CategoryCards from '@/components/sections/CategoryCards';
import CtaBand from '@/components/sections/CtaBand';

type Params = { slug: string };

/** Pre-render all 8 category pages at build time. */
export function generateStaticParams(): Params[] {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CATEGORIES.find((x) => x.slug === slug);
  if (!c) return {};
  const href = categoryHref(c.slug);
  return {
    title: c.name,
    description: c.intro,
    alternates: { canonical: href },
    openGraph: { url: href, title: `${c.name} | Masar Arabia`, description: c.intro, images: [{ url: c.image }] },
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <>
      <PageHero
        eyebrow={category.headline}
        title={category.name}
        intro={category.intro}
        crumbs={[
          { label: 'Products', href: '/products' },
          { label: category.name, href: categoryHref(category.slug) },
        ]}
        backgroundImage={category.image}
      >
        <Link
          href={quoteHref(category.name)}
          data-magnetic
          className="group inline-flex items-center gap-2 rounded-full bg-white text-slate-950 px-6 py-3 text-sm font-bold hover:bg-sky-50 transition-colors"
        >
          Request a Quote <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white px-6 py-3 text-sm font-bold hover:bg-white/10 transition-colors"
        >
          <LayoutGrid className="w-4 h-4" /> All products
        </Link>
      </PageHero>

      <CategoryProducts category={category} />

      <CategoryCards
        id="other-categories"
        excludeId={category.id}
        eyebrow="Explore More"
        title={
          <>
            Other <span className="text-[#0d7cae]">Disciplines</span>
          </>
        }
        intro="One trusted supplier for every part of your plant."
      />

      <CtaBand />
    </>
  );
}
