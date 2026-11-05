'use client';

import React from 'react';
import {
  Building2,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Star,
  ArrowUpRight,
  Truck,
  Sparkles
} from 'lucide-react';

interface ReviewItem {
  id: number;
  name: string;
  role: string;
  project: string;
  location: string;
  quote: string;
  standard: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 1,
    name: 'Eng. Tariq Al-Mansoor',
    role: 'Lead EPC Project Director',
    project: 'Yanbu Petrochemical & Refinery Expansion',
    location: 'Yanbu Industrial City',
    quote: 'Masar Arabia\'s certified metal valves, industrial pipeline fittings, and heavy access systems delivered maximum operational efficiency and zero downtime. Their engineering team ensured 100% compliance with stringent Saudi Aramco specifications with rapid dispatch from their Jeddah depot.',
    standard: 'Aramco 9COM & ASTM Certified',
  },
  {
    id: 2,
    name: 'Dr. Ziyad Al-Harbi',
    role: 'Senior Water Treatment Consultant',
    project: 'Jeddah Seawater RO Desalination Complex',
    location: 'Jeddah Coastal Hub',
    quote: 'Their thermoplastic polymer piping (PPH/HDPE) and precision vacuum breakers delivered exceptional corrosion immunity and fluid integrity under high-salinity Red Sea conditions. Masar Arabia is our trusted procurement partner for mission-critical infrastructure.',
    standard: 'SWCC & ASME Compliant',
  },
  {
    id: 3,
    name: 'Eng. Faisal Al-Ghamdi',
    role: 'Infrastructure Lead',
    project: 'King Salman Energy Park (SPARK)',
    location: 'Eastern Province',
    quote: 'Supplied high-precision mechanical couplings, ductile iron access covers, and heavy-duty trench gratings rated for 60-ton proof axle loads. The Mill Test Certificates and inspection consistency were the highest standard we have audited across the Kingdom.',
    standard: 'EN 124 D400 Proof Load Tested',
  },
];

const REGIONAL_HUBS = [
  { province: 'Western Hub', city: 'Jeddah & Yanbu', leadTime: '24h Dispatch', code: 'W-01' },
  { province: 'Central Hub', city: 'Riyadh Depot', leadTime: '24-48h Delivery', code: 'C-02' },
  { province: 'Eastern Hub', city: 'Dammam & Jubail', leadTime: '48h Transit', code: 'E-03' },
  { province: 'Red Sea Hub', city: 'NEOM & Tabuk', leadTime: 'Scheduled Freight', code: 'N-04' },
];

export default function ContractorReviews() {
  return (
    <section id="reviews" className="rvs-section border-b border-slate-200/80 section-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* GROWMEDLINK SIGNATURE: ANIMATED WAVE DOTS                      */}
        {/* ============================================================== */}
        <div className="flex justify-center mb-2">
          <div className="rvs-dots flex items-center gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="rvs-dot"
                style={{
                  position: 'relative',
                  animationDelay: `${(i * 0.22).toFixed(2)}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VERIFIED SAUDI EPC PERFORMANCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-950 font-sans leading-none">
            TRUSTED BY <span className="text-orange-500">TIER-1 EPC LEADERS</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Validation across the Kingdom's largest energy, municipal desalination, and industrial manufacturing sites.
          </p>
        </div>

        {/* ============================================================== */}
        {/* GROWMEDLINK SIGNATURE: 38fr / 62fr 2-COLUMN SPLIT GRID         */}
        {/* ============================================================== */}
        <div className="rvs-grid mb-12">
          
          {/* Left Column: Dark KSA Logistics Hub (.rvs-left) */}
          <div className="rvs-left">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded border border-orange-500/20">
                  NATIONAL LOGISTICS
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>ACTIVE FLEET</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-sans">
                Kingdom-Wide Distribution Network
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                15,000 m² Central Logistics Depot in Jeddah supporting all administrative regions.
              </p>
            </div>

            {/* 4 Province Hub Cards (2x2 Grid) */}
            <div className="rvs-country-grid my-6">
              {REGIONAL_HUBS.map((hub, idx) => (
                <div key={idx} className="rvs-ccard">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-1">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="font-mono text-[10px] font-black text-white uppercase tracking-wider">
                    {hub.province}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium truncate w-full">
                    {hub.city}
                  </div>
                  <span className="text-[9px] font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/30 mt-1">
                    {hub.leadTime}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Status Ribbon */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Central Western Depot Ready</span>
              <a href="#rfq" className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1">
                <span>Dispatch Status</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: 3 Clean Contractor Testimonial Cards */}
          <div className="flex flex-col gap-4">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-orange-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 reveal-card round-on-scroll"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                      {rev.standard}
                    </span>
                    <div className="flex text-amber-400 gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal mb-4">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-950 font-sans">
                      {rev.name}
                    </h4>
                    <div className="text-[11px] font-mono text-orange-600 font-bold uppercase tracking-wider">
                      {rev.role}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 text-right">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{rev.project}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
