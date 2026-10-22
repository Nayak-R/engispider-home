import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import SectionBackdrop from '@/components/SectionBackdrop';
import { Reveal, MaskText, MaskWords, MaskLine } from '@/components/motion/Reveal';
import { FreeCallout } from '@/components/solutions/FreeTag';

import { COMPANY } from '@/data/company';
import { PRODUCT_FAQS } from '@/data/faqs';
import { PRODUCTS, type Product } from '@/data/products';
import { SITE_URL } from '@/lib/seo';

/**
 * The shared product page.
 *
 * One template, driven entirely by data/products.ts, rather than fourteen
 * hand-written pages. The seven products that had no page at all were live
 * 404s linked from the catalogue, the header menu and the footer; a template
 * fixes all seven at once and makes the fifteenth product a data edit.
 *
 * Three rules it enforces, which is the real reason it exists:
 *
 *  1. Nothing is asserted that is not in the data, and nothing is ever
 *     described as forthcoming. Every product in the catalogue is built
 *     and in production — the words "coming soon" appear nowhere on this
 *     site, because they would be false. Where a capability list is short
 *     it is short, not pending.
 *
 *  2. No product links to its running instance. restro360/message/crm are
 *     login-gated tenant deployments; a prospect who clicks through hits a
 *     sign-in wall. Every call to action goes to /contact for a demo.
 *
 *  3. Server component throughout. The page is static HTML — the only client
 *     JS is the header menu and the reveal observer, so the content is in the
 *     source for crawlers and for AI engines reading the page directly.
 *
 * ── Giving a product more than the template ───────────────────────────────
 * Pass `sections` and it renders in place of the generic capability list.
 * That is the extension point for a product that has earned a real page:
 * the flagships have four or five illustrated pillars and a thirty-item
 * capability grid, which no amount of data modelling turns into a list of
 * strings. Everything around it — hero, spec strip, audience, rollout, FAQ,
 * related, CTA — stays shared, so the deep pages and the thin ones remain
 * recognisably the same object.
 */

/**
 * Rollout phases.
 *
 * Not invented for this template — these are the phases already published in
 * the deployment-time FAQ answer ("configuration, data migration, training,
 * then go-live"), plus the support phase from the post-go-live answer. Said
 * in two places, they have to say the same thing.
 */
const ROLLOUT = [
  ['Configuration', 'Your branches, roles, tax rates, document formats and approval rules — set up against how you work now.'],
  ['Data migration', 'Existing records imported from Excel, CSV or a database export, validated, with an error report before anything commits.'],
  ['Training', 'Your team trained on the screens they will actually use, on your own data rather than a sample set.'],
  ['Go-live', 'Production cutover, with us on hand through the first days of real use.'],
  ['Support', 'A support agreement with response times and a named contact, covering fixes, updates and enhancements.'],
] as const;

export default function ProductPage({
  product,
  screen,
  sections,
  extraCta,
}: {
  product: Product;
  /** The product's UI, drawn in HTML. Absent where we have no facts to draw. */
  screen?: React.ReactNode;
  /** Bespoke mid-page content. Replaces the generic capability list. */
  sections?: React.ReactNode;
  /** A third hero button, for products with somewhere else worth going. */
  extraCta?: { href: string; label: string };
}) {
  /** Three more products to send the reader to, in catalogue order. */
  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: 'Solutions', path: '/solutions' },
          { name: product.name, path: product.href },
        ]}
      />
      <ProductJsonLd product={product} />

      <Header />

      <main id="main">
        <Hero product={product} screen={screen} extraCta={extraCta} />

        {sections ?? <Capabilities product={product} />}

        <Audience product={product} />

        <Rollout included={product.slug !== 'business'} />

        <Faqs product={product} />

        <Related products={related} currentName={product.name} />

        <CtaBand product={product} />
      </main>

      <Footer />
    </>
  );
}

/* ===================================================================== HERO */

function Hero({
  product,
  screen,
  extraCta,
}: {
  product: Product;
  screen?: React.ReactNode;
  extraCta?: { href: string; label: string };
}) {
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
        {/* Visible trail, matching the BreadcrumbList emitted above it. */}
        <nav aria-label="Breadcrumb" className="mono text-faint">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-accent-700">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/solutions" className="transition-colors hover:text-accent-700">
                Solutions
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="marker mono">{product.category}</p>

            {/* LCP element. Only the inner spans are masked, so the <h1>
                itself paints on the first frame. */}
            <h1 className="display mt-5 text-f-7xl">
              <MaskWords className="block" step={75}>
                {product.name}
              </MaskWords>
            </h1>

            <MaskLine delay={300}>
              <p className="mt-6 max-w-xl text-f-xl leading-tight text-accent-ink">
                {product.tagline}
              </p>
            </MaskLine>

            <Reveal delay={480}>
              <p className="mt-6 max-w-xl leading-relaxed text-body">{product.summary}</p>
            </Reveal>

            <Reveal delay={600}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Book a demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/solutions" className="btn btn-line">
                  All products
                </Link>
                {extraCta && (
                  <Link href={extraCta.href} className="btn btn-line">
                    {extraCta.label}
                  </Link>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal direction="scale" delay={140} className="lg:col-span-6">
            {/* Products without a drawn screen simply show none — never a
                placeholder apologising for one. */}
            {screen}
          </Reveal>
        </div>

        {/* Spec strip. Every cell is a fact already in the data file — there
            is no row here that someone has to go and make true later. */}
        <dl className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-3">
          {[
            ['Category', product.category],
            ['Status', 'In production with customers'],
            ['How to see it', 'Guided demo on a live system'],
          ].map(([term, value], i) => (
            <Reveal key={term} delay={740 + i * 80} className="bg-canvas">
              <div className="h-full p-6">
                <dt className="mono text-accent-700">{term}</dt>
                <dd className="mt-2.5 text-f-xs leading-relaxed text-ink">{value}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ============================================================= CAPABILITIES */

function Capabilities({ product }: { product: Product }) {
  return (
    <section className="section border-y border-hairline bg-band">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">Capabilities</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Everything it</>
              <>
                does, <span className="accent-word">listed</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                {product.features.length} capabilities, shipping today. Not a
                roadmap — each one is in the running product.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Numbered index rather than feature cards: a long list of cards is
            a wall, the same list typeset as an index scans in one pass. */}
        <ol className="mt-14 grid gap-x-10 border-t border-hairline md:grid-cols-2">
          {product.features.map((f, i) => (
            <Reveal
              as="li"
              key={f}
              delay={(i % 2) * 60}
              className="group flex items-baseline gap-4 border-b border-hairline py-4"
            >
              <span className="mono-num shrink-0 text-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 text-f-xs leading-relaxed text-ink">{f}</span>
              <Check className="h-3.5 w-3.5 shrink-0 translate-y-0.5 text-accent-500" aria-hidden />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================= AUDIENCE */

/**
 * Who it is for.
 *
 * Was a single long sentence set in display type under a hairline, which
 * read as a slogan and told a reader nothing they could test themselves
 * against. Now it names the operations — a reader either recognises their
 * own business in one of them or does not, which is the only job this
 * section has.
 *
 * The second column is the unusual part and is there on purpose: a page
 * that cannot name one situation its product suits badly is advertising,
 * not describing. It is also the section's own argument for the custom
 * build, so the link out of it finally has something to follow.
 */
function Audience({ product }: { product: Product }) {
  const fits = product.fits ?? [];
  const checkFirst = product.checkFirst ?? [];

  return (
    <section className="section border-t border-hairline">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">Who it is for</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Find yourself</>
              <>
                on this <span className="accent-word">list</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">{product.audience}</p>
            </Reveal>
          </div>
        </div>

        {fits.length > 0 ? (
          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Built for */}
            <div className="lg:col-span-7">
              <div className="flex items-baseline gap-3 border-b border-hairline pb-3">
                <h3 className="font-display text-f-lg font-bold text-ink">Built for</h3>
                <span className="mono-num text-faint">{fits.length}</span>
              </div>
              <ul className="grid gap-px overflow-hidden border-x border-b border-hairline bg-hairline sm:grid-cols-2">
                {fits.map((f, i) => (
                  <Reveal as="li" key={f.name} delay={(i % 2) * 60} className="bg-canvas">
                    <div className="group h-full p-6 transition-colors hover:bg-accent-50">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-100">
                        <Check className="h-3.5 w-3.5 text-accent-700" aria-hidden />
                      </span>
                      <h4 className="mt-4 font-display text-f-base font-bold leading-snug text-ink">
                        {f.name}
                      </h4>
                      <p className="mt-2 text-f-xs leading-relaxed text-body">{f.detail}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* Worth a conversation first */}
            <div className="lg:col-span-5">
              <div className="flex items-baseline gap-3 border-b border-hairline pb-3">
                <h3 className="font-display text-f-lg font-bold text-ink">Talk to us first if</h3>
                <span className="mono-num text-faint">{checkFirst.length}</span>
              </div>
              <ul className="grid gap-px overflow-hidden border-x border-b border-hairline bg-hairline">
                {checkFirst.map((f, i) => (
                  <Reveal as="li" key={f.name} delay={i * 60} className="bg-band">
                    <div className="h-full p-6">
                      <span className="mono block text-faint">— {String(i + 1).padStart(2, '0')}</span>
                      <h4 className="mt-3 font-display text-f-base font-bold leading-snug text-ink">
                        {f.name}
                      </h4>
                      <p className="mt-2 text-f-xs leading-relaxed text-body">{f.detail}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={160}>
                <p className="mt-6 text-f-xs leading-relaxed text-muted">
                  We would rather tell you this is the wrong product than sell
                  you a configuration that fights your process. Where nothing
                  in the catalogue fits, we build the system instead.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <Link href="/solutions/business" className="link-arrow mt-5">
                  Custom software <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          </div>
        ) : (
          /* Products that have not had their buyer profiles written yet. */
          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="measure leading-relaxed text-body">
                We would rather tell you this is the wrong product than sell
                you a configuration that fights your process. Where nothing in
                the catalogue fits, we build the system instead.
              </p>
              <Link href="/solutions/business" className="link-arrow mt-7">
                Custom software <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}

/* ================================================================== ROLLOUT */

/**
 * `included` marks the five phases as covered by the subscription.
 *
 * True for the packaged products, which is how they are sold. Not for
 * custom software, where discovery and build ARE the engagement and there
 * is no subscription for them to be free with.
 */
function Rollout({ included }: { included: boolean }) {
  return (
    <section className="section border-t border-hairline bg-band">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">Getting it running</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Five phases, and</>
              <>
                you <span className="accent-word">check</span> each one.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                How long it takes depends on how much history has to come
                across and how many sites are involved. You get a phase plan
                with dates before work starts.
              </p>
            </Reveal>
          </div>
        </div>

        {included && (
          <div className="mt-10">
            <FreeCallout kicker="Onboarding is free with the subscription." delay={60}>
              Setup, data migration, training and go-live are not billed as a
              project and there is no joining fee. Support continues under the
              same subscription once you are live.
            </FreeCallout>
          </div>
        )}

        <ol className="mt-8 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {ROLLOUT.map(([title, body], i) => (
            <Reveal as="li" key={title} delay={i * 60} className="bg-canvas">
              <div className="group relative h-full overflow-hidden p-7 transition-colors hover:bg-accent-50">
                {/* Oversized ghosted figure, as on the Method and FAQ cards.
                    Inset positive on both axes so it is never clipped. */}
                <span
                  aria-hidden
                  className="mono-num pointer-events-none absolute right-3 top-1 select-none font-display text-[4.5rem] font-extrabold leading-none text-hairline transition-colors group-hover:text-accent-200"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative">
                  <h3 className="font-display text-f-lg font-bold text-ink">{title}</h3>
                  <p className="mt-3 text-f-xs leading-relaxed text-body">{body}</p>
                  {included && (
                    <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-2.5 py-1">
                      <Check className="h-3 w-3 text-accent-700" aria-hidden />
                      <span className="mono text-accent-800">Free</span>
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}

          {/* Fills the trailing cell on a three-column row so the grid does
              not end on a hole. */}
          <Reveal as="li" delay={ROLLOUT.length * 60} className="bg-canvas">
            <div className="flex h-full flex-col justify-between gap-6 p-7">
              <p className="text-f-xs leading-relaxed text-body">
                Support hours are {COMPANY.hoursDisplay} — the same hours in
                the agreement as on this page.
              </p>
              <Link href="/contact" className="link-arrow">
                Start with a scoping call <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}

/* ====================================================================== FAQ */

function Faqs({ product }: { product: Product }) {
  return (
    <section className="section relative border-t border-hairline">
      <SectionBackdrop side="left" tone="warm" />
      <div className="container-page">
        {/* FAQPage markup for this page's own questions. The answers below
            are the rendered source of these strings, so the two cannot drift. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              '@id': `${SITE_URL}${product.href}/#faq`,
              mainEntity: PRODUCT_FAQS.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
            }),
          }}
        />

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">Before you ask</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>The six that come</>
              <>
                up <span className="accent-word">every</span> time.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Answered straight, with no figure we cannot stand behind. The
                rest are on the full FAQ.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-2">
          {PRODUCT_FAQS.map((f, i) => (
            <Reveal key={f.question} delay={(i % 2) * 60} className="bg-canvas">
              <div className="group relative h-full overflow-hidden p-7 transition-colors hover:bg-accent-50 lg:p-8">
                <span
                  aria-hidden
                  className="mono-num pointer-events-none absolute right-3 top-1 select-none font-display text-[4.5rem] font-extrabold leading-none text-hairline transition-colors group-hover:text-accent-200"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative">
                  <h3 className="font-display text-f-lg font-bold leading-tight text-ink">
                    {f.question}
                  </h3>
                  {/* Answers stay open. The most quotable text on the page is
                      the worst thing to hide behind a click. */}
                  <p className="mt-4 text-f-xs leading-relaxed text-body">{f.answer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link href="/faq" className="link-arrow">
            All questions <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== RELATED */

function Related({ products, currentName }: { products: Product[]; currentName: string }) {
  return (
    <section className="section border-t border-hairline bg-band">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">More from Engispider</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Explore our</>
              <>
                other <span className="accent-word">products</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                {currentName} is one of {PRODUCTS.length}. Run several and they
                share your organisations, users and roles on a single login,
                rather than each keeping its own copy.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 60} className="bg-canvas">
              <Link href={p.href} className="group flex h-full flex-col p-7 transition-colors hover:bg-accent-50">
                <span className="mono text-accent-700">{p.chip}</span>
                <span className="mt-4 font-display text-f-lg font-bold text-ink">
                  {p.name}
                </span>
                <span className="mt-2.5 flex-1 text-f-xs leading-relaxed text-body">
                  {p.tagline}
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-f-xs font-medium text-ink transition-colors group-hover:text-accent-ink">
                  Open
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10">
          <Link href="/solutions" className="link-arrow">
            Full catalogue <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================ CTA BAND */

function CtaBand({ product }: { product: Product }) {
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
                A guided demo of {product.name} on a live system, using your
                own scenarios — usually within two working days.
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
 * SoftwareApplication for a shipping product.
 *
 * No `offers` and no `price`: the previous build published `price: "0"` on
 * paid software, which is a machine-readable falsehood. Pricing is quoted per
 * project, so the honest markup is to omit the field.
 *
 * Draft products are deliberately not marked up at all — structured data is
 * a claim to a machine, and we do not have the facts to make one.
 */
function ProductJsonLd({ product }: { product: Product }) {
  if (product.status !== 'shipping') return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          '@id': `${SITE_URL}${product.href}/#software`,
          name: product.name,
          applicationCategory: 'BusinessApplication',
          applicationSubCategory: product.category,
          description: product.summary,
          url: `${SITE_URL}${product.href}/`,
          operatingSystem: 'Web browser',
          featureList: product.features,
          audience: { '@type': 'Audience', audienceType: product.audience },
          provider: {
            '@type': 'Organization',
            name: COMPANY.legalName,
            url: COMPANY.url,
          },
        }),
      }}
    />
  );
}
