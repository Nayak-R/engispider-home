'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, Fingerprint, CalendarCheck, Wallet, BarChart3,
  UserPlus, CheckCircle2, Clock, IndianRupee, Building2,
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
 * Engispider HRMS — product screens.
 *
 * Chrome, liveness and proportions come from components/mock/Chrome, so
 * these behave exactly like the restaurant and campus screens: a 112px
 * rail, one timer at a time, nothing animating under reduced motion, and
 * no inline opacity:0 in the static HTML.
 *
 * Violet, because that is the colour of the real product — the same
 * #4F46E5/#7C3AED the live dashboard uses. Recolouring it to the site's
 * orange would misrepresent what an HR manager logs into.
 *
 * Figures are illustrative demo-tenant data and assert nothing about any
 * employer. In particular there are no efficiency percentages here: the
 * page this replaced claimed "70% time saved" and "99.9% payroll
 * accuracy", neither of which anyone had measured.
 */

const ACCENT = '#6D28D9';
const TINT = '#F5F3FF';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { key: 'employees', label: 'Employees', Icon: Users },
  { key: 'attendance', label: 'Attendance', Icon: Fingerprint },
  { key: 'leave', label: 'Leave', Icon: CalendarCheck },
  { key: 'payroll', label: 'Payroll', Icon: Wallet },
  { key: 'hiring', label: 'Hiring', Icon: UserPlus },
  { key: 'reports', label: 'Reports', Icon: BarChart3 },
];

const pill = (t: string, c: string) => (
  <span className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${c}`}>{t}</span>
);

export { BrowserFrame, PhoneFrame };

/* ============================================================= attendance */

/**
 * The biometric ledger.
 *
 * Punches arrive from the device through the morning, which is the point
 * the product turns on — a reader should see rows land rather than read
 * that integration exists.
 */
export function AttendanceMock() {
  const [ref, t] = useLiveTick(2200);
  const mounted = useMounted();

  const staff = [
    { name: 'Anita Sahoo', id: 'EMP-1184', in: '09:02' },
    { name: 'Vikram Patra', id: 'EMP-0921', in: '09:04' },
    { name: 'Sana Khatun', id: 'EMP-1402', in: '09:11' },
    { name: 'Rohit Nayak', id: 'EMP-0657', in: '09:18' },
    { name: 'Meera Das', id: 'EMP-1130', in: '09:26' },
  ];
  const marked = Math.min(staff.length, 1 + (t % staff.length));
  const present = 212 + marked;

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="HRMS"
      module="Attendance · Today"
      nav={NAV}
      active="attendance"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label="device sync" />}
    >
      <div className="mb-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <MockStat label="Present" value={String(present)} Icon={CheckCircle2} tone="#16a34a" />
        <MockStat label="On leave" value="9" Icon={CalendarCheck} tone="#d97706" />
        <MockStat label="Late" value={String(2 + (t % 3))} Icon={Clock} tone="#dc2626" />
        <MockStat label="Headcount" value="248" Icon={Users} tone={ACCENT} />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.3fr_1fr_0.8fr_0.9fr] border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          <span>Employee</span><span>ID</span><span>In</span>
          <span className="text-right">Source</span>
        </div>
        {staff.map((s, i) => {
          const done = i < marked;
          return (
            <motion.div
              key={s.id}
              initial={mounted && done ? { opacity: 0, x: 6 } : false}
              animate={{ opacity: done ? 1 : 0.35, x: 0 }}
              transition={{ duration: 0.28 }}
              className="grid grid-cols-[1.3fr_1fr_0.8fr_0.9fr] items-center border-b border-gray-50 px-2.5 py-[7px] text-[10px] last:border-0"
            >
              <span className="truncate font-medium text-gray-800">{s.name}</span>
              <span className="mono-num truncate text-gray-500">{s.id}</span>
              <span className="mono-num text-gray-800">{done ? s.in : '—'}</span>
              <span className="text-right">
                {done
                  ? pill('BIOMETRIC', 'bg-violet-50 text-violet-700')
                  : pill('WAITING', 'bg-gray-100 text-gray-400')}
              </span>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-2 text-[9px] text-gray-400">
        Punches come from the device — the ledger is not typed up afterwards.
      </p>
    </MockShell>
  );
}

/* ================================================================ payroll */

export function PayrollMock() {
  const [ref, t] = useLiveTick(2600);
  const processed = Math.min(248, 180 + t * 9);
  const pct = Math.round((processed / 248) * 100);
  const gross = 7420000 + t * 18000;
  const deductions = Math.round(gross * 0.168);

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="HRMS"
      module="Payroll · October run"
      nav={NAV}
      active="payroll"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label="processing" />}
    >
      <div className="mb-2.5 rounded-xl border border-gray-200 bg-white p-2.5">
        <div className="mb-1.5 flex items-center justify-between text-[10px]">
          <span className="font-bold text-gray-800">Payslips generated</span>
          <Live value={`${processed} / 248`} className="mono-num text-gray-700" />
        </div>
        <span className="block h-2 overflow-hidden rounded-full bg-gray-100">
          <motion.span
            className="block h-full rounded-full"
            style={{ background: ACCENT }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </span>
      </div>

      <div className="mb-2.5 grid grid-cols-3 gap-2">
        <MockStat label="Gross" value={`₹${(gross / 100000).toFixed(1)}L`} Icon={IndianRupee} tone={ACCENT} />
        <MockStat label="Deductions" value={`₹${(deductions / 100000).toFixed(1)}L`} Icon={BarChart3} tone="#d97706" />
        <MockStat label="Net payable" value={`₹${((gross - deductions) / 100000).toFixed(1)}L`} Icon={Wallet} tone="#16a34a" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr] border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          <span>Component</span><span className="text-right">EPF</span>
          <span className="text-right">ESI</span><span className="text-right">TDS</span>
        </div>
        {[
          ['Statutory deduction', '12%', '0.75%', 'As slab'],
          ['Employer share', '13%', '3.25%', '—'],
        ].map(([a, b2, c, d]) => (
          <div
            key={a}
            className="grid grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr] items-center border-b border-gray-50 px-2.5 py-[7px] text-[10px] last:border-0"
          >
            <span className="truncate text-gray-700">{a}</span>
            <span className="mono-num text-right text-gray-800">{b2}</span>
            <span className="mono-num text-right text-gray-800">{c}</span>
            <span className="mono-num text-right text-gray-800">{d}</span>
          </div>
        ))}
      </div>

      <p className="mt-2 text-[9px] text-gray-400">
        Rates are configured per employer — shown here as an example run.
      </p>
    </MockShell>
  );
}

/* =================================================================== leave */

export function LeaveMock() {
  const [ref, t] = useLiveTick(2500);

  const rows = [
    { name: 'Anita Sahoo', type: 'Casual', days: 2, bal: 6 },
    { name: 'Vikram Patra', type: 'Sick', days: 1, bal: 9 },
    { name: 'Sana Khatun', type: 'Earned', days: 5, bal: 12 },
    { name: 'Rohit Nayak', type: 'Casual', days: 1, bal: 4 },
  ].map((r, i) => {
    const state = (t + i) % 4;
    return {
      ...r,
      status: state < 2 ? 'PENDING' : 'APPROVED',
      tone: state < 2 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700',
    };
  });
  const pending = rows.filter((r) => r.status === 'PENDING').length;

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="HRMS"
      module="Leave · Approvals"
      nav={NAV}
      active="leave"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label={`${pending} pending`} />}
    >
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.3fr_0.9fr_0.6fr_0.7fr_0.9fr] border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          <span>Employee</span><span>Type</span><span>Days</span><span>Balance</span>
          <span className="text-right">Status</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.name}
            className="grid grid-cols-[1.3fr_0.9fr_0.6fr_0.7fr_0.9fr] items-center border-b border-gray-50 px-2.5 py-[9px] text-[10px] last:border-0"
          >
            <span className="truncate font-medium text-gray-800">{r.name}</span>
            <span className="truncate text-gray-600">{r.type}</span>
            <span className="mono-num text-gray-800">{r.days}</span>
            <span className="mono-num text-gray-500">{r.bal}</span>
            <span className="text-right">{pill(r.status, r.tone)}</span>
          </div>
        ))}
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {[
          ['Casual', 12, '#6D28D9'],
          ['Sick', 10, '#0ea5e9'],
          ['Earned', 18, '#16a34a'],
        ].map(([label, total, tone]) => (
          <div key={label as string} className="rounded-xl border border-gray-200 bg-white p-2.5">
            <div className="text-[10px] text-gray-500">{label as string}</div>
            <div className="mono-num mt-0.5 text-sm font-extrabold text-gray-900">
              {total as number} <span className="text-[10px] font-medium text-gray-400">days/yr</span>
            </div>
            <span className="mt-1.5 block h-1 w-10 rounded-full" style={{ background: tone as string }} />
          </div>
        ))}
      </div>
    </MockShell>
  );
}

/* ================================================= phone — self-service */

export function PhoneSelfServiceMock() {
  const [ref, t] = useLiveTick(2400);
  const mounted = useMounted();
  const mins = 252 + t;
  const worked = `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, '0')}m`;

  return (
    <div ref={ref} aria-hidden="true" className="bg-gray-50">
      <StatusBar />
      <div className="flex items-center justify-between bg-white px-4 pb-2">
        <span className="text-xs font-extrabold text-gray-800">My HR</span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ background: TINT, color: ACCENT }}
        >
          EMP-1184
        </span>
      </div>

      <div className="h-[340px] space-y-2.5 overflow-hidden p-3">
        <div className="rounded-2xl p-3.5 text-white" style={{ background: ACCENT }}>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
            Clocked in 09:02
          </div>
          <Live value={worked} className="block text-2xl font-extrabold" />
          <div className="mt-1 text-[10px] text-white/80">Anita Sahoo · Operations</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            ['Leave balance', '6 days'],
            ['This month', '21 / 23'],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl border border-gray-200 bg-white p-2.5">
              <div className="text-[10px] text-gray-500">{l}</div>
              <div className="mono-num mt-0.5 text-base font-extrabold text-gray-900">{v}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <span className="mb-1.5 block text-[11px] font-bold text-gray-800">Payslips</span>
          {[
            ['October 2026', 48200],
            ['September 2026', 48200],
            ['August 2026', 46900],
          ].map(([m, amt], i) => (
            <motion.div
              key={m as string}
              initial={mounted ? { opacity: 0, y: -4 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: i * 0.04 }}
              className="flex items-center justify-between border-b border-gray-50 py-1.5 text-[10px] last:border-0"
            >
              <span className="truncate text-gray-700">{m as string}</span>
              <span className="mono-num font-semibold text-gray-800">{inr(amt as number)}</span>
            </motion.div>
          ))}
        </div>

        <button
          type="button"
          tabIndex={-1}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-bold"
          style={{ color: ACCENT }}
        >
          Apply for leave
        </button>
      </div>
    </div>
  );
}

/* ================================================================ hiring */

export function HiringMock() {
  const [ref, t] = useLiveTick(2700);

  const stages = [
    { name: 'Applied', count: 64, tone: '#94a3b8' },
    { name: 'Screened', count: 28, tone: '#0ea5e9' },
    { name: 'Interview', count: 11, tone: '#6D28D9' },
    { name: 'Offer', count: 4, tone: '#d97706' },
    { name: 'Onboarded', count: 2 + (t % 3), tone: '#16a34a' },
  ];
  const max = Math.max(...stages.map((s) => s.count));

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="HRMS"
      module="Hiring · Pipeline"
      nav={NAV}
      active="hiring"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label="3 roles open" />}
    >
      <div className="space-y-2">
        {stages.map((s) => (
          <div key={s.name} className="rounded-xl border border-gray-200 bg-white p-2.5">
            <div className="mb-1.5 flex items-center justify-between text-[10px]">
              <span className="font-medium text-gray-700">{s.name}</span>
              <Live value={String(s.count)} className="mono-num font-bold text-gray-900" />
            </div>
            <span className="block h-1.5 overflow-hidden rounded-full bg-gray-100">
              <motion.span
                className="block h-full rounded-full"
                style={{ background: s.tone }}
                animate={{ width: `${(s.count / max) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </div>
        ))}
      </div>

      <p className="mt-2 flex items-center gap-1.5 text-[9px] text-gray-400">
        <Building2 size={10} /> An onboarded candidate becomes an employee record — no re-typing.
      </p>
    </MockShell>
  );
}
