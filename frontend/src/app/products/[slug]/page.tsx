import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, LayoutGrid } from 'lucide-react';
import { CATEGORIES } from '@/lib/masarContent';
import { categoryHref, quoteHref, SITE_URL } from '@/lib/routes';
import { CATEGORY_SEO, pageMetadata } from '@/lib/seo';
import { DIVISION_THEMES } from '@/lib/divisionThemes';
import DivisionHighlights from '@/components/sections/DivisionHighlights';
import PageHero from '@/components/sections/PageHero';
import DivisionStatement from '@/components/division/DivisionStatement';
import DivisionShowcase from '@/components/division/DivisionShowcase';
import DivisionCta from '@/components/division/DivisionCta';
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
  const seo = CATEGORY_SEO[c.id] ?? { title: c.name, description: c.summary };
  return pageMetadata({
    title: seo.title,
    description: seo.description,
    path: categoryHref(c.slug),
    image: { url: c.image, alt: `${c.name} — Masar Arabia` },
  });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();
  // each division has its own colour, pattern, icon and highlights
  const theme = DIVISION_THEMES[category.id];
  const words = category.name.split(' ');
  const lastWord = words.pop();

  return (
    <>
      <PageHero
        eyebrow={category.headline}
        title={
          <>
            {words.length > 0 && `${words.join(' ')} `}
            <span style={theme ? { color: theme.light } : undefined}>{lastWord}</span>
          </>
        }
        intro={category.summary}
        crumbs={[
          { label: 'Products', href: '/products' },
          { label: category.name, href: categoryHref(category.slug) },
        ]}
        backgroundImage={category.image}
        theme={theme}
      >
        <Link
          href={quoteHref(category.name)}
          data-magnetic
          style={theme ? { background: theme.accent } : undefined}
          className={`group inline-flex items-center gap-2 rounded-full ${theme ? 'text-white' : 'bg-white text-slate-950'} px-6 py-3 text-sm font-bold shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)] hover:brightness-110 transition-[filter]`}
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

      {theme && <DivisionHighlights theme={theme} name={category.name} />}

      {theme && <DivisionStatement category={category} theme={theme} />}

      {/* every division shows its products in its own layout (gallery, flow, periodic table, panel …) */}
      <DivisionShowcase category={category} />

      {/* Structured data: the category's product list, so search engines understand the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `${category.name} — Masar Arabia`,
            description: category.summary,
            url: `${SITE_URL}${categoryHref(category.slug)}`,
            numberOfItems: category.products.length,
            itemListElement: category.products.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: p.name,
              ...(p.description ? { description: p.description } : {}),
              ...(p.image ? { image: `${SITE_URL}${p.image}` } : {}),
            })),
          }).replace(/</g, '\\u003c'),
        }}
      />

      <CategoryCards
        id="other-categories"
        excludeId={category.id}
        eyebrow="Explore More"
        title={
          <>
            Other <span className="text-[#0d7cae]">Divisions</span>
          </>
        }
        intro="One trusted supplier for every part of your plant."
      />

      {theme ? <DivisionCta category={category} theme={theme} /> : <CtaBand />}
    </>
  );
}
