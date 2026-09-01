import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact Us',
  description:
    'Talk to Engispider Infotech about software development, HRMS, CRM and custom business systems. Based in Bhubaneswar, working with clients across India.',
  path: '/contact',
  keywords: [
    'Contact Engispider',
    'Software Company Contact',
    'Bhubaneswar IT Company',
    'Get Quote',
  ],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: 'Contact', path: '/contact' },
        ]}
      />
      {children}
    </>
  );
}
