'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard, GraduationCap, Wallet, BookOpen, BedDouble, BarChart3,
  IndianRupee, Users, TrendingUp, CheckCircle2, Clock, Landmark, Bus,
  ClipboardList, Building2, Library, AlertTriangle,
} from 'lucide-react';
import {
  BrowserFrame,
  PhoneFrame,
  StatusBar,
  MockShell,
  MockStat,
  LiveDot,
  Live,
  useLiveTick,
  useMounted,
  type NavItem,
} from '@/components/mock/Chrome';

/*
 * Engispider Campus — product screens.
 *
 * Drawn in HTML rather than exported as images: crisp at any density, a
 * couple of KB each instead of ~150KB, no network request, no layout
 * shift, and nothing goes stale when the product UI moves.
 *
 * Chrome, liveness and proportions come from components/mock/Chrome, so
 * these behave exactly like the restaurant screens: a 112px rail rather
 * than a 176px one, one timer at a time, and no inline opacity:0 in the
 * static HTML.
 *
 * Indigo, not the site's orange — that is the colour of the real product,
 * and recolouring it would misrepresent what an administrator logs into.
 *
 * Figures are illustrative demo-tenant data. They assert nothing about any
 * institution.
 */

const ACCENT = '#4F46E5';
const TINT = '#EEF2FF';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
const lakh = (n: number) => `₹${(n / 100000).toFixed(2)}L`;

const NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { key: 'students', label: 'Students', Icon: GraduationCap },
  { key: 'fees', label: 'Fees', Icon: Wallet },
  { key: 'accounting', label: 'Accounting', Icon: Landmark },
  { key: 'academics', label: 'Academics', Icon: ClipboardList },
  { key: 'hostel', label: 'Hostel', Icon: BedDouble },
  { key: 'transport', label: 'Transport', Icon: Bus },
  { key: 'staff', label: 'Staff', Icon: Users },
  { key: 'reports', label: 'Reports', Icon: BarChart3 },
];

const pill = (t: string, c: string) => (
  <span className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${c}`}>{t}</span>
);

export { BrowserFrame, PhoneFrame };

/* ============================================================== dashboard */

export function CampusDashboardMock() {
  const [ref, t] = useLiveTick(2600);
  const collected = 1842000 + t * 7400;
  const receipts = 214 + t;
  const pending = Math.max(2, 9 - (t % 8));

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="CAMPUS · ERP"
      module="Dashboard"
      nav={NAV}
      active="dashboard"
      accent={ACCENT}
      tint={TINT}
      search
      badge={<LiveDot />}
    >
      <div className="mb-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <MockStat label="Collected today" value={lakh(collected)} Icon={IndianRupee} tone="#16a34a" />
        <MockStat label="Receipts" value={String(receipts)} Icon={CheckCircle2} tone={ACCENT} />
        <MockStat label="Awaiting approval" value={String(pending)} Icon={Clock} tone="#d97706" />
        <MockStat label="Outstanding" value="₹11.4L" Icon={TrendingUp} tone="#dc2626" />
      </div>

      <div className="grid grid-cols-[1.5fr_1fr] gap-2">
        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-800">Collection vs target</span>
            <span className="text-[9px] text-gray-400">This month</span>
          </div>
          <div className="flex h-20 items-end gap-1.5">
            {Array.from({ length: 12 }).map((_, i) => {
              const base = [32, 48, 40, 66, 84, 58, 44, 72, 90, 62, 76, 54][i];
              const grown = i === 11 ? Math.min(100, base + ((t * 6) % 24)) : base;
              return (
                <motion.span
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{ background: i > 8 ? ACCENT : '#C7D2FE' }}
                  animate={{ height: `${grown}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              );
            })}
          </div>
          <div className="mt-1.5 flex justify-between text-[9px] text-gray-400">
            <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <span className="mb-1.5 block text-[11px] font-bold text-gray-800">By institute</span>
          {[
            ['Science College', 62],
            ['Polytechnic', 48],
            ['Nursing Institute', 35],
          ].map(([name, pct]) => (
            <div key={name as string} className="mb-2">
              <div className="mb-1 flex items-center justify-between text-[9.5px]">
                <span className="truncate text-gray-600">{name}</span>
                <span className="mono-num text-gray-800">{pct}%</span>
              </div>
              <span className="block h-1.5 overflow-hidden rounded-full bg-gray-100">
                <motion.span
                  className="block h-full rounded-full"
                  style={{ background: ACCENT }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

/* ============================================================ fee receipt */

export function FeeCollectMock() {
  const [ref, t] = useLiveTick(2400);
  const mounted = useMounted();

  const rows = [
    { no: 'RC-004218', name: 'A. Mohanty', course: 'B.Pharm · 2', head: 'Tuition', amt: 18000 },
    { no: 'RC-004219', name: 'S. Behera', course: 'Nursing · 1', head: 'Hostel', amt: 22500 },
    { no: 'RC-004220', name: 'R. Das', course: 'Polytechnic · 3', head: 'Tuition', amt: 15750 },
    { no: 'RC-004221', name: 'P. Sahoo', course: 'B.Sc · 1', head: 'Transport', amt: 8400 },
  ].map((r, i) => {
    // Cashier raises, accounts verifies: rows walk PENDING -> APPROVED.
    const state = (t + i) % 5;
    return {
      ...r,
      status: state < 2 ? 'PENDING' : state < 4 ? 'APPROVED' : 'POSTED',
      tone:
        state < 2
          ? 'bg-amber-50 text-amber-700'
          : state < 4
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-indigo-50 text-indigo-700',
    };
  });

  const approved = rows.filter((r) => r.status !== 'PENDING').length;

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="CAMPUS · ERP"
      module="Fees · Receipt approvals"
      nav={NAV}
      active="fees"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label={`${approved}/4 verified`} />}
    >
      <div className="mb-2.5 grid grid-cols-3 gap-2">
        <MockStat label="Collected today" value={inr(284500 + t * 1250)} Icon={IndianRupee} tone="#16a34a" />
        <MockStat label="Receipts" value={String(63 + t)} Icon={CheckCircle2} tone={ACCENT} />
        <MockStat label="Awaiting check" value={String(4 - approved)} Icon={Clock} tone="#d97706" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.1fr_1.1fr_1fr_0.8fr_0.9fr] border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          <span>Receipt</span><span>Student</span><span>Course</span><span>Amount</span>
          <span className="text-right">Status</span>
        </div>
        {rows.map((r, i) => (
          <motion.div
            key={r.no}
            initial={mounted ? { opacity: 0, x: 6 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.26, delay: i * 0.03 }}
            className="grid grid-cols-[1.1fr_1.1fr_1fr_0.8fr_0.9fr] items-center border-b border-gray-50 px-2.5 py-[7px] text-[10px] last:border-0"
          >
            <span className="mono-num truncate text-gray-500">{r.no}</span>
            <span className="truncate font-medium text-gray-800">{r.name}</span>
            <span className="truncate text-gray-600">{r.course}</span>
            <span className="mono-num text-gray-800">{inr(r.amt)}</span>
            <span className="text-right">{pill(r.status, r.tone)}</span>
          </motion.div>
        ))}
      </div>

      <p className="mt-2 text-[9px] text-gray-400">
        Cashier raises · Accounts verifies · Posts to the ledger
      </p>
    </MockShell>
  );
}

/* ========================================================== online payment */

export function OnlinePayMock() {
  const [ref, t] = useLiveTick(2500);
  const collected = 962400 + t * 3100;
  const reconciled = collected - 18600;

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="CAMPUS · ERP"
      module="Online payments"
      nav={NAV}
      active="accounting"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label="bank sync" />}
    >
      <div className="mb-2.5 grid grid-cols-4 gap-2">
        <MockStat label="Collected" value={lakh(collected)} Icon={IndianRupee} tone="#16a34a" />
        <MockStat label="Reconciled" value={lakh(reconciled)} Icon={CheckCircle2} tone={ACCENT} />
        <MockStat label="On hold" value="₹18.6K" Icon={Clock} tone="#d97706" />
        <MockStat label="Refunded" value="₹4.2K" Icon={TrendingUp} tone="#dc2626" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.2fr_1fr_0.9fr_1fr] border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          <span>Student</span><span>Mode</span><span>Amount</span>
          <span className="text-right">Bank status</span>
        </div>
        {[
          ['A. Mohanty', 'UPI', 18000, 'SETTLED', 'bg-emerald-50 text-emerald-700'],
          ['S. Behera', 'Net banking', 22500, 'SETTLED', 'bg-emerald-50 text-emerald-700'],
          ['R. Das', 'Card', 15750, 'PENDING', 'bg-amber-50 text-amber-700'],
          ['P. Sahoo', 'UPI', 8400, 'SETTLED', 'bg-emerald-50 text-emerald-700'],
        ].map(([n, mode, amt, st, tone], i) => (
          <div
            key={n as string}
            className="grid grid-cols-[1.2fr_1fr_0.9fr_1fr] items-center border-b border-gray-50 px-2.5 py-[7px] text-[10px] last:border-0"
          >
            <span className="truncate font-medium text-gray-800">{n as string}</span>
            <span className="truncate text-gray-600">{mode as string}</span>
            <span className="mono-num text-gray-800">
              {i === 0 ? <Live value={inr(amt as number)} /> : inr(amt as number)}
            </span>
            <span className="text-right">{pill(st as string, tone as string)}</span>
          </div>
        ))}
      </div>

      <p className="mt-2 text-[9px] text-gray-400">
        Status comes from the bank — never typed in by hand.
      </p>
    </MockShell>
  );
}

/* ============================================================ outstanding */

export function OutstandingMock() {
  const [ref, t] = useLiveTick(2800);

  const rows = [
    { name: 'K. Patra', course: 'B.Sc · 2', due: 24500, days: 41 },
    { name: 'M. Jena', course: 'B.Pharm · 1', due: 18200, days: 28 },
    { name: 'T. Rout', course: 'Polytechnic · 3', due: 12750, days: 17 },
    { name: 'N. Swain', course: 'Nursing · 2', due: 9400, days: 9 },
  ].map((r) => {
    const days = r.days + t;
    return {
      ...r,
      days,
      tone:
        days > 45
          ? 'bg-red-50 text-red-600'
          : days > 25
            ? 'bg-amber-50 text-amber-700'
            : 'bg-gray-100 text-gray-500',
    };
  });

  const total = rows.reduce((n, r) => n + r.due, 0);

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="CAMPUS · ERP"
      module="Reports · Outstanding"
      nav={NAV}
      active="reports"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label="ageing" />}
    >
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        {['All institutes', 'B.Sc', 'Year 2', 'Section A'].map((f, i) => (
          <span
            key={f}
            className="rounded-full px-2 py-0.5 text-[9px] font-medium"
            style={i === 0 ? { background: TINT, color: ACCENT } : { background: '#F3F4F6', color: '#6B7280' }}
          >
            {f}
          </span>
        ))}
        <span className="ml-auto rounded-md border border-gray-200 px-2 py-0.5 text-[9px] text-gray-500">
          Export ▾
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.2fr_1fr_0.9fr_0.9fr] border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          <span>Student</span><span>Course</span><span>Due</span>
          <span className="text-right">Overdue</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.name}
            className="grid grid-cols-[1.2fr_1fr_0.9fr_0.9fr] items-center border-b border-gray-50 px-2.5 py-[7px] text-[10px] last:border-0"
          >
            <span className="truncate font-medium text-gray-800">{r.name}</span>
            <span className="truncate text-gray-600">{r.course}</span>
            <span className="mono-num text-gray-800">{inr(r.due)}</span>
            <span className="text-right">
              {pill(`${r.days}d`, r.tone)}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between bg-gray-50 px-2.5 py-1.5 text-[10px] font-bold text-gray-800">
          <span>Total outstanding</span>
          <span className="mono-num">{inr(total)}</span>
        </div>
      </div>
    </MockShell>
  );
}

/* ============================================================== accounting */

/**
 * The ledger posting itself.
 *
 * This is the claim the page makes that is hardest to believe — that a
 * receipt becomes a double entry with no bookkeeping step — so the screen
 * shows the entry rather than another KPI row.
 */
export function AccountingMock() {
  const [ref, t] = useLiveTick(2600);
  const mounted = useMounted();
  const amount = 18000 + ((t * 137) % 9) * 500;

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="CAMPUS · ERP"
      module="Accounting · Day book"
      nav={NAV}
      active="accounting"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label="auto-posting" />}
    >
      <div className="grid grid-cols-[1fr_1.2fr] gap-2">
        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <span className="mb-2 block text-[11px] font-bold text-gray-800">
            Receipt RC-00{4218 + (t % 9)}
          </span>
          {[
            ['Student', 'A. Mohanty'],
            ['Head', 'Tuition · Year 2'],
            ['Mode', 'UPI'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-gray-50 py-1 text-[10px] last:border-0">
              <span className="text-gray-500">{k}</span>
              <span className="font-medium text-gray-800">{v}</span>
            </div>
          ))}
          <div className="mt-2 flex justify-between border-t border-gray-200 pt-1.5 text-[11px] font-bold text-gray-900">
            <span>Amount</span>
            <Live value={inr(amount)} />
          </div>
          <div className="mt-2 flex items-center gap-1 text-[9px] font-semibold text-emerald-700">
            <CheckCircle2 size={10} /> Approved · posted
          </div>
        </div>

        <motion.div
          key={amount}
          initial={mounted ? { opacity: 0, y: 6 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border border-gray-200 bg-white p-2.5"
        >
          <span className="mb-2 block text-[11px] font-bold text-gray-800">
            Journal entry · auto
          </span>
          <div className="grid grid-cols-[1.6fr_0.8fr_0.8fr] border-b border-gray-100 pb-1 text-[9px] font-semibold uppercase text-gray-400">
            <span>Account</span>
            <span className="text-right">Debit</span>
            <span className="text-right">Credit</span>
          </div>
          {[
            ['Bank · UPI', inr(amount), ''],
            ['Tuition income', '', inr(amount)],
          ].map(([acc, dr, cr]) => (
            <div key={acc} className="grid grid-cols-[1.6fr_0.8fr_0.8fr] border-b border-gray-50 py-1.5 text-[10px]">
              <span className="truncate text-gray-700">{acc}</span>
              <span className="mono-num text-right text-gray-800">{dr}</span>
              <span className="mono-num text-right text-gray-800">{cr}</span>
            </div>
          ))}
          <div className="mt-1.5 flex items-center justify-between text-[10px] font-bold text-gray-900">
            <span>Balanced</span>
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 size={11} /> Dr = Cr
            </span>
          </div>
          <p className="mt-2 text-[9px] text-gray-400">
            Trial balance and P&amp;L update with it.
          </p>
        </motion.div>
      </div>
    </MockShell>
  );
}

/* ====================================================== phone — parent app */

export function PhonePortalMock() {
  const [ref, t] = useLiveTick(2400);
  const mounted = useMounted();
  const due = Math.max(0, 24500 - (t % 5) * 6125);
  const paid = 24500 - due;

  return (
    <div ref={ref} aria-hidden="true" className="bg-gray-50">
      <StatusBar />
      <div className="flex items-center justify-between bg-white px-4 pb-2">
        <span className="text-xs font-extrabold text-gray-800">Parent portal</span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ background: TINT, color: ACCENT }}
        >
          A. Mohanty
        </span>
      </div>

      <div className="h-[340px] space-y-2.5 overflow-hidden p-3">
        <div className="rounded-2xl p-3.5 text-white" style={{ background: ACCENT }}>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
            Fees due
          </div>
          <Live value={inr(due)} className="block text-2xl font-extrabold" />
          <div className="mt-1 text-[10px] text-white/80">
            B.Pharm · Year 2 · Science College
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/25">
            <motion.span
              className="block h-full rounded-full bg-white"
              animate={{ width: `${(paid / 24500) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        <button
          type="button"
          tabIndex={-1}
          className="w-full rounded-xl py-2.5 text-xs font-bold text-white"
          style={{ background: '#16a34a' }}
        >
          Pay now · {inr(due)}
        </button>

        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <span className="mb-1.5 block text-[11px] font-bold text-gray-800">Recent receipts</span>
          {[
            ['RC-004218', 'Tuition', 6125],
            ['RC-004201', 'Transport', 4200],
            ['RC-004177', 'Hostel', 8000],
          ].map(([no, head, amt], i) => (
            <motion.div
              key={no as string}
              initial={mounted ? { opacity: 0, y: -4 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: i * 0.04 }}
              className="flex items-center justify-between border-b border-gray-50 py-1.5 text-[10px] last:border-0"
            >
              <span className="min-w-0">
                <span className="block truncate font-medium text-gray-700">{head as string}</span>
                <span className="mono-num block text-[9px] text-gray-400">{no as string}</span>
              </span>
              <span className="mono-num font-semibold text-gray-800">{inr(amt as number)}</span>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {[
            [Users, 'Attendance'],
            [BookOpen, 'Results'],
            [Clock, 'Leave'],
          ].map(([Icon, label]) => {
            const I = Icon as typeof Users;
            return (
              <div
                key={label as string}
                className="rounded-xl border border-gray-200 bg-white px-1.5 py-2 text-center"
              >
                <I size={13} className="mx-auto" style={{ color: ACCENT }} />
                <span className="mt-1 block text-[9px] font-medium text-gray-600">
                  {label as string}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ===========================================================================
   SCREENS ADDED FOR THE PRODUCT EXPLORER
   ---------------------------------------------------------------------------
   The tabbed explorer on /solutions/education needs one screen per module,
   and five of the eight modules had none. Same rules as everything above:
   drawn in HTML, aria-hidden, every value derived arithmetically from the
   visibility-gated tick so server and first client render agree, and the
   indigo of the real product rather than the site's orange.

   The admissions screen is modelled column for column on the running
   Students list (see components/home/RealScreens.tsx, itself a recreation
   built from screenshots of the live product) so the explorer shows the same
   object an administrator logs into, inside the same frame as its siblings.
   =========================================================================== */

/* ============================================================== admissions */

export function AdmissionsMock() {
  const [ref, t] = useLiveTick(3000);
  const mounted = useMounted();

  const students = [
    ['Ananya Mohanty', 'ADM/2025/0418', 'B.Pharm · 2', 'General'],
    ['Soumya Behera', 'ADM/2025/0419', 'Nursing · 1', 'SC'],
    ['Rakesh Das', 'ADM/2024/0312', 'Polytechnic · 3', 'OBC'],
    ['Priya Sahoo', 'ADM/2025/0421', 'B.Sc · 1', 'General'],
  ] as const;

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="CAMPUS · ERP"
      module="Students · Onboarded"
      nav={NAV}
      active="students"
      accent={ACCENT}
      tint={TINT}
      search
      badge={<LiveDot label={`${842 + t} active`} />}
    >
      <div className="mb-2 flex items-center gap-1.5">
        {['All admission years', 'All courses', 'All categories'].map((f) => (
          <span
            key={f}
            className="hidden flex-1 truncate rounded-md border border-gray-200 bg-white px-2 py-1 text-[9px] text-gray-500 sm:block"
          >
            {f}
          </span>
        ))}
        <span
          className="ml-auto shrink-0 rounded-md px-2.5 py-1 text-[9px] font-semibold text-white"
          style={{ background: ACCENT }}
        >
          + Onboard student
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.3fr_1.2fr_1fr_0.7fr_0.8fr] border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          <span>Student</span>
          <span>Admission no</span>
          <span>Course</span>
          <span>Category</span>
          <span className="text-right">Status</span>
        </div>
        {students.map(([name, adm, course, cat], i) => (
          <motion.div
            key={adm}
            initial={mounted ? { opacity: 0, x: 6 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.26, delay: i * 0.035 }}
            className="grid grid-cols-[1.3fr_1.2fr_1fr_0.7fr_0.8fr] items-center border-b border-gray-50 px-2.5 py-[7px] text-[10px] last:border-0"
          >
            <span className="truncate font-medium text-gray-800">{name}</span>
            <span className="mono-num truncate text-gray-500">{adm}</span>
            <span className="truncate text-gray-600">{course}</span>
            <span className="truncate text-gray-600">{cat}</span>
            <span className="text-right">{pill('ACTIVE', 'bg-emerald-50 text-emerald-700')}</span>
          </motion.div>
        ))}
      </div>

      <p className="mt-2 text-[9px] text-gray-400">
        Guardian, hostel, transport and fee plan are all set in the same admission flow.
      </p>
    </MockShell>
  );
}

/* ======================================================= attendance & exams */

export function AttendanceExamMock() {
  const [ref, t] = useLiveTick(2700);
  const marked = Math.min(6, 2 + (t % 5));

  const classes = [
    { cls: 'B.Sc · 1 · A', present: 54, strength: 58 },
    { cls: 'B.Pharm · 2', present: 41, strength: 46 },
    { cls: 'Nursing · 1', present: 38, strength: 40 },
    { cls: 'Polytechnic · 3', present: 47, strength: 55 },
  ];

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="CAMPUS · ERP"
      module="Academics · Attendance & exams"
      nav={NAV}
      active="academics"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label={`${marked}/6 marked`} />}
    >
      <div className="grid gap-2 sm:grid-cols-[1.15fr_1fr]">
        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-800">Attendance today</span>
            <span className="text-[9px] text-gray-400">Class-wise</span>
          </div>
          {classes.map(({ cls, present, strength }) => {
            const pct = Math.round((present / strength) * 100);
            return (
              <div key={cls} className="mb-[7px] last:mb-0">
                <div className="mb-1 flex items-center justify-between text-[9.5px]">
                  <span className="truncate text-gray-600">{cls}</span>
                  <span className="mono-num text-gray-800">
                    {present}/{strength}
                  </span>
                </div>
                <span className="block h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <motion.span
                    className="block h-full rounded-full"
                    style={{ background: pct >= 85 ? '#16a34a' : '#d97706' }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </div>
            );
          })}
          <p className="mt-2 text-[9px] text-gray-400">
            Approved leave moves a student out of the absent count.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <span className="mb-2 block text-[11px] font-bold text-gray-800">
            Semester exam · B.Pharm 2
          </span>
          {[
            ['Form fill-up', '46 of 46 students', 'bg-emerald-50 text-emerald-700', 'DONE'],
            ['Exam fee', '44 of 46 collected', 'bg-amber-50 text-amber-700', '2 DUE'],
            ['Marks upload', '6 of 6 papers', 'bg-emerald-50 text-emerald-700', 'DONE'],
            ['Result', 'Awaiting declaration', 'bg-indigo-50 text-indigo-700', 'READY'],
          ].map(([step, detail, tone, tag]) => (
            <div
              key={step}
              className="flex items-center justify-between gap-2 border-b border-gray-50 py-[7px] text-[10px] last:border-0"
            >
              <span className="min-w-0">
                <span className="block truncate font-medium text-gray-800">{step}</span>
                <span className="block truncate text-[9px] text-gray-400">{detail}</span>
              </span>
              <span className="shrink-0">{pill(tag, tone)}</span>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

/* ============================================ hostel, transport and library */

export function CampusOpsMock() {
  const [ref, t] = useLiveTick(2900);
  const issued = 318 + t;

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="CAMPUS · ERP"
      module="Hostel · Transport · Library"
      nav={NAV}
      active="hostel"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label="fees linked" />}
    >
      <div className="mb-2.5 grid grid-cols-3 gap-2">
        <MockStat label="Beds allotted" value="214 / 260" Icon={BedDouble} tone={ACCENT} />
        <MockStat label="On transport" value="186" Icon={Bus} tone="#0891b2" />
        <MockStat label="Books issued" value={String(issued)} Icon={Library} tone="#7c3aed" />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <span className="mb-1.5 block text-[11px] font-bold text-gray-800">Hostel · Block B</span>
          {[
            ['B-104', 'A. Mohanty', 'ALLOTTED', 'bg-emerald-50 text-emerald-700'],
            ['B-107', 'S. Behera', 'ALLOTTED', 'bg-emerald-50 text-emerald-700'],
            ['B-112', 'Vacant', 'VACANT', 'bg-gray-100 text-gray-500'],
          ].map(([room, who, tag, tone]) => (
            <div
              key={room}
              className="grid grid-cols-[0.7fr_1.1fr_0.9fr] items-center gap-1 border-b border-gray-50 py-[7px] text-[10px] last:border-0"
            >
              <span className="mono-num text-gray-500">{room}</span>
              <span className="truncate text-gray-700">{who}</span>
              <span className="text-right">{pill(tag, tone)}</span>
            </div>
          ))}
          <p className="mt-1.5 text-[9px] text-gray-400">
            Allotment raises the hostel fee on the student ledger.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <span className="mb-1.5 block text-[11px] font-bold text-gray-800">Transport routes</span>
          {[
            ['R-02 · Patia', 42, 8400],
            ['R-05 · Jatni', 31, 10200],
            ['R-07 · Khordha', 24, 12000],
          ].map(([route, riders, fare]) => (
            <div
              key={route as string}
              className="grid grid-cols-[1.3fr_0.5fr_0.9fr] items-center border-b border-gray-50 py-[7px] text-[10px] last:border-0"
            >
              <span className="truncate text-gray-700">{route as string}</span>
              <span className="mono-num text-gray-500">{riders as number}</span>
              <span className="mono-num text-right text-gray-800">{inr(fare as number)}</span>
            </div>
          ))}
          <p className="mt-1.5 text-[9px] text-gray-400">
            Map a student to a stop and the fare follows onto the ledger.
          </p>
        </div>
      </div>
    </MockShell>
  );
}

/* ========================================================== staff & payroll */

export function PayrollMock() {
  const [ref, t] = useLiveTick(2600);
  const approved = Math.min(3, (t % 4) + 1);

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="CAMPUS · ERP"
      module="Staff · Payroll run"
      nav={NAV}
      active="staff"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label={`${approved}/3 approved`} />}
    >
      <div className="mb-2.5 grid grid-cols-3 gap-2">
        <MockStat label="Staff on roll" value="128" Icon={Users} tone={ACCENT} />
        <MockStat label="Payslips drafted" value="128" Icon={CheckCircle2} tone="#16a34a" />
        <MockStat
          label="Awaiting approval"
          value={String(3 - approved)}
          Icon={Clock}
          tone="#d97706"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.3fr_1fr_0.9fr_0.9fr] border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          <span>Staff</span>
          <span>Role</span>
          <span>Net pay</span>
          <span className="text-right">Status</span>
        </div>
        {[
          ['B. Pradhan', 'Lecturer', 48200],
          ['M. Nayak', 'Lab assistant', 26400],
          ['K. Mishra', 'Accountant', 34800],
        ].map(([name, role, net], i) => {
          const done = i < approved;
          return (
            <div
              key={name as string}
              className="grid grid-cols-[1.3fr_1fr_0.9fr_0.9fr] items-center border-b border-gray-50 px-2.5 py-[7px] text-[10px] last:border-0"
            >
              <span className="truncate font-medium text-gray-800">{name as string}</span>
              <span className="truncate text-gray-600">{role as string}</span>
              <span className="mono-num text-gray-800">{inr(net as number)}</span>
              <span className="text-right">
                {pill(
                  done ? 'APPROVED' : 'PENDING',
                  done ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                )}
              </span>
            </div>
          );
        })}
        <div className="flex items-center justify-between bg-gray-50 px-2.5 py-1.5 text-[10px] font-bold text-gray-800">
          <span>Bank disbursement file</span>
          <span className="flex items-center gap-1 font-medium text-gray-500">
            <Clock size={10} /> Released after approval
          </span>
        </div>
      </div>

      <p className="mt-2 text-[9px] text-gray-400">
        Attendance and approved leave feed the run, under the same maker-checker rule as fees.
      </p>
    </MockShell>
  );
}

/* ================================================== multi-institution group */

export function MultiInstituteMock() {
  const [ref, t] = useLiveTick(3000);

  const institutes = [
    { name: 'Science College', students: 842, collected: 1842000, due: 486000 },
    { name: 'Polytechnic', students: 614, collected: 1264000, due: 392000 },
    { name: 'Nursing Institute', students: 318, collected: 708000, due: 174000 },
    { name: 'Pharmacy Institute', students: 286, collected: 642000, due: 88000 },
  ].map((r, i) => ({ ...r, collected: r.collected + (i === 0 ? t * 5200 : 0) }));

  const totalStudents = institutes.reduce((n, r) => n + r.students, 0);
  const totalCollected = institutes.reduce((n, r) => n + r.collected, 0);

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="CAMPUS · ERP"
      module="Group · All institutes"
      nav={NAV}
      active="dashboard"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label="4 institutes" />}
    >
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <span
          className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[9px] font-semibold"
          style={{ background: TINT, color: ACCENT }}
        >
          <Building2 size={10} /> All institutes
        </span>
        <span className="text-[9px] text-gray-400">
          Switch to one institute to work inside it
        </span>
      </div>

      <div className="mb-2.5 grid grid-cols-2 gap-2">
        <MockStat
          label="Students, group-wide"
          value={String(totalStudents)}
          Icon={GraduationCap}
          tone={ACCENT}
        />
        <MockStat
          label="Collected this month"
          value={lakh(totalCollected)}
          Icon={IndianRupee}
          tone="#16a34a"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.4fr_0.7fr_0.9fr_0.9fr] border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          <span>Institute</span>
          <span>Students</span>
          <span>Collected</span>
          <span className="text-right">Outstanding</span>
        </div>
        {institutes.map((r) => (
          <div
            key={r.name}
            className="grid grid-cols-[1.4fr_0.7fr_0.9fr_0.9fr] items-center border-b border-gray-50 px-2.5 py-[7px] text-[10px] last:border-0"
          >
            <span className="truncate font-medium text-gray-800">{r.name}</span>
            <span className="mono-num text-gray-600">{r.students}</span>
            <span className="mono-num text-gray-800">{lakh(r.collected)}</span>
            <span className="mono-num text-right text-red-600">{lakh(r.due)}</span>
          </div>
        ))}
      </div>

      <p className="mt-2 flex items-center gap-1 text-[9px] text-gray-400">
        <AlertTriangle size={9} /> Each institute keeps its own records; only group roles see
        this consolidated view.
      </p>
    </MockShell>
  );
}
