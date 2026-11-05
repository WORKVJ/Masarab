'use client';

import React from 'react';
import { ProjectCase } from '@/lib/api';
import { Building2, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ProjectShowcaseProps {
  projects: ProjectCase[];
  onOpenRfq: () => void;
}

export default function ProjectShowcase({ projects, onOpenRfq }: ProjectShowcaseProps) {
  return (
    <section id="projects" className="py-24 bg-white text-slate-900 border-b border-slate-200/80 section-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 reveal">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span>VERIFIED SAUDI CASE STUDIES</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-950 font-sans leading-none">
              MAJOR DELIVERED <span className="text-orange-500">INFRASTRUCTURE</span> PROJECTS
            </h2>
            
            <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
              Demonstrated supply record across the Kingdom of Saudi Arabia's premier petrochemical, water desalination, and energy complexes.
            </p>
          </div>

          <button
            onClick={onOpenRfq}
            className="self-start md:self-auto flex items-center gap-2 bg-slate-950 hover:bg-orange-500 text-white font-bold px-5 py-3 rounded-xl text-xs shadow-md transition-colors cursor-pointer"
          >
            <span>Request Project Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* ============================================================== */}
        {/* ARCHITECTURAL PROJECT CARDS GRID                               */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="bg-white border border-slate-200/90 rounded-3xl p-7 flex flex-col justify-between hover:border-orange-500 hover:-translate-y-1.5 shadow-sm hover:shadow-xl transition-all duration-300 group reveal-card round-on-scroll"
            >
              <div className="space-y-4">
                {/* Sector & Location Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                    {proj.image_badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{proj.location}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-950 group-hover:text-orange-600 transition-colors font-sans leading-snug">
                  {proj.title}
                </h3>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs font-mono font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{proj.metrics}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Solution Provided:
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {proj.solution_provided}
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {proj.details}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-orange-500" />
                  <span>{proj.client_or_sector}</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-600 font-bold">
                  Verified Installation
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}