import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  /** tighter heading + spacing, for sections that must fit in one screen */
  compact?: boolean;
}

/** Eyebrow pill + split-animated heading + intro, matching the hero's visual language. */
export default function SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'light',
  compact = false,
}: SectionHeaderProps) {
  const center = align === 'center';
  const dark = tone === 'dark';
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl`}>
      <span
        data-anim="up"
        className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs ${
          dark ? 'border-white/15 bg-white/5 text-sky-200' : 'border-slate-200 bg-white text-[var(--accent,#0d7cae)] shadow-xs'
        }`}
      >
        <span className="mx-ping-dot w-1.5 h-1.5 rounded-full bg-[var(--accent,#0d7cae)]" />
        {eyebrow}
      </span>
      <h2
        className={`${
          compact ? 'mt-4 text-[28px] sm:text-[32px] xl:text-[36px]' : 'mt-5 text-[28px] sm:text-4xl lg:text-[42px]'
        } font-black uppercase tracking-[-0.025em] leading-[1.08] text-balance ${
          dark ? 'text-white' : 'text-slate-950'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          data-anim="up"
          className={`${compact ? 'mt-4' : 'mt-6'} text-[15px] sm:text-[17px] leading-[1.75] ${dark ? 'text-white/75' : 'text-slate-600'} ${
            center ? 'mx-auto' : ''
          } max-w-2xl`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
