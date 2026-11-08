import Link from 'next/link';
import { ArrowUpRight, Mail, PhoneCall } from 'lucide-react';
import type { Category } from '@/lib/masarContent';
import { CONTACT } from '@/lib/masarContent';
import { quoteHref } from '@/lib/routes';
import { type DivisionTheme, themeColors, themeVars } from '@/lib/divisionThemes';

/** Closing call to action in the division's colours (replaces the generic CTA band on division pages). */
export default function DivisionCta({ category, theme }: { category: Category; theme: DivisionTheme }) {
  const Icon = theme.icon;
  return (
    <section id="enquire" data-label="Enquire" style={themeVars(themeColors(theme))} className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-anim="up"
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] px-6 py-12 sm:px-14 sm:py-16 text-white"
          style={{
            background: `linear-gradient(120deg, rgb(${theme.deep}) 0%, rgba(${theme.deep},0.94) 55%, ${theme.accent} 150%)`,
          }}
        >
          <div
            aria-hidden="true"
            className={`absolute inset-0 pointer-events-none ${theme.hazard ? 'opacity-[0.06]' : 'opacity-[0.13]'}`}
            style={{
              backgroundImage: theme.pattern,
              backgroundSize: theme.patternSize,
              maskImage: 'linear-gradient(to left, black 20%, transparent 70%)',
              WebkitMaskImage: 'linear-gradient(to left, black 20%, transparent 70%)',
            }}
          />
          <Icon
            aria-hidden="true"
            strokeWidth={0.7}
            className="hidden md:block absolute -right-10 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none opacity-[0.14]"
            style={{ color: theme.light }}
          />
          {theme.hazard && (
            <span
              aria-hidden="true"
              className="absolute bottom-0 inset-x-0 h-2.5"
              style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #facc15 0 14px, #111827 14px 28px)' }}
            />
          )}

          <div className="relative max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: theme.light }}>
              {category.name} · Request for Quotation
            </p>
            <h2 className="mt-4 text-[28px] sm:text-4xl lg:text-[44px] font-black uppercase tracking-[-0.025em] leading-[1.06]">
              Need {category.name}? <span style={{ color: theme.light }}>Let&apos;s Talk.</span>
            </h2>
            <p className="mt-5 text-[15px] sm:text-[17px] leading-[1.75] text-white/75">
              Share your requirement — product, size, quantity and site — and our team will come back with a quotation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={quoteHref(category.name)}
                data-magnetic
                className="group inline-flex items-center gap-2 rounded-full bg-white text-slate-950 px-6 py-3 text-sm font-bold hover:bg-white/90 transition-colors"
              >
                Request a Quote
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" style={{ color: theme.accent }} />
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold hover:bg-white/10 transition-colors"
              >
                <PhoneCall className="w-4 h-4" /> {CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Enquiry — ${category.name}`)}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold hover:bg-white/10 transition-colors"
              >
                <Mail className="w-4 h-4" /> Email us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
