'use client';

import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCT_RANGE, RANGE_GROUPS, RangeGroup } from '@/lib/masarContent';
import { useCycle, useInView } from '@/lib/useCycle';
import SectionHeader from './SectionHeader';
import ProductIcon from './ProductIcons';
import RollText from '@/components/motion/RollText';
import { useRequestQuote } from '@/lib/useRequestQuote';

/** Per-card 3D tilt toward the pointer — writes CSS vars on the hovered card only (no React re-render). */
function onTiltMove(e: React.PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return;
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const nx = (e.clientX - r.left) / r.width - 0.5;
  const ny = (e.clientY - r.top) / r.height - 0.5;
  card.style.setProperty('--rx', `${(-ny * 8).toFixed(2)}deg`);
  card.style.setProperty('--ry', `${(nx * 8).toFixed(2)}deg`);
  // Unitless pointer position (-0.5…0.5) for the photo parallax and the cursor glare
  card.style.setProperty('--px', nx.toFixed(3));
  card.style.setProperty('--py', ny.toFixed(3));
}
function onTiltLeave(e: React.PointerEvent<HTMLElement>) {
  const s = e.currentTarget.style;
  s.setProperty('--rx', '0deg');
  s.setProperty('--ry', '0deg');
  s.setProperty('--px', '0');
  s.setProperty('--py', '0');
}

const HUD_CORNERS = ['tl', 'tr', 'bl', 'br'] as const;

export default function ProductRangeSection() {
  const onRequestQuote = useRequestQuote();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, 0.1);
  const [filter, setFilter] = useState<RangeGroup | 'all'>('all');
  const [hovering, setHovering] = useState(false);
  // Phones: show 8 cards first (the rest stay in the HTML, just CSS-hidden, so SEO is unaffected)
  const [showAllMobile, setShowAllMobile] = useState(false);
  const MOBILE_PREVIEW = 8;

  // The spotlight only travels through the products that match the current filter
  const matching = useMemo(
    () => PRODUCT_RANGE.map((p, i) => (filter === 'all' || p.group === filter ? i : -1)).filter((i) => i >= 0),
    [filter]
  );
  const [step, setStep] = useCycle(matching.length, 1500, inView && !hovering);
  const activeIndex = matching[step % matching.length];

  // FLIP: when the filter changes, matching cards move to the front (CSS `order`, so the
  // HTML order — and SEO — never changes) and every card glides from its old spot to its new one.
  const listRef = useRef<HTMLUListElement>(null);
  const prevRects = useRef<Map<string, DOMRect>>(new Map());

  const pickFilter = (id: RangeGroup | 'all') => {
    if (id === filter) return;
    const items = listRef.current?.querySelectorAll<HTMLElement>('li[data-id]') ?? [];
    prevRects.current = new Map(Array.from(items).map((li) => [li.dataset.id!, li.getBoundingClientRect()]));
    setFilter(id);
    setStep(0);
  };

  useLayoutEffect(() => {
    const before = prevRects.current;
    if (!before.size || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    listRef.current?.querySelectorAll<HTMLElement>('li[data-id]').forEach((li) => {
      const old = before.get(li.dataset.id!);
      if (!old) return;
      const now = li.getBoundingClientRect();
      const dx = old.left - now.left;
      const dy = old.top - now.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      li.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }], {
        duration: 650,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      });
    });
    prevRects.current = new Map();
  }, [filter]);

  return (
    <section ref={sectionRef} id="product-range" className="relative py-20 sm:py-24 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 mx-dark-grid pointer-events-none" aria-hidden="true" />
      <div className="mx-orb-drift absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[#0d7cae]/12 blur-[120px] pointer-events-none" />
      <div className="mx-orb-drift-rev absolute top-1/2 -right-40 w-[460px] h-[460px] rounded-full bg-orange-500/[0.06] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            tone="dark"
            eyebrow="Product Range"
            title={
              <>
                Wide Range of <span className="text-sky-400">World Class Products</span>
              </>
            }
            intro="Pipes, fittings, valves, drainage and civil products — stocked and supplied across the Kingdom."
          />

          <div className="lg:max-w-md flex flex-col lg:items-end gap-3">
            {/* Filter chips — non-matching cards dim instead of disappearing (no layout jump, all products stay in the page) */}
            <div data-anim="up" className="flex flex-wrap gap-2 lg:justify-end" role="group" aria-label="Filter products">
              {RANGE_GROUPS.map((g) => {
                const on = filter === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => pickFilter(g.id)}
                    aria-pressed={on}
                    className={`group rounded-full border px-4 h-10 sm:h-auto sm:px-3.5 sm:py-1.5 text-[13px] sm:text-xs transition-[background-color,border-color,color,box-shadow,scale] duration-300 active:scale-95 cursor-pointer ${
                      on
                        ? 'bg-[#0d7cae] border-[#0d7cae] text-white shadow-[0_8px_18px_-8px_rgba(13,124,174,0.8)]'
                        : 'bg-white/5 border-white/15 text-white/75 hover:border-sky-400/60 hover:text-white'
                    }`}
                  >
                    <RollText>{g.label}</RollText>
                  </button>
                );
              })}
            </div>
            <p data-anim="up" className="text-xs text-white/45 font-mono" aria-live="polite">
              Showing{' '}
              <span key={matching.length} className="mx-caption-in inline-block font-bold text-sky-400">
                {String(matching.length).padStart(2, '0')}
              </span>{' '}
              of {PRODUCT_RANGE.length} products
            </p>
          </div>
        </div>

        <ul
          ref={listRef}
          className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {PRODUCT_RANGE.map((p, i) => {
            const match = filter === 'all' || p.group === filter;
            const active = i === activeIndex;
            return (
              <li
                key={p.id}
                data-id={p.id}
                data-anim="flip"
                className={`[perspective:900px] ${
                  filter === 'all' && !showAllMobile && i >= MOBILE_PREVIEW ? 'max-sm:hidden' : ''
                }`}
                style={{ order: match ? i : 100 + i }}
              >
                <div
                  key={match ? `on-${filter}` : 'off'}
                  className={`h-full transition-[opacity,scale,filter] duration-500 ${
                    match ? 'mx-pop opacity-100 scale-100' : 'opacity-30 scale-[0.97] grayscale'
                  }`}
                >
                  <article
                    onPointerMove={onTiltMove}
                    onPointerLeave={onTiltLeave}
                    onMouseEnter={() => match && setStep(matching.indexOf(i))}
                    className={`mx-card-tilt group relative h-full overflow-hidden rounded-[22px] border bg-white/[0.04] p-3 sm:p-4 flex flex-col transition-[border-color,box-shadow,translate,background-color] duration-500 ${
                      active
                        ? 'is-active border-sky-400/50 bg-white/[0.07] -translate-y-1.5 shadow-[0_24px_50px_-24px_rgba(56,189,248,0.45)]'
                        : 'border-white/10 hover:border-white/25'
                    }`}
                  >
                    {/* Photo tile (falls back to the line illustration when a product has no photo) */}
                    <div
                      className={`relative rounded-2xl bg-gradient-to-br from-[#16191d] via-[#0e1013] to-[#090a0c] border border-white/[0.06] flex items-center justify-center overflow-hidden ${
                        p.image ? 'aspect-[5/4]' : 'h-28 sm:h-36'
                      }`}
                    >
                      {p.image ? (
                        <>
                          {/* Dimmed and slightly desaturated at rest so light studio shots sit in the dark section;
                              the spotlighted / hovered card comes up to full colour */}
                          {/* .mx-tile-photo: shutter-reveal zoom (MotionEngine) · .mx-tile-par: pointer parallax (CSS) */}
                          <div className="mx-tile-photo absolute inset-0">
                            <div className="mx-tile-par absolute inset-0">
                              <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                sizes="(min-width: 1024px) 300px, 50vw"
                                className={`object-cover transition-[scale,filter] duration-700 ease-out group-hover:scale-[1.06] group-hover:brightness-100 group-hover:saturate-100 ${
                                  active ? 'scale-[1.06] brightness-100 saturate-100' : 'brightness-[0.72] saturate-[0.8]'
                                }`}
                              />
                            </div>
                          </div>
                          {/* Dark vignette: blends the photo edges into the card and keeps the labels legible */}
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/35 pointer-events-none"
                          />
                          {/* Brand-blue wash on the spotlighted card */}
                          <span
                            aria-hidden="true"
                            className={`absolute inset-0 bg-gradient-to-br from-[#0d7cae]/55 via-[#0d7cae]/10 to-transparent mix-blend-multiply transition-opacity duration-700 pointer-events-none ${
                              active ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                          {/* Glare that follows the cursor */}
                          <span aria-hidden="true" className="mx-tile-glare" />
                          {/* Light sheen that sweeps across on hover */}
                          <span aria-hidden="true" className="mx-tile-sheen absolute inset-0 pointer-events-none" />
                          {/* Inspection scan line — sweeps down each time the card is spotlighted */}
                          <span aria-hidden="true" className="mx-tile-scan" />
                          {/* Viewfinder corner brackets — snap in on the spotlighted / hovered card */}
                          {HUD_CORNERS.map((c) => (
                            <span key={c} aria-hidden="true" data-c={c} className="mx-hud-c" />
                          ))}
                          {/* Colour shutter for the scroll-in reveal (idle unless MotionEngine runs it) */}
                          <span aria-hidden="true" className="mx-tile-shutter" />
                        </>
                      ) : (
                        <>
                          <span
                            aria-hidden="true"
                            className={`absolute inset-0 bg-gradient-to-br from-[#0d7cae]/45 via-[#0a2236] to-[#0b0d10] transition-opacity duration-700 ${
                              active ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                          <ProductIcon
                            id={p.id}
                            className={`mx-ico mx-ico-dark relative w-20 h-20 sm:w-24 sm:h-24 text-sky-300 transition-transform duration-500 ${
                              active ? 'scale-110' : ''
                            }`}
                          />
                        </>
                      )}
                      <svg
                        viewBox="0 0 200 200"
                        className={`mx-tile-rings absolute -bottom-12 -right-12 w-40 h-40 fill-none pointer-events-none ${
                          p.image ? 'text-sky-200/35 mix-blend-screen' : 'text-sky-300/15'
                        }`}
                        aria-hidden="true"
                      >
                        <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 5" />
                        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" />
                      </svg>
                      {/* Inner hairline — turns sky blue on the spotlighted card */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-0 rounded-2xl ring-1 ring-inset transition-colors duration-500 pointer-events-none ${
                          active ? 'ring-sky-400/45' : 'ring-white/[0.08]'
                        }`}
                      />
                      <span
                        className={`absolute font-mono text-[10px] transition-colors duration-500 ${
                          p.image
                            ? 'z-[3] top-3.5 left-4 rounded-full bg-black/55 backdrop-blur-sm px-1.5 py-0.5 leading-none'
                            : 'top-2.5 left-3'
                        } ${active ? 'text-sky-300' : p.image ? 'text-white/70' : 'text-white/35'}`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {/* "live" dot on the spotlighted card */}
                      <span
                        aria-hidden="true"
                        className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-emerald-500 transition-[opacity,scale] duration-500 ${
                          active ? 'opacity-100 scale-100 mx-ping-dot' : 'opacity-0 scale-0'
                        }`}
                      />
                    </div>

                    <h3 className="mt-3 sm:mt-4 text-[13px] sm:text-[15px] font-bold text-white leading-snug">{p.name}</h3>
                    <p className="mt-1.5 text-[12px] sm:text-[13px] text-white/55 leading-relaxed flex-1 hidden sm:block">{p.blurb}</p>

                    <button
                      onClick={() => onRequestQuote(p.name)}
                      aria-label={`Enquire about ${p.name}`}
                      className="mt-1 self-start inline-flex items-center gap-1 py-2.5 -mb-2 text-xs font-bold text-sky-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <RollText>Enquire</RollText>
                      <ArrowUpRight
                        className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45 ${active ? 'rotate-45' : ''}`}
                      />
                    </button>

                    {/* bottom accent line — fills on the active card */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-sky-400 via-[#0d7cae] to-orange-400 transition-transform duration-700 group-hover:scale-x-100 ${
                        active ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </article>
                </div>
              </li>
            );
          })}
        </ul>

        {filter === 'all' && (
          <div className="sm:hidden mt-6 flex justify-center">
            <button
              onClick={() => setShowAllMobile((v) => !v)}
              className="h-12 px-6 rounded-full border border-white/20 bg-white/5 text-sm font-bold text-white active:scale-95 transition-transform"
            >
              {showAllMobile ? 'Show fewer products' : `Show all ${PRODUCT_RANGE.length} products`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
