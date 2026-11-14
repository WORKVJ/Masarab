import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/sections/PageHero';
import SolutionsExplorer from '@/components/sections/SolutionsExplorer';
import CtaBand from '@/components/sections/CtaBand';

const DESCRIPTION =
  "Explore Masar Arabia's industrial products: cooling solutions, water treatment, chemicals, electrical, instrumentation, mechanical, pipe fittings & safety.";

export const metadata: Metadata = pageMetadata({ title: 'Industrial Products Catalog – 8 Disciplines', description: DESCRIPTION, path: '/products' });

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
        intro="Empowering Industries with Durable and Reliable Solutions. Premium Safety Equipment for Your Needs. Innovative Industrial Products to Enhance Safety and Efficiency."
        crumbs={[{ label: 'Products', href: '/products' }]}
      />
      <SolutionsExplorer />
      <CtaBand />
    </>
  );
}
