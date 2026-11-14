import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/sections/PageHero';
import RfqSection from '@/components/RfqSection';
import { getSiteContact } from '@/lib/siteSettings';

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSiteContact();
  const description = `Contact Masar Arabia, ${c.addressLines.join(', ')}. Call ${c.phoneDisplay} or email ${c.email} for quotes and product inquiries.`;
  return pageMetadata({ title: 'Contact Us – Industrial Product Inquiries', description, path: '/contact' });
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string | string[] }> }) {
  const { product } = await searchParams;
  const contact = await getSiteContact();
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title={
          <>
            Contact <span className="text-[#0d7cae]">Us</span>
          </>
        }
        intro={contact.contactIntro}
        crumbs={[{ label: 'Contacts', href: '/contact' }]}
      />
      {/* ?product= (from any "Enquire" / "Request a Quote" button) pre-fills the form */}
      <RfqSection prefilledProduct={typeof product === 'string' ? product : ''} />
    </>
  );
}
