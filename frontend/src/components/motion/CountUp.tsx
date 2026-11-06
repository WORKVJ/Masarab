'use client';

import { useEffect, useRef, useState } from 'react';
import { heroIntroDelay } from '@/lib/preloader';

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** zero-pad to at least this many digits, e.g. 2 → "08" */
  minDigits?: number;
  /** ms to wait after entering the viewport (e.g. to sync with an intro animation) */
  delay?: number;
  /** when true, `delay` is counted from the start of the hero intro (after the branded loader) */
  afterIntro?: boolean;
  duration?: number;
}

/**
 * SEO-safe count-up: the server HTML always contains the real final value.
 * In the browser the number resets to 0 (while still unseen / hidden by an intro)
 * and counts up once it scrolls into view.
 */
export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  minDigits = 0,
  delay = 0,
  duration = 1600,
  afterIntro = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    raf = requestAnimationFrame(() => setDisplay(0));

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const wait = delay + (afterIntro ? heroIntroDelay() * 1000 : 0);
        timer = setTimeout(() => {
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            setDisplay(value * eased);
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        }, wait);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [value, delay, duration, afterIntro]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toFixed(decimals).padStart(minDigits, '0')}
      {suffix}
    </span>
  );
}
