import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES } from '@/lib/masarContent';
import CountUp from '@/components/motion/CountUp';
import SectionHeader from './SectionHeader';
import IndustryList from './IndustryList';

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
      {/* slow drifting glows (transform-only, paused while off screen) */}
      <div className="mx-orb-drift pointer-events-none absolute -top-32 right-[-10%] h-[460px] w-[460px] rounded-full bg-sky-200/50 blur-3xl" />
      <div className="mx-orb-drift-rev pointer-events-none absolute -bottom-40 left-[-8%] h-[380px] w-[380px] rounded-full bg-sky-100/80 blur-3xl" />
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
              {/* photo: parallax on scroll + slow Ken Burns drift */}
              <div data-parallax-img className="absolute -inset-y-[10%] inset-x-0">
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="mx-kenburns object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#04121f] via-[#04121f]/40 to-transparent" />
              <div className="mx-sweep pointer-events-none absolute inset-y-0 -left-1/3 w-1/3" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white">
                <div className="flex items-end gap-6">
                  <div>
                    <p className="text-5xl sm:text-6xl font-black leading-none tracking-tight">
                      <CountUp value={INDUSTRIES.length} duration={1400} />
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-sky-200">Sectors supplied</p>
                  </div>
                  <div className="h-14 w-px bg-white/20" />
                  <div>
                    <p className="text-5xl sm:text-6xl font-black leading-none tracking-tight">
                      <CountUp value={8} duration={1400} delay={150} />
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-sky-200">Product divisions</p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="group/cta mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#04121f] transition-colors hover:bg-sky-100"
                >
                  Discuss your plant&apos;s needs <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right: every sector with what we supply to it */}
        <IndustryList items={INDUSTRIES.map((name) => ({ name, supply: SUPPLIES[name] }))} />
      </div>
    </section>
  );
}
