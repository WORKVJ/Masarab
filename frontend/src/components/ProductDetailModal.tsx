'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/api';
import { X, CheckCircle2, ShieldCheck, FileText, ArrowRight, Layers, Building2, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onProceedToRfq: (productTitle: string) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onProceedToRfq,
}: ProductDetailModalProps) {
  // Freeze page smooth-scroll while the modal is open; Escape closes it
  useEffect(() => {
    if (!product) return;
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.__lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      data-lenis-prevent
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="mx-modal-backdrop fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div className="mx-modal-panel bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Header with Dark Industrial Prestige */}
        <div className="p-6 bg-slate-950 text-white flex items-start justify-between gap-4 border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-orange-500 text-white px-2.5 py-0.5 rounded-md shadow-xs">
                {product.category_name || 'Industrial System'}
              </span>
              <span className="text-xs text-slate-300 font-mono bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-700">
                {product.standards}
              </span>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Stock Ready in Jeddah</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight uppercase text-white font-sans">
              {product.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-sm">
          
          {/* Top Section: High-Resolution Photo + Core Description */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Image Stage */}
            <div className="md:col-span-5 h-56 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 p-4 relative overflow-hidden flex items-center justify-center">
              <span className="absolute top-2 left-2 text-[10px] font-mono text-slate-300 font-bold">+</span>
              <span className="absolute top-2 right-2 text-[10px] font-mono text-slate-300 font-bold">+</span>
              <span className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-300 font-bold">+</span>
              <span className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-300 font-bold">+</span>
              
              {product.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <Building2 className="w-16 h-16 text-slate-300" />
              )}
            </div>

            {/* Right Overview */}
            <div className="md:col-span-7 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Engineering Specification Summary
              </h4>
              <p className="text-slate-700 leading-relaxed text-sm">
                {product.full_description || product.short_description}
              </p>

              <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-200/80 text-xs text-orange-950 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Third-Party Inspected: </span>
                  Supplied with complete Heat Batch Traceability and Mill Test Certificates (MTC 3.1 &amp; 3.2) conforming to Saudi Aramco 9COM and SWCC technical compliance.
                </div>
              </div>
            </div>

          </div>

          {/* Key Advantages & Features Grid */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified Engineering Advantages</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Table */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-orange-600" />
                <span>Technical Dimensions, Tolerances &amp; Ratings</span>
              </h4>
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], idx) => (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}
                      >
                        <td className="py-2.5 px-4 font-bold text-slate-900 w-2/5 border-b border-slate-100">
                          {key}
                        </td>
                        <td className="py-2.5 px-4 text-slate-700 border-b border-slate-100 font-mono">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Recommended Applications */}
          {product.applications && product.applications.length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Recommended Sector Deployments
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-100 text-slate-800 border border-slate-200 text-xs px-3 py-1 rounded-lg font-medium"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Need custom fabrication, special cutouts, or rapid site submittals?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onProceedToRfq(product.title);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-orange-500/20 transition-all cursor-pointer hover:shadow-orange-500/30"
            >
              <FileText className="w-4 h-4" />
              <span>Request Technical Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
