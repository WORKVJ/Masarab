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
          dark ? 'border-white/15 bg-white/5 text-sky-200' : 'border-slate-200 bg-white text-[#0d7cae] shadow-xs'
        }`}
      >
        <span className="mx-ping-dot w-1.5 h-1.5 rounded-full bg-[#0d7cae]" />
        {eyebrow}
      </span>
      <h2
        className={`${
          compact ? 'mt-4 text-3xl sm:text-[34px] xl:text-[38px]' : 'mt-5 text-3xl sm:text-4xl lg:text-[46px]'
        } font-black uppercase tracking-[-0.03em] leading-[1.04] ${
          dark ? 'text-white' : 'text-slate-950'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          data-anim="up"
          className={`${compact ? 'mt-4' : 'mt-5'} text-sm sm:text-[15px] leading-relaxed ${dark ? 'text-white/70' : 'text-slate-600'} ${
            center ? 'mx-auto' : ''
          } max-w-2xl`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
