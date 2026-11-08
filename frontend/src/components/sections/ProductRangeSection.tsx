import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, PhoneCall } from 'lucide-react';
import { CONTACT, PRODUCT_RANGE } from '@/lib/masarContent';
import { quoteHref } from '@/lib/routes';

/**
 * Product Range — the 16 lines from the client's showroom display board, laid out like the board:
 * a centred title and one catalogue board of 16 cells (round photo + name) split by hairlines.
 * Each cell opens the contact form pre-filled for that product.
 * Server-rendered and static: hover effects are plain CSS transitions and nothing loops,
 * so the section costs nothing while scrolling.
 */
export default function ProductRangeSection() {
  return (
    <section
      id="product-range"
      data-label="Product Range"
      className="relative py-20 sm:py-28 bg-gradient-to-b from-[#f6f9fc] via-white to-[#f6f9fc] overflow-hidden"
    >
      {/* faint blueprint dot grid (static) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-60 [background-image:radial-gradient(rgba(13,124,174,0.14)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span
            data-anim="up"
            className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0d7cae] shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            {PRODUCT_RANGE.length} Product Lines · In Stock Across the Kingdom
          </span>
          <h2 className="mt-5 text-[32px] sm:text-[44px] lg:text-[52px] font-black uppercase tracking-[-0.025em] leading-none text-slate-950">
            Product <span className="text-[#0d7cae]">Range</span>
          </h2>
          <div aria-hidden="true" className="mt-5 flex items-center justify-center gap-1.5">
            <span className="h-[3px] w-10 rounded-full bg-[#0d7cae]" />
            <span className="h-[3px] w-3 rounded-full bg-orange-400" />
          </div>
          <p data-anim="up" className="mt-4 text-[15px] sm:text-[17px] text-slate-500">
            Wide Range of World Class Products
          </p>
        </div>

        {/* Catalogue board — one panel, hairline dividers (gap-px over a tinted base), like the showroom board */}
        <div
          data-anim="up"
          className="mt-12 sm:mt-16 rounded-[28px] overflow-hidden bg-white border border-slate-200/80 shadow-[0_40px_80px_-50px_rgba(13,124,174,0.45)]"
        >
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200/70">
            {PRODUCT_RANGE.map((p, i) => (
              <li key={p.id} className="bg-white">
                <Link
                  href={quoteHref(p.name)}
                  title={`${p.blurb} — request a quote`}
                  className="group h-full flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-3 py-6 sm:px-6 sm:py-7 text-center sm:text-left hover:bg-[#f4f9fd] transition-colors duration-300"
                >
                  {/* round photo */}
                  <span className="relative shrink-0 w-[84px] h-[84px] sm:w-[72px] sm:h-[72px] rounded-full overflow-hidden bg-[#eef6fb] ring-4 ring-[#eef6fb] shadow-[0_12px_24px_-14px_rgba(13,124,174,0.7)] group-hover:ring-sky-100 transition-[box-shadow] duration-300">
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="96px"
                        className="object-cover transition-[scale] duration-500 ease-out group-hover:scale-110"
                      />
                    )}
                  </span>

                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                    <span className="mt-0.5 block text-[14px] sm:text-[15.5px] font-bold leading-snug text-slate-900 group-hover:text-[#0d7cae] transition-colors duration-300">
                      {p.name}
                    </span>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#0d7cae] sm:opacity-0 sm:-translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,translate] duration-300">
                      Get a quote <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Closing call to action */}
        <div
          data-anim="up"
          className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[22px] bg-[#04121f] px-6 py-5 sm:px-8 sm:py-6 text-center sm:text-left"
        >
          <div>
            <p className="text-base sm:text-lg font-bold text-white">Can&apos;t find the exact size or material?</p>
            <p className="mt-1 text-sm text-white/60">Tell us your specification — we source it and quote fast.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
            >
              <PhoneCall className="w-4 h-4" /> Call Us
            </a>
            <Link
              href={quoteHref()}
              data-magnetic
              className="group inline-flex items-center gap-2 rounded-full bg-[#0d7cae] hover:bg-[#0b6a95] px-5 py-2.5 text-sm font-bold text-white transition-colors"
            >
              Request a Quote
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
