import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';

import { Reveal, MaskText } from '@/components/motion/Reveal';
import SectionBackdrop from '@/components/SectionBackdrop';
import { StatStrip, Capabilities, type CapabilityGroup } from '@/components/solutions/kit';
import { SERVICES, TECH_STACK, PROCESS } from '@/data/services';
import { PRODUCTS } from '@/data/products';

/**
 * Engispider Custom Software — the deep half of the product page.
 *
 * ── Why this one has no screens ──────────────────────────────────────────
 * Every other product page shows the software. This one cannot: the
 * software does not exist until someone commissions it, and drawing a
 * mockup of a system nobody has specified would be exactly the invented
 * promise the rest of this site was rebuilt to remove.
 *
 * So the evidence is different in kind. The proof that this company can
 * build a system to order is the thirteen it has already built and runs —
 * named, linked, and checkable — plus one stack used across all of them
 * and a process with a deliverable at the end of each stage. That is a
 * stronger argument than a picture of a dashboard would be.
 *
 * It is also the one product where onboarding is not free with a
 * subscription: discovery and build ARE the engagement. `ProductPage`
 * suppresses that callout for this slug.
 */

/** The catalogue is the portfolio — these are the deepest examples. */
const PROOF = ['restro360', 'campus360', 'lims', 'site-manager', 'whatsapp', 'face-recognition'];

const CAPABILITY_GROUPS: readonly CapabilityGroup[] = [
  {
    group: 'What we build',
    items: [
      ['Custom ERP', 'A system shaped to your process rather than the other way round.'],
      ['Internal tools', 'The line-of-business screens no packaged product covers.'],
      ['SaaS platforms', 'Multi-tenant from the first commit, with isolation enforced server-side.'],
      ['Mobile apps', 'Flutter on Android and iOS, against the same backend.'],
    ],
  },
  {
    group: 'Connecting what exists',
    items: [
      ['System integration', 'Your current software kept, and made to talk.'],
      ['Data migration', 'Records imported, validated and reconciled before cutover.'],
      ['Payments', 'Gateways wired in with automatic reconciliation.'],
      ['WhatsApp, SMS & email', 'Through our own messaging service, with retries and receipts.'],
    ],
  },
  {
    group: 'Running it',
    items: [
      ['Cloud architecture', 'Sized to your load, not to a brochure.'],
      ['Containerised deployment', 'Docker and Kubernetes, reproducible between environments.'],
      ['CI/CD', 'A release is a pipeline run, not an evening.'],
      ['Business intelligence', 'Dashboards built on the data the system already holds.'],
    ],
  },
] as const;

export default function BusinessSections() {
  const proof = PROOF.map((s) => PRODUCTS.find((p) => p.slug === s)!).filter(Boolean);

  return (
    <>
      <StatStrip
        stats={[
          { count: PRODUCTS.length - 1, label: 'systems we built and still run' },
          { value: 'One stack', label: 'across every one of them' },
          { count: PROCESS.length, label: 'stages, each with a deliverable' },
          { value: 'Your code', label: 'ownership agreed in writing' },
        ]}
      />

      <Proof products={proof} />
      <Stack />
      <Process />

      <Capabilities
        intro="Discovery, architecture, build, deployment and support — on the same stack our own products run on, which is why any engineer here can pick up any codebase."
        groups={CAPABILITY_GROUPS}
        cta="Tell us what you need built"
      />
    </>
  );
}

/* =================================================================== PROOF */

/**
 * The portfolio, which happens to be the catalogue.
 *
 * A bespoke-development page normally shows logos or a case-study carousel.
 * This company has something better and more checkable: the products it
 * sells are the ones it built, they are in production with paying
 * customers, and every one of them has a page a reader can go and read.
 */
function Proof({ products }: { products: typeof PRODUCTS }) {
  return (
    <section className="section relative">
      <SectionBackdrop side="right" tone="warm" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">The portfolio</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>We can show you</>
              <>
                <span className="accent-word">thirteen</span> of them.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                The usual proof for custom development is a case study you
                cannot verify. Ours is the rest of this catalogue — systems we
                designed, built, and still run for paying customers. Open any
                of them.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
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
    <section className="section relative border-t border-hairline">
      <SectionBackdrop side="left" tone="cool" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">The stack</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>One stack, so</>
              <>
                anyone can <span className="accent-word">pick it up</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Your system is built on exactly what our own products run on.
                That matters in year three, when the person who wrote it has
                moved on and someone else has to change it.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {TECH_STACK.map((g, i) => (
            <Reveal key={g.group} delay={(i % 3) * 60} className="bg-canvas">
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
    </section>
  );
}

/* ================================================================= PROCESS */

function Process() {
  return (
    <section className="section relative border-t border-hairline">
      <SectionBackdrop side="right" tone="mixed" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">How it runs</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Five stages. Each</>
              <>
                ends with <span className="accent-word">something</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                A custom build goes wrong when there is nothing to look at
                until the end. Every stage here finishes with a thing you can
                hold, check and reject.
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
                Ownership of bespoke code is set out in the contract before
                work begins. Ask during scoping and we will put the specific
                terms in writing.
              </p>
              <Link href="/services" className="link-arrow">
                Full service detail <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </ol>

        {/* The six service lines, named, so "custom software" is not the
            only thing on offer that anyone can picture. */}
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 3) * 60} className="bg-canvas">
              <div className="h-full p-6">
                <h3 className="font-display text-f-base font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-f-2xs leading-relaxed text-muted">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
