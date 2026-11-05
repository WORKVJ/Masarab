import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Offset applied when scrolling to a section so the fixed navbar never covers its heading. */
export const NAV_OFFSET = -96;

/**
 * Smoothly scroll to a section id, element, or pixel offset.
 * Uses the global Lenis instance when smooth scrolling is active and
 * falls back to native scrolling (e.g. reduced-motion users).
 */
export function scrollToTarget(target: string | HTMLElement | number, offset = NAV_OFFSET) {
  if (typeof window === 'undefined') return;

  const el =
    typeof target === 'string'
      ? document.getElementById(target.replace(/^#/, ''))
      : target;
  if (el === null) return;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement | number, {
      offset: typeof el === 'number' ? 0 : offset,
      duration: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }

  if (typeof el === 'number') {
    window.scrollTo({ top: el, behavior: 'smooth' });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
