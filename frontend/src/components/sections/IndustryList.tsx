'use client';

import { useEffect, useRef } from 'react';
import { Factory, Zap, Droplets, Flame, Building, Sprout, Candy, FlaskConical, Anvil, Pickaxe, Pill, Wheat } from 'lucide-react';

const ICONS = [Factory, Zap, Droplets, Flame, Building, Sprout, Candy, FlaskConical, Anvil, Pickaxe, Pill, Wheat];

/**
 * The 12 sectors. Rows fade up one after another (MotionEngine, data-anim), each icon then
 * draws itself line by line, and hovering a row fills its icon and runs a blue line along its edge.
 */
export default function IndustryList({ items }: { items: { name: string; supply: string }[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // normalise every icon stroke to length 1, so one CSS animation can draw any shape
    list.querySelectorAll('[data-draw] :is(path, circle, rect, line, polyline, polygon, ellipse)').forEach((el) => el.setAttribute('pathLength', '1'));
    list.classList.add('can-draw');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        list.classList.add('is-in');
        io.disconnect();
      },
      { threshold: 0.15 },
    );
    io.observe(list);
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={ref} className="ind-list lg:col-span-7 grid sm:grid-cols-2 gap-x-10 border-t border-slate-200 self-start">
      {items.map(({ name, supply }, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <li key={name} data-anim="up" className="ind-row group flex items-start gap-4 border-b border-slate-200 py-6" style={{ '--i': i } as React.CSSProperties}>
            <span className="ind-icon grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-[#0d7cae] ring-1 ring-slate-200 group-hover:bg-[#0d7cae] group-hover:text-white group-hover:ring-[#0d7cae]">
              <Icon data-draw className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <h3 className="ind-title text-[17px] font-bold leading-snug text-slate-950">{name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{supply}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
