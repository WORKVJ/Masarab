import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, Factory, Zap, Droplets, Flame, Building, Sprout, Candy, FlaskConical, Anvil, Pickaxe, Pill, Wheat,
} from 'lucide-react';
import { INDUSTRIES } from '@/lib/masarContent';
import SectionHeader from './SectionHeader';

const ICONS = [Factory, Zap, Droplets, Flame, Building, Sprout, Candy, FlaskConical, Anvil, Pickaxe, Pill, Wheat];

/** What Masar supplies to each sector (keys match INDUSTRIES). */
const SUPPLIES: Record<string, string> = {
  Industrial: 'Valves, pumps, fasteners and safety gear for plant maintenance',
  Power: 'Cooling towers, breakers, relays and transformer monitoring',
  'Water & Desalination': 'Water treatment systems, dosing chemicals and pumps',
  'Oil & Gas': 'Pipe fittings, alloy plates, valves and instrumentation',
  Cement: 'Mechanical spares, drives and protective equipment',
  Fertilizers: 'Corrosion-resistant fittings, chemicals and process instruments',
  Sugar: 'Pumps, valves, heat exchangers and process instruments',
  Chemicals: 'Solvents, glycols, alloy piping and chemical-resistant PPE',
  'Steel Mills': 'Cooling systems, VFDs and fire-retardant protective wear',
  Mining: 'Pumps, lifting equipment and fall protection',
  Pharmaceutical: 'Purified-water treatment, calibrators and clean fittings',
  Food: 'Water treatment, chillers, pumps and hygienic valves',
};

export default function IndustriesSection({
  image = { src: '/images/cooling-tower.jpg', alt: 'Cooling towers at an industrial plant in Saudi Arabia' },
}: {
  image?: { src: string; alt: string };
}) {
  return (
    <section id="industries" className="relative py-20 sm:py-28 bg-[#f6f9fc] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: heading + photo panel (stays in view while the list scrolls) */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              eyebrow="Industries We Serve"
              title={
                <>
                  Supplying the Plants that <span className="text-[#0d7cae]">Power the Kingdom</span>
                </>
              }
              intro="We specialize in the procurement and supply of Mechanical, Electrical, and Instrumentation materials and equipment for plants across every major sector."
            />

            <div data-anim="up" className="relative mt-8 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-3xl bg-[#04121f] shadow-[0_30px_60px_-30px_rgba(4,18,31,0.6)]">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04121f] via-[#04121f]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white">
                <div className="flex items-end gap-6">
                  <div>
                    <p className="text-5xl sm:text-6xl font-black leading-none tracking-tight">{INDUSTRIES.length}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-sky-200">Sectors supplied</p>
                  </div>
                  <div className="h-14 w-px bg-white/20" />
                  <div>
                    <p className="text-5xl sm:text-6xl font-black leading-none tracking-tight">8</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-sky-200">Product divisions</p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#04121f] transition-colors hover:bg-sky-100"
                >
                  Discuss your plant&apos;s needs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right: every sector with what we supply to it */}
        <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-x-10 border-t border-slate-200 self-start">
          {INDUSTRIES.map((name, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={name} data-anim="up" className="group flex items-start gap-4 border-b border-slate-200 py-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-[#0d7cae] ring-1 ring-slate-200 transition-colors duration-300 group-hover:bg-[#0d7cae] group-hover:text-white group-hover:ring-[#0d7cae]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[17px] font-bold leading-snug text-slate-950">{name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{SUPPLIES[name]}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
