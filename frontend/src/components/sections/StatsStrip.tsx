'use client';

import React, { useRef, useState } from 'react';
import { Users, PackageCheck, Award } from 'lucide-react';
import { ABOUT } from '@/lib/masarContent';
import { useCycle, useInView } from '@/lib/useCycle';
import CountUp from '@/components/motion/CountUp';

const ICONS = [Users, PackageCheck, Award];
const CYCLE_MS = 2400;

/**
 * Stats strip with an "active card" that glides between the three stats.
 * One highlight layer slides by transform (no per-cell repaints); hover takes over and pauses.
 */
export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useCycle(ABOUT.stats.length, CYCLE_MS, inView && !hovering);
  const n = ABOUT.stats.length;

  return (
    <div
      ref={ref}
      data-anim="up"
      onMouseLeave={() => setHovering(false)}
      className="relative mt-6 grid grid-cols-3 rounded-2xl border border-slate-200/80 bg-[#f8fafc] overflow-hidden"
    >
      {/* gliding highlight */}
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 rounded-xl bg-gradient-to-br from-[#0d7cae] to-[#0369a1] shadow-[0_12px_28px_-12px_rgba(13,124,174,0.8)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ width: `calc(${100 / n}% - 0.5rem)`, transform: `translateX(calc(${active * 100}% + ${active * 0.5}rem))` }}
      >
        {/* progress line for the current turn */}
        {!hovering && (
          <span
            key={active}
            className="mx-sweep-bar absolute left-3 right-3 bottom-1.5 h-[2px] rounded-full bg-white/60 origin-left"
            style={{ animationDuration: `${CYCLE_MS}ms`, animationPlayState: inView ? 'running' : 'paused' }}
          />
        )}
      </span>

      {ABOUT.stats.map((st, i) => {
        const Icon = ICONS[i];
        const on = i === active;
        return (
          <div
            key={st.label}
            onMouseEnter={() => {
              setHovering(true);
              setActive(i);
            }}
            className={`relative px-3 sm:px-5 py-3.5 cursor-default ${i > 0 ? 'border-l border-slate-200/80' : ''}`}
          >
            <div className="flex items-start justify-between gap-2">
              <span
                className={`block text-2xl sm:text-[28px] font-black tracking-tight leading-none transition-colors duration-500 ${
                  on ? 'text-white' : 'text-slate-950'
                }`}
              >
                <CountUp value={st.value} suffix={st.suffix} />
              </span>
              <Icon
                className={`hidden sm:block w-4 h-4 shrink-0 transition-[opacity,transform,color] duration-500 ${
                  on ? 'opacity-100 scale-100 text-sky-100' : 'opacity-0 scale-50 text-slate-400'
                }`}
              />
            </div>
            <span
              className={`block mt-1.5 text-[11px] sm:text-xs transition-colors duration-500 ${
                on ? 'text-sky-100' : 'text-slate-500'
              }`}
            >
              {st.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
