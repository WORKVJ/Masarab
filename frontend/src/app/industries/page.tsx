import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import IndustriesSection from '@/components/sections/IndustriesSection';
import WhyMasar from '@/components/sections/WhyMasar';
import CtaBand from '@/components/sections/CtaBand';

const DESCRIPTION =
  'Masar Arabia supplies plants across Industrial, Power, Water & Desalination, Oil & Gas, Cement, Fertilizers, Sugar, Chemicals, Steel Mills, Mining, Pharmaceutical and Food sectors.';

export const metadata: Metadata = {
  title: 'Industries',
  description: DESCRIPTION,
  alternates: { canonical: '/industries' },
  openGraph: { url: '/industries', title: 'Industries We Serve | Masar Arabia', description: DESCRIPTION },
};

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
