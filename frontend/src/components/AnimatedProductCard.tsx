'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ShieldCheck, CheckCircle2, ExternalLink, Sparkles, Eye } from 'lucide-react';
import { ProductItem } from './ProductRangeScroll';

interface AnimatedProductCardProps {
  product: ProductItem;
  index: number;
  onViewDetails: (product: ProductItem) => void;
  onSelectForRfq: (productName: string) => void;
}

export default function AnimatedProductCard({
  product,
  index,
  onViewDetails,
  onSelectForRfq,
}: AnimatedProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Calculate 3D tilt: max 7 degrees
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(900px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) translateY(-8px) scale3d(1.015, 1.015, 1.015)`
          : undefined,
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.2, 0, 0, 1)'
          : undefined,
      }}
      className={`group bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden relative reveal-card ${
        isHovered
          ? 'border-orange-500 shadow-[0_25px_60px_-15px_rgba(234,88,12,0.22)]'
          : 'border-slate-200/90 shadow-sm hover:border-slate-300'
      }`}
    >
      {/* 2026 Interactive Cursor Spotlight Light Mesh */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(234, 88, 12, 0.14), transparent 75%)`,
          }}
        />
      )}

      {/* 2026 Ambient Border Glow Accent */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl z-10"
          style={{
            boxShadow: 'inset 0 0 20px rgba(234, 88, 12, 0.08)',
          }}
        />
      )}

      {/* =================================================================== */}
      {/* TOP STAGE: HIGH-FIDELITY STUDIO PRODUCT PHOTO & CAD ANNOTATIONS     */}
      {/* =================================================================== */}
      <div
        onClick={() => onViewDetails(product)}
        className="cursor-pointer flex-1 flex flex-col justify-between"
      >
        <div className="h-56 w-full bg-gradient-to-b from-slate-50 via-slate-50/80 to-slate-100/70 p-5 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
          
          {/* Subtle CAD Blueprint Grid */}
          <div className="absolute inset-0 cad-blueprint-grid opacity-30 pointer-events-none" />

          {/* Architectural CAD Blueprint Corner Crosshairs */}
          <span className="absolute top-2.5 left-2.5 text-[10px] font-mono text-slate-400 font-bold select-none z-10">+</span>
          <span className="absolute top-2.5 right-2.5 text-[10px] font-mono text-slate-400 font-bold select-none z-10">+</span>
          <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-slate-400 font-bold select-none z-10">+</span>
          <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono text-slate-400 font-bold select-none z-10">+</span>

          {/* Top Floating Glass Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
            <span className="text-[11px] font-mono font-black text-slate-950 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-200/90 shadow-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              <span>SYS #{product.number}</span>
            </span>

            <span className="text-[10px] font-mono font-bold text-slate-700 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-200 truncate max-w-[140px] shadow-xs">
              {product.standard.split('/')[0]}
            </span>
          </div>

          {/* Main High-Resolution Studio Image with Hardware Accelerated Hover Scale */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>

          {/* 2026 Interactive Glass Overlay with Telemetry Peek */}
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-15">
            <span className="px-4 py-2 rounded-2xl bg-white text-slate-950 font-bold text-xs shadow-xl flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
              <Eye className="w-4 h-4 text-orange-500" />
              <span>Inspect CAD Drawing</span>
            </span>
          </div>

          {/* Bottom Overlay Pill: Depot Ready Status */}
          <div className="absolute bottom-2.5 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 text-[10px] font-mono font-semibold text-slate-700 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Jeddah Depot Stock</span>
            </span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* BOTTOM CONTENT: TYPOGRAPHY, RATING BADGE & FEATURES                 */}
        {/* =================================================================== */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Category Subtitle */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-600">
                {product.categoryLabel}
              </span>
            </div>

            {/* Product Title */}
            <h3 className="text-sm sm:text-base font-black uppercase text-slate-950 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2 font-sans mb-2.5">
              {product.name}
            </h3>

            {/* Technical Rating Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-800 text-[11px] font-bold font-mono mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{product.ratingBadge}</span>
            </div>

            {/* 3 Key Engineering Features with Smooth Bullets */}
            <ul className="space-y-1.5 mb-4 text-xs text-slate-600 font-medium">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* CARD ACTIONS FOOTER: TWO HIGH-CONVERSION 2026 BUTTONS               */}
      {/* =================================================================== */}
      <div className="p-4 pt-0 bg-white border-t border-slate-100 grid grid-cols-2 gap-2 mt-auto z-10">
        <button
          onClick={() => onViewDetails(product)}
          className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Full Specs</span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </button>

        <button
          onClick={() => onSelectForRfq(product.name)}
          className="py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-orange-500/35 transform active:scale-95"
        >
          <span>Request RFQ</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
