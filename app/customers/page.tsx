import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionBackdrop from '@/components/SectionBackdrop';
import ClientLogoGrid from '@/components/ClientLogoGrid';
import { Reveal, MaskText, CountUp } from '@/components/motion/Reveal';

import { CLIENTS } from '@/data/clients';
import { COMPANY } from '@/data/company';
import { INDUSTRIES } from '@/data/products';

// Deliberately a server component: nothing here is interactive, so the
// page costs no client JS beyond the reveal observer — and, unlike the
// 'use client' pages elsewhere in the app, it can export real metadata.
export const metadata = pageMetadata({
  title: 'Our Customers',
  description:
    'The businesses and institutes we build software for — across education, healthcare, logistics, infrastructure and hospitality. Named, with their own sites linked.',
  path: '/customers',
  keywords: [
    'Engispider customers',
    'Engispider clients',
    'software company clients Bhubaneswar',
    'ERP customers India',
  ],
});

/**
 * Customers.
 *
 * Two numbers live on this page and they must not read as a
 * contradiction: the total served, which the company stands behind, and
 * the shorter list of organisations that agreed to be named. The copy
 * states the relationship every time either appears — "150+ served, 15
 * named here" — because a big claim beside a short list looks like the
 * short list is the real answer.
 *
 * The previous version was black with a purple gradient CTA; the logo
 * wall was the only part worth keeping, and it is unchanged.
 */
export default function CustomersPage() {
  const sectors = [...new Set(CLIENTS.map((c) => c.sector))];

  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: 'Our Customers', path: '/customers' }]} />
      <Header />

      <main id="main">
        <PageHero
          marker="Customers"
          title="The ones who let us name them."
          lede={`${COMPANY.organisations.servedDisplay} organisations run software we built. ${CLIENTS.length} of them agreed to appear here — and every one of those links to their own site, so you can check rather than take our word for it.`}
          cta={{ href: '/contact', label: 'Become the next one' }}
          secondary={{ href: '/solutions', label: 'See the products' }}
          spec={[
            ['Organisations served', COMPANY.organisations.servedDisplay],
            ['Sectors', sectors.length > 0 ? `${sectors.length} — education to hospitality` : '—'],
            ['Support', COMPANY.hoursDisplay],
          ]}
        />

        <Numbers sectors={sectors.length} />

        <section className="section relative">
          <SectionBackdrop side="right" tone="warm" />
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="marker mono">The list</p>
                <MaskText as="h2" className="display mt-5 text-f-5xl">
                  <>Who we work</>
                  <>
                    <span className="accent-word">with</span>.
                  </>
                </MaskText>
              </div>
              <div className="flex items-end lg:col-span-5 lg:col-start-8">
                <Reveal delay={120}>
                  <p className="text-body">
                    A sample, not the whole book — most of our work sits behind
                    an agreement that does not let us name it. Grouped by
                    sector; marks belong to their owners and each opens their
                    own site in a new tab.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="mt-14">
              <ClientLogoGrid clients={CLIENTS} detailed />
            </div>
          </div>
        </section>

        <Industries />
        <Cta />
      </main>

      <Footer />
    </>
  );
}

/* ================================================================= NUMBERS */

function Numbers({ sectors }: { sectors: number }) {
  return (
    <section className="border-y border-hairline bg-band">
      <div className="container-page">
        <dl className="grid gap-x-10 gap-y-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: COMPANY.organisations.servedDisplay, label: 'organisations served' },
            { count: CLIENTS.length, label: 'named here, with permission' },
            { count: sectors, label: 'sectors served' },
            { value: 'Linked', label: 'every mark goes to their site' },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 70} className="relative">
              <span
                aria-hidden
                className="absolute -left-5 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-hairline lg:block"
              />
              <dt className="font-display text-f-2xl font-extrabold leading-none text-ink">
                {item.count !== undefined ? <CountUp value={item.count} duration={1100} /> : item.value}
              </dt>
              <dd className="mono mt-2.5 text-faint">{item.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ============================================================== INDUSTRIES */

/** What each sector actually runs — so the list is useful, not decorative. */
function Industries() {
  return (
    <section className="section relative border-t border-hairline">
      <SectionBackdrop side="left" tone="cool" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">By industry</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>And what each</>
              <>
                of them <span className="accent-word">runs</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Each line names the product that serves it, so the claim is
                something you can open and read rather than a stock industry
                list.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 border-t border-hairline">
          {INDUSTRIES.map((industry, i) => (
            <Reveal as="li" key={industry.name} delay={Math.min(i, 5) * 50}>
              <Link
                href={industry.href}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-hairline py-4 transition-colors hover:bg-accent-50 md:grid-cols-[4rem_minmax(0,22rem)_minmax(0,1fr)_2rem] md:gap-x-6 md:py-5"
              >
                <span className="mono text-faint transition-colors group-hover:text-accent-700">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-f-lg font-bold tracking-tight text-ink transition-colors group-hover:text-accent-ink md:text-f-xl">
                  {industry.name}
                </span>
                <span className="col-start-2 text-f-xs text-muted md:col-start-3">
                  {industry.product}
                </span>
                <ArrowRight
                  className="col-start-3 row-start-1 h-4 w-4 self-center text-hairline-strong transition-colors group-hover:text-accent-700 md:col-start-4"
                  aria-hidden
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ===================================================================== CTA */

function Cta() {
  return (
    <section className="bg-accent-500">
      <div className="container-page">
        <div className="grid items-center gap-8 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <MaskText as="h2" className="display text-f-6xl text-ink">
              <>Ready to be</>
              <>the next one?</>
            </MaskText>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={120}>
              <p className="text-[1.02rem] leading-relaxed text-ink/80">
                Tell us what you are trying to build. We will tell you
                honestly whether we are the right team for it.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-ink">
                  Start a conversation <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${COMPANY.contact.sales.tel}`}
                  className="btn border border-ink/25 text-ink hover:border-ink"
                >
                  {COMPANY.contact.sales.display}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
