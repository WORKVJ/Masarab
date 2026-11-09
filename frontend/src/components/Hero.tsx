'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import RollText from '@/components/motion/RollText';
import CountUp from '@/components/motion/CountUp';
import { ArrowUpRight, Play, Building2, PhoneCall, TrendingUp, Droplet, ShieldCheck, MapPin } from 'lucide-react';
import { useRequestQuote } from '@/lib/useRequestQuote';
import { ABOUT, CATEGORIES, CONTACT, CTA, STATS_BANNER } from '@/lib/masarContent';
import { categoryHref } from '@/lib/routes';

export default function Hero() {
  const onOpenRfq = useRequestQuote();
  // Client video: plays muted while the hero is on screen, pauses when scrolled away (saves CPU/battery),
  // and stays on its poster frame for visitors who prefer reduced motion.
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true; // required for autoplay in every browser
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <>
    <section id="hero" className="relative isolate overflow-hidden bg-[#04121f] text-white min-h-[100svh] flex flex-col">
      {/* ── CLIENT VIDEO covering the whole hero ── */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          src="/videos/masar-hero.mp4"
          poster="/videos/masar-hero-poster.jpg"
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Masar Arabia industries: pumps, valves, electrical panels, laboratory chemicals and workforce safety"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* readability: shade only behind the text (left + bottom); the right side of the video stays bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#04121f]/85 via-[#04121f]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/70 via-transparent to-[#04121f]/35" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-14">
        
        {/* ===================================================================== */}
        {/* 2-COLUMN SPLIT HERO (COMPACT & BALANCED FOR FULL VIEWPORT VISIBILITY) */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-0">
          
          {/* ───────────────────────────────────────────────────────────────── */}
          {/* LEFT COLUMN: HIGH-IMPACT HEADLINE & CTAS (Span 7)                 */}
          {/* ───────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 relative z-30 pt-1 sm:pt-3 pb-4 lg:pb-8">
            
            {/* Giant Bold Headline (Clean 2-Line Display Layout with Official Logo Blue) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] xl:text-[56px] font-black uppercase tracking-[-0.035em] leading-[0.98] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
              <span className="block whitespace-nowrap">LEADING SUPPLIER OF </span>
              <span className="mx-text-shine block text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#bae6fd] to-[#38bdf8] mt-1 sm:mt-1.5">
                INDUSTRIAL SOLUTIONS
              </span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-sm sm:text-base text-white/80 max-w-lg leading-relaxed font-normal">
              {STATS_BANNER.text}
            </p>

            {/* Action Pill Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              
              {/* Primary Pill Button with Official Logo Blue Gradient */}
              <button
                onClick={() => onOpenRfq()}
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#0d7cae] via-[#0284c7] to-[#0369a1] hover:from-[#0b6a95] hover:to-[#0284c7] text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_8px_20px_-4px_rgba(13,124,174,0.42)] hover:shadow-[0_12px_28px_-4px_rgba(13,124,174,0.55)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2 group"
              >
                <RollText>Request RFQ</RollText>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
              </button>

              {/* Secondary Pill Button with Dark Circle & Play Icon */}
              <Link
                href="/products"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs sm:text-sm shadow-2xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2 group"
              >
                <div className="mx-play-ring relative w-6 h-6 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 group-hover:bg-[#0d7cae] group-hover:scale-110 transition-[background-color,scale] duration-300 shadow-2xs">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <RollText>Explore Products</RollText>
              </Link>

              {/* Direct Phone Line Pill */}
              <a
                href={CONTACT.phoneHref}
                className="group hidden xl:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-xs font-mono font-bold text-white transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-sky-300 group-hover:animate-[mxRing_0.6s_ease-in-out]" />
                <span>{CONTACT.phoneDisplay}</span>
              </a>

            </div>

            {/* Two stat cards — left-aligned under the buttons */}
            <div className="grid grid-cols-2 gap-2.5 max-w-md pt-2">
              
              {/* Card 1: 4.9 Rating Card (Luminous Mint Glass) */}
              <div className="mx-shine group/stat relative overflow-hidden bg-gradient-to-br from-[#ebfcf3] to-[#d1fae5]/70 border border-emerald-300/60 rounded-[16px] p-2 sm:p-2.5 shadow-xs flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all min-h-[78px] sm:min-h-0 sm:h-[70px]">
                <div className="flex items-center justify-between">
                  <span className="text-lg sm:text-xl font-normal text-slate-800 font-mono tracking-tight leading-none">
                    <CountUp value={ABOUT.stats[0].value} suffix={ABOUT.stats[0].suffix} delay={350} duration={1400} afterIntro />
                  </span>
                  <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-2xs flex items-center justify-center transition-transform duration-500 group-hover/stat:rotate-[72deg] group-hover/stat:scale-110">
                    <Building2 className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-[11px] sm:text-[9.5px] font-normal text-slate-700 block leading-tight">{ABOUT.stats[0].label}</span>
                  <span className="text-[10px] sm:text-[7.5px] text-emerald-700 font-mono font-normal block leading-none">{CTA.achievements[0]}</span>
                </div>
              </div>

              {/* Card 2: 80K Inventory Card (Luminous Light Sky Card matching reference) */}
              <div className="mx-shine mx-shine-late group/stat bg-gradient-to-br from-[#e0f2fe] via-[#d5eefe] to-[#bae6fd]/70 border border-sky-200/90 rounded-[16px] p-2 sm:p-2.5 shadow-xs flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all min-h-[78px] sm:min-h-0 sm:h-[70px] relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-lg sm:text-xl font-normal text-slate-800 font-mono tracking-tight leading-none">
                    <CountUp value={ABOUT.stats[1].value} suffix={ABOUT.stats[1].suffix} delay={450} duration={1500} afterIntro />
                  </span>
                  <div className="w-4.5 h-4.5 rounded-full bg-[#0d7cae] shadow-2xs flex items-center justify-center transition-transform duration-500 group-hover/stat:-translate-y-0.5 group-hover/stat:scale-110">
                    <TrendingUp className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] sm:text-[9px] font-normal text-slate-600 font-mono leading-none">{ABOUT.stats[1].label}</span>
                  <div className="inline-flex items-center gap-1 text-[10px] sm:text-[7.5px] font-mono font-normal bg-white/90 px-1.5 py-0.5 rounded-full border border-sky-200/60 shadow-2xs text-[#0d7cae]">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{CTA.achievements[2]}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>

    {/* moving cards band, directly under the video hero */}
    <div data-pause-offscreen className="relative bg-white border-b border-slate-200/80 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================== */}
        {/* AUTO-MOVING CARD TRACK DOCKED AT THE BASELINE OF THE PERSON & CARD    */}
        {/* (No dividing line, overlapping the person's base 1:1 like reference) */}
        {/* ===================================================================== */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          
          {/* Marquee Wrapper with Smooth Left & Right Gradient Shadows */}
          <div className="relative overflow-hidden py-1">
            {/* Left Edge Mask */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
            {/* Right Edge Mask */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

            {/* Auto-Moving Cards Track */}
            <div className="animate-marquee flex items-center gap-3.5 sm:gap-4 hover:[animation-play-state:paused] py-2">
              
              {/* Loop 1: six content cards */}
              <MovingCard1 />
              <MovingCard2 />
              <MovingCard3 />
              <MovingCard4 />
              <MovingCard5 />
              <MovingCard6 />

              {/* Loop 2: duplicate set for the seamless loop (inert: not focusable, hidden from screen readers) */}
              <div inert className="contents">
                <MovingCard1 />
                <MovingCard2 />
                <MovingCard3 />
                <MovingCard4 />
                <MovingCard5 />
                <MovingCard6 />
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
    </>
  );
}

/* ========================================================================= */
/* AUTO-MOVING CARDS COMPONENTS (1:1 REPLICATION OF ATTACHED REFERENCE)      */
/* ========================================================================= */

// CARD 1: MINIMAL TAG & METRIC CARD (Clean, regular weight typography)
function MovingCard1() {
  return (
    <div className="w-[230px] sm:w-[250px] h-[200px] shrink-0 rounded-[22px] bg-gradient-to-br from-[#e0f2fe] via-[#d5eefe] to-[#bae6fd]/60 border border-sky-200/90 p-5 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      {/* Subtle background radar curve */}
      <svg viewBox="0 0 200 200" className="absolute -bottom-8 -right-8 w-44 h-44 text-white/75 fill-none pointer-events-none">
        <circle cx="120" cy="120" r="50" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="120" cy="120" r="85" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Clean floating pills at top */}
      <div className="relative z-10 flex flex-wrap gap-2">
        <Link href={categoryHref('cooling-solutions')} className="px-3 py-1.5 rounded-full bg-white/95 text-xs font-normal text-slate-700 shadow-2xs border border-white hover:text-[#0d7cae] transition-colors">
          Cooling Solutions
        </Link>
        <Link href={categoryHref('water-treatment')} className="px-3 py-1.5 rounded-full bg-white/95 text-xs font-normal text-[#0d7cae] shadow-2xs border border-white hover:bg-white transition-colors">
          Water Treatment
        </Link>
      </div>

      {/* Clean regular bottom metric */}
      <div className="relative z-10">
        <span className="text-2xl font-normal text-slate-800 font-mono tracking-tight block leading-none">
          500+
        </span>
        <span className="text-xs text-slate-500 font-normal block mt-1">
          Customers
        </span>
      </div>
    </div>
  );
}

// CARD 2: HEAD OFFICE (light card, no photo)
function MovingCard2() {
  return (
    <div className="w-[230px] sm:w-[250px] h-[200px] shrink-0 rounded-[22px] bg-gradient-to-br from-[#e0f2fe] via-[#d5eefe] to-[#bae6fd]/60 border border-sky-200/90 p-5 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      {/* Subtle background radar curve */}
      <svg viewBox="0 0 200 200" className="absolute -top-12 -right-12 w-44 h-44 text-white/75 fill-none pointer-events-none">
        <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 4" />
        <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="relative z-10 self-start bg-white/95 rounded-full px-3.5 py-1.5 shadow-sm border border-white/80 flex items-center gap-1.5">
        <MapPin className="w-3 h-3 text-[#0d7cae]" />
        <span className="text-xs font-normal text-slate-700">Head Office</span>
      </div>

      <div className="relative z-10">
        <span className="block text-sm font-normal text-slate-800 leading-snug">Jeddah, Saudi Arabia</span>
        <span className="block text-xs text-slate-500 font-normal mt-1">Supplying across the Kingdom</span>
      </div>

      <a
        href={CONTACT.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 self-start bg-white/95 rounded-full px-3.5 py-1.5 shadow-sm border border-white flex items-center gap-1.5 text-xs font-normal text-[#0d7cae] hover:bg-white transition-colors"
      >
        <span>View on map</span>
        <ArrowUpRight className="w-3 h-3" />
      </a>
    </div>
  );
}

// CARD 3: STATEMENT CARD (Clean regular typography)
function MovingCard3() {
  return (
    <div className="w-[230px] sm:w-[250px] h-[200px] shrink-0 rounded-[22px] bg-gradient-to-br from-[#e0f2fe] via-[#d5eefe] to-[#bae6fd]/60 border border-sky-200/90 p-5 flex flex-col justify-between text-slate-950 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group">
      {/* Concentric White Circular Arc Lines */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-white/80 fill-none pointer-events-none">
        <circle cx="180" cy="20" r="50" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
        <circle cx="180" cy="20" r="95" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <circle cx="180" cy="140" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      </svg>

      {/* Floating Pill 1 (Top Left) */}
      <div className="self-start bg-white/95 rounded-full px-3.5 py-1.5 shadow-sm border border-white/80 flex items-center gap-1.5 relative z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-normal text-slate-700">Trusted by Leading Industries</span>
      </div>

      {/* Headline in Middle */}
      <div className="relative z-10">
        <h3 className="text-sm font-normal leading-relaxed text-slate-700">
          Safe, Reliable &amp; Prompt Service
        </h3>
      </div>

      {/* Floating Pill 2 (Bottom Right) */}
      <div className="self-end bg-white/95 rounded-full px-3.5 py-1.5 shadow-sm border border-white/80 flex items-center gap-1.5 text-xs font-normal text-[#0d7cae] relative z-10">
        <span>Superior Quality Products</span>
      </div>
    </div>
  );
}

// CARD 4: ALLOCATION / FULFILLMENT (Clean regular typography)
function MovingCard4() {
  return (
    <div className="w-[230px] sm:w-[250px] h-[200px] shrink-0 rounded-[22px] bg-gradient-to-br from-[#e0f2fe] via-[#d5eefe] to-[#bae6fd]/60 border border-sky-200/90 p-5 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      {/* Top Header Pill */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-normal text-slate-600">Years of Experience</span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-normal">
          10+
        </span>
      </div>

      {/* Number in Middle */}
      <div>
        <span className="text-2xl font-normal text-slate-800 font-mono tracking-tight block leading-none">
          08
        </span>
        <span className="text-xs text-slate-500 font-mono font-normal block mt-1">
          Product Disciplines
        </span>
      </div>

      {/* Clean Single Progress Bar Pill */}
      <div className="w-full bg-white/90 rounded-full p-1 shadow-2xs border border-white">
        <div className="w-full h-2 rounded-full bg-sky-100 overflow-hidden">
          <div className="mx-bar-fill h-full rounded-full bg-[#0d7cae] w-[68%] origin-left" />
        </div>
      </div>
    </div>
  );
}

// CARD 5: RADAR CURVES & FLOATING PILLS (1:1 with Reference Design - Regular weight)
function MovingCard5() {
  return (
    <div className="w-[230px] sm:w-[250px] h-[200px] shrink-0 rounded-[22px] bg-gradient-to-br from-[#e0f2fe] via-[#d5eefe] to-[#bae6fd]/60 border border-sky-200/90 p-5 relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
      {/* Concentric White Circular Arc Lines */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-white/80 fill-none pointer-events-none">
        <circle cx="20" cy="180" r="60" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
        <circle cx="20" cy="180" r="105" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <circle cx="20" cy="180" r="150" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
        <circle cx="20" cy="180" r="195" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      </svg>

      {/* Floating Pill 1 (Top Right) */}
      <Link href={categoryHref('water-treatment')} className="self-end bg-white/95 rounded-full px-4 py-2 shadow-sm border border-white/80 flex items-center gap-2 text-xs text-slate-700 relative z-10 transition-transform hover:scale-105">
        <div className="w-4 h-4 rounded-full bg-[#0d7cae] text-white flex items-center justify-center text-[10.5px] sm:text-[9px]">
          <Droplet className="w-2.5 h-2.5" />
        </div>
        <span className="text-xs font-normal text-slate-700">Water Treatment</span>
        <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] sm:text-[9px] font-mono font-normal">
          {CATEGORIES.find((c) => c.id === 'water')?.products.length}
        </span>
      </Link>

      {/* Floating Pill 2 (Bottom Right / Center) */}
      <Link href={categoryHref('safety-equipment')} className="self-center bg-white/95 rounded-full px-4 py-2 shadow-sm border border-white/80 flex items-center gap-2 text-xs text-slate-700 relative z-10 transition-transform hover:scale-105">
        <div className="w-4 h-4 rounded-full bg-[#0d7cae] text-white flex items-center justify-center text-[10.5px] sm:text-[9px]">
          <ShieldCheck className="w-2.5 h-2.5" />
        </div>
        <span className="text-xs font-normal text-slate-700">Safety Equipments</span>
        <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] sm:text-[9px] font-mono font-normal">
          {CATEGORIES.find((c) => c.id === 'safety')?.products.length}
        </span>
      </Link>
    </div>
  );
}

// CARD 6: INDUSTRIAL HARDWARE & SPECIFIER (Regular weight)
function MovingCard6() {
  return (
    <div className="w-[230px] sm:w-[250px] h-[200px] shrink-0 rounded-[22px] bg-gradient-to-br from-[#e0f2fe] via-[#d5eefe] to-[#bae6fd]/60 border border-sky-200/90 p-5 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      {/* Subtle background radar curve */}
      <svg viewBox="0 0 200 200" className="absolute -top-10 -right-10 w-40 h-40 text-white/60 fill-none pointer-events-none">
        <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Clean Top Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-white/95 text-[#0d7cae] text-xs font-normal shadow-2xs border border-white">
          FRP • Steel • Stainless
        </span>
        <span className="text-xs font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">Gratings</span>
      </div>

      {/* Title in Middle */}
      <div className="relative z-10">
        <Link href={categoryHref('electrical')} className="block text-sm font-normal text-slate-700 leading-snug hover:text-[#0d7cae] transition-colors">
          Gratings, Handrails &amp; Ladders
        </Link>
        <span className="text-xs text-slate-500 block mt-1 font-normal">FRP/GRP, Steel and Stainless Steel</span>
      </div>

      {/* Clean Bottom Pill */}
      <Link href="/contact" className="relative z-10 self-start bg-white/95 rounded-full px-3.5 py-1.5 shadow-sm border border-white flex items-center gap-1.5 text-xs font-normal text-[#0d7cae] hover:bg-white transition-colors">
        <span>Request a Quote</span>
        <ArrowUpRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
