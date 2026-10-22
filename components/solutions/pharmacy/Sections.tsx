import { Monitor, Printer } from 'lucide-react';

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
  BillingMock,
  ExpiryMock,
  PrescriptionMock,
  MarginMock,
} from '@/components/pharmacy/Mockups';

/**
 * Engispider Pharmacy — the deep half of the product page.
 *
 * Built from `components/solutions/kit`.
 *
 * ── The argument ─────────────────────────────────────────────────────────
 * A medical store does not lose money on the till. It loses money on
 * stock that quietly passes its return window, on a batch nobody can
 * trace when a recall lands, and on a margin that is never worked out per
 * line. The pillars are those losses, in the order they happen.
 *
 * Nothing here is clinical. The interaction panel shows that the check
 * exists and prompts the pharmacist — it does not give advice — and the
 * screens use generic molecules rather than brands.
 */

const PILLARS: readonly Pillar[] = [
  {
    kicker: 'The counter',
    title: 'Batch and expiry picked with the medicine',
    body: 'Select the drug and the batch comes with it, expiry and all, straight onto the bill. GST splits itself, the payment mode is one tap, and nothing about the sale has to be typed twice.',
    bullets: [
      'Full drug database with batch-level stock',
      'GST-compliant billing with CGST/SGST split',
      'Cash, UPI and card, with the bill printed or sent',
      'Batch and expiry recorded on every line sold',
    ],
    label: 'Counter billing',
    Mock: BillingMock,
  },
  {
    kicker: 'Where the money goes',
    title: 'Stock that expires on your shelf',
    body: 'The supplier return window closes before the expiry date, which is why so much stock is written off rather than returned. The watchlist is set to the window, not the date, so the alert arrives while you can still act on it.',
    bullets: [
      'Near-expiry watchlist ordered by days remaining',
      'Alerts timed to the supplier return window',
      'Value at risk, so the number is in rupees not units',
      'Batch-level traceability for returns and recalls',
    ],
    label: 'Expiry watchlist',
    Mock: ExpiryMock,
  },
  {
    kicker: 'The prescription',
    title: 'A prompt before the sale completes',
    body: 'Prescriptions held against the patient and the doctor who wrote them, with a known-interaction check that prompts at billing. The system raises the flag; the pharmacist makes the call.',
    bullets: [
      'Digital prescription handling against patient and doctor',
      'Doctor database with their prescribing history',
      'Interaction and contraindication prompts at billing',
      'Schedule H details captured where they are required',
    ],
    label: 'Prescriptions',
    Mock: PrescriptionMock,
  },
  {
    kicker: 'Per line, not per month',
    title: 'Which medicines actually earn',
    body: 'Turnover is easy to see and margin is not. Sales against cost per line, the write-off from expiry sitting next to it, and the handful of items quietly carrying the shop.',
    bullets: [
      'Gross margin per line and overall',
      'Expiry write-off reported beside the margin it erased',
      'Sales trends by day, item and payment mode',
      'Bills, labels and reports printed or exported',
    ],
    label: 'Margin',
    Mock: MarginMock,
  },
] as const;

const CAPABILITY_GROUPS: readonly CapabilityGroup[] = [
  {
    group: 'Selling',
    items: [
      ['GST billing', 'CGST/SGST split, compliant bills, multiple payment modes.'],
      ['Batch selection', 'The batch and its expiry come with the medicine.'],
      ['Bill & label printing', 'Counter bills, shelf labels and reports.'],
      ['Customer records', 'Repeat patients and their purchase history.'],
    ],
  },
  {
    group: 'Stock & expiry',
    items: [
      ['Drug database', 'Molecules, brands, packs and rates in one master.'],
      ['Batch tracking', 'Stock held per batch, traceable for returns and recalls.'],
      ['Expiry & near-expiry alerts', 'Timed to the return window, not the expiry date.'],
      ['Automatic reorder', 'Notifications when a line falls below its point.'],
    ],
  },
  {
    group: 'Prescriptions',
    items: [
      ['Digital prescriptions', 'Held against the patient and the prescribing doctor.'],
      ['Doctor database', 'Who prescribed what, and how often.'],
      ['Interaction alerts', 'A prompt at billing — the pharmacist decides.'],
      ['Schedule H handling', 'Doctor details captured where the law requires them.'],
    ],
  },
  {
    group: 'Knowing the shop',
    items: [
      ['Margin reporting', 'Per line and overall, against cost.'],
      ['Sales trends', 'By day, item and payment mode.'],
      ['Write-off reporting', 'What expiry cost you, next to what you earned.'],
      ['Exports', 'Any report to PDF or Excel.'],
    ],
  },
] as const;

export default function PharmacySections() {
  return (
    <>
      <StatStrip
        stats={[
          { count: countCapabilities(CAPABILITY_GROUPS), label: 'capabilities, shipping today' },
          { value: 'Batch-level', label: 'traceable for recalls' },
          { value: 'Return window', label: 'alerted, not the expiry date' },
          { value: 'Per line', label: 'margin, not just turnover' },
        ]}
      />

      <Surfaces
        marker="Two ways in"
        heading={[
          <>Built for the</>,
          <>
            <span className="accent-word">counter</span>, first.
          </>,
        ]}
        intro="A medical store is judged on how fast the queue moves. Everything else in the system exists to make that one screen correct without slowing it down."
        free={{
          kicker: 'Printing and labels are free with the subscription.',
          body: 'Counter bills, shelf labels and every report. No per-terminal charge and no separate printing licence.',
        }}
        surfaces={[
          {
            Icon: Monitor,
            name: 'Counter & back office',
            who: 'Pharmacists & owners',
            body: 'Billing, drug master, batches, expiry watchlist, prescriptions, reorder and every margin report.',
          },
          {
            Icon: Printer,
            name: 'Printing',
            who: 'Bills, labels & reports',
            body: 'GST bills at the counter, shelf and batch labels, and any report out to PDF or Excel.',
          },
        ]}
      />

      <Pillars
        marker="Where stores lose money"
        heading={[
          <>The till is never</>,
          <>
            the <span className="accent-word">problem</span>.
          </>,
        ]}
        intro="Losses come from stock that passed its return window, a batch nobody can trace, and a margin never worked out per line. The pillars are those three, in the order they happen."
        pillars={PILLARS}
      />

      <Capabilities
        intro="This replaces the batch register, the expiry diary, the prescription file and the margin calculation nobody has time to do. None of it is priced separately."
        groups={CAPABILITY_GROUPS}
        cta="See it on your own drug list"
      />
    </>
  );
}
