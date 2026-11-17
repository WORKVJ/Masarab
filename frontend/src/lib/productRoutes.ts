/**
 * Product-page URLs. Kept apart from ./routes because it reads the full catalogue (./catalog),
 * which must stay on the server — ./routes is also imported by client components.
 */
import { CATEGORIES, PRODUCT_RANGE, type Category } from './masarContent';
import { PRODUCT_DETAILS, VALVES } from './catalog';
import { categoryHref, quoteHref, rangeHref } from './routes';

/** The valve catalogue is the detail page of Mechanical → "Valves & Actuators". */
export const VALVES_PAGE = { category: 'mechanical', product: 'Valves & Actuators', slug: 'valves' } as const;

/** Detail-page segment for a product, when the client's site has a page for it. */
export function productSlug(categoryId: string, productName: string): string | undefined {
  if (categoryId === VALVES_PAGE.category && productName === VALVES_PAGE.product) return VALVES_PAGE.slug;
  return PRODUCT_DETAILS.find((d) => d.category === categoryId && d.product === productName)?.slug;
}

/** /products/<division>/<product> when the product has a detail page, otherwise undefined. */
export function productHref(category: Category, productName: string): string | undefined {
  const slug = productSlug(category.id, productName);
  return slug ? `${categoryHref(category.slug)}/${slug}` : undefined;
}

export const valveHref = (slug: string) => `/products/mechanical/${VALVES_PAGE.slug}/${slug}`;

/** Product card link: its detail page when there is one, otherwise the pre-filled quote form. */
export const productLink = (category: Category, productName: string) =>
  productHref(category, productName) ?? quoteHref(productName);

/** Every page URL, for the sitemap. */
export const ALL_ROUTES = [
  '/',
  '/about',
  '/products',
  ...CATEGORIES.flatMap((c) => [
    categoryHref(c.slug),
    ...c.products.map((p) => productHref(c, p.name)).filter((h): h is string => Boolean(h)),
  ]),
  ...VALVES.map((v) => valveHref(v.slug)),
  '/product-range',
  ...PRODUCT_RANGE.map((p) => rangeHref(p.id)),
  '/industries',
  '/brands',
  '/clients',
  '/contact',
];
