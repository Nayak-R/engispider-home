import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Pharmacy Software India | Medical Store Billing',
  description:
    'Pharmacy management software covering billing, stock, prescriptions and expiry tracking — built for medical stores and chemist chains in India.',
  path: '/solutions/pharmacy',
  keywords: [
    'Pharmacy Management System',
    'Pharmacy Software India',
    'Medical Store Software',
    'Pharmacy Billing Software',
    'Drug Inventory Management',
  ],
});

export default function PharmacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: 'Solutions', path: '/solutions' },
          { name: 'Engispider Pharmacy', path: '/solutions/pharmacy' },
        ]}
      />
      {children}
    </>
  );
}
