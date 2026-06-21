import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Engispider',
  description: 'Terms and Conditions for the Restro360 app and related services operated by Engispider.',
  keywords: ['Terms and Conditions', 'Engispider', 'Restro360', 'Terms of Service', 'Legal'],
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
