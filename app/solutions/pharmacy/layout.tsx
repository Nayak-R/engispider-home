import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pharmacy Manager System | Medical Store Software India',
  description: 'Complete pharmacy management software with billing, inventory, prescription management, and expiry tracking. Best pharmacy software in India.',
  keywords: ['Pharmacy Manager System', 'Pharmacy Software India', 'Medical Store Software', 'Pharmacy Billing Software', 'Drug Inventory Management'],
};

export default function PharmacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
