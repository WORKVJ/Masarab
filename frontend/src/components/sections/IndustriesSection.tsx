'use client';

import React, { useRef, useState } from 'react';
import {
  Factory, Zap, Droplets, Flame, Building, Sprout, Candy, FlaskConical, Anvil, Pickaxe, Pill, Wheat,
} from 'lucide-react';
import { INDUSTRIES } from '@/lib/masarContent';
import { useCycle, useInView } from '@/lib/useCycle';
import SectionHeader from './SectionHeader';

const ICONS = [Factory, Zap, Droplets, Flame, Building, Sprout, Candy, FlaskConical, Anvil, Pickaxe, Pill, Wheat];

export default function IndustriesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useCycle(INDUSTRIES.length, 1500, inView && !hovering);

  return (
    <section ref={ref} id="industries" className="relative py-20 sm:py-28 bg-white overflow-hidden">
      {/* Slow drifting ambient glow (transform-only animation) */}
      <div className="mx-orb-drift absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-sky-100/70 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Industries We Serve"
          title={
            <>
              Supplying the Plants that <span className="text-[#0d7cae]">Power the Kingdom</span>
            </>
          }
          intro="We specialize in the procurement and supply of Mechanical, Electrical, and Instrumentation materials and equipment for plants across every major sector."
        />

        <div
          className="mt-10 sm:mt-14 grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4"
          onMouseLeave={() => setHovering(false)}
        >
          {INDUSTRIES.map((name, i) => {
            const Icon = ICONS[i % ICONS.length];
            const on = i === active;
            return (
              <div
                key={name}
                data-anim="up"
                onMouseEnter={() => {
                  setHovering(true);
                  setActive(i);
                }}
                className={`relative overflow-hidden rounded-2xl sm:rounded-[22px] border p-3 sm:p-5 flex flex-col items-start gap-3 sm:gap-6 bg-gradient-to-b from-white to-[#f6f9fc] transition-[border-color,box-shadow,translate] duration-500 ${
                  on
                    ? 'border-[#0d7cae] -translate-y-1.5 shadow-[0_22px_40px_-20px_rgba(13,124,174,0.7)]'
                    : 'border-slate-200/80'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-br from-[#0d7cae] to-[#0369a1] transition-opacity duration-500 ${
                    on ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div
                  className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    on ? 'bg-white/15 text-white scale-110 -rotate-6' : 'bg-[#e0f2fe] text-[#0d7cae]'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className={`relative text-[12px] sm:text-sm font-bold leading-tight transition-colors duration-500 ${on ? 'text-white' : 'text-slate-900'}`}>
                  {name}
                </span>
                <span
                  className={`absolute top-2.5 right-3 sm:top-4 sm:right-4 font-mono text-[10px] transition-colors duration-500 ${
                    on ? 'text-sky-200' : 'text-slate-300'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
