import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SITE_URL } from '@/lib/routes';

export interface Crumb {
  label: string;
  href: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  /** trail after "Home", e.g. [{ label: 'Products', href: '/products' }] — last item is the current page */
  crumbs: Crumb[];
  /** optional photo shown on the right (desktop) / below (mobile) */
  image?: { src: string; alt: string };
  /** dark variant with a full-bleed background photo */
  backgroundImage?: string;
  children?: React.ReactNode;
}

/**
 * Header for every inner page — same visual language as the home hero:
 * eyebrow pill, word-split <h1>, intro, breadcrumbs, blueprint grid + parallax glows.
 * Emits BreadcrumbList structured data for search engines.
 */
export default function PageHero({ eyebrow, title, intro, crumbs, image, backgroundImage, children }: PageHeroProps) {
  const dark = Boolean(backgroundImage);
  const trail = [{ label: 'Home', href: '/' }, ...crumbs];

  return (
    <section
      id="page-hero"
      data-label={crumbs[crumbs.length - 1]?.label ?? 'Overview'}
      className={`relative overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 ${dark ? 'bg-[#04121f] text-white' : 'bg-white'}`}
    >
      {/* background */}
      {dark ? (
        <>
          <div data-parallax-img className="absolute -inset-y-[12%] inset-x-0">
            <Image src={backgroundImage!} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#04121f] via-[#04121f]/85 to-[#04121f]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04121f] via-transparent to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 cad-blueprint-grid opacity-25 pointer-events-none" aria-hidden="true" />
          <div
            data-speed="-0.3"
            className="absolute -top-24 left-1/3 w-[760px] h-[420px] bg-gradient-to-b from-[#0d7cae]/12 via-[#0284c7]/6 to-transparent rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            data-speed="0.4"
            className="absolute top-1/3 -right-32 w-[380px] h-[380px] bg-orange-400/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
        <div className={image ? 'lg:col-span-7' : 'lg:col-span-9'}>
          {/* breadcrumbs */}
          <nav aria-label="Breadcrumb" data-anim="up">
            <ol className={`flex flex-wrap items-center gap-1.5 text-xs ${dark ? 'text-white/60' : 'text-slate-500'}`}>
              {trail.map((c, i) => {
                const last = i === trail.length - 1;
                return (
                  <li key={c.href} className="flex items-center gap-1.5">
                    {last ? (
                      <span aria-current="page" className={dark ? 'text-sky-300' : 'text-[#0d7cae]'}>
                        {c.label}
                      </span>
                    ) : (
                      <Link href={c.href} className={`transition-colors ${dark ? 'hover:text-white' : 'hover:text-slate-900'}`}>
                        {c.label}
                      </Link>
                    )}
                    {!last && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                  </li>
                );
              })}
            </ol>
          </nav>

          <span
            data-anim="up"
            className={`mt-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs ${
              dark ? 'border-white/20 bg-white/10 text-sky-200' : 'border-slate-200 bg-white text-[#0d7cae] shadow-xs'
            }`}
          >
            <span className="mx-ping-dot w-1.5 h-1.5 rounded-full bg-[#0d7cae]" />
            {eyebrow}
          </span>

          <h1
            data-split-heading
            className={`mt-5 text-[34px] sm:text-5xl lg:text-[56px] font-black uppercase tracking-[-0.03em] leading-[1.02] text-balance ${
              dark ? 'text-white' : 'text-slate-950'
            }`}
          >
            {title}
          </h1>

          {intro && (
            <p
              data-anim="up"
              className={`mt-6 text-base sm:text-[17px] leading-[1.75] max-w-2xl ${dark ? 'text-white/75' : 'text-slate-600'}`}
            >
              {intro}
            </p>
          )}

          {children && (
            <div data-anim="up" className="mt-8 flex flex-wrap items-center gap-3">
              {children}
            </div>
          )}
        </div>

        {image && (
          <div className="lg:col-span-5" data-anim="right">
            <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(13,124,174,0.55)]">
              <div data-parallax-img className="absolute -inset-y-[10%] inset-x-0">
                <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/40 via-transparent to-transparent" />
            </div>
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: trail.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: c.label,
              item: `${SITE_URL}${c.href === '/' ? '' : c.href}`,
            })),
          }),
        }}
      />
    </section>
  );
}
