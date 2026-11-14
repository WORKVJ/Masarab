'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card } from './ui';

/** Back link + heading + two columns (details | actions) for one enquiry. */
export function DetailShell({
  back,
  backLabel,
  eyebrow,
  title,
  meta,
  main,
  side,
}: {
  back: string;
  backLabel: string;
  eyebrow: React.ReactNode;
  title: string;
  meta: React.ReactNode;
  main: React.ReactNode;
  side: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <Link href={back} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" /> {backLabel}
      </Link>
      <div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">{eyebrow}</div>
        <h1 className="mt-1 break-words text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{meta}</p>
      </div>
      <div className="grid items-start gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">{main}</div>
        <div>{side}</div>
      </div>
    </div>
  );
}

/** A labelled list of facts; empty values show as a dash, links stay clickable. */
export function Facts({ title, rows }: { title: string; rows: { label: string; value: string; href?: string }[] }) {
  return (
    <Card className="p-5 sm:p-6">
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.label} className="min-w-0">
            <dt className="text-xs text-slate-500">{r.label}</dt>
            <dd className="mt-0.5 break-words text-sm text-slate-900">
              {r.value ? (
                r.href ? (
                  <a href={r.href} className="text-[#0d7cae] hover:underline" target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {r.value}
                  </a>
                ) : (
                  r.value
                )
              ) : (
                <span className="text-slate-400">—</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

export function TextBlock({ title, text }: { title: string; text: string }) {
  return (
    <Card className="p-5 sm:p-6">
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700">{text || '—'}</p>
    </Card>
  );
}
