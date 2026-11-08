import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '@/lib/masarContent';
import { quoteHref } from '@/lib/routes';
import { DIVISION_THEMES, themeColors, themeVars } from '@/lib/divisionThemes';
import ShowcaseHeader from '../ShowcaseHeader';

const ARC = Math.PI * 50; // length of the r=50 half-circle

/** A static instrument dial; `f` (0–1) sets the reading. */
function Dial({ f }: { f: number }) {
  const angle = -90 + 180 * f;
  return (
    <svg viewBox="0 0 120 70" className="w-full max-w-[150px]" aria-hidden="true">
      <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
      <path
        d="M10 62 A50 50 0 0 1 110 62"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${(ARC * f).toFixed(1)} ${ARC.toFixed(1)}`}
      />
      {Array.from({ length: 9 }, (_, k) => (
        <line key={k} x1="60" y1="20" x2="60" y2={k % 2 ? 25 : 28} stroke="#94a3b8" strokeWidth="1.2" transform={`rotate(${-80 + k * 20} 60 62)`} />
      ))}
      <line x1="60" y1="62" x2="60" y2="27" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${angle} 60 62)`} />
      <circle cx="60" cy="62" r="5" fill="#0f172a" />
      <circle cx="60" cy="62" r="2" fill="var(--accent)" />
    </svg>
  );
}

/** Instrumentation — an instrument dashboard: every product line is a gauge on the panel. */
export default function InstrumentationShowcase({ category }: { category: Category }) {
  const t = DIVISION_THEMES.instrumentation;
  return (
    <section
      id="products"
      data-label="Products"
      style={themeVars(themeColors(t))}
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-white via-[var(--accent-soft)] to-white"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader
          center
          eyebrow={`${category.products.length} Instrument Categories`}
          title={
            <>
              Precision on <span className="text-[var(--accent)]">Every Dial</span>
            </>
          }
          intro="Moisture meters, thermometers, hygrometers, data loggers and more — instruments for accuracy, reliability and efficiency."
        />

        <div data-anim="up" className="mt-12 sm:mt-14 rounded-[28px] bg-white border border-slate-200/80 p-3 sm:p-4 shadow-[0_40px_80px_-50px_rgba(2,44,34,0.55)]">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {category.products.map((p, i) => (
              <li key={p.name}>
                <Link
                  href={quoteHref(p.name)}
                  className="group h-full flex flex-col items-center text-center rounded-[20px] bg-[#f8fafc] border border-slate-200/70 px-3 pt-5 pb-4 hover:bg-white hover:border-[var(--accent-light)] hover:shadow-[0_18px_36px_-24px_rgba(5,150,105,0.6)] transition-[background-color,border-color,box-shadow] duration-300"
                >
                  <Dial f={0.25 + ((i * 0.37) % 0.65)} />
                  <span className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[var(--accent)]">CH-{String(i + 1).padStart(2, '0')}</span>
                  <span className="mt-1 text-[14px] sm:text-[15px] font-bold leading-snug text-slate-900">{p.name}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-[var(--accent)] transition-colors">
                    Enquire <ArrowUpRight className="w-3 h-3" />
                  </span>
                </Link>
              </li>
            ))}
            {/* closing tile */}
            <li>
              <Link
                href={quoteHref(category.name)}
                className="group h-full min-h-[190px] flex flex-col justify-between rounded-[20px] p-5 text-white"
                style={{ background: `linear-gradient(145deg, rgb(${t.deep}), ${t.accent})` }}
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/70">CUSTOM</span>
                <span>
                  <span className="block text-lg font-black uppercase leading-tight">Need a specific instrument?</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[var(--accent-light)]">
                    Ask our team <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
