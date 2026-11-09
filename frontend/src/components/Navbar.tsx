'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown, ArrowUpRight, Menu, X,
  PhoneCall, Mail, LayoutGrid,
} from 'lucide-react';
import { CATEGORIES, CONTACT } from '@/lib/masarContent';
import { DIVISION_THEMES } from '@/lib/divisionThemes';
import { NAV, categoryHref, isActive } from '@/lib/routes';
import RollText from '@/components/motion/RollText';

/** One-line summary per division in the Products dropdown (icon + colour come from the division themes). */
const CATEGORY_DESC: Record<string, string> = {
  cooling: 'Cooling Towers, Chillers & AHUs',
  water: 'EDI, EDR & Membrane Degassing',
  chemical: 'Alcohols, Aromatics & Ketones',
  electrical: 'Gratings, Breakers & VFDs',
  instrumentation: 'Moisture, Air Quality & Calibrators',
  mechanical: 'Pumps, Valves & Actuators',
  'pipe-fittings': 'Plates, Sheets & Special Fittings',
  safety: 'PPE, Fall Protection & FR Gear',
};

export default function Navbar() {
  const pathname = usePathname() || '/';
  // on a division page the quote buttons take that division's colour
  const division = CATEGORIES.find((c) => pathname === categoryHref(c.slug));
  const quoteStyle = division ? { background: DIVISION_THEMES[division.id]?.accent } : undefined;
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Home (video hero) and division pages open on a dark header: show the white logo until the bar docks
  const darkTop = pathname === '/' || pathname.startsWith('/products/');
  const logoSrc = darkTop && !isScrolled ? '/images/logo-white.png' : '/images/logo-dark.png';
  const [pill, setPill] = useState({ x: 0, width: 0 });
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLElement | null>>({});
  const activeHref = NAV.find((n) => isActive(pathname, n.href))?.href ?? '';

  // Close menus whenever the page changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }

  // Lock page scroll while the mobile menu is open; Escape closes it
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen]);

  // Slide the pill under the current page's link (re-measured after the bar docks/undocks)
  useLayoutEffect(() => {
    const measure = () => {
      const link = activeHref ? linkRefs.current[activeHref] : null;
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
  }, [activeHref, isScrolled]);

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

  return (
    <>
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
        {/* ── Desktop: continuous fluid docking bar ── */}
        <div
          className={`hidden md:flex items-center justify-between mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled
              ? 'max-w-[960px] lg:max-w-[1000px] bg-white/95 rounded-full border border-slate-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.08)] px-4 py-1.5'
              : 'max-w-7xl bg-transparent border-transparent shadow-none px-2 py-0'
          }`}
        >
          <div className="shrink-0 flex items-center pointer-events-auto">
            <Link href="/" aria-label="Masar Arabia — home" className="flex items-center group py-0.5">
              <Image
                src={logoSrc}
                alt="Masar Arabia"
                width={150}
                height={34}
                style={{ width: 'auto' }}
                className="h-7.5 lg:h-8 w-auto object-contain object-left transition-transform group-hover:scale-[1.02]"
                priority
              />
            </Link>
          </div>

          <div
            className={`flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto ${
              isScrolled ? 'bg-transparent border-transparent shadow-none px-0 py-0' : 'bg-white/95 rounded-full border border-slate-200/90 shadow-sm px-5 py-2'
            }`}
          >
            <nav
              ref={navRef}
              aria-label="Main"
              className="relative flex items-center gap-1 lg:gap-1.5 text-[12.5px] lg:text-[13px] font-normal text-slate-700 whitespace-nowrap"
            >
              {/* Sliding current-page pill */}
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-0 h-7 rounded-full bg-[#e0f2fe] transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                style={{ width: pill.width, transform: `translate(${pill.x}px, -50%)`, opacity: pill.width ? 1 : 0 }}
              />

              {NAV.map((item) => {
                const on = item.href === activeHref;
                const cls = `group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-colors ${
                  on ? 'text-[#0d7cae]' : 'hover:text-slate-950'
                }`;
                if (!item.dropdown) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={on ? 'page' : undefined}
                      ref={(el) => {
                        linkRefs.current[item.href] = el;
                      }}
                      className={cls}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full bg-[#0d7cae] transition-all duration-300 ${
                          on ? 'opacity-100 scale-100' : 'opacity-0 scale-0 -mr-3'
                        }`}
                      />
                      <RollText>{item.label}</RollText>
                    </Link>
                  );
                }
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setSolutionsOpen(true)}
                    onMouseLeave={() => setSolutionsOpen(false)}
                  >
                    <Link
                      href={item.href}
                      aria-current={on ? 'page' : undefined}
                      aria-haspopup="true"
                      aria-expanded={solutionsOpen}
                      ref={(el) => {
                        linkRefs.current[item.href] = el;
                      }}
                      onFocus={() => setSolutionsOpen(true)}
                      className={cls}
                    >
                      <RollText>{item.label}</RollText>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                    </Link>

                    {solutionsOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[340px] mx-dropdown-in">
                        <div className="bg-white rounded-2xl p-2.5 border border-slate-200/90 shadow-xl grid grid-cols-1 gap-1">
                          {CATEGORIES.map((c, i) => {
                            const theme = DIVISION_THEMES[c.id];
                            const Icon = theme.icon;
                            const here = pathname === categoryHref(c.slug);
                            return (
                              <Link
                                key={c.id}
                                href={categoryHref(c.slug)}
                                style={{ animationDelay: `${i * 30}ms` }}
                                className={`mx-item-in group/item flex items-center gap-2.5 p-2 rounded-xl text-xs transition-colors ${
                                  here ? 'bg-[#f0f9ff]' : 'hover:bg-slate-50'
                                }`}
                              >
                                <Icon style={{ color: theme.accent }} className="w-4 h-4 transition-transform group-hover/item:scale-125 group-hover/item:-rotate-12" />
                                <div className="transition-transform group-hover/item:translate-x-1">
                                  <div className={`font-medium ${here ? 'text-[#0d7cae]' : 'text-slate-900'}`}>{c.name}</div>
                                  <div className="text-[10px] text-slate-400">{CATEGORY_DESC[c.id]}</div>
                                </div>
                              </Link>
                            );
                          })}
                          <Link
                            href="/products"
                            className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-[#0d7cae] hover:bg-[#0b6a95] text-white text-xs font-bold py-2.5 transition-colors"
                          >
                            <LayoutGrid className="w-3.5 h-3.5" /> All products
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="shrink-0 flex items-center pointer-events-auto">
            <Link
              href="/contact"
              style={quoteStyle}
              className="group flex items-center gap-1.5 bg-[#0d7cae] hover:bg-[#0b6a95] text-white px-4 sm:px-5 py-2 rounded-full text-xs font-normal shadow-md shadow-[#0d7cae]/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <RollText>Get a Quote</RollText>
              <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
        </div>

        {/* ── Mobile bar ── */}
        <div
          className={`md:hidden pointer-events-auto mx-auto flex items-center justify-between transition-all duration-300 ease-out ${
            isScrolled
              ? 'max-w-md bg-white/95 rounded-full border border-slate-200/90 shadow-md px-4 py-2'
              : 'w-full bg-transparent border-transparent px-1 py-1'
          }`}
        >
          <Link href="/" aria-label="Masar Arabia — home" className="flex items-center py-1.5 pr-2">
            <Image src={logoSrc} alt="Masar Arabia" width={130} height={30} style={{ width: 'auto' }} className="h-7 w-auto object-contain" priority />
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              style={quoteStyle}
              className="flex items-center gap-1.5 h-10 bg-[#0d7cae] text-white px-4 rounded-full text-[13px] font-bold shadow-[0_8px_20px_-8px_rgba(13,124,174,0.8)] active:scale-95 transition-transform"
            >
              <span>Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </Link>
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

      {/* ── Mobile menu — full-screen panel with large, thumb-friendly links ── */}
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

          <nav className="flex-1 overflow-y-auto px-5 py-4" aria-label="Mobile">
            {[{ href: '/', label: 'Home' }, ...NAV].map((l, i) => {
              const on = l.href === '/' ? pathname === '/' : isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={on ? 'page' : undefined}
                  style={{ animationDelay: `${80 + i * 45}ms` }}
                  className={`mx-item-in flex items-center justify-between py-3.5 border-b border-slate-100 ${on ? 'text-[#0d7cae]' : 'text-slate-900'}`}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-2xl font-black uppercase tracking-tight">{l.label}</span>
                  </span>
                  <ArrowUpRight className={`w-5 h-5 ${on ? 'text-[#0d7cae]' : 'text-slate-300'}`} />
                </Link>
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
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-12 rounded-2xl bg-[#0d7cae] text-white text-sm font-bold shadow-md shadow-[#0d7cae]/25 flex items-center justify-center gap-2"
            >
              Request a Quote <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
