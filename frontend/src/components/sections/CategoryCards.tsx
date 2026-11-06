import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/masarContent';
import { categoryHref } from '@/lib/routes';
import SectionHeader from './SectionHeader';

interface CategoryCardsProps {
  /** hide this category (used on a category page for "other disciplines") */
  excludeId?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: string;
  /** show the "View all products" button */
  showAllLink?: boolean;
  id?: string;
}

/** Grid of the product categories, each linking to its own page. */
export default function CategoryCards({
  excludeId,
  eyebrow = 'Our Products',
  title = (
    <>
      Eight Disciplines. <span className="text-[#0d7cae]">One Trusted Supplier.</span>
    </>
  ),
  intro = 'From cooling and water treatment to chemicals, instrumentation and workforce safety — sourced from renowned manufacturers and delivered across the Kingdom.',
  showAllLink = true,
  id = 'categories',
}: CategoryCardsProps) {
  const list = CATEGORIES.filter((c) => c.id !== excludeId);

  return (
    <section id={id} data-label="Products" className="relative py-20 sm:py-28 bg-[#f6f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />
          {showAllLink && (
            <Link
              href="/products"
              data-anim="up"
              className="group self-start lg:self-end inline-flex items-center gap-2 rounded-full bg-[#0d7cae] hover:bg-[#0b6a95] text-white px-6 py-3 text-sm font-bold shadow-[0_10px_30px_-10px_rgba(13,124,174,0.8)] transition-colors"
            >
              View all products
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          )}
        </div>

        <ul className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {list.map((c, i) => (
            <li key={c.id} data-anim="flip" className="[perspective:900px]">
              <Link
                href={categoryHref(c.slug)}
                className="group relative block h-56 sm:h-72 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_24px_50px_-30px_rgba(13,124,174,0.6)]"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/90 via-[#04121f]/35 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 rounded-full bg-white/15 border border-white/25 px-2.5 py-1 text-[10px] font-mono text-white">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                  <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-sky-300">
                    {c.products.length} Products
                  </span>
                  <h3 className="mt-1 text-base sm:text-xl font-black uppercase tracking-tight leading-tight">{c.name}</h3>
                  <span className="mt-2 hidden sm:block h-[2px] w-10 bg-orange-400 origin-left transition-transform duration-500 group-hover:scale-x-[2.5]" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
