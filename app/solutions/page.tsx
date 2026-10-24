import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import SectionBackdrop from '@/components/SectionBackdrop';
import { Reveal, MaskText, MaskWords } from '@/components/motion/Reveal';
import { RestaurantScreen, CampusScreen } from '@/components/home/Screens';

import { COMPANY } from '@/data/company';
import {
  PRODUCTS,
  FLAGSHIPS,
  CATALOGUE,
  INDUSTRIES,
  PRODUCT_COUNT_WORD_CAP,
  type Product,
} from '@/data/products';
import { SITE_URL } from '@/lib/seo';

/**
 * The catalogue index.
 *
 * The previous version of this page listed seven products while the company
 * ships fourteen, and asserted "24/7 technical assistance" on a site whose
 * opening-hours schema says Mon–Fri 9–18 and Sat 9–14. Both are fixed here by
 * construction: the list is rendered from data/products.ts, so it cannot fall
 * behind the catalogue again, and the only support claim on the page is the
 * one in data/company.ts that the schema is generated from.
 *
 * A server component. No state, so the page is static HTML and the full
 * catalogue is in the source for crawlers and AI engines — which matters more
 * here than anywhere else on the site, because this is the page that answers
 * "what does this company sell".
 */
export default function SolutionsPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: 'Solutions', path: '/solutions' }]} />
      <CatalogueJsonLd />

      <Header />

      <main id="main">
        <Hero />
        <Flagships />
        <Catalogue />
        <Industries />
        <CustomBand />
        <CtaBand />
      </main>

      <Footer />
    </>
  );
}

/* ===================================================================== HERO */

function Hero() {
  return (
    <section className="relative overflow-hidden pb-4">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="grid-rule absolute inset-0"
          style={{
            maskImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, #000 25%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, #000 25%, transparent 80%)',
          }}
        />
        <div
          className="absolute -top-52 right-0 h-[620px] w-[620px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(251,124,31,0.18), transparent 70%)' }}
        />
      </div>

      <div className="container-page pt-28 md:pt-32">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="marker mono">Catalogue</p>
            {/* LCP element — only the inner spans are masked. */}
            <h1 className="display mt-5 text-f-7xl">
              <MaskWords className="block" step={70}>
                {`${PRODUCT_COUNT_WORD_CAP} systems,`}
              </MaskWords>{' '}
              <MaskWords className="block" step={70} delay={280}>
                already built.
              </MaskWords>
            </h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={420}>
              <p className="text-f-lg leading-relaxed text-body">
                Every one of these is in production with paying customers. Run
                one, or several on a single login — and where none of them fit
                the way you work, we build the system instead.
              </p>
            </Reveal>
            <Reveal delay={540}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Book a demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/solutions/business" className="btn btn-line">
                  Custom software
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {[
            [`${PRODUCTS.length}`, 'products in production'],
            [`${INDUSTRIES.length}`, 'industries served'],
            ['1', 'stack across all of them'],
            [COMPANY.certification.label, 'independently audited'],
          ].map(([value, label], i) => (
            <Reveal key={label} delay={660 + i * 70} className="bg-canvas">
              <div className="h-full p-6">
                <dt className="font-display text-f-xl font-extrabold leading-none text-ink">
                  {value}
                </dt>
                <dd className="mono mt-2.5 text-faint">{label}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ================================================================ FLAGSHIPS */

/** The two products with the deepest feature set, each shown as it looks. */
function Flagships() {
  return (
    <section className="section relative">
      <SectionBackdrop side="right" tone="warm" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">How deep these go</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Whole operations,</>
              <>
                not <span className="accent-word">modules</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Two worked examples of what we mean by a complete system —
                front desk to ledger, with nothing left on a spreadsheet. Every
                product below is built to the same depth for its own trade.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {FLAGSHIPS.map((p, i) => (
            <FlagshipRow key={p.slug} product={p} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlagshipRow({ product, reverse }: { product: Product; reverse: boolean }) {
  const Screen = product.slug === 'restro360' ? RestaurantScreen : CampusScreen;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className={`lg:col-span-5 ${reverse ? 'lg:order-2 lg:col-start-8' : ''}`}>
        <p className="mono text-accent-700">{product.chip}</p>
        <MaskText as="h3" className="display mt-4 text-f-4xl">
          <>{product.name}</>
        </MaskText>
        <Reveal delay={100}>
          <p className="mt-4 text-f-lg leading-tight text-accent-ink">{product.tagline}</p>
        </Reveal>
        <Reveal delay={160}>
          <p className="measure mt-5 leading-relaxed text-body">{product.summary}</p>
        </Reveal>

        <ul className="mt-7 space-y-2.5">
          {product.features.slice(0, 5).map((f, i) => (
            <Reveal as="li" key={f} delay={220 + i * 50} className="flex items-start gap-3">
              <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-500" aria-hidden />
              <span className="text-f-xs leading-relaxed text-body">{f}</span>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={480}>
          <Link href={product.href} className="link-arrow mt-8">
            All {product.features.length} capabilities <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>

      <Reveal
        direction="scale"
        delay={120}
        className={`lg:col-span-6 ${reverse ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}
      >
        <Screen />
      </Reveal>
    </div>
  );
}

/* ================================================================ CATALOGUE */

/** Everything that is not a flagship, as a numbered index. */
function Catalogue() {
  return (
    <section className="section border-y border-hairline bg-band">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">The rest of the catalogue</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>{CATALOGUE.length} more, each</>
              <>
                doing <span className="accent-word">one</span> job.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Narrower in scope and deliberately so — a pharmacy does not
                need a kitchen display, and a laboratory does not need a fee
                ledger. Same engineering, same stack, same support.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {CATALOGUE.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 60} className="bg-canvas">
              <Link
                href={p.href}
                className="group relative flex h-full flex-col overflow-hidden p-7 transition-colors hover:bg-accent-50"
              >
                {/* Oversized ghosted index figure, as on the Method cards.
                    Positive insets on both axes so it is never clipped. */}
                <span
                  aria-hidden
                  className="mono-num pointer-events-none absolute right-3 top-1 select-none font-display text-[4.5rem] font-extrabold leading-none text-hairline transition-colors group-hover:text-accent-200"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="relative mono text-accent-700">{p.chip}</span>
                <span className="relative mt-4 font-display text-f-lg font-bold text-ink">
                  {p.name}
                </span>
                <span className="relative mt-1.5 text-f-2xs text-muted">{p.category}</span>
                <span className="relative mt-3 flex-1 text-f-xs leading-relaxed text-body">
                  {p.tagline}
                </span>

                <span className="relative mt-6 inline-flex items-center gap-2 text-f-xs font-medium text-ink transition-colors group-hover:text-accent-ink">
                  {p.status === 'draft' ? 'Ask us about it' : 'Open'}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* =============================================================== INDUSTRIES */

function Industries() {
  return (
    <section className="section relative">
      <SectionBackdrop side="left" tone="cool" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">By industry</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Start from what</>
              <>
                you <span className="accent-word">run</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Each line names the product that serves it, so the claim is
                something you can check rather than a stock industry list.
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
                <ArrowUpRight
                  className="col-start-3 row-start-1 h-5 w-5 self-center text-hairline-strong transition-colors group-hover:text-accent-700 md:col-start-4"
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

/* ============================================================== CUSTOM BAND */

function CustomBand() {
  return (
    <section className="section border-y border-hairline bg-accent-50">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="marker mono">None of them fit?</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Then we build</>
              <>
                the <span className="accent-word">other</span> one.
              </>
            </MaskText>
            <Reveal delay={120}>
              <p className="measure mt-6 text-body">
                The same engineers who build these products build yours — one
                stack, one set of conventions, no hand-off to a junior bench.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <Link href="/services" className="link-arrow mt-8">
                How we work <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2">
              {[
                ['Configured', 'A product set up to your process — faster and cheaper wherever one genuinely fits.'],
                ['Extended', 'A product plus the module you actually need, built onto the same codebase.'],
                ['Built', 'A system designed around your workflow, on the stack we maintain everything else on.'],
                ['Integrated', 'Payments, WhatsApp, SMS, biometrics and accounting wired into whichever you choose.'],
              ].map(([title, body], i) => (
                <Reveal key={title} delay={i * 60} className="bg-white">
                  <div className="h-full p-6">
                    <h3 className="mono text-accent-700">{title}</h3>
                    <p className="mt-3 text-f-xs leading-relaxed text-body">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ CTA BAND */

function CtaBand() {
  return (
    <section className="bg-accent-500">
      <div className="container-page">
        <div className="grid items-center gap-8 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <MaskText as="h2" className="display text-f-6xl text-ink">
              <>Tell us what breaks,</>
              <>and we’ll show you</>
              <>what fixes it.</>
            </MaskText>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={120}>
              <p className="text-[1.02rem] leading-relaxed text-ink/80">
                A guided demo on a live system, using your own scenarios —
                usually within two working days.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-ink">
                  Book a demo <ArrowRight className="h-4 w-4" />
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

/* ================================================================= JSON-LD */

/**
 * The catalogue as an ItemList.
 *
 * This is the page that answers "what does Engispider sell", so it is worth
 * saying in a form a machine can read without inferring it from fourteen
 * cards. Each entry points at the product's own page, which carries the
 * SoftwareApplication markup — this list does not duplicate it.
 */
function CatalogueJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          '@id': `${SITE_URL}/solutions/#catalogue`,
          name: `${COMPANY.name} product catalogue`,
          numberOfItems: PRODUCTS.length,
          itemListOrder: 'https://schema.org/ItemListUnordered',
          itemListElement: PRODUCTS.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.name,
            description: p.tagline,
            url: `${SITE_URL}${p.href}/`,
          })),
        }),
      }}
    />
  );
}
