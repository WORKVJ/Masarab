'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { scrollToTarget } from '@/lib/motion';
import RollText from '@/components/motion/RollText';
import CountUp from '@/components/motion/CountUp';
import {
  ArrowUpRight,
  Play,
  Star,
  Building2,
  ShieldCheck,
  Layers,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Check,
  Activity,
  FileCheck2,
  TrendingUp,
  Droplet,
  Flame,
  Wrench,
  Calendar
} from 'lucide-react';

interface HeroProps {
  onOpenRfq: (productName?: string) => void;
}

export default function Hero({ onOpenRfq }: HeroProps) {
  // 3D tilt + depth parallax for the person card.
  // Writes CSS variables straight onto the card (one rAF per frame) instead of React state,
  // so moving the mouse never re-renders the hero or its 12 marquee cards.
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1; // -1 … 1
      const ny = ((clientY - rect.top) / rect.height) * 2 - 1;
      card.style.setProperty('--tilt-x', `${(-ny * 4).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(nx * 4).toFixed(2)}deg`);
      card.style.setProperty('--px', nx.toFixed(3));
      card.style.setProperty('--py', ny.toFixed(3));
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    cancelAnimationFrame(rafRef.current);
    ['--tilt-x', '--tilt-y'].forEach((v) => card.style.setProperty(v, '0deg'));
    ['--px', '--py'].forEach((v) => card.style.setProperty(v, '0'));
  };

  const scrollToSection = (id: string) => {
    scrollToTarget(id);
  };

  return (
    <section
      id="hero"
      className="relative bg-white pt-28 sm:pt-32 lg:pt-36 pb-3 sm:pb-4 overflow-hidden border-b border-slate-200/80"
    >
      {/* ── LUXURY ARCHITECTURAL BACKGROUND WATERMARK & AMBIENT AURA ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 select-none font-black uppercase text-slate-100/70 whitespace-nowrap text-center -z-10 tracking-[0.24em]"
        style={{ fontSize: 'clamp(38px, 10vw, 140px)', lineHeight: 0.8 }}
      >
        MASAR ARABIA
      </div>

      {/* Subtle CAD Blueprint Grid */}
      <div className="absolute inset-0 cad-blueprint-grid opacity-25 pointer-events-none -z-10" />

      {/* Radiant Sunrise Orange & Amber Ambient Mesh Orbs */}
      <div data-speed="-0.35" className="absolute -top-16 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#0d7cae]/12 via-[#0284c7]/6 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div data-speed="0.5" className="absolute top-1/4 -right-32 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div data-speed="0.25" className="absolute bottom-0 -left-40 w-[520px] h-[520px] bg-orange-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================================================================== */}
        {/* 2-COLUMN SPLIT HERO (COMPACT & BALANCED FOR FULL VIEWPORT VISIBILITY) */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start mb-0">
          
          {/* ───────────────────────────────────────────────────────────────── */}
          {/* LEFT COLUMN: HIGH-IMPACT HEADLINE & CTAS (Span 7)                 */}
          {/* ───────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 relative z-30 pt-1 sm:pt-3 pb-4 lg:pb-8">
            
            {/* Giant Bold Headline (Clean 2-Line Display Layout with Official Logo Blue) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] xl:text-[56px] font-black uppercase tracking-[-0.035em] leading-[0.98] text-slate-950">
              <span className="block whitespace-nowrap">BEST SOLUTION FOR</span>
              <span className="mx-text-shine block text-transparent bg-clip-text bg-gradient-to-r from-[#0d7cae] via-[#38bdf8] to-[#0d7cae] mt-1 sm:mt-1.5">
                YOUR BUSINESS
              </span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed font-normal">
              Supplying certified ASTM &amp; DIN industrial piping, high-pressure valves, and structural gratings to Saudi Arabia&apos;s premier contractors, Yanbu refineries, SWCC desalination plants, and national mega-projects.
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
              <button
                onClick={() => scrollToSection('solutions')}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-slate-900 font-bold text-xs sm:text-sm shadow-2xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2 group"
              >
                <div className="mx-play-ring relative w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0 group-hover:bg-[#0d7cae] group-hover:scale-110 transition-[background-color,scale] duration-300 shadow-2xs">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5 text-white" />
                </div>
                <RollText>Explore Products</RollText>
              </button>

              {/* Direct Phone Line Pill */}
              <a
                href="tel:+966126473020"
                className="group hidden xl:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-sky-300 text-xs font-mono font-bold text-slate-800 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#0d7cae] group-hover:animate-[mxRing_0.6s_ease-in-out]" />
                <span>+966 12 647 3020</span>
              </a>

            </div>

          </div>

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* RIGHT COLUMN: 3-CARD COMPOSITION (BALANCED & PROPORTIONAL)        */}
          {/* ───────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 space-y-2 relative z-20">
            
            {/* Top Row: Two Floating Stat Cards Side-by-Side (Clean Light & No Bold) */}
            <div className="grid grid-cols-2 gap-2.5">
              
              {/* Card 1: 4.9 Rating Card (Luminous Mint Glass) */}
              <div className="mx-shine group/stat relative overflow-hidden bg-gradient-to-br from-[#ebfcf3] to-[#d1fae5]/70 border border-emerald-300/60 rounded-[16px] p-2 sm:p-2.5 shadow-xs flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all min-h-[78px] sm:min-h-0 sm:h-[70px]">
                <div className="flex items-center justify-between">
                  <span className="text-lg sm:text-xl font-normal text-slate-800 font-mono tracking-tight leading-none">
                    <CountUp value={4.9} decimals={1} delay={350} duration={1400} afterIntro />
                  </span>
                  <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-2xs flex items-center justify-center transition-transform duration-500 group-hover/stat:rotate-[72deg] group-hover/stat:scale-110">
                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-[11px] sm:text-[9.5px] font-normal text-slate-700 block leading-tight">2.6K+ Verified Batches</span>
                  <span className="text-[10px] sm:text-[7.5px] text-emerald-700 font-mono font-normal block leading-none">Aramco 9COM Validated</span>
                </div>
              </div>

              {/* Card 2: 80K Inventory Card (Luminous Light Sky Card matching reference) */}
              <div className="mx-shine mx-shine-late group/stat bg-gradient-to-br from-[#e0f2fe] via-[#d5eefe] to-[#bae6fd]/70 border border-sky-200/90 rounded-[16px] p-2 sm:p-2.5 shadow-xs flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all min-h-[78px] sm:min-h-0 sm:h-[70px] relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-lg sm:text-xl font-normal text-slate-800 font-mono tracking-tight leading-none">
                    <CountUp value={80} suffix="K+" delay={450} duration={1500} afterIntro />
                  </span>
                  <div className="w-4.5 h-4.5 rounded-full bg-[#0d7cae] shadow-2xs flex items-center justify-center transition-transform duration-500 group-hover/stat:-translate-y-0.5 group-hover/stat:scale-110">
                    <TrendingUp className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] sm:text-[9px] font-normal text-slate-600 font-mono leading-none">Jeddah Stock</span>
                  <div className="inline-flex items-center gap-1 text-[10px] sm:text-[7.5px] font-mono font-normal bg-white/90 px-1.5 py-0.5 rounded-full border border-sky-200/60 shadow-2xs text-[#0d7cae]">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>+18% Ready</span>
                  </div>
                </div>
              </div>

            </div>

            {/* =============================================================== */}
            {/* MAIN PERSON CARD WITH CONTENT-ALIGNED INDUSTRIAL ENGINEER       */}
            {/* (Extends all the way down to the cards baseline: 1:1 Reference) */}
            {/* =============================================================== */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="mx-tilt relative rounded-[24px] border border-sky-200/80 shadow-[0_16px_40px_-12px_rgba(13,124,174,0.08)] bg-gradient-to-b from-[#f0f9ff]/90 via-white to-[#e0f2fe]/60 overflow-hidden h-[420px] sm:h-[460px] lg:h-[490px] xl:h-[500px] flex items-end justify-center group"
            >
              
              {/* 1. ANIMATED ROTATING RADAR RINGS (Centered Behind Engineer's Head & Helmet) */}
              <div className="mx-depth-back absolute inset-0 flex items-center justify-center pointer-events-none z-0 -top-8 sm:-top-12">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] animate-spin-slow">
                  <svg viewBox="0 0 320 320" className="w-full h-full text-slate-300 fill-none">
                    {/* Outer dashed ring */}
                    <circle cx="160" cy="160" r="145" stroke="currentColor" strokeWidth="1.2" strokeDasharray="8 5" opacity="0.65" />
                    {/* Middle accent ring with orange dashes */}
                    <circle cx="160" cy="160" r="105" stroke="#0d7cae" strokeWidth="1.5" strokeDasharray="12 6" opacity="0.5" />
                    {/* Inner precision ring */}
                    <circle cx="160" cy="160" r="65" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                    {/* Radar crosshairs */}
                    <line x1="160" y1="15" x2="160" y2="305" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.35" />
                    <line x1="15" y1="160" x2="305" y2="160" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.35" />
                  </svg>
                </div>
              </div>

              {/* 2. RADAR SWEEPING BEAM ANIMATION */}
              <div className="mx-depth-back absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 z-0 -top-8 sm:-top-12">
                <div className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full animate-radar">
                  <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(13,124,174,0.20)_360deg)]" />
                </div>
              </div>

              {/* 3. SOFT BREATHING AMBIENT DEPTH GLOW ORBS (Directly Behind Hard Hat) */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-[#0d7cae]/15 blur-3xl pointer-events-none animate-pulse-slow z-0" />
              <div className="absolute bottom-28 right-2 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none animate-pulse-slow z-0" />

              {/* 4. CAD BLUEPRINT CORNER CROSSHAIRS */}
              <span className="absolute top-2.5 left-3 text-xs font-mono text-slate-400 font-bold select-none z-10">+</span>
              <span className="absolute top-2.5 right-3 text-xs font-mono text-slate-400 font-bold select-none z-10">+</span>

              {/* 5. FLOATING UPPER-LEFT MTC QUALITY BADGE */}
              <div className="mx-depth-front absolute top-3 left-3 z-20 pointer-events-none hidden sm:block">
                <div className="animate-float">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 border border-slate-200 shadow-2xs text-[10px] sm:text-[8.5px] font-mono font-normal text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Aramco 9COM Ready</span>
                </div>
                </div>
              </div>

              {/* 6. FLOATING WIREFRAME TRIANGLE ACCENT (Positioned Above the Carousel Overlap) */}
              <div className="absolute bottom-[210px] sm:bottom-[215px] lg:bottom-[220px] left-3.5 z-20 pointer-events-none animate-float">
                <svg width="18" height="18" viewBox="0 0 24 24" className="text-slate-800 fill-none stroke-current" strokeWidth="2.2">
                  <polygon points="12 4 21 20 3 20" />
                </svg>
              </div>

              {/* 7. FLOATING PULSING RADAR BEACON */}
              <div className="absolute right-3.5 top-1/3 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>

              {/* 8. THE PERSON: MASAR ARABIA INDUSTRIAL ENGINEER (Starts from the down of the cards 1:1) */}
              <div className="mx-depth-mid relative z-10 w-[90%] sm:w-[86%] max-w-[340px] sm:max-w-[370px] h-[410px] sm:h-[450px] lg:h-[480px] xl:h-[490px] flex items-end justify-center select-none pointer-events-none">
                <Image
                  src="/images/industrial-engineer.png"
                  alt="Masar Arabia Industrial Piping & Grating Technical Specialist"
                  fill
                  priority
                  sizes="(max-width: 640px) 280px, 400px"
                  className="object-contain object-bottom drop-shadow-[0_16px_25px_rgba(0,0,0,0.22)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* 9. FLOATING MINI ANALYTICS / DEFLECTION CHART (Floats Directly Above the Carousel Overlap) */}
              <div className="mx-depth-front absolute bottom-[210px] sm:bottom-[215px] lg:bottom-[220px] right-3 sm:right-4 z-20 pointer-events-none">
              <div className="bg-white/95 border border-slate-200/90 shadow-lg rounded-xl p-1.5 sm:p-2 max-w-[135px] animate-float">
                {/* Mini Header Bars */}
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="w-3 h-0.5 rounded-full bg-[#0d7cae]"></span>
                  <span className="w-1.5 h-0.5 rounded-full bg-blue-500"></span>
                  <span className="w-1 h-0.5 rounded-full bg-emerald-500"></span>
                </div>
                {/* Glowing SVG Flexure Curve with Gradient */}
                <div className="h-4 w-full">
                  <svg viewBox="0 0 100 24" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0d7cae" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 18 Q 30 20, 55 7 T 100 4"
                      fill="none"
                      stroke="url(#chartGrad)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      pathLength={1}
                      className="mx-draw"
                    />
                    <circle cx="100" cy="4" r="2" fill="#0d7cae" className="animate-ping" />
                    <circle cx="100" cy="4" r="2" fill="#0d7cae" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-[8px] font-mono font-normal text-slate-700 block mt-0.5 leading-none">ASTM Deflection Pass</span>
                <span className="text-[10px] sm:text-[7.5px] font-mono text-emerald-600 font-normal block leading-none">L/500 Ratio (99.8%)</span>
              </div>
              </div>

            </div>

          </div>

        </div>

        {/* ===================================================================== */}
        {/* AUTO-MOVING CARD TRACK DOCKED AT THE BASELINE OF THE PERSON & CARD    */}
        {/* (No dividing line, overlapping the person's base 1:1 like reference) */}
        {/* ===================================================================== */}
        <div className="-mt-[195px] sm:-mt-[205px] lg:-mt-[215px] relative z-20 -mx-4 sm:-mx-6 lg:-mx-8">
          
          {/* Marquee Wrapper with Smooth Left & Right Gradient Shadows */}
          <div className="relative overflow-hidden py-1">
            {/* Left Edge Mask */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
            {/* Right Edge Mask */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

            {/* Auto-Moving Cards Track */}
            <div className="animate-marquee flex items-center gap-3.5 sm:gap-4 hover:[animation-play-state:paused] py-2">
              
              {/* Loop 1: Complete 6 Distinct Content Cards (1:1 with Reference Design) */}
              <MovingCard1 key="c1-a" />
              <MovingCard2 key="c2-a" />
              <MovingCard3 key="c3-a" />
              <MovingCard4 key="c4-a" />
              <MovingCard5 key="c5-a" />
              <MovingCard6 key="c6-a" />

              {/* Loop 2: Duplicate Set for Seamless Continuous Loop */}
              <MovingCard1 key="c1-b" />
              <MovingCard2 key="c2-b" />
              <MovingCard3 key="c3-b" />
              <MovingCard4 key="c4-b" />
              <MovingCard5 key="c5-b" />
              <MovingCard6 key="c6-b" />

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

/* ========================================================================= */
/* AUTO-MOVING CARDS COMPONENTS (1:1 REPLICATION OF ATTACHED REFERENCE)      */
/* ========================================================================= */

// CARD 1: MINIMAL TAG & METRIC CARD (Clean, regular weight typography)
function MovingCard1() {
  return (
    <div className="w-[230px] sm:w-[250px] h-[200px] shrink-0 rounded-[22px] bg-gradient-to-br from-[#e0f2fe] via-[#d5eefe] to-[#bae6fd]/60 border border-sky-200/90 p-5 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden">
      {/* Subtle background radar curve */}
      <svg viewBox="0 0 200 200" className="absolute -bottom-8 -right-8 w-44 h-44 text-white/75 fill-none pointer-events-none">
        <circle cx="120" cy="120" r="50" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="120" cy="120" r="85" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Clean floating pills at top */}
      <div className="relative z-10 flex flex-wrap gap-2">
        <span className="px-3 py-1.5 rounded-full bg-white/95 text-xs font-normal text-slate-700 shadow-2xs border border-white">
          ASTM Standards
        </span>
        <span className="px-3 py-1.5 rounded-full bg-white/95 text-xs font-normal text-[#0d7cae] shadow-2xs border border-white">
          DIN Valves
        </span>
      </div>

      {/* Clean regular bottom metric */}
      <div className="relative z-10">
        <span className="text-2xl font-normal text-slate-800 font-mono tracking-tight block leading-none">
          500+
        </span>
        <span className="text-xs text-slate-500 font-normal block mt-1">
          Active Verified Specs
        </span>
      </div>
    </div>
  );
}

// CARD 2: SPECIALIST PHOTO WITH SINGLE CLEAN METRIC PILL (Clean regular weight)
function MovingCard2() {
  return (
    <div className="w-[230px] sm:w-[250px] h-[200px] shrink-0 rounded-[22px] overflow-hidden relative shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group flex flex-col justify-end p-3.5 border border-sky-200/80">
      {/* Full Bleed Authentic Specialist Photo */}
      <Image
        src="/images/card-engineer.jpg"
        alt="Technical Specialist"
        fill
        sizes="250px"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
      {/* Subtle Bottom Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Single Clean Floating Pill at Bottom */}
      <div className="relative z-10 bg-white/95 rounded-full px-4 py-2 shadow-md border border-white/90 flex items-center justify-between">
        <span className="text-xs font-normal text-slate-700">Jeddah Stock</span>
        <span className="text-xs font-normal text-[#0d7cae] font-mono">80,000+</span>
      </div>
    </div>
  );
}

// CARD 3: STATEMENT CARD (Clean regular typography)
function MovingCard3() {
  return (
    <div className="w-[230px] sm:w-[250px] h-[200px] shrink-0 rounded-[22px] bg-gradient-to-br from-[#e0f2fe] via-[#d5eefe] to-[#bae6fd]/60 border border-sky-200/90 p-5 flex flex-col justify-between text-slate-950 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group cursor-pointer">
      {/* Concentric White Circular Arc Lines */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-white/80 fill-none pointer-events-none">
        <circle cx="180" cy="20" r="50" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
        <circle cx="180" cy="20" r="95" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <circle cx="180" cy="140" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      </svg>

      {/* Floating Pill 1 (Top Left) */}
      <div className="self-start bg-white/95 rounded-full px-3.5 py-1.5 shadow-sm border border-white/80 flex items-center gap-1.5 relative z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-normal text-slate-700">Aramco 9COM</span>
      </div>

      {/* Headline in Middle */}
      <div className="relative z-10">
        <h3 className="text-sm font-normal leading-relaxed text-slate-700">
          Industrial Pipeline &amp; Structural Solutions
        </h3>
      </div>

      {/* Floating Pill 2 (Bottom Right) */}
      <div className="self-end bg-white/95 rounded-full px-3.5 py-1.5 shadow-sm border border-white/80 flex items-center gap-1.5 text-xs font-normal text-[#0d7cae] relative z-10">
        <span>ISO 9001 Pass</span>
      </div>
    </div>
  );
}

// CARD 4: ALLOCATION / FULFILLMENT (Clean regular typography)
function MovingCard4() {
  return (
    <div className="w-[230px] sm:w-[250px] h-[200px] shrink-0 rounded-[22px] bg-gradient-to-br from-[#e0f2fe] via-[#d5eefe] to-[#bae6fd]/60 border border-sky-200/90 p-5 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden">
      {/* Top Header Pill */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-normal text-slate-600">Monthly Ready</span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-normal">
          97%
        </span>
      </div>

      {/* Number in Middle */}
      <div>
        <span className="text-2xl font-normal text-slate-800 font-mono tracking-tight block leading-none">
          $4,900
        </span>
        <span className="text-xs text-slate-500 font-mono font-normal block mt-1">
          / $10,000 Allocation
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
    <div className="w-[230px] sm:w-[250px] h-[200px] shrink-0 rounded-[22px] bg-gradient-to-br from-[#e0f2fe] via-[#d5eefe] to-[#bae6fd]/60 border border-sky-200/90 p-5 relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer group">
      {/* Concentric White Circular Arc Lines */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-white/80 fill-none pointer-events-none">
        <circle cx="20" cy="180" r="60" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
        <circle cx="20" cy="180" r="105" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <circle cx="20" cy="180" r="150" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
        <circle cx="20" cy="180" r="195" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      </svg>

      {/* Floating Pill 1 (Top Right) */}
      <div className="self-end bg-white/95 rounded-full px-4 py-2 shadow-sm border border-white/80 flex items-center gap-2 text-xs text-slate-700 relative z-10 transition-transform group-hover:scale-105">
        <div className="w-4 h-4 rounded-full bg-[#0d7cae] text-white flex items-center justify-center text-[10.5px] sm:text-[9px]">
          <Calendar className="w-2.5 h-2.5" />
        </div>
        <span className="text-xs font-normal text-slate-700">Calendar</span>
        <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] sm:text-[9px] font-mono font-normal">
          100
        </span>
      </div>

      {/* Floating Pill 2 (Bottom Right / Center) */}
      <div className="self-center bg-white/95 rounded-full px-4 py-2 shadow-sm border border-white/80 flex items-center gap-2 text-xs text-slate-700 relative z-10 transition-transform group-hover:scale-105">
        <div className="w-4 h-4 rounded-full bg-[#0d7cae] text-white flex items-center justify-center text-[10.5px] sm:text-[9px]">
          <CheckCircle2 className="w-2.5 h-2.5" />
        </div>
        <span className="text-xs font-normal text-slate-700">Messages</span>
        <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] sm:text-[9px] font-mono font-normal">
          200
        </span>
      </div>
    </div>
  );
}

// CARD 6: INDUSTRIAL HARDWARE & SPECIFIER (Regular weight)
function MovingCard6() {
  return (
    <div className="w-[230px] sm:w-[250px] h-[200px] shrink-0 rounded-[22px] bg-gradient-to-br from-[#e0f2fe] via-[#d5eefe] to-[#bae6fd]/60 border border-sky-200/90 p-5 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden">
      {/* Subtle background radar curve */}
      <svg viewBox="0 0 200 200" className="absolute -top-10 -right-10 w-40 h-40 text-white/60 fill-none pointer-events-none">
        <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Clean Top Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-white/95 text-[#0d7cae] text-xs font-normal shadow-2xs border border-white">
          API 600 • BS EN 124
        </span>
        <span className="text-xs font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">Ready</span>
      </div>

      {/* Title in Middle */}
      <div className="relative z-10">
        <h4 className="text-sm font-normal text-slate-700 leading-snug">
          Industrial Valves &amp; Gratings
        </h4>
        <span className="text-xs text-slate-500 block mt-1 font-normal">Hydro-Tested Class 150-600#</span>
      </div>

      {/* Clean Bottom Pill */}
      <div className="relative z-10 self-start bg-white/95 rounded-full px-3.5 py-1.5 shadow-sm border border-white flex items-center gap-1.5 text-xs font-normal text-[#0d7cae]">
        <span>Specifier Ready</span>
        <ArrowUpRight className="w-3 h-3" />
      </div>
    </div>
  );
}
