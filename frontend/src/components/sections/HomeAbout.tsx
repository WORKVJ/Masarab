'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, PhoneCall } from 'lucide-react';
import { ABOUT, INDUSTRIES, STATS_BANNER } from '@/lib/masarContent';
import { useContact } from '@/components/SiteContactProvider';
import { useRequestQuote } from '@/lib/useRequestQuote';
import RollText from '@/components/motion/RollText';
import CountUp from '@/components/motion/CountUp';
import SectionHeader from './SectionHeader';
import { INDUSTRY_ICONS } from './IndustryList';

/**
 * Photo per sector, in INDUSTRIES order (Unsplash License, free for commercial use; photographers:
 * Alex Simpson, Jakub Żerdzicki, Ivan Bandura, Julia Taubitz, Sergej, Zemos, Ngoc Nguyen Phuong,
 * Julia Taubitz, Spencer Liao, Heliao, Mina Rad, Holzke Menü Essen auf Rädern).
 */
const INDUSTRY_PHOTOS = [
  'industrial', 'power', 'water-desalination', 'oil-gas', 'cement', 'fertilizers',
  'sugar', 'chemicals', 'steel-mills', 'mining', 'pharmaceutical', 'food',
].map((f) => `/images/masar/industries/${f}.webp`);

/**
 * Home page "About" block: the company story and numbers, then the 12 industries served
 * as photo tiles (all copy from the client's site).
 */
export default function HomeAbout() {
  const CONTACT = useContact();
  const onOpenRfq = useRequestQuote();

  return (
    <section id="about" className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-sky-50/70 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* story (left) · numbers and actions (right) */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow={ABOUT.eyebrow}
              title={
                <>
                  Empowering Industries with <span className="text-[#0d7cae]">Reliable Solutions for Success</span>
                </>
              }
              intro={ABOUT.paragraphs[0]}
            />
          </div>

          <div className="lg:col-span-5">
            <dl data-anim="up" className="grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-200">
              {ABOUT.stats.map((s, i) => (
                <div key={s.label} className={`py-5 ${i === 0 ? 'pr-3' : 'px-3 sm:px-4'}`}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                    <CountUp value={s.value} suffix={s.suffix} duration={1500} delay={i * 120} />
                  </dd>
                  <dd aria-hidden="true" className="mt-1 text-xs sm:text-[13px] leading-snug text-slate-500">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
            <p data-anim="up" className="mt-5 text-[15px] leading-[1.75] text-slate-600">
              <strong className="font-bold text-slate-900">
                {STATS_BANNER.heading[0]} · {STATS_BANNER.heading[1]}.
              </strong>{' '}
              {STATS_BANNER.text}
            </p>
            <div data-anim="up" className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenRfq()}
                data-magnetic
                className="group inline-flex items-center gap-2 rounded-full bg-[#0d7cae] hover:bg-[#0b6a95] text-white px-6 py-3 text-sm font-bold shadow-[0_10px_30px_-10px_rgba(13,124,174,0.8)] transition-colors cursor-pointer"
              >
                <RollText>Request a Quote</RollText>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
              </button>
              <a
                href={CONTACT.phoneHref}
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:border-sky-300 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#0d7cae] group-hover:animate-[mxRing_0.6s_ease-in-out]" />
                {CONTACT.phoneDisplay}
              </a>
              <Link href="/about" className="group inline-flex items-center gap-1.5 px-2 py-3 text-sm font-bold text-[#0d7cae]">
                <RollText>Read More</RollText>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </div>
          </div>
        </div>

        {/* industries served — photo tiles */}
        <div className="mt-16 sm:mt-20 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0d7cae]">Industries We Serve</p>
            <h3 className="mt-2 text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950">
              Trusted by <span className="text-[#0d7cae]">Leading Industries</span>
            </h3>
          </div>
          <Link href="/industries" className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#0d7cae]">
            View industries <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INDUSTRIES.map((name, i) => {
            const Icon = INDUSTRY_ICONS[i % INDUSTRY_ICONS.length];
            return (
              <li
                key={name}
                data-anim="up"
                className="group relative aspect-[4/5] overflow-hidden rounded-[20px] bg-[#04121f] shadow-[0_18px_40px_-28px_rgba(4,18,31,0.7)]"
              >
                <Image
                  src={INDUSTRY_PHOTOS[i]}
                  alt={`${name} industry`}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 32vw, 48vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/90 via-[#04121f]/25 to-transparent transition-opacity duration-500 group-hover:from-[#0d7cae]/90" />
                <span className="absolute top-3 left-3 grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-[#0d7cae]">
                  <Icon className="h-4 w-4" strokeWidth={1.9} />
                </span>
                <span className="absolute top-3.5 right-3.5 font-mono text-[10px] tracking-[0.15em] text-white/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
                  <span className="block text-sm sm:text-base font-black uppercase leading-tight tracking-tight text-white">{name}</span>
                  <span className="mt-2 block h-[3px] w-8 rounded-full bg-sky-400 transition-[width] duration-500 group-hover:w-14" />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
