'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import KineticMarquee from '@/components/KineticMarquee';
import AboutSection from '@/components/sections/AboutSection';
import ProductRangeSection from '@/components/sections/ProductRangeSection';
import SolutionsExplorer from '@/components/sections/SolutionsExplorer';
import IndustriesSection from '@/components/sections/IndustriesSection';
import WhyMasar from '@/components/sections/WhyMasar';
import ClientsSection from '@/components/sections/ClientsSection';
import CtaBand from '@/components/sections/CtaBand';
import RfqSection from '@/components/RfqSection';
import Footer from '@/components/Footer';
import { scrollToTarget } from '@/lib/motion';

// Client-only dynamic imports to guarantee 0 hydration mismatches
const MotionEngine = dynamic(() => import('@/components/motion/MotionEngine'), { ssr: false });
const ScrollController = dynamic(() => import('@/components/ScrollController'), { ssr: false });

export default function HomePage() {
  const [rfqPrefillProduct, setRfqPrefillProduct] = useState<string>('');

  const scrollToRfq = (prefill?: string) => {
    if (prefill) setRfqPrefillProduct(prefill);
    scrollToTarget('rfq');
  };

  return (
    <main className="min-h-screen flex flex-col overflow-x-clip bg-white text-slate-900 selection:bg-[#0d7cae] selection:text-white relative">
      <MotionEngine />
      <ScrollController />

      <Navbar onOpenRfq={() => scrollToRfq()} />

      <Hero onOpenRfq={() => scrollToRfq()} />

      <KineticMarquee
        rows={[
          ['Cooling Solutions', 'Water Treatment', 'Chemical', 'Electrical'],
          ['Instrumentation', 'Mechanical', 'Pipe Fittings & Alloys', 'Safety Equipments'],
        ]}
      />

      {/* Showroom product range (16 lines from the client's display board) */}
      <ProductRangeSection onRequestQuote={(name) => scrollToRfq(name)} />

      <AboutSection onOpenRfq={() => scrollToRfq()} />

      <SolutionsExplorer onRequestQuote={(name) => scrollToRfq(name)} />

      <IndustriesSection />

      <WhyMasar onOpenRfq={() => scrollToRfq()} />

      <ClientsSection />

      <CtaBand onOpenRfq={() => scrollToRfq()} />

      <RfqSection prefilledProduct={rfqPrefillProduct} onClearPrefill={() => setRfqPrefillProduct('')} />

      <Footer />
    </main>
  );
}
