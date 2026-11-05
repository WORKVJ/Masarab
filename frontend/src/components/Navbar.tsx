'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, ArrowUpRight, Menu, X, Layers, Wrench, Wind, Droplet, PhoneCall, Mail } from 'lucide-react';
import { CONTACT } from '@/lib/masarContent';
import { scrollToTarget } from '@/lib/motion';
import RollText from '@/components/motion/RollText';

const NAV_ITEMS = [
  { id: 'product-range', label: 'Product Range' },
  { id: 'about', label: 'About' },
  { id: 'solutions', label: 'Products' },
  { id: 'industries', label: 'Industries' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'clients', label: 'Clients' },
  { id: 'rfq', label: 'Contact' },
];

const MOBILE_LINKS = [
  { label: 'Product Range', href: '#product-range' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#solutions' },
  { label: 'Industries', href: '#industries' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#rfq' },
];

interface NavbarProps {
  onOpenRfq: (productName?: string) => void;
}

export default function Navbar({ onOpenRfq }: NavbarProps) {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const [pill, setPill] = useState({ x: 0, width: 0 });
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLElement | null>>({});

  // Lock page scroll while the mobile menu is open; Escape closes it
  useEffect(() => {
    if (!mobileMenuOpen) return;
    window.__lenis?.stop();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.__lenis?.start();
      html.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen]);

  // Scroll-spy: highlight the nav item for the section in the middle of the screen
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === 'hero' ? '' : e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ['hero', ...NAV_ITEMS.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Slide the pill under the active link (re-measured after the bar docks/undocks)
  useLayoutEffect(() => {
    const measure = () => {
      const link = active ? linkRefs.current[active] : null;
      const nav = navRef.current;
      if (!link || !nav) {
        setPill((p) => (p.width ? { ...p, width: 0 } : p));
        return;
      }
      const x = link.getBoundingClientRect().left - nav.getBoundingClientRect().left;
      setPill({ x, width: link.offsetWidth });
    };
    const raf = requestAnimationFrame(measure);
    const t = setTimeout(measure, 520);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [active, isScrolled]);

  useEffect(() => {
    // Dock the bar once scrolled past 30px — checked at most once per frame, state set only on change
    let raf = 0;
    let last: boolean | null = null;
    const check = () => {
      raf = 0;
      const scrolled = window.scrollY > 30;
      if (scrolled !== last) {
        last = scrolled;
        setIsScrolled(scrolled);
      }
    };
    const handleScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    raf = requestAnimationFrame(check);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const solutionsList = [
    { id: 'cooling', name: 'Cooling Solutions', desc: 'Cooling Towers, Chillers & AHUs', icon: Wind, color: 'text-cyan-500' },
    { id: 'water', name: 'Water Treatment', desc: 'EDI, EDR & Membrane Degassing', icon: Droplet, color: 'text-blue-500' },
    { id: 'chemical', name: 'Chemical', desc: 'Alcohols, Aromatics & Ketones', icon: Layers, color: 'text-emerald-500' },
    { id: 'electrical', name: 'Electrical', desc: 'Gratings, Breakers & VFDs', icon: Layers, color: 'text-amber-500' },
    { id: 'instrumentation', name: 'Instrumentation', desc: 'Flow Meters, Gauges & Sensors', icon: Wrench, color: 'text-indigo-500' },
    { id: 'mechanical', name: 'Mechanical', desc: 'Pumps, Valves & Actuators', icon: Wrench, color: 'text-orange-500' },
    { id: 'pipe-fittings', name: 'Pipe Fittings and Alloys', desc: 'Plates, Sheets & Special Fittings', icon: Layers, color: 'text-purple-500' },
    { id: 'safety', name: 'Safety Equipments', desc: 'PPE, Fall Protection & FR Gear', icon: Layers, color: 'text-rose-500' },
  ];

  const goToCategory = (id: string) => {
    setSolutionsOpen(false);
    window.dispatchEvent(new CustomEvent('masar:category', { detail: id }));
    scrollToTarget('solutions');
  };

  return (
    <>
      {/* Dynamic Floating Navbar Header */}
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
        
        {/* ================================================================= */}
        {/* DESKTOP NAV CONTAINER: CONTINUOUS FLUID DOCKING SYSTEM (md:flex)  */}
        {/* ================================================================= */}
        <div
          className={`hidden md:flex items-center justify-between mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled
              ? 'max-w-[960px] lg:max-w-[980px] bg-white/95 rounded-full border border-slate-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.08)] px-4 py-1.5'
              : 'max-w-7xl bg-transparent border-transparent shadow-none px-2 py-0'
          }`}
        >
          
          {/* 1. BRAND LOGO (Smoothly glides inward from the far left into the unified pill) */}
          <div className="shrink-0 flex items-center pointer-events-auto">
            <a href="#" className="flex items-center group py-0.5">
              <div className="relative flex items-center transition-transform group-hover:scale-[1.02]">
                <Image
                  src="/images/logo-dark.png"
                  alt="Masar Arabia"
                  width={150}
                  height={34}
                  style={{ width: 'auto' }}
                  className="h-7.5 lg:h-8 w-auto object-contain object-left"
                  priority
                />
              </div>
            </a>
          </div>

          {/* 2. CENTER NAV LINKS */}
          <div
            className={`flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto ${
              isScrolled
                ? 'bg-transparent border-transparent shadow-none px-0 py-0'
                : 'bg-white/95 rounded-full border border-slate-200/90 shadow-sm px-5 py-2'
            }`}
          >
            <nav
              ref={navRef}
              className="relative flex items-center gap-1 lg:gap-1.5 text-[12.5px] lg:text-[13px] font-normal text-slate-700 whitespace-nowrap"
            >
              {/* Sliding active-section pill */}
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-0 h-7 rounded-full bg-[#e0f2fe] transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                style={{
                  width: pill.width,
                  transform: `translate(${pill.x}px, -50%)`,
                  opacity: pill.width ? 1 : 0,
                }}
              />

              {NAV_ITEMS.map((item) =>
                item.id === 'solutions' ? (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setSolutionsOpen(true)}
                    onMouseLeave={() => setSolutionsOpen(false)}
                  >
                    <button
                      ref={(el) => {
                        linkRefs.current[item.id] = el;
                      }}
                      className={`group relative flex items-center gap-1 px-2.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                        active === item.id ? 'text-[#0d7cae]' : 'hover:text-slate-950'
                      }`}
                      onClick={() => setSolutionsOpen(!solutionsOpen)}
                    >
                      <RollText>{item.label}</RollText>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {solutionsOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 mx-dropdown-in">
                        <div className="bg-white rounded-2xl p-2.5 border border-slate-200/90 shadow-xl grid grid-cols-1 gap-1">
                          {solutionsList.map((sol, i) => {
                            const Icon = sol.icon;
                            return (
                              <button
                                key={sol.id}
                                onClick={() => goToCategory(sol.id)}
                                style={{ animationDelay: `${i * 30}ms` }}
                                className="mx-item-in group/item flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-xs text-slate-800 transition-colors text-left cursor-pointer"
                              >
                                <Icon className={`w-4 h-4 ${sol.color} transition-transform group-hover/item:scale-125 group-hover/item:-rotate-12`} />
                                <div className="transition-transform group-hover/item:translate-x-1">
                                  <div className="font-medium text-slate-900">{sol.name}</div>
                                  <div className="text-[10px] text-slate-400">{sol.desc}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    ref={(el) => {
                      linkRefs.current[item.id] = el;
                    }}
                    className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-colors ${
                      active === item.id ? 'text-[#0d7cae]' : 'hover:text-slate-950'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full bg-[#0d7cae] transition-all duration-300 ${
                        active === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0 -mr-3'
                      }`}
                    />
                    <RollText>{item.label}</RollText>
                  </a>
                )
              )}
            </nav>
          </div>

          {/* 3. GET A QUOTE BUTTON (Smoothly glides inward from the far right into the unified pill) */}
          <div className="shrink-0 flex items-center pointer-events-auto">
            <button
              onClick={() => onOpenRfq()}
              className="group flex items-center gap-1.5 bg-[#0d7cae] hover:bg-[#0b6a95] text-white px-4 sm:px-5 py-2 rounded-full text-xs font-normal shadow-md shadow-[#0d7cae]/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <RollText>Get a Quote</RollText>
              <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:rotate-45" />
            </button>
          </div>

        </div>

        {/* ================================================================= */}
        {/* MOBILE NAV CONTAINER (md:hidden)                                  */}
        {/* ================================================================= */}
        <div
          className={`md:hidden pointer-events-auto mx-auto flex items-center justify-between transition-all duration-300 ease-out ${
            isScrolled
              ? 'max-w-md bg-white/95 rounded-full border border-slate-200/90 shadow-md px-4 py-2'
              : 'w-full bg-transparent border-transparent px-1 py-1'
          }`}
        >
          <a href="#" aria-label="Masar Arabia — home" className="flex items-center py-1.5 pr-2">
            <Image
              src="/images/logo-dark.png"
              alt="Masar Arabia"
              width={130}
              height={30}
              style={{ width: 'auto' }}
              className="h-7 w-auto object-contain"
              priority
            />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenRfq()}
              className="flex items-center gap-1.5 h-10 bg-[#0d7cae] text-white px-4 rounded-full text-[13px] font-bold shadow-[0_8px_20px_-8px_rgba(13,124,174,0.8)] active:scale-95 transition-transform"
            >
              <span>Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-800 shadow-2xs active:scale-95 transition-transform"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </header>

      {/* Mobile menu — full-screen panel with large, thumb-friendly links */}
      {mobileMenuOpen && (
        <div className="mx-menu-in fixed inset-0 z-[60] md:hidden bg-white flex flex-col" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100">
            <Image src="/images/logo-dark.png" alt="Masar Arabia" width={140} height={32} style={{ width: 'auto' }} className="h-8 w-auto object-contain" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 active:scale-95 transition-transform"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-4" data-lenis-prevent>
            {MOBILE_LINKS.map((l, i) => {
              const on = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${80 + i * 45}ms` }}
                  className={`mx-item-in flex items-center justify-between py-3.5 border-b border-slate-100 ${on ? 'text-[#0d7cae]' : 'text-slate-900'}`}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-2xl font-black uppercase tracking-tight">{l.label}</span>
                  </span>
                  <ArrowUpRight className={`w-5 h-5 ${on ? 'text-[#0d7cae]' : 'text-slate-300'}`} />
                </a>
              );
            })}
          </nav>

          <div className="px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t border-slate-100 space-y-3 bg-[#f6f9fc]">
            <div className="grid grid-cols-2 gap-3">
              <a href={CONTACT.phoneHref} className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-900">
                <PhoneCall className="w-4 h-4 text-[#0d7cae]" /> Call
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-900">
                <Mail className="w-4 h-4 text-[#0d7cae]" /> Email
              </a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfq();
              }}
              className="w-full h-12 rounded-2xl bg-[#0d7cae] text-white text-sm font-bold shadow-md shadow-[#0d7cae]/25 flex items-center justify-center gap-2"
            >
              Request a Quote <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
