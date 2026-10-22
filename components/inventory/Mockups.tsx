'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard, Boxes, Warehouse, ScanLine, Truck, ArrowLeftRight,
  BarChart3, AlertTriangle, TrendingUp, PackageCheck, IndianRupee,
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
 * Engispider Inventory — product screens.
 *
 * Chrome, liveness and proportions come from components/mock/Chrome: a
 * 112px rail, one timer at a time, nothing animating under reduced
 * motion, no inline opacity:0, all aria-hidden.
 *
 * Figures are illustrative demo-tenant data and assert nothing about any
 * customer.
 */

const ACCENT = '#059669';
const TINT = '#ECFDF5';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { key: 'items', label: 'Items', Icon: Boxes },
  { key: 'warehouses', label: 'Warehouses', Icon: Warehouse },
  { key: 'scan', label: 'Scan', Icon: ScanLine },
  { key: 'orders', label: 'Orders', Icon: Truck },
  { key: 'transfers', label: 'Transfers', Icon: ArrowLeftRight },
  { key: 'reports', label: 'Reports', Icon: BarChart3 },
];

const pill = (t: string, c: string) => (
  <span className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${c}`}>{t}</span>
);

export { BrowserFrame, PhoneFrame };

/* ============================================================ stock levels */

export function StockMock() {
  const [ref, t] = useLiveTick(2300);

  const rows = [
    { item: 'M8 Hex Bolt', sku: 'FAS-0081', unit: 'pcs', start: 4200, rate: 85 },
    { item: 'Copper Wire 2.5sq', sku: 'ELE-0214', unit: 'm', start: 1800, rate: 40 },
    { item: 'Safety Gloves', sku: 'PPE-0033', unit: 'pr', start: 320, rate: 14 },
    { item: 'Cement OPC-53', sku: 'CON-0007', unit: 'bag', start: 640, rate: 22 },
    { item: 'PVC Pipe 110mm', sku: 'PLB-0156', unit: 'pcs', start: 240, rate: 9 },
  ].map((r) => {
    const left = Math.max(0, r.start - ((t * r.rate) % (r.start + 1)));
    const pct = Math.round((left / r.start) * 100);
    const status = pct === 0 ? 'OUT' : pct < 25 ? 'REORDER' : 'OK';
    const tone = pct === 0 ? '#dc2626' : pct < 25 ? '#d97706' : ACCENT;
    return { ...r, left, pct, status, tone };
  });

  const reorder = rows.filter((r) => r.status !== 'OK').length;

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="INVENTORY"
      module="Items · Stock on hand"
      nav={NAV}
      active="items"
      accent={ACCENT}
      tint={TINT}
      search
      badge={<LiveDot />}
    >
      <div className="mb-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <MockStat label="SKUs" value="1,284" Icon={Boxes} tone={ACCENT} />
        <MockStat label="Needs reorder" value={String(reorder)} Icon={AlertTriangle} tone="#d97706" />
        <MockStat label="Warehouses" value="4" Icon={Warehouse} tone="#0ea5e9" />
        <MockStat label="Stock value" value="₹38.6L" Icon={IndianRupee} tone="#16a34a" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.4fr_0.9fr_0.8fr_1fr_0.8fr] border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          <span>Item</span><span>SKU</span><span>On hand</span><span>Level</span>
          <span className="text-right">Status</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.sku}
            className="grid grid-cols-[1.4fr_0.9fr_0.8fr_1fr_0.8fr] items-center border-b border-gray-50 px-2.5 py-[7px] text-[10px] last:border-0"
          >
            <span className="truncate font-medium text-gray-800">{r.item}</span>
            <span className="mono-num truncate text-gray-500">{r.sku}</span>
            <Live value={`${r.left} ${r.unit}`} className="mono-num text-gray-800" />
            <span className="pr-3">
              <span className="block h-1.5 overflow-hidden rounded-full bg-gray-100">
                <motion.span
                  className="block h-full rounded-full"
                  style={{ background: r.tone }}
                  animate={{ width: `${r.pct}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </span>
            <span className="text-right">
              <span
                className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
                style={{ background: `${r.tone}1a`, color: r.tone }}
              >
                {r.status}
              </span>
            </span>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

/* ================================================================ scanning */

/**
 * The scan screen.
 *
 * Receiving against a purchase order is where stock either becomes
 * accurate or stops being accurate, so this shows the count climbing as
 * cartons are scanned rather than a static form.
 */
export function ScanMock() {
  const [ref, t] = useLiveTick(1700);
  const mounted = useMounted();
  const ordered = 120;
  const received = Math.min(ordered, 24 + t * 12);
  const pct = Math.round((received / ordered) * 100);

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="INVENTORY"
      module="Scan · Goods receipt"
      nav={NAV}
      active="scan"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label="scanning" />}
    >
      <div className="mb-2.5 rounded-xl border border-gray-200 bg-white p-3">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[11px] font-bold text-gray-800">PO-2026-0418 · Vendor: Shakti Traders</span>
          <Live value={`${received} / ${ordered}`} className="mono-num text-[11px] font-bold text-gray-900" />
        </div>
        <span className="block h-2 overflow-hidden rounded-full bg-gray-100">
          <motion.span
            className="block h-full rounded-full"
            style={{ background: ACCENT }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </span>
        <p className="mt-1.5 text-[9px] text-gray-400">
          Short or excess quantities are flagged against the line, not absorbed.
        </p>
      </div>

      <div className="grid grid-cols-[1fr_1.1fr] gap-2">
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-3">
          <ScanLine size={26} style={{ color: ACCENT }} />
          <div className="mono-num mt-2 text-[11px] font-bold text-gray-900">
            8901234{String(500 + (t % 90)).padStart(5, '0')}
          </div>
          <div className="mt-0.5 text-[9px] text-gray-400">Last barcode</div>
          <div className="mt-2 flex items-center gap-1 text-[9px] font-semibold text-emerald-700">
            <PackageCheck size={11} /> Matched to SKU
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
            Received just now
          </div>
          {['FAS-0081 · 24 pcs', 'ELE-0214 · 60 m', 'PPE-0033 · 12 pr'].map((line, i) => (
            <motion.div
              key={line}
              initial={mounted ? { opacity: 0, x: 6 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.26, delay: i * 0.04 }}
              className="border-b border-gray-50 px-2.5 py-[7px] text-[10px] text-gray-700 last:border-0"
            >
              {line}
            </motion.div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

/* ================================================================== orders */

export function OrdersMock() {
  const [ref, t] = useLiveTick(2600);

  const rows = [
    { no: 'PO-2026-0418', who: 'Shakti Traders', kind: 'Purchase', amt: 184500 },
    { no: 'SO-2026-1122', who: 'Rupal Infra', kind: 'Sales', amt: 96400 },
    { no: 'PO-2026-0417', who: 'Metro Supply', kind: 'Purchase', amt: 42800 },
    { no: 'SO-2026-1121', who: 'RJ Logistic', kind: 'Sales', amt: 71250 },
  ].map((r, i) => {
    const state = (t + i) % 4;
    const [status, tone] =
      state === 0
        ? ['DRAFT', 'bg-gray-100 text-gray-500']
        : state === 1
          ? ['APPROVED', 'bg-blue-50 text-blue-700']
          : state === 2
            ? ['IN TRANSIT', 'bg-amber-50 text-amber-700']
            : ['RECEIVED', 'bg-emerald-50 text-emerald-700'];
    return { ...r, status, tone };
  });

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="INVENTORY"
      module="Orders"
      nav={NAV}
      active="orders"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot />}
    >
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.3fr_1.1fr_0.8fr_0.9fr_1fr] border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
          <span>Order</span><span>Party</span><span>Type</span><span>Value</span>
          <span className="text-right">Status</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.no}
            className="grid grid-cols-[1.3fr_1.1fr_0.8fr_0.9fr_1fr] items-center border-b border-gray-50 px-2.5 py-[8px] text-[10px] last:border-0"
          >
            <span className="mono-num truncate text-gray-500">{r.no}</span>
            <span className="truncate font-medium text-gray-800">{r.who}</span>
            <span className="truncate text-gray-600">{r.kind}</span>
            <span className="mono-num text-gray-800">{inr(r.amt)}</span>
            <span className="text-right">{pill(r.status, r.tone)}</span>
          </div>
        ))}
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {[
          ['Awaiting receipt', '6', '#d97706'],
          ['To dispatch', '4', '#0ea5e9'],
          ['Closed this week', '31', ACCENT],
        ].map(([l, v, tone]) => (
          <div key={l as string} className="rounded-xl border border-gray-200 bg-white p-2.5">
            <div className="text-[10px] text-gray-500">{l as string}</div>
            <div className="mono-num mt-0.5 text-sm font-extrabold text-gray-900">{v as string}</div>
            <span className="mt-1.5 block h-1 w-9 rounded-full" style={{ background: tone as string }} />
          </div>
        ))}
      </div>
    </MockShell>
  );
}

/* ================================================================ movement */

export function MovementMock() {
  const [ref, t] = useLiveTick(2800);

  return (
    <MockShell
      innerRef={ref}
      product="Engispider"
      kicker="INVENTORY"
      module="Reports · Turnover"
      nav={NAV}
      active="reports"
      accent={ACCENT}
      tint={TINT}
      badge={<LiveDot label="90 days" />}
    >
      <div className="mb-2.5 rounded-xl border border-gray-200 bg-white p-2.5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-gray-800">Stock movement</span>
          <span className="text-[9px] text-gray-400">In vs out</span>
        </div>
        <div className="flex h-24 items-end gap-1">
          {Array.from({ length: 16 }).map((_, i) => {
            const base = [40, 62, 48, 75, 58, 88, 66, 52, 70, 94, 60, 46, 82, 68, 54, 76][i];
            const grown = i === 15 ? Math.min(100, base + ((t * 5) % 22)) : base;
            return (
              <motion.span
                key={i}
                className="flex-1 rounded-sm"
                style={{ background: i % 2 ? '#A7F3D0' : ACCENT }}
                animate={{ height: `${grown}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
            Fastest moving
          </div>
          {[['M8 Hex Bolt', '4.2×'], ['Cement OPC-53', '3.6×'], ['Safety Gloves', '2.9×']].map(([n, x]) => (
            <div key={n} className="flex justify-between border-b border-gray-50 px-2.5 py-[6px] text-[10px] last:border-0">
              <span className="truncate text-gray-700">{n}</span>
              <span className="mono-num font-semibold" style={{ color: ACCENT }}>{x}</span>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-gray-400">
            Dead stock &gt; 90d
          </div>
          {[['PVC Pipe 110mm', '₹84,200'], ['Legacy Switchgear', '₹61,500'], ['Old Fittings', '₹22,800']].map(([n, v]) => (
            <div key={n} className="flex justify-between border-b border-gray-50 px-2.5 py-[6px] text-[10px] last:border-0">
              <span className="truncate text-gray-700">{n}</span>
              <span className="mono-num font-semibold text-red-600">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-2 flex items-center gap-1.5 text-[9px] text-gray-400">
        <TrendingUp size={10} /> Capital tied up in stock that has not moved, named.
      </p>
    </MockShell>
  );
}

/* ====================================================== phone — floor app */

export function PhoneStockMock() {
  const [ref, t] = useLiveTick(2200);
  const mounted = useMounted();
  const counted = 18 + t * 3;

  return (
    <div ref={ref} aria-hidden="true" className="bg-gray-50">
      <StatusBar />
      <div className="flex items-center justify-between bg-white px-4 pb-2">
        <span className="text-xs font-extrabold text-gray-800">Stock count</span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ background: TINT, color: ACCENT }}
        >
          WH-02
        </span>
      </div>

      <div className="h-[340px] space-y-2.5 overflow-hidden p-3">
        <div className="rounded-2xl p-3.5 text-white" style={{ background: ACCENT }}>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
            Counted this session
          </div>
          <Live value={`${counted} lines`} className="block text-2xl font-extrabold" />
          <div className="mt-1 text-[10px] text-white/80">Aisle C · Rack 4</div>
        </div>

        <button
          type="button"
          tabIndex={-1}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white"
          style={{ background: '#111827' }}
        >
          <ScanLine size={15} /> Scan barcode
        </button>

        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <span className="mb-1.5 block text-[11px] font-bold text-gray-800">Just counted</span>
          {[
            ['FAS-0081', 'M8 Hex Bolt', '240 pcs'],
            ['ELE-0214', 'Copper Wire', '180 m'],
            ['PPE-0033', 'Safety Gloves', '36 pr'],
          ].map(([sku, name, qty], i) => (
            <motion.div
              key={sku as string}
              initial={mounted ? { opacity: 0, y: -4 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: i * 0.04 }}
              className="flex items-center justify-between border-b border-gray-50 py-1.5 text-[10px] last:border-0"
            >
              <span className="min-w-0">
                <span className="block truncate font-medium text-gray-700">{name as string}</span>
                <span className="mono-num block text-[9px] text-gray-400">{sku as string}</span>
              </span>
              <span className="mono-num shrink-0 font-semibold text-gray-800">{qty as string}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
