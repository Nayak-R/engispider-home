import { Suspense } from 'react';
import { pageMetadata } from '@/lib/seo';
import SearchClient from './SearchClient';

export const metadata = pageMetadata({
  title: 'Search',
  description:
    'Search Engispider Infotech — HRMS, CRM, inventory, pharmacy and restaurant software, services and resources.',
  path: '/search',
  // A search results page should not compete in the index, but its links
  // are still worth following.
  noindex: true,
});

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <SearchClient />
    </Suspense>
  );
}
