'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Search, X } from 'lucide-react';
import type { CategoryProduct } from '@/lib/masarContent';
import { quoteHref } from '@/lib/routes';
import { type DivisionColors, themeVars } from '@/lib/divisionThemes';
import ShowcaseHeader from '../ShowcaseHeader';

const PREVIEW = 12;
const HAZARD = 'repeating-linear-gradient(-45deg, #facc15 0 14px, #111827 14px 28px)';

/**
 * Safety — a searchable PPE catalogue with signage-style cards.
 * All 44 products are always in the HTML (extra ones are only CSS-hidden) so search engines see the full range.
 */
export default function SafetyShowcase({ products, colors }: { products: CategoryProduct[]; colors: DivisionColors }) {
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const q = query.trim().toLowerCase();
  const matches = useMemo(
    () => new Set(products.filter((p) => !q || `${p.name} ${p.description}`.toLowerCase().includes(q)).map((p) => p.name)),
    [products, q]
  );
  const expanded = showAll || Boolean(q);

  return (
    <section id="products" data-label="Products" style={themeVars(colors)} className="relative pt-0 pb-20 sm:pb-28 bg-white overflow-hidden">
      <div aria-hidden="true" className="h-3" style={{ backgroundImage: HAZARD }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <ShowcaseHeader
            eyebrow={`${products.length} Safety Products`}
            title={
              <>
                Head-to-Toe <span className="text-[var(--accent)]">Protection</span>
              </>
            }
            intro="Coveralls, fall protection, fire and arc-flash gear, respiratory protection, spill control and site safety — rigorously tested for reliability."
          />
          {/* search */}
          <div data-anim="up" className="w-full lg:w-80 shrink-0">
            <label htmlFor="ppe-search" className="block font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Find safety equipment
            </label>
            <div className="relative mt-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="ppe-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. gloves, helmet, spill"
                className="w-full h-12 rounded-full border border-slate-200 bg-white pl-11 pr-10 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-500" aria-live="polite">
              {q ? `${matches.size} of ${products.length} products match “${query.trim()}”` : `${products.length} products in the range`}
            </p>
          </div>
        </div>

        <ul className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {products.map((p, i) => {
            const visible = matches.has(p.name) && (expanded || i < PREVIEW);
            return (
              <li key={p.name} className={visible ? '' : 'hidden'}>
                <Link
                  href={quoteHref(p.name)}
                  className="group h-full flex flex-col overflow-hidden rounded-[18px] bg-white border border-slate-200/80 hover:border-[var(--accent)] hover:shadow-[0_22px_40px_-26px_rgba(234,88,12,0.6)] transition-[border-color,box-shadow] duration-300"
                >
                  <span className="relative aspect-[4/3] bg-[#f8fafc]">
                    {p.image && (
                      <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain p-3 transition-transform duration-500 group-hover:scale-105" />
                    )}
                    <span className="absolute top-2.5 left-2.5 rounded-md bg-[var(--accent)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-white">
                      PPE-{String(i + 1).padStart(2, '0')}
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col p-3.5 sm:p-4 border-t border-slate-100">
                    <span className="text-[13.5px] sm:text-[15px] font-bold leading-snug text-slate-900">{p.name}</span>
                    {p.description && <span className="mt-1.5 max-sm:hidden text-[13px] leading-relaxed text-slate-500 line-clamp-2">{p.description}</span>}
                    <span className="mt-auto pt-3 inline-flex items-center gap-1 text-xs font-bold text-[var(--accent)]">
                      Enquire <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {q && matches.size === 0 && (
          <p className="mt-10 text-center text-slate-500">
            No match for “{query.trim()}”.{' '}
            <Link href={quoteHref(query.trim())} className="font-bold text-[var(--accent)] underline-offset-4 hover:underline">
              Ask us for it
            </Link>{' '}
            — we can source it.
          </p>
        )}

        {!q && products.length > PREVIEW && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="h-12 px-7 rounded-full bg-slate-950 text-white text-sm font-bold hover:bg-[var(--accent)] transition-colors"
            >
              {showAll ? 'Show fewer products' : `Show all ${products.length} safety products`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
