'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function StandardsBanner() {
  const standards = [
    {
      code: 'ASTM D1785 / F441',
      name: 'Thermoplastic Piping & Pressure Tolerances',
      desc: 'Schedule 40 & 80 PVC/CPVC hydrostatic pressure, tensile, and chemical endurance validation.',
    },
    {
      code: 'EN 124 D400 / F900',
      name: 'Gully Tops & Manhole Proof Load Rating',
      desc: 'Certified 40-Ton highway and 90-Ton airport runway proof testing with gas-tight cushioning.',
    },
    {
      code: 'Saudi Aramco 9COM',
      name: 'Approved Vendor Technical Catalog',
      desc: 'Strict plant safety compliance, non-destructive ultrasonic testing, and QA/QC approval.',
    },
    {
      code: 'ISO 9001:2015',
      name: 'Certified Quality Management System',
      desc: 'Standardized factory fabrication, precision CNC edge banding, and complete batch inspection.',
    },
    {
      code: 'SASO 650 Standards',
      name: 'Saudi Standards, Metrology and Quality',
      desc: 'Certified domestic and municipal conformity for commercial building and infrastructure use.',
    },
    {
      code: 'DIN 8077 / 8078',
      name: 'Polypropylene (PPR / PPH) Pipeline Standards',
      desc: 'High-temperature PN20/PN25 hydrostatic stress testing and thermal fusion integrity.',
    },
  ];

  return (
    <section id="standards" className="py-24 bg-[#fafbfc] text-slate-900 border-b border-slate-200/80 section-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>INTERNATIONAL ACCREDITATIONS &amp; QA/QC</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-950 font-sans leading-none">
            ENGINEERED TO <span className="text-orange-500">GLOBAL SPECIFICATIONS</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-500 font-medium max-w-xl mx-auto">
            Every batch supplied by Masar Arabia undergoes certified laboratory testing and heat-number tracking to guarantee 100% compliance on site.
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standards.map((std, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-orange-500 transition-all flex flex-col justify-between group hover:-translate-y-1.5 reveal-card round-on-scroll"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    {std.code}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                
                <h3 className="font-bold text-base text-slate-950 group-hover:text-orange-600 transition-colors font-sans">
                  {std.name}
                </h3>
                
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {std.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Certified Lab Test Verified (MTC 3.1 &amp; 3.2)</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}