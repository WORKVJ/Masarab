import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '@/lib/masarContent';
import { quoteHref } from '@/lib/routes';
import { DIVISION_THEMES, themeColors, themeVars } from '@/lib/divisionThemes';
import ShowcaseHeader from '../ShowcaseHeader';

/** Hexagon (molecule) shape for the number badge — the chemical division's motif. */
const HEX = 'polygon(25% 4%, 75% 4%, 100% 50%, 75% 96%, 25% 96%, 0% 50%)';

/**
 * Chemical — photo-first product cards on a soft violet "lab" backdrop.
 * The product photo leads every card; the division identity comes from the violet tones,
 * the molecule pattern and the hexagon number badges.
 */
export default function ChemicalShowcase({ category }: { category: Category }) {
  const t = DIVISION_THEMES.chemical;
  return (
    <section id="products" data-label="Products" style={themeVars(themeColors(t))} className="relative py-20 sm:py-28 bg-[var(--accent-soft)] overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.06] invert pointer-events-none" style={{ backgroundImage: t.pattern, backgroundSize: t.patternSize }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader
          eyebrow={`${category.products.length} Chemical Families`}
          title={
            <>
              Our Chemical <span className="text-[var(--accent)]">Portfolio</span>
            </>
          }
          intro="Alcohols, aromatics, ketones, oleo chemicals and more — high-quality chemicals for industries across Saudi Arabia."
        />

        <ul className="mt-12 sm:mt-14 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {category.products.map((p, i) => (
            <li key={p.name} data-anim="up">
              <Link
                href={quoteHref(p.name)}
                className="group h-full flex flex-col overflow-hidden rounded-[22px] bg-white border border-violet-100 shadow-[0_20px_40px_-30px_rgba(46,16,101,0.55)] hover:border-[var(--accent-light)] hover:-translate-y-1 hover:shadow-[0_30px_55px_-30px_rgba(124,58,237,0.55)] transition-[translate,border-color,box-shadow] duration-300"
              >
                {/* photo — the hero of the card */}
                <span className="relative block aspect-[4/3] overflow-hidden bg-[var(--accent-soft)]">
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: `linear-gradient(to top, rgba(${t.deep},0.35), transparent)` }} />
                  <span
                    className="absolute top-3 left-3 w-10 h-9 sm:w-11 sm:h-10 flex items-center justify-center font-mono text-[11px] sm:text-xs font-bold text-white"
                    style={{ clipPath: HEX, background: t.accent }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <span className="flex flex-1 flex-col p-4 sm:p-6">
                  <span className="text-[15px] sm:text-lg font-bold leading-snug text-slate-900 group-hover:text-[var(--accent)] transition-colors">
                    {p.name}
                  </span>
                  {p.description && (
                    <span className="mt-2 max-sm:hidden text-sm leading-relaxed text-slate-500 line-clamp-2">{p.description}</span>
                  )}
                  <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[var(--accent)]">
                    Enquire <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
