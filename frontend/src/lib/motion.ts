/** Offset applied when scrolling to a section so the fixed navbar never covers its heading. */
export const NAV_OFFSET = -96;

/**
 * Smoothly scroll to a section id, element, or pixel offset using the browser's own smooth scrolling.
 */
export function scrollToTarget(target: string | HTMLElement | number, offset = NAV_OFFSET) {
  if (typeof window === 'undefined') return;

  const el = typeof target === 'string' ? document.getElementById(target.replace(/^#/, '')) : target;
  if (el === null) return;

  if (typeof el === 'number') {
    window.scrollTo({ top: el, behavior: 'smooth' });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
