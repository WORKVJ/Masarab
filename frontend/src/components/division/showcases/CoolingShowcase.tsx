import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '@/lib/masarContent';
import { productHref, productLink } from '@/lib/productRoutes';
import { DIVISION_THEMES, themeColors, themeVars } from '@/lib/divisionThemes';
import ShowcaseHeader from '../ShowcaseHeader';

/** Cooling — dark, icy product cards: photo, name and the full description of every product. */
export default function CoolingShowcase({ category }: { category: Category }) {
  const t = DIVISION_THEMES.cooling;
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
          eyebrow={`${category.products.length} Products`}
          title={
            <>
              Our <span className="text-[var(--accent)]">Products</span>
            </>
          }
          intro={category.summary}
        />

        {/* every product as on the client's site: photo, name, full description, link */}
        <ul className="mt-12 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {category.products.map((p, i) => {
            const detail = productHref(category, p.name);
            return (
              <li key={p.name} data-anim="up">
                <Link
                  href={productLink(category, p.name)}
                  aria-label={detail ? `${p.name} — view details` : `${p.name} — request a quote`}
                  className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white/[0.06] ring-1 ring-white/10 hover:ring-[var(--accent-light)]/60 transition-[box-shadow]"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden">
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 border border-white/25 backdrop-blur-sm flex items-center justify-center transition-[background-color,rotate] duration-300 group-hover:bg-[var(--accent)] group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--accent-light)]">C-{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-1 text-lg font-black uppercase tracking-tight leading-tight">{p.name}</h3>
                    {p.description && <p className="mt-2 text-sm leading-relaxed text-white/70">{p.description}</p>}
                    <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent-light)]">
                      {detail ? 'Know More' : 'Request a Quote'} <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
