import type { Category } from '@/lib/masarContent';
import { type DivisionTheme, themeColors, themeVars } from '@/lib/divisionThemes';

/** "About the division" — the client's introduction, laid out as an editorial statement in the division colour. */
export default function DivisionStatement({ category, theme }: { category: Category; theme: DivisionTheme }) {
  const Icon = theme.icon;
  const [lead, ...rest] = category.intro;
  return (
    <section id="overview" data-label="Overview" style={themeVars(themeColors(theme))} className="relative py-20 sm:py-28 bg-white overflow-hidden">
      {/* faint division pattern in the corner */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-1/2 pointer-events-none opacity-[0.07] invert"
        style={{
          backgroundImage: theme.pattern,
          backgroundSize: theme.patternSize,
          maskImage: 'radial-gradient(ellipse 70% 70% at 100% 30%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 100% 30%, black, transparent)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <span
            data-anim="up"
            className="w-16 h-16 rounded-[20px] flex items-center justify-center bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-[var(--accent-light)]/40"
          >
            <Icon className="w-8 h-8" strokeWidth={1.6} />
          </span>
          <p data-anim="up" className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]">
            About the division
          </p>
          <h2 className="mt-3 text-[30px] sm:text-4xl lg:text-[44px] font-black uppercase tracking-[-0.025em] leading-[1.06] text-balance text-slate-950">
            {category.headline}
          </h2>
        </div>

        <div className="lg:col-span-7 lg:pt-4">
          {lead && (
            <p data-anim="up" className="border-l-4 border-[var(--accent)] pl-5 sm:pl-6 text-[17px] sm:text-[19px] leading-[1.75] text-slate-800">
              {lead}
            </p>
          )}
          {rest.map((para) => (
            <p key={para.slice(0, 40)} data-anim="up" className="mt-5 pl-6 sm:pl-7 text-base leading-[1.8] text-slate-600">
              {para}
            </p>
          ))}

          <dl data-anim="up" className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { k: String(category.products.length), v: 'Product lines' },
              { k: 'KSA', v: 'Delivered Kingdom-wide' },
              { k: 'RFQ', v: 'Quotes on request' },
            ].map(({ k, v }) => (
              <div key={v} className="rounded-2xl bg-[var(--accent-soft)] px-4 py-4 sm:px-5">
                <dt className="sr-only">{v}</dt>
                <dd className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--accent)]">{k}</dd>
                <dd className="mt-1 text-[11px] sm:text-xs font-medium text-slate-600">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
