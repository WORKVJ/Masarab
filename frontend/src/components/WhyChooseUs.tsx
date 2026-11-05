'use client';

import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Truck,
  Wrench,
  FileCheck2,
  Layers
} from 'lucide-react';

export default function WhyChooseUs() {
  const comparisonData = [
    {
      metric: 'Resin Formulation & UV Durability',
      masarArabia: '100% Pure Virgin Isophthalic & Vinyl Ester resins with dual UV absorbers (+55°C Gulf rating)',
      genericTrading: 'Generic orthophthalic resin prone to micro-cracking, yellowing, and rapid embrittlement',
    },
    {
      metric: 'Hot-Dip Galvanizing Quality',
      masarArabia: 'Minimum 85 - 100 microns zinc thickness compliant to ASTM A123 / ISO 1461 with mill certs',
      genericTrading: 'Thin commercial flash galvanizing (40-50 microns) that corrodes in Red Sea coastal air within 18 months',
    },
    {
      metric: 'Prefabricated CNC Custom Banding',
      masarArabia: 'Automated CNC panel cutting with complete perimeter margin edge banding before galvanizing',
      genericTrading: 'Manual field gas-torch cutting on site that destroys protective zinc and leaves razor-sharp edges',
    },
    {
      metric: 'Engineering Traceability & MTC',
      masarArabia: 'Full heat-number batch traceability with EN 10204 3.1 & 3.2 Mill Test Certificates per shipment',
      genericTrading: 'Unverified commercial declaration letters without independent mechanical laboratory test data',
    },
    {
      metric: 'Central Jeddah Buffer Stock',
      masarArabia: 'Over 15,000 m² of standard panels, stair treads, and SS316 clips ready for immediate 24-48h dispatch',
      genericTrading: 'Import-on-order brokerage with 8-12 week maritime delays causing costly contractor delay penalties',
    },
  ];

  return (
    <section id="comparison" className="py-24 bg-[#fafbfc] text-slate-900 border-b border-slate-200/80 section-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>THE MASAR ARABIA ENGINEERING STANDARD</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-950 font-sans leading-none">
            WHY TIER-1 EPCs <span className="text-orange-500">CHOOSE MASAR ARABIA</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-500 font-medium max-w-xl mx-auto">
            In aggressive Saudi marine and petrochemical environments, low-grade materials cause catastrophic failures. Here is how our engineering rigor sets the benchmark.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 3 VALUE PILLARS (Clean White Cards)                             */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-orange-500 transition-all duration-300 reveal-card round-on-scroll">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base uppercase tracking-tight text-slate-950 font-sans">
              Zero Marine Corrosion
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
              Formulated specifically for the high-salinity waters of the Red Sea and Arabian Gulf. 100% immune to chlorine, hydrogen sulfide, and caustic cleaning acids.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-orange-500 transition-all duration-300 reveal-card round-on-scroll">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base uppercase tracking-tight text-slate-950 font-sans">
              Jeddah Rapid Mobilization
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
              Our central Western Province inventory allows immediate mobilization for turnaround projects across Jeddah, Yanbu, Rabigh, Riyadh, and Dammam.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-orange-500 transition-all duration-300 reveal-card round-on-scroll">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base uppercase tracking-tight text-slate-950 font-sans">
              Precision Custom Fabrication
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
              We supply prefabricated panels with pipe penetration cutouts, toe plates, and banded margins, ready for bolt-on installation on site with zero field hot work.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* EXECUTIVE COMPARISON TABLE                                     */}
        {/* ============================================================== */}
        <div className="rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                  <th className="py-4 px-6 font-bold w-1/4 uppercase tracking-wider text-[11px] font-mono text-slate-500">
                    Engineering Metric
                  </th>
                  <th className="py-4 px-6 font-black w-3/8 text-orange-600 uppercase tracking-wider text-[11px] font-mono bg-orange-50/50">
                    Masar Arabia Standard
                  </th>
                  <th className="py-4 px-6 font-bold w-3/8 text-slate-400 uppercase tracking-wider text-[11px] font-mono">
                    Generic Commercial Trading
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 text-xs sm:text-[13px]">
                      {row.metric}
                    </td>
                    <td className="py-4 px-6 text-slate-800 bg-orange-50/20 text-xs sm:text-[13px] leading-relaxed">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <span>{row.masarArabia}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs sm:text-[13px] leading-relaxed">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                        <span>{row.genericTrading}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}