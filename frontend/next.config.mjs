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
  ['/brands.php', '/products'],
  // category pages
  ['/cooling-and-frp.php', '/products/cooling-solutions'],
  ['/water-treatment.php', '/products/water-treatment'],
  ['/chemical.php', '/products/chemical'],
  ['/electrical.php', '/products/electrical'],
  ['/instrumentation.php', '/products/instrumentation'],
  ['/mechanical.php', '/products/mechanical'],
  ['/pipefittings.php', '/products/pipe-fittings-alloys'],
  ['/safety-equipment.php', '/products/safety-equipment'],
  // individual product pages → their category page
  ['/cooling-towers.php', '/products/cooling-solutions'],
  ['/frpfans.php', '/products/cooling-solutions'],
  ['/ventilatorfans.php', '/products/cooling-solutions'],
  ['/pure-water-group.php', '/products/water-treatment'],
  ['/electro-deionization.php', '/products/water-treatment'],
  ['/electro-dialysis-reversal.php', '/products/water-treatment'],
  ['/membrane-degassing.php', '/products/water-treatment'],
  ['/ready-to-run-equipment.php', '/products/water-treatment'],
  ['/high-purity-water-systems.php', '/products/water-treatment'],
  ['/vnx-max.php', '/products/water-treatment'],
  ['/modules-and-parts.php', '/products/water-treatment'],
  ['/basic-compact-lx.php', '/products/water-treatment'],
  ['/basic-compact-mx.php', '/products/water-treatment'],
  ['/edipure-advanced.php', '/products/water-treatment'],
  ['/balljoints.php', '/products/mechanical'],
  ['/expansionjoints.php', '/products/mechanical'],
  ['/pumps.php', '/products/mechanical'],
  ['/valves.php', '/products/mechanical'],
  ['/plates.php', '/products/pipe-fittings-alloys'],
  ['/special-fittings.php', '/products/pipe-fittings-alloys'],
  ['/portable-ventilation-exhaust-fan-ducted.php', '/products/safety-equipment'],
  // old instrumentation sub-site
  ['/instrumentation', '/products/instrumentation'],
  ['/instrumentation/:path*', '/products/instrumentation'],
  // old blog (the new site has no blog yet)
  ['/blog_list.php', '/'],
  ['/blog_detail.php', '/'],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return LEGACY_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true }));
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




