import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '@/lib/masarContent';
import { quoteHref } from '@/lib/routes';
import { DIVISION_THEMES, themeColors, themeVars } from '@/lib/divisionThemes';
import ShowcaseHeader from '../ShowcaseHeader';

/** Cooling — a dark, icy bento gallery: one feature tile, one wide tile, the rest square. */
export default function CoolingShowcase({ category }: { category: Category }) {
  const t = DIVISION_THEMES.cooling;
  const Icon = t.icon;
  return (
    <section
      id="products"
      data-label="Products"
      style={{ ...themeVars(themeColors(t)), background: `rgb(${t.deep})` }}
      className="relative py-20 sm:py-28 overflow-hidden text-white"
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: t.pattern, backgroundSize: t.patternSize }} />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(55% 45% at 85% 0%, ${t.accent}66, transparent 70%), radial-gradient(45% 40% at 0% 100%, ${t.light}22, transparent 70%)` }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader
          dark
          eyebrow={`${category.products.length} Cooling Products`}
          title={
            <>
              Engineered to Keep <span className="text-[var(--accent-light)]">Plants Cool</span>
            </>
          }
          intro="Cooling towers, FRP fans, chillers and air handling — selected for effective heat dissipation, energy efficiency and dependable operation."
        />

        <ul className="mt-12 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 auto-rows-[210px] sm:auto-rows-[250px] gap-3 sm:gap-4 [grid-auto-flow:dense]">
          {category.products.map((p, i) => {
            const feature = i === 0;
            const wide = i === 1;
            return (
              <li key={p.name} data-anim="up" className={feature ? 'col-span-2 row-span-2' : wide ? 'col-span-2' : ''}>
                <Link
                  href={quoteHref(p.name)}
                  aria-label={`${p.name} — request a quote`}
                  className="group relative block h-full overflow-hidden rounded-[22px] ring-1 ring-white/10 hover:ring-[var(--accent-light)]/60 transition-[box-shadow]"
                >
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes={feature ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, rgba(${t.deep},0.95) 0%, rgba(${t.deep},0.55) 40%, rgba(${t.deep},0.05) 75%)` }}
                  />
                  {feature && (
                    <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-[11px] font-semibold">
                      <Icon className="w-3.5 h-3.5 text-[var(--accent-light)]" /> Featured
                    </span>
                  )}
                  <span className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-[background-color,rotate] duration-300 group-hover:bg-[var(--accent)] group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] text-[var(--accent-light)]">
                      C-{String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className={`mt-1 font-black uppercase tracking-tight leading-tight ${feature ? 'text-2xl sm:text-4xl' : 'text-[15px] sm:text-lg'}`}>
                      {p.name}
                    </h3>
                    {(feature || wide) && p.description && (
                      <p className={`mt-2 text-white/70 leading-relaxed ${feature ? 'text-sm sm:text-base max-w-md' : 'max-sm:hidden text-sm max-w-sm line-clamp-2'}`}>
                        {p.description}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
