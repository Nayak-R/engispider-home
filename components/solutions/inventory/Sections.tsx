import { Monitor, Smartphone } from 'lucide-react';

import {
  StatStrip,
  Surfaces,
  Pillars,
  Capabilities,
  countCapabilities,
  type Pillar,
  type CapabilityGroup,
} from '@/components/solutions/kit';
import {
  StockMock,
  ScanMock,
  OrdersMock,
  MovementMock,
  PhoneStockMock,
} from '@/components/inventory/Mockups';

/**
 * Engispider Inventory — the deep half of the product page.
 *
 * Built from `components/solutions/kit`, so this file is content and the
 * structure is shared with every other product page.
 *
 * ── The argument ─────────────────────────────────────────────────────────
 * Stock records do not drift gradually. They break at two specific
 * moments — when goods come in and when they go out — and everything
 * after that is a reconciliation nobody enjoys. So the pillars sit at
 * those moments rather than listing modules: what you hold, receiving it
 * correctly, the orders either side, and the capital sitting still.
 */

const PILLARS: readonly Pillar[] = [
  {
    kicker: 'What you actually hold',
    title: 'One number, every location',
    body: '"Do we have it?" should not take four phone calls. Stock on hand across every warehouse on one screen, with a level bar that shows which lines are about to become a problem before they are one.',
    bullets: [
      'Real-time stock across multiple warehouses and locations',
      'Reorder points per item, flagged before you run out',
      'Level and status on every line, not just a quantity',
      'Stock value, so the number means something financially',
    ],
    label: 'Stock on hand',
    Mock: StockMock,
  },
  {
    kicker: 'Where accuracy is won',
    title: 'Scan it in, against the order',
    body: 'Receiving is the moment stock either stays accurate or stops being accurate. Scan cartons against the purchase order and short or excess quantities are flagged on the line rather than quietly absorbed into the count.',
    bullets: [
      'Barcode and QR scanning on receipt and issue',
      'Received against the purchase order, line by line',
      'Short and excess quantities flagged, not absorbed',
      'Excel and CSV import for opening stock and price lists',
    ],
    label: 'Goods receipt',
    Mock: ScanMock,
  },
  {
    kicker: 'Both directions',
    title: 'Purchase and sales orders in one ledger',
    body: 'What is on order, what is in transit, what is due to dispatch. Orders in both directions against the same stock, so an incoming delivery and an outgoing commitment are never counted twice.',
    bullets: [
      'Purchase orders through to goods receipt',
      'Sales orders through to delivery tracking',
      'Inter-warehouse transfers with a full movement trail',
      'Supplier and customer records against each order',
    ],
    label: 'Orders',
    Mock: OrdersMock,
  },
  {
    kicker: 'The money standing still',
    title: 'Turnover, and the stock that is not moving',
    body: 'Fast movers tell you what to buy. Dead stock tells you what the last buying decision cost — and it is usually the more useful of the two numbers, because nobody ever volunteers it.',
    bullets: [
      'Turnover rate per item over the period you choose',
      'Dead stock named, with the capital it is holding',
      'Movement history in and out, auditable',
      'Every report exportable to PDF or Excel',
    ],
    label: 'Turnover',
    Mock: MovementMock,
  },
] as const;

const CAPABILITY_GROUPS: readonly CapabilityGroup[] = [
  {
    group: 'Stock & locations',
    items: [
      ['Real-time stock', 'On-hand quantities that move as goods move.'],
      ['Multi-warehouse', 'Location-based tracking across every site you hold stock in.'],
      ['Item master', 'SKUs, units, categories and pricing in one place.'],
      ['Inter-warehouse transfers', 'Stock moved between sites with a full trail.'],
    ],
  },
  {
    group: 'Moving goods',
    items: [
      ['Barcode & QR scanning', 'Scan to receive, issue and count — no typing.'],
      ['Purchase orders', 'Raised, approved and received against, line by line.'],
      ['Sales orders', 'Committed stock and delivery tracking through to dispatch.'],
      ['Goods receipt', 'Short and excess quantities flagged against the order.'],
    ],
  },
  {
    group: 'Staying stocked',
    items: [
      ['Reorder points', 'Per item, so the alert comes before the shortage.'],
      ['Low-stock alerts', 'Automated notifications rather than a weekly check.'],
      ['Supplier records', 'Who you buy each line from, and at what price.'],
      ['Stock counts', 'Cycle counts from a phone, reconciled against the system.'],
    ],
  },
  {
    group: 'Knowing where you stand',
    items: [
      ['Turnover analytics', 'Which lines move, and how often, over any period.'],
      ['Dead stock reporting', 'Capital tied up in stock that has not moved.'],
      ['Movement history', 'Every in and out, auditable after the fact.'],
      ['Excel & CSV import/export', 'Opening stock in, any report out.'],
    ],
  },
] as const;

export default function InventorySections() {
  return (
    <>
      <StatStrip
        stats={[
          { count: countCapabilities(CAPABILITY_GROUPS), label: 'capabilities, shipping today' },
          { value: 'Multi-site', label: 'one number across warehouses' },
          { value: 'Barcode', label: 'scanned in, not typed in' },
          { value: 'Dead stock', label: 'named, with the capital in it' },
        ]}
      />

      <Surfaces
        marker="Two ways in"
        heading={[
          <>The office and</>,
          <>
            the <span className="accent-word">warehouse floor</span>.
          </>,
        ]}
        intro="Stock is counted where it sits, not at a desk. The person holding the carton should be the person recording it, while the carton is still in their hands."
        free={{
          kicker: 'Mobile scanning is free with the subscription.',
          body: 'Every user on the account can count and scan from a phone. No per-device licence and no separate handheld to buy.',
        }}
        surfaces={[
          {
            Icon: Monitor,
            name: 'Web app',
            who: 'Purchasing, stores & management',
            body: 'Item master, stock on hand, purchase and sales orders, transfers, reorder points and every report.',
          },
          {
            Icon: Smartphone,
            name: 'Mobile stock app',
            who: 'Floor & stores staff',
            body: 'Cycle counts and goods receipt from a phone, with the barcode scanner built in — recorded at the rack.',
          },
        ]}
      />

      <Pillars
        marker="Where records break"
        heading={[
          <>Stock does not drift.</>,
          <>
            It breaks at <span className="accent-word">two moments</span>.
          </>,
        ]}
        intro="Goods coming in and goods going out. Everything after those two is a reconciliation nobody enjoys, so the system sits at the moments themselves."
        pillars={PILLARS}
      />

      <Capabilities
        intro="This replaces the stock register, the purchase-order file, the reorder sticky notes and the spreadsheet somebody rebuilds every quarter. None of it is priced separately."
        groups={CAPABILITY_GROUPS}
        cta="See it on your own item list"
      />

      {/* The scanner is the one thing people want to see working, so it
          closes the page rather than sitting midway up it. */}
      <ScanClose />
    </>
  );
}

function ScanClose() {
  return (
    <Pillars
      marker="On the floor"
      heading={[
        <>Counted at the rack,</>,
        <>
          not at a <span className="accent-word">desk</span>.
        </>,
      ]}
      intro="A count typed up later is a count someone is guessing at. The phone in a storesperson's pocket already has a camera, which is already a barcode scanner."
      pillars={[
        {
          kicker: 'Mobile stock app',
          title: 'The scanner you already own',
          body: 'Cycle counts, goods receipt and stock lookups from a phone, recorded against the rack the person is standing at. No handheld terminal to buy, configure or lose.',
          bullets: [
            'Barcode scanning with the phone camera',
            'Cycle counts recorded where the stock is',
            'Lookups on the floor — no walk back to a terminal',
            'Syncs to the same ledger the office is reading',
          ],
          label: 'Stock count',
          Mock: PhoneStockMock,
          phone: true,
        },
      ]}
    />
  );
}
