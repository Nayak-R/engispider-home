'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Static, client-side search index. Each entry is one indexable destination on
 * the site. `keywords` widen the match surface so queries like "POS", "payroll"
 * or "billing" resolve to the right solution page.
 */
interface SearchEntry {
  title: string;
  description: string;
  href: string;
  category: string;
  keywords: string;
}

const INDEX: SearchEntry[] = [
  {
    title: 'School & College ERP',
    description: 'Admissions, fees, accounting, online fee payment, exams, hostel, transport, library and payroll for schools and colleges.',
    href: '/solutions/education',
    category: 'Solution',
    keywords: 'school management software college erp student fees online fee payment admission examination hostel transport library education campus academic',
  },
  {
    title: 'HRMS Software',
    description: 'Workforce management, payroll, attendance, leave and employee self-service.',
    href: '/solutions/hrms',
    category: 'Solution',
    keywords: 'hr human resource payroll salary attendance leave employee onboarding hrms',
  },
  {
    title: 'CRM System',
    description: 'Manage leads, sales pipelines and customer relationships to grow revenue.',
    href: '/solutions/crm',
    category: 'Solution',
    keywords: 'crm customer relationship sales leads pipeline marketing deals',
  },
  {
    title: 'Inventory Manager',
    description: 'Smart stock control, warehouses, purchase orders and low-stock alerts.',
    href: '/solutions/inventory',
    category: 'Solution',
    keywords: 'inventory stock warehouse purchase order supplier barcode',
  },
  {
    title: 'Pharmacy Manager',
    description: 'Pharmacy billing, batch & expiry tracking and medical store management.',
    href: '/solutions/pharmacy',
    category: 'Solution',
    keywords: 'pharmacy medical store billing batch expiry drug medicine pos',
  },
  {
    title: 'Restro360 — Restaurant Management',
    description: 'POS, QR ordering, kitchen display, inventory, recipes, P&L and loyalty.',
    href: '/solutions/restaurant',
    category: 'Solution',
    keywords: 'restaurant pos restro360 cafe cloud kitchen kot billing qr ordering menu food',
  },
  {
    title: 'Restro360 Training Guide',
    description: 'Step-by-step guide to using the restaurant app — for staff and owners.',
    href: '/solutions/restaurant/guide',
    category: 'Guide',
    keywords: 'restaurant guide training manual how to use restro360 pos kot',
  },
  {
    title: 'Business Solutions',
    description: 'Custom ERP and business management software tailored to your operations.',
    href: '/solutions/business',
    category: 'Solution',
    keywords: 'erp business custom software enterprise management',
  },
  {
    title: 'All Solutions',
    description: 'Explore every industry solution Engispider builds.',
    href: '/solutions',
    category: 'Page',
    keywords: 'solutions products software industries',
  },
  {
    title: 'Services',
    description: 'Web development, mobile apps, cloud and custom software services.',
    href: '/services',
    category: 'Page',
    keywords: 'services web development mobile app cloud api design custom software',
  },
  {
    title: 'About Us',
    description: 'Who we are — a software company in Bhubaneswar building business software.',
    href: '/about',
    category: 'Page',
    keywords: 'about company team bhubaneswar engispider story',
  },
  {
    title: 'Contact',
    description: 'Get in touch, request a demo or start a project with our team.',
    href: '/contact',
    category: 'Page',
    keywords: 'contact demo enquiry inquiry quote support sales phone email book demo',
  },
];

function scoreEntry(entry: SearchEntry, terms: string[]): number {
  const haystack = `${entry.title} ${entry.description} ${entry.keywords}`.toLowerCase();
  const titleLc = entry.title.toLowerCase();
  let score = 0;
  for (const t of terms) {
    if (!t) continue;
    if (titleLc.includes(t)) score += 5;
    if (haystack.includes(t)) score += 2;
  }
  return score;
}

export default function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);

  // Keep the input in sync when arriving via ?q= (e.g. Google sitelinks search).
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return INDEX;
    return INDEX.map((e) => ({ e, s: scoreEntry(e, terms) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.e);
  }, [query]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.replace(q ? `/search/?q=${encodeURIComponent(q)}` : '/search/');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />

      <section className="pt-32 pb-20 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Search<span className="text-indigo-400">.</span>
        </h1>
        <p className="text-gray-400 mb-8">Find solutions, services and resources across Engispider.</p>

        <form onSubmit={onSubmit} className="relative mb-10">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “restaurant POS”, “payroll”, “inventory”…"
            className="w-full pl-12 pr-28 py-4 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold hover:scale-105 transition-transform"
          >
            Search
          </button>
        </form>

        <p className="text-sm text-gray-500 mb-5">
          {query.trim()
            ? `${results.length} result${results.length === 1 ? '' : 's'} for “${query.trim()}”`
            : `Showing all ${results.length} destinations`}
        </p>

        <div className="space-y-3">
          {results.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group block p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-400/50 hover:bg-white/[0.06] transition-all"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wide text-indigo-300/80">{r.category}</span>
                  <h2 className="text-lg font-semibold mt-1 group-hover:text-indigo-300 transition-colors">
                    {r.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">{r.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-indigo-300 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </Link>
          ))}

          {results.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg mb-2">No results for “{query.trim()}”.</p>
              <p className="text-sm">
                Try a broader term, or{' '}
                <Link href="/contact" className="text-indigo-300 underline">
                  contact us
                </Link>{' '}
                directly.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
