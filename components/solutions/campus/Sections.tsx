import Link from 'next/link';
import { ArrowRight, Check, Monitor, Smartphone, Globe } from 'lucide-react';

import { Reveal, MaskText, CountUp } from '@/components/motion/Reveal';
import Parallax from '@/components/motion/Parallax';
import SectionBackdrop from '@/components/SectionBackdrop';
import { FreeCallout } from '@/components/solutions/FreeTag';
import {
  BrowserFrame,
  PhoneFrame,
  FeeCollectMock,
  OnlinePayMock,
  OutstandingMock,
  AccountingMock,
  PhonePortalMock,
} from '@/components/academic/Mockups';

/**
 * Engispider Campus — the deep half of the product page.
 *
 * Same structure as the restaurant page: the shared `ProductPage` template
 * renders hero, spec strip, audience, rollout, FAQ, related products and
 * CTA, and this replaces its generic capability list. One `Sections.tsx`
 * per product that has more to say than a list of strings.
 *
 * ── The argument ─────────────────────────────────────────────────────────
 * Not "here are 26 features". An institution's problem is that money is
 * collected by one set of people, recorded by another, and answered for by
 * a third — months later, to an auditor. So the pillars follow a single
 * rupee: a parent pays it, a cashier raises it, a second person verifies
 * it, the ledger posts it, and a report finds the ones that never arrived.
 *
 * ── Corrections carried from the previous version ────────────────────────
 *  · No "Live in days, not months". The rollout section directly below
 *    says deployment runs in phases with dates agreed first — the page was
 *    contradicting the rest of the site in its own heading.
 *  · No `offers: { price: "0" }` in the markup. The old page published a
 *    zero price on paid software, which is a machine-readable falsehood;
 *    the template emits the schema now and omits price deliberately.
 */

/* --------------------------------------------------------------- pillars */

type Pillar = {
  kicker: string;
  title: string;
  body: string;
  bullets: readonly string[];
  label: string;
  Mock: () => React.JSX.Element;
  phone?: boolean;
};

const PILLARS: readonly Pillar[] = [
  {
    kicker: 'Parents pay themselves',
    title: 'The fee arrives without a queue',
    body: 'A parent opens the portal on their phone, sees exactly what is due, and pays. The receipt is generated the same second and the bank confirms the money separately — nobody stands at a counter on a working day to hand over cash.',
    bullets: [
      'Self-pay for parents; pay-on-behalf at the counter for staff',
      'Instant printable receipt on every payment, online or cash',
      'Dues, attendance, results and leave in the same portal',
      'Refund a wrong payment straight back to source in one click',
    ],
    label: 'Parent portal',
    Mock: PhonePortalMock,
    phone: true,
  },
  {
    kicker: 'Two people, every rupee',
    title: 'Nothing is one person’s word',
    body: 'The cashier raises the receipt and someone in accounts verifies it. Only then is the collection final. Every concession needs a second approval too, so a discount is never something that simply happened.',
    bullets: [
      'Maker-checker approval on every collection',
      'Discount and concession approvals, traceable to a person',
      'Gap-less, audit-ready receipt numbering — no gaps, no duplicates',
      'Complete audit trail with before-and-after on every edit',
    ],
    label: 'Receipt approvals',
    Mock: FeeCollectMock,
  },
  {
    kicker: 'The books, unattended',
    title: 'Your ledger posts itself',
    body: 'Every approved receipt writes its own double entry — bank debited, fee income credited, balanced. The voucher book, day book, trial balance and P&L are live, because they are the same data rather than a monthly re-typing of it.',
    bullets: [
      'Automatic double-entry on every approved receipt',
      'Cumulative day book by mode and cashier, with a day-close guard',
      'Trial balance and P&L live, with no separate bookkeeping step',
      'Vouchers and ledgers exportable to PDF or Excel',
    ],
    label: 'Day book',
    Mock: AccountingMock,
  },
  {
    kicker: 'Reconciled, not retyped',
    title: 'The bank confirms it, not a clerk',
    body: 'Online payments settle against the bank statement automatically. A payment that has not landed stays visibly on hold rather than being marked received by someone who hopes it will.',
    bullets: [
      'Automatic reconciliation against the bank',
      'Collected, reconciled, on-hold and refunded as live figures',
      'Status comes from the gateway — never edited by hand',
      'One-click refunds to the original payment source',
    ],
    label: 'Online payments',
    Mock: OnlinePayMock,
  },
  {
    kicker: 'Who has not paid',
    title: 'The defaulter list, in one click',
    body: 'Outstanding dues filtered by institute, course, year and section, aged, with the guardian’s phone number already beside the name. The follow-up list builds itself instead of being assembled from a register each month.',
    bullets: [
      'Filter by institute, course, year and section',
      'Defaulter list with guardian contact details and ageing',
      'Collection, day-wise, mode-wise and fee-plan reports',
      'Export any report to PDF or Excel',
    ],
    label: 'Outstanding',
    Mock: OutstandingMock,
  },
] as const;

/* ---------------------------------------------------- full capability set */

const CAPABILITY_GROUPS = [
  {
    group: 'Students & admissions',
    items: [
      ['Online admissions', 'Course, category, hostel and transport set in a single guided flow.'],
      ['Student 360° profile', 'Admission, details, fees, receipts, payments and certificates in one place.'],
      ['Bulk student upload', 'Import a whole batch from Excel — validate, preview errors, then commit.'],
      ['Multi-institution', 'One campus or a whole group, each institute’s data separate.'],
      ['Role-based dashboards', 'Everyone lands on what matters to them, not on someone else’s screen.'],
      ['Notifications & notices', 'Message parents or any group of students, with read-acknowledgement.'],
    ],
  },
  {
    group: 'Fees & money',
    items: [
      ['Fee plans, your way', 'Per course, year, category and student, with mandatory and optional heads.'],
      ['Maker-checker collection', 'Cashier collects, accounts verifies — approval on every rupee.'],
      ['Instant auto receipt', 'Cash, cheque, UPI or online — a printable receipt on the spot.'],
      ['Gap-less receipts', 'Audit-ready numbering with no gaps and no duplicates.'],
      ['Discount approvals', 'Every concession needs a second approval before it applies.'],
      ['Online fee payment', 'Parents pay online and get an instant receipt, reconciled with the bank.'],
      ['One-click refunds', 'Refund a wrong payment to its original source, no bank visit.'],
      ['Outstanding & defaulters', 'Dues by institute, course, year or section, with parent contacts.'],
    ],
  },
  {
    group: 'Accounting',
    items: [
      ['Automatic double entry', 'Every approved receipt posts itself; vouchers stay live.'],
      ['Day book & day-close', 'Cumulative by mode and cashier, with a previous-day close guard.'],
      ['Trial balance & P&L', 'Live, because they are the same data rather than a monthly re-entry.'],
      ['Complete audit trail', 'Every entry, edit, discount and approval logged with before-and-after.'],
    ],
  },
  {
    group: 'Campus operations',
    items: [
      ['Hostel management', 'Rooms, bed allotment, transfer and leave — allotment raises the fee itself.'],
      ['Transport management', 'Routes, stops and fares; map a student to a bus and the fee follows.'],
      ['Library', 'Every book with its own identity, stock and location; issue, return, auto-fines.'],
      ['Attendance', 'Class-wise or day-wise, with leave requests and approvals.'],
      ['Timetable', 'Publish in a click; students and teachers each see their own.'],
      ['Examinations & results', 'Schedule, form fill-up, exam-fee collection, upload, declare and print.'],
      ['Staff, HR & payroll', 'Records, attendance, leave, payslips and bank disbursement with maker-checker.'],
      ['Student & parent portal', 'Families check dues, pay online, apply for leave, see results and attendance.'],
    ],
  },
] as const;

const CAPABILITY_COUNT = CAPABILITY_GROUPS.reduce((n, g) => n + g.items.length, 0);

/* ======================================================================== */

export default function CampusSections() {
  return (
    <>
      <Stats />
      <Surfaces />
      <Pillars />
      <Capabilities />
    </>
  );
}

/* ==================================================================== STATS */

function Stats() {
  return (
    <section className="border-y border-hairline bg-band">
      <div className="container-page">
        <dl className="grid gap-x-10 gap-y-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { count: CAPABILITY_COUNT, label: 'capabilities, shipping today' },
            { value: 'Two', label: 'approvals on every rupee' },
            { value: 'Auto', label: 'double entry on every receipt' },
            { value: 'Multi-institution', label: 'one login, every campus' },
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

/* ================================================================ SURFACES */

function Surfaces() {
  return (
    <section className="section relative">
      <SectionBackdrop side="right" tone="cool" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">Three ways in</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>The office, the phone,</>
              <>
                and every <span className="accent-word">parent</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Administrators run the institution from the web app. Families
                get an Android app and a browser portal — which is what takes
                the queue out of the corridor on a fee deadline.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-10">
          <FreeCallout kicker="The app and the portal are free with the subscription." delay={60}>
            Every family at the institution gets access. No per-student charge,
            no per-device licence, and no limit on how many parents use them.
          </FreeCallout>
        </div>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-3">
          {[
            {
              Icon: Monitor,
              name: 'Web app',
              who: 'Office, accounts & management',
              body: 'Admissions, fee plans, collections, approvals, accounting, hostel, transport, library, exams and payroll.',
            },
            {
              Icon: Smartphone,
              name: 'Android app',
              who: 'Students & parents',
              body: 'Dues and online payment, receipts, attendance, results and leave requests, in a phone they already carry.',
            },
            {
              Icon: Globe,
              name: 'Web portal',
              who: 'Families · any browser',
              body: 'The same portal without installing anything — for a parent on a desktop, or a phone that is not Android.',
            },
          ].map(({ Icon, name, who, body }, i) => (
            <Reveal as="li" key={name} delay={i * 70} className="bg-canvas">
              <div className="group h-full p-7 transition-colors hover:bg-accent-50">
                <Icon
                  className="h-5 w-5 text-accent-600 transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden
                />
                <h3 className="mt-5 font-display text-f-lg font-bold text-ink">{name}</h3>
                <p className="mono mt-1.5 text-faint">{who}</p>
                <p className="mt-3 text-f-xs leading-relaxed text-body">{body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================================================================= PILLARS */

function Pillars() {
  return (
    <section className="section relative border-t border-hairline">
      <SectionBackdrop side="left" tone="warm" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">Follow one rupee</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>From a parent’s phone</>
              <>
                to the <span className="accent-word">trial balance</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Collected by one person, recorded by another, answered for by a
                third — months later, to an auditor. Every step below exists
                because that is where institutions lose money.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {PILLARS.map((p, i) => (
            <PillarRow key={p.title} pillar={p} index={i} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarRow({
  pillar,
  index,
  reverse,
}: {
  pillar: Pillar;
  index: number;
  reverse: boolean;
}) {
  const { kicker, title, body, bullets, label, Mock, phone } = pillar;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className={`lg:col-span-5 ${reverse ? 'lg:order-2 lg:col-start-8' : ''}`}>
        <p className="mono text-accent-700">
          {String(index + 1).padStart(2, '0')} · {kicker}
        </p>
        <MaskText as="h3" className="display mt-4 text-f-3xl">
          <>{title}</>
        </MaskText>
        <Reveal delay={100}>
          <p className="measure mt-5 leading-relaxed text-body">{body}</p>
        </Reveal>

        <ul className="mt-7 space-y-2.5">
          {bullets.map((b, bi) => (
            <Reveal as="li" key={b} delay={160 + bi * 50} className="flex items-start gap-3">
              <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-500" aria-hidden />
              <span className="text-f-xs leading-relaxed text-body">{b}</span>
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal
        direction="scale"
        delay={120}
        className={`min-w-0 lg:col-span-6 ${
          reverse ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'
        }`}
      >
        {phone ? (
          <Parallax amount={34} className="flex justify-center">
            <PhoneFrame label={label}>
              <Mock />
            </PhoneFrame>
          </Parallax>
        ) : (
          <Parallax amount={24}>
            <BrowserFrame label={label}>
              <Mock />
            </BrowserFrame>
          </Parallax>
        )}
      </Reveal>
    </div>
  );
}

/* =========================================================== CAPABILITIES */

function Capabilities() {
  return (
    <section className="section relative border-t border-hairline">
      <SectionBackdrop side="right" tone="mixed" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">Everything in the box</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>{CAPABILITY_COUNT} capabilities,</>
              <>
                <span className="accent-word">one</span> subscription.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                This replaces the admission register, the fee book, the
                accounting package, the spreadsheets, and the separate hostel,
                transport and library records. None of it is priced separately.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 space-y-12">
          {CAPABILITY_GROUPS.map((g) => (
            <div key={g.group}>
              <div className="flex items-baseline gap-4 border-b border-hairline pb-3">
                <h3 className="font-display text-f-lg font-bold text-ink">{g.group}</h3>
                <span className="mono-num text-faint">{g.items.length}</span>
              </div>

              <ul className="grid gap-px overflow-hidden border-x border-b border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
                {g.items.map(([title, desc], i) => (
                  <Reveal as="li" key={title} delay={(i % 4) * 50} className="bg-canvas">
                    <div className="h-full p-5 transition-colors hover:bg-accent-50">
                      <h4 className="text-f-xs font-bold leading-snug text-ink">{title}</h4>
                      <p className="mt-2 text-f-2xs leading-relaxed text-muted">{desc}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link href="/contact" className="link-arrow">
            See it on your own fee structure <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
