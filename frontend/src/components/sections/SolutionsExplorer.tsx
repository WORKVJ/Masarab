'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '@/lib/useCycle';
import { CATEGORIES } from '@/lib/masarContent';
import SectionHeader from './SectionHeader';
import RollText from '@/components/motion/RollText';

interface SolutionsExplorerProps {
  onRequestQuote: (productName: string) => void;
}

const SAFETY_PREVIEW = 18;
const AUTOPLAY_MS = 7000;

export default function SolutionsExplorer({ onRequestQuote }: SolutionsExplorerProps) {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const [showAll, setShowAll] = useState(false);
  // Deck motion: which way the new card arrives (next = from below, prev = from above)
  const [dir, setDir] = useState<'next' | 'prev'>('next');
  const activeIndex = CATEGORIES.findIndex((c) => c.id === activeId);

  // Autoplay with a sweeping progress bar — pauses on hover/off-screen, and stops for good once the
  // visitor picks a category themselves (never yank content away from someone who is reading).
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, 0.25);
  const [hovering, setHovering] = useState(false);
  const [userPicked, setUserPicked] = useState(false);
  const autoplay = !userPicked;
  const running = autoplay && inView && !hovering;

  // Sliding pill that travels between tabs (works with wrapped rows and mobile horizontal scroll)
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pill, setPill] = useState({ x: 0, y: 0, w: 0, h: 0 });
  useLayoutEffect(() => {
    const measure = () => {
      const el = tabRefs.current[activeId];
      if (!el) return;
      setPill({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
      const box = tabsRef.current;
      if (box && box.scrollWidth > box.clientWidth) {
        box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.offsetWidth / 2, behavior: 'smooth' });
      }
    };
    const raf = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, [activeId]);

  const goTo = (index: number, manual: boolean, forced?: 'next' | 'prev') => {
    const next = (index + CATEGORIES.length) % CATEGORIES.length;
    if (next === activeIndex) return;
    setDir(forced ?? (next > activeIndex ? 'next' : 'prev'));
    setActiveId(CATEGORIES[next].id);
    setShowAll(false);
    if (manual) setUserPicked(true);
  };
  const select = (id: string) => goTo(CATEGORIES.findIndex((c) => c.id === id), true);

  useEffect(() => {
    if (!running || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => {
      setDir('next');
      setActiveId(CATEGORIES[(activeIndex + 1) % CATEGORIES.length].id);
      setShowAll(false);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [running, activeIndex]);

  // The navbar "Products" dropdown jumps straight to a category
  useEffect(() => {
    const onPick = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (CATEGORIES.some((c) => c.id === id)) {
        setActiveId(id);
        setShowAll(false);
        setUserPicked(true);
      }
    };
    window.addEventListener('masar:category', onPick);
    return () => window.removeEventListener('masar:category', onPick);
  }, []);

  return (
    <section ref={sectionRef} id="solutions" className="relative py-20 sm:py-28 bg-[#f6f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Our Products"
            title={
              <>
                Eight Disciplines. <span className="text-[#0d7cae]">One Trusted Supplier.</span>
              </>
            }
            intro="From cooling and water treatment to chemicals, instrumentation and workforce safety — sourced from renowned manufacturers and delivered across the Kingdom."
          />
        </div>

        {/* Category tabs */}
        <div
          ref={tabsRef}
          data-anim="up"
          className="relative mt-10 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible no-scrollbar"
          role="tablist"
          aria-label="Product categories"
        >
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 rounded-full bg-[#0d7cae] shadow-[0_8px_20px_-6px_rgba(13,124,174,0.55)] transition-[transform,width,height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
            style={{ width: pill.w, height: pill.h, transform: `translate(${pill.x}px, ${pill.y}px)`, opacity: pill.w ? 1 : 0 }}
          />
          {CATEGORIES.map((c, i) => {
            const selected = c.id === activeId;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[c.id] = el;
                }}
                role="tab"
                aria-controls={`panel-${c.id}`}
                aria-selected={selected}
                onClick={() => select(c.id)}
                className={`group relative shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm border transition-colors duration-300 cursor-pointer ${
                  selected
                    ? 'bg-transparent border-transparent text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:text-slate-950'
                }`}
              >
                <span className={`relative font-mono text-[11px] ${selected ? 'text-sky-100' : 'text-slate-400'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative">
                  <RollText>{c.name}</RollText>
                </span>
              </button>
            );
          })}
        </div>

        {/* Autoplay progress — sweeps across, then the deck advances */}
        <div className={`mt-3 h-[3px] rounded-full bg-slate-200/70 overflow-hidden transition-opacity duration-500 ${autoplay ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
          {autoplay && (
            <span
              key={activeId}
              className="mx-sweep-bar block h-full origin-left bg-gradient-to-r from-sky-400 to-[#0d7cae]"
              style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: running ? 'running' : 'paused' }}
            />
          )}
        </div>

        <div
          className="relative [perspective:1400px]"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocusCapture={() => setHovering(true)}
          onBlurCapture={() => setHovering(false)}
        >
        {/* Vertical pagination dots (desktop) */}
        <div className="hidden xl:flex flex-col gap-2 absolute -right-8 top-1/2 -translate-y-1/2 z-10" aria-label="Choose category">
          {CATEGORIES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => select(c.id)}
              aria-label={c.name}
              className={`w-1.5 rounded-full transition-[height,background-color] duration-500 cursor-pointer ${
                i === activeIndex ? 'h-7 bg-[#0d7cae]' : 'h-1.5 bg-slate-300 hover:bg-sky-400'
              }`}
            />
          ))}
        </div>

        {/* All 8 category panels are rendered (so every product is in the HTML for search engines);
            inactive panels are simply hidden, and their images are lazy so they don't load until shown. */}
        {CATEGORIES.map((c) => {
          const isActive = c.id === activeId;
          const chips = c.products.every((p) => !p.description);
          return (
            <div
              key={c.id}
              id={`panel-${c.id}`}
              role="tabpanel"
              aria-label={c.name}
              hidden={!isActive}
              className={`${dir === 'next' ? 'mx-deck-in-next' : 'mx-deck-in-prev'} mt-6 grid lg:grid-cols-12 gap-6`}
            >
              {/* Banner */}
              <div className="lg:col-span-5 min-w-0">
                <div className="mx-wipe relative flex flex-col justify-end min-h-[360px] sm:min-h-[440px] lg:h-full lg:min-h-[520px] rounded-[28px] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover mx-kenburns"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/90 via-[#04121f]/30 to-transparent" />
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <span className="rounded-full bg-white/15 border border-white/25 px-3 py-1 text-[11px] font-mono text-white">
                      {String(activeIndex + 1).padStart(2, '0')} / {String(CATEGORIES.length).padStart(2, '0')}
                    </span>
                    <button
                      onClick={() => goTo(activeIndex - 1, true, 'prev')}
                      aria-label="Previous category"
                      className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/90 text-slate-900 flex items-center justify-center hover:bg-white hover:scale-110 transition-transform cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => goTo(activeIndex + 1, true, 'next')}
                      aria-label="Next category"
                      className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/90 text-slate-900 flex items-center justify-center hover:bg-white hover:scale-110 transition-transform cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mx-rise relative p-6 sm:p-8 pt-28 text-white">
                    <span className="inline-block text-[11px] font-mono uppercase tracking-[0.18em] text-sky-300 mb-2">
                      {c.products.length} Products
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">{c.headline}</h3>
                    <p className="mt-3 text-sm text-white/75 leading-relaxed">{c.intro}</p>
                    <button
                      onClick={() => onRequestQuote(c.name)}
                      className="group mt-5 inline-flex items-center gap-2 rounded-full bg-white text-slate-950 px-5 py-2.5 text-sm font-bold hover:bg-sky-50 transition-colors cursor-pointer"
                    >
                      <RollText>Request a Quote</RollText>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="lg:col-span-7 min-w-0">
                {chips ? (
                  <div className="rounded-[28px] bg-white border border-slate-200/80 p-6 sm:p-8 h-full">
                    <div className="flex flex-wrap gap-2">
                      {c.products.map((p, i) => (
                        <button
                          key={p.name}
                          hidden={!showAll && i >= SAFETY_PREVIEW}
                          onClick={() => onRequestQuote(p.name)}
                          style={{ animationDelay: `${Math.min(i, 24) * 18}ms` }}
                          className="mx-item-in group inline-flex items-center gap-1.5 rounded-full bg-[#f0f9ff] border border-sky-100 px-3.5 py-2 text-[13px] text-slate-700 hover:bg-[#0d7cae] hover:border-[#0d7cae] hover:text-white hover:-translate-y-0.5 transition-[background-color,border-color,color,translate] cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5 text-[#0d7cae] group-hover:text-white transition-transform group-hover:scale-125" />
                          {p.name}
                        </button>
                      ))}
                    </div>
                    {c.products.length > SAFETY_PREVIEW && (
                      <button
                        onClick={() => setShowAll((v) => !v)}
                        className="mt-6 text-sm font-bold text-[#0d7cae] hover:underline cursor-pointer"
                      >
                        {showAll ? 'Show fewer' : `Show all ${c.products.length} products`}
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                  <p className="sm:hidden mb-2 text-[11px] font-mono uppercase tracking-[0.14em] text-slate-400">
                    Swipe · {c.products.length} products →
                  </p>
                  <div className="flex sm:grid sm:grid-cols-2 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-3 sm:pb-0 no-scrollbar">
                    {c.products.map((p, i) => (
                      <article
                        key={p.name}
                        style={{ animationDelay: `${i * 45}ms` }}
                        className="mx-item-in group relative shrink-0 w-[82%] sm:w-auto snap-start overflow-hidden rounded-[22px] bg-white border border-slate-200/80 p-5 flex flex-col hover:border-sky-300 hover:shadow-[0_18px_40px_-20px_rgba(13,124,174,0.45)] hover:-translate-y-1 transition-all duration-300"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-sky-400 to-[#0d7cae] transition-transform duration-500 group-hover:scale-x-100"
                        />
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-[15px] font-bold text-slate-950 leading-snug">{p.name}</h4>
                          <span className="font-mono text-[11px] text-slate-300 shrink-0 transition-colors group-hover:text-[#0d7cae]">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <p className="mt-2 text-[13px] text-slate-500 leading-relaxed flex-1">{p.description}</p>
                        <button
                          onClick={() => onRequestQuote(p.name)}
                          className="mt-2 self-start inline-flex items-center gap-1 py-2.5 -mb-2 text-xs font-bold text-[#0d7cae] cursor-pointer"
                        >
                          <RollText>Enquire</RollText>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
                        </button>
                      </article>
                    ))}
                  </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
