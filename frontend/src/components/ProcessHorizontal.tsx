'use client';

/**
 * ProcessHorizontal — "RFQ to site delivery" journey.
 * Desktop: the section pins and the step cards travel horizontally as you scroll,
 * with a progress rail and a large step counter.
 * Mobile / reduced motion: a clean vertical stack.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardList, DraftingCompass, ShieldCheck, Factory, Truck, ArrowUpRight } from 'lucide-react';

interface ProcessHorizontalProps {
  onOpenRfq: () => void;
}

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Submit Your RFQ',
    body: 'Share drawings, BOQs or a simple product list. Every request gets a tracked reference number and a dedicated estimator.',
    tag: 'Instant reference ID',
  },
  {
    icon: DraftingCompass,
    title: 'Engineering Review',
    body: 'Our team checks loads, spans, pressure classes and material compatibility against your project specification before pricing.',
    tag: 'Spec compliance check',
  },
  {
    icon: ShieldCheck,
    title: 'Sourcing & QA',
    body: 'Materials are sourced from approved mills with full heat-number traceability, EN 10204 3.1 certificates and third-party inspection on request.',
    tag: 'MTC 3.1 / TPI',
  },
  {
    icon: Factory,
    title: 'Fabrication & Cutting',
    body: 'Gratings, plates and pipe spools are cut, banded and finished to your drawings, then tagged by area for easy installation.',
    tag: 'Cut-to-drawing',
  },
  {
    icon: Truck,
    title: 'Site Delivery',
    body: 'Dispatched from our Jeddah hub to sites across the Kingdom, with packing lists and documentation ready for handover.',
    tag: 'KSA-wide logistics',
  },
];

export default function ProcessHorizontal({ onOpenRfq }: ProcessHorizontalProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => track.scrollWidth - window.innerWidth + 64;
      const cards = gsap.utils.toArray<HTMLElement>('[data-step]', track);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          // <main> is a flex column, where ScrollTrigger would default pinSpacing to false
          pinSpacing: true,
          scrub: 1,
          refreshPriority: 10,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (railRef.current) railRef.current.style.transform = `scaleX(${self.progress})`;
            if (counterRef.current) {
              const idx = Math.min(STEPS.length, Math.floor(self.progress * STEPS.length) + 1);
              counterRef.current.textContent = String(idx).padStart(2, '0');
            }
          },
        },
      });

      // Each card lifts and sharpens as it travels into the viewport
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.35, scale: 0.9, rotateY: -14, transformPerspective: 1200 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'left 95%',
              end: 'left 45%',
              scrub: true,
            },
          }
        );
      });
    });

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-step]', track).forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="mx-process relative overflow-hidden bg-[#050b17] text-white">
      {/* Ambient light + grid */}
      <div className="absolute inset-0 mx-process-grid pointer-events-none" aria-hidden="true" />
      <div
        className="absolute -top-40 -left-40 w-[620px] h-[620px] rounded-full bg-[#0d7cae]/30 blur-[140px] pointer-events-none mx-aurora-a"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-48 right-0 w-[560px] h-[560px] rounded-full bg-orange-500/20 blur-[140px] pointer-events-none mx-aurora-b"
        aria-hidden="true"
      />

      <div className="relative lg:h-screen flex flex-col justify-center py-20 lg:py-0">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-sky-300 backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              How we deliver
            </span>
            <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] leading-[0.95]">
              From RFQ to <span className="mx-gradient-text">site delivery</span>
            </h2>
          </div>
          <div className="hidden lg:flex items-end gap-4">
            <span ref={counterRef} className="font-mono text-7xl font-black leading-none text-white tabular-nums">
              01
            </span>
            <span className="font-mono text-xl text-white/35 pb-1.5">/ {String(STEPS.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mx-track flex flex-col lg:flex-row gap-5 lg:gap-7 will-change-transform"
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                data-step
                data-spotlight
                className="mx-step-card group relative shrink-0 w-full lg:w-[420px] xl:w-[460px] rounded-[28px] p-7 sm:p-9 flex flex-col justify-between min-h-[320px] lg:min-h-[400px]"
              >
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0d7cae] to-[#0369a1] flex items-center justify-center shadow-[0_12px_40px_-8px_rgba(13,124,174,0.7)] group-hover:rotate-[-8deg] group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="mx-step-num font-black leading-none">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <span className="inline-block text-[10px] font-mono uppercase tracking-[0.18em] text-orange-400 mb-3">
                    {step.tag}
                  </span>
                  <h3 className="text-2xl sm:text-[28px] font-black uppercase tracking-tight leading-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">{step.body}</p>
                </div>
              </article>
            );
          })}

          {/* Closing CTA card */}
          <article
            data-step
            className="relative shrink-0 w-full lg:w-[420px] rounded-[28px] p-9 flex flex-col justify-center items-start min-h-[320px] lg:min-h-[400px] bg-gradient-to-br from-[#0d7cae] via-[#0284c7] to-[#0369a1] overflow-hidden"
          >
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full border-[28px] border-white/10" aria-hidden="true" />
            <h3 className="text-3xl font-black uppercase leading-[0.95] tracking-tight mb-4">
              Ready to start your project?
            </h3>
            <p className="text-sm text-white/80 mb-7 max-w-xs">
              Send your requirements and our estimators will take it from here.
            </p>
            <button
              onClick={onOpenRfq}
              data-cursor="RFQ"
              className="rounded-full bg-white text-slate-950 px-7 py-3 text-sm font-bold flex items-center gap-2 shadow-xl hover:bg-orange-50 cursor-pointer"
            >
              Request a Quote <ArrowUpRight className="w-4 h-4" />
            </button>
          </article>
        </div>

        {/* Progress rail */}
        <div className="hidden lg:block max-w-7xl w-full mx-auto px-8 mt-12">
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div
              ref={railRef}
              className="h-full w-full origin-left bg-gradient-to-r from-sky-400 via-[#0d7cae] to-orange-500"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
