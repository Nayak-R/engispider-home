import ProductPage from '@/components/solutions/ProductPage';
import HrmsSections from '@/components/solutions/hrms/Sections';
import { HrmsRealScreen } from '@/components/home/RealScreens';
import { productBySlug } from '@/data/products';

/**
 * Engispider HRMS.
 *
 * The shared product template plus one bespoke middle — see
 * `components/solutions/hrms/Sections`.
 *
 * The hero screen is the recreation built from an actual screenshot of the
 * running product, the same one the homepage console shows, so a visitor
 * arriving from there sees the screen they were just looking at.
 *
 * Every statistic on the page this replaces was invented — "70% time
 * saved", "85% improved employee engagement", "99.9% payroll accuracy",
 * "95% user satisfaction". None of it survives, and nothing has been put
 * in its place.
 */
export default function HrmsPage() {
  const product = productBySlug('hrms')!;

  return (
    <ProductPage
      product={product}
      screen={<HrmsRealScreen />}
      sections={<HrmsSections />}
    />
  );
}
