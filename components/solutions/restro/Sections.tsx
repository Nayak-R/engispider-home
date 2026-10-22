import Link from 'next/link';
import { ArrowRight, Check, Monitor, QrCode, Smartphone, Tablet } from 'lucide-react';

import { Reveal, MaskText, CountUp } from '@/components/motion/Reveal';
import Parallax from '@/components/motion/Parallax';
import SectionBackdrop from '@/components/SectionBackdrop';
import { FreeCallout } from '@/components/solutions/FreeTag';
import {
  BrowserFrame,
  PhoneFrame,
  PlaceOrderMock,
  InventoryMock,
  PnlMock,
  KdsMock,
  FeedbackMock,
  PhoneOrderMock,
  PhoneOwnerMock,
  PhoneQrMock,
} from '@/components/restro/Mockups';

/**
 * Engispider Restro — the deep half of the product page.
 *
 * Rendered by `components/solutions/ProductPage` in place of its generic
 * capability list. Everything around this — hero, spec strip, audience,
 * rollout, FAQ, related products, CTA — is shared with every other product,
 * so a flagship and a one-line product stay recognisably the same page.
 *
 * This is the pattern the other products follow: one `Sections.tsx` per
 * product that has more to say than a list of strings.
 *
 * ── The argument the page makes ──────────────────────────────────────────
 * Not "here are 28 features". The owner of a restaurant cannot be in the
 * restaurant every hour it is open, and the thing they are actually buying
 * is the ability to leave and still know what is happening. So the five
 * pillars are ordered as the day delegates itself: guests order themselves,
 * staff order without the till, stock counts itself down, the owner watches
 * from anywhere, and the report writes itself at close.
 *
 * ── Corrections carried from the previous version ────────────────────────
 *  · "2 apps — web and mobile" was wrong. There are FOUR ways in: the web
 *    admin, the Android waiter app, the Android owner app, and QR
 *    self-ordering for guests. They are all included in the subscription,
 *    which is said plainly rather than left to be discovered.
 *  · No "Launch App" button. It linked to the tenant login three times,
 *    including the final CTA; a prospect has no account for it.
 *  · No "Up and running in a day". The rollout section directly below says
 *    deployment runs in phases with dates agreed first — the page was
 *    contradicting the rest of the site in its own heading.
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
    kicker: 'Guests order themselves',
    title: 'The table takes its own order',
    body: 'A guest scans the code on the table, reads the menu on their own phone and sends the order straight to the kitchen. No app to download, no account, and nobody waiting with a hand up.',
    bullets: [
      'QR menu works in any phone browser — no install, no sign-in',
      'Order goes to the kitchen display the moment it is sent',
      'Guests call a waiter from the same screen',
      'Ratings collected at the table, while it can still be fixed',
    ],
    label: 'Guest QR menu',
    Mock: PhoneQrMock,
    phone: true,
  },
  {
    kicker: 'Staff, not the till',
    title: 'Waiters take orders at the table',
    body: 'The Android waiter app puts the whole menu in a pocket. Orders are placed beside the guest, the KOT prints itself in the kitchen, and nobody walks to a terminal to type what they just heard.',
    bullets: [
      'Dine-in, takeaway and delivery from one screen',
      'Variants, add-ons and combos with auto-priced bills',
      'Auto-KOT to the kitchen and instant GST billing',
      'Live table floor with merge and split bills',
    ],
    label: 'Place order',
    Mock: PlaceOrderMock,
  },
  {
    kicker: 'Stock, unattended',
    title: 'Ingredients count themselves down',
    body: 'Link each dish to what goes into it and stock falls on every sale. You find out you are low on paneer before service, from an alert, rather than at eight on a Saturday from the kitchen.',
    bullets: [
      'Ingredients, units, reorder levels and a movement ledger',
      'Suppliers, purchases and supplier dues',
      'Inter-branch stock transfers with an audit trail',
      'Recipe-based auto-deduction and low-stock alerts',
    ],
    label: 'Inventory',
    Mock: InventoryMock,
  },
  {
    kicker: 'You, somewhere else',
    title: 'Watch the floor from another city',
    body: 'The owner app shows takings, covers, tables and every order as it happens — from home, from a second outlet, from a holiday. The restaurant does not need you in it for you to know exactly how it is doing.',
    bullets: [
      'Live takings, order count and table status, refreshing on its own',
      'Every order as it is placed, with its value',
      'All outlets on one login — switch between them',
      'Push alerts for new orders, waiter calls and low stock',
    ],
    label: "Owner's app",
    Mock: PhoneOwnerMock,
    phone: true,
  },
  {
    kicker: 'The numbers, written for you',
    title: 'The day closes itself',
    body: 'A full day-end summary is emailed at close, every day, without anyone running it. A weekly report follows on sales, items, staff, stock and profit — so the question is never "how did last week go", only what to do about it.',
    bullets: [
      'Day-end summary emailed automatically at close',
      'Weekly reports on sales, items, payments, stock and staff',
      'Food-cost percentage and margin per menu item',
      'True profit and loss: sales − ingredients − expenses',
    ],
    label: 'Profit & loss',
    Mock: PnlMock,
  },
] as const;

/* ---------------------------------------------------- full capability set */

/**
 * The complete list, grouped the way a restaurant is actually run rather
 * than alphabetically. Twenty-nine items is a lot to read, which is why the
 * pillars above exist — but a buyer comparing systems wants to search this
 * page for "KOT" or "HSN" and find it.
 */
const CAPABILITY_GROUPS = [
  {
    group: 'Ordering & billing',
    items: [
      ['Lightning POS', 'Dine-in, takeaway and delivery orders with one-tap billing.'],
      ['QR self-ordering', 'Guests scan, browse and order from their table — no app needed.'],
      ['Table management', 'Live floor status, merge and split bills, per-table tracking.'],
      ['Menu, variants & add-ons', 'Sizes, combos and modifiers with auto-priced bills.'],
      ['KOT & kitchen display', 'Auto-printed KOTs and a real-time kitchen screen with bump times.'],
      ['Merge & split bills', 'Combine or split tables without losing a single line item.'],
      ['Waiter call', 'Guests call a waiter from the QR menu; staff are notified instantly.'],
      ['Reservations', 'Table bookings with a status workflow and guest reminders.'],
    ],
  },
  {
    group: 'Money',
    items: [
      ['GST & HSN billing', 'Tax-ready bills with CGST/SGST split and per-item HSN codes.'],
      ['Multiple payments & UPI', 'Cash, UPI, card or due — with a scannable UPI QR on the bill.'],
      ['Thermal KOT & bill printing', '2", 3", 4" and A4 with your logo, GST number and UPI QR.'],
      ['Expenses & P&L', 'Log expenses and get true profit: sales − COGS − expenses.'],
      ['Menu profitability', 'Food-cost percentage and margin per dish — find the money-losers.'],
      ['Customer CRM & dues', 'Customer profiles, order history and outstanding-due tracking.'],
      ['Discounts & offers', 'Flat or percentage discounts, with manager alerts on large ones.'],
      ['Void / refund audit log', 'Every discount, void and refund recorded against a user.'],
    ],
  },
  {
    group: 'Stock & supply',
    items: [
      ['Inventory & stock', 'Ingredients, units, reorder levels and a full movement ledger.'],
      ['Suppliers & purchases', 'Record purchases, receive goods into stock, track supplier dues.'],
      ['Recipes & auto-deduction', 'Dishes linked to ingredients; stock deducts on every sale.'],
      ['Inter-branch transfers', 'Move stock between outlets with a full audit trail.'],
    ],
  },
  {
    group: 'Oversight & reporting',
    items: [
      ['Day-end summary email', 'A full end-of-day summary mailed to owners automatically.'],
      ['Weekly reports', 'Sales, items, payments, stock and staff, week on week.'],
      ['Reports & exports', 'Item, table, customer and kitchen reports, PDF or Excel.'],
      ['Real-time notifications', 'Push alerts for new orders, waiter calls and low stock.'],
      ['Roles & multi-outlet', 'Per-role access and one login across every outlet you run.'],
      ['Staff attendance', 'Clock in and out from the phone, with worked hours and rosters.'],
      ['Loyalty & coupons', 'Reward repeat guests with points and run discount campaigns.'],
      ['Customer feedback', 'Star ratings and reviews from the QR menu, with low-score alerts.'],
      ['WhatsApp billing', 'Send the bill straight to the guest on WhatsApp after settling.'],
    ],
  },
] as const;

const CAPABILITY_COUNT = CAPABILITY_GROUPS.reduce((n, g) => n + g.items.length, 0);

/* ------------------------------------------------------------- surfaces */

const SURFACES = [
  {
    Icon: Monitor,
    name: 'Web app',
    who: 'Owner & manager',
    body: 'The full system on a billing desk or laptop — menu, pricing, stock, staff, accounts and every report.',
  },
  {
    Icon: Tablet,
    name: 'Waiter app',
    who: 'Floor staff · Android',
    body: 'Takes orders at the table and fires the KOT. What the floor runs on all service.',
  },
  {
    Icon: Smartphone,
    name: 'Owner app',
    who: 'Owner · Android',
    body: 'Live takings, orders and tables from anywhere, across every outlet, refreshing on its own.',
  },
  {
    Icon: QrCode,
    name: 'QR self-ordering',
    who: 'Your guests · any phone',
    body: 'Guests scan, order and rate from their own phone. No app to download and nothing to install.',
  },
] as const;

/* ======================================================================== */

export default function RestroSections() {
  return (
    <>
      <Stats />
      <Surfaces />
      <Pillars />
      <KitchenDisplay />
      <Capabilities />
      <Guests />
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
            // `count` ticks up when scrolled into view; the word figures
            // just arrive. Animating "Multi-outlet" would be nonsense.
            { count: CAPABILITY_COUNT, label: 'capabilities, shipping today' },
            { count: 4, label: 'ways in — all included' },
            { value: 'Daily + weekly', label: 'reports, sent on their own' },
            { value: 'Multi-outlet', label: 'one login, every branch' },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 70} className="relative">
              <span
                aria-hidden
                className="absolute -left-5 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-hairline lg:block"
              />
              <dt className="font-display text-f-2xl font-extrabold leading-none text-ink">
                {item.count !== undefined ? (
                  <CountUp value={item.count} duration={1100} />
                ) : (
                  item.value
                )}
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

/**
 * The four ways into the system, stated before the feature argument starts.
 *
 * This is the single most misread thing about the product: people assume
 * "restaurant software" means one screen behind the counter. It is four
 * surfaces for four different people, and the extra three are not add-ons.
 */
function Surfaces() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">Four ways in</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>One system,</>
              <>
                four <span className="accent-word">front doors</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                The owner, the floor staff and the guest each need a different
                screen. They get one — and all four come with the
                subscription, not as modules you add later.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-10">
          <FreeCallout kicker="All four are free with the subscription." delay={60}>
            The waiter app, the owner app and QR self-ordering are not
            modules you add later. No per-app licence, no per-device charge,
            and no limit on how many staff phones run them.
          </FreeCallout>
        </div>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {SURFACES.map(({ Icon, name, who, body }, i) => (
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
      <SectionBackdrop side="right" tone="warm" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">What it actually changes</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>The restaurant runs</>
              <>
                when you are <span className="accent-word">not</span> in it.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Every one of these takes a job that needed you standing there
                and gives it to the system — then shows you the result on a
                phone, wherever you happen to be.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {PILLARS.map((p, i) => (
            <PillarRow key={p.title} pillar={p} index={i} reverse={i % 2 === 1} />
          ))}
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
        {/* Phones drift a little further than the browser frames — they
            are smaller, so the same travel reads as less movement. */}
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

/* ======================================================== KITCHEN DISPLAY */

function KitchenDisplay() {
  return (
    <section className="section border-y border-hairline bg-band">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="marker mono justify-center">Back of house</p>
          <MaskText as="h2" className="display mt-5 text-f-4xl">
            <>A kitchen screen that</>
            <>
              keeps service <span className="accent-word">moving</span>.
            </>
          </MaskText>
          <Reveal delay={120}>
            <p className="mt-6 leading-relaxed text-body">
              Orders land on the kitchen display the moment they are placed —
              from the waiter app or straight from a guest&rsquo;s phone — each
              with a timer that turns amber and then red. Nothing is missed,
              nothing is cooked twice, and the pass can see what is late
              without asking anyone.
            </p>
          </Reveal>
        </div>

        <Reveal direction="scale" delay={160} className="mx-auto mt-14 max-w-4xl">
          <Parallax amount={18}>
            <BrowserFrame label="Kitchen display">
              <KdsMock />
            </BrowserFrame>
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================== CAPABILITIES */

function Capabilities() {
  return (
    <section className="section relative">
      <SectionBackdrop side="left" tone="cool" />
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
                This replaces the POS, the billing software, the stock
                register, the spreadsheet and the feedback form. Every line
                below is in the running product — none of it is a roadmap, and
                none of it is priced separately.
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
      </div>
    </section>
  );
}

/* =================================================================== GUESTS */

function Guests() {
  return (
    <section className="section relative border-t border-hairline">
      <SectionBackdrop side="right" tone="mixed" />
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="marker mono">Guests</p>
            <MaskText as="h2" className="display mt-5 text-f-4xl">
              <>Catch the bad</>
              <>
                review <span className="accent-word">first</span>.
              </>
            </MaskText>
            <Reveal delay={120}>
              <p className="measure mt-6 leading-relaxed text-body">
                Ratings arrive from the QR menu while the guest is still at the
                table, and a low score alerts the manager on the spot — which
                is the only moment it can still be fixed. The alternative is
                reading it online on Monday.
              </p>
            </Reveal>

            <ul className="mt-7 space-y-2.5">
              {[
                'Star ratings and reviews collected at the table',
                'Low-rating alerts to managers in real time',
                'Points-based loyalty and discount coupons',
                'Bill sent on WhatsApp after settling',
              ].map((b, i) => (
                <Reveal as="li" key={b} delay={180 + i * 50} className="flex items-start gap-3">
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-500" aria-hidden />
                  <span className="text-f-xs leading-relaxed text-body">{b}</span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={400}>
              <Link href="/solutions/restaurant/guide" className="link-arrow mt-8">
                Read the training guide <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <Reveal
            direction="scale"
            delay={140}
            className="min-w-0 lg:col-span-6 lg:col-start-7"
          >
            <Parallax amount={24}>
              <BrowserFrame label="Customer feedback">
                <FeedbackMock />
              </BrowserFrame>
            </Parallax>
          </Reveal>
        </div>

        {/* The waiter app gets a closing look of its own — it is the screen
            most of the staff will spend their shift in. */}
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal direction="scale" className="lg:col-span-5">
            <Parallax amount={34} className="flex justify-center">
              <PhoneFrame label="Waiter app · Android">
                <PhoneOrderMock />
              </PhoneFrame>
            </Parallax>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="marker mono">On the floor</p>
            <MaskText as="h2" className="display mt-5 text-f-4xl">
              <>Your staff learn it</>
              <>
                in <span className="accent-word">one</span> shift.
              </>
            </MaskText>
            <Reveal delay={120}>
              <p className="measure mt-6 leading-relaxed text-body">
                The waiter app does one thing: take the order and send it. It
                runs on any Android phone the staff already carry, so there is
                no hardware to buy and nothing to learn beyond tapping the
                dish a guest just asked for.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <Link href="/contact" className="link-arrow mt-8">
                See it on your own menu <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
