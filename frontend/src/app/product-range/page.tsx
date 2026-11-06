import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/sections/PageHero';
import ProductRangeSection from '@/components/sections/ProductRangeSection';
import CtaBand from '@/components/sections/CtaBand';

const DESCRIPTION =
  'PVC, CPVC, PPR, PVDF, ABS, copper and cast iron pipes & fittings, drainage, manhole covers, test plugs, couplings and valves — supplied across Saudi Arabia.';

export const metadata: Metadata = pageMetadata({ title: 'Pipes, Fittings, Valves & Civil Products', description: DESCRIPTION, path: '/product-range' });

export default function ProductRangePage() {
  return (
    <>
      <PageHero
        eyebrow="Product Range"
        title={
          <>
            Pipes, Fittings, Valves &amp; <span className="text-[#0d7cae]">Civil Products</span>
          </>
        }
        intro="Sixteen product lines covering thermoplastic and metal piping, drainage, valves, couplings, adhesives, access covers and test plugs."
        crumbs={[{ label: 'Product Range', href: '/product-range' }]}
        image={{ src: '/images/valves-industrial.jpg', alt: 'Industrial valves and piping' }}
      />
      <ProductRangeSection />
      <CtaBand />
    </>
  );
}
