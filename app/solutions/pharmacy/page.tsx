import ProductPage from '@/components/solutions/ProductPage';
import PharmacySections from '@/components/solutions/pharmacy/Sections';
import { BrowserFrame, BillingMock } from '@/components/pharmacy/Mockups';
import { productBySlug } from '@/data/products';

/**
 * Engispider Pharmacy.
 *
 * The shared product template plus one bespoke middle — see
 * `components/solutions/pharmacy/Sections`, built from
 * `components/solutions/kit`.
 *
 * The hero is the counter, because that is the screen a pharmacist spends
 * the day in and the one they will judge the product on.
 */
export default function PharmacyPage() {
  const product = productBySlug('pharmacy')!;

  return (
    <ProductPage
      product={product}
      screen={
        <BrowserFrame label="Engispider Pharmacy">
          <BillingMock />
        </BrowserFrame>
      }
      sections={<PharmacySections />}
    />
  );
}
