import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '@/lib/masarContent';
import { quoteHref } from '@/lib/routes';
import { DIVISION_THEMES, themeColors, themeVars } from '@/lib/divisionThemes';
import ShowcaseHeader from '../ShowcaseHeader';

const BLUEPRINT_GRID =
  'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)';
const CROP = [
  'top-0 left-0 border-t-2 border-l-2',
  'top-0 right-0 border-t-2 border-r-2',
  'bottom-0 left-0 border-b-2 border-l-2',
  'bottom-0 right-0 border-b-2 border-r-2',
];

/** Mechanical — engineering blueprint: each product is a drawing sheet with a title block. */
export default function MechanicalShowcase({ category }: { category: Category }) {
  const t = DIVISION_THEMES.mechanical;
  return (
    <section
      id="products"
      data-label="Products"
      style={{
        ...themeVars(themeColors(t)),
        backgroundColor: `rgb(${t.deep})`,
        backgroundImage: BLUEPRINT_GRID,
        backgroundSize: '140px 140px, 140px 140px, 28px 28px, 28px 28px',
      }}
      className="relative py-20 sm:py-28 overflow-hidden text-white"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader
          dark
          eyebrow={`${category.products.length} Mechanical Components`}
          title={
            <>
              Precision <span className="text-[var(--accent-light)]">Engineered</span> Components
            </>
          }
          intro="Ball joints, expansion joints, pumps, valves and actuators — built for seamless operation, durability and performance."
        />

        <ul className="mt-12 sm:mt-14 grid md:grid-cols-2 gap-5 sm:gap-6">
          {category.products.map((p, i) => {
            const dwg = `ME-${String(i + 1).padStart(2, '0')}`;
            return (
              <li key={p.name} data-anim="up">
                <Link
                  href={quoteHref(p.name)}
                  className="group block h-full rounded-md border border-white/25 bg-white/[0.03] hover:border-[var(--accent-light)] hover:bg-white/[0.06] transition-colors font-mono"
                >
                  {/* drawing area */}
                  <div className="relative p-5 sm:p-7">
                    <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/50">
                      <span className="h-px flex-1 bg-white/30" />
                      DETAIL {String.fromCharCode(65 + i)}
                      <span className="h-px flex-1 bg-white/30" />
                    </div>
                    <div className="relative mt-4 mx-auto w-[86%] aspect-[16/10]">
                      {CROP.map((c) => (
                        <span key={c} aria-hidden="true" className={`absolute w-5 h-5 border-[var(--accent-light)] ${c}`} />
                      ))}
                      <div className="absolute inset-3 rounded-sm overflow-hidden bg-white">
                        {p.image && (
                          <Image src={p.image} alt={p.name} fill sizes="(min-width: 768px) 40vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        )}
                      </div>
                    </div>
                  </div>
                  {/* title block */}
                  <div className="grid grid-cols-[auto_1fr] border-t border-white/25 text-[11px]">
                    <div className="px-4 py-3 border-r border-white/25">
                      <div className="text-white/45 tracking-[0.15em]">DWG NO.</div>
                      <div className="mt-1 text-sm font-bold text-[var(--accent-light)]">{dwg}</div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="text-white/45 tracking-[0.15em]">COMPONENT</div>
                      <div className="mt-1 font-sans text-base sm:text-lg font-bold text-white leading-snug">{p.name}</div>
                    </div>
                    <div className="col-span-2 px-4 py-3 border-t border-white/25 font-sans text-[13px] sm:text-sm leading-relaxed text-white/65">
                      {p.description}
                    </div>
                    <div className="col-span-2 flex items-center justify-between px-4 py-2.5 border-t border-white/25 tracking-[0.15em] text-white/45">
                      <span>MASAR ARABIA · MECHANICAL</span>
                      <span className="inline-flex items-center gap-1 font-bold text-[var(--accent-light)]">
                        ENQUIRE <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
                      </span>
                    </div>
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
