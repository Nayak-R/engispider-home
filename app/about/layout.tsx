import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About Us | ISO Certified Software Company in Bhubaneswar',
  // "10+ years of delivery" was here and nobody can evidence it — the
  // founding year is still an open placeholder in data/company.ts. The
  // product and customer counts are countable, so they are what we say.
  description:
    'Engispider Infotech is an ISO certified software product and development company in Bhubaneswar, Odisha — fourteen products in production, one engineering stack, and customers you can check.',
  path: '/about',
  keywords: [
    'About Engispider Infotech',
    'Software Company Bhubaneswar',
    'ISO certified software company',
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
