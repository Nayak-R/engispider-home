import ProductPage from '@/components/solutions/ProductPage';
import InventorySections from '@/components/solutions/inventory/Sections';
import { BrowserFrame, StockMock } from '@/components/inventory/Mockups';
import { productBySlug } from '@/data/products';

/**
 * Engispider Inventory.
 *
 * The shared product template plus one bespoke middle — see
 * `components/solutions/inventory/Sections`, which is itself built from
 * `components/solutions/kit`.
 *
 * The hero sits in a BrowserFrame because MockShell draws no outer edge
 * of its own; without the frame it bleeds into the page.
 */
export default function InventoryPage() {
  const product = productBySlug('inventory')!;

  return (
    <ProductPage
      product={product}
      screen={
        <BrowserFrame label="Engispider Inventory">
          <StockMock />
        </BrowserFrame>
      }
      sections={<InventorySections />}
    />
  );
}
