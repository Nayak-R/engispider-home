import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Restro360 Training Guide',
  description:
    'Step-by-step training guide for the Restro360 restaurant app — POS, KOT, inventory, recipes, billing, reports and loyalty, for staff and owners.',
  path: '/solutions/restaurant/guide',
  keywords: [
    'Restro360 guide',
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
          { name: 'Restaurant Manager', path: '/solutions/restaurant' },
          { name: 'Training Guide', path: '/solutions/restaurant/guide' },
        ]}
      />
      {children}
    </>
  );
}
