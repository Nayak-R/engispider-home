'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaThreads,
  FaXTwitter,
} from 'react-icons/fa6';
import { COMPANY } from '@/data/company';
import { PRODUCTS } from '@/data/products';

/**
 * Site footer.
 *
 * Built as a specification sheet rather than a link dump: four columns
 * divided by vertical hairlines, monospace labels, tabular figures for the
 * phone numbers, and the brand set once at full size as a closing signature.
 *
 * ── On a phone it is a different object ───────────────────────────────────
 * The desktop layout collapsed into one 2,216px column — nearly three
 * screens of footer, most of it a fourteen-item product list set one per
 * line. Four changes, all of them scoped below lg:
 *
 *   · Products and Company run two-up. Halving the rows is what pays for
 *     44px touch targets, so the lists got shorter AND more tappable.
 *   · Each block carries a top hairline. The dividing rules are vertical
 *     and `lg:` only, so stacked there was nothing separating the sections
 *     at all and the four blocks read as one undifferentiated column.
 *   · The two phone numbers and the email address become bordered cells.
 *     They are the actions someone actually takes from a phone, and as bare
 *     text lines they were the least tappable things on the page.
 *   · The bottom bar reserves space for the scroll-to-top button, which was
 *     sitting directly on top of the Privacy link.
 *
 * Corrections carried from the previous build:
 *
 *  1. Every social URL here was verified to resolve. The old footer linked
 *     Facebook, LinkedIn and Twitter URLs that 404'd, and the same dead URLs
 *     were duplicated into Organization.sameAs. (x.com is the one exception
 *     — see the `x-handle` note in data/company.ts.)
 *  2. Opening hours are stated and match openingHoursSpecification. The old
 *     site advertised "24/7 Support" on four pages while its own markup said
 *     Mon–Fri 09:00–18:00.
 *  3. No stat band. The old one asserted 1000+ projects / 500+ clients / 99%
 *     success beside a customers page listing fifteen.
 */

const SOCIAL_ICON = {
  LinkedIn: FaLinkedinIn,
  Instagram: FaInstagram,
  YouTube: FaYoutube,
  Threads: FaThreads,
  X: FaXTwitter,
} as const;

const COMPANY_LINKS = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'All products', href: '/solutions' },
  { name: 'Customers', href: '/customers' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

/**
 * Routes that already end in their own call to action. Stacking the footer's
 * CTA under one of those gave two consecutive panels asking for the same
 * thing in the same words.
 */
const PAGES_WITH_OWN_CTA = ['/', '/contact'];

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return <p className="mono mb-5 text-faint">{children}</p>;
}

/**
 * Separates stacked blocks on a phone and disappears at lg, where the
 * vertical hairlines between columns take the job over.
 */
const BLOCK = 'mt-10 border-t border-hairline pt-10 lg:mt-0 lg:border-t-0 lg:pt-0';

/** Links sized to the 44px minimum rather than to their own text. */
const LINK =
  'flex min-h-[44px] items-center text-f-xs text-body transition-colors hover:text-accent-ink lg:min-h-0 lg:py-1';

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  const path = (pathname || '/').replace(/\/+$/, '') || '/';
  const showCta = !PAGES_WITH_OWN_CTA.includes(path);

  const half = Math.ceil(PRODUCTS.length / 2);

  return (
    <footer className="border-t border-hairline bg-canvas">
      {showCta && (
        <div className="border-b border-hairline">
          <div className="container-page">
            <div className="grid items-end gap-8 py-16 lg:grid-cols-12 lg:py-20">
              <div className="lg:col-span-7">
                <p className="marker mono">Next step</p>
                <h2 className="display mt-5 text-f-6xl">
                  Let’s scope
                  <br />
                  your system.
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-body">
                  Tell us what you run today and what breaks. We’ll point you at
                  the closest product or quote the build — usually within two
                  working days.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn btn-primary">
                    Book a demo <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href={`tel:${COMPANY.contact.sales.tel}`} className="btn btn-line">
                    {COMPANY.contact.sales.display}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------- four columns --- */}
      <div className="container-page">
        <div className="grid py-14 sm:py-16 lg:grid-cols-12 lg:gap-x-0 lg:gap-y-12">
          {/* Identity */}
          <div className="lg:col-span-3 lg:pr-10">
            <Link href="/" aria-label="Engispider Infotech — home" className="inline-block">
              <Image
                src="/images/EngiSpider-fnl.png"
                alt="Engispider Infotech"
                width={742}
                height={404}
                className="h-14 w-auto"
              />
            </Link>

            <p className="mt-6 max-w-xs text-f-xs leading-relaxed text-body">
              Software products and custom development from Bhubaneswar, Odisha
              — for restaurants, campuses, laboratories, retail and clinics
              across India.
            </p>

            {COMPANY.social.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2">
                {COMPANY.social.map((s) => {
                  const Icon = SOCIAL_ICON[s.name as keyof typeof SOCIAL_ICON];
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Engispider on ${s.name}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded border border-hairline text-muted transition-colors hover:border-accent-400 hover:bg-accent-50 hover:text-accent-ink lg:h-10 lg:w-10"
                    >
                      {Icon ? <Icon className="h-[0.95rem] w-[0.95rem]" /> : s.name[0]}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Products — two sub-columns, fourteen entries is too many for one */}
          <nav
            aria-label="Products"
            className={`${BLOCK} lg:col-span-4 lg:border-l lg:border-hairline lg:pl-10`}
          >
            <ColumnLabel>Products</ColumnLabel>
            {/* Two-up from the narrowest screen. Fourteen products one per
                line is 476px of plain links — the single biggest thing in
                the footer, and the least worth that much of a phone. */}
            <div className="grid grid-cols-2 gap-x-5 sm:gap-x-8">
              {[PRODUCTS.slice(0, half), PRODUCTS.slice(half)].map((col, ci) => (
                <ul key={ci} className="lg:space-y-2.5">
                  {col.map((p) => (
                    <li key={p.slug}>
                      <Link href={p.href} className={LINK}>
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </nav>

          {/* Company */}
          <nav
            aria-label="Company"
            className={`${BLOCK} lg:col-span-2 lg:border-l lg:border-hairline lg:pl-10`}
          >
            <ColumnLabel>Company</ColumnLabel>
            <ul className="grid grid-cols-2 gap-x-5 lg:grid-cols-1 lg:gap-0 lg:space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={LINK}>
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className={`${BLOCK} lg:col-span-3 lg:border-l lg:border-hairline lg:pl-10`}>
            <ColumnLabel>Contact</ColumnLabel>
            <address className="not-italic">
              <p className="text-f-xs leading-relaxed text-body">
                {COMPANY.address.locality}, {COMPANY.address.region}{' '}
                <span className="mono-num">{COMPANY.address.postalCode}</span>
                <br />
                {COMPANY.address.countryName}
              </p>

              {/*
                Bordered cells below lg, bare rows above it.
                Tapping a phone number is the single most likely thing anyone
                does with this footer on a phone, and as an unadorned line of
                text it did not look like it did anything. On desktop the
                borders would be four boxes nobody is going to click, so they
                are dropped and the tabular figures carry the alignment.
              */}
              <div className="mt-5 grid grid-cols-2 gap-2 lg:mt-4 lg:grid-cols-1 lg:gap-1">
                {[
                  [COMPANY.contact.sales, 'Sales'],
                  [COMPANY.contact.support, 'Support'],
                ].map(([c, label]) => {
                  const contact = c as { tel: string; display: string };
                  return (
                    <a
                      key={label as string}
                      href={`tel:${contact.tel}`}
                      className="flex min-h-[54px] flex-col justify-center gap-1 rounded border border-hairline px-3 text-f-xs text-body transition-colors hover:border-accent-400 hover:bg-accent-50 hover:text-accent-ink lg:min-h-0 lg:flex-row lg:items-baseline lg:gap-3 lg:rounded-none lg:border-0 lg:px-0 lg:hover:bg-transparent"
                    >
                      {/* Label over number on a phone — side by side it is
                          183px of content in a 169px half-column. */}
                      <span className="mono text-faint lg:w-14 lg:shrink-0">
                        {label as string}
                      </span>
                      <span className="mono-num">{contact.display}</span>
                    </a>
                  );
                })}

                <a
                  href={`mailto:${COMPANY.contact.email}`}
                  className="col-span-2 flex min-h-[48px] items-center gap-1 rounded border border-hairline px-3 text-f-xs text-body transition-colors hover:border-accent-400 hover:bg-accent-50 hover:text-accent-ink lg:col-span-1 lg:mt-4 lg:min-h-0 lg:rounded-none lg:border-0 lg:px-0 lg:hover:bg-transparent"
                >
                  {COMPANY.contact.email}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>

              <p className="mt-5 flex items-baseline gap-3 text-f-xs lg:mt-4">
                <span className="mono w-14 shrink-0 text-faint">Hours</span>
                <span className="text-muted">{COMPANY.hoursDisplay}</span>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------- signature ---
          The brand set once at full size and cropped by its own container.
          A closing mark rather than a message — it carries no information
          the page does not already state, so it is hidden from assistive
          tech and sits at a tint that reads as texture, not text. */}
      <div aria-hidden className="overflow-hidden border-t border-hairline py-8">
        {/* leading-[1.12] rather than a tight line-height: the descenders on
            'g' and 'p' need the room, and cropping them read as a rendering
            fault rather than a deliberate crop. */}
        <p
          className="display container-page select-none whitespace-nowrap text-center text-[clamp(3rem,14vw,11.5rem)] leading-[1.12]"
          style={{ color: '#EAEFF6' }}
        >
          Engispider
        </p>
      </div>

      {/* ---------------------------------------------------- bottom bar --- */}
      <div className="border-t border-hairline">
        {/*
          Clearance for the scroll-to-top button, which floats bottom-right
          and was sitting directly on top of the legal links.

          Two separate reservations, because the button collides differently
          depending on the layout: stacked, it lands on the last row, so the
          bar carries pb-20; in a row it lands on 'Terms' at the right edge,
          and only stops doing so past ~1300px where the page gutters grow
          wider than the button — so the row keeps a 64px lane free on the
          right at every width that uses it.
        */}
        <div className="container-page flex flex-col gap-4 py-5 pb-28 lg:flex-row lg:items-center lg:justify-between lg:pb-5 lg:pr-[calc(var(--gutter)+4rem)]">
          {/* The credential as a closing stamp. Ordered first on a phone so
              the mark leads the bar instead of trailing a long legal name;
              restored to the middle of the row from sm up. */}
          <p className="order-1 flex items-center gap-2 lg:order-2">
            <Image
              src="/images/iso-9001-2015.webp"
              alt=""
              width={256}
              height={256}
              loading="lazy"
              className="h-10 w-10"
            />
            <span className="mono text-muted">ISO certified</span>
          </p>

          <p className="order-3 mono text-faint lg:order-1">
            © {year} {COMPANY.legalName}
          </p>

          <div className="order-2 flex gap-8 lg:order-3 lg:gap-6">
            <Link
              href="/privacy"
              className="mono flex min-h-[44px] items-center text-faint transition-colors hover:text-accent-ink lg:min-h-0"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="mono flex min-h-[44px] items-center text-faint transition-colors hover:text-accent-ink lg:min-h-0"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
