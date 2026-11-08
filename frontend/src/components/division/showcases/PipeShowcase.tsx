import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '@/lib/masarContent';
import { quoteHref } from '@/lib/routes';
import { DIVISION_THEMES, themeColors, themeVars } from '@/lib/divisionThemes';
import ShowcaseHeader from '../ShowcaseHeader';

const RIVETS = ['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'];

/** Pipe Fittings & Alloys — a steel catalogue: large alternating rows on brushed-metal plates. */
export default function PipeShowcase({ category }: { category: Category }) {
  const t = DIVISION_THEMES['pipe-fittings'];
  return (
    <section id="products" data-label="Products" style={themeVars(themeColors(t))} className="relative py-20 sm:py-28 bg-[#f1f5f9] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] invert pointer-events-none"
        style={{ backgroundImage: t.pattern, backgroundSize: t.patternSize, maskImage: 'linear-gradient(black, transparent 40%)', WebkitMaskImage: 'linear-gradient(black, transparent 40%)' }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader
          eyebrow={`${category.products.length} Product Lines`}
          title={
            <>
              Built Into Every <span className="text-[var(--accent)]">Pipeline</span>
            </>
          }
          intro="Plates and sheets, special fittings, nuts and bolts — for seamless integration and optimal performance in industrial piping systems."
        />

        <ol className="mt-14 sm:mt-16 space-y-10 sm:space-y-14">
          {category.products.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={p.name} data-anim="up">
                <Link href={quoteHref(p.name)} className="group grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                  {/* brushed steel plate */}
                  <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden bg-gradient-to-br from-[#e2e8f0] via-white to-[#cbd5e1] ring-1 ring-slate-300/70 shadow-[0_40px_70px_-45px_rgba(15,23,42,0.7)]">
                      <div aria-hidden="true" className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.6)_0_1px,transparent_1px_4px)]" />
                      {RIVETS.map((r) => (
                        <span key={r} aria-hidden="true" className={`absolute ${r} w-2.5 h-2.5 rounded-full bg-gradient-to-br from-white to-slate-400 ring-1 ring-slate-400/60`} />
                      ))}
                      {p.image && (
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="object-contain p-8 sm:p-12 drop-shadow-[0_20px_25px_rgba(15,23,42,0.25)] transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>
                  </div>
                  {/* spec side */}
                  <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                    <span
                      aria-hidden="true"
                      className="block text-[72px] sm:text-[96px] font-black leading-none text-transparent [-webkit-text-stroke:2px_#94a3b8]"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950 group-hover:text-[var(--accent)] transition-colors">
                      {p.name}
                    </h3>
                    <span className="mt-4 block h-[3px] w-14 rounded-full bg-gradient-to-r from-slate-400 to-slate-200" />
                    {p.description && <p className="mt-4 text-base leading-[1.8] text-slate-600">{p.description}</p>}
                    <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-5 py-2.5 text-sm font-bold group-hover:bg-[var(--accent)] transition-colors">
                      Request a Quote <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
