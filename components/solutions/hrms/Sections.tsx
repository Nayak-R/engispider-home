import Link from 'next/link';
import { ArrowRight, Check, Monitor, Smartphone } from 'lucide-react';

import { Reveal, MaskText, CountUp } from '@/components/motion/Reveal';
import Parallax from '@/components/motion/Parallax';
import SectionBackdrop from '@/components/SectionBackdrop';
import { FreeCallout } from '@/components/solutions/FreeTag';
import {
  BrowserFrame,
  PhoneFrame,
  AttendanceMock,
  PayrollMock,
  LeaveMock,
  HiringMock,
  PhoneSelfServiceMock,
} from '@/components/hrms/Mockups';

/**
 * Engispider HRMS — the deep half of the product page.
 *
 * Same structure as the restaurant and campus pages: the shared
 * `ProductPage` template renders hero, spec strip, audience, rollout, FAQ,
 * related products and CTA, and this replaces its generic capability list.
 *
 * ── The argument ─────────────────────────────────────────────────────────
 * Payroll is not hard because the arithmetic is hard. It is hard because
 * the inputs live in four places — a device on a wall, a leave register, a
 * joining letter and somebody's memory — and they only have to disagree
 * once for a month to go wrong. So the pillars follow the inputs into the
 * run rather than listing modules.
 *
 * ── What was removed from the previous version ───────────────────────────
 * Every number on the old page was invented: "70% time saved", "85%
 * improved employee engagement", "99.9% payroll accuracy", "95% user
 * satisfaction", and a benefits list led by "reduce HR administrative
 * workload by 70%". Nobody measured any of it. None of it is here, and
 * nothing has replaced it — an unmeasured percentage is worth less than
 * the space it occupies.
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
    kicker: 'The device, not a register',
    title: 'Attendance arrives on its own',
    body: 'Punches come off the biometric reader straight into the ledger as the morning happens. Nobody exports a file at month end, nobody keys it in twice, and nobody argues about what the machine said.',
    bullets: [
      'Biometric attendance integration with real-time monitoring',
      'Present, late and on-leave as live figures, not a monthly tally',
      'Multiple sites and devices rolling into one headcount',
      'The same ledger payroll reads from — no export step',
    ],
    label: 'Attendance',
    Mock: AttendanceMock,
  },
  {
    kicker: 'Leave that reconciles',
    title: 'Balances nobody has to remember',
    body: 'An employee applies, their manager approves, and the balance moves by itself. The month-end question "how many days did she actually take" stops being a question.',
    bullets: [
      'Applications and approval workflows per leave type',
      'Balances maintained automatically against entitlement',
      'Leave reflected in attendance and in the payroll run',
      'Holiday calendar and per-employee entitlements',
    ],
    label: 'Leave',
    Mock: LeaveMock,
  },
  {
    kicker: 'The run',
    title: 'Payroll with the statute already in it',
    body: 'Salary computed from the attendance and leave that are already in the system, with EPF, ESI and TDS applied on the way through. Payslips and the bank disbursement come out of the same run.',
    bullets: [
      'Automated salary calculation from live attendance',
      'EPF, ESI and TDS applied at configured rates',
      'Payslips generated per employee, ready to send',
      'Bank disbursement file from the finished run',
    ],
    label: 'Payroll',
    Mock: PayrollMock,
  },
  {
    kicker: 'Before they are staff',
    title: 'Hiring that ends in an employee record',
    body: 'Job posting through to onboarding in the same system, so an accepted candidate becomes an employee with their documents attached — rather than a new row somebody types from a PDF.',
    bullets: [
      'Job posting, applications and a visible pipeline',
      'Screening and interview stages with owners',
      'Onboarding that creates the employee record directly',
      'Documents stored against the person from day one',
    ],
    label: 'Hiring',
    Mock: HiringMock,
  },
] as const;

/* ---------------------------------------------------- full capability set */

const CAPABILITY_GROUPS = [
  {
    group: 'People & records',
    items: [
      ['Employee database', 'Full profiles with documents stored against the person.'],
      ['Role-based access', 'Who can see salary, who can only see their own team.'],
      ['Recruitment', 'Job posting, applications and a pipeline through to offer.'],
      ['Onboarding', 'An accepted candidate becomes an employee record directly.'],
    ],
  },
  {
    group: 'Time & attendance',
    items: [
      ['Biometric integration', 'Punches from the device, in real time, with no export step.'],
      ['Real-time monitoring', 'Present, late and absent as live figures through the day.'],
      ['Leave management', 'Applications, approval workflows and automatic balances.'],
      ['Holiday calendar', 'Per-location holidays feeding attendance and the payroll run.'],
    ],
  },
  {
    group: 'Payroll',
    items: [
      ['Automated salary run', 'Computed from the attendance and leave already recorded.'],
      ['Statutory deductions', 'EPF, ESI and TDS applied at your configured rates.'],
      ['Payslips', 'Generated per employee and available in self-service.'],
      ['Bank disbursement', 'A payment file straight out of the completed run.'],
    ],
  },
  {
    group: 'Growth & self-service',
    items: [
      ['Performance reviews', 'Review cycles against goals, recorded rather than remembered.'],
      ['Goals & KPI tracking', 'What each person is measured on, visible to both sides.'],
      ['Employee self-service', 'Payslips, leave balance and attendance on their own phone.'],
      ['Reports & exports', 'Headcount, attendance, leave and payroll registers.'],
    ],
  },
] as const;

const CAPABILITY_COUNT = CAPABILITY_GROUPS.reduce((n, g) => n + g.items.length, 0);

/* ======================================================================== */

export default function HrmsSections() {
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
            { value: 'Biometric', label: 'device straight into payroll' },
            { value: 'EPF · ESI · TDS', label: 'applied inside the run' },
            { value: 'Self-service', label: 'payslips on their own phone' },
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
              <>HR runs it.</>
              <>
                Everyone <span className="accent-word">uses</span> it.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Most of the questions HR answers in a week — what is my
                balance, where is my payslip, how many days did I work — are
                questions staff can answer themselves.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-10">
          <FreeCallout kicker="Self-service is free with the subscription." delay={60}>
            Every employee on the payroll gets it. No per-seat charge for
            staff access and no limit on how many people use it.
          </FreeCallout>
        </div>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2">
          {[
            {
              Icon: Monitor,
              name: 'Web app',
              who: 'HR, payroll & management',
              body: 'Employees, attendance, leave approvals, the payroll run, hiring, performance and every register.',
            },
            {
              Icon: Smartphone,
              name: 'Employee self-service',
              who: 'Your staff · on mobile',
              body: 'Payslips, leave balance, leave applications and their own attendance — without asking HR for any of it.',
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
            <p className="marker mono">Follow the inputs</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Payroll goes wrong</>
              <>
                <span className="accent-word">upstream</span> of payroll.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                The arithmetic is never the hard part. The inputs live in a
                device on a wall, a leave register and somebody&rsquo;s memory —
                and they only have to disagree once for a month to go wrong.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {PILLARS.map((p, i) => (
            <PillarRow key={p.title} pillar={p} index={i} reverse={i % 2 === 1} />
          ))}

          {/* Self-service closes the sequence: the inputs are clean, so the
              answers can go back to the people who asked for them. */}
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal direction="scale" className="lg:col-span-5">
              <Parallax amount={34} className="flex justify-center">
                <PhoneFrame label="Employee self-service">
                  <PhoneSelfServiceMock />
                </PhoneFrame>
              </Parallax>
            </Reveal>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="mono text-accent-700">05 · Back to the employee</p>
              <MaskText as="h3" className="display mt-4 text-f-3xl">
                <>They stop asking HR</>
              </MaskText>
              <Reveal delay={100}>
                <p className="measure mt-5 leading-relaxed text-body">
                  Once attendance, leave and payroll agree, the answers can be
                  handed straight to the person asking. Payslip, balance, hours
                  worked — on their own phone, without an email to HR and a
                  wait until Tuesday.
                </p>
              </Reveal>
              <ul className="mt-7 space-y-2.5">
                {[
                  'Payslips for every month, downloadable',
                  'Live leave balance and a one-tap application',
                  'Their own attendance and worked hours',
                  'Role-based access — they see theirs, not anyone else’s',
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
                This replaces the attendance export, the leave register, the
                payroll workbook and the folder of joining letters. None of it
                is priced separately.
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
            See it on your own payroll <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
