import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import ClientsSection from '@/components/sections/ClientsSection';
import CtaBand from '@/components/sections/CtaBand';

const DESCRIPTION =
  'Chosen by leading clients in Saudi Arabia for quality and reliability — developers, utilities and industrial groups across the Kingdom.';

export const metadata: Metadata = {
  title: 'Clients',
  description: DESCRIPTION,
  alternates: { canonical: '/clients' },
  openGraph: { url: '/clients', title: 'Our Clients | Masar Arabia', description: DESCRIPTION },
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Clients"
        title={
          <>
            Trusted by <span className="text-[#0d7cae]">Leading Clients</span>
          </>
        }
        intro={DESCRIPTION}
        crumbs={[{ label: 'Clients', href: '/clients' }]}
      />
      <ClientsSection />
      <CtaBand />
    </>
  );
}
