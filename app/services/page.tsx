import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionBackdrop from '@/components/SectionBackdrop';
import { Reveal, MaskText, CountUp } from '@/components/motion/Reveal';

import { COMPANY } from '@/data/company';
import { PRODUCTS } from '@/data/products';
import { SERVICES, TECH_STACK, PROCESS } from '@/data/services';

/**
 * Services.
 *
 * The products page answers "what do you sell". This answers "what if
 * none of it fits" — and the strongest thing it can say is that the
 * fourteen products in the catalogue are the portfolio. They were built
 * by the same people, on the same stack, and they are all running.
 *
 * Service copy, delivery stages and the stack all come from
 * data/services.ts, so this page cannot drift from /about or from the
 * custom-software product page, which quote the same source.
 */
export default function ServicesPage() {
  return (
    <>
      <Header />

      <main id="main">
        <PageHero
          marker="Services"
          title="When no product fits, we build it."
          lede="The same engineers who build our own products build yours — one stack, one set of conventions, no hand-off to a junior bench. Discovery through to support, with something you can check at the end of every stage."
          cta={{ href: '/contact', label: 'Start with a scoping call' }}
          secondary={{ href: '/solutions', label: 'See the products first' }}
          spec={[
            ['Engagement', 'Scoped and quoted before work starts'],
            ['Stack', 'Java 17 · Spring Boot · MySQL · React · Flutter'],
            ['Support', COMPANY.hoursDisplay],
          ]}
        />

        <Numbers />
        <What />
        <Method />
        <Proof />
        <Stack />
        <Cta />
      </main>

      <Footer />
    </>
  );
}

/* ================================================================= NUMBERS */

function Numbers() {
  return (
    <section className="border-y border-hairline bg-band">
      <div className="container-page">
        <dl className="grid gap-x-10 gap-y-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { count: SERVICES.length, label: 'service lines' },
            { count: PRODUCTS.length - 1, label: 'systems we built and run' },
            { count: PROCESS.length, label: 'stages, each with a deliverable' },
            { value: 'One stack', label: 'across every project' },
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

/* ==================================================================== WHAT */

/**
 * The six service lines as a specification table.
 *
 * Each row carries its deliverables, because "custom software
 * development" means nothing on its own — what a buyer wants to know is
 * what arrives, and when they can look at it.
 */
function What() {
  return (
    <section className="section relative">
      <SectionBackdrop side="right" tone="warm" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">What we do</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Six lines, and</>
              <>
                what each one <span className="accent-word">delivers</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                &ldquo;Custom software development&rdquo; tells you nothing. What
                matters is what arrives and when you get to look at it, so
                every line below lists its deliverables.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 border-t border-hairline">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i, 4) * 50}>
              <div className="grid gap-y-3 border-b border-hairline py-7 lg:grid-cols-12 lg:gap-x-8">
                <div className="lg:col-span-1">
                  <span className="mono text-faint">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-display text-f-lg font-bold text-ink lg:col-span-4">
                  {s.title}
                </h3>
                <p className="text-f-xs leading-relaxed text-body lg:col-span-4">
                  {s.description}
                </p>
                <ul className="space-y-1.5 lg:col-span-3">
                  {s.deliverables.slice(0, 3).map((d) => (
                    <li key={d} className="flex items-start gap-2 text-f-xs text-muted">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-accent-500" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== METHOD */

function Method() {
  return (
    <section className="section relative border-t border-hairline">
      <SectionBackdrop side="left" tone="cool" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">How it runs</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Nothing is a surprise</>
              <>
                at the <span className="accent-word">end</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                A build goes wrong when there is nothing to look at until it
                is finished. Each stage here ends with a thing you can hold,
                check and send back.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 60} className="bg-canvas">
              <div className="group relative h-full overflow-hidden p-7 transition-colors hover:bg-accent-50">
                <span
                  aria-hidden
                  className="mono-num pointer-events-none absolute right-3 top-1 select-none font-display text-[4.5rem] font-extrabold leading-none text-hairline transition-colors group-hover:text-accent-200"
                >
                  {s.step}
                </span>
                <div className="relative">
                  <h3 className="font-display text-f-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-3 text-f-xs leading-relaxed text-body">{s.description}</p>
                  <p className="mt-4 flex items-start gap-2 text-f-xs text-accent-ink">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" aria-hidden />
                    <span>{s.output}</span>
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal as="li" delay={PROCESS.length * 60} className="bg-canvas">
            <div className="flex h-full flex-col justify-between gap-6 p-7">
              <p className="text-f-xs leading-relaxed text-body">
                Ownership of bespoke code is agreed in the contract before
                work begins. Ask during scoping and we will put the terms in
                writing.
              </p>
              <Link href="/faq" className="link-arrow">
                Read the FAQ <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}

/* =================================================================== PROOF */

function Proof() {
  const proof = ['restro360', 'campus360', 'lims', 'site-manager', 'whatsapp', 'face-recognition']
    .map((slug) => PRODUCTS.find((p) => p.slug === slug)!)
    .filter(Boolean);

  return (
    <section className="section relative border-t border-hairline">
      <SectionBackdrop side="right" tone="mixed" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">The portfolio</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Our case studies</>
              <>
                are our <span className="accent-word">products</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                The usual proof for development work is a case study nobody
                can verify. Ours is the catalogue — systems we designed,
                built, and still run for paying customers.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {proof.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 60} className="bg-canvas">
              <Link
                href={p.href}
                className="group flex h-full flex-col p-7 transition-colors hover:bg-accent-50"
              >
                <span className="mono text-accent-700">{p.chip}</span>
                <span className="mt-4 font-display text-f-lg font-bold text-ink">{p.name}</span>
                <span className="mt-2.5 flex-1 text-f-xs leading-relaxed text-body">
                  {p.tagline}
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-f-xs font-medium text-ink transition-colors group-hover:text-accent-ink">
                  Open
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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

/* =================================================================== STACK */

function Stack() {
  return (
    <section className="section border-t border-hairline">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="marker mono">Stack</p>
            <MaskText as="h2" className="display mt-5 text-f-4xl">
              <>What we</>
              <>build on.</>
            </MaskText>
            <Reveal delay={140}>
              <p className="mt-6 text-f-xs leading-relaxed text-body">
                One stack across every product and every client project —
                which is why a handover inside this company takes an
                afternoon rather than a quarter.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {TECH_STACK.map((g, i) => (
              <Reveal key={g.group} delay={i * 60} className="bg-canvas">
                <div className="h-full p-6">
                  <h3 className="mono text-accent-700">{g.group}</h3>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {g.items.map((t) => (
                      <li key={t} className="mono-num text-f-xs text-body">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
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
              <>Tell us what breaks,</>
              <>and we’ll scope it.</>
            </MaskText>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={120}>
              <p className="text-[1.02rem] leading-relaxed text-ink/80">
                Discovery ends with a scope document and a fixed-price
                estimate — before anyone writes code.
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
