import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/masarContent';
import { PRODUCT_DETAILS, VALVE_GROUPS, VALVES } from '@/lib/catalog';
import { categoryHref, quoteHref, SITE_URL } from '@/lib/routes';
import { VALVES_PAGE, productHref, valveHref } from '@/lib/productRoutes';
import { fitTitle, pageMetadata } from '@/lib/seo';
import { DIVISION_THEMES, themeColors, themeVars } from '@/lib/divisionThemes';
import PageHero from '@/components/sections/PageHero';
import DivisionCta from '@/components/division/DivisionCta';
import { MoreProducts, ProductOverview, ProductRange, ProductTopics } from '@/components/product/ProductSections';
import ValvesCatalogue from '@/components/product/ValvesCatalogue';

type Params = { slug: string; product: string };

/** One page per product that has its own page on the client's site, plus the valve catalogue. */
function resolve(slug: string, productSlug: string) {
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return null;
  const isValves = category.id === VALVES_PAGE.category && productSlug === VALVES_PAGE.slug;
  const detail = PRODUCT_DETAILS.find((d) => d.category === category.id && d.slug === productSlug);
  const name = isValves ? VALVES_PAGE.product : detail?.product;
  const product = category.products.find((p) => p.name === name);
  if (!product || (!detail && !isValves)) return null;
  return { category, product, detail, isValves };
}

export function generateStaticParams(): Params[] {
  return CATEGORIES.flatMap((c) =>
    c.products.map((p) => productHref(c, p.name)?.split('/').pop()).filter((s): s is string => Boolean(s)).map((product) => ({ slug: c.slug, product })),
  );
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, product: ps } = await params;
  const r = resolve(slug, ps);
  if (!r) return {};
  const { category, product } = r;
  return pageMetadata({
    title: fitTitle(
      `${product.name} Supplier in Saudi Arabia | ${category.name}`,
      `${product.name} Supplier in Saudi Arabia`,
      `${product.name} in Saudi Arabia`,
      product.name,
    ),
    description: product.description || category.summary,
    path: `${categoryHref(category.slug)}/${ps}`,
    image: { url: product.image ?? category.image, alt: `${product.name} — Masar Arabia` },
  });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug, product: ps } = await params;
  const r = resolve(slug, ps);
  if (!r) notFound();
  const { category, product, detail, isValves } = r;
  const theme = DIVISION_THEMES[category.id];
  const words = product.name.split(' ');
  const last = words.pop();
  const path = `${categoryHref(category.slug)}/${ps}`;

  return (
    <>
      <PageHero
        eyebrow={category.name}
        title={
          <>
            {words.length > 0 && `${words.join(' ')} `}
            <span style={theme ? { color: theme.light } : undefined}>{last}</span>
          </>
        }
        intro={detail?.tagline ?? product.description}
        crumbs={[
          { label: 'Products', href: '/products' },
          { label: category.name, href: categoryHref(category.slug) },
          { label: product.name, href: path },
        ]}
        backgroundImage={category.image}
        theme={theme}
      >
        <Link
          href={quoteHref(product.name)}
          data-magnetic
          style={theme ? { background: theme.accent } : undefined}
          className="group inline-flex items-center gap-2 rounded-full text-white px-6 py-3 text-sm font-bold shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)] hover:brightness-110 transition-[filter]"
        >
          Request a Quote <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
        </Link>
        <Link
          href={categoryHref(category.slug)}
          className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white px-6 py-3 text-sm font-bold hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {category.name}
        </Link>
      </PageHero>

      {/* display: contents keeps each section a direct child of the page (motion + off-screen pausing) while passing the division colours down */}
      <div className="contents" style={themeVars(themeColors(theme))}>
        <ProductOverview
          name={product.name}
          image={product.image}
          intro={detail?.intro.length ? detail.intro : [{ type: 'p', text: product.description }]}
        />

        {detail?.range && <ProductRange name={product.name} range={detail.range} />}

        {isValves && (
          <ValvesCatalogue
            groups={VALVE_GROUPS}
            valves={VALVES.map((v) => ({ slug: v.slug, name: v.name, groups: v.groups, summary: v.summary, image: v.image, href: valveHref(v.slug) }))}
          />
        )}

        {detail?.sections && <ProductTopics name={product.name} sections={detail.sections} />}

        <MoreProducts category={category} current={product.name} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            category: category.name,
            url: `${SITE_URL}${path}`,
            ...(product.image ? { image: `${SITE_URL}${product.image}` } : {}),
            brand: { '@type': 'Brand', name: 'Masar Arabia' },
          }).replace(/</g, '\\u003c'),
        }}
      />

      {theme && <DivisionCta category={category} theme={theme} />}
    </>
  );
}
