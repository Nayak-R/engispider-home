'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  BrowserFrame, PhoneFrame, CampusDashboardMock, FeeCollectMock,
  OnlinePayMock, OutstandingMock, PhonePortalMock,
} from '@/components/academic/Mockups';
import { ArrowRight, CheckCircle2, Monitor, Smartphone } from 'lucide-react';
import {
  FaLayerGroup, FaTachometerAlt, FaUserPlus, FaIdCard, FaFileExcel, FaWallet,
  FaUserShield, FaReceipt, FaPercent, FaCreditCard, FaUndoAlt, FaLandmark,
  FaBookOpen, FaChartLine, FaBed, FaBus, FaBook, FaClipboardCheck, FaCalendarAlt,
  FaGraduationCap, FaBell, FaUsersCog, FaMobileAlt, FaHistory, FaFilePdf,
  FaFileInvoiceDollar,
} from 'react-icons/fa';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

const allFeatures = [
  { icon: FaLayerGroup, title: 'Multi-Institution', desc: 'Run one campus or a whole group — each institute\'s data fully separate, one login to switch.' },
  { icon: FaTachometerAlt, title: 'Role-based Dashboards', desc: 'Everyone lands on what matters to them — collections, approvals, classes or the big picture.' },
  { icon: FaUserPlus, title: 'Online Admissions', desc: 'Guided onboarding with course, category, hostel and transport set in a single flow.' },
  { icon: FaIdCard, title: 'Student 360° Profile', desc: 'Admission, details, fees, receipts, online payments and certificates — one click away.' },
  { icon: FaFileExcel, title: 'Bulk Student Upload', desc: 'Import a whole batch from Excel — validate, preview errors, then commit.' },
  { icon: FaWallet, title: 'Fee Plans, Your Way', desc: 'Fees per course, year, category and student, with mandatory & optional heads.' },
  { icon: FaUserShield, title: 'Double-check Collection', desc: 'Cashier collects, accounts verifies — maker-checker approval on every rupee.' },
  { icon: FaFileInvoiceDollar, title: 'Instant Auto Receipt', desc: 'Every payment — cash, cheque, UPI or online — generates a printable receipt on the spot and posts to your books automatically.' },
  { icon: FaReceipt, title: 'Gap-less Receipts', desc: 'Audit-ready receipt numbers with no gaps and no duplicates, separate value dates.' },
  { icon: FaPercent, title: 'Discount Approvals', desc: 'Every concession needs a second approval before it applies — controlled and traceable.' },
  { icon: FaCreditCard, title: 'Online Fee Payment', desc: 'Parents pay online and get an instant receipt, reconciled with the bank automatically.' },
  { icon: FaUndoAlt, title: 'One-click Refunds', desc: 'Refund a wrong online payment straight to the original source — no forms, no bank visit.' },
  { icon: FaLandmark, title: 'Automatic Accounting', desc: 'Every receipt posts double-entry itself; vouchers, trial balance and P&L stay live.' },
  { icon: FaBookOpen, title: 'Day Book & Day-close', desc: 'A cumulative day book by mode and cashier, with a previous-day close guard.' },
  { icon: FaChartLine, title: 'Outstanding & Defaulters', desc: 'One-click dues by institute, course, year or section — with parent contacts.' },
  { icon: FaBed, title: 'Hostel Management', desc: 'Rooms, bed allotment, transfer, leave — allotting a bed raises the fee automatically.' },
  { icon: FaBus, title: 'Transport Management', desc: 'Routes, stops and fares; map students to a bus, fee added automatically.' },
  { icon: FaBook, title: 'Library', desc: 'Every book with its own identity, stock and location; issue, return and auto-fines.' },
  { icon: FaClipboardCheck, title: 'Attendance', desc: 'Mark student attendance class-wise or day-wise, with leave requests and approvals.' },
  { icon: FaCalendarAlt, title: 'Timetable', desc: 'Publish the class timetable in a click; students and teachers see theirs instantly.' },
  { icon: FaGraduationCap, title: 'Examinations & Results', desc: 'Schedule, form fill-up, exam-fee collection, and result upload, declare & print.' },
  { icon: FaBell, title: 'Notifications & Notices', desc: 'Message parents or any group of students in clicks, with read-acknowledgement.' },
  { icon: FaUsersCog, title: 'Staff, HR & Payroll', desc: 'Records, attendance, leave, salary & payslips, and bank disbursement with maker-checker.' },
  { icon: FaMobileAlt, title: 'Student & Parent Portal', desc: 'Families check dues, pay online, apply for leave, and see results and attendance.' },
  { icon: FaHistory, title: 'Complete Audit Trail', desc: 'Every entry, edit, discount and approval is logged with before-and-after, forever.' },
  { icon: FaFilePdf, title: 'Reports — PDF & Excel', desc: 'Collection, outstanding, defaulters, allotments and more, exported in a click.' },
];

function FeatureRow({ kicker, title, desc, bullets, reverse, children }: {
  kicker: string; title: string; desc: string; bullets: string[]; reverse?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <motion.div {...fadeUp} className={reverse ? 'lg:order-2' : ''}>
        <span className="text-violet-400 font-semibold text-sm tracking-wide uppercase">{kicker}</span>
        <h3 className="text-3xl md:text-4xl font-bold mt-3 mb-4">{title}</h3>
        <p className="text-gray-400 text-lg mb-6">{desc}</p>
        <ul className="space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" />
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Campus360 — Engispider Academic Suite',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Complete School & College ERP — admissions, fees, accounting, online payments, examinations, hostel, transport, library and staff payroll for multi-institution education groups.',
  offers: { '@type': 'Offer', priceCurrency: 'INR', price: '0', description: 'Free demo available' },
  provider: { '@type': 'Organization', name: 'Engispider' },
};

export default function EducationPage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, -90]);
  const blobY = useTransform(scrollY, [0, 700], [0, 120]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-black to-black" />
        <motion.div style={{ y: blobY }} className="absolute -top-20 -right-20 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="text-4xl md:text-6xl font-extrabold leading-tight">
                Run your entire institution
                <span className="block bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">from one screen</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="text-lg text-gray-300 mt-6 max-w-xl">
                Admissions, fees, automatic accounting, online fee payment, examinations, hostel, transport, library and staff payroll — one complete ERP for schools, colleges and multi-institution education groups.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white px-7 py-3.5 rounded-full font-semibold hover:scale-105 transition-transform shadow-xl shadow-violet-500/25">
                  <Monitor className="w-4 h-4" /> Book a Free Demo
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-white/20 bg-white/5 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors">
                  Talk to Sales <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ y: heroY }} className="relative">
              <BrowserFrame url="campus360.engispider.com"><CampusDashboardMock /></BrowserFrame>
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} className="hidden md:block absolute -bottom-10 -left-10">
                <PhoneFrame className="scale-[0.62] origin-bottom-left"><PhonePortalMock /></PhoneFrame>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────────────── Trust stats ───────────────────── */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['One platform', 'Admissions → accounting'], ['Multi-institute', 'One login, every campus'], ['Bank-reconciled', 'Online fee payments'], ['Auto-posted', 'Books balance themselves']].map(([n, l]) => (
            <motion.div key={l} {...fadeUp}>
              <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">{n}</div>
              <div className="text-gray-400 text-sm mt-1">{l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────────────── Alternating feature rows ───────────── */}
      <section className="py-24 space-y-28 container mx-auto px-4">
        <FeatureRow
          kicker="Fees"
          title="Collect fees — with a built-in double check"
          desc="Money is never one person's word. The cashier raises the receipt, accounts verifies it, and only then is the collection final."
          bullets={[
            'Fee plans per course, year, category & student',
            'Course fee as installments; every other head kept separate',
            'An instant printable receipt on every payment — cash or online',
            'Gap-less, audit-ready receipt numbering',
          ]}
        >
          <BrowserFrame url="campus360.engispider.com/fees"><FeeCollectMock /></BrowserFrame>
        </FeatureRow>

        <FeatureRow
          reverse
          kicker="Online payments"
          title="Parents pay from their phone — you reconcile with the bank"
          desc="Fees paid online create an instant receipt and post to your books, and the status is confirmed with the bank, never edited by hand."
          bullets={[
            'Self-pay for parents; pay-on-behalf for staff',
            'Confirmed with the bank — automatic reconciliation',
            'Refund a wrong payment to source in one click',
            'Live KPIs: collected, reconciled, on-hold, refunded',
          ]}
        >
          <BrowserFrame url="campus360.engispider.com/online-payments"><OnlinePayMock /></BrowserFrame>
        </FeatureRow>

        <FeatureRow
          kicker="Reports"
          title="Know who owes what — in one click"
          desc="Outstanding dues filtered exactly how you need them, with guardian contacts ready for follow-up, and one-tap export."
          bullets={[
            'Filter by institute, course, year and section',
            'Defaulter list with parent contact details',
            'Collection, day-wise, mode-wise & fee-plan reports',
            'Export any report to PDF or Excel',
          ]}
        >
          <BrowserFrame url="campus360.engispider.com/reports"><OutstandingMock /></BrowserFrame>
        </FeatureRow>
      </section>

      {/* ───────────────── Accounting callout ───────────── */}
      <section className="py-20 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-violet-400 font-semibold text-sm uppercase tracking-wide">Accounting</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Your books balance themselves</h2>
            <p className="text-gray-400 mt-4">Every approved receipt posts a full double-entry on its own, flows into the voucher book and a cumulative day book. Trial balance and P&amp;L stay live — no separate bookkeeping step, and your CA will wonder what changed.</p>
          </motion.div>
          <motion.div {...fadeUp} className="max-w-4xl mx-auto">
            <BrowserFrame url="campus360.engispider.com/accounting"><OnlinePayMock /></BrowserFrame>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── Full feature grid ─────────────────── */}
      <section className="py-24 container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold">Everything an institution needs</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">One platform replaces your admission registers, fee books, accounting software, spreadsheets and standalone hostel, transport and library records.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {allFeatures.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 3) * 0.08 }} whileHover={{ y: -6 }}
              className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-violet-500/40 hover:bg-violet-500/[0.04] transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 border border-violet-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────────────── Web + Portal ──────────────────────── */}
      <section className="py-24 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">For your office <span className="text-violet-400">and</span> for every parent</h2>
            <p className="text-gray-400 text-lg mb-6">Staff run the full web app on the counter and in the office; students and parents get their own self-service portal to check dues, pay fees, apply for leave and see results — the same data, in real time.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <Monitor className="w-5 h-5 text-violet-400" />
                <div><div className="font-semibold text-sm">Staff Web App</div><div className="text-gray-400 text-xs">Admissions, fees, accounts, reports</div></div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <Smartphone className="w-5 h-5 text-violet-400" />
                <div><div className="font-semibold text-sm">Parent &amp; Student Portal</div><div className="text-gray-400 text-xs">Pay fees, leave, results, attendance</div></div>
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="flex justify-center gap-6">
            <PhoneFrame><PhonePortalMock /></PhoneFrame>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── How it works ──────────────────────── */}
      <section className="py-24 container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">Live in days, not months</h2>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ['1', 'Set up your courses & fees', 'Add institutes, courses, categories and fee plans — or we import them for you.'],
            ['2', 'Bring in your students', 'Upload your whole batch from Excel; each fee ledger is generated automatically.'],
            ['3', 'Collect & reconcile', 'Take fees at the counter or online; receipts post to the books on their own.'],
            ['4', 'Run on real numbers', 'Live dashboards, outstanding, day book and P&L — decisions backed by data.'],
          ].map(([n, t, d], i) => (
            <motion.div key={n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center font-bold text-white mb-4">{n}</div>
              <h3 className="font-bold text-lg mb-2">{t}</h3>
              <p className="text-gray-400 text-sm">{d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────────────── CTA ───────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-5">Ready to run a smarter campus?</h2>
              <p className="text-white/90 text-lg mb-8">See Campus360 live with your own courses and fee structure. Book a free, no-obligation demo today.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-violet-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">
                  <Monitor className="w-4 h-4" /> Book a Free Demo
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-black/20 text-white border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-black/30 transition-all">
                  Talk to Sales <ArrowRight className="w-4 h-4" />
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
