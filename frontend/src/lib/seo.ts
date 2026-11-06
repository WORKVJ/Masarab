import type { Metadata } from 'next';
import { CONTACT } from './masarContent';
import { SITE_URL } from './routes';

/** Default share image (1700×1134). */
export const DEFAULT_OG_IMAGE = { url: '/images/masar/about.webp', width: 1700, height: 1134, alt: 'Masar Arabia industrial solutions' };

/**
 * Complete metadata for one page.
 * Next.js replaces (not merges) a parent's `openGraph` / `twitter` objects, so a page that sets only
 * its own OG title silently loses the share image. Building every page through this helper keeps
 * title, description, canonical, Open Graph and Twitter card complete and consistent.
 * Titles: keep `title` ≤ ~45 characters (the layout appends " | Masar Arabia"); descriptions ≤ ~155.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt?: string; width?: number; height?: number };
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | Masar Arabia`;
  const img = image ?? DEFAULT_OG_IMAGE;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      siteName: 'Masar Arabia',
      locale: 'en_SA',
      title: fullTitle,
      description,
      images: [img],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [img.url] },
  };
}

/** Search titles + descriptions for the 8 category pages (keyword-first, within Google's display limits). */
export const CATEGORY_SEO: Record<string, { title: string; description: string }> = {
  cooling: {
    title: 'FRP Cooling Towers & Fans | Industrial Ventilation',
    description:
      'Cooling towers, FRP fans, chillers, AHUs, VRF, FAHU, FCU, exhaust fans and heat exchangers for industrial and commercial plants in Saudi Arabia.',
  },
  water: {
    title: 'Water Treatment Systems & Solutions in Saudi Arabia',
    description:
      'EDI, EDR, membrane degassing, high purity water systems, VNX-Max and Ionpure modules — water treatment from Masar Arabia with Pure Water Group.',
  },
  chemical: {
    title: 'Industrial Chemicals Supplier in Saudi Arabia',
    description:
      'Alcohols, aromatics, ketones, oleo chemicals, chlorinated solvents, esters, glycols and plasticizers — industrial chemicals supplied across Saudi Arabia.',
  },
  electrical: {
    title: 'Electrical Equipment & Gratings Supplier in KSA',
    description:
      'Battery chargers, relays, breakers, VFDs and MCBs, plus FRP, steel and stainless steel gratings, handrails and ladders for plants in Saudi Arabia.',
  },
  instrumentation: {
    title: 'Precision Instruments & Industrial Instrumentation',
    description:
      'Moisture, humidity, indoor air quality, HVAC, condition monitoring, NDT, calibrators and laboratory instruments from Masar Arabia, Saudi Arabia.',
  },
  mechanical: {
    title: 'Pumps, Valves, Actuators & Expansion Joints',
    description:
      'Ball joints, expansion joints, pumps, valves and actuators — precision-engineered mechanical components for industrial plants in Saudi Arabia.',
  },
  'pipe-fittings': {
    title: 'Pipe Fittings, Plates & Alloys Supplier in KSA',
    description:
      'Plates and sheets, special fittings, nuts and bolts — durable pipe fittings and alloys for industrial piping systems across Saudi Arabia.',
  },
  safety: {
    title: 'Safety Equipment Suppliers in Saudi Arabia',
    description:
      'Coveralls, fall protection, SCBA, respirators, helmets, gloves, spill kits, fire suits and PPE — 44 safety products from Masar Arabia, Jeddah.',
  },
};

/** Organization + WebSite structured data, emitted once in the root layout. */
export function siteJsonLd(description: string) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: CONTACT.company,
      alternateName: 'Masar Arabia',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo-dark.png`,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE.url}`,
      description,
      email: CONTACT.email,
      telephone: '+966126576896',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Othman Bin Afan Street, PO Box No. 16301',
        addressLocality: 'Jeddah',
        postalCode: '22234',
        addressCountry: 'SA',
      },
      areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+966126576896',
          email: CONTACT.email,
          areaServed: 'SA',
        },
      ],
      sameAs: [CONTACT.facebook, CONTACT.instagram],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Masar Arabia',
      url: SITE_URL,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ];
}
