'use client';

/**
 * KineticMarquee — two oversized type rails moving in opposite directions.
 * They drift on their own, accelerate with scroll velocity and reverse
 * when the user scrolls back up.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface KineticMarqueeProps {
  rows?: [string[], string[]];
  tone?: 'light' | 'dark';
}

const DEFAULT_ROWS: [string[], string[]] = [
  ['FRP Gratings', 'ASTM Piping', 'High-Pressure Valves', 'EN 124 Covers', 'Cooling Solutions'],
  ['Jeddah', 'Yanbu', 'Riyadh', 'Dammam', 'Jubail', 'NEOM'],
];

function Rail({ words, outline }: { words: string[]; outline?: boolean }) {
  // Content is duplicated so a -50% translate loops seamlessly
  const items = [...words, ...words];
  return (
    <div className="mx-rail" data-rail>
      {items.map((w, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className={outline ? 'mx-rail-word mx-rail-outline' : 'mx-rail-word'}>{w}</span>
          <span className="mx-rail-star" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function KineticMarquee({ rows = DEFAULT_ROWS, tone = 'light' }: KineticMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // The rails loop as compositor-driven Web Animations (they keep running smoothly even when the
    // main thread is busy). Scroll only nudges their playbackRate — no per-frame style writes.
    const rails = Array.from(root.querySelectorAll<HTMLElement>('[data-rail]'));
    const loops = rails.map((rail, i) =>
      rail.animate(
        i % 2 === 0
          ? [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }]
          : [{ transform: 'translateX(-50%)' }, { transform: 'translateX(0)' }],
        { duration: (38 + i * 6) * 1000, iterations: Infinity, easing: 'linear' }
      )
    );
    loops.forEach((l, i) => {
      l.pause();
      // start deep into the timeline so scrolling up (negative playbackRate) can never hit time 0 and stop
      l.currentTime = (38 + i * 6) * 1000 * 500;
    });

    let removeTick = () => {};
    const ctx = gsap.context(() => {
      let direction = 1;
      let boost = 0;
      let speed = 1;
      let applied = 1;
      let visible = false;
      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          visible = self.isActive;
          loops.forEach((loop) => (visible ? loop.play() : loop.pause()));
        },
        onUpdate: (self) => {
          direction = self.direction;
          boost = Math.min(Math.abs(self.getVelocity()) / 300, 5);
        },
      });
      const tick = () => {
        if (!visible) return;
        boost *= 0.92;
        speed += (direction * (1 + boost) - speed) * 0.1;
        // Only touch the animations when the rate meaningfully changes
        if (Math.abs(speed - applied) > 0.02) {
          applied = speed;
          loops.forEach((loop) => (loop.playbackRate = speed));
        }
      };
      gsap.ticker.add(tick);
      removeTick = () => gsap.ticker.remove(tick);

      // The whole band gently tilts in as it enters
      gsap.fromTo(
        root,
        { rotate: -2.2 },
        {
          rotate: 0,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'center center', scrub: true },
        }
      );
    }, root);

    return () => {
      removeTick();
      loops.forEach((l) => l.cancel());
      ctx.revert();
    };
  }, []);

  return (
    <div
      className={`mx-marquee ${tone === 'dark' ? 'mx-marquee-dark' : ''}`}
      aria-label={[...rows[0], ...rows[1]].join(', ')}
      role="marquee"
    >
      <div ref={rootRef} className="mx-marquee-band" data-velocity>
        <Rail words={rows[0]} />
        <Rail words={rows[1]} outline />
      </div>
    </div>
  );
}
