import ProductPage from '@/components/solutions/ProductPage';
import CrmSections from '@/components/solutions/crm/Sections';
import { CrmScreen } from '@/components/home/RealScreens';
import { productBySlug } from '@/data/products';

/**
 * Engispider CRM.
 *
 * The shared product template plus one bespoke middle — see
 * `components/solutions/crm/Sections`.
 *
 * The hero screen is the recreation built from an actual screenshot of the
 * running product (the quotations list, navy rail and all), the same one
 * the homepage console shows.
 *
 * The page this replaces sold "boost revenue" and "automate workflows"
 * without naming one thing the product does that a spreadsheet does not —
 * and never mentioned quotations, invoices or subscriptions, which are the
 * reason to choose it over a pipeline board.
 */
export default function CrmPage() {
  const product = productBySlug('crm')!;

  return (
    <ProductPage product={product} screen={<CrmScreen />} sections={<CrmSections />} />
  );
}
