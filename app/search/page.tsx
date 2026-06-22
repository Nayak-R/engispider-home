import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchClient from './SearchClient';

export const metadata: Metadata = {
  title: 'Search | Engispider Infotech',
  description:
    'Search Engispider Infotech — HRMS, CRM, Inventory, Pharmacy and Restaurant software solutions, services and resources.',
  alternates: { canonical: 'https://engispider.com/search/' },
  // Search results pages should not themselves be indexed, but links are followed.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <SearchClient />
    </Suspense>
  );
}
