import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Restaurant POS Software India | Engispider Restro',
  description:
    'Engispider Restro is restaurant management software with POS, table booking, KOT, billing and inventory — built for Indian restaurants and cafes.',
  path: '/solutions/restaurant',
  // /solutions/restaurant/guide sits below this one and needs the suffix too.
  childTitleTemplate: '%s | Engispider',
  keywords: [
    'Restaurant Management Software',
    'Restaurant POS System',
    'KOT Software',
    'Restaurant Billing',
    'Table Management System',
    'Restaurant Software India',
  ],
});

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return children;
}
