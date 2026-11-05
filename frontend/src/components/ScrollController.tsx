'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollToTarget } from '@/lib/motion';

interface ActiveSectionInfo {
  id: string;
  name: string;
  num: string;
}

const SECTIONS: ActiveSectionInfo[] = [
  { id: 'hero', name: 'HOME', num: '01' },
  { id: 'product-range', name: 'PRODUCT RANGE', num: '02' },
  { id: 'about', name: 'ABOUT US', num: '03' },
  { id: 'solutions', name: 'PRODUCTS', num: '04' },
  { id: 'industries', name: 'INDUSTRIES', num: '05' },
  { id: 'why-us', name: 'WHY MASAR ARABIA', num: '06' },
  { id: 'clients', name: 'CLIENTS', num: '07' },
  { id: 'rfq', name: 'CONTACT', num: '08' },
];

export default function ScrollController() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<ActiveSectionInfo>(SECTIONS[0]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // 1. Number counters ([data-counter]) — animate once when they enter the viewport
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          counterObserver.unobserve(el);
          const target = parseFloat(el.dataset.counter || '0');
          const prefix = el.dataset.prefix || '';
          const suffix = el.dataset.suffix || '';
          const decimals = parseInt(el.dataset.decimals || '0', 10);
          const start = performance.now();
          const duration = 1600;
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            el.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll('[data-counter]').forEach((el) => counterObserver.observe(el));

    // 2. Scroll dial — only touches React state when the rounded value actually changes
    let ticking = false;
    let lastPct = -1;
    let lastSection = '';
    let lastShow: boolean | null = null;

    // Layout is measured only on load/resize — never inside the scroll frame (avoids forced reflows)
    let tops: number[] = [];
    let maxScroll = 1;
    const measure = () => {
      tops = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
      });
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(() => {
      measure();
      handleScroll();
    });
    ro.observe(document.body);

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const pct = Math.min(100, Math.round((y / maxScroll) * 100));
      if (pct !== lastPct) {
        lastPct = pct;
        setScrollProgress(pct);
      }
      const show = y > 350;
      if (show !== lastShow) {
        lastShow = show;
        setShowScrollTop(show);
      }
      const probe = y + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        if (tops[i] <= probe) {
          if (SECTIONS[i].id !== lastSection) {
            lastSection = SECTIONS[i].id;
            setActiveSection(SECTIONS[i]);
          }
          break;
        }
      }
    };
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    requestAnimationFrame(update);

    return () => {
      counterObserver.disconnect();
      ro.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    scrollToTarget(0);
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;


  return (
    <>
      {/* ===================================================================== */}
      {/* CIRCULAR ENGINEERING HUD & DYNAMIC ROUNDENING SCROLL CONTROLLER       */}
      {/* ===================================================================== */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-500 transform ${
          showScrollTop
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-2">
          
          {/* Expanded Rounded HUD Pill showing Active Section Name */}
          <div
            className={`transition-all duration-300 ease-out overflow-hidden hidden sm:flex items-center gap-2 rounded-full glass-hud px-3.5 py-1.5 shadow-xl text-slate-800 ${
              isHovered ? 'max-w-[280px] opacity-100' : 'max-w-0 opacity-0 pointer-events-none px-0'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full bg-orange-500 ${isHovered ? 'animate-ping' : ''}`}></span>
            <span className="text-[10px] font-mono font-bold text-orange-600">
              {activeSection.num}
            </span>
            <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 whitespace-nowrap">
              {activeSection.name}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {Math.round(scrollProgress)}%
            </span>
          </div>

          {/* Master Circular Precision Dial with Rotating Graduation Ring */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full glass-hud text-slate-900 shadow-2xl flex items-center justify-center transition-all cursor-pointer group hover:scale-110 active:scale-95 border-2 border-slate-200/90 hover:border-orange-500"
          >
            {/* Outer SVG Circular Progress Dial */}
            <svg viewBox="0 0 52 52" className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5">
              {/* Background Ring */}
              <circle
                cx="26"
                cy="26"
                r={radius}
                className="stroke-slate-200/80"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Orange Active Progress Arc */}
              <circle
                cx="26"
                cy="26"
                r={radius}
                className="stroke-[#0d7cae]"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Rotating Micro Vernier Ticks */}
            <div
              className="absolute inset-1 rounded-full border border-slate-200/60 pointer-events-none transition-transform duration-300"
              style={{
                transform: `rotate(${scrollProgress * 3.6}deg)`,
              }}
            >
              <div className="w-1 h-1 bg-orange-500 rounded-full mx-auto -mt-0.5"></div>
            </div>

            {/* Center Content: Percent by Default, Arrow on Hover */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <ArrowUp className="w-4 h-4 text-orange-600 group-hover:-translate-y-1 transition-transform" />
              <span className="text-[8px] font-mono font-bold text-slate-500 group-hover:text-slate-900 leading-none mt-0.5">
                {Math.round(scrollProgress)}%
              </span>
            </div>
          </button>

        </div>
      </div>
    </>
  );
}