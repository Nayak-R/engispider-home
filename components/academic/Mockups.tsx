'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard, GraduationCap, Wallet, BookOpen, BedDouble, BarChart3,
  IndianRupee, Users, TrendingUp, CheckCircle2, Clock, Landmark, Bus,
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
  { key: 'hostel', label: 'Hostel', Icon: BedDouble },
  { key: 'transport', label: 'Transport', Icon: Bus },
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
