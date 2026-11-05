'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Product, ProductCategory } from '@/lib/api';
import {
  ArrowUpRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  categories: ProductCategory[];
  onViewProduct: (product: Product) => void;
  onSelectProductForRfq: (productTitle: string) => void;
}

interface ShowcaseCard {
  id: string;
  bigTitle: string;
  categoryTag: string;
  subtitle: string;
  bullets: string[];
  image: string;
  productTitleMatch: string;
}

const ROW_1_CARDS: ShowcaseCard[] = [
  {
    id: 'cooling',
    bigTitle: 'COOLING',
    categoryTag: 'CTI STD-201 CERTIFIED',
    subtitle: 'Industrial Cooling Towers & FRP Fans',
    bullets: [
      'High-performance cooling towers',
      'Aerodynamic FRP axial & roof fans',
      'Engineered for +55°C Gulf heat',
    ],
    image: '/images/cooling-tower.jpg',
    productTitleMatch: 'FRP Axial Fans',
  },
  {
    id: 'water',
    bigTitle: 'WATER',
    categoryTag: 'SWCC & ASME COMPLIANT',
    subtitle: 'Desalination RO Skids & Purification',
    bullets: [
      'EDI, EDR & Membrane Degassing',
      'Seawater RO purification skids',
      'Automated chemical dosing skids',
    ],
    image: '/images/water-skid.jpg',
    productTitleMatch: 'Water Treatment',
  },
  {
    id: 'frp-grating',
    bigTitle: 'FRP MESH',
    categoryTag: 'ASTM E84 CLASS 1 SAFE',
    subtitle: 'Heavy Composite Flooring & Walkways',
    bullets: [
      '100% bi-directional corrosion immunity',
      'R13 quartz grit anti-slip safety',
      '1/4 weight of steel for fast install',
    ],
    image: '/images/frp-marine.jpg',
    productTitleMatch: 'FRP Molded',
  },
  {
    id: 'chemicals',
    bigTitle: 'CHEMICALS',
    categoryTag: 'SASO 650 HIGH PURITY',
    subtitle: 'Process Solvents, Alcohols & Ketones',
    bullets: [
      'Alcohols, aromatics & ketones',
      'High-purity process oleo chemicals',
      '99.5% minimum purity batch certs',
    ],
    image: '/images/cooling-tower.jpg',
    productTitleMatch: 'Industrial Chemicals',
  },
  {
    id: 'electrical',
    bigTitle: 'ELECTRICAL',
    categoryTag: 'IECEx & ATEX RATED',
    subtitle: 'Cable Trays & Heavy Substation Covers',
    bullets: [
      'FRP & steel cable tray gratings',
      'Heavy power plant trench covers',
      'Dielectric high-voltage insulation',
    ],
    image: '/images/steel-grating.jpg',
    productTitleMatch: 'Electrical',
  }
];

const ROW_2_CARDS: ShowcaseCard[] = [
  {
    id: 'instruments',
    bigTitle: 'INSTRUMENTS',
    categoryTag: 'SIL-2 / SIL-3 ACCREDITED',
    subtitle: 'Digital Flow Meters & Gas Detectors',
    bullets: [
      'Electromagnetic & ultrasonic meters',
      'Fixed toxic multi-gas detectors',
      'Real-time SCADA / DCS 4-20mA',
    ],
    image: '/images/valves-industrial.jpg',
    productTitleMatch: 'Instrumentation',
  },
  {
    id: 'mechanical',
    bigTitle: 'MECHANICAL',
    categoryTag: 'API 6D & ISO 9001 TESTED',
    subtitle: 'Industrial Valves, Actuators & Pumps',
    bullets: [
      'Ball, butterfly & check valves',
      'High-pressure expansion joints',
      'Heavy centrifugal slurry pumps',
    ],
    image: '/images/valves-industrial.jpg',
    productTitleMatch: 'Mechanical',
  },
  {
    id: 'steel-mesh',
    bigTitle: 'STEEL MESH',
    categoryTag: '60-TON AXLE LOAD RATED',
    subtitle: 'Electro-Forged Galvanized Gratings',
    bullets: [
      'Electro-forged machine fusion',
      'ASTM A123 hot-dip galvanized',
      'Aramco 9COM approved mill certs',
    ],
    image: '/images/steel-grating.jpg',
    productTitleMatch: 'Steel',
  },
  {
    id: 'pipe-alloys',
    bigTitle: 'PIPE ALLOYS',
    categoryTag: 'ASME B16.9 / ASTM A403',
    subtitle: 'Alloy Fittings, Flanges & Plates',
    bullets: [
      'Seamless & welded pipe fittings',
      'Duplex, Super Duplex & Inconel',
      '150# to 2500# forged flanges',
    ],
    image: '/images/hero-showcase.jpg',
    productTitleMatch: 'Pipe Fittings',
  },
  {
    id: 'safety-ppe',
    bigTitle: 'SAFETY PPE',
    categoryTag: 'OSHA 1910 & EN 14605',
    subtitle: 'Chemical Coveralls & Fall Protection',
    bullets: [
      'Type 3/4 chemical protective suits',
      'NFPA 2112 fire retardant gear',
      'Full-body fall arrest harnesses',
    ],
    image: '/images/safety-engineer.jpg',
    productTitleMatch: 'Safety',
  }
];

export default function ProductCatalog({
  products,
  categories,
  onViewProduct,
  onSelectProductForRfq,
}: ProductCatalogProps) {

  // Match a showcase card to actual product item in backend/fallback
  const findMatchingProduct = (cardTitleMatch: string): Product => {
    const found = products.find(p =>
      p.title.toLowerCase().includes(cardTitleMatch.toLowerCase()) ||
      p.short_description.toLowerCase().includes(cardTitleMatch.toLowerCase())
    );
    if (found) return found;

    return products[0] || {
      id: 1,
      title: cardTitleMatch,
      slug: 'item',
      category_name: 'Industrial',
      category_slug: 'industrial',
      material_type: 'frp',
      short_description: 'Certified industrial engineering solutions.',
      features: ['Corrosion resistant', 'High load rating'],
      standards: 'ASTM / ISO'
    };
  };

  const handleCardClick = (card: ShowcaseCard) => {
    const product = findMatchingProduct(card.productTitleMatch);
    onViewProduct(product);
  };

  const handleRfqClick = (e: React.MouseEvent, card: ShowcaseCard) => {
    e.stopPropagation();
    onSelectProductForRfq(card.subtitle);
  };

  // Duplicate cards for seamless infinite marquee loop
  const row1Display = useMemo(() => [...ROW_1_CARDS, ...ROW_1_CARDS], []);
  const row2Display = useMemo(() => [...ROW_2_CARDS, ...ROW_2_CARDS], []);

  return (
    <section id="products" className="py-16 sm:py-20 bg-[#fafbfc] text-slate-900 relative overflow-hidden border-t border-slate-200/80 section-reveal">

      {/* Refined subtle ambient radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-slate-200/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ===================================================================== */}
        {/* SECTION HEADER (Proportioned, Executive, Clean)                       */}
        {/* ===================================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2.5 reveal">

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[11px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>CERTIFIED INDUSTRIAL CATALOG</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-[-0.035em] uppercase text-slate-950 leading-tight">
            INDUSTRIAL CAPABILITIES, <span className="text-orange-500">ENGINEERED FOR EXTREMES.</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-normal">
            Certified solutions compliant with Saudi Aramco, SWCC, and Royal Commission codes.
          </p>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* COMPACT DUAL-ROW MARQUEE (Refined Size, Matching Color, Professional)     */}
      {/* ========================================================================= */}
      <div className="space-y-4 select-none">

        {/* ----------------------------------------------------------------------- */}
        {/* ROW 1: Auto-moving to the LEFT (←)                                      */}
        {/* ----------------------------------------------------------------------- */}
        <div className="relative w-full overflow-hidden reveal-left">
          {/* Subtle edge fade masks */}
          <div className="absolute left-0 inset-y-0 w-10 sm:w-20 bg-gradient-to-r from-[#fafbfc] via-[#fafbfc]/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 inset-y-0 w-10 sm:w-20 bg-gradient-to-l from-[#fafbfc] via-[#fafbfc]/80 to-transparent z-10 pointer-events-none"></div>

          <div className="animate-marquee gap-3.5 sm:gap-4 pl-3">
            {row1Display.map((card, idx) => (
              <div
                key={`row1-${card.id}-${idx}`}
                onClick={() => handleCardClick(card)}
                className="w-[285px] sm:w-[315px] shrink-0 rounded-2xl bg-gradient-to-r from-[#0c1424] via-[#0f1b30] to-[#14233c] text-white shadow-md hover:shadow-xl border border-slate-700/70 hover:border-orange-500/80 transition-all duration-300 flex overflow-hidden cursor-pointer group hover:-translate-y-1"
              >
                {/* Left Card Body: Typography & Bullet Points */}
                <div className="flex-1 p-3.5 sm:p-4 pr-2 flex flex-col justify-between min-w-0">
                  <div>
                    {/* Big Bold Clean Title */}
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white font-sans leading-none group-hover:text-orange-400 transition-colors">
                      {card.bigTitle}
                    </h3>

                    {/* Category Monospace Spec Tag */}
                    <span className="text-[8.5px] font-mono text-orange-400 font-bold tracking-wider uppercase block mt-1">
                      {card.categoryTag}
                    </span>

                    {/* 3 Concise Bullet Points */}
                    <div className="mt-2.5 space-y-1">
                      {card.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-300 font-medium">
                          <span className="w-3 h-3 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 text-[8px] font-bold border border-orange-500/30">
                            ✓
                          </span>
                          <span className="truncate leading-none">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[9.5px] font-semibold text-slate-400 group-hover:text-orange-300 flex items-center gap-0.5 transition-colors">
                      <span>View Specs</span>
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </span>

                    <button
                      onClick={(e) => handleRfqClick(e, card)}
                      className="px-2 py-0.5 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-bold text-[9px] shadow-sm transition-all cursor-pointer"
                    >
                      RFQ
                    </button>
                  </div>
                </div>

                {/* Right Card Photo: Unified Tone & Vertical Divider Line */}
                <div className="w-[95px] sm:w-[110px] relative shrink-0 overflow-hidden border-l border-slate-700/60 bg-slate-950">
                  <Image
                    src={card.image}
                    alt={card.bigTitle}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80"
                    sizes="110px"
                  />
                  {/* Matching brand color overlays to unify all photos */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0c1424] via-transparent to-black/40 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-[#0c1424]/20 mix-blend-multiply pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* ROW 2: Auto-moving to the RIGHT (→)                                     */}
        {/* ----------------------------------------------------------------------- */}
        <div className="relative w-full overflow-hidden reveal-right">
          {/* Subtle edge fade masks */}
          <div className="absolute left-0 inset-y-0 w-10 sm:w-20 bg-gradient-to-r from-[#fafbfc] via-[#fafbfc]/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 inset-y-0 w-10 sm:w-20 bg-gradient-to-l from-[#fafbfc] via-[#fafbfc]/80 to-transparent z-10 pointer-events-none"></div>

          <div className="animate-marquee-reverse gap-3.5 sm:gap-4 pl-3">
            {row2Display.map((card, idx) => (
              <div
                key={`row2-${card.id}-${idx}`}
                onClick={() => handleCardClick(card)}
                className="w-[285px] sm:w-[315px] shrink-0 rounded-2xl bg-gradient-to-r from-[#0c1424] via-[#0f1b30] to-[#14233c] text-white shadow-md hover:shadow-xl border border-slate-700/70 hover:border-orange-500/80 transition-all duration-300 flex overflow-hidden cursor-pointer group hover:-translate-y-1"
              >
                {/* Left Card Body: Typography & Bullet Points */}
                <div className="flex-1 p-3.5 sm:p-4 pr-2 flex flex-col justify-between min-w-0">
                  <div>
                    {/* Big Bold Clean Title */}
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white font-sans leading-none group-hover:text-orange-400 transition-colors">
                      {card.bigTitle}
                    </h3>

                    {/* Category Monospace Spec Tag */}
                    <span className="text-[8.5px] font-mono text-orange-400 font-bold tracking-wider uppercase block mt-1">
                      {card.categoryTag}
                    </span>

                    {/* 3 Concise Bullet Points */}
                    <div className="mt-2.5 space-y-1">
                      {card.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-300 font-medium">
                          <span className="w-3 h-3 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 text-[8px] font-bold border border-orange-500/30">
                            ✓
                          </span>
                          <span className="truncate leading-none">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[9.5px] font-semibold text-slate-400 group-hover:text-orange-300 flex items-center gap-0.5 transition-colors">
                      <span>View Specs</span>
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </span>

                    <button
                      onClick={(e) => handleRfqClick(e, card)}
                      className="px-2 py-0.5 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-bold text-[9px] shadow-sm transition-all cursor-pointer"
                    >
                      RFQ
                    </button>
                  </div>
                </div>

                {/* Right Card Photo: Unified Tone & Vertical Divider Line */}
                <div className="w-[95px] sm:w-[110px] relative shrink-0 overflow-hidden border-l border-slate-700/60 bg-slate-950">
                  <Image
                    src={card.image}
                    alt={card.bigTitle}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80"
                    sizes="110px"
                  />
                  {/* Matching brand color overlays to unify all photos */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0c1424] via-transparent to-black/40 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-[#0c1424]/20 mix-blend-multiply pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Refined Compact Bottom CTA Strip */}
      <div className="max-w-3xl mx-auto mt-12 px-4 text-center reveal-scale">
        <div className="p-4 sm:p-5 rounded-2xl bg-white text-slate-900 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="text-left space-y-0.5">
            <h4 className="text-sm font-bold text-slate-950">
              Need a Custom Bill of Materials or Turnkey Fabrication?
            </h4>
            <p className="text-xs text-slate-500">
              Jeddah &amp; Dammam engineering teams provide itemized CAD takeoffs within 24 hours.
            </p>
          </div>
          <button
            onClick={() => onSelectProductForRfq('Custom Fabrication / Complete BOM Takeoff')}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
          >
            <span>Request Full Takeoff</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </section>
  );
}
