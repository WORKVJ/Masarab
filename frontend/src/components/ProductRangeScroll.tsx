'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Image from 'next/image';
import { scrollToTarget } from '@/lib/motion';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Search,
  Pause,
  Play,
} from 'lucide-react';

export interface ProductItem {
  id: string;
  number: string;
  name: string;
  shortName: string;
  categoryGroup: 'polymers' | 'drainage' | 'valves' | 'gratings' | 'hardware';
  categoryLabel: string;
  column: number;
  row: number;
  standard: string;
  ratingBadge: string;
  features: string[];
  description: string;
  image: string;
  accentColor: string;
  applications: string[];
}

// Exactly 16 products from client's official TV board matching 4 columns 1:1
export const CLIENT_PRODUCTS: ProductItem[] = [
  // COLUMN 1 (from TV slide)
  {
    id: 'pvc-cpvc',
    number: '01',
    name: 'PVC CPVC PIPES & FITTINGS',
    shortName: 'PVC / CPVC Piping',
    categoryGroup: 'polymers',
    categoryLabel: 'High-Performance Polymers',
    column: 1,
    row: 1,
    standard: 'ASTM D1785 / F441',
    ratingBadge: 'SCH 40 / 80 • PN16',
    features: ['High-durability solvent-weld joints', '100% chemical & acid safe', 'Smooth bore zero friction loss'],
    description: 'Heavy industrial schedule 40 and schedule 80 PVC & chlorinated CPVC pipes and solvent-weld fittings engineered for harsh chemical supply, industrial water mains, and high-purity fluid transfer.',
    image: '/images/products/pvc-cpvc.jpg',
    accentColor: '#0d7cae',
    applications: ['Chemical Processing', 'Water Treatment', 'Commercial Plumbing'],
  },
  {
    id: 'pvc-drainage',
    number: '02',
    name: 'PVC Drainage Fittings',
    shortName: 'PVC DWV Drainage',
    categoryGroup: 'drainage',
    categoryLabel: 'Drainage & DWV Systems',
    column: 1,
    row: 2,
    standard: 'BS EN 1329 / ASTM D2665',
    ratingBadge: 'Self-Cleaning Flow Profile',
    features: ['45°/90° sweep bends & wyes', 'Push-fit EPDM rubber seal ring', 'High-velocity gravity discharge'],
    description: 'Precision-engineered soil, waste, and vent drainage fittings, sweep tees, and cleanout plugs ensuring maximum hydraulic discharge without clogs in municipal and commercial developments.',
    image: '/images/products/pvc-drainage.jpg',
    accentColor: '#0d7cae',
    applications: ['Gravity Sewer Mains', 'High-Rise Soil Waste', 'Stormwater Runoff'],
  },
  {
    id: 'cast-iron',
    number: '03',
    name: 'Cast Iron Pipes & Fittings',
    shortName: 'Cast Iron Soil Pipes',
    categoryGroup: 'drainage',
    categoryLabel: 'Heavy Infrastructure',
    column: 1,
    row: 3,
    standard: 'EN 877 / ASTM A888',
    ratingBadge: 'Acoustic Silent • A1 Fire Safe',
    features: ['Epoxy internal cross-linked coat', 'Hubless mechanical stainless coupling', 'Supreme acoustic isolation'],
    description: 'Centrifugally cast ductile and grey iron soil pipes providing non-combustible A1 fire safety and high acoustic sound dampening for hospital towers, hotels, and infrastructure.',
    image: '/images/products/cast-iron.jpg',
    accentColor: '#0d7cae',
    applications: ['Hospital Towers', 'Aviation Terminals', 'Underground Infrastructure'],
  },
  {
    id: 'drains',
    number: '04',
    name: 'Drains',
    shortName: 'Floor Drains & Cleanouts',
    categoryGroup: 'drainage',
    categoryLabel: 'Drainage & DWV Systems',
    column: 1,
    row: 4,
    standard: 'ASME A112.6.3 / BS EN 1253',
    ratingBadge: 'Class L15 to M125 Load Rated',
    features: ['Micro-adjustable stainless gratings', 'Membrane clamping waterproof collars', 'Removable anti-odor trap inserts'],
    description: 'Heavy architectural cast iron, bronze, and stainless steel floor drains, roof scuppers, and cleanouts engineered with clamping collars for watertight commercial installation.',
    image: '/images/products/drains.jpg',
    accentColor: '#0d7cae',
    applications: ['Commercial Kitchens', 'Industrial Washdown Bays', 'Multi-Level Car Parks'],
  },

  // COLUMN 2 (from TV slide)
  {
    id: 'pph-hdpe',
    number: '05',
    name: 'PPH PPS ECTFE HDPE Pipes & Fittings',
    shortName: 'PPH, ECTFE & HDPE Piping',
    categoryGroup: 'polymers',
    categoryLabel: 'High-Performance Polymers',
    column: 2,
    row: 1,
    standard: 'DIN 8077/8078 / ISO 15494',
    ratingBadge: '-40°C to +140°C Working Temp',
    features: ['Butt-fusion and electrofusion welded', 'Extreme stress crack resistance', 'Zero corrosion under heavy acids'],
    description: 'Engineered thermoplastic piping in Polypropylene Homopolymer (PPH), ECTFE fluoropolymer, and High-Density Polyethylene (HDPE) for aggressive industrial effluent and mining slurries.',
    image: '/images/products/pph-hdpe.jpg',
    accentColor: '#0d7cae',
    applications: ['Battery Manufacturing', 'Acid Regeneration Plants', 'Desalination Intake Lines'],
  },
  {
    id: 'abs-pipes',
    number: '06',
    name: 'ABS Pipes & Fittings',
    shortName: 'ABS Refrigeration Piping',
    categoryGroup: 'polymers',
    categoryLabel: 'High-Performance Polymers',
    column: 2,
    row: 2,
    standard: 'BS 5391 / EN ISO 15493',
    ratingBadge: 'Down to -40°C Sub-Zero Impact',
    features: ['High ductile impact at freezing', 'Non-toxic potable water certified', 'Lightweight rapid solvent assembly'],
    description: 'Acrylonitrile Butadiene Styrene (ABS) rigid pressure piping system specially formulated for chilled water loops, cold storage refrigeration, food processing, and slurry transport down to -40°C.',
    image: '/images/products/abs-pipes.jpg',
    accentColor: '#0d7cae',
    applications: ['Cold Storage Logistics', 'Chilled Water HVAC Loops', 'Beverage & Brewery Plants'],
  },
  {
    id: 'pvdf-pipes',
    number: '07',
    name: 'PVDF Pipes & Fittings',
    shortName: 'PVDF High-Purity Piping',
    categoryGroup: 'polymers',
    categoryLabel: 'High-Performance Polymers',
    column: 2,
    row: 3,
    standard: 'ASTM F1673 / ISO 10931',
    ratingBadge: 'Ultra-Pure Deionized Grade',
    features: ['Infrared beadless IR-welded', 'Mirror-finish surface roughness Ra < 0.2µm', 'Immune to wet chlorine & halogens'],
    description: 'High-crystallinity Polyvinylidene Fluoride (PVDF) high-purity pressure piping for semiconductor grade UPW (ultra-pure water), pharmaceutical sterile distribution, and concentrated sulfuric acid transfer.',
    image: '/images/products/pvdf-pipes.jpg',
    accentColor: '#0d7cae',
    applications: ['Pharma WFI Distribution', 'Semiconductor Cleanrooms', 'Chlor-Alkali Plants'],
  },
  {
    id: 'copper-pipes',
    number: '08',
    name: 'Copper Pipes & Fittings',
    shortName: 'Copper Medical & HVAC Pipes',
    categoryGroup: 'hardware',
    categoryLabel: 'Specialty Metal Systems',
    column: 2,
    row: 4,
    standard: 'ASTM B88 / BS EN 1057',
    ratingBadge: 'Type K, L, M • Medical Gas',
    features: ['Seamless deoxidized high residual P (DHP)', 'Antimicrobial bactericidal contact surface', 'Brazed socket & press-fit compatibility'],
    description: 'Phosphorized deoxidized seamless copper tubes and solder/braze capillary fittings for clean medical oxygen distribution, high-pressure HVAC refrigeration, and high-end hydraulic services.',
    image: '/images/products/copper-pipes.jpg',
    accentColor: '#0d7cae',
    applications: ['Hospital Medical Gas (O2/N2O)', 'VRF Air Conditioning', 'Potable Domestic Hot Water'],
  },

  // COLUMN 3 (from TV slide)
  {
    id: 'ppr-pipes',
    number: '09',
    name: 'PPR Pipes & Fittings',
    shortName: 'PPR Hot & Cold Water',
    categoryGroup: 'polymers',
    categoryLabel: 'High-Performance Polymers',
    column: 3,
    row: 1,
    standard: 'DIN 8077/8078 / SASO ISO 15874',
    ratingBadge: 'PN20 / PN25 Class • 95°C',
    features: ['Homogeneous thermal socket fusion', 'Multi-layer fiberglass reinforcement', 'Zero scale, taste, or odor transmission'],
    description: 'Polypropylene Random Copolymer (PPR Type 3) hot and cold potable water pressure systems with glass-fiber center layers preventing linear thermal expansion in residential and commercial developments.',
    image: '/images/products/ppr-pipes.jpg',
    accentColor: '#0d7cae',
    applications: ['Hotel Potable Water Networks', 'District Heating Risers', 'Solar Water Heating Loops'],
  },
  {
    id: 'pvc-adhesives',
    number: '10',
    name: 'PVC CPVC Adhesives',
    shortName: 'Solvent Cements & Primers',
    categoryGroup: 'hardware',
    categoryLabel: 'Specialty Chemicals & Cleaners',
    column: 3,
    row: 2,
    standard: 'ASTM D2564 / ASTM F656',
    ratingBadge: 'Low-VOC • Heavy Body',
    features: ['Deep molecular fusion welding action', 'Fast set time in extreme desert heat', 'NSF 61 potable water certified'],
    description: 'Heavy-body, low-VOC industrial solvent cements, violet primers, and surface cleaners formulated specifically to withstand high ambient Middle East temperatures up to 55°C without premature flash-off.',
    image: '/images/products/pvc-adhesives.jpg',
    accentColor: '#0d7cae',
    applications: ['High-Pressure PVC Pipe Jointing', 'Industrial CPVC Loop Assembly', 'Underground Mains Splicing'],
  },
  {
    id: 'mechanical-couplings',
    number: '11',
    name: 'Mechanical Coupling & Flange Adaptors',
    shortName: 'Wide-Range Couplings',
    categoryGroup: 'hardware',
    categoryLabel: 'Pipeline Joints & Couplings',
    column: 3,
    row: 3,
    standard: 'AWWA C219 / BS EN 545',
    ratingBadge: 'Ductile Iron GGG50 • PN16/25',
    features: ['Wide-tolerance nominal outside diameters', 'EPDM/NBR angular deflection gaskets', 'Rilsan nylon or fusion epoxy coated'],
    description: 'Wide-tolerance ductile iron mechanical couplings, stepped flexible transition joints, and universal flange adaptors connecting dissimilar pipe materials (DI, Steel, PVC, GRP, AC) safely.',
    image: '/images/products/mechanical-couplings.jpg',
    accentColor: '#0d7cae',
    applications: ['Municipal Water Main Tie-Ins', 'Emergency Pipeline Repair', 'Pump Station Flange Interfaces'],
  },
  {
    id: 'metal-valves',
    number: '12',
    name: 'Metal Valves',
    shortName: 'Industrial Gate & Check Valves',
    categoryGroup: 'valves',
    categoryLabel: 'Industrial Valves & Actuation',
    column: 3,
    row: 4,
    standard: 'API 600 / BS 5163 / DIN 3352',
    ratingBadge: 'Class 150-600# • PN16-64',
    features: ['Resilient seated or metal-to-metal trim', 'Rising stem with handwheel/actuator gearbox', '100% factory hydrostatic shell tested'],
    description: 'Heavy industrial ductile iron and cast steel gate valves, swing check valves, resilient-seated butterfly valves, and eccentric plug valves for crude oil, saline water, and city distribution.',
    image: '/images/products/metal-valves.jpg',
    accentColor: '#0d7cae',
    applications: ['Oil Refineries', 'Desalination Plants', 'District Energy Stations'],
  },

  // COLUMN 4 (from TV slide)
  {
    id: 'manhole-covers',
    number: '13',
    name: 'Manhole Covers, Gratings & Gullies',
    shortName: 'Manhole Covers & Gratings',
    categoryGroup: 'gratings',
    categoryLabel: 'Heavy Civil Infrastructure & Gratings',
    column: 4,
    row: 1,
    standard: 'BS EN 124 / SASO ISO 1083',
    ratingBadge: '40 Ton to 90 Ton Proof Load',
    features: ['Ductile iron 500-7 casting', 'Anti-theft hinges & security locks', 'Odor-tight neoprene gasket seals'],
    description: 'Heavy-duty carriageway ductile iron manhole covers, stormwater gully gratings, and industrial trench access frames rated from Class C250 (25t) to Class F900 (90t airport runways).',
    image: '/images/products/manhole-covers.jpg',
    accentColor: '#0d7cae',
    applications: ['Highways & Municipal Roads', 'Industrial Substations', 'Airport Aprons'],
  },
  {
    id: 'test-plugs',
    number: '14',
    name: 'Test Plugs',
    shortName: 'Pneumatic Test Plugs',
    categoryGroup: 'gratings',
    categoryLabel: 'Inspection & Hydro-Testing',
    column: 4,
    row: 2,
    standard: 'DIN EN 1610 / OSHA Compliant',
    ratingBadge: 'Up to 2.5 Bar Pipe Test',
    features: ['Reinforced multi-ply Kevlar rubber', 'By-pass flow models available', 'Covers 50 mm up to 1800 mm pipes'],
    description: 'Inflatable pneumatic pipe stoppers, mechanical wing-nut plugs, and bypass testing balloons engineered for pipeline air/water pressure leak testing, bypass purging, and municipal sewer isolation.',
    image: '/images/products/test-plugs.jpg',
    accentColor: '#0d7cae',
    applications: ['Hydrostatic Pipe Testing', 'Municipal Sewer Maintenance', 'Emergency Flow Block'],
  },
  {
    id: 'pressure-reducing',
    number: '15',
    name: 'Pressure Relief & Vacuum Breakers',
    shortName: 'Pressure Control Valves',
    categoryGroup: 'valves',
    categoryLabel: 'Hydraulic Surge & Flow Control',
    column: 4,
    row: 3,
    standard: 'AWWA C530 / EN 1074-5',
    ratingBadge: 'Pilot-Operated Direct Acting',
    features: ['Dual pressure gauge ports', 'Cavitation-free stainless trim', 'Surge & water hammer protection'],
    description: 'Pilot-operated diaphragm pressure reducing valves, hydraulic surge anticipating valves, and kinetic air release/vacuum breaker valves safeguarding major pipelines against pressure spikes.',
    image: '/images/products/pressure-reducing.jpg',
    accentColor: '#0d7cae',
    applications: ['Long-Distance Water Transmission', 'High-Rise Pressure Zones', 'Subsea Outfall Lines'],
  },
  {
    id: 'fire-fighting',
    number: '16',
    name: 'Fire Fighting Valves',
    shortName: 'Fire Protection Valves',
    categoryGroup: 'valves',
    categoryLabel: 'Life Safety & Civil Protection',
    column: 4,
    row: 4,
    standard: 'UL 246 / FM 1510 / NFPA',
    ratingBadge: '300 PSI Working Pressure',
    features: ['Outdoor pillar dry barrel hydrants', 'Landing valves & hose reel trim', 'UL / FM certified compliance'],
    description: 'UL-listed and FM-approved outdoor pillar dry fire hydrants, landing angle valves, deluge check assemblies, and fire sprinkler control valves engineered for maximum safety compliance.',
    image: '/images/products/fire-fighting.jpg',
    accentColor: '#0d7cae',
    applications: ['Industrial Plant Hydrants', 'Commercial High Rises', 'Petrochemical Tank Farms'],
  },
];

interface ProductRangeProps {
  onSelectProductForRfq: (productTitle: string) => void;
  onViewProductDetails?: (product: ProductItem) => void;
}

export default function ProductRangeScroll({
  onSelectProductForRfq,
  onViewProductDetails,
}: ProductRangeProps) {
  // Dial state
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Dragging interaction state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartRotRef = useRef(0);

  // Active product index (0 to 15) calculated from rotationAngle
  const activeIndex = useMemo(() => {
    const total = CLIENT_PRODUCTS.length;
    const normalized = (Math.round(rotationAngle / 22.5) % total + total) % total;
    return normalized;
  }, [rotationAngle]);

  const activeProduct = CLIENT_PRODUCTS[activeIndex] || CLIENT_PRODUCTS[0];

  // Auto-rotation timer (advances 1 step every 4s, pauses on hover or drag)
  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => prev + 22.5);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, isDragging]);

  // Step controls with smooth animation
  const handlePrev = useCallback(() => {
    setRotationAngle((prev) => prev - 22.5);
  }, []);

  const handleNext = useCallback(() => {
    setRotationAngle((prev) => prev + 22.5);
  }, []);

  const handleSelectProduct = useCallback((index: number) => {
    const currentNorm = (Math.round(rotationAngle / 22.5) % 16 + 16) % 16;
    let diff = index - currentNorm;
    if (diff > 8) diff -= 16;
    if (diff < -8) diff += 16;
    setRotationAngle((prev) => prev + diff * 22.5);
  }, [rotationAngle]);

  // Mouse & Touch Drag Scrubbing Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    dragStartXRef.current = e.clientX;
    dragStartRotRef.current = rotationAngle;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    setRotationAngle(dragStartRotRef.current - deltaX * 0.14);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setRotationAngle((prev) => Math.round(prev / 22.5) * 22.5);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setIsPaused(true);
      dragStartXRef.current = e.touches[0].clientX;
      dragStartRotRef.current = rotationAngle;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartXRef.current;
    setRotationAngle(dragStartRotRef.current - deltaX * 0.16);
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      setRotationAngle((prev) => Math.round(prev / 22.5) * 22.5);
    }
  };

  // Generate SVG tick marks for the precision instrument protractor
  // Radius: 385px, Center: (525, 580)
  const dialTicks = useMemo(() => {
    const ticks = [];
    const cx = 525;
    const cy = 580;
    const rTick = 385;

    for (let deg = -65; deg <= 65; deg += 1) {
      const rad = (deg * Math.PI) / 180;
      const isMajor = Math.abs(deg % 9) < 0.1;
      const isMid = Math.abs(deg % 4.5) < 0.1 && !isMajor;
      const len = isMajor ? 12 : isMid ? 7 : 4;

      const x1 = cx + rTick * Math.sin(rad);
      const y1 = cy - rTick * Math.cos(rad);
      const x2 = cx + (rTick - len) * Math.sin(rad);
      const y2 = cy - (rTick - len) * Math.cos(rad);

      ticks.push({
        deg,
        isMajor,
        isMid,
        x1: Number(x1.toFixed(1)),
        y1: Number(y1.toFixed(1)),
        x2: Number(x2.toFixed(1)),
        y2: Number(y2.toFixed(1)),
      });
    }
    return ticks;
  }, []);

  // Filtered products for the complete 16-system matrix
  const filteredProducts = useMemo(() => {
    return CLIENT_PRODUCTS.filter((prod) => {
      const matchesCat =
        activeCategoryFilter === 'all' || prod.categoryGroup === activeCategoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        prod.name.toLowerCase().includes(q) ||
        prod.standard.toLowerCase().includes(q) ||
        prod.ratingBadge.toLowerCase().includes(q) ||
        prod.description.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeCategoryFilter, searchQuery]);

  // Categories definition matching client's official groupings
  const categories = [
    { id: 'all', label: 'All 16 Systems', targetIndex: 0 },
    { id: 'polymers', label: 'Thermoplastics & Polymers', targetIndex: 0 },
    { id: 'drainage', label: 'Drainage & Cast Iron', targetIndex: 1 },
    { id: 'valves', label: 'Valves & Flow Controls', targetIndex: 11 },
    { id: 'gratings', label: 'Gratings & Manhole Covers', targetIndex: 12 },
    { id: 'hardware', label: 'Joints, Adhesives & Plugs', targetIndex: 9 },
  ];

  return (
    <section
      id="product-range"
      className="pt-16 sm:pt-20 pb-20 sm:pb-28 bg-white text-slate-900 border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Subtle CAD Engineering Grid & Radiant Ambient Aura */}
      <div className="absolute inset-0 cad-blueprint-grid opacity-20 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#e0f2fe]/45 via-sky-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =================================================================== */}
        {/* 1. TOP CATEGORY QUICK JUMP PILLS (Smoothly Rotates Dial to Group)    */}
        {/* =================================================================== */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-6 sm:mb-8">
          {categories.map((cat) => {
            const isSelected = activeProduct.categoryGroup === cat.id || (cat.id === 'all' && activeIndex === 0);
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategoryFilter(cat.id);
                  handleSelectProduct(cat.targetIndex);
                }}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-normal transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0d7cae] border-[#0d7cae] text-white shadow-xs'
                    : 'bg-white/95 border-slate-200 hover:border-sky-300 text-slate-700 hover:text-slate-950'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* =================================================================== */}
        {/* 2. GRAND RADIAL ARC SHOWCASE DIAL (WITH GENEROUS CARD-TO-BUTTON GAP)*/}
        {/* =================================================================== */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!isDragging) setIsPaused(false);
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full max-w-6xl mx-auto overflow-hidden flex items-center justify-center pt-4 sm:pt-6 pb-6 ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
        >
          {/* Responsive 3D Stage: 1050px native, generous 590px height with spacious dome */}
          <div
            style={{ perspective: '1200px' }}
            className="relative w-[1050px] h-[560px] sm:h-[590px] shrink-0 scale-[0.68] sm:scale-[0.84] lg:scale-100 origin-top transition-transform duration-300 select-none"
          >
            
            {/* ───────────────────────────────────────────────────────────── */}
            {/* SVG GAUGE BEZEL & RADIAL TICKS (Center: 525, 580, Radius: 385)*/}
            {/* ───────────────────────────────────────────────────────────── */}
            <svg
              viewBox="0 0 1050 600"
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            >
              <defs>
                <linearGradient id="arcGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0d7cae" stopOpacity="0.05" />
                  <stop offset="30%" stopColor="#0d7cae" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#0d7cae" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0d7cae" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Baseline Arc (Radius: 385px, Center: 525, 580) */}
              <path
                d="M 176 417 A 385 385 0 0 1 874 417"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1.4"
                strokeDasharray="4 4"
              />

              {/* Accent Arc Highlight */}
              <path
                d="M 253 308 A 385 385 0 0 1 797 308"
                fill="none"
                stroke="url(#arcGlowGrad)"
                strokeWidth="2.2"
              />

              {/* 130 Fine Radial Tick Marks */}
              {dialTicks.map((tick, i) => (
                <line
                  key={i}
                  x1={tick.x1}
                  y1={tick.y1}
                  x2={tick.x2}
                  y2={tick.y2}
                  stroke={tick.isMajor ? '#0d7cae' : tick.isMid ? '#94a3b8' : '#cbd5e1'}
                  strokeWidth={tick.isMajor ? 1.5 : tick.isMid ? 1.0 : 0.75}
                  opacity={tick.isMajor ? 0.9 : 0.65}
                />
              ))}

              {/* Calibration Angle Callouts */}
              <text x="268" y="292" textAnchor="middle" className="text-[9px] font-mono fill-slate-400 select-none">-45°</text>
              <text x="382" y="232" textAnchor="middle" className="text-[9px] font-mono fill-slate-400 select-none">-22.5°</text>
              <text x="525" y="188" textAnchor="middle" className="text-[9.5px] font-mono font-medium fill-[#0d7cae] select-none">0.0° CALIBRATED</text>
              <text x="668" y="232" textAnchor="middle" className="text-[9px] font-mono fill-slate-400 select-none">+22.5°</text>
              <text x="782" y="292" textAnchor="middle" className="text-[9px] font-mono fill-slate-400 select-none">+45°</text>

              {/* Top Apex Indicator Calibrated Pip with Double Pulse Rings */}
              <circle cx="525" cy="195" r="4.5" fill="#0d7cae" />
              <circle cx="525" cy="195" r="9" fill="none" stroke="#0d7cae" strokeWidth="1.4" className="animate-ping" opacity="0.4" />
            </svg>

            {/* ───────────────────────────────────────────────────────────── */}
            {/* 16 3D RADIAL CARDS ALONG THE CURVED ARC                       */}
            {/* ───────────────────────────────────────────────────────────── */}
            {CLIENT_PRODUCTS.map((prod, idx) => {
              const baseAngle = idx * 22.5;
              const rawDiff = baseAngle - (rotationAngle % 360);
              const diffAngle = ((rawDiff % 360) + 540) % 360 - 180;

              // Only render upper-arc cards (|diffAngle| <= 70)
              const isVisible = Math.abs(diffAngle) <= 70;
              if (!isVisible) return null;

              // Radius for card centers: 480px from center (525, 580)
              const rad = (diffAngle * Math.PI) / 180;
              const rCard = 480;
              const cardX = 525 + rCard * Math.sin(rad);
              const cardY = 580 - rCard * Math.cos(rad);

              const isCenterActive = Math.abs(diffAngle) < 4;
              const scale = isCenterActive
                ? 1.06
                : Math.max(0.76, 1 - (Math.abs(diffAngle) / 70) * 0.26);
              const opacity = isCenterActive
                ? 1
                : Math.max(0.48, 1 - (Math.abs(diffAngle) / 70) * 0.58);
              const zIndex = isCenterActive ? 50 : Math.round(35 - Math.abs(diffAngle));

              // 3D cylindrical perspective curvature
              const rotY = -diffAngle * 0.36;
              const tz = Math.cos(rad) * 40 - 40;

              return (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(idx)}
                  style={{
                    left: `${cardX}px`,
                    top: `${cardY}px`,
                    transform: `translate(-50%, -50%) rotate(${diffAngle.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(${tz.toFixed(1)}px) scale(${scale.toFixed(2)})`,
                    opacity: opacity.toFixed(2),
                    zIndex,
                    transition: isDragging
                      ? 'none'
                      : 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, box-shadow 0.3s ease',
                  }}
                  className={`absolute w-[155px] h-[195px] rounded-[22px] p-2.5 cursor-pointer flex flex-col justify-between group overflow-hidden ${
                    isCenterActive
                      ? 'bg-gradient-to-b from-white via-sky-50/80 to-[#e0f2fe]/90 border-2 border-[#0d7cae] shadow-[0_20px_40px_-8px_rgba(13,124,174,0.30)] ring-4 ring-[#0d7cae]/15'
                      : 'bg-gradient-to-b from-white/95 via-[#f0f9ff]/90 to-[#e0f2fe]/50 border border-sky-100/90 shadow-[0_10px_24px_-6px_rgba(0,0,0,0.06)] hover:border-sky-300 hover:shadow-md'
                  }`}
                >
                  {/* Subtle Background Radial Ambient Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(13,124,174,0.06),transparent_70%)] pointer-events-none" />

                  {/* Card Header: System Number & ASTM/DIN Pill */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="px-2 py-0.5 rounded-full bg-white/95 text-[10px] font-mono font-normal text-slate-700 shadow-2xs border border-slate-200/60">
                      #{prod.number}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/95 text-[9px] font-mono font-normal text-[#0d7cae] shadow-2xs border border-slate-200/60 truncate max-w-[85px]">
                      {prod.standard.split('/')[0]}
                    </span>
                  </div>

                  {/* Card Center: Authentic Studio Product Image */}
                  <div
                    style={{ height: '110px', position: 'relative' }}
                    className="relative w-full h-[110px] flex items-center justify-center overflow-hidden my-auto"
                  >
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="155px"
                      className="object-contain p-1.5 drop-shadow-[0_6px_12px_rgba(0,0,0,0.10)] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card Footer: Short Title Pill (Font Normal) */}
                  <div className="text-center relative z-10 pt-0.5">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs max-w-full">
                      <span className="text-[10.5px] font-normal text-slate-800 block truncate leading-tight">
                        {prod.shortName}
                      </span>
                    </div>
                  </div>

                  {/* Active Indicator Pulse Pip */}
                  {isCenterActive && (
                    <div className="absolute top-2 right-2 z-20">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0d7cae] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0d7cae]"></span>
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* CENTER CONTENT: AIRY DOME WITH GENEROUS GAP TO BUTTONS        */}
            {/* ───────────────────────────────────────────────────────────── */}
            <div className="absolute top-[245px] left-1/2 -translate-x-1/2 w-[640px] text-center z-30 pointer-events-auto space-y-3 px-4">
              
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-sky-200/90 shadow-xs text-xs font-normal text-[#0d7cae] backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d7cae] animate-pulse" />
                <span>PRODUCT RANGE • 16 CERTIFIED SYSTEMS</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black uppercase tracking-tight text-slate-950 leading-[1.12] max-w-lg mx-auto">
                World-Class Industrial <span className="text-[#0d7cae]">Piping &amp; Gratings</span>
              </h2>

              {/* Subtitle Paragraph */}
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
                Direct factory supply certified to ASTM, DIN &amp; BS EN standards. Stocked in Jeddah for 24–48h nationwide dispatch.
              </p>

              {/* Active Product Clean Spec Pill */}
              <div
                key={activeProduct.id}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-sky-200/90 shadow-xs text-xs font-normal text-slate-800 animate-in fade-in duration-200"
              >
                <span className="font-mono text-[#0d7cae] font-normal">System #{activeProduct.number}:</span>
                <span className="text-slate-900 font-normal truncate max-w-[210px]">{activeProduct.name}</span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-mono font-normal">
                  {activeProduct.standard}
                </span>
              </div>

              {/* ============================================================= */}
              {/* ACTION BUTTONS & DIAL CONTROLS (AIRY WITH GENEROUS GAP ABOVE)  */}
              {/* ============================================================= */}
              <div className="flex items-center justify-center gap-2.5 pt-3">
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-[#0d7cae] shadow-xs flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Previous System"
                >
                  <ChevronLeft className="w-4.5 h-4.5" />
                </button>

                {/* Primary RFQ CTA Button with Arrow */}
                <button
                  onClick={() => onSelectProductForRfq(activeProduct.name)}
                  className="flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#0d7cae] hover:bg-[#0b6a95] text-white text-xs sm:text-sm font-normal shadow-md shadow-[#0d7cae]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Request RFQ for {activeProduct.shortName}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </button>

                {/* View Technical Specs Modal Button */}
                {onViewProductDetails && (
                  <button
                    onClick={() => onViewProductDetails(activeProduct)}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-950 text-xs sm:text-sm font-normal shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>View Specs</span>
                  </button>
                )}

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-[#0d7cae] shadow-xs flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Next System"
                >
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Auto-play toggle & interactive scrub hint */}
              <div className="flex items-center justify-center gap-3 text-[10.5px] text-slate-400 font-mono pt-1">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="inline-flex items-center gap-1.5 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {isPaused ? <Play className="w-3 h-3 text-[#0d7cae]" /> : <Pause className="w-3 h-3 text-[#0d7cae]" />}
                  <span className="font-normal">{isPaused ? 'Auto-rotation paused' : 'Auto-rotating'}</span>
                </button>
                <span>•</span>
                <span className="font-normal">Drag dial or click any card</span>
              </div>

            </div>

          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. FOUR STATS ROW (1:1 with Havenly Reference Design)                */}
        {/* =================================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10 sm:pt-12 border-t border-slate-200/80 max-w-5xl mx-auto">
          {[
            { value: '16+', label: 'Certified Product Ranges', sub: 'Full ASTM, DIN & BS EN Matrix' },
            { value: '80K+', label: 'Jeddah Warehouse Stock', sub: '24–48h Nationwide Delivery' },
            { value: '100%', label: 'Hydro-Tested Compliance', sub: 'Aramco 9COM & SASO Validated' },
            { value: '1:1', label: 'Dedicated Project Engineer', sub: 'Submittal & MTC Documentation' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-white to-[#f0f9ff]/70 border border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all text-center group cursor-default"
            >
              <div className="text-3xl sm:text-4xl font-normal text-slate-900 font-mono tracking-tight group-hover:text-[#0d7cae] transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-normal text-slate-700 mt-1.5">{stat.label}</div>
              <div className="text-[11px] text-slate-400 font-normal mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* =================================================================== */}
        {/* 4. COMPLETE 16-SYSTEM SPECIFICATION MATRIX SUITE (FROM TV SLIDE)    */}
        {/* (All 16 products visibly present with entrance and hover animations)*/}
        {/* =================================================================== */}
        <div className="pt-16 sm:pt-20">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0d7cae] text-xs font-mono font-normal">
              <Layers className="w-3.5 h-3.5" />
              <span>OFFICIAL PRODUCT SUITE • 16 CERTIFIED SYSTEMS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-slate-950">
              Complete Engineering <span className="text-[#0d7cae]">Product Matrix</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
              Every system is manufactured and certified to strict ASTM, DIN, BS EN, and SASO specifications, fully stocked in our Jeddah distribution facility.
            </p>

            {/* Quick Live Search Bar */}
            <div className="pt-2 max-w-md mx-auto">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by system, ASTM, DIN, or valve spec..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0d7cae] focus:ring-1 focus:ring-[#0d7cae] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 16 Products Grid (4 Columns x 4 Rows matching client's slide 1:1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-7xl mx-auto">
            {filteredProducts.map((prod, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <div
                  key={prod.id}
                  onClick={() => {
                    handleSelectProduct(idx);
                    // Smoothly scroll dial into view if clicked from below
                    scrollToTarget('product-range');
                  }}
                  className={`p-4 sm:p-5 rounded-[22px] border transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#e0f2fe] via-[#d5eefe] to-[#bae6fd]/60 border-2 border-[#0d7cae] shadow-md -translate-y-1'
                      : 'bg-gradient-to-br from-[#f8fafc] via-[#f0f9ff]/70 to-[#e0f2fe]/40 border-slate-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 hover:border-sky-300'
                  }`}
                >
                  {/* Subtle Background Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0d7cae]/5 rounded-full blur-2xl pointer-events-none" />

                  <div>
                    {/* Header: System Number, Column, & Standard Badge */}
                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-mono font-normal text-slate-700 shadow-2xs border border-slate-200/60">
                          #{prod.number}
                        </span>
                        <span className="text-[10px] font-mono font-normal text-slate-400">
                          Col {prod.column}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-mono font-normal text-[#0d7cae] shadow-2xs border border-slate-200/60 truncate max-w-[120px]">
                        {prod.standard.split('/')[0]}
                      </span>
                    </div>

                    {/* Authentic Studio Product Image */}
                    <div
                      style={{ height: '140px', position: 'relative' }}
                      className="relative w-full h-[140px] rounded-xl bg-white/90 border border-white my-2 flex items-center justify-center overflow-hidden shadow-2xs group-hover:shadow-sm transition-shadow"
                    >
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 300px"
                        className="object-contain p-2.5 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Official Product Title from Client Slide (Font Normal) */}
                    <h4 className="text-xs sm:text-[13px] font-normal text-slate-900 mt-3 line-clamp-1 group-hover:text-[#0d7cae] transition-colors">
                      {prod.name}
                    </h4>

                    {/* Short Description (Font Normal) */}
                    <p className="text-[11px] text-slate-500 font-normal mt-1 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Specification Tag (Font Normal) */}
                    <div className="mt-2.5 flex items-center gap-1 text-[10px] text-slate-600 font-mono font-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="truncate">{prod.ratingBadge}</span>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-3 border-t border-sky-100/80 mt-4 flex items-center justify-between gap-2 relative z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProductForRfq(prod.name);
                      }}
                      className="flex-1 py-1.5 rounded-full bg-[#0d7cae] hover:bg-[#0b6a95] text-white text-[11px] font-normal shadow-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Request RFQ</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                    {onViewProductDetails && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewProductDetails(prod);
                        }}
                        className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-normal transition-colors"
                      >
                        Specs
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
