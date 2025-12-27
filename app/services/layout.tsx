import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Software Development Company Bhubaneswar',
  description: 'Comprehensive software development services including custom website development, web applications, e-commerce, cloud solutions, and API development.',
  keywords: ['Software Development Services', 'Web Development', 'Custom Software', 'E-commerce Development', 'Cloud Solutions'],
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
