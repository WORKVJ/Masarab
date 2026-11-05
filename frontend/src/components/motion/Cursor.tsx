'use client';

/**
 * Precision cursor: a crisp dot plus a lagging ring that swells over interactive
 * elements and shows a label over anything with data-cursor="Label".
 * Only rendered for fine pointers (mouse / trackpad) without reduced motion.
 */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, summary, [data-cursor]';

export default function Cursor() {
  // This component is loaded with ssr:false, so window is always available here
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    let visible = false;
    let hoverEl: Element | null = null;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = (e.target as Element | null)?.closest?.(INTERACTIVE) ?? null;
      if (target !== hoverEl) {
        hoverEl = target;
        const text = target?.getAttribute('data-cursor') ?? '';
        if (label) label.textContent = text;
        ring.classList.toggle('is-hover', !!target);
        ring.classList.toggle('has-label', !!text);
        dot.classList.toggle('is-hover', !!target);
      }
    };

    const onDown = () => gsap.to(ring, { scale: 0.82, duration: 0.15 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="mx-cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="mx-cursor-label" />
      </div>
      <div ref={dotRef} className="mx-cursor-dot" aria-hidden="true" />
    </>
  );
}
