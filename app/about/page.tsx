import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionBackdrop from '@/components/SectionBackdrop';
import { Reveal, MaskText, CountUp } from '@/components/motion/Reveal';

import { COMPANY } from '@/data/company';
import { PRODUCTS } from '@/data/products';
import { CLIENTS } from '@/data/clients';
import { TECH_STACK, PROCESS } from '@/data/services';

/**
 * About.
 *
 * ── What was removed ─────────────────────────────────────────────────────
 * The previous page led with four statistics, none of which anyone had
 * measured: "1000+ Projects", "500+ Clients", "10+ Years", "99% Success".
 * The customers page lists fifteen organisations by name, so "500+
 * Clients" was contradicted by this site's own content two clicks away —
 * which is exactly the kind of thing that costs a buyer's trust the moment
 * they notice it.
 *
 * Everything on this page is now countable from data in the repository
 * (products, customers, stack, process) or printed on a certificate. The
 * numbers are derived rather than typed, so they cannot drift again.
 */
export default function AboutPage() {
  return (
    <>
      <Header />

      <main id="main">
        <PageHero
          marker="About Engispider"
          title="A software company you can check."
          lede={`${COMPANY.legalName} builds and runs business systems from ${COMPANY.address.locality}, ${COMPANY.address.region}. We sell our own products, we run them in production, and every claim on this site points at something you can go and look at.`}
          cta={{ href: '/contact', label: 'Talk to us' }}
          secondary={{ href: '/solutions', label: 'See the products' }}
          spec={[
            ['Based in', `${COMPANY.address.locality}, ${COMPANY.address.region}, ${COMPANY.address.countryName}`],
            ['Certification', `${COMPANY.certification.label} — independently audited`],
            ['Hours', COMPANY.hoursDisplay],
          ]}
        />

        <Numbers />
        <Position />
        <Method />
        <Stack />
        <Cta />
      </main>

      <Footer />
    </>
  );
}

/* ================================================================= NUMBERS */

/**
 * Four figures, each derived from data in this repository.
 *
 * Nothing here is typed in. The product count comes from the catalogue,
 * the customer count from the client list, the stage count from the
 * process — so the page cannot contradict the pages it links to.
 */
function Numbers() {
  return (
    <section className="border-y border-hairline bg-band">
      <div className="container-page">
        <dl className="grid gap-x-10 gap-y-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { count: PRODUCTS.length, label: 'products in production' },
            { count: CLIENTS.length, label: 'organisations served' },
            { value: 'One', label: 'stack across all of them' },
            { count: PROCESS.length, label: 'stages, each with a deliverable' },
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

/* ================================================================ POSITION */

function Position() {
  return (
    <section className="section relative">
      <SectionBackdrop side="right" tone="warm" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">What we are</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>A product company</>
              <>
                that also <span className="accent-word">builds</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Most agencies have never had to live with what they shipped.
                We run {PRODUCTS.length} of our own systems in production, with
                paying customers, which changes how you build.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-6 rounded-lg border border-accent-200 bg-accent-50 p-6">
                <Image
                  src={COMPANY.certification.badge}
                  alt={COMPANY.certification.label}
                  width={256}
                  height={256}
                  loading="lazy"
                  className="h-24 w-24 shrink-0"
                />
                <div>
                  <p className="mono text-accent-700">Certification</p>
                  <p className="mt-1.5 font-display text-f-xl font-extrabold text-ink">
                    {COMPANY.certification.label}
                  </p>
                  <p className="mt-1 text-f-xs leading-relaxed text-body">
                    Audited by an independent body, not self-declared.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="space-y-5">
              {[
                [
                  'We run what we sell',
                  'These are our own products, in production. When something breaks at nine on a Friday it is our problem too.',
                ],
                [
                  'One stack, deliberately',
                  'Java 17, Spring Boot, MySQL, React and Flutter across everything — so any engineer here can pick up any codebase, including yours.',
                ],
                [
                  'Local and reachable',
                  `${COMPANY.address.locality}-based. ${COMPANY.hoursDisplay}, on the phone, in your language — and on site when it matters.`,
                ],
                [
                  'No numbers we cannot show you',
                  `You will not find "500+ clients" here. The customer list is ${CLIENTS.length} names long and every one of them is on the site.`,
                ],
              ].map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 70} className="flex items-start gap-4">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-100">
                    <Check className="h-3.5 w-3.5 text-accent-700" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-f-base font-bold text-ink">{t}</span>
                    <span className="mt-1.5 block text-f-xs leading-relaxed text-body">{d}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
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
            <p className="marker mono">How we work</p>
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
                A project goes wrong when there is nothing to look at until the
                end. Every stage here finishes with a thing you can hold,
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
                Support hours are {COMPANY.hoursDisplay} — the same hours in
                the agreement as on this page.
              </p>
              <Link href="/services" className="link-arrow">
                Full service detail <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}

/* =================================================================== STACK */

function Stack() {
  return (
    <section className="section relative border-t border-hairline">
      <SectionBackdrop side="right" tone="mixed" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">The stack</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>What everything</>
              <>
                here is <span className="accent-word">built on</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                One stack across every product and every client project. It is
                the reason a handover inside this company takes an afternoon
                rather than a quarter.
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

/* ===================================================================== CTA */

function Cta() {
  return (
    <section className="bg-accent-500">
      <div className="container-page">
        <div className="grid items-center gap-8 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <MaskText as="h2" className="display text-f-6xl text-ink">
              <>Come and check</>
              <>any of it.</>
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
