import Image from 'next/image';
import { Check } from 'lucide-react';
import { type DetailBlock, imageSize } from '@/lib/catalog';

/** Renders imported page content (paragraphs, headings, check lists, photos, sub-type cards) in the division colour. */
export default function DetailBlocks({ blocks, alt }: { blocks: DetailBlock[]; alt: string }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return (
              <p key={i} className="text-[15px] sm:text-base leading-[1.8] text-slate-600">
                {b.text}
              </p>
            );
          case 'heading':
            return (
              <h3 key={i} className="pt-2 text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                {b.text}
              </h3>
            );
          case 'list':
            return (
              <ul key={i} className={`grid gap-x-8 gap-y-3 ${b.items.some((x) => x.length > 110) ? '' : 'sm:grid-cols-2'}`}>
                {b.items.map((item, k) => (
                  <li key={k} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] grid place-items-center">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            );
          case 'gallery':
            return (
              <div key={i} className={`grid gap-4 ${b.images.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                {b.images.map((src) => {
                  const [w, h] = imageSize(src);
                  return (
                    <div key={src} className="rounded-2xl border border-slate-200 bg-white p-2">
                      <Image
                        src={src}
                        alt={alt}
                        width={w}
                        height={h}
                        sizes={b.images.length > 1 ? '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw' : '(min-width: 1024px) 60vw, 90vw'}
                        className="w-full h-auto rounded-xl"
                      />
                    </div>
                  );
                })}
              </div>
            );
          case 'items':
            return (
              <ul key={i} className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {b.items.map((item, k) => (
                  <li key={k} className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
                    <div className="relative aspect-[4/3]">
                      <Image src={item.image} alt={item.name} fill sizes="(min-width: 640px) 220px, 45vw" className="object-contain" />
                    </div>
                    <span className="mt-2 block text-[13px] sm:text-sm font-semibold leading-snug text-slate-800">{item.name}</span>
                  </li>
                ))}
              </ul>
            );
        }
      })}
    </div>
  );
}
