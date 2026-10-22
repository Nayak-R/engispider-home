'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PRODUCTS } from '@/data/products';

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

/**
 * Query terms a buyer might use that are not in the product's own name,
 * tagline or category — the words people type instead of the words we print.
 */
const PRODUCT_TERMS: Record<string, string> = {
  restro360: 'restaurant cafe cloud kitchen kot qr ordering menu food dining takeaway',
  campus360:
    'school college student fees online fee payment admission examination hostel transport library education academic institute',
  hrms: 'hr human resource payroll salary attendance leave employee onboarding recruitment',
  crm: 'lead sales pipeline marketing deals follow up contacts calls',
  retail360: 'shop store billing catalogue barcode apparel grocery electronics chain',
  inventory: 'stock warehouse purchase order supplier barcode reorder godown',
  'site-manager':
    'construction project plant grn issue transfer gate pass asset custody material',
  pharmacy: 'medical store batch expiry drug medicine chemist prescription',
  lims: 'laboratory sample testing calibration work order job card equipment test report nabl',
  clinic: 'opd doctor appointment patient practice records consultation',
  whatsapp: 'notification template delivery otp bulk gateway transactional integration',
  'face-recognition':
    'biometric kiosk liveness touchless staff punch in out fingerprint alternative',
  monitoring: 'cold storage cold chain boiler alarm iot sensor data logger temperature',
  business: 'erp enterprise bespoke integration migration dashboard internal tool',
};

/**
 * Products come from the catalogue, pages are listed.
 *
 * The product half used to be written out here by hand, which meant it held
 * names that were a rename behind the rest of the site AND had no entry at
 * all for seven of the fourteen products — a search for "LIMS" or "retail"
 * returned nothing for pages that exist. Derived, it cannot drift again.
 */
const INDEX: SearchEntry[] = [
  ...PRODUCTS.map((p) => ({
    title: p.name,
    description: p.tagline,
    href: p.href,
    category: 'Product',
    keywords: `${p.category} ${PRODUCT_TERMS[p.slug] ?? ''}`.toLowerCase(),
  })),
  {
    title: 'Engispider Restro Training Guide',
    description: 'Step-by-step guide to using the restaurant app — for staff and owners.',
    href: '/solutions/restaurant/guide',
    category: 'Guide',
    keywords: 'restaurant guide training manual how to use pos kot',
  },
  {
    title: 'All Products',
    description: 'Every product Engispider builds, plus custom software.',
    href: '/solutions',
    category: 'Page',
    keywords: 'solutions products software industries catalogue',
  },
  {
    title: 'Services',
    description: 'Web development, mobile apps, cloud and custom software services.',
    href: '/services',
    category: 'Page',
    keywords: 'services web development mobile app cloud api design custom software',
  },
  {
    title: 'Customers',
    description: 'The organisations running Engispider software today.',
    href: '/customers',
    category: 'Page',
    keywords: 'customers clients references who uses case study',
  },
  {
    title: 'FAQ',
    description: 'Pricing, demos, data migration, deployment time and support, answered.',
    href: '/faq',
    category: 'Page',
    keywords: 'faq questions pricing cost demo migration support deployment time',
  },
  {
    title: 'About Us',
    description: 'Who we are — a software company in Bhubaneswar building business software.',
    href: '/about',
    category: 'Page',
    keywords: 'about company team bhubaneswar engispider story iso certified',
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

  /*
   * Keep the input in sync when arriving via ?q= — a Google sitelinks
   * search, a shared link, or the back button. The field has to stay
   * editable, so the URL cannot simply be the source of truth; this is a
   * one-way sync from an external store into local state.
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <>
      <Header />

      <main id="main" className="section pt-28 md:pt-32">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <p className="marker mono">Search</p>
            <h1 className="display mt-5 text-f-6xl">Find it.</h1>
            <p className="mt-6 max-w-xl text-f-lg leading-relaxed text-body">
              Every product, service and page on this site — fourteen systems
              and everything around them.
            </p>

            <form onSubmit={onSubmit} className="relative mt-10">
              <SearchIcon
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
                aria-hidden
              />
              <label htmlFor="site-search" className="sr-only">
                Search Engispider
              </label>
              <input
                id="site-search"
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “restaurant POS”, “payroll”, “LIMS”…"
                className="w-full rounded-lg border border-hairline bg-canvas py-4 pl-11 pr-28 text-f-xs text-ink outline-none transition-colors placeholder:text-faint focus:border-accent-400 focus:ring-2 focus:ring-accent-200"
              />
              <button
                type="submit"
                className="btn btn-primary absolute right-2 top-1/2 h-10 -translate-y-1/2 px-5"
              >
                Search
              </button>
            </form>

            <p className="mono mt-6 text-faint" aria-live="polite">
              {query.trim()
                ? `${results.length} result${results.length === 1 ? '' : 's'} for “${query.trim()}”`
                : `All ${results.length} destinations`}
            </p>

            <ul className="mt-6 overflow-hidden rounded-lg border border-hairline">
              {results.map((r) => (
                <li key={r.href} className="border-b border-hairline last:border-0">
                  <Link
                    href={r.href}
                    className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-accent-50"
                  >
                    <span className="min-w-0">
                      <span className="mono block text-accent-700">{r.category}</span>
                      <span className="mt-1.5 block font-display text-f-lg font-bold text-ink transition-colors group-hover:text-accent-ink">
                        {r.title}
                      </span>
                      <span className="mt-1 block text-f-xs leading-relaxed text-body">
                        {r.description}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-5 w-5 shrink-0 text-hairline-strong transition-all group-hover:translate-x-1 group-hover:text-accent-700"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {results.length === 0 && (
              <div className="rounded-lg border border-hairline bg-band p-10 text-center">
                <p className="font-display text-f-lg font-bold text-ink">
                  Nothing matches “{query.trim()}”.
                </p>
                <p className="mt-2 text-f-xs leading-relaxed text-body">
                  Try a broader term, or tell us what you are looking for.
                </p>
                <Link href="/contact" className="link-arrow mt-6 justify-center">
                  Contact us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
