import Link from 'next/link';
import { ArrowRight, Check, Monitor, Smartphone } from 'lucide-react';

import { Reveal, MaskText, CountUp } from '@/components/motion/Reveal';
import Parallax from '@/components/motion/Parallax';
import SectionBackdrop from '@/components/SectionBackdrop';
import { FreeCallout } from '@/components/solutions/FreeTag';
import {
  BrowserFrame,
  PhoneFrame,
  PipelineMock,
  QuotationMock,
  SubscriptionMock,
  TasksMock,
  PhoneCrmMock,
} from '@/components/crm/Mockups';

/**
 * Engispider CRM — the deep half of the product page.
 *
 * ── The argument ─────────────────────────────────────────────────────────
 * Most CRMs stop at "won". This one does not, and that is the whole reason
 * to choose it: the quotation, the invoice and the renewal are the same
 * record as the lead, so the number a salesperson quoted is the number
 * that gets billed. The pillars follow a deal from first call to the
 * second year of a subscription.
 *
 * ── What was removed from the previous version ───────────────────────────
 * The old page sold "boost revenue" and "automate workflows" without
 * naming a single thing the product does that a spreadsheet does not. The
 * modules it actually ships — quotations, invoices, subscriptions, bank
 * accounts, master items — were not mentioned anywhere on it.
 */

/* --------------------------------------------------------------- pillars */

type Pillar = {
  kicker: string;
  title: string;
  body: string;
  bullets: readonly string[];
  label: string;
  Mock: () => React.JSX.Element;
};

const PILLARS: readonly Pillar[] = [
  {
    kicker: 'Where deals actually stall',
    title: 'A pipeline you can argue with',
    body: 'Every lead in a stage, with a value against it and a date it last moved. The useful question is not how many leads there are — it is which seven have not moved in a fortnight, and that is the one this answers.',
    bullets: [
      'Visual pipeline from first contact through to won',
      'Value and age on every stage, not just a count',
      'Stalled deals surfaced rather than buried in a list',
      'Centralised contact history behind each one',
    ],
    label: 'Pipeline',
    Mock: PipelineMock,
  },
  {
    kicker: 'The document is the deal',
    title: 'Quotations that become invoices',
    body: 'Price the work once. The quotation goes out, gets revised, gets accepted — and the invoice is raised from it rather than typed again from a PDF, which is where the number usually changes by accident.',
    bullets: [
      'Quotations with versions, sent and accepted states',
      'Invoices raised directly from the accepted quotation',
      'Master items so the same work is priced the same way',
      'Full history against the customer, not in someone’s sent folder',
    ],
    label: 'Quotations',
    Mock: QuotationMock,
  },
  {
    kicker: 'Revenue that repeats',
    title: 'Renewals nobody has to remember',
    body: 'Retainers, AMCs and subscriptions bill themselves on their cycle. Monthly recurring revenue is a figure on a screen instead of something reconstructed from invoices at the end of a quarter.',
    bullets: [
      'Monthly, quarterly and annual billing cycles',
      'Invoices raised automatically on the next date',
      'Monthly recurring revenue as a live figure',
      'Renewals visible before they arrive, not after they lapse',
    ],
    label: 'Subscriptions',
    Mock: SubscriptionMock,
  },
  {
    kicker: 'The follow-up',
    title: 'Calls logged where the customer is',
    body: 'A task against a customer, a call logged against the same record, and the next action with a time on it. The history of a relationship stops living in the memory of whoever happened to own it.',
    bullets: [
      'Tasks assigned with owners and due times',
      'Integrated calling with logging and analytics',
      'Email campaigns and automated follow-ups',
      'Every interaction on the customer record',
    ],
    label: 'Tasks',
    Mock: TasksMock,
  },
] as const;

/* ---------------------------------------------------- full capability set */

const CAPABILITY_GROUPS = [
  {
    group: 'Customers & pipeline',
    items: [
      ['Contact database', 'Every customer with the full history of what was said.'],
      ['Sales pipeline', 'Lead to close, with value and age on each stage.'],
      ['Lead capture', 'New enquiries land in the same pipeline as everything else.'],
      ['Customer record', 'Quotes, invoices, subscriptions and calls in one place.'],
    ],
  },
  {
    group: 'Quote to cash',
    items: [
      ['Quotations', 'Versioned, with sent and accepted states and a full trail.'],
      ['Invoices', 'Raised from the accepted quotation rather than retyped.'],
      ['Subscriptions', 'Monthly, quarterly or annual, billed on their own cycle.'],
      ['Master items', 'One price list, so the same work is quoted the same way.'],
      ['Bank accounts', 'Which account a payment lands in, held against the record.'],
    ],
  },
  {
    group: 'Working the deal',
    items: [
      ['Task assignment', 'Owners and due times, visible to the whole team.'],
      ['Call logging', 'Integrated calling with the record written automatically.'],
      ['Email campaigns', 'Sequences and follow-ups that do not need a reminder.'],
      ['Workflow automation', 'The repetitive steps between stages, done for you.'],
    ],
  },
  {
    group: 'Oversight',
    items: [
      ['Dashboards', 'Pipeline, won, stalled and recurring revenue at a glance.'],
      ['Reporting', 'By owner, stage, customer and period, exportable.'],
      ['Mobile access', 'The pipeline and today’s calls on a phone.'],
      ['Role-based access', 'Who sees whose deals, and who can change a price.'],
    ],
  },
] as const;

const CAPABILITY_COUNT = CAPABILITY_GROUPS.reduce((n, g) => n + g.items.length, 0);

/* ======================================================================== */

export default function CrmSections() {
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
            { value: 'Quote → invoice', label: 'without retyping a figure' },
            { value: 'Recurring', label: 'subscriptions billed on cycle' },
            { value: 'Every call', label: 'logged against the customer' },
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
            <p className="marker mono">Two ways in</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>At the desk and</>
              <>
                in the <span className="accent-word">car park</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                The call that matters usually happens away from the desk. The
                note about it should be written while it is still accurate,
                not typed up from memory the next morning.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-10">
          <FreeCallout kicker="Mobile access is free with the subscription." delay={60}>
            Every user on the account gets it. No separate mobile licence and
            no cap on how many of your team carry the pipeline with them.
          </FreeCallout>
        </div>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2">
          {[
            {
              Icon: Monitor,
              name: 'Web app',
              who: 'Sales, accounts & management',
              body: 'Leads, customers, quotations, invoices, subscriptions, bank accounts, master items, tasks and reports.',
            },
            {
              Icon: Smartphone,
              name: 'Mobile access',
              who: 'Your team · on the move',
              body: 'The pipeline, today’s tasks and the customer history — and a call logged the moment it ends.',
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
            <p className="marker mono">Follow one deal</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Most CRMs stop</>
              <>
                at <span className="accent-word">won</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                This one carries the deal through the quotation, the invoice
                and the renewal — so the number quoted is the number billed,
                and nobody rebuilds it from a PDF.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {PILLARS.map((p, i) => (
            <PillarRow key={p.title} pillar={p} index={i} reverse={i % 2 === 1} />
          ))}

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal direction="scale" className="lg:col-span-5">
              <Parallax amount={34} className="flex justify-center">
                <PhoneFrame label="Mobile">
                  <PhoneCrmMock />
                </PhoneFrame>
              </Parallax>
            </Reveal>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="mono text-accent-700">05 · Away from the desk</p>
              <MaskText as="h3" className="display mt-4 text-f-3xl">
                <>Written while it is</>
                <>still accurate</>
              </MaskText>
              <Reveal delay={100}>
                <p className="measure mt-5 leading-relaxed text-body">
                  The pipeline, the day&rsquo;s calls and the customer&rsquo;s history
                  on a phone — so the note gets written in the car park rather
                  than reconstructed on Monday from what somebody remembers.
                </p>
              </Reveal>
              <ul className="mt-7 space-y-2.5">
                {[
                  'Your pipeline and closed-won figure, live',
                  'Today’s tasks with times against them',
                  'Log a call the moment it ends',
                  'Full customer history before you ring',
                ].map((b, i) => (
                  <Reveal as="li" key={b} delay={160 + i * 50} className="flex items-start gap-3">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-500" aria-hidden />
                    <span className="text-f-xs leading-relaxed text-body">{b}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
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
  const { kicker, title, body, bullets, label, Mock } = pillar;

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
        <Parallax amount={24}>
          <BrowserFrame label={label}>
            <Mock />
          </BrowserFrame>
        </Parallax>
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
                This replaces the pipeline spreadsheet, the quotation
                template, the renewals calendar and the sent folder that
                currently holds your customer history.
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
            See it on your own pipeline <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
