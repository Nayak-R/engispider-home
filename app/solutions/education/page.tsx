import ProductPage from '@/components/solutions/ProductPage';
import CampusSections from '@/components/solutions/campus/Sections';
import { BrowserFrame, CampusDashboardMock } from '@/components/academic/Mockups';
import { productBySlug } from '@/data/products';

/**
 * Engispider Campus.
 *
 * The shared product template plus one bespoke middle — see
 * `components/solutions/campus/Sections`. What used to be 298 lines of
 * one-off black-and-violet layout is now the same shell as every other
 * product, so header, hero, spec strip, audience, rollout, FAQ, related
 * products and CTA are fixed in one place for all fourteen.
 *
 * The page's own SoftwareApplication block is gone with it: it published
 * `price: "0"` on paid software, which is a machine-readable falsehood.
 * The template emits the schema and omits price deliberately.
 *
 * The hero screen sits in a BrowserFrame because MockShell draws no outer
 * edge of its own — unlike the restaurant hero, whose live dashboard
 * carries its own border. Without the frame it bleeds into the page.
 */
export default function EducationPage() {
  const product = productBySlug('campus360')!;

  return (
    <ProductPage
      product={product}
      screen={
        <BrowserFrame label="Engispider Campus">
          <CampusDashboardMock />
        </BrowserFrame>
      }
      sections={<CampusSections />}
    />
  );
}
