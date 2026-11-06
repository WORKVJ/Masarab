'use client';

import React from 'react';
import RollText from '@/components/motion/RollText';
import {
  Boxes, BadgeCheck, Settings2, Gauge, Headset, Tag, Handshake, Smile, Truck, Leaf, ArrowUpRight,
} from 'lucide-react';
import { WHY_CHOOSE } from '@/lib/masarContent';
import SectionHeader from './SectionHeader';
import { useRequestQuote } from '@/lib/useRequestQuote';

const ICONS = [Boxes, BadgeCheck, Settings2, Gauge, Headset, Tag, Handshake, Smile, Truck, Leaf];

/** Pointer-following glow: writes the pointer position into CSS vars on the hovered card only. */
function onCardPointerMove(e: React.PointerEvent<HTMLDivElement>) {
  const card = (e.target as HTMLElement).closest<HTMLElement>('.mx-glow-card');
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--gx', `${e.clientX - r.left}px`);
  card.style.setProperty('--gy', `${e.clientY - r.top}px`);
}

export default function WhyMasar() {
  const onOpenRfq = useRequestQuote();
  return (
    <section id="why-us" className="relative py-20 sm:py-28 bg-[#04121f] text-white overflow-hidden">
      <div className="mx-orb-drift absolute -top-40 right-0 w-[520px] h-[520px] rounded-full bg-[#0d7cae]/25 blur-[110px] pointer-events-none" />
      <div className="mx-orb-drift-rev absolute -bottom-48 -left-32 w-[460px] h-[460px] rounded-full bg-orange-500/10 blur-[110px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              tone="dark"
              eyebrow="Why Masar Arabia"
              title={
                <>
                  Why Choose <span className="text-sky-400">Masar Arabia</span>
                </>
              }
              intro={WHY_CHOOSE.intro}
            />
            <p data-anim="up" className="mt-4 text-sm text-white/60 leading-relaxed max-w-md">
              {WHY_CHOOSE.closing}
            </p>
            <button
              data-anim="up"
              onClick={() => onOpenRfq()}
              data-magnetic
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#0d7cae] hover:bg-[#0b6a95] px-6 py-3 text-sm font-bold shadow-[0_10px_30px_-8px_rgba(13,124,174,0.7)] transition-colors cursor-pointer"
            >
              <RollText>Work With Us</RollText>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4" onPointerMove={onCardPointerMove}>
          {WHY_CHOOSE.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={item.title}
                data-anim={i % 2 === 0 ? 'left' : 'right'}
                className="mx-glow-card group relative overflow-hidden rounded-2xl sm:rounded-[22px] border border-white/10 bg-white/[0.04] p-4 sm:p-6 hover:border-sky-400/40 hover:-translate-y-1 transition-[border-color,translate] duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0d7cae]/20 text-sky-300 flex items-center justify-center group-hover:bg-[#0d7cae] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-white/25">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-3 sm:mt-5 text-[13px] sm:text-base font-bold leading-snug">{item.title}</h3>
                <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-white/55 leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
