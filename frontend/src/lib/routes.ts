
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
  { href: '/brands', label: 'Brands' },
  { href: '/clients', label: 'Clients' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export const categoryHref = (slug: string) => `/products/${slug}`;

/** Contact page, opened at the quote form (#quote-form) and pre-filled for a product / category. */
export const quoteHref = (product?: string) =>
  product ? `/contact?product=${encodeURIComponent(product)}#quote-form` : '/contact#quote-form';

/** True when `pathname` is this nav item's page (or one of its sub-pages). */
export const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
