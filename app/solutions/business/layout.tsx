import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Business Software Solutions | Custom ERP',
  description:
    'Custom business software — ERP, cloud applications, mobile apps and digital transformation services for growing companies across India.',
  path: '/solutions/business',
  keywords: [
    'Business Software Solutions',
    'Custom ERP Development',
    'Enterprise Software',
    'Digital Transformation',
    'Custom Software India',
    'Business Applications',
  ],
});

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: 'Solutions', path: '/solutions' },
          { name: 'Business Solutions', path: '/solutions/business' },
        ]}
      />
      {children}
    </>
  );
}
