import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '@/lib/masarContent';
import { INSTRUMENT_RANGES } from '@/lib/catalog';
import { quoteHref } from '@/lib/routes';
import { productHref, productLink } from '@/lib/productRoutes';
import { DIVISION_THEMES, themeColors, themeVars } from '@/lib/divisionThemes';
import ShowcaseHeader from '../ShowcaseHeader';

const ARC = Math.PI * 50; // length of the r=50 half-circle

/** A small static instrument dial; `f` (0–1) sets the reading. */
function Dial({ f }: { f: number }) {
  const angle = -90 + 180 * f;
  return (
    <svg viewBox="0 0 120 70" className="w-14" aria-hidden="true">
      <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="#e2e8f0" strokeWidth="9" strokeLinecap="round" />
      <path
        d="M10 62 A50 50 0 0 1 110 62"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={`${(ARC * f).toFixed(1)} ${ARC.toFixed(1)}`}
      />
      <line x1="60" y1="62" x2="60" y2="24" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" transform={`rotate(${angle} 60 62)`} />
      <circle cx="60" cy="62" r="7" fill="#0f172a" />
    </svg>
  );
}

/** Instrumentation — an instrument panel: photo "channels" for each product line, then the full instrument catalogue. */
export default function InstrumentationShowcase({ category }: { category: Category }) {
  const t = DIVISION_THEMES.instrumentation;
  const subCount = INSTRUMENT_RANGES.reduce((n, r) => n + r.subs.length, 0);
  return (
    <>
      <section
        id="products"
        data-label="Products"
        style={themeVars(themeColors(t))}
        className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-white via-[var(--accent-soft)] to-white"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShowcaseHeader
            center
            eyebrow={`${category.products.length} Instrumentation Lines`}
            title={
              <>
                Precision on <span className="text-[var(--accent)]">Every Dial</span>
              </>
            }
            intro="Flow meters, gas detectors, gauges, level, pressure and temperature instruments, sensors and positioners — quality-tested for accuracy and reliability."
          />

          <div data-anim="up" className="mt-12 sm:mt-14 rounded-[28px] bg-white border border-slate-200/80 p-3 sm:p-4 shadow-[0_40px_80px_-50px_rgba(2,44,34,0.55)]">
            <ul className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3">
              {category.products.map((p, i) => {
                const detail = productHref(category, p.name);
                return (
                  <li key={p.name}>
                    <Link
                      href={productLink(category, p.name)}
                      className="group h-full flex flex-col rounded-[20px] bg-[#f8fafc] border border-slate-200/70 p-2.5 hover:bg-white hover:border-[var(--accent-light)] hover:shadow-[0_18px_36px_-24px_rgba(5,150,105,0.6)] transition-[background-color,border-color,box-shadow] duration-300"
                    >
                      <span className="relative block aspect-[4/3] rounded-[14px] overflow-hidden bg-white">
                        {p.image && (
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="(min-width: 1024px) 290px, (min-width: 480px) 45vw, 92vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.18em] text-[var(--accent)] shadow-2xs">
                          CH-{String(i + 1).padStart(2, '0')}
                        </span>
                      </span>
                      <span className="flex flex-1 flex-col px-2 pt-3 pb-1.5">
                        <span className="flex items-start justify-between gap-2">
                          <span className="text-[15px] font-bold leading-snug text-slate-900">{p.name}</span>
                          <Dial f={0.25 + ((i * 0.37) % 0.65)} />
                        </span>
                        <span className="mt-1.5 text-[13px] leading-relaxed text-slate-500 line-clamp-3">{p.description}</span>
                        <span className="mt-auto pt-3 inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-[var(--accent)] transition-colors">
                          {detail ? 'View details' : 'Enquire'} <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* the client's instrument catalogue (masararabia.com/instrumentation): 11 categories → sub-categories */}
      <section
        id="instrument-catalogue"
        data-label="Instrument Catalogue"
        style={themeVars(themeColors(t))}
        className="relative py-20 sm:py-28 bg-white border-t border-slate-200/70"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShowcaseHeader
            eyebrow={`${INSTRUMENT_RANGES.length} Categories · ${subCount} Instrument Ranges`}
            title={
              <>
                Instrument <span className="text-[var(--accent)]">Catalogue</span>
              </>
            }
            intro="Moisture meters, thermometers, hygrometers, data loggers and more — a comprehensive range of precision test and measurement instruments for every industry."
          />

          {/* category index */}
          <nav aria-label="Instrument categories" className="mt-10 flex flex-wrap gap-2">
            {INSTRUMENT_RANGES.map((r) => (
              <a
                key={r.slug}
                href={`#range-${r.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white pl-1.5 pr-4 py-1.5 text-sm font-semibold text-slate-700 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                {r.icon && <Image src={r.icon} alt="" width={26} height={26} className="rounded-full bg-[var(--accent-soft)] p-0.5" />}
                {r.name}
                <span className="font-mono text-[11px] text-slate-400">{r.subs.length}</span>
              </a>
            ))}
          </nav>

          <div className="mt-12 space-y-14 sm:space-y-16">
            {INSTRUMENT_RANGES.map((r, ri) => (
              <div key={r.slug} id={`range-${r.slug}`} className="scroll-mt-28 grid lg:grid-cols-12 gap-6 lg:gap-10">
                <div className="lg:col-span-3">
                  <div className="lg:sticky lg:top-28 flex lg:flex-col items-center lg:items-start gap-4">
                    {r.icon && (
                      <span className="shrink-0 w-14 h-14 rounded-2xl bg-[var(--accent-soft)] grid place-items-center">
                        <Image src={r.icon} alt="" width={40} height={40} />
                      </span>
                    )}
                    <div>
                      <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--accent)]">CAT-{String(ri + 1).padStart(2, '0')}</span>
                      <h3 className="mt-1 text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950">{r.name}</h3>
                    </div>
                  </div>
                </div>
                <ul className="lg:col-span-9 grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3 gap-4">
                  {r.subs.map((s) => (
                    <li key={s.slug} data-anim="up">
                      <Link
                        href={quoteHref(s.name)}
                        className="group flex h-full gap-4 rounded-[20px] border border-slate-200/80 bg-white p-3 hover:border-[var(--accent)] hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)] transition-[border-color,box-shadow] duration-300"
                      >
                        <span className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-slate-50">
                          {s.image && <Image src={s.image} alt={s.name} fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                        </span>
                        <span className="flex min-w-0 flex-col py-0.5">
                          <span className="text-[15px] font-bold leading-snug text-slate-900">{s.name}</span>
                          <span className="mt-1 text-[12.5px] leading-relaxed text-slate-500 line-clamp-3">{s.description}</span>
                          <span className="mt-auto pt-2 inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-[var(--accent)] transition-colors">
                            Enquire <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
