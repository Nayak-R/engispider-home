import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Services | Software Development in Bhubaneswar',
  description:
    'Custom website development, web applications, e-commerce, cloud solutions and API development from a software company in Bhubaneswar.',
  path: '/services',
  keywords: [
    'Software Development Services',
    'Web Development',
    'Custom Software',
    'E-commerce Development',
    'Cloud Solutions',
  ],
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: 'Services', path: '/services' },
        ]}
      />
      {children}
    </>
  );
}
