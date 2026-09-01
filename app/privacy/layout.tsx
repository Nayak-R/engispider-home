import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Engispider Infotech collects, uses and protects personal information across the Restro360 app and our other products and services.',
  path: '/privacy',
  keywords: [
    'Privacy Policy',
    'Engispider',
    'Restro360',
    'Data Protection',
    'Personal Information',
  ],
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
