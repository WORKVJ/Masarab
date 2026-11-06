import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/sections/PageHero';
import ClientsSection from '@/components/sections/ClientsSection';
import CtaBand from '@/components/sections/CtaBand';

const DESCRIPTION =
  'Chosen by leading clients in Saudi Arabia for quality and reliability — developers, utilities and industrial groups across the Kingdom.';

export const metadata: Metadata = pageMetadata({ title: 'Our Clients – Trusted Across Saudi Arabia', description: DESCRIPTION, path: '/clients' });

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
