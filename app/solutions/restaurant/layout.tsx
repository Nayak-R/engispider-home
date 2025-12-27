import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restaurant Manager Software | POS System India',
  description: 'Complete restaurant management software with POS, table booking, KOT, billing, and inventory. Best restaurant POS system in India.',
  keywords: ['Restaurant Manager Software', 'Restaurant POS System', 'KOT Software', 'Restaurant Billing', 'Table Management System', 'Restaurant Software India'],
};

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return children;
}
