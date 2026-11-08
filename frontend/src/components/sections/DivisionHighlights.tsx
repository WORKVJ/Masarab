import { type DivisionTheme, themeVars } from '@/lib/divisionThemes';

/**
 * Four key strengths of one division, in the division's colour.
 * Sits as a white panel overlapping the bottom of the division hero.
 */
export default function DivisionHighlights({ theme, name }: { theme: DivisionTheme; name: string }) {
  return (
    <section
      id="highlights"
      data-label="Highlights"
      aria-label={`Why choose Masar Arabia for ${name}`}
      style={themeVars(theme)}
      className="relative z-10 -mt-14 sm:-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul
          data-anim="up"
          className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-[24px] border border-slate-200/80 bg-slate-200/70 shadow-[0_30px_60px_-35px_rgba(15,23,42,0.45)]"
        >
          {theme.highlights.map(({ icon: Icon, title, text }) => (
            <li key={title} className="bg-white p-5 sm:p-7">
              <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-[var(--accent-soft)] text-[var(--accent)]">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 text-[14px] sm:text-base font-bold leading-snug text-slate-900">{title}</h3>
              <p className="mt-1.5 text-[13px] sm:text-sm leading-relaxed text-slate-500">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
