import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/lib/masarContent';
import { quoteHref } from '@/lib/routes';
import { DIVISION_THEMES, themeColors, themeVars } from '@/lib/divisionThemes';
import ShowcaseHeader from '../ShowcaseHeader';

/** Water — a purification flow: products as numbered stages along a flowing centre spine. */
export default function WaterShowcase({ category }: { category: Category }) {
  const t = DIVISION_THEMES.water;
  return (
    <section
      id="products"
      data-label="Products"
      style={themeVars(themeColors(t))}
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-[var(--accent-soft)] via-white to-[var(--accent-soft)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-64 opacity-[0.1] invert pointer-events-none"
        style={{ backgroundImage: t.pattern, backgroundSize: t.patternSize, maskImage: 'linear-gradient(black, transparent)', WebkitMaskImage: 'linear-gradient(black, transparent)' }}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader
          center
          eyebrow={`${category.products.length} Water Treatment Solutions`}
          title={
            <>
              From Feed Water to <span className="text-[var(--accent)]">Ultra Pure</span>
            </>
          }
          intro="Every stage of purification — deionization, dialysis, degassing and high-purity systems — with Pure Water Group."
        />

        <div className="relative mt-14 sm:mt-16">
          {/* the flow spine */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-4 lg:left-1/2 w-[3px] -translate-x-1/2 rounded-full"
            style={{ background: `linear-gradient(${t.light}, ${t.accent} 50%, ${t.light})` }}
          />
          <ol className="relative grid lg:grid-cols-2 gap-x-16 gap-y-5 lg:gap-y-8">
            {category.products.map((p, i) => {
              const right = i % 2 === 1;
              return (
                <li key={p.name} data-anim="up" className={`relative pl-11 lg:pl-0 ${right ? 'lg:mt-28' : ''}`}>
                  {/* stage node on the spine */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-9 left-4 -translate-x-1/2 ${
                      right ? 'lg:left-[-2rem]' : 'lg:left-auto lg:right-[-2rem] lg:translate-x-1/2'
                    } w-5 h-5 rounded-full bg-white border-[5px] border-[var(--accent)] shadow-[0_0_0_6px_var(--accent-soft)]`}
                  />
                  <Link
                    href={quoteHref(p.name)}
                    className="group flex flex-col sm:flex-row overflow-hidden rounded-[22px] bg-white border border-slate-200/80 shadow-[0_18px_40px_-30px_rgba(23,37,84,0.5)] hover:border-[var(--accent-light)] hover:shadow-[0_24px_50px_-28px_rgba(37,99,235,0.45)] transition-[border-color,box-shadow] duration-300"
                  >
                    <span className="relative shrink-0 w-full sm:w-56 aspect-[16/10] sm:aspect-auto sm:min-h-[210px] bg-[var(--accent-soft)]">
                      {p.image && (
                        <Image src={p.image} alt={p.name} fill sizes="(min-width: 640px) 224px, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      )}
                    </span>
                    <span className="p-4 sm:p-5">
                      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                        Stage {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="mt-1 block text-[15px] sm:text-[17px] font-bold leading-snug text-slate-900">{p.name}</span>
                      {p.description && (
                        <span className="mt-1.5 text-[13px] sm:text-sm leading-relaxed text-slate-500 line-clamp-3">{p.description}</span>
                      )}
                      <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-[var(--accent)]">
                        Enquire <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
