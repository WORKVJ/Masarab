'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, PhoneCall } from 'lucide-react';
import { CTA, CONTACT } from '@/lib/masarContent';
import { useCycle, useInView } from '@/lib/useCycle';
import RollText from '@/components/motion/RollText';
import { useRequestQuote } from '@/lib/useRequestQuote';

export default function CtaBand() {
  const onOpenRfq = useRequestQuote();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [active] = useCycle(CTA.achievements.length, 1800, inView);

  return (
    <section ref={ref} className="relative py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-anim="up" className="relative overflow-hidden rounded-[36px] bg-[#0d7cae] text-white isolate">
          {/* Parallax photo (oversized so it can drift inside the frame) */}
          <div data-parallax-img className="absolute -inset-y-[12%] inset-x-0">
            <Image
              src="/images/masar/banner-2.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-25 mix-blend-luminosity"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0369a1] via-[#0d7cae]/90 to-[#0d7cae]/40" />
          {/* Breathing orbs + periodic light sweep */}
          <div className="mx-orb-drift absolute -top-24 right-10 w-72 h-72 rounded-full bg-sky-300/30 blur-3xl pointer-events-none" />
          <div className="mx-orb-drift-rev absolute -bottom-24 left-1/3 w-72 h-72 rounded-full bg-orange-400/20 blur-3xl pointer-events-none" />
          <div className="mx-sweep absolute inset-y-0 -left-1/3 w-1/3 pointer-events-none" aria-hidden="true" />

          <div className="relative grid lg:grid-cols-12 gap-10 p-8 sm:p-12 lg:p-16 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-[-0.03em] leading-[1.02]">
                {CTA.heading}
              </h2>
              <p data-anim="up" className="mt-5 text-sm sm:text-[15px] text-white/80 leading-relaxed max-w-xl">
                {CTA.text}
              </p>
              <div data-anim="up" className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenRfq()}
                  data-magnetic
                  className="group inline-flex items-center gap-2 rounded-full bg-white text-slate-950 px-6 py-3 text-sm font-bold hover:bg-sky-50 transition-colors cursor-pointer"
                >
                  <RollText>Request a Quote</RollText>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                </button>
                <a
                  href={CONTACT.phoneHref}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold hover:bg-white/10 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 group-hover:animate-[mxRing_0.6s_ease-in-out]" />
                  <RollText>{CONTACT.phoneDisplay}</RollText>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {CTA.achievements.map((a, i) => {
                const on = i === active;
                return (
                  <div
                    key={a}
                    data-anim="right"
                    className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 transition-[background-color,border-color,translate] duration-500 ${
                      on ? 'bg-white/25 border-white/50 -translate-y-1' : 'bg-white/10 border-white/15'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-5 h-5 transition-all duration-500 ${on ? 'text-white scale-125' : 'text-sky-200'}`}
                    />
                    <p className="mt-3 text-sm font-bold leading-snug">{a}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
