'use client';

import { RefObject, useEffect, useState } from 'react';

/** True while the element is (at least partly) on screen. */
export function useInView(ref: RefObject<Element | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

/**
 * Advances an index every `ms` while `running` is true.
 * Manually setting the index restarts the timer, so a hover/click "holds" that item for a full beat.
 */
export function useCycle(length: number, ms: number, running: boolean) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!running || length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), ms);
    return () => clearInterval(id);
  }, [length, ms, running, index]);
  return [index, setIndex] as const;
}
