import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'FAQ | Software, pricing, demos and support',
  description:
    'Answers about Engispider Infotech: what we build, restaurant POS and school ERP in Odisha, demos, data migration, pricing, security, integrations and support.',
  path: '/faq',
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: 'FAQ', path: '/faq' }]} />
      {children}
    </>
  );
}
