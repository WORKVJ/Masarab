import { CATEGORIES } from './masarContent';

export const SITE_URL = 'https://masararabia.com';

export interface NavItem {
  href: string;
  label: string;
  /** shows the categories dropdown */
  dropdown?: boolean;
}

/** Primary navigation — one real page per item. */
export const NAV: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products', dropdown: true },
  { href: '/product-range', label: 'Product Range' },
  { href: '/industries', label: 'Industries' },
  { href: '/clients', label: 'Clients' },
  { href: '/contact', label: 'Contact' },
];

export const categoryHref = (slug: string) => `/products/${slug}`;

/** Contact page with the quote form pre-filled for a product / category. */
export const quoteHref = (product?: string) =>
  product ? `/contact?product=${encodeURIComponent(product)}` : '/contact';

/** True when `pathname` is this nav item's page (or one of its sub-pages). */
export const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

/** Every page URL, for the sitemap. */
export const ALL_ROUTES = [
  '/',
  '/about',
  '/products',
  ...CATEGORIES.map((c) => categoryHref(c.slug)),
  '/product-range',
  '/industries',
  '/clients',
  '/contact',
];
