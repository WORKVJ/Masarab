import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/masarContent';
import { imageSize, VALVES } from '@/lib/catalog';
import { categoryHref, quoteHref, SITE_URL } from '@/lib/routes';
import { VALVES_PAGE, valveHref } from '@/lib/productRoutes';
import { fitTitle, pageMetadata } from '@/lib/seo';
import { DIVISION_THEMES, themeColors, themeVars } from '@/lib/divisionThemes';
import PageHero from '@/components/sections/PageHero';
import DivisionCta from '@/components/division/DivisionCta';
import DetailBlocks from '@/components/product/DetailBlocks';
import { ProductTopics } from '@/components/product/ProductSections';

type Params = { slug: string; product: string; valve: string };

const category = CATEGORIES.find((c) => c.id === VALVES_PAGE.category)!;
const valvesPath = `${categoryHref(category.slug)}/${VALVES_PAGE.slug}`;

export function generateStaticParams(): Params[] {
  return VALVES.map((v) => ({ slug: category.slug, product: VALVES_PAGE.slug, valve: v.slug }));
}
export const dynamicParams = false;

const find = ({ slug, product, valve }: Params) =>
  slug === category.slug && product === VALVES_PAGE.slug ? VALVES.find((v) => v.slug === valve) : undefined;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const v = find(await params);
  if (!v) return {};
  return pageMetadata({
    title: fitTitle(`${v.name} | Valves Supplier in Saudi Arabia`, `${v.name} Supplier in Saudi Arabia`, `${v.name} in Saudi Arabia`, v.name),
    description: v.summary,
    path: valveHref(v.slug),
    image: { url: v.image, alt: `${v.name} — Masar Arabia` },
  });
}

export default async function ValvePage({ params }: { params: Promise<Params> }) {
  const v = find(await params);
  if (!v) notFound();
  const theme = DIVISION_THEMES[category.id];
  const words = v.name.split(' ');
  const last = words.pop();
  // valves sold in several types (Type-1/2/3, solenoid/float …) have one photo per type
  const typed = v.photos.length > 1 && v.photos.length === v.tabs.length;
  // otherwise the first tab is the main description and any others (e.g. Features) follow below
  const main = typed ? undefined : v.tabs[0];
  const more = typed ? [] : v.tabs.slice(1);
  const related = VALVES.filter((x) => x.slug !== v.slug && x.groups.some((g) => v.groups.includes(g))).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={v.groups.length ? `Valves · ${v.groups.join(' · ')}` : 'Valves'}
        title={
          <>
            {words.length > 0 && `${words.join(' ')} `}
            <span style={{ color: theme.light }}>{last}</span>
          </>
        }
        intro={v.summary}
        crumbs={[
          { label: 'Products', href: '/products' },
          { label: category.name, href: categoryHref(category.slug) },
          { label: 'Valves', href: valvesPath },
          { label: v.name, href: valveHref(v.slug) },
        ]}
        backgroundImage={category.image}
        theme={theme}
      >
        <Link
          href={quoteHref(v.name)}
          data-magnetic
          style={{ background: theme.accent }}
          className="group inline-flex items-center gap-2 rounded-full text-white px-6 py-3 text-sm font-bold shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)] hover:brightness-110 transition-[filter]"
        >
          Request a Quote <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
        </Link>
        <Link
          href={valvesPath}
          className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white px-6 py-3 text-sm font-bold hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All valves
        </Link>
      </PageHero>

      {/* display: contents keeps each section a direct child of the page (motion + off-screen pausing) while passing the division colours down */}
      <div className="contents" style={themeVars(themeColors(theme))}>
        <section id="overview" data-label="Overview" className="relative py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5" data-anim="up">
              <ValvePhoto src={typed ? v.image : (v.photos[0] ?? v.image)} alt={v.name} />
            </div>
            <div className="lg:col-span-7" data-anim="up">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[var(--accent)] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                Overview
              </span>
              <h2 className="mt-5 text-[28px] sm:text-4xl font-black uppercase tracking-[-0.025em] leading-[1.05] text-slate-950 text-balance">
                {v.name}
              </h2>
              {main && main.title.toLowerCase() !== v.name.toLowerCase() && (
                <h3 className="mt-4 text-lg sm:text-xl font-bold tracking-tight text-[var(--accent)]">{main.title}</h3>
              )}
              <div className="mt-6">
                <DetailBlocks blocks={main?.blocks.length ? main.blocks : [{ type: 'p', text: v.summary }]} alt={v.name} />
              </div>
              <Link
                href={quoteHref(v.name)}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-white px-6 py-3 text-sm font-bold hover:brightness-110 transition-[filter]"
              >
                Enquire about this valve <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </div>
          </div>
        </section>

        {typed && (
          <section id="types" data-label="Types" className="relative py-16 sm:py-24 bg-slate-50 border-y border-slate-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-[28px] sm:text-4xl font-black uppercase tracking-[-0.025em] leading-[1.05] text-slate-950">
                Available <span className="text-[var(--accent)]">Types</span>
              </h2>
              <ol className="mt-10 space-y-5 sm:space-y-6">
                {v.tabs.map((tab, i) => (
                  <li
                    key={tab.title}
                    data-anim="up"
                    className="grid md:grid-cols-12 gap-6 md:gap-10 items-center rounded-[24px] bg-white border border-slate-200/80 p-5 sm:p-7 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.5)]"
                  >
                    <div className="md:col-span-4">
                      <ValvePhoto src={v.photos[i]} alt={`${v.name} — ${tab.title}`} />
                    </div>
                    <div className="md:col-span-8">
                      <span className="font-mono text-sm font-bold text-[var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="mt-1 text-xl sm:text-2xl font-black tracking-tight text-slate-950">{tab.title}</h3>
                      <div className="mt-4">
                        <DetailBlocks blocks={tab.blocks} alt={`${v.name} — ${tab.title}`} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {more.length > 0 && <ProductTopics name={v.name} sections={more} />}

        {related.length > 0 && (
          <section id="related" data-label="Related valves" className="relative py-16 sm:py-24 bg-[var(--accent-soft)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-[28px] sm:text-4xl font-black uppercase tracking-[-0.025em] leading-[1.05] text-slate-950">
                  Related <span className="text-[var(--accent)]">Valves</span>
                </h2>
                <Link href={valvesPath} className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent)] hover:underline underline-offset-4">
                  All {VALVES.length} valves <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <ul className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {related.map((x) => (
                  <li key={x.slug} data-anim="up">
                    <Link
                      href={valveHref(x.slug)}
                      className="group flex h-full flex-col rounded-[22px] bg-white border border-slate-200/80 p-3 hover:border-[var(--accent)] transition-colors"
                    >
                      <div className="relative aspect-[37/28] rounded-2xl overflow-hidden bg-[#d6d6d6]">
                        <Image src={x.image} alt={x.name} fill sizes="(min-width: 1024px) 280px, 45vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <span className="mt-3 px-1 text-[14px] sm:text-[15px] font-bold leading-snug text-slate-900">{x.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: v.name,
            description: v.summary,
            category: 'Valves',
            url: `${SITE_URL}${valveHref(v.slug)}`,
            image: `${SITE_URL}${v.image}`,
            brand: { '@type': 'Brand', name: 'Masar Arabia' },
          }).replace(/</g, '\\u003c'),
        }}
      />

      <DivisionCta category={category} theme={theme} />
    </>
  );
}

/** Valve photos are small product shots on white — shown at (near) their own size, never stretched blurry. */
function ValvePhoto({ src, alt }: { src: string; alt: string }) {
  const [w, h] = imageSize(src);
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 sm:p-6">
      <Image src={src} alt={alt} width={w} height={h} sizes="(min-width: 768px) 380px, 80vw" className="mx-auto w-full max-w-[380px] h-auto" />
    </div>
  );
}
