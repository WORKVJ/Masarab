import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, PhoneCall } from 'lucide-react';
import { CONTACT_INTRO, type Category, type CategoryProduct } from '@/lib/masarContent';
import { getSiteContact } from '@/lib/siteSettings';
import type { DetailBlock, DetailSection } from '@/lib/catalog';
import { quoteHref } from '@/lib/routes';
import { productHref, productLink } from '@/lib/productRoutes';
import DetailBlocks from './DetailBlocks';

/** Overview: the product's intro copy beside its photo and a quote card. */
export async function ProductOverview({
  name,
  intro,
  image,
  eyebrow = 'Overview',
}: {
  name: string;
  intro: DetailBlock[];
  image?: string;
  eyebrow?: string;
}) {
  const CONTACT = await getSiteContact();
  return (
    <section id="overview" data-label="Overview" className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-7" data-anim="up">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[var(--accent)] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            {eyebrow}
          </span>
          <h2 className="mt-5 text-[28px] sm:text-4xl font-black uppercase tracking-[-0.025em] leading-[1.05] text-slate-950 text-balance">
            {name}
          </h2>
          <div className="mt-6">
            <DetailBlocks blocks={intro} alt={name} />
          </div>
        </div>

        <aside className="lg:col-span-5" data-anim="up">
          <div className="lg:sticky lg:top-28 space-y-4">
            {image && (
              <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-slate-200 bg-[var(--accent-soft)]">
                <Image src={image} alt={name} fill sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover" />
              </div>
            )}
            <div className="rounded-[24px] p-6 text-white" style={{ background: 'linear-gradient(135deg, rgb(var(--accent-deep)), var(--accent))' }}>
              <p className="text-lg font-black uppercase leading-tight">Need {name}?</p>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">{CONTACT_INTRO}</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Link
                  href={quoteHref(name)}
                  className="group inline-flex items-center gap-2 rounded-full bg-white text-slate-950 px-5 py-2.5 text-sm font-bold hover:bg-white/90 transition-colors"
                >
                  Request a Quote <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                </Link>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-2.5 text-sm font-bold hover:bg-white/10 transition-colors"
                >
                  <PhoneCall className="w-4 h-4" /> {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

/** Sub-types of a product line (ball joints, pumps, plates …) as a photo grid. */
export function ProductRange({ name, range }: { name: string; range: { name: string; image: string }[] }) {
  return (
    <section id="range" data-label="Range" className="relative py-16 sm:py-24 bg-[var(--accent-soft)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[28px] sm:text-4xl font-black uppercase tracking-[-0.025em] leading-[1.05] text-slate-950">
          Our <span className="text-[var(--accent)]">{name}</span> Range
        </h2>
        <ul className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {range.map((r) => (
            <li key={r.name} data-anim="up">
              <Link
                href={quoteHref(r.name)}
                className="group flex h-full flex-col rounded-[22px] bg-white border border-slate-200/80 p-3 sm:p-4 hover:border-[var(--accent)] hover:shadow-[0_24px_48px_-30px_rgba(15,23,42,0.45)] transition-[border-color,box-shadow] duration-300"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50">
                  <Image src={r.image} alt={r.name} fill sizes="(min-width: 1024px) 280px, (min-width: 768px) 30vw, 45vw" className="object-contain p-2 transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="mt-3 flex flex-1 items-start justify-between gap-2">
                  <span className="text-[14px] sm:text-[15px] font-bold leading-snug text-slate-900">{r.name}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 mt-0.5 text-slate-400 group-hover:text-[var(--accent)] group-hover:rotate-45 transition-[color,rotate] duration-300" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The client's tabbed sections (benefits, how it works, uses …) with a sticky index on large screens. */
export function ProductTopics({ name, sections }: { name: string; sections: DetailSection[] }) {
  const shown = sections.filter((s) => s.blocks.length > 0);
  if (!shown.length) return null;
  return (
    <section id="details" data-label="Details" className="relative py-16 sm:py-24 bg-slate-50 border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-14">
        <nav aria-label={`${name} topics`} className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-[28px] sm:text-4xl font-black uppercase tracking-[-0.025em] leading-[1.05] text-slate-950">
              In <span className="text-[var(--accent)]">Detail</span>
            </h2>
            <ol className="mt-6 space-y-1.5">
              {shown.map((s, i) => (
                <li key={s.title}>
                  <a
                    href={`#topic-${i + 1}`}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold text-slate-700 hover:bg-white hover:text-[var(--accent)] transition-colors"
                  >
                    <span className="font-mono text-xs text-[var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="lg:col-span-8 space-y-5 sm:space-y-6">
          {shown.map((s, i) => (
            <article
              key={s.title}
              id={`topic-${i + 1}`}
              data-anim="up"
              className="scroll-mt-28 rounded-[24px] bg-white border border-slate-200/80 p-6 sm:p-8 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.5)]"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm font-bold text-[var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">{s.title}</h3>
              </div>
              <div className="mt-5">
                <DetailBlocks blocks={s.blocks} alt={`${name} — ${s.title}`} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The other products of the same division. */
export function MoreProducts({ category, current }: { category: Category; current: string }) {
  const others = category.products.filter((p) => p.name !== current);
  if (!others.length) return null;
  return (
    <section id="more" data-label={`More ${category.name}`} className="relative py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[28px] sm:text-4xl font-black uppercase tracking-[-0.025em] leading-[1.05] text-slate-950">
            More <span className="text-[var(--accent)]">{category.name}</span>
          </h2>
          <Link href={`/products/${category.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent)] hover:underline underline-offset-4">
            All {category.name} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {others.slice(0, 8).map((p) => (
            <MoreCard key={p.name} category={category} product={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function MoreCard({ category, product: p }: { category: Category; product: CategoryProduct }) {
  const detail = productHref(category, p.name);
  return (
    <li data-anim="up">
      <Link
        href={productLink(category, p.name)}
        className="group flex h-full flex-col rounded-[22px] border border-slate-200/80 bg-white p-3 hover:border-[var(--accent)] hover:shadow-[0_24px_48px_-30px_rgba(15,23,42,0.45)] transition-[border-color,box-shadow] duration-300"
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--accent-soft)]">
          {p.image && <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 280px, (min-width: 768px) 30vw, 45vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
        </div>
        <span className="mt-3 px-1 text-[14px] sm:text-[15px] font-bold leading-snug text-slate-900">{p.name}</span>
        <span className="mt-auto px-1 pt-2 inline-flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-[var(--accent)] transition-colors">
          {detail ? 'View details' : 'Enquire'} <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    </li>
  );
}
