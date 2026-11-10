import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Hero, { HeroCardsBand } from '@/components/Hero';
import KineticMarquee from '@/components/KineticMarquee';
import ProductRangeSection from '@/components/sections/ProductRangeSection';
import AboutSection from '@/components/sections/AboutSection';
import CategoryCards from '@/components/sections/CategoryCards';
import IndustriesSection from '@/components/sections/IndustriesSection';
import WhyMasar from '@/components/sections/WhyMasar';
import ClientsSection from '@/components/sections/ClientsSection';
import CtaBand from '@/components/sections/CtaBand';

const DESCRIPTION =
  'Leading industrial supplier in Saudi Arabia: cooling towers, water treatment, chemicals, electrical, instrumentation, mechanical, pipe fittings & safety gear.';

export const metadata: Metadata = pageMetadata({ title: 'Leading Industrial Supplier in Saudi Arabia | Masar Arabia', absoluteTitle: true, description: DESCRIPTION, path: '/' });

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Client request: the client logos come straight after the hero */}
      <ClientsSection />

      {/* The 8 divisions; each card opens its own division page (/products/<slug>) */}
      <CategoryCards eyebrow="Our Divisions" label="Divisions" />

      {/* …then the products: showroom product range (16 lines from the client's display board) */}
      <ProductRangeSection />

      <AboutSection showMore />

      <IndustriesSection />

      <WhyMasar />

      {/* Client request: moving cards + scrolling division names moved down here */}
      <HeroCardsBand />
      <KineticMarquee
        rows={[
          ['Cooling Solutions', 'Water Treatment', 'Chemical', 'Electrical'],
          ['Instrumentation', 'Mechanical', 'Pipe Fittings & Alloys', 'Safety Equipments'],
        ]}
      />

      <CtaBand />
    </>
  );
}
