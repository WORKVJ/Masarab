import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/sections/PageHero';
import IndustriesSection from '@/components/sections/IndustriesSection';
import WhyMasar from '@/components/sections/WhyMasar';
import CtaBand from '@/components/sections/CtaBand';

const DESCRIPTION =
  'Industrial supply for Power, Water & Desalination, Oil & Gas, Cement, Fertilizers, Sugar, Chemicals, Steel, Mining, Pharmaceutical and Food plants in KSA.';

export const metadata: Metadata = pageMetadata({ title: 'Industries We Serve – Power, Oil & Gas, Water', description: DESCRIPTION, path: '/industries' });

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Industries <span className="text-[#0d7cae]">We Serve</span>
          </>
        }
        intro={DESCRIPTION}
        crumbs={[{ label: 'Industries', href: '/industries' }]}
        image={{ src: '/images/cooling-tower.jpg', alt: 'Industrial plant with cooling towers' }}
      />
      <IndustriesSection />
      <WhyMasar />
      <CtaBand />
    </>
  );
}
