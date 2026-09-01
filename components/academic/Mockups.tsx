/*
 * Realistic in-browser UI mockups of Campus360 — the Engispider Academic Suite
 * (School & College ERP). Pure presentational components (no hooks), styled to
 * resemble the real product (indigo primary, light cards) and reusing the
 * browser / phone chrome from the Restro360 mockups so they read as screenshots.
 */
import {
  LayoutDashboard, GraduationCap, Wallet, BookOpen, BedDouble, BarChart3,
  IndianRupee, Users, TrendingUp, AlertTriangle, CheckCircle2, Clock,
  Landmark, Search, Bell,
} from 'lucide-react';
import { BrowserFrame, PhoneFrame } from '@/components/restro/Mockups';

export { BrowserFrame, PhoneFrame };

const PRIMARY = '#4f46e5';

function Sidebar({ active }: { active: string }) {
  const items = [
    { k: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
    { k: 'students', label: 'Students', Icon: GraduationCap },
    { k: 'fees', label: 'Fees', Icon: Wallet },
    { k: 'accounting', label: 'Accounting', Icon: Landmark },
    { k: 'hostel', label: 'Hostel', Icon: BedDouble },
    { k: 'library', label: 'Library', Icon: BookOpen },
    { k: 'reports', label: 'Reports', Icon: BarChart3 },
  ];
  return (
    <div className="hidden sm:flex w-44 flex-col bg-white border-r border-gray-200 py-3 shrink-0">
      <div className="px-4 pb-3 mb-2 flex items-center gap-2 border-b border-gray-100">
        <div className="w-7 h-7 rounded-lg" style={{ background: PRIMARY }} />
        <span className="font-extrabold text-gray-800 text-xs">Campus360</span>
      </div>
      {items.map((i) => (
        <div key={i.k} className={`flex items-center gap-2.5 px-4 py-2 text-[12px] ${active === i.k ? 'text-indigo-700 font-semibold bg-indigo-50 border-r-2 border-indigo-600' : 'text-gray-500'}`}>
          <i.Icon className="w-4 h-4" /> {i.label}
        </div>
      ))}
    </div>
  );
}

function Shell({ active, title, children }: { active: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-[360px] text-gray-800">
      <Sidebar active={active} />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-4 h-11 bg-white border-b border-gray-200">
          <span className="font-bold text-xs">{title}</span>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 h-7 px-2 rounded-md bg-gray-100 text-[11px] text-gray-400 w-40"><Search className="w-3.5 h-3.5" /> Search…</div>
            <Bell className="w-4 h-4 text-gray-400" />
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">R</div>
          </div>
        </div>
        <div className="p-3 overflow-hidden bg-gray-50 flex-1">{children}</div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, Icon, tone = PRIMARY }: { label: string; value: string; sub?: string; Icon: any; tone?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-gray-400">{label}</span>
        <span className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: tone + '18' }}><Icon className="w-3.5 h-3.5" style={{ color: tone }} /></span>
      </div>
      <div className="text-sm font-extrabold mt-1 text-gray-800">{value}</div>
      {sub && <div className="text-[10px] mt-0.5" style={{ color: tone }}>{sub}</div>}
    </div>
  );
}

const pill = (t: string, c: string) => <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${c}`}>{t}</span>;

export function CampusDashboardMock() {
  return (
    <Shell active="dashboard" title="Dashboard">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <Stat label="Today's Collection" value="₹3,84,500" sub="▲ net of refunds" Icon={IndianRupee} tone="#16a34a" />
        <Stat label="Students" value="2,461" Icon={Users} tone={PRIMARY} />
        <Stat label="Outstanding" value="₹41.2L" Icon={TrendingUp} tone="#dc2626" />
        <Stat label="Pending approvals" value="7" Icon={Clock} tone="#d97706" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 bg-white rounded-xl border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-3"><span className="text-xs font-semibold text-gray-700">Collection · last 7 days</span><span className="text-[10px] text-gray-400">₹19.4L total</span></div>
          <div className="flex items-end gap-2 h-24">
            {[48, 62, 40, 75, 58, 90, 70].map((h, i) => (<div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === 5 ? PRIMARY : '#c7d2fe' }} />))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-3">
          <span className="text-xs font-semibold text-gray-700">Fees by mode</span>
          <div className="mt-2 space-y-2">
            {[['Online / UPI', '₹1.6L', '#16a34a'], ['Cash', '₹1.1L', '#4f46e5'], ['Cheque', '₹68k', '#0891b2'], ['Bank', '₹40k', '#d97706']].map(([n, v, c]) => (
              <div key={n} className="flex items-center justify-between text-[11px]"><span className="flex items-center gap-1.5 text-gray-600"><span className="w-2 h-2 rounded-full" style={{ background: c }} />{n}</span><span className="font-semibold text-gray-800">{v}</span></div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function FeeCollectMock() {
  return (
    <Shell active="fees" title="Fee Ledger · 24/CS/018 · Ananya Sahoo">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12 px-3 py-2 bg-gray-50 text-[10px] uppercase tracking-wide text-gray-400 font-semibold"><div className="col-span-5">Head</div><div className="col-span-2 text-right">Amount</div><div className="col-span-2 text-right">Paid</div><div className="col-span-2 text-right">Balance</div><div className="col-span-1"></div></div>
        {[
          ['Year 1 · Course Fee', '40,000', '40,000', '0', 'PAID', 'bg-green-100 text-green-700'],
          ['Year 1 · Exam Fee', '3,000', '3,000', '0', 'PAID', 'bg-green-100 text-green-700'],
          ['Year 2 · Course Fee', '40,000', '25,000', '15,000', 'PARTIAL', 'bg-amber-100 text-amber-700'],
          ['Hostel · Bed A-14', '55,000', '0', '55,000', 'DUE', 'bg-red-100 text-red-700'],
        ].map(([h, a, p, b, s, c]) => (
          <div key={h} className="grid grid-cols-12 px-3 py-2 text-[11px] border-t border-gray-100 items-center">
            <div className="col-span-5 text-gray-700">{h}</div><div className="col-span-2 text-right tabular-nums text-gray-600">₹{a}</div><div className="col-span-2 text-right tabular-nums text-green-600">₹{p}</div><div className="col-span-2 text-right tabular-nums text-gray-800 font-semibold">₹{b}</div><div className="col-span-1 text-right">{pill(s as string, c as string)}</div>
          </div>
        ))}
        <div className="flex items-center justify-between px-3 py-2.5 bg-indigo-50 border-t border-indigo-100">
          <span className="text-[11px] text-gray-500">Balance <b className="text-gray-800">₹70,000</b></span>
          <span className="text-[11px] font-bold text-white bg-indigo-600 rounded-md px-3 py-1.5">Collect fee</span>
        </div>
      </div>
      <div className="mt-2 text-[10px] text-gray-400">Course fee tracked as year installments · every other head kept as its own charge, posted to its own income account.</div>
    </Shell>
  );
}

export function OnlinePayMock() {
  return (
    <Shell active="accounting" title="Online Payments">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <Stat label="Collected (net)" value="₹1,62,000" Icon={IndianRupee} tone="#16a34a" />
        <Stat label="Reconciled" value="98%" sub="with bank" Icon={CheckCircle2} tone={PRIMARY} />
        <Stat label="On hold" value="₹4,000" Icon={Clock} tone="#d97706" />
        <Stat label="Refunded" value="₹2,000" Icon={AlertTriangle} tone="#7c3aed" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {[
          ['Ananya Sahoo', '24/CS/018', '₹40,000', 'UPI', 'SUCCESS', 'bg-green-100 text-green-700'],
          ['Rohit Das', '24/EE/041', '₹25,000', 'CARD', 'SUCCESS', 'bg-green-100 text-green-700'],
          ['Isha Panda', '24/CV/007', '₹5,000', 'UPI', 'REFUNDED', 'bg-violet-100 text-violet-700'],
        ].map(([n, r, a, m, s, c]) => (
          <div key={r} className="grid grid-cols-12 px-3 py-2.5 text-[11px] border-t border-gray-100 first:border-t-0 items-center">
            <div className="col-span-4"><div className="font-medium text-gray-700">{n}</div><div className="text-gray-400 text-[10px]">{r}</div></div>
            <div className="col-span-3 text-gray-600">{m}</div><div className="col-span-3 text-right tabular-nums font-semibold text-gray-800">{a}</div><div className="col-span-2 text-right">{pill(s as string, c as string)}</div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function OutstandingMock() {
  return (
    <Shell active="reports" title="Outstanding Dues">
      <div className="flex gap-2 mb-3">
        {['All institutes', 'B.Tech CSE', '2024', 'Section A'].map((f, i) => (<span key={f} className={`text-[10px] px-2.5 py-1 rounded-full border ${i === 0 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-500 border-gray-200'}`}>{f}</span>))}
        <span className="ml-auto text-[10px] px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-500">Export ▾</span>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12 px-3 py-2 bg-gray-50 text-[10px] uppercase tracking-wide text-gray-400 font-semibold"><div className="col-span-4">Student</div><div className="col-span-3">Course · Year</div><div className="col-span-3">Guardian</div><div className="col-span-2 text-right">Due</div></div>
        {[
          ['24/CS/018 · Ananya Sahoo', 'CSE · Year 2', '98xxxxxx01', '70,000'],
          ['24/EE/041 · Rohit Das', 'EEE · Year 2', '98xxxxxx55', '38,500'],
          ['24/ME/112 · Sameer Roy', 'MECH · Year 1', '90xxxxxx12', '12,000'],
          ['24/CV/007 · Isha Panda', 'CIVIL · Year 2', '87xxxxxx90', '9,000'],
        ].map(([s, c, g, d]) => (
          <div key={s} className="grid grid-cols-12 px-3 py-2 text-[11px] border-t border-gray-100 items-center">
            <div className="col-span-4 text-gray-700">{s}</div><div className="col-span-3 text-gray-500">{c}</div><div className="col-span-3 text-gray-500 tabular-nums">{g}</div><div className="col-span-2 text-right tabular-nums font-semibold text-red-600">₹{d}</div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function PhonePortalMock() {
  return (
    <div className="bg-gray-50 h-[440px] flex flex-col">
      <div className="px-4 pt-8 pb-4 bg-indigo-600 text-white">
        <div className="text-[11px] opacity-80">My Fees</div>
        <div className="text-lg font-extrabold mt-1">₹70,000 <span className="text-xs font-medium opacity-80">due</span></div>
        <div className="mt-3 h-2 rounded-full bg-white/25"><div className="h-2 rounded-full bg-white w-3/5" /></div>
        <div className="text-[10px] mt-1 opacity-80">Paid ₹1,06,000 of ₹1,76,000</div>
      </div>
      <div className="p-4 space-y-2 flex-1">
        {[['Year 2 · Course Fee', '₹15,000', 'PARTIAL', 'text-amber-600'], ['Hostel · Bed A-14', '₹55,000', 'DUE', 'text-red-600'], ['Year 1 · Course Fee', '₹0', 'PAID', 'text-green-600']].map(([n, a, s, c]) => (
          <div key={n as string} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-3 py-2.5">
            <div><div className="text-[12px] font-medium text-gray-700">{n}</div><div className={`text-[10px] font-semibold ${c}`}>{s}</div></div>
            <div className="text-[12px] font-bold text-gray-800 tabular-nums">{a}</div>
          </div>
        ))}
      </div>
      <div className="p-4"><div className="bg-indigo-600 text-white text-center text-[13px] font-bold rounded-xl py-3">Pay ₹70,000 online</div></div>
    </div>
  );
}
