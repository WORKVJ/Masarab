import type { Metadata } from 'next';
import Image from 'next/image';
import { pageMetadata } from '@/lib/seo';
import { BRANDS } from '@/lib/catalog';
import PageHero from '@/components/sections/PageHero';
import ClientsSection from '@/components/sections/ClientsSection';
import CtaBand from '@/components/sections/CtaBand';

const DESCRIPTION =
  'Masar Arabia partners with industry-leading brands — Pure Water Group, ENCON, CTC, PRO, TMP and Four Wents — to supply the finest industrial products in Saudi Arabia.';

export const metadata: Metadata = pageMetadata({ title: 'Our Brands – Trusted Industrial Partners', description: DESCRIPTION, path: '/brands' });

export default function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="Brands"
        title={
          <>
            Partnering with <span className="text-[#0d7cae]">Top Brands</span>
          </>
        }
        intro="Partnering with Top Brands for Excellence."
        crumbs={[{ label: 'Brands', href: '/brands' }]}
      />

      <section id="brands" data-label="Brands" className="relative pb-16 sm:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p data-anim="up" className="max-w-3xl text-[15px] sm:text-[17px] leading-[1.8] text-slate-600">
            {BRANDS.intro}
          </p>
          <ul className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {BRANDS.list.map((b) => (
              <li
                key={b.name}
                data-anim="up"
                className="group flex flex-col items-center justify-center gap-4 rounded-[24px] border border-slate-200/80 bg-white px-6 py-8 sm:py-10 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.5)] hover:border-[#0d7cae]/50 hover:shadow-[0_30px_60px_-40px_rgba(13,124,174,0.45)] transition-[border-color,box-shadow] duration-300"
              >
                <div className="relative w-full h-20 sm:h-24">
                  <Image src={b.logo} alt={`${b.name} logo`} fill sizes="(min-width: 768px) 280px, 42vw" className="object-contain" />
                </div>
                <span className="text-sm sm:text-base font-bold text-slate-800">{b.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClientsSection />
      <CtaBand />
    </>
  );
}
