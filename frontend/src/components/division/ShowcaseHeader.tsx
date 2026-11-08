import React from 'react';

/** Section header for the division pages — reads the division colour from the CSS variables. */
export default function ShowcaseHeader({
  eyebrow,
  title,
  intro,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl`}>
      <span
        data-anim="up"
        className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${
          dark
            ? 'border-white/15 bg-white/5 text-[var(--accent-light)]'
            : 'border-slate-200 bg-white text-[var(--accent)] shadow-xs'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        {eyebrow}
      </span>
      <h2
        className={`mt-5 text-[30px] sm:text-4xl lg:text-[46px] font-black uppercase tracking-[-0.025em] leading-[1.05] text-balance ${
          dark ? 'text-white' : 'text-slate-950'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          data-anim="up"
          className={`mt-5 text-[15px] sm:text-[17px] leading-[1.75] max-w-2xl ${center ? 'mx-auto' : ''} ${
            dark ? 'text-white/70' : 'text-slate-600'
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
