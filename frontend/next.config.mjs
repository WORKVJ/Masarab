import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Permanent redirects from the old masararabia.com (PHP) URLs, so existing Google rankings,
 * bookmarks and links from other sites carry over to the new pages instead of hitting a 404.
 * The full list was collected from every internal link on the live site.
 */
const LEGACY_REDIRECTS = [
  ['/index.php', '/'],
  ['/about-us.php', '/about'],
  ['/contact-us.php', '/contact'],
  ['/products.php', '/products'],
  ['/brands.php', '/brands'],
  // old blog (its posts were placeholders, so they all land on the new blog)
  ['/blog_list.php', '/blog'],
  ['/blog_detail.php', '/blog'],
  // category pages
  ['/cooling-and-frp.php', '/products/cooling-solutions'],
  ['/water-treatment.php', '/products/water-treatment'],
  ['/chemical.php', '/products/chemical'],
  ['/electrical.php', '/products/electrical'],
  ['/instrumentation.php', '/products/instrumentation'],
  ['/mechanical.php', '/products/mechanical'],
  ['/pipefittings.php', '/products/pipe-fittings-alloys'],
  ['/safety-equipment.php', '/products/safety-equipment'],
  // individual product pages → their own new page
  ['/cooling-towers.php', '/products/cooling-solutions/cooling-towers'],
  ['/frpfans.php', '/products/cooling-solutions'],
  ['/ventilatorfans.php', '/products/cooling-solutions'],
  ['/pure-water-group.php', '/products/water-treatment'],
  ['/electro-deionization.php', '/products/water-treatment/electro-deionization'],
  ['/electro-dialysis-reversal.php', '/products/water-treatment/electro-dialysis-reversal'],
  ['/membrane-degassing.php', '/products/water-treatment/membrane-degassing'],
  ['/ready-to-run-equipment.php', '/products/water-treatment/ready-to-run-equipment'],
  ['/high-purity-water-systems.php', '/products/water-treatment/high-purity-water-systems'],
  ['/vnx-max.php', '/products/water-treatment/vnx-max'],
  ['/modules-and-parts.php', '/products/water-treatment/modules-and-parts'],
  ['/basic-compact-lx.php', '/products/water-treatment/basic-compact-lx'],
  ['/basic-compact-mx.php', '/products/water-treatment/basic-compact-mx'],
  ['/edipure-advanced.php', '/products/water-treatment/edipure-advanced'],
  ['/balljoints.php', '/products/mechanical/ball-joints'],
  ['/expansionjoints.php', '/products/mechanical/expansion-joints'],
  ['/pumps.php', '/products/mechanical/pumps'],
  ['/valves.php', '/products/mechanical/valves'],
  ['/sensors.php', '/products/instrumentation/sensors'],
  ['/plates.php', '/products/pipe-fittings-alloys/plates-and-sheets'],
  ['/special-fittings.php', '/products/pipe-fittings-alloys/special-fittings'],
  ['/portable-ventilation-exhaust-fan-ducted.php', '/products/safety-equipment'],
  // old instrumentation sub-site
  ['/instrumentation', '/products/instrumentation'],
  ['/instrumentation/:path*', '/products/instrumentation'],
  // old blog (the new site has no blog yet)
  ['/blog_list.php', '/'],
  ['/blog_detail.php', '/'],
];

/** The old site served each valve at the site root (e.g. /butterfly-valve) — same names as the new valve pages. */
const LEGACY_VALVES = [
  'air-vent',
  'automatic-flow-balancing-valve',
  'balancing-and-temperature-control-valve',
  'butterfly-valve',
  'condensate-separator',
  'differential-pressure-and-flow-controller',
  'differential-pressure-and-flow-controller-for-individual-unit',
  'differential-pressure-controller',
  'float-trap',
  'inverted-bucket-trap',
  'level-control-valve',
  'pilot-operated-valve-bi-directional-reverse-flow-pressure-reducing-valve',
  'pilot-operated-valve-differential-pressure-controller',
  'pilot-operated-valve-pressure-reducing-valve',
  'pilot-operated-valve-pressure-reducing-valve-fire-protection',
  'pilot-operated-valve-prevention-of-pressure-equalization',
  'pilot-operated-valve-system-pressure-relief-valve',
  'pilot-operated-valve-system-pressure-relief-valve-fire-protection',
  'pressure-independent-control-valve',
  'pressure-reducing-valve',
  'pressure-reducing-valve-for-individual-unit',
  'pressure-reducing-valve-for-steam-diaphragm',
  'pressure-reducing-valve-for-steam-piston',
  'safety-valve',
  'smolensky-check-valve',
  'stainless-steel-automatic-balancing-valve',
  'stainless-steel-level-control-valve',
  'stainless-steel-pressure-reducing-valve',
  'stainless-steel-smolensky-check-valve',
  'stainless-steel-strainer',
  'strainer',
  'suction-diffuser',
  'temperature-control-valve',
  'triple-duty-check-valve',
  'triple-duty-check-valve-angle-type',
  'triple-duty-check-valve-os-y-type',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Self-contained server build for the DigitalOcean Droplet (deploy/deploy.sh); Vercel ignores it.
  output: 'standalone',
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  // Local development only: the admin panel calls /api on its own origin (Nginx does this in production)
  async rewrites() {
    return process.env.NODE_ENV === 'development'
      ? [
          { source: '/api/:path*', destination: 'http://127.0.0.1:8000/api/:path*' },
          { source: '/media/:path*', destination: 'http://127.0.0.1:8000/media/:path*' },
        ]
      : [];
  },
  async redirects() {
    return [
      ...LEGACY_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true })),
      {
        source: `/:valve(${LEGACY_VALVES.join('|')})`,
        destination: '/products/mechanical/valves/:valve',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;




