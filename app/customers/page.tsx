import Link from 'next/link';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomersHero from '@/components/CustomersHero';
import ClientLogoGrid from '@/components/ClientLogoGrid';
import { CLIENTS } from '@/data/clients';

// Deliberately a server component: the only interactive part is the hero, which
// is its own client component. That keeps this page light and — unlike the
// 'use client' pages elsewhere in the app — lets it export real page metadata.
export const metadata = pageMetadata({
  title: 'Our Customers',
  description:
    'The businesses and institutes we build software for — across education, healthcare, logistics, infrastructure and hospitality.',
  path: '/customers',
  keywords: [
    'Engispider customers',
    'Engispider clients',
    'software company clients Bhubaneswar',
    'ERP customers India',
  ],
});

export default function CustomersPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <BreadcrumbJsonLd trail={[{ name: 'Our Customers', path: '/customers' }]} />

      <Header />

      <CustomersHero />

      {/* The wall */}
      <section className="bg-black py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Who we work{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                with
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Grouped by the sectors they work in. Names and marks belong to their respective
              owners.
            </p>
          </div>

          <ClientLogoGrid clients={CLIENTS} detailed />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/25 via-transparent to-transparent" />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Ready to be the next one?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Tell us what you are trying to build. We will tell you honestly whether we are the
            right team for it.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition-all hover:border-blue-400/60 hover:bg-white/5"
            >
              Explore our solutions
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
