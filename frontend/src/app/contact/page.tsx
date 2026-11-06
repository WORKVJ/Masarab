import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/sections/PageHero';
import RfqSection from '@/components/RfqSection';
import { CONTACT, CONTACT_PAGE } from '@/lib/masarContent';

const DESCRIPTION = `Contact Masar Arabia, ${CONTACT.addressLines[0]}, Jeddah 22234. Call ${CONTACT.phoneDisplay} or email ${CONTACT.email} for quotes and product inquiries.`;

export const metadata: Metadata = pageMetadata({ title: 'Contact Us – Industrial Product Inquiries', description: DESCRIPTION, path: '/contact' });

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string | string[] }> }) {
  const { product } = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title={
          <>
            Contact <span className="text-[#0d7cae]">Us</span>
          </>
        }
        intro={CONTACT_PAGE.text}
        crumbs={[{ label: 'Contacts', href: '/contact' }]}
      />
      {/* ?product= (from any "Enquire" / "Request a Quote" button) pre-fills the form */}
      <RfqSection prefilledProduct={typeof product === 'string' ? product : ''} />
    </>
  );
}
