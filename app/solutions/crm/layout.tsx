import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CRM System for Businesses | Best CRM Software India',
  description: 'Powerful CRM software to manage customer relationships, track sales pipeline, automate workflows. Best CRM system for Indian businesses.',
  keywords: [
    'CRM System for Businesses',
    'CRM Software India',
    'Customer Relationship Management',
    'Sales CRM',
    'Best CRM India',
    'Cloud CRM',
    'CRM Bhubaneswar'
  ],
};

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return children;
}
