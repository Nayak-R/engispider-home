'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard, Pill, Receipt, FileText, CalendarX2, BarChart3,
  Stethoscope, AlertTriangle, IndianRupee, TrendingUp, ShieldAlert,
} from 'lucide-react';
import {
  BrowserFrame,
  PhoneFrame,
  MockShell,
  MockStat,
  LiveDot,
  Live,
  useLiveTick,
  useMounted,
  type NavItem,
} from '@/components/mock/Chrome';

/*
 * Engispider Pharmacy — product screens.
 *
 * Chrome, liveness and proportions come from components/mock/Chrome: a
 * 112px rail, one timer at a time, nothing animating under reduced
 * motion, no inline opacity:0, all aria-hidden.
 *
 * Drug names here are generic molecules, not brands, and the figures are
 * illustrative demo-tenant data. Nothing on these screens is clinical
 * advice or a real interaction table — the interaction panel shows that
 * the check exists, not what any particular check returns.
 */

const ACCENT = '#0D9488';
const TINT = '#F0FDFA';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { key: 'billing', label: 'Billing', Icon: Receipt },
  { key: 'drugs', label: 'Drugs', Icon: Pill },
  { key: 'expiry', label: 'Expiry', Icon: CalendarX2 },
  { key: 'rx', label: 'Prescriptions', Icon: FileText },
  { key: 'doctors', label: 'Doctors', Icon: Stethoscope },
  { key: 'reports', label: 'Reports', Icon: BarChart3 },
];

const pill = (t: string, c: string) => (
  <span className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${c}`}>{t}</span>
);

export { BrowserFrame, PhoneFrame };

/* ================================================================ billing */

export function BillingMock() {
  const [ref, t] = useLiveTick(2000);
  const mounted = useMounted();

  const lines = [
    { name: 'Paracetamol 500mg', batch: 'B-4417', exp: '08/27', qty: 10, rate: 1.8 },
    { name: 'Amoxicillin 250mg', batch: 'A-2290', exp: '03/27', qty: 15, rate: 6.4 },
    { name: 'Cetirizine 10mg', batch: 'C-8821', exp: '11/27', qty: 10, rate: 2.1 },
    { name: 'ORS Sachet', batch: 'O-1043', exp: '01/28', qty: 5, rate: 18.0 },
  ];
  const shown = lines.slice(0, (t % 4) + 1);
  const sub = shown.reduce((n, l) => n + l.qty * l.rate, 0);
  const gst = sub * 0.12;

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="PHARMACY"
      module="Billing · Counter"
      nav={NAV}
      active="billing"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label="counter open" />}
    >
      <div className="grid grid-cols-1 gap-2 sm:h-full sm:grid-cols-5">
        <div className="min-w-0 sm:col-span-3">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="grid grid-cols-[1.6fr_0.9fr_0.6fr_0.8fr] border-b border-gray-100 px-2 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
              <span>Medicine</span><span>Batch / Exp</span><span>Qty</span>
              <span className="text-right">Amount</span>
            </div>
            {shown.map((l, i) => (
              <motion.div
                key={l.batch}
                initial={mounted ? { opacity: 0, x: 6 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.26, delay: i * 0.03 }}
                className="grid grid-cols-[1.6fr_0.9fr_0.6fr_0.8fr] items-center border-b border-gray-50 px-2 py-[7px] text-[10px] last:border-0"
              >
                <span className="truncate font-medium text-gray-800">{l.name}</span>
                <span className="mono-num truncate text-[9px] text-gray-500">
                  {l.batch} · {l.exp}
                </span>
                <span className="mono-num text-gray-700">{l.qty}</span>
                <span className="mono-num text-right text-gray-800">
                  {inr(Math.round(l.qty * l.rate))}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="mt-1.5 text-[9px] text-gray-400">
            Batch and expiry are picked with the medicine — not typed on the bill.
          </p>
        </div>

        <div className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-2.5 sm:col-span-2">
          <span className="mb-1.5 text-[11px] font-bold text-gray-800">Bill</span>
          {[
            ['Subtotal', inr(Math.round(sub))],
            ['CGST 6%', inr(Math.round(gst / 2))],
            ['SGST 6%', inr(Math.round(gst / 2))],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-[3px] text-[10px] text-gray-600">
              <span>{k}</span>
              <span className="mono-num">{v}</span>
            </div>
          ))}
          <div className="mt-1.5 flex justify-between border-t border-gray-200 pt-1.5 text-[11px] font-bold text-gray-900">
            <span>Total</span>
            <Live value={inr(Math.round(sub + gst))} />
          </div>
          <div className="mt-auto space-y-1 pt-2">
            {['Cash', 'UPI', 'Card'].map((m, i) => (
              <span
                key={m}
                className="block rounded-md py-1 text-center text-[10px] font-semibold"
                style={i === 1 ? { background: ACCENT, color: '#fff' } : { background: '#F3F4F6', color: '#6B7280' }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MockShell>
  );
}

/* ================================================================= expiry */

/**
 * The expiry board.
 *
 * This is the screen that pays for the system: stock that quietly passes
 * its date is money a medical store writes off every quarter. Rows age
 * towards red while you watch.
 */
export function ExpiryMock() {
  const [ref, t] = useLiveTick(2600);

  const rows = [
    { name: 'Amoxicillin 250mg', batch: 'A-2290', qty: 180, days: 54 },
    { name: 'Azithromycin 500mg', batch: 'Z-7712', qty: 64, days: 31 },
    { name: 'Cough Syrup 100ml', batch: 'S-3390', qty: 22, days: 12 },
    { name: 'Insulin Pen', batch: 'I-0098', qty: 9, days: 4 },
  ].map((r) => {
    const days = Math.max(0, r.days - t);
    const tone = days <= 7 ? '#dc2626' : days <= 35 ? '#d97706' : ACCENT;
    const label = days === 0 ? 'EXPIRED' : days <= 7 ? 'URGENT' : days <= 35 ? 'NEAR' : 'OK';
    return { ...r, days, tone, label };
  });

  const atRisk = rows.filter((r) => r.days <= 35).reduce((n, r) => n + r.qty, 0);

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="PHARMACY"
      module="Expiry · Watchlist"
      nav={NAV}
      active="expiry"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label="ageing" />}
    >
      <div className="mb-2.5 grid grid-cols-3 gap-2">
        <MockStat label="Units at risk" value={String(atRisk)} Icon={AlertTriangle} tone="#d97706" />
        <MockStat label="Expiring in 7d" value={String(rows.filter(r => r.days <= 7).length)} Icon={CalendarX2} tone="#dc2626" />
        <MockStat label="Value at risk" value="₹46,800" Icon={IndianRupee} tone={ACCENT} />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.5fr_0.9fr_0.6fr_0.9fr] border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          <span>Medicine</span><span>Batch</span><span>Qty</span>
          <span className="text-right">Expires in</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.batch}
            className="grid grid-cols-[1.5fr_0.9fr_0.6fr_0.9fr] items-center border-b border-gray-50 px-2.5 py-[8px] text-[10px] last:border-0"
          >
            <span className="truncate font-medium text-gray-800">{r.name}</span>
            <span className="mono-num truncate text-gray-500">{r.batch}</span>
            <span className="mono-num text-gray-700">{r.qty}</span>
            <span className="flex items-center justify-end gap-1.5">
              <Live value={`${r.days}d`} className="mono-num text-gray-700" />
              <span
                className="rounded px-1.5 py-0.5 text-[9px] font-semibold"
                style={{ background: `${r.tone}1a`, color: r.tone }}
              >
                {r.label}
              </span>
            </span>
          </div>
        ))}
      </div>

      <p className="mt-2 text-[9px] text-gray-400">
        Return windows close before the expiry date — the alert is set to the window.
      </p>
    </MockShell>
  );
}

/* =========================================================== prescriptions */

export function PrescriptionMock() {
  const [ref, t] = useLiveTick(2700);

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="PHARMACY"
      module="Prescriptions"
      nav={NAV}
      active="rx"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label={`${3 + (t % 3)} today`} />}
    >
      <div className="grid grid-cols-[1.1fr_1fr] gap-2">
        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-800">Rx-2026-{1180 + (t % 20)}</span>
            {pill('DISPENSED', 'bg-emerald-50 text-emerald-700')}
          </div>
          {[
            ['Patient', 'S. Behera · 34'],
            ['Doctor', 'Dr A. Mishra'],
            ['Date', '22 Oct 2026'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-gray-50 py-1 text-[10px] last:border-0">
              <span className="text-gray-500">{k}</span>
              <span className="truncate pl-2 font-medium text-gray-800">{v}</span>
            </div>
          ))}
          <div className="mt-2 space-y-1">
            {['Amoxicillin 250mg · 1-0-1 · 5d', 'Paracetamol 500mg · SOS'].map((l) => (
              <div key={l} className="rounded bg-gray-50 px-1.5 py-1 text-[9.5px] text-gray-700">
                {l}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-gray-800">
            <ShieldAlert size={12} style={{ color: '#d97706' }} /> Safety check
          </span>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-2">
            <div className="text-[10px] font-semibold text-amber-800">Interaction flagged</div>
            <p className="mt-1 text-[9px] leading-relaxed text-amber-700">
              A known interaction exists between two items on this prescription.
              The pharmacist is prompted before the sale completes.
            </p>
          </div>
          <div className="mt-2 space-y-1">
            {[
              ['Allergy on file', 'None recorded'],
              ['Contraindication', 'Prompted at billing'],
              ['Schedule H', 'Doctor details required'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-gray-50 py-1 text-[9.5px] last:border-0">
                <span className="text-gray-500">{k}</span>
                <span className="truncate pl-2 text-gray-700">{v}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[9px] text-gray-400">
            The system prompts. The pharmacist decides.
          </p>
        </div>
      </div>
    </MockShell>
  );
}

/* ================================================================ margins */

export function MarginMock() {
  const [ref, t] = useLiveTick(2800);
  const sales = 184200 + t * 920;
  const margin = Math.round(sales * 0.214);

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="PHARMACY"
      module="Reports · Margin"
      nav={NAV}
      active="reports"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label="this month" />}
    >
      <div className="mb-2.5 grid grid-cols-3 gap-2">
        <MockStat label="Sales" value={inr(sales)} Icon={IndianRupee} tone={ACCENT} />
        <MockStat label="Gross margin" value={inr(margin)} sub="21.4%" Icon={TrendingUp} tone="#16a34a" />
        <MockStat label="Write-off (expiry)" value="₹4,120" Icon={CalendarX2} tone="#dc2626" />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-2.5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-gray-800">Daily sales</span>
          <span className="text-[9px] text-gray-400">Last 14 days</span>
        </div>
        <div className="flex h-24 items-end gap-1.5">
          {Array.from({ length: 14 }).map((_, i) => {
            const base = [44, 58, 52, 70, 86, 64, 48, 56, 74, 92, 68, 50, 78, 62][i];
            const grown = i === 13 ? Math.min(100, base + ((t * 6) % 24)) : base;
            return (
              <motion.span
                key={i}
                className="flex-1 rounded-sm"
                style={{ background: i > 10 ? ACCENT : '#99F6E4' }}
                animate={{ height: `${grown}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          Best margin lines
        </div>
        {[['ORS Sachet', '38%'], ['Cetirizine 10mg', '31%'], ['Paracetamol 500mg', '24%']].map(([n, m]) => (
          <div key={n} className="flex justify-between border-b border-gray-50 px-2.5 py-[6px] text-[10px] last:border-0">
            <span className="truncate text-gray-700">{n}</span>
            <span className="mono-num font-semibold" style={{ color: ACCENT }}>{m}</span>
          </div>
        ))}
      </div>
    </MockShell>
  );
}
