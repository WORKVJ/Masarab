import React from 'react';
import Image from 'next/image';
import { CLIENTS } from '@/lib/masarContent';
import SectionHeader from './SectionHeader';

function LogoRow({ reverse }: { reverse?: boolean }) {
  const list = reverse ? [...CLIENTS].reverse() : CLIENTS;
  return (
    <div className="mx-logo-mask overflow-hidden">
      <div className={`mx-logo-track ${reverse ? 'mx-logo-track-rev' : ''}`}>
        {[...list, ...list].map((c, i) => (
          <div
            key={`${c.logo}-${i}`}
            className="group shrink-0 w-44 sm:w-52 h-24 sm:h-28 mx-2 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center p-4 transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_16px_30px_-18px_rgba(13,124,174,0.55)]"
          >
            <Image
              src={c.logo}
              alt={!reverse && i < list.length ? c.name : ''}
              width={180}
              height={100}
              className="max-h-full w-auto object-contain grayscale opacity-70 transition-[filter,opacity,scale] duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientsSection() {
  return (
    <section id="clients" className="relative py-20 sm:py-28 bg-[#f6f9fc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <SectionHeader
          align="center"
          eyebrow="Our Clients"
          title={
            <>
              Chosen by <span className="text-[#0d7cae]">leading clients</span> in Saudi Arabia for quality and reliability
            </>
          }
        />
      </div>
      <div className="space-y-4" data-anim="up">
        <LogoRow />
        <LogoRow reverse />
      </div>
    </section>
  );
}
