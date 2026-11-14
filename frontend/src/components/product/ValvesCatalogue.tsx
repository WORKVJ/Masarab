'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Valve } from '@/lib/catalog';

export type ValveCard = Pick<Valve, 'slug' | 'name' | 'groups' | 'summary' | 'image'> & { href: string };

/** The client's valve catalogue: filter by application, each card opens the valve's own page. */
export default function ValvesCatalogue({ valves, groups }: { valves: ValveCard[]; groups: readonly string[] }) {
  const [group, setGroup] = useState<string>('All');
  const list = group === 'All' ? valves : valves.filter((v) => v.groups.includes(group));
  const chips = ['All', ...groups];

  return (
    <section id="valves" data-label="Valves" className="relative py-16 sm:py-24 bg-[var(--accent-soft)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[28px] sm:text-4xl font-black uppercase tracking-[-0.025em] leading-[1.05] text-slate-950">
            Valve <span className="text-[var(--accent)]">Catalogue</span>
          </h2>
          <p className="text-sm font-semibold text-slate-500" aria-live="polite">
            {list.length} {list.length === 1 ? 'valve' : 'valves'}
          </p>
        </div>

        <div role="group" aria-label="Filter valves by application" className="mt-7 flex flex-wrap gap-2">
          {chips.map((c) => {
            const on = c === group;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setGroup(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors cursor-pointer ${
                  on
                    ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-[var(--accent)] hover:text-[var(--accent)]'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <ul className="mt-8 grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {list.map((v) => (
            <li key={v.slug}>
              <Link
                href={v.href}
                className="group flex h-full flex-col rounded-[22px] bg-white border border-slate-200/80 p-3 hover:border-[var(--accent)] hover:shadow-[0_24px_48px_-30px_rgba(15,23,42,0.45)] transition-[border-color,box-shadow] duration-300"
              >
                <div className="relative aspect-[37/28] rounded-2xl overflow-hidden bg-[#d6d6d6]">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    sizes="(min-width: 1280px) 280px, (min-width: 1024px) 30vw, (min-width: 480px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-1 pt-3 flex flex-1 flex-col">
                  {v.groups.length > 0 && (
                    <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[var(--accent)]">{v.groups.join(' · ')}</span>
                  )}
                  <span className="mt-1 text-[15px] font-bold leading-snug text-slate-900">{v.name}</span>
                  <span className="mt-2 text-[13px] leading-relaxed text-slate-500 line-clamp-3">{v.summary}</span>
                  <span className="mt-auto pt-3 inline-flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-[var(--accent)] transition-colors">
                    View details <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
