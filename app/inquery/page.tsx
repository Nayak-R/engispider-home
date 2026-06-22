import type { Metadata } from 'next';
import RedirectNotice from '@/components/RedirectNotice';

export const metadata: Metadata = {
  title: 'Contact | Engispider Infotech',
  alternates: { canonical: 'https://engispider.com/contact/' },
  robots: { index: false, follow: true },
};

export default function InqueryRedirect() {
  return <RedirectNotice to="/contact/" label="Contact" />;
}
