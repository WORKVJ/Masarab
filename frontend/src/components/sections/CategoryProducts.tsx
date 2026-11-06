'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Check } from 'lucide-react';
import type { Category } from '@/lib/masarContent';
import { useRequestQuote } from '@/lib/useRequestQuote';
import RollText from '@/components/motion/RollText';
import SectionHeader from './SectionHeader';

/** Full product list for one category page: the category's intro text, then every product. */
export default function CategoryProducts({ category }: { category: Category }) {
  const requestQuote = useRequestQuote();
  const chips = category.products.every((p) => !p.description);

  return (
    <section id="products" data-label="Products" className="relative py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow={`${category.products.length} Products`} title={category.name} />
          </div>
          <div className="lg:col-span-7 space-y-5">
            {category.intro.map((para) => (
              <p key={para.slice(0, 40)} data-anim="up" className="text-base sm:text-[17px] text-slate-600 leading-[1.8] max-w-[68ch]">
                {para}
              </p>
            ))}
          </div>
        </div>

        {chips ? (
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {category.products.map((p) => (
              <li key={p.name} data-anim="up">
                <button
                  onClick={() => requestQuote(p.name)}
                  className="group w-full flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-[#f8fafc] px-4 py-3.5 text-left hover:border-sky-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-20px_rgba(13,124,174,0.5)] transition-[border-color,background-color,translate,box-shadow] duration-300 cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 shrink-0 rounded-full bg-[#e0f2fe] text-[#0d7cae] flex items-center justify-center transition-colors group-hover:bg-[#0d7cae] group-hover:text-white">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-semibold text-slate-900">{p.name}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#0d7cae] group-hover:rotate-45 transition-[color,rotate] duration-300" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {category.products.map((p, i) => (
              <li key={p.name} data-anim="up">
                <article className="group relative h-full overflow-hidden rounded-[22px] bg-white border border-slate-200/80 flex flex-col hover:border-sky-300 hover:shadow-[0_18px_40px_-20px_rgba(13,124,174,0.45)] hover:-translate-y-1 transition-[border-color,box-shadow,translate] duration-300">
                  {p.image && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f7fa]">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-[scale] duration-700 ease-out group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2 py-0.5 font-mono text-[10px] text-slate-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <h3 className="text-[17px] font-bold text-slate-950 leading-snug">{p.name}</h3>
                    <p className="mt-2.5 text-[15px] text-slate-600 leading-[1.7] flex-1">{p.description}</p>
                    <button
                      onClick={() => requestQuote(p.name)}
                      aria-label={`Enquire about ${p.name}`}
                      className="mt-4 self-start inline-flex items-center gap-1 py-2 -mb-2 text-xs font-bold text-[#0d7cae] cursor-pointer"
                    >
                      <RollText>Enquire</RollText>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
                    </button>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-sky-400 to-[#0d7cae] transition-transform duration-500 group-hover:scale-x-100"
                  />
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
