import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Engispider Restro Training Guide',
  description:
    'Step-by-step training guide for the Engispider Restro restaurant app — POS, KOT, inventory, recipes, billing, reports and loyalty, for staff and owners.',
  path: '/solutions/restaurant/guide',
  keywords: [
    'Engispider Restro guide',
    'restaurant POS training',
    'how to use restaurant software',
    'restaurant app user manual',
  ],
});

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: 'Solutions', path: '/solutions' },
          { name: 'Engispider Restro', path: '/solutions/restaurant' },
          { name: 'Training Guide', path: '/solutions/restaurant/guide' },
        ]}
      />
      {children}
    </>
  );
}
