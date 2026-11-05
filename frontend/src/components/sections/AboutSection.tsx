import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Check, MapPin, PhoneCall } from 'lucide-react';
import { ABOUT, CONTACT } from '@/lib/masarContent';
import RollText from '@/components/motion/RollText';
import SectionHeader from './SectionHeader';
import StatsStrip from './StatsStrip';

const STRENGTHS = [
  {
    title: 'Mechanical, Electrical & Instrumentation',
    text: 'Materials and equipment for every plant discipline.',
  },
  {
    title: 'Reputable Manufacturers',
    text: 'Quality products from trusted global brands.',
  },
  {
    title: 'Timely Delivery, Competitive Rates',
    text: 'Prompt, reliable supply across the Kingdom.',
  },
];

const RING_TEXT = 'TRUSTED INDUSTRIAL PARTNER • JEDDAH • KSA • ';
/** circumference of the r=47 ring path — the text is stretched to exactly this length so it never overlaps */
const RING_LENGTH = 2 * Math.PI * 47;

interface AboutSectionProps {
  onOpenRfq: () => void;
}

export default function AboutSection({ onOpenRfq }: AboutSectionProps) {
  return (
    <section id="about" className="relative py-16 lg:py-14 bg-white overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-sky-50/70 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* ───────────── Bento grid: 4 aligned tiles, no overlaps ───────────── */}
        <div className="lg:col-span-6 grid grid-cols-2 grid-rows-3 gap-3 sm:gap-4 h-[440px] sm:h-[500px] lg:h-[min(560px,calc(100svh_-_190px))]">
          {/* A · engineer photo (tall) */}
          <div data-anim="up" className="group row-span-2 relative rounded-[26px] overflow-hidden shadow-[0_30px_60px_-35px_rgba(13,124,174,0.55)]">
            <div data-parallax-img className="absolute -inset-y-[10%] inset-x-0">
              <Image
                src="/images/safety-engineer.jpg"
                alt="Engineer on an industrial plant walkway"
                fill
                sizes="(min-width: 1024px) 26vw, 50vw"
                className="object-cover object-[50%_35%] transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/50 via-transparent to-transparent" />
          </div>

          {/* B · brand tile */}
          <div data-anim="up" className="relative rounded-[26px] overflow-hidden bg-gradient-to-br from-[#0d7cae] via-[#0b6a95] to-[#06486a] text-white p-4 sm:p-5 flex flex-col justify-between">
            <svg viewBox="0 0 120 120" className="mx-spin-ring absolute -right-10 -bottom-10 w-40 h-40 opacity-30" aria-hidden="true">
              <defs>
                <path id="aboutRing" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
              </defs>
              <text fill="#ffffff" style={{ font: '700 8.4px ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                <textPath href="#aboutRing" textLength={RING_LENGTH - 2} lengthAdjust="spacing">
                  {RING_TEXT}
                </textPath>
              </text>
            </svg>
            <span className="relative text-[10px] font-mono uppercase tracking-[0.16em] text-sky-100/80">Our Range</span>
            <div className="relative">
              <span className="block text-4xl sm:text-5xl font-black tracking-tight leading-none">08</span>
              <span className="block mt-1.5 text-sm font-bold leading-tight">Product Disciplines</span>
              <span className="block mt-0.5 text-[11px] text-sky-100/75">One trusted supplier</span>
            </div>
          </div>

          {/* C · FRP grating photo (tall) */}
          <div data-anim="up" className="group row-span-2 relative rounded-[26px] overflow-hidden shadow-[0_30px_60px_-35px_rgba(15,23,42,0.45)]">
            <Image
              src="/images/frp-marine.jpg"
              alt="FRP grating walkway at a coastal facility"
              fill
              sizes="(min-width: 1024px) 26vw, 50vw"
              className="object-cover object-[60%_50%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/55 via-transparent to-transparent" />
            <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-slate-900 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              FRP Gratings
            </span>
          </div>

          {/* D · head office tile */}
          <div data-anim="up" className="rounded-[26px] border border-sky-100 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe]/70 p-4 sm:p-5 flex flex-col justify-between">
            <span className="w-9 h-9 rounded-full bg-[#0d7cae] text-white flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </span>
            <div>
              <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500">
                <span className="mx-ping-dot w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Head Office
              </span>
              <span className="block mt-1 text-sm sm:text-base font-bold text-slate-900 leading-tight">Jeddah, Saudi Arabia</span>
              <span className="block mt-0.5 text-[11px] text-slate-500">Supplying across the Kingdom</span>
            </div>
          </div>
        </div>

        {/* ───────────── Story ───────────── */}
        <div className="lg:col-span-6">
          <SectionHeader
            eyebrow={ABOUT.eyebrow}
            title={
              <>
                Your Trusted Partner for <span className="text-[#0d7cae]">Industrial Solutions</span>
              </>
            }
            intro="Masar Arabia, a division of Masar Arabia First Trading Company, is the leading supplier of industrial products in Saudi Arabia — with expertise in chemical supply, safety equipment, water treatment, FRP gratings and more."
            compact
          />

          {/* key strengths */}
          <ul className="mt-6 grid sm:grid-cols-3 gap-3">
            {STRENGTHS.map((s) => (
              <li
                key={s.title}
                data-anim="up"
                className="group rounded-2xl border border-slate-200/80 bg-white p-4 hover:border-sky-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-20px_rgba(13,124,174,0.5)] transition-[border-color,box-shadow,translate] duration-300"
              >
                <span className="w-7 h-7 rounded-full bg-[#e0f2fe] text-[#0d7cae] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#0d7cae] group-hover:text-white">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                <p className="mt-3 text-[13px] font-bold text-slate-900 leading-snug">{s.title}</p>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ul>

          {/* stats strip — active card glides between the three stats */}
          <StatsStrip />

          {/* actions */}
          <div data-anim="up" className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenRfq}
              data-magnetic
              className="group inline-flex items-center gap-2 rounded-full bg-[#0d7cae] hover:bg-[#0b6a95] text-white px-6 py-3 text-sm font-bold shadow-[0_10px_30px_-10px_rgba(13,124,174,0.8)] transition-colors cursor-pointer"
            >
              <RollText>Request a Quote</RollText>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </button>
            <a
              href={CONTACT.phoneHref}
              className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm hover:border-sky-300 transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-[#e0f2fe] text-[#0d7cae] flex items-center justify-center">
                <PhoneCall className="w-3.5 h-3.5 group-hover:animate-[mxRing_0.6s_ease-in-out]" />
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] font-mono uppercase tracking-[0.14em] text-slate-400">Call us</span>
                <span className="block font-bold text-slate-900">{CONTACT.phoneDisplay}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
