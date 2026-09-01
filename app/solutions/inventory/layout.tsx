import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Inventory Manager | Stock Management System',
  description:
    'Inventory management software with real-time stock tracking, barcode scanning and multi-warehouse support for businesses across India.',
  path: '/solutions/inventory',
  keywords: [
    'Inventory Manager Software',
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
          { name: 'Inventory Manager', path: '/solutions/inventory' },
        ]}
      />
      {children}
    </>
  );
}
