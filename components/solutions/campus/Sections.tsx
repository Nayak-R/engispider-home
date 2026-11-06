import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone,
  Globe,
  Monitor,
  X,
} from 'lucide-react';

import SectionBackdrop from '@/components/SectionBackdrop';
import { Reveal, MaskText } from '@/components/motion/Reveal';
import { FreeCallout } from '@/components/solutions/FreeTag';
import { BrowserFrame, PhoneFrame } from '@/components/mock/Chrome';
import { CampusDashboardMock, OnlinePayMock, PhonePortalMock } from '@/components/academic/Mockups';
import ProductExplorer from '@/components/solutions/campus/ProductExplorer';
import DemoForm from '@/components/solutions/campus/DemoForm';
import DemoCta from '@/components/solutions/campus/DemoCta';

import { COMPANY } from '@/data/company';
import { CLIENTS } from '@/data/clients';
import {
  PROBLEMS,
  MONEY_TRAIL,
  MONEY_CONTROLS,
  MONEY_LIMIT,
  INSTITUTION_TYPES,
  INSTITUTION_LIMIT,
  IMPLEMENTATION,
  IMPLEMENTATION_LIMIT,
  COMPARISON,
  COMPARISON_LIMIT,
  CAMPUS_FAQS,
} from '@/components/solutions/campus/content';

/**
 * Engispider Campus — the education landing page.
 *
 * ── Why this page left the shared template ───────────────────────────────
 * Every other product renders through `components/solutions/ProductPage`,
 * and should keep doing so. Education is the one route where the shared
 * shell was costing more than it saved: the template opens on the product
 * NAME set at display size, which tells a principal nothing, and it has no
 * place for the three things that actually decide this sale — what the
 * software looks like, what happens to the money, and who answers the phone
 * afterwards. So this one product gets a page built around the decision,
 * and the other thirteen keep the template unchanged.
 *
 * Everything shared is still shared: Header, Footer, the reveal primitives,
 * the mock chrome, the Campus screens, the free-with-subscription callout,
 * COMPANY, CLIENTS. Nothing was forked to get a different layout.
 *
 * ── The order, and why ───────────────────────────────────────────────────
 *   1  Hero — the claim, the dashboard, one call to action
 *   2  Evidence — only what can be pointed at
 *   3  Problem → outcome, each with the limit of the claim stated
 *   4  The product itself, eight modules, real screens
 *   5  The money trail, which is the differentiator
 *   6  Which kind of institution you are
 *   7  What families get
 *   8  Moving off your current process
 *   9  Who you are actually buying from
 *  10  An honest comparison with registers and spreadsheets
 *  11  The ten questions buyers ask
 *  12  The form
 *
 * ── On claims ────────────────────────────────────────────────────────────
 * Every sentence of selling copy on this page lives in
 * `components/solutions/campus/content.ts`, with a note at the top of that
 * file listing what is deliberately absent and why. Nothing is asserted
 * here that is not asserted there, in data/, or on a screen we can show.
 */

/** Named customers in education. CLIENTS is the permissioned subset. */
const EDU_CLIENTS = CLIENTS.filter((c) => c.sector === 'education');

export default function CampusPage() {
  return (
    <>
      <Hero />
      <Evidence />
      <Problems />
      <Explorer />
      <MoneyTrail />
      <Institutions />
      <Families />
      <Implementation />
      <LocalSupport />
      <Comparison />
      <Questions />
      <Conversion />
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
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 60% at 50% 0%, #000 25%, transparent 80%)',
          }}
        />
        <div
          className="absolute -top-52 right-0 h-[620px] w-[620px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(251,124,31,0.18), transparent 70%)' }}
        />
      </div>

      <div className="container-page pt-28 md:pt-32">
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
            <li className="text-ink">Engispider Campus</li>
          </ol>
        </nav>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Text first in source order, so a phone gets the claim and the
              button before it gets the screenshot. */}
          <div className="lg:col-span-6">
            <p className="marker mono">School &amp; college ERP · Engispider Campus</p>

            {/* LCP element. MaskText hides only the inner spans, so the h1
                itself paints on the first frame and crawlers read it whole. */}
            <MaskText as="h1" className="display mt-5 text-f-6xl" step={80}>
              <>Run your institution.</>
              <>
                Not a stack of <span className="accent-word">registers</span>.
              </>
            </MaskText>

            <Reveal delay={300}>
              <p className="mt-6 max-w-xl leading-relaxed text-body">
                Manage admissions, fee collection, accounting, attendance,
                examinations, hostel, transport and more from one connected
                platform — with clearer financial visibility for management,
                and dues, receipts and results on a phone for parents.
              </p>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-8 flex flex-wrap gap-3">
                <DemoCta location="hero" className="btn btn-primary">
                  Book a free demo <ArrowRight className="h-4 w-4" aria-hidden />
                </DemoCta>
                <a href="#features" className="btn btn-line">
                  Explore features
                </a>
              </div>
            </Reveal>

            <Reveal delay={520}>
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                {[
                  'Guided demo on a live system',
                  'Implementation and training included',
                  'Data migration from Excel or CSV',
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-f-2xs text-muted">
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent-600" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal direction="scale" delay={140} className="min-w-0 lg:col-span-6">
            <BrowserFrame label="Engispider Campus · Dashboard">
              <CampusDashboardMock />
            </BrowserFrame>
            <p className="mono mt-4 text-faint">
              Illustrative demo-tenant data · not any institution&rsquo;s figures
            </p>
          </Reveal>
        </div>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-3">
          {[
            ['Status', 'In production with customers'],
            ['Included with the subscription', 'Setup, migration, training, parent app and portal'],
            ['Based in', `${COMPANY.address.locality}, ${COMPANY.address.region} — demo usually within two working days`],
          ].map(([term, value], i) => (
            <Reveal key={term} delay={620 + i * 80} className="bg-canvas">
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

/* ================================================================= EVIDENCE */

/**
 * The proof band.
 *
 * Short on purpose. There are no testimonials, no student counts and no
 * "98% collection improvement" here because nobody at the company can point
 * at the arithmetic behind figures like those — and a buyer who checks one
 * unverifiable claim stops believing the verifiable ones next to it.
 *
 * The two numbers that do appear are stated together, which is the rule in
 * data/company.ts: 150+ organisations served, 15 of them named. Printed
 * apart they read as a contradiction.
 */
function Evidence() {
  return (
    <section id="evidence" className="scroll-mt-24 border-y border-hairline bg-band">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="marker mono">What we can show you</p>
            <h2 className="font-display mt-5 text-f-2xl font-bold leading-tight text-ink">
              Evidence, not adjectives.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-body">
              Engispider Infotech is an {COMPANY.certification.label} software company in{' '}
              {COMPANY.address.locality}, {COMPANY.address.region}. We have served{' '}
              {COMPANY.organisations.servedDisplay} organisations; {CLIENTS.length} of them are
              named on our customers page — the rest under agreements that do not permit it.
            </p>

            <dl className="mt-7 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2">
              {[
                [COMPANY.certification.label, 'Independently audited against an international standard'],
                ['Bhubaneswar, Odisha', 'A real office, two published phone numbers, named contacts'],
                /*
                 * Worded to match data/faqs.ts exactly: records are scoped to
                 * an organisation identifier taken from the session and
                 * enforced server-side on every query. An earlier draft of
                 * this cell said "its own instance, not a shared table",
                 * which is the DEDICATED deployment the FAQ offers on
                 * request — not what every customer gets by default.
                 */
                ['Your records, scoped to you', 'Every query is scoped to your organisation and enforced on the server'],
                ['Support hours', COMPANY.hoursDisplay],
              ].map(([term, value]) => (
                <div key={term} className="bg-canvas p-5">
                  <dt className="font-display text-f-xs font-bold text-ink">{term}</dt>
                  <dd className="mt-1.5 text-f-2xs leading-relaxed text-muted">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-3">
              <h3 className="mono text-faint">
                Educational institutions we are permitted to name
              </h3>
              <span className="mono-num text-faint">{EDU_CLIENTS.length}</span>
            </div>

            <ul className="grid grid-cols-2 gap-px overflow-hidden border-x border-b border-hairline bg-hairline sm:grid-cols-3">
              {EDU_CLIENTS.map((c) => (
                <li key={c.slug} className="flex flex-col bg-canvas p-5">
                  <span className="flex h-16 items-center justify-center">
                    {c.logo ? (
                      <Image
                        src={c.logo}
                        alt={`${c.name} logo`}
                        width={c.width ?? 200}
                        height={c.height ?? 200}
                        loading="lazy"
                        className="max-h-16 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-center font-display text-f-xs font-bold leading-tight text-ink">
                        {c.wordmark?.title ?? c.name}
                      </span>
                    )}
                  </span>
                  <span className="mt-4 text-f-2xs leading-snug text-muted">{c.name}</span>
                </li>
              ))}

              {/* The grid is three across and there are five logos. Rather
                  than leave a hole, the sixth cell says the one true thing
                  about why the list is short. */}
              <li className="flex flex-col justify-center bg-band p-5">
                <span className="text-f-2xs leading-relaxed text-muted">
                  …and others we are not permitted to name.
                </span>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-sm text-f-2xs leading-relaxed text-muted">
                Logos are shown with the organisation&rsquo;s mark as supplied. We do not publish
                testimonials or student numbers we cannot evidence.
              </p>
              <Link href="/customers" className="link-arrow text-f-xs">
                All customers <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-hairline pt-8">
            <Image
              src={COMPANY.certification.badge}
              alt=""
              width={256}
              height={256}
              className="h-14 w-14 shrink-0"
            />
            <p className="max-w-2xl text-f-xs leading-relaxed text-body">
              <span className="font-semibold text-ink">{COMPANY.certification.description}</span>{' '}
              It is the one externally issued credential we hold, so it is the one we put in front
              of you — rather than a wall of badges.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================= PROBLEMS */

function Problems() {
  return (
    <section id="outcomes" className="section relative scroll-mt-24">
      <SectionBackdrop side="right" tone="cool" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">What changes</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Less manual follow-up.</>
              <>
                More <span className="accent-word">control</span> over your institution.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Four things that take up an office&rsquo;s week. For each one, what the system
                actually does — and where its usefulness stops, because a page that only lists
                benefits is not telling you how it will go.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline lg:grid-cols-2">
          {PROBLEMS.map((p, i) => (
            <Reveal as="li" key={p.tag} delay={(i % 2) * 70} className="bg-canvas">
              <div className="flex h-full flex-col p-7 lg:p-9">
                <p className="mono text-accent-700">
                  {String(i + 1).padStart(2, '0')} · {p.tag}
                </p>

                <p className="mt-5 flex gap-3 text-f-xs leading-relaxed text-muted">
                  <X className="mt-1 h-3.5 w-3.5 shrink-0 text-faint" aria-hidden />
                  <span>{p.problem}</span>
                </p>

                <p className="mt-5 flex gap-3 border-l-2 border-accent-500 pl-4 text-f-base leading-relaxed text-ink">
                  {p.outcome}
                </p>

                <p className="mt-auto pt-6 text-f-2xs leading-relaxed text-muted">
                  <span className="mono text-faint">Where it stops — </span>
                  {p.limit}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================================================================= EXPLORER */

function Explorer() {
  return (
    <section id="features" className="section scroll-mt-24 border-t border-hairline bg-band">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">The product</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Eight modules.</>
              <>
                The actual <span className="accent-word">screens</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                This is what your office logs into. Move through the modules and you are looking
                at the same layouts, columns and controls an administrator works in — not an
                illustration of them.
              </p>
            </Reveal>
          </div>
        </div>

        <ProductExplorer />
      </div>
    </section>
  );
}

/* =============================================================== MONEY TRAIL */

function MoneyTrail() {
  return (
    <section id="financial-control" className="section relative scroll-mt-24 border-t border-hairline">
      <SectionBackdrop side="left" tone="warm" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">Financial control</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Every collection accounted for.</>
              <>
                Every approval <span className="accent-word">traceable</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Money is collected by one set of people, recorded by another, and answered for by
                a third — often months later. This is the path a single fee payment takes, and
                which parts of it a person still has to perform.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ------------------------------------------- the five-step trail */}
        <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline lg:grid-cols-5">
          {MONEY_TRAIL.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 70} className="bg-canvas">
              <div className="relative flex h-full flex-col p-6">
                {/* The connector. Horizontal between columns at lg, and a
                    short vertical tick between stacked rows below it. */}
                <span
                  aria-hidden
                  className="absolute -left-px top-0 h-0.5 w-full bg-accent-500/30 lg:left-0 lg:top-0"
                />
                <span className="mono-num text-f-lg font-bold text-accent-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display mt-3 text-f-base font-bold leading-snug text-ink">
                  {s.step}
                </h3>
                <p
                  className={`mono mt-2 inline-flex w-fit rounded-sm px-2 py-1 ${
                    s.actor === 'Staff action'
                      ? 'bg-amber-50 text-amber-800'
                      : s.actor === 'On demand'
                        ? 'bg-well text-muted'
                        : 'bg-emerald-50 text-emerald-800'
                  }`}
                >
                  {s.actor}
                </p>
                <p className="mt-4 text-f-2xs leading-relaxed text-body">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* --------------------------------- controls, with the screen beside */}
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <h3 className="font-display text-f-xl font-bold text-ink">
              What the system does, and what still needs a person
            </h3>
            <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
              {MONEY_CONTROLS.map((c) => (
                <li key={c.name} className="flex items-center justify-between gap-5 py-3">
                  <span className="text-f-xs leading-snug text-ink">{c.name}</span>
                  <span
                    className={`mono shrink-0 rounded-sm px-2 py-1 ${
                      c.how === 'Automatic'
                        ? 'bg-emerald-50 text-emerald-800'
                        : c.how === 'Needs a person'
                          ? 'bg-amber-50 text-amber-800'
                          : 'bg-well text-muted'
                    }`}
                  >
                    {c.how}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-f-2xs leading-relaxed text-muted">{MONEY_LIMIT}</p>

            <DemoCta location="money-trail" className="btn btn-primary mt-7">
              Walk the trail with your own fee structure{' '}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </DemoCta>
          </div>

          <Reveal direction="scale" delay={120} className="min-w-0 lg:col-span-6">
            <BrowserFrame label="Online payments · bank reconciliation">
              <OnlinePayMock />
            </BrowserFrame>
            <p className="mono mt-4 text-faint">
              Illustrative demo-tenant data · not any institution&rsquo;s figures
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================= INSTITUTIONS */

function Institutions() {
  return (
    <section id="institutions" className="section scroll-mt-24 border-t border-hairline bg-band">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">Who it is for</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Built for the way</>
              <>
                your institution <span className="accent-word">operates</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                The same platform, but the workflows that matter are not the same for a school
                and for a four-college trust. Find the one that describes you — and if none of
                them do, say so and we will tell you honestly whether this fits.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-2 xl:grid-cols-3">
          {INSTITUTION_TYPES.map((t, i) => (
            <Reveal as="li" key={t.id} delay={(i % 3) * 70} className="bg-canvas">
              <div className="group flex h-full flex-col p-7 transition-colors hover:bg-accent-50">
                <h3 className="font-display text-f-lg font-bold leading-snug text-ink">
                  {t.name}
                </h3>
                <p className="mt-2.5 text-f-xs leading-relaxed text-body">{t.who}</p>
                <ul className="mt-5 space-y-2 border-t border-hairline pt-5">
                  {t.workflows.map((w) => (
                    <li key={w} className="flex items-start gap-2.5">
                      <Check className="mt-1 h-3 w-3 shrink-0 text-accent-500" aria-hidden />
                      <span className="text-f-2xs leading-relaxed text-body">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          {/* Sixth cell, so the three-column row does not end on a hole —
              and the one honest thing a page of five flattering cards owes
              a reader. */}
          <Reveal as="li" delay={210} className="bg-canvas">
            <div className="flex h-full flex-col justify-between gap-6 p-7">
              <div>
                <h3 className="font-display text-f-lg font-bold leading-snug text-ink">
                  None of these?
                </h3>
                <p className="mt-2.5 text-f-xs leading-relaxed text-body">
                  Engispider Campus is built around the fee ledger and the accounts under it. If
                  you want one module on its own, or your process genuinely differs, we would
                  rather build you the right system than configure the wrong one.
                </p>
              </div>
              <Link href="/solutions/business" className="link-arrow text-f-xs">
                Custom software <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </ul>

        <Reveal delay={100}>
          <p className="measure mt-8 text-f-2xs leading-relaxed text-muted">
            {INSTITUTION_LIMIT}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================= FAMILIES */

function Families() {
  return (
    <section id="families" className="section relative scroll-mt-24 border-t border-hairline">
      <SectionBackdrop side="right" tone="mixed" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">Parents &amp; students</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>A better experience for families.</>
              <>
                A more organised <span className="accent-word">office</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Most of what a parent comes to the office for is a lookup. Give them the lookup
                and the queue on a fee deadline largely stops forming.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal direction="scale" className="flex justify-center lg:col-span-5">
            <PhoneFrame label="Parent portal · Android and web">
              <PhonePortalMock />
            </PhoneFrame>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2">
              {[
                ['See exactly what is due', 'Fee dues by head, with the student’s own payment history.'],
                ['Pay online', 'Where your institution has enabled a payment gateway. The receipt is generated immediately.'],
                ['Download any receipt', 'Without a trip to the office for a duplicate.'],
                ['Attendance and results', 'Attendance as recorded, and results once the institution declares them.'],
                ['Apply for leave', 'A leave request that reaches the right person, with the approval recorded.'],
                ['Notices', 'Messages to one class or the whole institution, with read-acknowledgement.'],
              ].map(([t, d]) => (
                <li key={t} className="bg-canvas p-6">
                  <h3 className="font-display text-f-base font-bold leading-snug text-ink">{t}</h3>
                  <p className="mt-2 text-f-2xs leading-relaxed text-body">{d}</p>
                </li>
              ))}
            </ul>

            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                [Monitor, 'Web app', 'Office & accounts'],
                [Smartphone, 'Android app', 'Students & parents'],
                [Globe, 'Web portal', 'Any browser'],
              ].map(([Icon, name, who]) => {
                const I = Icon as typeof Monitor;
                return (
                  <li key={name as string} className="rounded-lg border border-hairline p-4">
                    <I className="h-4 w-4 text-accent-600" aria-hidden />
                    <p className="mt-3 font-display text-f-xs font-bold text-ink">
                      {name as string}
                    </p>
                    <p className="mono mt-1 text-faint">{who as string}</p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 rounded-lg border border-accent-200 bg-accent-50 p-5">
              <p className="text-f-xs leading-relaxed text-body">
                <span className="font-semibold text-ink">
                  The app and the portal are included with the subscription.
                </span>{' '}
                Every family at the institution gets access — no per-student charge, no
                per-device licence, and no limit on how many parents use them.
              </p>
            </div>

            <p className="mt-5 text-f-2xs leading-relaxed text-muted">
              Notices go out inside Campus. Sending the same message over WhatsApp or SMS runs
              through{' '}
              <Link href="/solutions/whatsapp" className="font-medium text-accent-ink underline">
                our separate messaging product
              </Link>
              , which is a different subscription — ask about it in the demo rather than assuming
              it is bundled.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================== IMPLEMENTATION */

function Implementation() {
  return (
    <section id="implementation" className="section scroll-mt-24 border-t border-hairline bg-band">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">Getting there from here</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Move to a better system</>
              <>
                without <span className="accent-word">guesswork</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                The real question is not whether the software is good. It is whether your
                existing records arrive intact and your office can use it by the next fee
                deadline. Four phases, and you sign off each one.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-10">
          <FreeCallout kicker="Onboarding is free with the subscription." delay={60}>
            Setup, data migration, training and go-live are not billed as a project and there is
            no joining fee. Support continues under the same subscription once you are live.
          </FreeCallout>
        </div>

        <ol className="mt-8 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-2 xl:grid-cols-4">
          {IMPLEMENTATION.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 70} className="bg-canvas">
              <div className="group relative h-full overflow-hidden p-7 transition-colors hover:bg-accent-50">
                <span
                  aria-hidden
                  className="mono-num pointer-events-none absolute right-3 top-1 select-none font-display text-[4.5rem] font-extrabold leading-none text-hairline transition-colors group-hover:text-accent-200"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative">
                  <h3 className="font-display text-f-lg font-bold leading-snug text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-f-xs leading-relaxed text-body">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={100}>
          <p className="measure mt-8 text-f-2xs leading-relaxed text-muted">
            {IMPLEMENTATION_LIMIT}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================ LOCAL SUPPORT */

function LocalSupport() {
  return (
    <section id="support" className="section relative scroll-mt-24 border-t border-hairline">
      <SectionBackdrop side="left" tone="cool" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">Who you are buying from</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Software is half the decision.</>
              <>
                <span className="accent-word">Support</span> is the other half.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                An ERP you cannot get help with in March is worse than the register it replaced.
                Here is where we are, who answers, when, and what happens after you have paid.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-lg border border-hairline">
              {[
                {
                  Icon: Phone,
                  label: 'Sales',
                  value: COMPANY.contact.sales.display,
                  href: `tel:${COMPANY.contact.sales.tel}`,
                },
                {
                  Icon: Phone,
                  label: 'Support',
                  value: COMPANY.contact.support.display,
                  href: `tel:${COMPANY.contact.support.tel}`,
                },
                {
                  Icon: Mail,
                  label: 'Support email',
                  value: COMPANY.contact.supportEmail,
                  href: `mailto:${COMPANY.contact.supportEmail}`,
                },
                {
                  Icon: MapPin,
                  label: 'Office',
                  value: `${COMPANY.address.locality}, ${COMPANY.address.region} ${COMPANY.address.postalCode}`,
                },
                { Icon: Clock, label: 'Hours', value: COMPANY.hoursDisplay },
                {
                  Icon: ShieldCheck,
                  label: 'Credential',
                  value: `${COMPANY.certification.label} — independently audited`,
                },
              ].map(({ Icon, label, value, href }, i, arr) => {
                const inner = (
                  <span className="flex items-start gap-4">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden />
                    <span className="min-w-0">
                      <span className="mono block text-faint">{label}</span>
                      <span className="mono-num mt-1 block break-words text-f-xs text-ink">
                        {value}
                      </span>
                    </span>
                  </span>
                );
                const cls = `block p-5 ${i === arr.length - 1 ? '' : 'border-b border-hairline'}`;
                return href ? (
                  <a key={label} href={href} className={`${cls} transition-colors hover:bg-accent-50`}>
                    {inner}
                  </a>
                ) : (
                  <div key={label} className={cls}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2">
              {[
                [
                  'How a demo is arranged',
                  'You send the form below or call. We reply — usually within one working day — and run a guided session on a live system, usually within two working days.',
                ],
                [
                  'How implementation runs',
                  'Scope with dates, configuration, migration with an error report you check, training on your own data, then cutover with us on hand.',
                ],
                [
                  'How support requests are handled',
                  `Call the support number or write to ${COMPANY.contact.supportEmail} during support hours. The agreement sets response times and names a contact; it covers fixes, updates and enhancements.`,
                ],
                [
                  'Languages',
                  'Demos, training and support conversations in English, Hindi or Odia. The application interface itself is in English.',
                ],
              ].map(([t, d]) => (
                <li key={t} className="bg-canvas p-6">
                  <h3 className="font-display text-f-base font-bold leading-snug text-ink">{t}</h3>
                  <p className="mt-2.5 text-f-2xs leading-relaxed text-body">{d}</p>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-f-2xs leading-relaxed text-muted">
              What we are not claiming: we do not run 24/7 support, and we do not have offices
              across East India. We work with institutions anywhere in the country and deliver
              remotely, with on-site visits for installation, migration and training where a
              project needs them — agreed in writing before you sign, not implied on a web page.
            </p>

            <Link href="/about" className="link-arrow mt-6 text-f-xs">
              About Engispider Infotech <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================== COMPARISON */

function Comparison() {
  return (
    <section id="comparison" className="section scroll-mt-24 border-t border-hairline bg-band">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">An honest comparison</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Is your current system</>
              <>
                giving you enough <span className="accent-word">control</span>?
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Seven things an office does every month, and what each one costs when the records
                are kept in registers and workbooks rather than in one system.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={80}>
          {/* The table is wider than a phone. It scrolls inside its own box —
              the page never does — but a reader has to be told that, or the
              third column simply does not exist for them. */}
          <p className="mono mt-14 text-faint lg:hidden" aria-hidden>
            Swipe the table sideways →
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-hairline bg-canvas lg:mt-14">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">
                Common office tasks compared between registers and spreadsheets, and Engispider
                Campus
              </caption>
              <thead>
                <tr className="border-b border-hairline bg-well">
                  <th scope="col" className="mono px-6 py-4 text-faint">
                    The task
                  </th>
                  <th scope="col" className="mono px-6 py-4 text-faint">
                    Registers &amp; spreadsheets
                  </th>
                  <th scope="col" className="mono px-6 py-4 text-accent-700">
                    Engispider Campus
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.task} className="border-b border-hairline last:border-0">
                    <th
                      scope="row"
                      className="w-[18%] px-6 py-5 align-top font-display text-f-xs font-bold text-ink"
                    >
                      {row.task}
                    </th>
                    <td className="w-[41%] px-6 py-5 align-top">
                      <span className="flex gap-2.5">
                        <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-faint" aria-hidden />
                        <span className="text-f-2xs leading-relaxed text-muted">{row.before}</span>
                      </span>
                    </td>
                    <td className="w-[41%] px-6 py-5 align-top">
                      <span className="flex gap-2.5">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-600" aria-hidden />
                        <span className="text-f-2xs leading-relaxed text-ink">{row.after}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="measure mt-7 text-f-2xs leading-relaxed text-muted">{COMPARISON_LIMIT}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================ QUESTIONS */

function Questions() {
  return (
    <section id="faq" className="section relative scroll-mt-24 border-t border-hairline">
      <SectionBackdrop side="right" tone="warm" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">Before you ask</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>The ten questions</>
              <>
                institutions <span className="accent-word">always</span> ask.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Answered in full and left open — the most useful text on this page is the worst
                thing to hide behind a click.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-2">
          {CAMPUS_FAQS.map((f, i) => (
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
                  <p className="mt-4 text-f-xs leading-relaxed text-body">{f.answer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link href="/faq" className="link-arrow">
            Questions about the company <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================== CONVERSION */

function Conversion() {
  return (
    <section
      id="demo"
      /* Focus target for DemoCta, and for a fragment arriving from another
         page. -1 so it is programmatically focusable without entering the
         tab order. */
      tabIndex={-1}
      className="section scroll-mt-24 border-t border-hairline bg-band focus:outline-none"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="marker mono">Book a free demo</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>See how it would work</>
              <>
                for <span className="accent-word">your</span> institution.
              </>
            </MaskText>

            <Reveal delay={120}>
              <p className="mt-6 leading-relaxed text-body">
                Bring your current fee structure, your academic workflow, or the report you
                struggle to produce every month. We will walk you through the parts of the live
                product that deal with it — and tell you plainly where it would not help.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ul className="mt-8 space-y-3 border-t border-hairline pt-7">
                {[
                  'A guided session on a live system, not a slide deck.',
                  'We reply usually within one working day; the demo is usually within two.',
                  'No obligation, no quotation until you ask for one, and no sales sequence afterwards.',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-600" aria-hidden />
                    <span className="text-f-xs leading-relaxed text-body">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`tel:${COMPANY.contact.sales.tel}`} className="btn btn-line">
                  <Phone className="h-4 w-4" aria-hidden /> Talk to our team
                </a>
                <Link href="/contact" className="btn btn-line">
                  Other ways to reach us
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <DemoForm />
          </div>
        </div>
      </div>
    </section>
  );
}
