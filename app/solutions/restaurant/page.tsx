'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  BrowserFrame, PhoneFrame, DashboardMock, PlaceOrderMock, InventoryMock,
  PnlMock, KdsMock, FeedbackMock, PhoneOrderMock, PhoneAttendanceMock,
} from '@/components/restro/Mockups';
import {
  FaCashRegister, FaQrcode, FaConciergeBell, FaUtensils, FaBoxes, FaTruck,
  FaFileInvoiceDollar, FaChartLine, FaCalendarCheck, FaUserClock, FaGift,
  FaCommentDots, FaShieldAlt, FaWhatsapp, FaStore, FaReceipt, FaUsersCog,
  FaPrint, FaMoneyBillWave, FaAddressBook, FaTags, FaCodeBranch,
  FaBell, FaFileExcel, FaEnvelopeOpenText,
} from 'react-icons/fa';
import { BookOpen, ArrowRight, CheckCircle2, Smartphone, Monitor } from 'lucide-react';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

const allFeatures = [
  { icon: FaCashRegister, title: 'Lightning POS', desc: 'Take dine-in, takeaway & delivery orders in seconds with one-tap billing.' },
  { icon: FaQrcode, title: 'QR Self-Ordering', desc: 'Guests scan, browse the menu and order from their table — no app needed.' },
  { icon: FaConciergeBell, title: 'Table Management', desc: 'Live floor status, merge/split bills and per-table order tracking.' },
  { icon: FaUtensils, title: 'Menu, Variants & Add-ons', desc: 'Sizes, combos and modifiers with auto-priced bills and HSN/GST.' },
  { icon: FaReceipt, title: 'KOT & Kitchen Display', desc: 'Auto-print KOTs and a real-time kitchen screen with bump times.' },
  { icon: FaBoxes, title: 'Inventory & Stock', desc: 'Track ingredients, units, reorder levels and a full movement ledger.' },
  { icon: FaTruck, title: 'Suppliers & Purchases', desc: 'Record purchases, receive goods into stock and track supplier dues.' },
  { icon: FaStore, title: 'Inter-Branch Transfers', desc: 'Move stock between your restaurants with a full audit trail.' },
  { icon: FaUtensils, title: 'Recipes & Auto-Deduction', desc: 'Link dishes to ingredients — stock deducts automatically on every sale.' },
  { icon: FaChartLine, title: 'Menu Profitability', desc: 'See food-cost % and margin per dish; spot your hidden money-losers.' },
  { icon: FaFileInvoiceDollar, title: 'Expenses & P&L', desc: 'Log expenses and get a true Profit & Loss: sales − COGS − expenses.' },
  { icon: FaCalendarCheck, title: 'Reservations', desc: 'Take table bookings with status workflow and guest reminders.' },
  { icon: FaUserClock, title: 'Staff Attendance', desc: 'Clock-in/out from the phone with worked-hours and daily rosters.' },
  { icon: FaGift, title: 'Loyalty & Coupons', desc: 'Reward repeat guests with points and run discount campaigns.' },
  { icon: FaCommentDots, title: 'Customer Feedback', desc: 'Collect star ratings & reviews from the QR menu; alert on low scores.' },
  { icon: FaWhatsapp, title: 'WhatsApp Billing', desc: 'Send the bill straight to the customer on WhatsApp after settling.' },
  { icon: FaShieldAlt, title: 'Void / Refund Audit Log', desc: 'Every discount, void and refund recorded for accountability.' },
  { icon: FaUsersCog, title: 'Roles & Multi-Restaurant', desc: 'Per-role access and one login across all your outlets.' },
  { icon: FaPrint, title: 'Thermal KOT & Bill Printing', desc: 'Print KOTs and bills on 2"/3"/4"/A4 with your logo, GST and UPI QR.' },
  { icon: FaFileInvoiceDollar, title: 'GST & HSN Billing', desc: 'Tax-ready bills with CGST/SGST split and per-item HSN codes.' },
  { icon: FaMoneyBillWave, title: 'Multiple Payments & UPI', desc: 'Cash, UPI, Card or Due — with a scannable UPI QR right on the bill.' },
  { icon: FaAddressBook, title: 'Customer CRM & Dues', desc: 'Customer profiles, order history and outstanding-due tracking.' },
  { icon: FaTags, title: 'Discounts & Offers', desc: 'Flat or % discounts with automatic manager alerts on big ones.' },
  { icon: FaCodeBranch, title: 'Merge & Split Bills', desc: 'Combine or split tables and orders without losing a single item.' },
  { icon: FaConciergeBell, title: 'Waiter Call', desc: 'Guests call a waiter from the QR menu — staff are notified instantly.' },
  { icon: FaBell, title: 'Real-time Notifications', desc: 'Push alerts for new orders, waiter calls and low stock — web & mobile.' },
  { icon: FaFileExcel, title: 'Detailed Reports & Exports', desc: 'Item, table, customer & kitchen-wise reports + daily closing, PDF/Excel.' },
  { icon: FaEnvelopeOpenText, title: 'Daily Summary Email', desc: 'A full end-of-day sales summary mailed to owners automatically.' },
];

function FeatureRow({ kicker, title, desc, bullets, reverse, children }: {
  kicker: string; title: string; desc: string; bullets: string[]; reverse?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <motion.div {...fadeUp} className={reverse ? 'lg:order-2' : ''}>
        <span className="text-amber-400 font-semibold text-sm tracking-wide uppercase">{kicker}</span>
        <h3 className="text-3xl md:text-4xl font-bold mt-3 mb-4">{title}</h3>
        <p className="text-gray-400 text-lg mb-6">{desc}</p>
        <ul className="space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className={reverse ? 'lg:order-1' : ''}>
        {children}
      </motion.div>
    </div>
  );
}

export default function RestaurantPage() {
  // Scroll-driven parallax for the hero visual + background glows
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, -90]);
  const blobY = useTransform(scrollY, [0, 700], [0, 120]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <BreadcrumbJsonLd
        trail={[
          { name: 'Solutions', path: '/solutions' },
          { name: 'Restaurant Manager', path: '/solutions/restaurant' },
        ]}
      />

      <Header />

      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-black to-black" />
        <motion.div style={{ y: blobY }} className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-amber-300 text-sm font-medium">Restro360 · Web &amp; Mobile</span>
              </motion.div> */}
              <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="text-4xl md:text-6xl font-extrabold leading-tight">
                Run your entire restaurant
                <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">from one screen</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="text-lg text-gray-300 mt-6 max-w-xl">
                POS, QR ordering, kitchen display, inventory, recipes, profit &amp; loss, loyalty and more — a complete management system for restaurants, cafés and cloud kitchens.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-wrap gap-4 mt-8">
                <a href="https://restro360.engispider.com/login" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-7 py-3.5 rounded-full font-semibold hover:scale-105 transition-transform shadow-xl shadow-amber-500/25">
                  <Monitor className="w-4 h-4" /> Launch App
                </a>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-white/20 bg-white/5 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors">
                  Request a Demo <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/solutions/restaurant/guide" className="inline-flex items-center gap-2 border border-white/20 bg-white/5 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors">
                  <BookOpen className="w-4 h-4" /> Training Guide
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ y: heroY }} className="relative">
              <BrowserFrame>
                <DashboardMock />
              </BrowserFrame>
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} className="hidden md:block absolute -bottom-10 -left-10">
                <PhoneFrame className="scale-[0.62] origin-bottom-left">
                  <PhoneOrderMock />
                </PhoneFrame>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────────────── Trust stats ───────────────────── */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['28+', 'Features in one app'], ['2', 'Apps — Web + Mobile'], ['Real-time', 'Kitchen & stock sync'], ['Multi-outlet', 'One login, all branches']].map(([n, l]) => (
            <motion.div key={l} {...fadeUp}>
              <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">{n}</div>
              <div className="text-gray-400 text-sm mt-1">{l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────────────── Alternating feature rows ───────────── */}
      <section className="py-24 space-y-28 container mx-auto px-4">
        <FeatureRow
          kicker="Front of house"
          title="Take orders in seconds"
          desc="A fast, tap-friendly POS your staff will love — plus QR self-ordering so guests can order from their table."
          bullets={[
            'Dine-in, takeaway & delivery from one screen',
            'Variants, add-ons & combos with auto-priced bills',
            'Auto-KOT to the kitchen and instant GST billing',
            'Live table floor with merge / split bills',
          ]}
        >
          <BrowserFrame url="restro360.engispider.com/place-order"><PlaceOrderMock /></BrowserFrame>
        </FeatureRow>

        <FeatureRow
          reverse
          kicker="Kitchen & supply"
          title="Master your stock and recipes"
          desc="Know exactly what you have, what it costs, and never run out mid-service. Link recipes so stock deducts on every sale."
          bullets={[
            'Ingredients, units, reorder levels & movement ledger',
            'Suppliers, purchases and supplier dues',
            'Inter-branch stock transfers with audit trail',
            'Recipe-based auto-deduction + low-stock alerts',
          ]}
        >
          <BrowserFrame url="restro360.engispider.com/inventory"><InventoryMock /></BrowserFrame>
        </FeatureRow>

        <FeatureRow
          kicker="The numbers"
          title="Know your real profit"
          desc="Most owners only see sales. Restro360 shows true profit — sales minus ingredient cost minus expenses — and the margin on every dish."
          bullets={[
            'Food-cost % and margin per menu item',
            'Expenses module + true Profit & Loss',
            'Sales, item, payment, dues & daily-closing reports',
            'Void / refund / discount audit log',
          ]}
        >
          <BrowserFrame url="restro360.engispider.com/expenses"><PnlMock /></BrowserFrame>
        </FeatureRow>

        <FeatureRow
          reverse
          kicker="Guests"
          title="Delight and bring them back"
          desc="Turn one-time diners into regulars with loyalty, offers and a feedback loop that catches problems before they become bad reviews."
          bullets={[
            'Points-based loyalty & discount coupons',
            'Star ratings & reviews from the QR menu',
            'Low-rating alerts to managers in real time',
            'Send bills on WhatsApp after settling',
          ]}
        >
          <BrowserFrame url="restro360.engispider.com/feedback"><FeedbackMock /></BrowserFrame>
        </FeatureRow>
      </section>

      {/* ───────────────── Kitchen display callout ───────────── */}
      <section className="py-20 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wide">Back of house</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">A live Kitchen Display that keeps service moving</h2>
            <p className="text-gray-400 mt-4">Orders flow straight to the kitchen screen with timers, so nothing is missed and tickets go out faster.</p>
          </motion.div>
          <motion.div {...fadeUp} className="max-w-4xl mx-auto">
            <BrowserFrame url="restro360.engispider.com/kitchen"><KdsMock /></BrowserFrame>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── Full feature grid ─────────────────── */}
      <section className="py-24 container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold">Everything a restaurant needs</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">One platform replaces your POS, billing software, stock register, spreadsheets and feedback forms.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {allFeatures.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 3) * 0.08 }} whileHover={{ y: -6 }}
              className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-amber-500/40 hover:bg-amber-500/[0.04] transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────────────── Web + Mobile ──────────────────────── */}
      <section className="py-24 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Works on the counter <span className="text-amber-400">and</span> in your pocket</h2>
            <p className="text-gray-400 text-lg mb-6">Use the full web app on a billing desk or tablet, and the mobile app for waiters, managers and owners on the move — same data, in real time.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <Monitor className="w-5 h-5 text-amber-400" />
                <div><div className="font-semibold text-sm">Web App</div><div className="text-gray-400 text-xs">Billing, reports, admin</div></div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <Smartphone className="w-5 h-5 text-amber-400" />
                <div><div className="font-semibold text-sm">Mobile App</div><div className="text-gray-400 text-xs">Orders, attendance, on-the-go</div></div>
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="flex justify-center gap-6">
            <PhoneFrame><PhoneOrderMock /></PhoneFrame>
            <PhoneFrame className="mt-10 hidden sm:block"><PhoneAttendanceMock /></PhoneFrame>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── How it works ──────────────────────── */}
      <section className="py-24 container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">Up and running in a day</h2>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ['1', 'Set up your menu', 'Add categories, items, variants and recipes — or we import them for you.'],
            ['2', 'Add tables & staff', 'Create your floor plan, roles and team members with the right access.'],
            ['3', 'Start billing', 'Take orders on web or mobile; KOTs and bills print automatically.'],
            ['4', 'Watch your profit', 'Live dashboards, P&L and stock — make decisions with real numbers.'],
          ].map(([n, t, d], i) => (
            <motion.div key={n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center font-bold text-black mb-4">{n}</div>
              <h3 className="font-bold text-lg mb-2">{t}</h3>
              <p className="text-gray-400 text-sm">{d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────────────── CTA ───────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 to-orange-600 p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-5">Ready to run a smarter restaurant?</h2>
              <p className="text-white/90 text-lg mb-8">See Restro360 live with your own menu. Book a free, no-obligation demo today.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="https://restro360.engispider.com/login" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">
                  <Monitor className="w-4 h-4" /> Launch App
                </a>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-black/20 text-white border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-black/30 transition-all">
                  Request a Demo <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/solutions/restaurant/guide" className="inline-flex items-center gap-2 bg-black/20 text-white border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-black/30 transition-all">
                  <BookOpen className="w-4 h-4" /> Read the Training Guide
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
