import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, LayoutGrid } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};
import PageHero from '@/components/sections/PageHero';
import CategoryCards from '@/components/sections/CategoryCards';

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="Error 404"
        title={
          <>
            This Page <span className="text-[#0d7cae]">Could Not Be Found</span>
          </>
        }
        intro="The link may be outdated, or the page may have moved. Try one of our product disciplines below, or head back home."
        crumbs={[{ label: 'Page not found', href: '/404' }]}
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-[#0d7cae] hover:bg-[#0b6a95] text-white px-6 py-3 text-sm font-bold transition-colors"
        >
          Back to home <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 hover:border-sky-300 transition-colors"
        >
          <LayoutGrid className="w-4 h-4 text-[#0d7cae]" /> All products
        </Link>
      </PageHero>
      <CategoryCards showAllLink={false} />
    </>
  );
}
