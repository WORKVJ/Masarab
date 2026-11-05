'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function EngineeringBackground() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ===================================================================== */}
      {/* 1. ARCHITECTURAL CAD BLUEPRINT GRID                                   */}
      {/* ===================================================================== */}
      <div className="absolute inset-0 cad-blueprint-grid opacity-80"></div>

      {/* ===================================================================== */}
      {/* 2. DYNAMIC LASER SCANLINE SWEEP                                       */}
      {/* ===================================================================== */}
      <div
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/70 to-transparent pointer-events-none animate-scanline"
        style={{
          boxShadow: '0 0 15px rgba(234, 88, 12, 0.4)',
        }}
      />

      {/* ===================================================================== */}
      {/* 3. LIQUID SPECULAR AMBIENT DEPTH AURAS (Executive Enterprise Lighting) */}
      {/* ===================================================================== */}
      {/* Sunrise Bronze/Orange Ambient Orb */}
      <div
        className="absolute -top-32 -right-32 w-[850px] h-[850px] rounded-full bg-gradient-to-br from-orange-500/18 via-amber-500/10 to-transparent blur-[130px] animate-aura-1"
        style={{
          transform: `translateY(${scrollY * 0.08}px)`,
        }}
      />

      {/* Deep Red Sea / Arabian Gulf Marine Cobalt Orb */}
      <div
        className="absolute top-[45%] -left-48 w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-sky-600/14 via-blue-900/8 to-transparent blur-[150px] animate-aura-2"
        style={{
          transform: `translateY(${scrollY * -0.06}px)`,
        }}
      />

      {/* Titanium Center Light Sheen */}
      <div
        className="absolute bottom-10 right-1/4 w-[750px] h-[750px] rounded-full bg-gradient-to-tl from-slate-300/30 via-orange-400/8 to-transparent blur-[120px] animate-aura-1"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />

      {/* ===================================================================== */}
      {/* 4. INTERACTIVE MOUSE CURSOR SPECULAR ILLUMINATION                     */}
      {/* ===================================================================== */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-transform duration-200 ease-out"
        style={{
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.08) 0%, rgba(2, 132, 199, 0.04) 45%, transparent 70%)',
          filter: 'blur(35px)',
        }}
      />

      {/* ===================================================================== */}
      {/* 5. FLOATING TELEMETRY NODES & COORDINATES                             */}
      {/* ===================================================================== */}
      <div className="absolute top-[18%] left-[7%] hidden lg:flex items-center gap-2 font-mono text-[10px] text-slate-500 opacity-75 animate-float-slow">
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping-slow"></span>
        <span className="font-bold">21.5433° N, 39.1728° E // JEDDAH DEPOT</span>
      </div>

      <div className="absolute top-[58%] right-[5%] hidden lg:flex items-center gap-2 font-mono text-[10px] text-slate-500 opacity-75 animate-float-reverse">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping-slow"></span>
        <span className="font-bold">HYDROSTATIC BURST PN25 // 2.5 BAR TEST</span>
      </div>

      <div className="absolute top-[82%] left-[10%] hidden lg:flex items-center gap-2 font-mono text-[10px] text-slate-500 opacity-75 animate-float-slow">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping-slow"></span>
        <span className="font-bold">ISO 9001 / ASTM D1785 TOLERANCE ±0.015MM</span>
      </div>

      {/* ===================================================================== */}
      {/* 6. VISIBLE ARCHITECTURAL CAD PRECISION RINGS & DIALS                  */}
      {/* ===================================================================== */}

      {/* Top-Right Master Technical CAD Ring (720px × 720px) */}
      <div
        className="absolute -top-28 -right-28 w-[720px] h-[720px] opacity-[0.20] transition-transform duration-700 ease-out"
        style={{
          transform: `rotate(${scrollY * 0.055}deg) scale(${1 + Math.sin(scrollY * 0.001) * 0.03})`,
        }}
      >
        <svg viewBox="0 0 720 720" className="w-full h-full text-slate-900 stroke-current fill-none">
          {/* Outer Concentric Boundary */}
          <circle cx="360" cy="360" r="350" strokeWidth="1.5" strokeDasharray="6 3" />
          <circle cx="360" cy="360" r="338" strokeWidth="1" />
          <circle cx="360" cy="360" r="280" strokeWidth="1.2" strokeDasharray="12 4" stroke="#ea580c" />
          <circle cx="360" cy="360" r="220" strokeWidth="1" />
          <circle cx="360" cy="360" r="150" strokeWidth="1.8" strokeDasharray="4 2" />
          <circle cx="360" cy="360" r="90" strokeWidth="1" />
          <circle cx="360" cy="360" r="30" strokeWidth="1.2" stroke="#ea580c" />

          {/* Crosshair Axes */}
          <line x1="360" y1="0" x2="360" y2="720" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="360" x2="720" y2="360" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="105" y1="105" x2="615" y2="615" strokeWidth="0.8" strokeDasharray="8 6" />
          <line x1="105" y1="615" x2="615" y2="105" strokeWidth="0.8" strokeDasharray="8 6" />

          {/* 360-degree Caliper Radial Ticks */}
          {Array.from({ length: 48 }).map((_, i) => {
            const angle = (i * 360) / 48;
            const rad = (angle * Math.PI) / 180;
            const r1 = i % 4 === 0 ? 330 : 340;
            const r2 = 350;
            const x1 = (360 + r1 * Math.cos(rad)).toFixed(1);
            const y1 = (360 + r1 * Math.sin(rad)).toFixed(1);
            const x2 = (360 + r2 * Math.cos(rad)).toFixed(1);
            const y2 = (360 + r2 * Math.sin(rad)).toFixed(1);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeWidth={i % 4 === 0 ? '1.5' : '0.8'}
                stroke={i % 4 === 0 ? '#ea580c' : 'currentColor'}
              />
            );
          })}

          {/* Precision Engineering Dimension Inscriptions */}
          <text x="360" y="325" textAnchor="middle" fontSize="10" letterSpacing="0.25em" fill="currentColor" stroke="none" className="font-mono font-bold">
            MASAR ARABIA SPEC • ISO 9001 / ASTM D1785
          </text>
          <text x="360" y="405" textAnchor="middle" fontSize="9" letterSpacing="0.3em" fill="#ea580c" stroke="none" className="font-mono font-bold">
            TOLERANCE ±0.015MM • Ø 720MM
          </text>
        </svg>
      </div>

      {/* Bottom-Left Planetary Azimuth Ring (580px × 580px) */}
      <div
        className="absolute top-[52%] -left-28 w-[580px] h-[580px] opacity-[0.18] transition-transform duration-700 ease-out"
        style={{
          transform: `rotate(${-scrollY * 0.04}deg)`,
        }}
      >
        <svg viewBox="0 0 580 580" className="w-full h-full text-slate-900 stroke-current fill-none">
          <circle cx="290" cy="290" r="280" strokeWidth="1.2" strokeDasharray="8 4" stroke="#0284c7" />
          <circle cx="290" cy="290" r="260" strokeWidth="1" />
          <circle cx="290" cy="290" r="200" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="290" cy="290" r="130" strokeWidth="1" />
          <circle cx="290" cy="290" r="60" strokeWidth="1.2" stroke="#ea580c" />

          {/* Compass Points */}
          <line x1="290" y1="10" x2="290" y2="570" strokeWidth="1" />
          <line x1="10" y1="290" x2="570" y2="290" strokeWidth="1" />

          {/* Degree Ticks */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 360) / 36;
            const rad = (angle * Math.PI) / 180;
            const r1 = 265;
            const r2 = 280;
            const x1 = (290 + r1 * Math.cos(rad)).toFixed(1);
            const y1 = (290 + r1 * Math.sin(rad)).toFixed(1);
            const x2 = (290 + r2 * Math.cos(rad)).toFixed(1);
            const y2 = (290 + r2 * Math.sin(rad)).toFixed(1);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeWidth="1"
                stroke={i % 3 === 0 ? '#0284c7' : 'currentColor'}
              />
            );
          })}

          <text x="290" y="275" textAnchor="middle" fontSize="9" letterSpacing="0.25em" fill="currentColor" stroke="none" className="font-mono font-bold">
            JEDDAH INDUSTRIAL CENTRAL HUB
          </text>
          <text x="290" y="315" textAnchor="middle" fontSize="8" letterSpacing="0.3em" fill="#0284c7" stroke="none" className="font-mono font-bold">
            21.5433° N, 39.1728° E • VISION 2030
          </text>
        </svg>
      </div>

      {/* Center-Right Secondary Engineering Arc (450px) */}
      <div
        className="absolute top-[78%] right-[8%] w-[450px] h-[450px] opacity-[0.16] transition-transform duration-700 ease-out"
        style={{
          transform: `rotate(${scrollY * 0.03}deg)`,
        }}
      >
        <svg viewBox="0 0 450 450" className="w-full h-full text-slate-900 stroke-current fill-none">
          <circle cx="225" cy="225" r="215" strokeWidth="1" strokeDasharray="14 5" />
          <circle cx="225" cy="225" r="170" strokeWidth="1.2" stroke="#ea580c" />
          <circle cx="225" cy="225" r="100" strokeWidth="1" />
          <circle cx="225" cy="225" r="40" strokeWidth="1.2" strokeDasharray="4 2" />
          <line x1="225" y1="10" x2="225" y2="440" strokeWidth="0.8" strokeDasharray="6 6" />
          <line x1="10" y1="225" x2="440" y2="225" strokeWidth="0.8" strokeDasharray="6 6" />
        </svg>
      </div>
    </div>
  );
}
