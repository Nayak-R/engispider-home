import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Pharmacy Manager | Medical Store Software',
  description:
    'Pharmacy management software covering billing, stock, prescriptions and expiry tracking — built for medical stores and chemist chains in India.',
  path: '/solutions/pharmacy',
  keywords: [
    'Pharmacy Manager System',
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
          { name: 'Pharmacy Manager', path: '/solutions/pharmacy' },
        ]}
      />
      {children}
    </>
  );
}
