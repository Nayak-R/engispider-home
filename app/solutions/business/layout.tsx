import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Software Solutions | Custom ERP Development India',
  description: 'Custom business software solutions including ERP, cloud applications, mobile apps, and digital transformation services. Best software development company in India.',
  keywords: ['Business Software Solutions', 'Custom ERP Development', 'Enterprise Software', 'Digital Transformation', 'Custom Software India', 'Business Applications'],
};

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
