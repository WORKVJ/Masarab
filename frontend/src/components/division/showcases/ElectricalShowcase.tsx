import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '@/lib/masarContent';
import { quoteHref } from '@/lib/routes';
import { DIVISION_THEMES, themeColors, themeVars } from '@/lib/divisionThemes';
import ShowcaseHeader from '../ShowcaseHeader';

const SCREWS = ['top-2.5 left-2.5', 'top-2.5 right-2.5', 'bottom-2.5 left-2.5', 'bottom-2.5 right-2.5'];

/** Electrical — a dark switchgear panel: each product is a mounted module with a status lamp. */
export default function ElectricalShowcase({ category }: { category: Category }) {
  const t = DIVISION_THEMES.electrical;
  return (
    <section id="products" data-label="Products" style={themeVars(themeColors(t))} className="relative py-20 sm:py-28 bg-[#0b0f14] text-white overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: t.pattern, backgroundSize: t.patternSize }} />
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${t.light}, transparent)` }} />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(50% 45% at 15% 0%, ${t.accent}33, transparent 70%)` }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader
          dark
          eyebrow={`${category.products.length} Electrical Modules`}
          title={
            <>
              Power &amp; Control, <span className="text-[var(--accent-light)]">Panel Ready</span>
            </>
          }
          intro="Battery chargers, relays, breakers, VFDs and MCBs for power, oil & gas, desalination and heavy industry."
        />

        {/* the panel */}
        <div data-anim="up" className="mt-12 sm:mt-14 rounded-[28px] p-3 sm:p-4 bg-gradient-to-b from-[#1b222c] to-[#11161d] border border-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
          <ul className="grid md:grid-cols-2 gap-3 sm:gap-4">
            {category.products.map((p, i) => (
              <li key={p.name}>
                <Link
                  href={quoteHref(p.name)}
                  className="group relative flex flex-col gap-4 sm:gap-5 h-full rounded-[20px] p-4 sm:p-5 bg-[#0e1319] border border-white/[0.07] hover:border-[var(--accent-light)]/50 transition-colors"
                >
                  {SCREWS.map((pos) => (
                    <span key={pos} aria-hidden="true" className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-white/20`} />
                  ))}
                  <span className="relative shrink-0 w-full aspect-[16/9] rounded-xl overflow-hidden ring-1 ring-white/10 bg-black">
                    {p.image && (
                      <Image src={p.image} alt={p.name} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover opacity-90 transition-[opacity,scale] duration-500 group-hover:opacity-100 group-hover:scale-105" />
                    )}
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] text-white/50">
                      <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]" />
                      MODULE EL-{String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-2 text-base sm:text-lg font-bold leading-snug">{p.name}</span>
                    {p.description && <span className="mt-1.5 text-[13px] sm:text-sm leading-relaxed text-white/55 line-clamp-3">{p.description}</span>}
                    <span className="mt-auto pt-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-light)] text-slate-950 px-4 py-2 text-xs font-bold transition-transform duration-300 group-hover:scale-105">
                        Enquire <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
