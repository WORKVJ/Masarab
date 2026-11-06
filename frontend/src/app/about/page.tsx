import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import AboutSection from '@/components/sections/AboutSection';
import WhyMasar from '@/components/sections/WhyMasar';
import ClientsSection from '@/components/sections/ClientsSection';
import CtaBand from '@/components/sections/CtaBand';

const DESCRIPTION =
  'Masar Arabia First Trading Company specializes in the procurement and supply of Mechanical, Electrical, and Instrumentation materials and equipment for plants across Saudi Arabia.';

export const metadata: Metadata = {
  title: 'About Us',
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: { url: '/about', title: 'About Masar Arabia', description: DESCRIPTION },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Masar Arabia"
        title={
          <>
            Empowering Industries with <span className="text-[#0d7cae]">Premium Supplies</span>
          </>
        }
        intro="As Masar Arabia First Trading Company, we specialize in the procurement and supply of Mechanical, Electrical, and Instrumentation materials and equipment — for Industrial, Power, Water and Desalination, Oil & Gas, Cement, Fertilizers, Sugar, Chemicals, Steel mills, Mining, Pharmaceutical and Food plants."
        crumbs={[{ label: 'About Us', href: '/about' }]}
        image={{ src: '/images/masar/cooling-and-frp.webp', alt: 'Industrial cooling equipment supplied by Masar Arabia' }}
      />
      <AboutSection />
      <WhyMasar />
      <ClientsSection />
      <CtaBand />
    </>
  );
}
