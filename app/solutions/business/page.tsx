import ProductPage from '@/components/solutions/ProductPage';
import BusinessSections from '@/components/solutions/business/Sections';
import { productBySlug } from '@/data/products';

/**
 * Engispider Custom Software.
 *
 * The one product page with no screen in the hero, on purpose: the
 * software does not exist until someone commissions it, and a mockup of a
 * system nobody has specified is precisely the invented promise the rest
 * of this site was rebuilt to remove.
 *
 * Its evidence is the catalogue instead — see
 * `components/solutions/business/Sections`.
 */
export default function BusinessPage() {
  const product = productBySlug('business')!;

  return <ProductPage product={product} sections={<BusinessSections />} />;
}
