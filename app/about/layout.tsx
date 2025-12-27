import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Leading Software Company in Bhubaneswar',
  description: 'Learn about Engispider Infotech - a leading software development company in Bhubaneswar offering HRMS, CRM, and custom business solutions since 10+ years.',
  keywords: ['About Engispider', 'Software Company Bhubaneswar', 'IT Company Odisha', 'Software Development Company'],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
