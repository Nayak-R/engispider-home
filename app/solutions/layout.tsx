import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Solutions | HRMS, CRM, Inventory, Pharmacy & Restaurant Systems',
  description: 'Explore our comprehensive software solutions including HRMS, CRM, Inventory Management, Pharmacy Manager, Restaurant POS, and custom business software.',
  keywords: [
    'Software Solutions India',
    'HRMS Software',
    'CRM System',
    'Inventory Management',
    'Pharmacy Software',
    'Restaurant POS',
    'Business Software'
  ],
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
