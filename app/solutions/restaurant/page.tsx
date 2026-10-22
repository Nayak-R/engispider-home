import ProductPage from '@/components/solutions/ProductPage';
import RestroSections from '@/components/solutions/restro/Sections';
import LiveRestaurant from '@/components/home/LiveRestaurant';
import { productBySlug } from '@/data/products';

/**
 * Engispider Restro.
 *
 * The page is the shared product template plus one bespoke middle — see
 * `components/solutions/restro/Sections`. What used to be 327 lines of
 * one-off black-and-amber layout is now the same shell as every other
 * product, so the header, hero, spec strip, audience, rollout, FAQ, related
 * products and CTA are fixed in one place for all fourteen.
 *
 * The hero screen is the live dashboard — the same ticking recreation the
 * homepage uses, so a visitor who arrives here from the home console sees
 * the screen they were just looking at.
 */
export default function RestaurantPage() {
  const product = productBySlug('restro360')!;

  return (
    <ProductPage
      product={product}
      screen={<LiveRestaurant />}
      sections={<RestroSections />}
      extraCta={{ href: '/solutions/restaurant/guide', label: 'Training guide' }}
    />
  );
}
