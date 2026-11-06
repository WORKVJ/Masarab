'use client';

import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import type { Category } from '@/lib/masarContent';
import { useRequestQuote } from '@/lib/useRequestQuote';
import RollText from '@/components/motion/RollText';
import SectionHeader from './SectionHeader';

/** Full product list for one category page. */
export default function CategoryProducts({ category }: { category: Category }) {
  const requestQuote = useRequestQuote();
  const chips = category.products.every((p) => !p.description);

  return (
    <section id="products" data-label="Products" className="relative py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={`${category.products.length} Products`}
          title={
            <>
              Our <span className="text-[#0d7cae]">{category.name}</span> Range
            </>
          }
          intro="Tap any item to request a quotation — our team will confirm specifications, pricing and availability."
        />

        {chips ? (
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.products.map((p, i) => (
              <li key={p.name} data-anim="up">
                <article className="group relative h-full overflow-hidden rounded-[22px] bg-white border border-slate-200/80 p-6 flex flex-col hover:border-sky-300 hover:shadow-[0_18px_40px_-20px_rgba(13,124,174,0.45)] hover:-translate-y-1 transition-all duration-300">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-sky-400 to-[#0d7cae] transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-slate-950 leading-snug">{p.name}</h3>
                    <span className="font-mono text-[11px] text-slate-300 shrink-0 transition-colors group-hover:text-[#0d7cae]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">{p.description}</p>
                  <button
                    onClick={() => requestQuote(p.name)}
                    aria-label={`Enquire about ${p.name}`}
                    className="mt-4 self-start inline-flex items-center gap-1 py-2 -mb-2 text-xs font-bold text-[#0d7cae] cursor-pointer"
                  >
                    <RollText>Enquire</RollText>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
                  </button>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
