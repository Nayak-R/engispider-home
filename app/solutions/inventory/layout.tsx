import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inventory Manager Software | Stock Management System India',
  description: 'Smart inventory management software with real-time tracking, barcode scanning, multi-warehouse support. Best inventory system for businesses in India.',
  keywords: ['Inventory Manager Software', 'Stock Management System', 'Inventory Tracking', 'Warehouse Management', 'Inventory Software India'],
};

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
