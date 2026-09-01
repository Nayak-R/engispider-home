import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Terms & Conditions',
  description:
    'Terms and Conditions for the Restro360 app and other services operated by Engispider Infotech, covering use, accounts, payments and liability.',
  path: '/terms',
  keywords: [
    'Terms and Conditions',
    'Engispider',
    'Restro360',
    'Terms of Service',
    'Legal',
  ],
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
