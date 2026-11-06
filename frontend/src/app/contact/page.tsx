import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHero from '@/components/sections/PageHero';
import RfqSection from '@/components/RfqSection';
import { CONTACT } from '@/lib/masarContent';

const DESCRIPTION = `Request a quotation or contact Masar Arabia — ${CONTACT.addressLines.join(', ')} · ${CONTACT.phoneDisplay} · ${CONTACT.email}`;

export const metadata: Metadata = {
  title: 'Contact Us',
  description: DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact', title: 'Contact Masar Arabia', description: DESCRIPTION },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            Let&apos;s Talk About <span className="text-[#0d7cae]">Your Project</span>
          </>
        }
        intro="Share your requirements — product names, quantities or drawings — and our team will get back to you with pricing and availability."
        crumbs={[{ label: 'Contact', href: '/contact' }]}
      />
      {/* RfqSection reads ?product= from the URL, so it renders inside a Suspense boundary */}
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <RfqSection />
      </Suspense>
    </>
  );
}
