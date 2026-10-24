import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import Header from '@/components/Header';
import SectionBackdrop from '@/components/SectionBackdrop';
import Footer from '@/components/Footer';
import LiveConsole from '@/components/home/LiveConsole';
import CustomerScroll from '@/components/home/CustomerScroll';
import IndustryScroll from '@/components/home/IndustryScroll';
import Walkthrough from '@/components/home/Walkthrough';
import ProductIndex from '@/components/home/ProductIndex';
import Services from '@/components/home/Services';
import Faq from '@/components/home/Faq';
import MethodScroll from '@/components/home/MethodScroll';
import { Reveal, MaskText, MaskWords, MaskLine } from '@/components/motion/Reveal';

import { COMPANY } from '@/data/company';
import { PRODUCT_COUNT, PRODUCT_COUNT_WORD_CAP } from '@/data/products';
import { TECH_STACK } from '@/data/services';

/**
 * Home.
 *
 * A server component — no state anywhere, so the page renders to static HTML
 * and the only client JS is the header menu and the reveal observer. The
 * original was a single 1,177-line `'use client'` file, which is what put
 * ~1.5MB of JS in front of the Largest Contentful Paint.
 *
 * The organising principle is comprehension speed: a visitor should know what
 * this company builds, and for whom, before they scroll twice. That is why
 * real product screens appear above the fold and again, per industry,
 * immediately after — ahead of any company narrative.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <CustomerScroll />
        <IndustryScroll />
        <Walkthrough />
        <ProductIndex />
        <Credibility />
        <Services />
        <MethodScroll />
        <Stack />
        <Faq />
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
          style={{ background: 'radial-gradient(circle, rgba(251,124,31,0.22), transparent 70%)' }}
        />
      </div>

      <div className="container-page pt-28 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            {/* LCP element. The mask animation runs on an inner span, so the
                <h1> itself is never hidden and paints on the first frame. */}
            {/* The LCP element. Each word masks up on its own beat, then
                the serif line follows as the turn. The <h1> itself is never
                hidden — only the inner spans move — so it still paints on
                the first frame. */}
            <h1 className="display text-f-7xl">
              <MaskWords className="block" step={75}>
                From the first entry
              </MaskWords>{' '}
              <MaskLine className="display-serif" delay={360}>
                to the final ledger.
              </MaskLine>
            </h1>

            <Reveal delay={620}>
              <p className="mt-7 max-w-xl text-f-lg leading-relaxed text-body">
                Billing, stock, fees, payroll and accounts — reconciled to
                the rupee. {PRODUCT_COUNT_WORD_CAP} systems in production
                across campuses, laboratories, retail, pharmacies, clinics and
                kitchens, plus custom software when none of them fit.
              </p>

            </Reveal>

            {/* Buttons arrive after the sentence they answer to, not with it. */}
            <Reveal delay={740}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Book a demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/solutions" className="btn btn-line">
                  See all products
                </Link>
              </div>

            </Reveal>
          </div>

          {/* A self-playing walkthrough rather than one static screen.
              Cycles four products with a pointer tracing real targets, so
              the hero shows the software being used instead of posed. The
              first screen still renders server-side, so the LCP area is
              unchanged. */}
          <Reveal direction="scale" delay={140} className="lg:col-span-6">
            <LiveConsole />
          </Reveal>
        </div>

        {/*
          Credentials run full width beneath the hero rather than inside the
          text column: four items will not sit on one line in half a grid,
          and a wrapped trust row reads as clutter. Below the headline, not
          above it — a badge pinned over the <h1> is the most recognisable
          tell of a generated page, and it delays the line people came for.
        */}
        <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 border-t border-hairline pt-8 md:gap-x-16">
          {/* The certificate sits as its own column beside its wording,
              rather than inline above a centred caption — at badge size
              the caption ended up offset from the figures' baseline and
              the whole item read as misaligned. */}
          <Reveal as="li" delay={860} className="flex items-center gap-3.5 text-left">
              <Image
                src="/images/iso-9001-2015.webp"
                /* Decorative: "ISO certified" is immediately beside it, so
                   alt text would have a screen reader say it twice. */
                alt=""
                width={256}
                height={256}
                priority
                className="h-14 w-14 shrink-0"
              />
              <span>
                <span className="block font-display text-f-xl font-extrabold leading-none text-ink">
                  ISO certified
                </span>
                <span className="mono mt-2 block text-faint">Independently audited</span>
              </span>
          </Reveal>

          {[
            { value: `${PRODUCT_COUNT}+`, label: 'products in production' },
            { value: COMPANY.organisations.servedDisplay, label: 'organisations served' },
            { value: '1 Lakh+', label: 'satisfied users' },
          ].map((item, i) => (
            <Reveal
              as="li"
              key={item.label}
              delay={940 + i * 90}
              className="relative text-center"
            >
                {/* Dividers are absolutely positioned so they sit between
                    items without becoming flex children — as children they
                    would join the centring calculation and skew it. */}
                <span
                  aria-hidden
                  className="absolute -left-6 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-hairline md:-left-8 md:block"
                />
                <span className="block font-display text-f-xl font-extrabold leading-none text-ink">
                  {item.value}
                </span>
                <span className="mono mt-2 block text-faint">{item.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ============================================================== CREDIBILITY */

function Credibility() {
  const points = [
    ['Certified', 'ISO certified', 'An independent auditor has verified that work here follows a documented, repeatable process — the same one on your project as on every other.'],
    ['Proven', 'We run what we sell', 'These are our own products, in production, with paying customers. When something breaks at 9pm on a Friday it is our problem too.'],
    ['Consistent', 'One stack, done properly', 'Java 17, Spring Boot, MySQL, React and Flutter across everything. Any engineer here can pick up any project.'],
    ['Present', 'Local and reachable', `Bhubaneswar-based. ${COMPANY.hoursDisplay}, on the phone, in your language — and on site when it matters.`],
  ];

  return (
    <section className="section border-y border-hairline bg-accent-50">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="marker mono">Why Engispider</p>
            <MaskText as="h2" className="display mt-5 text-f-6xl">
              <>Claims you can</>
              <>actually check.</>
            </MaskText>
            <Reveal delay={120}>
              <p className="mt-6 measure text-body">
                You will not find “500+ clients” on this page. We would rather
                show you the certificate, the customer list and the stack, and
                let you verify all three.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 flex items-center gap-6 rounded-lg border border-accent-200 bg-white p-6">
                <Image
                  src="/images/iso-9001-2015.webp"
                  alt="ISO certified"
                  width={256}
                  height={256}
                  loading="lazy"
                  className="h-28 w-28 shrink-0"
                />
                <div>
                  <p className="mono text-accent-700">Certification</p>
                  <p className="mt-1.5 font-display text-f-xl font-extrabold text-ink">
                    ISO certified
                  </p>
                  <p className="mt-1 text-f-xs leading-relaxed text-body">
                    Audited by an independent body, not self-declared.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2">
              {points.map(([k, t, d], i) => (
                <Reveal key={t} delay={i * 60} className="bg-white">
                  <div className="h-full p-6">
                    <p className="mono text-accent-700">{k}</p>
                    <h3 className="mt-3 font-display text-f-lg font-bold text-ink">{t}</h3>
                    <p className="mt-2 text-f-xs leading-relaxed text-body">{d}</p>
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

/* ==================================================================== STACK */

function Stack() {
  return (
    <section className="section relative">
      <SectionBackdrop side="right" tone="mixed" />
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="marker mono">Stack</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>What we</>
              <>build on.</>
            </MaskText>
            <Reveal delay={140}>
              <p className="mt-6 text-f-xs leading-relaxed text-body">
                One stack across every product and every client project — which
                is why any engineer here can pick up any codebase.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {TECH_STACK.map((g, i) => (
              <Reveal key={g.group} delay={i * 60} className="bg-white">
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

/* ================================================================ CTA BAND */

/** The one unmissable colour moment on the page. */
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
