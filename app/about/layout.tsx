import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About Us | Software Company in Bhubaneswar',
  description:
    'Engispider Infotech is a software development company in Bhubaneswar building HRMS, CRM and custom business systems, with 10+ years of delivery behind us.',
  path: '/about',
  keywords: [
    'About Engispider',
    'Software Company Bhubaneswar',
    'IT Company Odisha',
    'Software Development Company',
  ],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: 'About Us', path: '/about' },
        ]}
      />
      {children}
    </>
  );
}
