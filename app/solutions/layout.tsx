import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Software Solutions | HRMS, CRM, POS & ERP',
  description:
    'Ready-built business software from Engispider: HRMS, CRM, inventory, pharmacy, restaurant POS and school ERP, plus custom systems built to order.',
  path: '/solutions',
  // Children under /solutions would otherwise render with no brand suffix.
  childTitleTemplate: '%s | Engispider',
  keywords: [
    'Software Solutions India',
    'HRMS Software',
    'CRM System',
    'Inventory Management',
    'Pharmacy Software',
    'Restaurant POS',
    'Business Software',
  ],
});

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
