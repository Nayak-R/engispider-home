import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'CRM System for Businesses | CRM Software India',
  description:
    'CRM software to manage customer relationships, track your sales pipeline and automate follow-ups. Built for Indian businesses of every size.',
  path: '/solutions/crm',
  keywords: [
    'CRM System for Businesses',
    'CRM Software India',
    'Customer Relationship Management',
    'Sales CRM',
    'Best CRM India',
    'Cloud CRM',
    'CRM Bhubaneswar',
  ],
});

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: 'Solutions', path: '/solutions' },
          { name: 'CRM System', path: '/solutions/crm' },
        ]}
      />
      {children}
    </>
  );
}
