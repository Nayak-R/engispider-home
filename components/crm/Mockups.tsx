'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, UserPlus, FileText, Receipt, RefreshCw,
  ListChecks, BarChart3, IndianRupee, TrendingUp, Phone, CheckCircle2,
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
 * Engispider CRM — product screens.
 *
 * Modelled on the running product, whose own navigation reads Dashboard,
 * Leads, Customers, Quotations, Invoices, Subscriptions, Bank Accounts,
 * Master Items, Tasks and Reports. That matters: this is not a
 * lead-tracker with a pipeline board bolted on — it quotes, invoices and
 * bills recurring revenue, and the screens say so.
 *
 * The rail is navy because the real one is. Chrome, liveness and
 * proportions come from components/mock/Chrome, so these behave like every
 * other product's: a 112px rail, one timer at a time, nothing animating
 * under reduced motion, no inline opacity:0, all aria-hidden.
 *
 * Figures are illustrative demo-tenant data.
 */

const ACCENT = '#1D4ED8';
const TINT = '#EFF6FF';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { key: 'leads', label: 'Leads', Icon: UserPlus },
  { key: 'customers', label: 'Customers', Icon: Users },
  { key: 'quotations', label: 'Quotations', Icon: FileText },
  { key: 'invoices', label: 'Invoices', Icon: Receipt },
  { key: 'subscriptions', label: 'Subscriptions', Icon: RefreshCw },
  { key: 'tasks', label: 'Tasks', Icon: ListChecks },
  { key: 'reports', label: 'Reports', Icon: BarChart3 },
];

const pill = (t: string, c: string) => (
  <span className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${c}`}>{t}</span>
);

export { BrowserFrame, PhoneFrame };

/* ================================================================ pipeline */

export function PipelineMock() {
  const [ref, t] = useLiveTick(2500);

  const stages = [
    { name: 'New', count: 38, value: 1840000, tone: '#94a3b8' },
    { name: 'Qualified', count: 21, value: 1260000, tone: '#0ea5e9' },
    { name: 'Quoted', count: 12, value: 920000, tone: ACCENT },
    { name: 'Negotiation', count: 6, value: 540000, tone: '#d97706' },
    { name: 'Won', count: 3 + (t % 3), value: 318000 + t * 14000, tone: '#16a34a' },
  ];
  const max = Math.max(...stages.map((s) => s.count));
  const open = stages.slice(0, 4).reduce((n, s) => n + s.value, 0);

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="CRM"
      module="Leads · Pipeline"
      nav={NAV}
      active="leads"
      accent={ACCENT}
      tint={TINT}
      rail="dark"
      badge={<LiveDot />}
    >
      <div className="mb-2.5 grid grid-cols-3 gap-2">
        <MockStat label="Open pipeline" value={`₹${(open / 100000).toFixed(1)}L`} Icon={TrendingUp} tone={ACCENT} />
        <MockStat label="Won this month" value={inr(stages[4].value)} Icon={CheckCircle2} tone="#16a34a" />
        <MockStat label="Stalled > 14d" value="7" Icon={Phone} tone="#dc2626" />
      </div>

      <div className="space-y-1.5">
        {stages.map((s) => (
          <div key={s.name} className="rounded-xl border border-gray-200 bg-white p-2">
            <div className="mb-1 flex items-center justify-between text-[10px]">
              <span className="font-medium text-gray-700">{s.name}</span>
              <span className="flex items-center gap-2">
                <Live value={String(s.count)} className="mono-num font-bold text-gray-900" />
                <span className="mono-num text-[9px] text-gray-400">{inr(s.value)}</span>
              </span>
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
    </MockShell>
  );
}

/* ============================================================== quotations */

export function QuotationMock() {
  const [ref, t] = useLiveTick(2600);
  const mounted = useMounted();

  const rows = [
    { no: 'ES/Q/2026-27/008', who: 'Orevia Cafe', amt: 141600 },
    { no: 'ES/Q/2026-27/007', who: 'RJ Logistic', amt: 24780 },
    { no: 'ES/Q/2026-27/006', who: 'Pixelr', amt: 17700 },
    { no: 'ES/Q/2026-27/005', who: 'Rupal Infra', amt: 49560 },
  ].map((r, i) => {
    const state = (t + i) % 4;
    return {
      ...r,
      status: state === 0 ? 'DRAFT' : state === 3 ? 'ACCEPTED' : 'SENT',
      tone:
        state === 0
          ? 'bg-gray-100 text-gray-500'
          : state === 3
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-blue-50 text-blue-700',
    };
  });
  const accepted = rows.filter((r) => r.status === 'ACCEPTED').length;

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="CRM"
      module="Quotations"
      nav={NAV}
      active="quotations"
      accent={ACCENT}
      tint={TINT}
      rail="dark"
      badge={<LiveDot label={`${accepted} accepted`} />}
    >
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.5fr_1.1fr_1fr_0.9fr] border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          <span>Quotation</span><span>Customer</span><span>Value</span>
          <span className="text-right">Status</span>
        </div>
        {rows.map((r, i) => (
          <motion.div
            key={r.no}
            initial={mounted ? { opacity: 0, x: 6 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.26, delay: i * 0.03 }}
            className="grid grid-cols-[1.5fr_1.1fr_1fr_0.9fr] items-center border-b border-gray-50 px-2.5 py-[8px] text-[10px] last:border-0"
          >
            <span className="mono-num truncate text-gray-500">{r.no}</span>
            <span className="truncate font-medium text-gray-800">{r.who}</span>
            <span className="mono-num text-gray-800">{inr(r.amt)}</span>
            <span className="text-right">{pill(r.status, r.tone)}</span>
          </motion.div>
        ))}
      </div>

      <p className="mt-2 text-[9px] text-gray-400">
        An accepted quotation becomes the invoice — the figures are not retyped.
      </p>
    </MockShell>
  );
}

/* =========================================================== subscriptions */

export function SubscriptionMock() {
  const [ref, t] = useLiveTick(2800);
  const mrr = 412000 + t * 2400;

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="CRM"
      module="Subscriptions · Recurring"
      nav={NAV}
      active="subscriptions"
      accent={ACCENT}
      tint={TINT}
      rail="dark"
      badge={<LiveDot label="billing" />}
    >
      <div className="mb-2.5 grid grid-cols-3 gap-2">
        <MockStat label="Monthly recurring" value={`₹${(mrr / 100000).toFixed(2)}L`} Icon={IndianRupee} tone="#16a34a" />
        <MockStat label="Active plans" value={String(34 + (t % 4))} Icon={RefreshCw} tone={ACCENT} />
        <MockStat label="Renewing in 7d" value="6" Icon={Receipt} tone="#d97706" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.3fr_1fr_0.9fr_1fr] border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          <span>Customer</span><span>Cycle</span><span>Amount</span>
          <span className="text-right">Next invoice</span>
        </div>
        {[
          ['Orevia Cafe', 'Monthly', 11800, '01 Nov'],
          ['RJ Logistic', 'Quarterly', 35400, '14 Nov'],
          ['Pixelr', 'Monthly', 8260, '01 Nov'],
          ['Rupal Infra', 'Annual', 141600, '22 Mar'],
        ].map(([who, cycle, amt, next], i) => (
          <div
            key={who as string}
            className="grid grid-cols-[1.3fr_1fr_0.9fr_1fr] items-center border-b border-gray-50 px-2.5 py-[8px] text-[10px] last:border-0"
          >
            <span className="truncate font-medium text-gray-800">{who as string}</span>
            <span className="truncate text-gray-600">{cycle as string}</span>
            <span className="mono-num text-gray-800">
              {i === 0 ? <Live value={inr(amt as number)} /> : inr(amt as number)}
            </span>
            <span className="mono-num text-right text-gray-500">{next as string}</span>
          </div>
        ))}
      </div>

      <p className="mt-2 text-[9px] text-gray-400">
        Invoices raise themselves on the cycle — nobody diarises a renewal.
      </p>
    </MockShell>
  );
}

/* =================================================================== tasks */

export function TasksMock() {
  const [ref, t] = useLiveTick(2400);

  const rows = [
    { what: 'Call back — pricing query', who: 'Orevia Cafe', due: 'Today 15:00', kind: 'CALL' },
    { what: 'Send revised quotation', who: 'RJ Logistic', due: 'Today 17:30', kind: 'QUOTE' },
    { what: 'Follow up on proposal', who: 'Pixelr', due: 'Tomorrow', kind: 'EMAIL' },
    { what: 'Renewal conversation', who: 'Rupal Infra', due: 'Fri', kind: 'CALL' },
  ].map((r, i) => ({ ...r, done: (t + i) % 5 === 4 }));

  const open = rows.filter((r) => !r.done).length;

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="CRM"
      module="Tasks · Today"
      nav={NAV}
      active="tasks"
      accent={ACCENT}
      tint={TINT}
      rail="dark"
      badge={<LiveDot label={`${open} open`} />}
    >
      <div className="space-y-1.5">
        {rows.map((r) => (
          <div
            key={r.what}
            className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white p-2.5"
          >
            <span
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full border"
              style={
                r.done
                  ? { background: '#16a34a', borderColor: '#16a34a' }
                  : { borderColor: '#cbd5e1' }
              }
            >
              {r.done && <CheckCircle2 size={11} className="text-white" />}
            </span>
            <span className="min-w-0 flex-1">
              <span
                className={`block truncate text-[10.5px] font-medium ${
                  r.done ? 'text-gray-400 line-through' : 'text-gray-800'
                }`}
              >
                {r.what}
              </span>
              <span className="block truncate text-[9px] text-gray-500">{r.who}</span>
            </span>
            <span className="shrink-0 text-right">
              {pill(r.kind, 'bg-blue-50 text-blue-700')}
              <span className="mt-0.5 block text-[9px] text-gray-400">{r.due}</span>
            </span>
          </div>
        ))}
      </div>

      <p className="mt-2 text-[9px] text-gray-400">
        Every call and email is logged against the customer, not a notebook.
      </p>
    </MockShell>
  );
}

/* ================================================== phone — CRM on the move */

export function PhoneCrmMock() {
  const [ref, t] = useLiveTick(2300);
  const mounted = useMounted();
  const won = 318000 + t * 14000;

  return (
    <div ref={ref} aria-hidden="true" className="bg-gray-50">
      <StatusBar />
      <div className="flex items-center justify-between bg-white px-4 pb-2">
        <span className="text-xs font-extrabold text-gray-800">My pipeline</span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ background: TINT, color: ACCENT }}
        >
          This month
        </span>
      </div>

      <div className="h-[340px] space-y-2.5 overflow-hidden p-3">
        <div className="rounded-2xl p-3.5 text-white" style={{ background: ACCENT }}>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
            Closed won
          </div>
          <Live value={inr(won)} className="block text-2xl font-extrabold" />
          <div className="mt-1 text-[10px] text-white/80">3 deals · 12 still open</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <span className="mb-1.5 block text-[11px] font-bold text-gray-800">Due today</span>
          {[
            ['Call — Orevia Cafe', '15:00'],
            ['Quotation — RJ Logistic', '17:30'],
            ['Email — Pixelr', '18:00'],
          ].map(([what, when], i) => (
            <motion.div
              key={what as string}
              initial={mounted ? { opacity: 0, y: -4 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: i * 0.04 }}
              className="flex items-center justify-between border-b border-gray-50 py-1.5 text-[10px] last:border-0"
            >
              <span className="truncate text-gray-700">{what as string}</span>
              <span className="mono-num shrink-0 text-gray-500">{when as string}</span>
            </motion.div>
          ))}
        </div>

        <button
          type="button"
          tabIndex={-1}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold text-white"
          style={{ background: '#16a34a' }}
        >
          <Phone size={13} /> Log a call
        </button>
      </div>
    </div>
  );
}
