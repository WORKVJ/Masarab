import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, PhoneCall } from 'lucide-react';
import { PRODUCT_RANGE, type RangeGroup } from '@/lib/masarContent';
import { quoteHref, rangeHref, SITE_URL } from '@/lib/routes';
import { fitTitle, pageMetadata } from '@/lib/seo';
import { getSiteContact } from '@/lib/siteSettings';
import PageHero from '@/components/sections/PageHero';
import ProductRangeSection from '@/components/sections/ProductRangeSection';
import CtaBand from '@/components/sections/CtaBand';

type Params = { id: string };

const GROUP_LABEL: Record<RangeGroup, string> = {
  piping: 'Pipes & Fittings',
  drainage: 'Drainage',
  valves: 'Valves',
  civil: 'Civil Products',
  accessories: 'Accessories',
};

/** One page per Product Range line (all 16 pre-rendered). */
export function generateStaticParams(): Params[] {
  return PRODUCT_RANGE.map((p) => ({ id: p.id }));
}
export const dynamicParams = false;

const find = (id: string) => PRODUCT_RANGE.find((p) => p.id === id);

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = find((await params).id);
  if (!p) return {};
  return pageMetadata({
    title: fitTitle(`${p.name} Supplier in Saudi Arabia`, `${p.name} in Saudi Arabia`, p.name),
    description: `${p.name} from the Masar Arabia product range — pipes, fittings, valves and civil products supplied across Saudi Arabia. Request a quote.`,
    path: rangeHref(p.id),
    image: p.image ? { url: p.image, alt: `${p.name} — Masar Arabia` } : undefined,
  });
}

export default async function RangeProductPage({ params }: { params: Promise<Params> }) {
  const p = find((await params).id);
  if (!p) notFound();
  const CONTACT = await getSiteContact();
  const words = p.name.split(' ');
  const last = words.pop();

  return (
    <>
      <PageHero
        eyebrow={`Product Range · ${GROUP_LABEL[p.group]}`}
        title={
          <>
            {words.length > 0 && `${words.join(' ')} `}
            <span className="text-[#0d7cae]">{last}</span>
          </>
        }
        intro={`${p.name} — part of the Masar Arabia product range of pipes, fittings, valves and civil products. Contact us for sizes, specifications and pricing.`}
        crumbs={[
          { label: 'Product Range', href: '/product-range' },
          { label: p.name, href: rangeHref(p.id) },
        ]}
        image={p.image ? { src: p.image, alt: p.name } : undefined}
      >
        <Link
          href={quoteHref(p.name)}
          data-magnetic
          className="group inline-flex items-center gap-2 rounded-full bg-[#0d7cae] hover:bg-[#0b6a95] text-white px-6 py-3 text-sm font-bold shadow-[0_12px_30px_-12px_rgba(13,124,174,0.8)] transition-colors"
        >
          Request a Quote <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
        </Link>
        <a
          href={CONTACT.phoneHref}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 hover:border-sky-300 transition-colors"
        >
          <PhoneCall className="w-4 h-4 text-[#0d7cae]" /> {CONTACT.phoneDisplay}
        </a>
        <Link href="/product-range" className="inline-flex items-center gap-2 px-2 py-3 text-sm font-bold text-[#0d7cae]">
          <ArrowLeft className="w-4 h-4" /> All products
        </Link>
      </PageHero>

      {/* the rest of the range, same board as on the home page */}
      <ProductRangeSection excludeId={p.id} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: p.name,
            category: GROUP_LABEL[p.group],
            url: `${SITE_URL}${rangeHref(p.id)}`,
            ...(p.image ? { image: `${SITE_URL}${p.image}` } : {}),
            brand: { '@type': 'Brand', name: 'Masar Arabia' },
          }).replace(/</g, '\\u003c'),
        }}
      />

      <CtaBand />
    </>
  );
}
