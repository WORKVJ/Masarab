'use client';

import { createContext, useContext } from 'react';
import { Loader2 } from 'lucide-react';

/** Small building blocks shared by every admin panel page. */

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

const TONE: Record<string, string> = {
  // quotes
  pending: 'bg-amber-50 text-amber-800 ring-amber-300',
  pricing: 'bg-orange-50 text-orange-800 ring-orange-200',
  sent: 'bg-violet-50 text-violet-800 ring-violet-200',
  closed: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  lost: 'bg-slate-100 text-slate-600 ring-slate-200',
  // messages
  new: 'bg-amber-50 text-amber-800 ring-amber-300',
  in_progress: 'bg-orange-50 text-orange-800 ring-orange-200',
  replied: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  // blog
  draft: 'bg-slate-100 text-slate-600 ring-slate-200',
  scheduled: 'bg-orange-50 text-orange-800 ring-orange-200',
  published: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
};

export function StatusBadge({ status, label }: { status: string; label: string }) {
  return (
    <span className={cx('inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ring-1 ring-inset whitespace-nowrap', TONE[status] ?? TONE.lost)}>
      {label}
    </span>
  );
}

/** The section name shown in the panel's top bar (set by AdminApp). */
export const SectionTitleContext = createContext('');

/** Page heading. When it repeats the top bar's section name it stays for screen readers only. */
export function PageHeader({ title, intro, actions }: { title: string; intro?: string; actions?: React.ReactNode }) {
  const section = useContext(SectionTitleContext);
  const repeat = title === section;
  if (repeat && !intro && !actions) return <h1 className="sr-only">{title}</h1>;
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className={repeat ? 'sr-only' : 'text-2xl font-bold tracking-tight text-slate-900'}>{title}</h1>
        {intro && <p className={cx('text-slate-500', repeat ? 'text-[15px]' : 'mt-1 text-sm')}>{intro}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cx('rounded-[22px] border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]', className)}>{children}</div>;
}

export function Spinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500" role="status">
      <Loader2 className="h-4 w-4 animate-spin" /> {label}
    </div>
  );
}

export function ErrorNote({ children }: { children: React.ReactNode }) {
  return <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-inset ring-rose-200">{children}</p>;
}

export function SuccessNote({ children }: { children: React.ReactNode }) {
  return <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ring-1 ring-inset ring-emerald-200">{children}</p>;
}

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 h-10 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500';

export const btn = {
  primary: cx(btnBase, 'bg-slate-900 text-white hover:bg-slate-800'),
  secondary: cx(btnBase, 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'),
  danger: cx(btnBase, 'border border-rose-200 bg-white text-rose-700 hover:bg-rose-50'),
  ghost: cx(btnBase, 'text-slate-600 hover:bg-slate-100'),
};

export const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/25';

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const timeFmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' });

export function formatDate(iso: string | null | undefined, withTime = false) {
  if (!iso) return '—';
  const d = new Date(iso);
  return withTime ? `${dateFmt.format(d)}, ${timeFmt.format(d)}` : dateFmt.format(d);
}

/** "5 min ago", "3 h ago", "Yesterday", else the date. */
export function timeAgo(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return 'Just now';
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  if (s < 172800) return 'Yesterday';
  return formatDate(iso);
}
