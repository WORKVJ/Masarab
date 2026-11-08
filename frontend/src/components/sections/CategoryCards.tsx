import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/masarContent';
import { categoryHref } from '@/lib/routes';
import { DIVISION_THEMES } from '@/lib/divisionThemes';
import SectionHeader from './SectionHeader';

interface CategoryCardsProps {
  /** hide this category (used on a category page for "other disciplines") */
  excludeId?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: string;
  /** show the "View all products" button */
  showAllLink?: boolean;
  id?: string;
  /** section name shown in the scroll dial */
  label?: string;
}

/** Grid of the product categories, each linking to its own page. */
export default function CategoryCards({
  excludeId,
  eyebrow = 'Our Products',
  title = (
    <>
      Eight Disciplines. <span className="text-[#0d7cae]">One Trusted Supplier.</span>
    </>
  ),
  intro = 'From cooling and water treatment to chemicals, instrumentation and workforce safety — sourced from renowned manufacturers and delivered across the Kingdom.',
  showAllLink = true,
  id = 'categories',
  label = 'Products',
}: CategoryCardsProps) {
  const list = CATEGORIES.filter((c) => c.id !== excludeId);

  return (
    <section id={id} data-label={label} className="relative py-20 sm:py-28 bg-[#f6f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />
          {showAllLink && (
            <Link
              href="/products"
              data-anim="up"
              className="group self-start lg:self-end inline-flex items-center gap-2 rounded-full bg-[#0d7cae] hover:bg-[#0b6a95] text-white px-6 py-3 text-sm font-bold shadow-[0_10px_30px_-10px_rgba(13,124,174,0.8)] transition-colors"
            >
              View all products
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          )}
        </div>

        {/* Each card wears its division's identity (colour, pattern, icon) — the same look as the
            division page it opens, so clicking in feels like stepping into that solution. */}
        <ul className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {list.map((c) => {
            const t = DIVISION_THEMES[c.id];
            const Icon = t?.icon;
            const deep = t?.deep ?? '4,18,31';
            return (
              <li key={c.id} data-anim="flip" className="[perspective:900px]">
                <Link
                  href={categoryHref(c.slug)}
                  style={{ boxShadow: `0 26px 50px -30px ${t?.accent ?? 'rgba(13,124,174,0.6)'}` }}
                  className="group relative block h-60 sm:h-80 rounded-[22px] sm:rounded-[26px] overflow-hidden"
                >
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* division colour wash */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, rgba(${deep},0.97) 0%, rgba(${deep},0.78) 38%, rgba(${deep},0.25) 72%, rgba(${deep},0.45) 100%)`,
                    }}
                  />
                  {t && (
                    <>
                      {/* division pattern, fading down the card */}
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 pointer-events-none ${t.hazard ? 'opacity-[0.09]' : 'opacity-[0.2]'}`}
                        style={{
                          backgroundImage: t.pattern,
                          backgroundSize: t.patternSize,
                          maskImage: 'linear-gradient(to bottom, black, transparent 65%)',
                          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 65%)',
                        }}
                      />
                      {/* oversized watermark icon */}
                      {Icon && (
                        <Icon
                          aria-hidden="true"
                          strokeWidth={0.8}
                          className="absolute -right-8 -bottom-6 w-36 h-36 sm:w-48 sm:h-48 pointer-events-none opacity-[0.14] transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110"
                          style={{ color: t.light }}
                        />
                      )}
                    </>
                  )}

                  {/* division icon badge */}
                  {Icon && (
                    <span
                      className="absolute top-3 left-3 sm:top-4 sm:left-4 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-110"
                      style={{ background: t.accent }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.9} />
                    </span>
                  )}
                  <span className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                    <span
                      className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em]"
                      style={{ color: t?.light ?? '#7dd3fc' }}
                    >
                      {String(CATEGORIES.indexOf(c) + 1).padStart(2, '0')} · {c.products.length} Products
                    </span>
                    <h3 className="mt-1 text-base sm:text-xl font-black uppercase tracking-tight leading-tight">{c.name}</h3>
                    {t && (
                      <p className="mt-2 hidden sm:block text-xs leading-relaxed text-white/70">
                        {t.highlights[0].title} · {t.highlights[1].title}
                      </p>
                    )}
                    <span className="mt-3 hidden sm:block h-[3px] w-10 rounded-full" style={{ background: t?.light ?? '#fb923c' }} />
                  </div>

                  {/* safety gets hazard tape along the bottom edge */}
                  {t?.hazard && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 inset-x-0 h-2"
                      style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #facc15 0 10px, #111827 10px 20px)' }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
