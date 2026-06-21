import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Engispider',
  description: 'Privacy Policy for the Restro360 app and related services operated by Engispider. Learn how we collect, use, and protect your personal information.',
  keywords: ['Privacy Policy', 'Engispider', 'Restro360', 'Data Protection', 'Personal Information'],
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
