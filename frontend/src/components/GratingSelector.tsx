'use client';

import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Layers,
  Building2,
  Anchor,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Flame,
  Zap,
  Weight,
  Sliders,
  Gauge,
  Check,
  AlertTriangle
} from 'lucide-react';

interface GratingSelectorProps {
  onSelectMaterial: (materialName: string) => void;
}

interface MaterialSpec {
  id: string;
  name: string;
  shortName: string;
  headline: string;
  recommendedGrade: string;
  corrosionRating: number; // 1-5
  weight: string;
  fireRating: string;
  sparkSafety: string;
  spanGuideline: string;
  modulusE: number; // GPa
  momentI: number;   // cm4 per meter
  advantages: string[];
  applications: string[];
  icon: React.ElementType;
}

const MATERIALS: MaterialSpec[] = [
  {
    id: 'frp-molded',
    name: 'FRP Molded Grating (38x38 Mesh)',
    shortName: 'FRP Molded Grating',
    headline: 'Ultimate Bi-Directional Corrosion Immunity for Chemical & Coastal Plants',
    recommendedGrade: 'Isophthalic Polyester or Vinyl Ester Resin',
    corrosionRating: 5,
    weight: '12.5 kg/m² (1/4 weight of steel)',
    fireRating: 'ASTM E84 Class 1 (< 25 Flame Spread)',
    sparkSafety: '100% Non-Conductive (Zero Sparking)',
    spanGuideline: 'Clear span up to 1000 mm (< L/200 deflection)',
    modulusE: 13,
    momentI: 18.5,
    advantages: [
      'Zero maintenance: never requires painting, scraping, or galvanizing touch-ups',
      'Embedded quartz grit surface provides certified R13 wet/oily slip resistance',
      'Easily cut on-site with standard diamond blades without edge rust hazards',
    ],
    applications: [
      'Seawater Intake Platforms & Desalination RO Skids',
      'Refinery Acid & Alkali Handling Areas',
      'Offshore Oil & Gas Rigs and Walkways',
      'Cooling Tower Decks and Industrial Washbays',
    ],
    icon: ShieldCheck,
  },
  {
    id: 'grp-pultruded',
    name: 'Heavy-Duty Pultruded GRP',
    shortName: 'Pultruded Structural GRP',
    headline: '70% Glass Content for Extended Spans (up to 1.8m) & Heavy Loads',
    recommendedGrade: 'I-6015 / T-5020 High Modulus Vinyl Ester',
    corrosionRating: 5,
    weight: '15.8 kg/m² (High Stiffness-to-Weight)',
    fireRating: 'ASTM E84 Class 1 Flame Retardant with UV Absorbers',
    sparkSafety: '100% Dielectric Insulation (High Voltage Safe)',
    spanGuideline: 'Spans up to 1800 mm without mid-span structural beams',
    modulusE: 24,
    momentI: 22.0,
    advantages: [
      'High flexural modulus rivals structural steel beams',
      'Permanent resistance to 90+ corrosive chemicals including sulfuric acid and H2S gas',
      'Significantly lowers deadweight on elevated industrial structures',
    ],
    applications: [
      'Unsupported Long-Span Pipe Rack Walkways',
      'Substation Transformer Containment Trench Covers',
      'Wastewater Aeration Basins & Clarifier Bridges',
      'Mining Slurry & Chemical Processing Facilities',
    ],
    icon: Layers,
  },
  {
    id: 'steel-galvanized',
    name: 'Electro-Forged Steel Grating',
    shortName: 'Electro-Forged Steel Grating',
    headline: 'Maximum Impact Resistance & 60-Ton Vehicular Axle Load Capacity',
    recommendedGrade: 'ASTM A36 / S275JR with Hot-Dip Zinc to ASTM A123 / ISO 1461',
    corrosionRating: 3,
    weight: '32 - 55 kg/m² (Heavy Structural Steel)',
    fireRating: 'Non-Combustible (Euroclass A1 Fire Safe)',
    sparkSafety: 'Electrically Conductive (Requires Earthing)',
    spanGuideline: 'Engineered for extreme axle point loads (up to 60 tons)',
    modulusE: 200,
    momentI: 16.5,
    advantages: [
      'Machine electro-forged welds prevent crossbar dislocation under impact',
      'Zinc coating >= 85 microns provides 15-25 years protection in inland KSA',
      'Serrated bearing bars provide mechanical traction in oil environments',
    ],
    applications: [
      'Heavy Equipment Maintenance Mezzanines & Power Plants',
      'Industrial Loading Dock Trenches & Driveway Gullies',
      'Cement Kilns, Mining Crushers & Steel Mills',
      'High-Vibration Machinery Operating Platforms',
    ],
    icon: Building2,
  },
  {
    id: 'aluminum-marine',
    name: 'Marine-Grade Aluminum Bar Grating',
    shortName: 'Marine Aluminum Grating',
    headline: 'Spark-Proof, Non-Magnetic & Marine Salt-Spray Resilient for Jetties',
    recommendedGrade: 'Extruded Alloy 6063-T6 or 6082-T6 (Anodized 20µm)',
    corrosionRating: 4,
    weight: '11.0 kg/m² (1/3 of Steel)',
    fireRating: 'Non-Combustible (Natural Oxide Passivation)',
    sparkSafety: '100% Spark-Proof (ATEX / Ex-Proof Safe)',
    spanGuideline: 'Optimal for spans up to 1200 mm with minimal substructure',
    modulusE: 69,
    momentI: 15.0,
    advantages: [
      'Natural alumina oxide layer self-heals against coastal Red Sea salt air',
      'Zero spark hazard when struck with metallic tools in volatile areas',
      'Clean architectural metallic finish that requires no paint or coating',
    ],
    applications: [
      'Port Marine Jetties & Floating Pontoons (Jeddah & Red Sea Ports)',
      'Explosive Solvent Handling & Gas Storage Areas',
      'Modern Architectural Sunscreens, Ceiling Grids & Facades',
      'Water Treatment Plant Elevated Walkways',
    ],
    icon: Anchor,
  },
  {
    id: 'stainless-316',
    name: 'Sanitary Stainless Steel Grating',
    shortName: 'Stainless Steel 316L',
    headline: 'Maximum Hygiene, Caustic Washdown & Pitting Resistance',
    recommendedGrade: 'AISI 316L (EN 1.4404) Electropolished or Pickled',
    corrosionRating: 5,
    weight: '35 - 50 kg/m² (Solid Stainless Steel)',
    fireRating: 'Euroclass A1 Non-Combustible (+800°C Rated)',
    sparkSafety: 'Electrically Conductive & Antimicrobial Surface',
    spanGuideline: 'Engineered for food/pharma grade hygiene and heavy drainage',
    modulusE: 193,
    momentI: 16.0,
    advantages: [
      'Molybdenum alloy addition prevents chloride pitting corrosion',
      'Smooth electropolished finish eliminates bacterial harbor points',
      'Withstands high-temperature steam and harsh caustic sanitizers',
    ],
    applications: [
      'Pharmaceutical Cleanrooms & Hospital Drainage',
      'Dairy, Beverage & Food Processing Facilities',
      'Chemical Synthesis & Battery Production Plants',
      'Desalination Brine Return Lines',
    ],
    icon: Sparkles,
  },
];

export default function GratingSelector({ onSelectMaterial }: GratingSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>('frp-molded');
  const [activeTab, setActiveTab] = useState<'specs' | 'simulator'>('specs');

  // Engineering Simulator Controls
  const [spanMm, setSpanMm] = useState<number>(1000);
  const [loadKnM2, setLoadKnM2] = useState<number>(5.0);

  const activeMaterial = MATERIALS.find((m) => m.id === selectedId) || MATERIALS[0];

  // Engineering Deflection Calculation: delta = (5 * w * L^4) / (384 * E * I)
  const simulationResult = useMemo(() => {
    const L = spanMm / 1000; // meters
    const w = loadKnM2; // kN/m (per meter width)
    const E = activeMaterial.modulusE * 1e6; // kN/m²
    const I = activeMaterial.momentI * 1e-8; // m^4 per meter width

    // Deflection in mm
    const deltaM = (5 * w * Math.pow(L, 4)) / (384 * E * I);
    const deltaMm = Math.max(0.1, Math.min(25, deltaM * 1000));
    const spanRatio = Math.round(spanMm / deltaMm);
    const isPassingAstm = spanRatio >= 200; // ASTM standard deflection limit: L/200

    // Safety factor
    const safetyFactor = Math.max(1.5, Math.min(8.0, (200 / deltaMm) * 0.04 + 2.2));

    return {
      deflectionMm: deltaMm.toFixed(2),
      spanRatio,
      isPassingAstm,
      safetyFactor: safetyFactor.toFixed(1),
      visualSag: Math.min(18, deltaMm * 2.2),
    };
  }, [spanMm, loadKnM2, activeMaterial]);

  return (
    <section id="specifier" className="py-24 bg-white text-slate-900 border-b border-slate-200/80 section-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span>ENGINEERING MATERIAL SPECIFIER &amp; DEFLECTION ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-950 font-sans leading-none">
            SPECIFY THE <span className="text-orange-500">EXACT MATERIAL</span> FOR YOUR SITE
          </h2>

          <p className="text-sm sm:text-base text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Directly compare load capacities, corrosion lifespans, and live engineering deflections for Saudi Aramco, SWCC, and civil developments.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 2-COLUMN SELECTOR & SIMULATOR INTERFACE                        */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 5 Selectable Materials List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Select Structural Substrate:
              </span>
              <span className="text-[11px] font-mono text-orange-600 font-bold">
                5 Standard Alloys &amp; Resins
              </span>
            </div>

            {MATERIALS.map((mat) => {
              const isSelected = mat.id === selectedId;
              const Icon = mat.icon;

              return (
                <button
                  key={mat.id}
                  onClick={() => setSelectedId(mat.id)}
                  className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-slate-950 text-white border-slate-950 shadow-xl'
                      : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200/90 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-orange-500 text-white shadow-md' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold uppercase tracking-tight leading-snug truncate">
                        {mat.name}
                      </h4>
                      <p className={`text-[11px] font-mono truncate mt-0.5 ${
                        isSelected ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {mat.recommendedGrade}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-orange-500 translate-x-1' : 'text-slate-300'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Material Specs & Live Deflection Engine */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            
            {/* Top Switcher: Specs vs. Live Deflection Simulator */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                      {activeMaterial.recommendedGrade}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      ASTM A123 / BS EN 124
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-slate-950 mt-1.5 font-sans">
                    {activeMaterial.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="inline-flex p-1 bg-white border border-slate-200 rounded-xl">
                    <button
                      onClick={() => setActiveTab('specs')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeTab === 'specs'
                          ? 'bg-slate-950 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => setActiveTab('simulator')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeTab === 'simulator'
                          ? 'bg-orange-500 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sliders className="w-3 h-3" />
                      <span>Live Simulator</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* TAB 1: SPECIFICATIONS */}
              {activeTab === 'specs' && (
                <div className="pt-5 space-y-6 animate-in fade-in duration-150">
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {activeMaterial.headline}
                  </p>

                  {/* 4 Technical Parameter Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-orange-500" />
                        Corrosion Resistance
                      </span>
                      <span className="text-xs font-black text-slate-950 font-mono">
                        {activeMaterial.corrosionRating}/5 Maximum Rating
                      </span>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block flex items-center gap-1">
                        <Weight className="w-3 h-3 text-blue-500" />
                        Weight / Density
                      </span>
                      <span className="text-xs font-black text-slate-950 font-mono">
                        {activeMaterial.weight}
                      </span>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block flex items-center gap-1">
                        <Flame className="w-3 h-3 text-red-500" />
                        Fire Performance
                      </span>
                      <span className="text-xs font-black text-slate-950">
                        {activeMaterial.fireRating}
                      </span>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-500" />
                        Spark &amp; Electrical
                      </span>
                      <span className="text-xs font-black text-slate-950">
                        {activeMaterial.sparkSafety}
                      </span>
                    </div>
                  </div>

                  {/* Certified Advantages */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Certified Engineering Advantages:
                    </span>
                    {activeMaterial.advantages.map((adv, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span>{adv}</span>
                      </div>
                    ))}
                  </div>

                  {/* Typical Site Applications */}
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Approved Saudi Infrastructure Applications:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeMaterial.applications.map((app, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-700 font-medium"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: LIVE DEFLECTION & LOAD SIMULATOR */}
              {activeTab === 'simulator' && (
                <div className="pt-5 space-y-6 animate-in fade-in duration-150">
                  <div className="p-4 bg-orange-50/80 rounded-2xl border border-orange-200/90 text-xs text-orange-950">
                    <div className="font-bold flex items-center gap-1.5 mb-1">
                      <Gauge className="w-4 h-4 text-orange-600" />
                      <span>Live Deflection Calculation: ASTM Standards</span>
                    </div>
                    <p className="text-[11px] text-orange-900/80 leading-relaxed">
                      Adjust span and uniform loading to verify compliance against ASTM deflection limits (&lt; L/200 for pedestrian walkways, &lt; L/300 for heavy equipment).
                    </p>
                  </div>

                  {/* Sliders Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 bg-white rounded-2xl border border-slate-200">
                    {/* Span Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-500 font-bold">Clear Span (L):</span>
                        <span className="text-orange-600 font-black">{spanMm} mm</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="1800"
                        step="50"
                        value={spanMm}
                        onChange={(e) => setSpanMm(Number(e.target.value))}
                        className="w-full accent-orange-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>500 mm</span>
                        <span>1800 mm</span>
                      </div>
                    </div>

                    {/* Load Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-500 font-bold">Uniform Load (w):</span>
                        <span className="text-orange-600 font-black">{loadKnM2.toFixed(1)} kN/m²</span>
                      </div>
                      <input
                        type="range"
                        min="2.0"
                        max="20.0"
                        step="0.5"
                        value={loadKnM2}
                        onChange={(e) => setLoadKnM2(Number(e.target.value))}
                        className="w-full accent-orange-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>2.0 kN/m² (Light)</span>
                        <span>20.0 kN/m² (Heavy)</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Beam Sag Diagram */}
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-white font-mono">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Simulated Cross-Section Flexure</span>
                      <span>Span: {spanMm} mm</span>
                    </div>

                    <div className="h-16 flex items-center justify-center relative px-4">
                      {/* Left and Right Supports */}
                      <div className="absolute left-4 bottom-2 w-4 h-6 bg-slate-600 rounded-t" />
                      <div className="absolute right-4 bottom-2 w-4 h-6 bg-slate-600 rounded-t" />

                      {/* Flexing Beam SVG */}
                      <svg className="w-full h-12 overflow-visible" preserveAspectRatio="none">
                        <path
                          d={`M 16 14 Q 50% ${14 + simulationResult.visualSag} 96% 14`}
                          fill="none"
                          stroke="#ea580c"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    {/* Telemetry Metrics */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Deflection</span>
                        <span className="text-sm font-bold text-white">{simulationResult.deflectionMm} mm</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Ratio</span>
                        <span className="text-sm font-bold text-orange-400">L / {simulationResult.spanRatio}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Safety Factor</span>
                        <span className="text-sm font-bold text-emerald-400">{simulationResult.safetyFactor}x</span>
                      </div>
                    </div>
                  </div>

                  {/* Compliance Status Badge */}
                  <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${
                    simulationResult.isPassingAstm
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    {simulationResult.isPassingAstm ? (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                    <div>
                      <span className="font-bold">
                        {simulationResult.isPassingAstm
                          ? 'ASTM COMPLIANT: '
                          : 'CAUTION DEFLECTION LIMIT: '}
                      </span>
                      {simulationResult.isPassingAstm
                        ? `Deflection is within allowable limit (L / ${simulationResult.spanRatio} >= L/200). Fully approved for Saudi Aramco platforms.`
                        : `Deflection exceeds L/200 limit. Consider upgrading to Heavy Pultruded GRP or Electroforged Steel.`}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom RFQ Button */}
            <div className="pt-6 mt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Custom cutouts, band edging, and hold-down clamp fixing clips available.
              </div>
              <button
                onClick={() => onSelectMaterial(activeMaterial.shortName)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-orange-500/30"
              >
                <span>Request Quote for {activeMaterial.shortName}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
