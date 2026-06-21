'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Printer, ArrowLeft, ChevronRight, Rocket, UtensilsCrossed, ShoppingCart,
  Wallet, Boxes, BarChart3, Gift, Users, Lightbulb, Settings,
} from 'lucide-react';

type Feature = { id: string; name: string; roles: string[]; what: string; steps: string[]; tips?: string[] };
type Section = { id: string; title: string; Icon: any; intro: string; features: Feature[] };

const SECTIONS: Section[] = [
  {
    id: 'getting-started', title: 'Getting Started', Icon: Rocket,
    intro: 'Log in, pick your outlet and understand who can see what.',
    features: [
      { id: 'login', name: 'Logging in & MPIN', roles: ['Everyone'],
        what: 'Each staff member signs in with their own email/mobile and password. On mobile you set a 4-digit MPIN for quick re-login.',
        steps: ['Open the app and enter your email/mobile + password.', 'On mobile, set an MPIN when prompted — use it for faster logins next time.', 'If you forget your password, tap “Forgot password”.'] },
      { id: 'restaurant-switch', name: 'Choosing your restaurant & role', roles: ['Multi-outlet staff'],
        what: 'If you work across more than one outlet, you switch the active restaurant from the profile/drawer menu. Your role decides which screens you see.',
        steps: ['Open the profile menu (web) or side drawer (mobile).', 'Select the restaurant you are working at.', 'If you have multiple roles, pick the role you’re acting as.'],
        tips: ['Always confirm the correct restaurant is selected before taking orders or counting stock.'] },
      { id: 'roles', name: 'Roles & access', roles: ['Admin'],
        what: 'Admins control which roles (Manager, Cashier, Waiter, Chef, etc.) can open which pages via Role Page Config.',
        steps: ['Go to Role Page Config (Admin only).', 'Tick the pages each role should access.', 'Save — staff see the change after re-login.'] },
    ],
  },
  {
    id: 'menu-setup', title: 'Menu & Setup', Icon: UtensilsCrossed,
    intro: 'Build your menu once — items, sizes, add-ons and recipes.',
    features: [
      { id: 'kitchens', name: 'Kitchens & categories', roles: ['Admin', 'Manager'],
        what: 'Kitchens route KOTs to the right station; categories group items on the order screen.',
        steps: ['Open Kitchens and add each station (e.g. Main, Beverages, Tandoor).', 'Open Menu → Manage Categories and add categories.', 'You’ll assign items to a kitchen and category next.'] },
      { id: 'menu-items', name: 'Adding menu items', roles: ['Admin', 'Manager', 'Chef'],
        what: 'Each dish has a price, category, kitchen, veg type, GST % and optional photos.',
        steps: ['Open Menu → Add Item.', 'Fill name, price, category, kitchen, veg type and GST %.', 'Add a photo (optional) and save.'],
        tips: ['Set the correct GST % so bills are tax-accurate.', 'Toggle an item “unavailable” when it’s sold out — waiters see it instantly.'] },
      { id: 'variants', name: 'Variants & add-ons', roles: ['Admin', 'Manager'],
        what: 'Variants are sizes/portions with their own price (Half/Full). Add-on groups are extras (extra cheese) with per-option prices and required/optional rules.',
        steps: ['Edit an item and scroll to Variants — add each size with its price.', 'Add an Add-on Group, mark it required or optional, set min/max selections.', 'Add options with their extra price. Save.'],
        tips: ['When taking an order, items with variants/add-ons open a “Customize” step automatically.'] },
      { id: 'recipes', name: 'Recipes (auto stock deduction)', roles: ['Admin', 'Manager'],
        what: 'Link a dish to the inventory ingredients it uses, so stock deducts automatically every time it’s sold.',
        steps: ['Open Inventory → Recipes.', 'Pick a dish and add its ingredients with quantities.', 'Set the yield (how many servings the quantities make). Save.'],
        tips: ['Recipes also power the food-cost % and profit reports.'] },
    ],
  },
  {
    id: 'orders', title: 'Taking Orders', Icon: ShoppingCart,
    intro: 'The heart of service — fast billing, QR self-ordering and the kitchen screen.',
    features: [
      { id: 'place-order', name: 'Placing an order', roles: ['Cashier', 'Waiter', 'Manager'],
        what: 'Select a table, add items (customize variants/add-ons if asked), then place the order — a KOT prints to the kitchen.',
        steps: ['Open Place Order and choose the table.', 'Tap items to add them; for items with options choose the size/add-ons.', 'Add per-item or order notes if needed.', 'Tap “Place Order” (or “Place & Print KOT”).'],
        tips: ['The same dish with different add-ons shows as separate lines so the kitchen gets it right.'] },
      { id: 'qr', name: 'QR self-ordering', roles: ['Guests'],
        what: 'Guests scan the table QR, browse the menu and send an order request which staff accept.',
        steps: ['Print/stick the table QR codes (generated per table).', 'Guest scans, adds items and submits.', 'Staff get a notification to accept the request — it becomes a normal order.'] },
      { id: 'tables', name: 'Tables & open orders', roles: ['Cashier', 'Waiter'],
        what: 'The tables screen shows which tables are free, occupied or reserved, and lets you reopen an existing order to add items.',
        steps: ['Open Tables to see live status.', 'Tap an occupied table to view/add to its open order.', 'Use merge to combine bills when guests move tables.'] },
      { id: 'kds', name: 'Kitchen Display (KDS)', roles: ['Chef', 'Kitchen Staff'],
        what: 'A live screen in the kitchen shows incoming orders with timers; mark items ready as they’re plated.',
        steps: ['Open Kitchen Display on a kitchen screen/tablet.', 'New tickets appear automatically with a timer.', 'Tap “Mark Ready” as each order is done.'] },
      { id: 'waiter-call', name: 'Waiter call', roles: ['Guests', 'Waiter'],
        what: 'From the QR menu a guest can call for a waiter; staff get an instant notification with the table.',
        steps: ['Guest taps “Call Waiter” on the QR menu.', 'A notification pops up for waiters/managers.', 'Acknowledge it once you’ve attended the table.'] },
    ],
  },
  {
    id: 'billing', title: 'Billing & Payments', Icon: Wallet,
    intro: 'Settle bills, apply discounts, handle dues and share receipts.',
    features: [
      { id: 'settle', name: 'Settling a bill', roles: ['Cashier', 'Manager'],
        what: 'Close an order by choosing the payment mode (Cash/UPI/Card/Due). The table frees up and the sale is recorded.',
        steps: ['Open the order and tap Settle.', 'Apply a discount or coupon if any.', 'Choose payment mode and confirm. Print/share the bill.'],
        tips: ['Large discounts and credit (Due) settlements alert the manager automatically.'] },
      { id: 'dues', name: 'Credit / dues', roles: ['Cashier', 'Manager'],
        what: 'Settle as “Due” for trusted customers and record part-payments later.',
        steps: ['At settle, choose payment mode “Due” and capture the customer.', 'Later, open the order and add a due payment as they pay.'] },
      { id: 'discounts', name: 'Discounts & offers', roles: ['Cashier', 'Manager'],
        what: 'Apply a flat amount or percentage discount, or a coupon code, before settling.',
        steps: ['At settle, choose Flat or Percentage and enter the value (or apply a coupon).', 'The total updates instantly.', 'Confirm — large discounts notify the manager automatically.'] },
      { id: 'payments', name: 'Payment modes & UPI QR', roles: ['Cashier', 'Manager'],
        what: 'Accept Cash, UPI, Card or Due. Bills can show a scannable UPI QR so guests pay from their phone.',
        steps: ['Pick the payment mode at settle.', 'For UPI, the bill prints with your UPI QR (set your UPI ID in Print Configuration).', 'Confirm to close the order.'] },
      { id: 'merge-split', name: 'Merge & split bills', roles: ['Cashier', 'Manager'],
        what: 'Combine multiple table orders into one bill, or keep them separate — without losing items.',
        steps: ['Open the order you want to keep as the master.', 'Choose merge and pick the other orders to combine.', 'Settle the single combined bill.'] },
      { id: 'whatsapp', name: 'WhatsApp bill', roles: ['Cashier', 'Manager'],
        what: 'Send the settled bill straight to the customer’s WhatsApp (requires WhatsApp enabled in Settings).',
        steps: ['Enable WhatsApp in Settings (one-time OTP verification).', 'After settling, choose “Share on WhatsApp” and confirm the number.'] },
    ],
  },
  {
    id: 'inventory', title: 'Inventory & Purchasing', Icon: Boxes,
    intro: 'Track stock, buy from suppliers, move stock between branches.',
    features: [
      { id: 'stock', name: 'Stock items & adjustments', roles: ['Manager', 'Chef'],
        what: 'Every ingredient/supply with its unit, current stock, reorder level and cost. Adjust stock for counts, usage or wastage — every change is logged.',
        steps: ['Open Inventory → Stock Items and add each item.', 'Set unit, reorder level and cost per unit.', 'Use “Adjust” for add/remove/wastage; view the movement history anytime.'] },
      { id: 'suppliers-purchases', name: 'Suppliers & purchases', roles: ['Manager'],
        what: 'Keep supplier contacts and record purchases. Receiving a purchase adds the quantities to stock and updates cost.',
        steps: ['Add suppliers under Inventory → Suppliers.', 'Create a purchase, add items and quantities.', 'Click “Receive” when goods arrive — stock and cost update automatically.'],
        tips: ['Record supplier payments to track what you still owe (payables banner).'] },
      { id: 'transfers', name: 'Inter-branch transfers', roles: ['Manager'],
        what: 'Move stock from one restaurant to another with a full record on both sides.',
        steps: ['Open Inventory → Transfers → New Transfer.', 'Pick the destination restaurant and items/quantities.', 'Complete the transfer — stock leaves the source and arrives at the destination.'] },
      { id: 'low-stock', name: 'Low-stock alerts', roles: ['Admin', 'Manager'],
        what: 'When an item drops below its reorder level you get a push (and email if enabled), plus a daily “items to reorder” digest.',
        steps: ['Set a sensible reorder level on each item.', 'Optionally enable alert emails in Settings.', 'Act on alerts / the daily digest to reorder in time.'] },
    ],
  },
  {
    id: 'reports', title: 'Money & Reports', Icon: BarChart3,
    intro: 'See sales, true profit, and a record of every sensitive action.',
    features: [
      { id: 'dashboard', name: 'Dashboard & reports', roles: ['Admin', 'Manager'],
        what: 'Live sales, top items and trends, plus detailed reports: item-wise, table-wise, customer-wise, kitchen-wise, payments, dues, order details and daily closing.',
        steps: ['Open Dashboard for today’s snapshot.', 'Open Reports, pick a report type and date range.', 'Export to PDF or Excel where available, or share with your accountant.'] },
      { id: 'profitability', name: 'Menu profitability', roles: ['Admin', 'Manager'],
        what: 'Food-cost % and margin for every dish (needs recipes). Lowest-margin dishes surface first.',
        steps: ['Make sure dishes have recipes.', 'Open Inventory → Reports → Menu Profitability.', 'Reprice or re-portion the low-margin dishes.'] },
      { id: 'pnl', name: 'Expenses & Profit / Loss', roles: ['Admin', 'Manager'],
        what: 'Log expenses (rent, salaries, utilities) and get a true P&L: Net Sales − COGS − Expenses.',
        steps: ['Open Expenses and add your costs by category.', 'Switch to the “Profit & Loss” tab and pick a period.', 'Read your real net profit and margin.'] },
      { id: 'audit', name: 'Void / refund audit log', roles: ['Admin', 'Manager'],
        what: 'A tamper-evident record of settlements, discounts, voids and refunds — who did what and when.',
        steps: ['Open Audit Log.', 'Filter by action (settle, void, discount…) or date.', 'Review anything unusual.'] },
    ],
  },
  {
    id: 'guests', title: 'Guests & Growth', Icon: Gift,
    intro: 'Reservations, loyalty, offers and feedback to bring guests back.',
    features: [
      { id: 'reservations', name: 'Reservations', roles: ['Receptionist', 'Manager'],
        what: 'Take table bookings with guest details, party size and a status workflow (booked → seated → done).',
        steps: ['Open Reservations and tap New.', 'Enter guest, party size, date/time and (optional) table.', 'Update status as guests arrive and leave.'] },
      { id: 'loyalty', name: 'Loyalty & coupons', roles: ['Admin', 'Manager'],
        what: 'Reward repeat guests with points and run discount coupons (percentage or flat, with rules).',
        steps: ['Open Promotions → Loyalty to set earn/redeem rates.', 'Open the Coupons tab to create codes with limits and validity.', 'Apply coupons at settle time.'] },
      { id: 'feedback', name: 'Customer feedback', roles: ['Admin', 'Manager'],
        what: 'Star ratings and reviews from the QR menu, with an average + breakdown. Low ratings alert managers.',
        steps: ['Guests rate from the QR menu after their meal.', 'Open Feedback to read reviews and the rating breakdown.', 'Respond to low ratings quickly.'] },
      { id: 'customers', name: 'Customer profiles & dues', roles: ['Cashier', 'Manager'],
        what: 'A directory of your guests with contact details, order history and any outstanding dues.',
        steps: ['Open Customers to search or add a guest.', 'Capture the customer at order or settle time to build history.', 'Track and collect outstanding dues from their profile.'],
        tips: ['Customers are also used for loyalty points and WhatsApp bills.'] },
    ],
  },
  {
    id: 'team', title: 'Your Team', Icon: Users,
    intro: 'Staff accounts and attendance.',
    features: [
      { id: 'employees', name: 'Employee management', roles: ['Admin', 'Manager'],
        what: 'Create staff accounts and assign them to restaurants with the right roles.',
        steps: ['Open Employee Management → Add employee.', 'Set their details and password.', 'Assign restaurant(s) and role(s).'] },
      { id: 'attendance', name: 'Attendance', roles: ['Everyone', 'Manager'],
        what: 'Staff clock in/out from the mobile app; managers see the daily roster and worked hours.',
        steps: ['On mobile, open Attendance and tap Clock In at the start of your shift.', 'Tap Clock Out when you leave.', 'Managers review the team’s attendance for the day.'] },
    ],
  },
  {
    id: 'settings', title: 'Settings & Printing', Icon: Settings,
    intro: 'Configure printing, messaging and automated emails — usually a one-time setup.',
    features: [
      { id: 'print-config', name: 'Print configuration (KOT & bills)', roles: ['Admin', 'Manager'],
        what: 'Set how KOTs and bills print: paper size (2"/3"/4"/A4), your logo, restaurant name/address, GST number, UPI ID for the bill QR, and whether one KOT covers all kitchens.',
        steps: ['Open Settings → Print Configuration.', 'Choose KOT or Bill and the paper size.', 'Add logo, GST number and UPI ID; save.'],
        tips: ['Works with ESC/POS thermal printers; the UPI ID powers the scannable pay-QR on bills.'] },
      { id: 'whatsapp-setup', name: 'WhatsApp setup', roles: ['Admin'],
        what: 'Enable WhatsApp billing (one-time, OTP-verified) and optionally auto-send the bill on every settle.',
        steps: ['Open Settings → WhatsApp and request an OTP to your org email.', 'Enter the OTP to enable WhatsApp.', 'Optionally turn on auto-send for settled bills.'] },
      { id: 'daily-summary', name: 'Daily summary & alert emails', roles: ['Admin'],
        what: 'Get an automatic end-of-day sales summary by email, and optionally low-stock/operational alerts.',
        steps: ['Open Settings → Email Notifications.', 'Add recipient emails and enable the daily summary.', 'Optionally enable operational alert emails.'] },
      { id: 'themes', name: 'Appearance & themes', roles: ['Everyone'],
        what: 'Personalise the look with built-in colour themes.',
        steps: ['Open Settings (or the appearance menu) and pick a theme.', 'It applies instantly for your account.'] },
    ],
  },
];

export default function GuidePage() {
  const [active, setActive] = useState(SECTIONS[0].id);

  // Scroll-spy: highlight the section currently in view as the user scrolls.
  useEffect(() => {
    const onScroll = () => {
      const line = window.scrollY + 140; // just below the fixed header
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= line) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-10 bg-gradient-to-b from-amber-50 to-white border-b border-gray-100 print:pt-6">
        <div className="container mx-auto px-4">
          <Link href="/solutions/restaurant" className="inline-flex items-center gap-1.5 text-sm text-amber-600 font-medium mb-4 print:hidden">
            <ArrowLeft className="w-4 h-4" /> Back to Restro360
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">Restro360 — Training Guide</h1>
              <p className="text-gray-600 mt-3 max-w-2xl">A simple, step-by-step guide to every feature. Share it with your team — each section says what the feature is, who uses it, and exactly how to use it.</p>
            </div>
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-amber-600 transition-colors print:hidden">
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 grid lg:grid-cols-[240px_1fr] gap-10">
        {/* Sticky sidebar */}
        <aside className="hidden lg:block print:hidden">
          <nav className="sticky top-28 space-y-1">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setActive(s.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active === s.id ? 'bg-amber-50 text-amber-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
                <s.Icon className="w-4 h-4" /> {s.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="max-w-3xl space-y-16">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center"><s.Icon className="w-5 h-5 text-amber-600" /></div>
                <h2 className="text-2xl font-bold text-gray-900">{s.title}</h2>
              </div>
              <p className="text-gray-500 mb-6">{s.intro}</p>

              <div className="space-y-6">
                {s.features.map((f) => (
                  <div key={f.id} className="rounded-2xl border border-gray-200 p-5 break-inside-avoid">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{f.name}</h3>
                      {f.roles.map((r) => (
                        <span key={r} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{r}</span>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{f.what}</p>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">How to use it</div>
                    <ol className="space-y-2 mb-3">
                      {f.steps.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-700">
                          <span className="shrink-0 w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                    {f.tips && f.tips.length > 0 && (
                      <div className="mt-3 rounded-xl bg-amber-50 border border-amber-100 p-3">
                        {f.tips.map((t) => (
                          <div key={t} className="flex gap-2 text-sm text-amber-800">
                            <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" /><span>{t}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Footer CTA */}
          <div className="rounded-2xl bg-gray-900 text-white p-8 text-center print:hidden">
            <h3 className="text-xl font-bold mb-2">Need a hands-on walkthrough?</h3>
            <p className="text-gray-400 mb-5">Our team can train your staff and set up your menu for you.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-600 transition-colors">
              Talk to us <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
