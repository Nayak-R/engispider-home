import { notFound } from 'next/navigation';

import ProductPage from '@/components/solutions/ProductPage';
import { CommsScreen, FaceScreen } from '@/components/solutions/Screens';
import {
  LabScreen,
  RetailScreen,
  SiteScreen,
  ClinicScreen,
} from '@/components/home/Screens';
import { PRODUCTS } from '@/data/products';
import { pageMetadata } from '@/lib/seo';

/**
 * Catalogue products rendered from one template.
 *
 * Seven products in data/products.ts were linked from the catalogue index,
 * the header menu and the footer while having no page at all — seven live
 * 404s on the most commercially important routes on the site. This route
 * serves all of them from `components/solutions/ProductPage`, so adding the
 * fifteenth product is a data edit rather than a new folder.
 *
 * The remaining products still have hand-written pages. Next.js resolves a
 * static segment ahead of a dynamic one, so those folders keep winning; the
 * list below exists only to keep `generateStaticParams` from emitting a
 * duplicate path, which is a hard error under `output: 'export'`.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * WHEN YOU DELETE ONE OF THOSE FOLDERS, DELETE ITS ENTRY HERE TOO — that is
 * what moves the product onto this template.
 * ──────────────────────────────────────────────────────────────────────────
 */
const DEDICATED_ROUTES = new Set([
  'restaurant',
  'education',
  'hrms',
  'crm',
  'inventory',
  'pharmacy',
  'business',
]);

/** The product's own UI, drawn in HTML. See components/home/Screens.tsx. */
const SCREENS: Record<string, React.ComponentType> = {
  retail: RetailScreen,
  lims: LabScreen,
  'site-manager': SiteScreen,
  clinic: ClinicScreen,
  whatsapp: CommsScreen,
  'face-recognition': FaceScreen,
  // 'monitoring' is deliberately absent: no confirmed specification, so
  // nothing to draw. The template renders a stated gap instead.
};

/** Route segment from the product's href, which is the URL of record. */
const segmentOf = (href: string) => href.replace('/solutions/', '');

const TEMPLATED = PRODUCTS.filter((p) => !DEDICATED_ROUTES.has(segmentOf(p.href)));

export function generateStaticParams() {
  return TEMPLATED.map((p) => ({ slug: segmentOf(p.href) }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const product = TEMPLATED.find((p) => segmentOf(p.href) === slug);
  if (!product) return {};

  // Every templated product carries `seo`. The fallback keeps a newly added
  // product indexable rather than inheriting the section's own canonical.
  const seo = product.seo ?? {
    title: `${product.name} — ${product.category}`,
    description: product.tagline,
    keywords: [product.name, product.category],
  };

  return pageMetadata({
    title: seo.title,
    description: seo.description,
    path: product.href,
    keywords: seo.keywords,
  });
}

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params;
  const product = TEMPLATED.find((p) => segmentOf(p.href) === slug);
  if (!product) notFound();

  const Screen = SCREENS[slug];

  return <ProductPage product={product} screen={Screen ? <Screen /> : undefined} />;
}
