import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/sections/PageHero';
import AboutSection from '@/components/sections/AboutSection';
import AboutStory from '@/components/sections/AboutStory';
import WhyMasar from '@/components/sections/WhyMasar';
import ClientsSection from '@/components/sections/ClientsSection';
import CtaBand from '@/components/sections/CtaBand';
import { ABOUT_PAGE } from '@/lib/masarContent';

const DESCRIPTION =
  'Masar Arabia First Trading Company supplies Mechanical, Electrical and Instrumentation materials to Power, Oil & Gas, Water and industrial plants in KSA.';

export const metadata: Metadata = pageMetadata({ title: 'About Us – Industrial Supplier in Saudi Arabia', description: DESCRIPTION, path: '/about' });

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={ABOUT_PAGE.heading}
        title={
          <>
            Your Trusted Partner for <span className="text-[#0d7cae]">Industrial Solutions</span>
          </>
        }
        intro={ABOUT_PAGE.paragraphs[0]}
        crumbs={[{ label: 'About Us', href: '/about' }]}
        image={{ src: '/images/masar/about.webp', alt: 'Masar Arabia — trusted industrial partner in Saudi Arabia' }}
      />
      <AboutSection />
      <AboutStory />
      <WhyMasar />
      <ClientsSection />
      <CtaBand />
    </>
  );
}
