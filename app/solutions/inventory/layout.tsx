import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Inventory Management Software | Stock Control',
  description:
    'Inventory management software with real-time stock tracking, barcode scanning and multi-warehouse support for businesses across India.',
  path: '/solutions/inventory',
  keywords: [
    'Inventory Management Software',
    'Stock Management System',
    'Inventory Tracking',
    'Warehouse Management',
    'Inventory Software India',
  ],
});

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: 'Solutions', path: '/solutions' },
          { name: 'Engispider Inventory', path: '/solutions/inventory' },
        ]}
      />
      {children}
    </>
  );
}
