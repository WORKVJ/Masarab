import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import SolutionsExplorer from '@/components/sections/SolutionsExplorer';
import CtaBand from '@/components/sections/CtaBand';

const DESCRIPTION =
  'Cooling solutions, water treatment, chemicals, electrical, instrumentation, mechanical, pipe fittings & alloys and safety equipment — high-quality industrial products from Masar Arabia.';

export const metadata: Metadata = {
  title: 'Products',
  description: DESCRIPTION,
  alternates: { canonical: '/products' },
  openGraph: { url: '/products', title: 'Masar Arabia Products Catalog', description: DESCRIPTION },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products Catalog"
        title={
          <>
            High-Quality Products to <span className="text-[#0d7cae]">Elevate Your Industry</span>
          </>
        }
        intro="Eight product disciplines from renowned manufacturers — explore each range below, or open a category for its full product list."
        crumbs={[{ label: 'Products', href: '/products' }]}
      />
      <SolutionsExplorer />
      <CtaBand />
    </>
  );
}
