import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Engispider Infotech collects, uses and protects personal information across the Engispider Restro app and our other products and services.',
  path: '/privacy',
  keywords: [
    'Privacy Policy',
    'Engispider',
    'Engispider Restro',
    'Data Protection',
    'Personal Information',
  ],
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
