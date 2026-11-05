'use client';

import React, { useEffect, useState } from 'react';
import LogoMark from '@/components/motion/LogoMark';
import { markPreloaderSeen, shouldShowPreloader } from '@/lib/preloader';

/**
 * Branded intro: the logo assembles like a sunrise (blue base → red → sun → rays),
 * the wordmark reveals, then the white curtain lifts into the hero.
 *
 * Server-rendered + pure CSS timeline (see .mx-pl in globals.css): visible from first paint,
 * exits on its own even without JavaScript. JS only marks it "seen" and removes it afterwards.
 */
export default function Preloader() {
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!shouldShowPreloader()) {
      const id = requestAnimationFrame(() => setRemoved(true));
      return () => cancelAnimationFrame(id);
    }
    markPreloaderSeen();
    const t = setTimeout(() => setRemoved(true), 2900);
    return () => clearTimeout(t);
  }, []);

  if (removed) return null;

  return (
    <div className="mx-pl" aria-hidden="true">
      <div className="mx-pl-glow" />
      <div className="mx-pl-center">
        <div className="mx-pl-mark">
          <span className="mx-pl-halo" />
          <LogoMark className="mx-pl-logo" />
        </div>

        <div className="mx-pl-word">
          {'MASAR ARABIA'.split('').map((ch, i) => (
            <span key={i} style={{ animationDelay: `${780 + i * 35}ms` }}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </div>

        <div className="mx-pl-bar">
          <span />
        </div>
        <p className="mx-pl-tag">Leading Supplier of Industrial Solutions</p>
      </div>
    </div>
  );
}
