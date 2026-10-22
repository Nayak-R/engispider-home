import { buildProductDoc } from '@/lib/llms';
import { PRODUCTS } from '@/data/products';

/**
 * /solutions/<slug>/llms.txt — one product, in full.
 *
 * Generated for EVERY product, including the ones whose page is still
 * hand-built: this route sits one segment below the page, so there is no
 * collision with either the dynamic route or a dedicated folder.
 */
export const dynamic = 'force-static';

const segmentOf = (href: string) => href.replace('/solutions/', '');

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: segmentOf(p.href) }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => segmentOf(p.href) === slug);

  if (!product) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(buildProductDoc(product), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
