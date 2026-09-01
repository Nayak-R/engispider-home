/*
 * Realistic in-browser UI mockups of the Restro360 restaurant app.
 * Pure presentational components (no hooks) so they can be dropped into
 * client pages. Styled to resemble the real product (indigo primary, light
 * cards) and framed in browser / phone "chrome" so they read as screenshots.
 */
import {
  LayoutDashboard, ShoppingCart, UtensilsCrossed, Boxes, BarChart3, Users,
  Armchair, ChefHat, Plus, Minus, Search, Bell, IndianRupee, TrendingUp,
  AlertTriangle, Star, CheckCircle2, Clock, Wallet, ChevronDown,
} from 'lucide-react';

const PRIMARY = '#4f46e5';

/* ---------------------------------------------------------------- frames -- */

export function BrowserFrame({ children, url = 'restro360.engispider.com', className = '' }: { children: React.ReactNode; url?: string; className?: string }) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 bg-white ${className}`}>
      <div className="flex items-center gap-2 px-4 h-10 bg-gray-100 border-b border-gray-200">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-amber-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <div className="ml-3 flex-1 max-w-sm">
          <div className="h-6 rounded-md bg-white border border-gray-200 flex items-center px-3 text-[11px] text-gray-400">
            🔒 {url}
          </div>
        </div>
      </div>
      <div className="bg-gray-50">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative w-[260px] rounded-[2.2rem] bg-gray-900 p-2.5 shadow-2xl ring-1 ring-black/20 ${className}`}>
      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-24 h-5 bg-gray-900 rounded-b-2xl z-10" />
      <div className="rounded-[1.7rem] overflow-hidden bg-gray-50">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------- app shell -- */

function Sidebar({ active }: { active: string }) {
  const items = [
    { k: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
    { k: 'orders', label: 'Orders', Icon: ShoppingCart },
    { k: 'tables', label: 'Tables', Icon: Armchair },
    { k: 'items', label: 'Menu', Icon: UtensilsCrossed },
    { k: 'inventory', label: 'Inventory', Icon: Boxes },
    { k: 'reports', label: 'Reports', Icon: BarChart3 },
    { k: 'staff', label: 'Staff', Icon: Users },
  ];
  return (
    <div className="hidden sm:flex w-44 flex-col bg-white border-r border-gray-200 py-3 shrink-0">
      <div className="px-4 pb-3 mb-2 flex items-center gap-2 border-b border-gray-100">
        <div className="w-7 h-7 rounded-lg" style={{ background: PRIMARY }} />
        <span className="font-extrabold text-gray-800 text-xs">Restro360</span>
      </div>
      {items.map(({ k, label, Icon }) => {
        const on = k === active;
        return (
          <div key={k} className="px-2.5">
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] font-medium"
              style={on ? { background: '#eef2ff', color: PRIMARY } : { color: '#64748b' }}>
              <Icon size={15} /> {label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TopBar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-4 h-12 bg-white border-b border-gray-200">
      <span className="font-bold text-gray-800 text-xs">{title}</span>
      <div className="flex items-center gap-3">
        <Bell size={16} className="text-gray-400" />
        <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-[11px] font-bold" style={{ color: PRIMARY }}>RN</div>
      </div>
    </div>
  );
}

function Shell({ active, title, children }: { active: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex sm:h-[360px] text-gray-800">
      <Sidebar active={active} />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar title={title} />
        <div className="flex-1 overflow-hidden p-3 sm:p-4">{children}</div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- cards -- */

function Stat({ label, value, sub, Icon, tone }: { label: string; value: string; sub?: string; Icon: any; tone: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${tone}1a`, color: tone }}>
          <Icon size={15} />
        </div>
        <span className="text-[11px] text-gray-500">{label}</span>
      </div>
      <div className="text-sm font-extrabold text-gray-900">{value}</div>
      {sub && <div className="text-[10px] text-emerald-600 font-medium mt-0.5">{sub}</div>}
    </div>
  );
}

/* --------------------------------------------------------------- screens -- */

export function DashboardMock() {
  return (
    <Shell active="dashboard" title="Dashboard">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <Stat label="Today's Sales" value="₹48,250" sub="▲ 12% vs yesterday" Icon={IndianRupee} tone="#16a34a" />
        <Stat label="Orders" value="126" sub="▲ 8 open" Icon={ShoppingCart} tone={PRIMARY} />
        <Stat label="Avg. Ticket" value="₹383" Icon={TrendingUp} tone="#0891b2" />
        <Stat label="Low Stock" value="4 items" Icon={AlertTriangle} tone="#d97706" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 bg-white rounded-xl border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-700">Revenue · last 7 days</span>
            <span className="text-[10px] text-gray-400">₹2.9L total</span>
          </div>
          <div className="flex items-end gap-2 h-28">
            {[42, 58, 49, 70, 63, 88, 76].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === 5 ? PRIMARY : '#c7d2fe' }} />
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-3">
          <span className="text-xs font-semibold text-gray-700">Top Sellers</span>
          <div className="mt-2 space-y-2">
            {[['Paneer Tikka', '64'], ['Veg Biryani', '52'], ['Masala Dosa', '47'], ['Cold Coffee', '41']].map(([n, q]) => (
              <div key={n} className="flex items-center justify-between text-[11px]">
                <span className="text-gray-600">{n}</span>
                <span className="font-semibold text-gray-800">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function PlaceOrderMock() {
  return (
    <Shell active="orders" title="Place Order">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:h-full">
        <div className="sm:col-span-2 flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-7 rounded-lg bg-white border border-gray-200 flex items-center px-2 text-[11px] text-gray-400 gap-1.5"><Search size={12} /> Search menu…</div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-indigo-50 font-medium" style={{ color: PRIMARY }}>Table 7</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 overflow-hidden">
            {[['Paneer Tikka', 220], ['Veg Biryani', 180], ['Masala Dosa', 120], ['Butter Naan', 40], ['Cold Coffee', 110], ['Gulab Jamun', 80]].map(([n, p], i) => (
              <div key={n} className="bg-white rounded-lg border border-gray-200 p-2">
                <div className="h-10 rounded-md bg-gradient-to-br from-amber-100 to-orange-100 mb-1.5 flex items-center justify-center"><UtensilsCrossed size={16} className="text-amber-500" /></div>
                <div className="text-[11px] font-semibold text-gray-800 truncate">{n}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] font-bold" style={{ color: PRIMARY }}>₹{p}</span>
                  <span className="w-5 h-5 rounded-md flex items-center justify-center text-white" style={{ background: PRIMARY }}><Plus size={12} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-3 flex flex-col">
          <span className="text-xs font-bold text-gray-800 mb-2">Current Order · T7</span>
          <div className="space-y-2 flex-1">
            {[['Paneer Tikka', 1, 220], ['Veg Biryani · Full', 2, 360], ['Butter Naan', 3, 120]].map(([n, q, p]) => (
              <div key={n as string} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center gap-1 text-gray-400"><Minus size={11} /><span className="font-bold text-gray-700">{q}</span><Plus size={11} /></span>
                  <span className="text-gray-700 truncate max-w-[90px]">{n}</span>
                </div>
                <span className="font-semibold text-gray-800">₹{p}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-2 mt-2">
            <div className="flex justify-between text-xs font-bold text-gray-900"><span>Total</span><span>₹700</span></div>
            <button className="w-full mt-2 py-2 rounded-lg text-white text-xs font-bold" style={{ background: PRIMARY }}>Place &amp; Print KOT</button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function InventoryMock() {
  const rows = [
    ['Paneer', '2.5 kg', 'Low', '#d97706'],
    ['Basmati Rice', '18 kg', 'In Stock', '#16a34a'],
    ['Cooking Oil', '0 L', 'Out', '#dc2626'],
    ['Tomato', '9 kg', 'In Stock', '#16a34a'],
    ['Cheese', '1.2 kg', 'Low', '#d97706'],
  ];
  return (
    <Shell active="inventory" title="Inventory · Stock Items">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <Stat label="Total Items" value="86" Icon={Boxes} tone={PRIMARY} />
        <Stat label="Low Stock" value="4" Icon={AlertTriangle} tone="#d97706" />
        <Stat label="Out of Stock" value="1" Icon={AlertTriangle} tone="#dc2626" />
        <Stat label="Stock Value" value="₹1.4L" Icon={Wallet} tone="#16a34a" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-4 px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase border-b border-gray-100">
          <span>Item</span><span>Stock</span><span>Status</span><span className="text-right">Action</span>
        </div>
        {rows.map(([n, s, st, c]) => (
          <div key={n} className="grid grid-cols-4 px-3 py-2 items-center text-[11px] border-b border-gray-50">
            <span className="font-medium text-gray-800">{n}</span>
            <span className="text-gray-600">{s}</span>
            <span><span className="px-2 py-0.5 rounded-full font-semibold" style={{ background: `${c}1a`, color: c }}>{st}</span></span>
            <span className="text-right"><span className="px-2 py-0.5 rounded-md bg-indigo-50 font-medium" style={{ color: PRIMARY }}>Adjust</span></span>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function PnlMock() {
  const rows: [string, string, boolean?][] = [
    ['Gross Sales', '₹4,82,500'],
    ['Less: GST', '−₹41,200'],
    ['Net Sales', '₹4,41,300', true],
    ['Less: COGS (ingredients)', '−₹1,58,900'],
    ['Gross Profit', '₹2,82,400', true],
    ['Less: Operating Expenses', '−₹1,12,000'],
  ];
  return (
    <Shell active="reports" title="Profit & Loss">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <Stat label="Net Sales" value="₹4.41L" Icon={IndianRupee} tone={PRIMARY} />
        <Stat label="Food Cost" value="36%" Icon={TrendingUp} tone="#d97706" />
        <Stat label="Net Profit" value="₹1.70L" sub="38.6% margin" Icon={TrendingUp} tone="#16a34a" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-3">
        <span className="text-xs font-bold text-gray-800">P&amp;L Statement · This Month</span>
        <div className="mt-2 space-y-1.5">
          {rows.map(([l, v, bold]) => (
            <div key={l} className={`flex justify-between text-[11px] ${bold ? 'font-bold text-gray-900 border-t border-gray-100 pt-1.5' : 'text-gray-600'}`}>
              <span>{l}</span><span>{v}</span>
            </div>
          ))}
          <div className="flex justify-between text-xs font-extrabold border-t border-gray-200 pt-2 mt-1" style={{ color: '#16a34a' }}>
            <span>Net Profit</span><span>₹1,70,400</span>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function KdsMock() {
  const cols: [string, string, string[], string][] = [
    ['T3 · #1042', '2m', ['2× Paneer Tikka', '1× Butter Naan'], '#d97706'],
    ['T7 · #1043', '5m', ['1× Veg Biryani', '2× Cold Coffee'], '#dc2626'],
    ['T1 · #1044', 'now', ['3× Masala Dosa'], '#16a34a'],
  ];
  return (
    <Shell active="orders" title="Kitchen Display">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:h-full">
        {cols.map(([t, ago, items, c]) => (
          <div key={t} className="bg-white rounded-xl border-t-4 border border-gray-200 p-3 flex flex-col" style={{ borderTopColor: c }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-800">{t}</span>
              <span className="text-[10px] flex items-center gap-1 text-gray-400"><Clock size={11} /> {ago}</span>
            </div>
            <div className="space-y-1.5 flex-1">
              {items.map((it) => (
                <div key={it} className="text-[11px] text-gray-700 bg-gray-50 rounded-md px-2 py-1">{it}</div>
              ))}
            </div>
            <button className="mt-2 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 text-white" style={{ background: '#16a34a' }}>
              <CheckCircle2 size={13} /> Mark Ready
            </button>
          </div>
        ))}
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------ phone view -- */

export function PhoneOrderMock() {
  return (
    <div className="bg-gray-50">
      <div className="flex items-center justify-between px-4 pt-7 pb-2 bg-white">
        <span className="font-extrabold text-gray-800 text-xs">Place Order</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 font-semibold" style={{ color: PRIMARY }}>Table 5</span>
      </div>
      <div className="p-3 space-y-2 h-[380px] overflow-hidden">
        {[['Paneer Tikka', 220, true], ['Veg Biryani', 180, false], ['Masala Dosa', 120, true], ['Butter Naan', 40, false], ['Cold Coffee', 110, true]].map(([n, p, added]) => (
          <div key={n as string} className="bg-white rounded-xl border border-gray-200 p-2.5 flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center"><UtensilsCrossed size={16} className="text-amber-500" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-gray-800">{n}</div>
              <div className="text-[12px] font-bold" style={{ color: PRIMARY }}>₹{p}</div>
            </div>
            {added ? (
              <div className="flex items-center gap-2 text-gray-700">
                <Minus size={14} /><span className="font-bold text-xs">1</span><Plus size={14} style={{ color: PRIMARY }} />
              </div>
            ) : (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg" style={{ background: '#eef2ff', color: PRIMARY }}>ADD</span>
            )}
          </div>
        ))}
      </div>
      <div className="p-3 bg-white border-t border-gray-100">
        <button className="w-full py-2.5 rounded-xl text-white text-xs font-bold" style={{ background: PRIMARY }}>Place Order · ₹560</button>
      </div>
    </div>
  );
}

export function PhoneAttendanceMock() {
  return (
    <div className="bg-gray-50">
      <div className="px-4 pt-7 pb-2 bg-white"><span className="font-extrabold text-gray-800 text-xs">Attendance</span></div>
      <div className="p-3 h-[380px]">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-3">
          <div className="text-[11px] text-gray-400 uppercase font-semibold mb-1">My status today</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-800 text-xs">Rahul Nayak</div>
              <div className="text-[11px] text-gray-500">In 09:58 · 4h 12m</div>
            </div>
            <button className="px-3 py-2 rounded-xl text-[12px] font-bold flex items-center gap-1.5" style={{ background: '#fef3c7', color: '#b45309' }}>
              <Clock size={14} /> Clock Out
            </button>
          </div>
        </div>
        <div className="text-[11px] font-bold text-gray-400 uppercase mb-2">Today&apos;s team · 6 present</div>
        {[['Anita S.', 'Present'], ['Vikram P.', 'Present'], ['Sana K.', 'Leave']].map(([n, s]) => (
          <div key={n} className="bg-white rounded-xl border border-gray-200 p-3 mb-2 flex items-center justify-between">
            <span className="text-[12px] font-medium text-gray-700">{n}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={s === 'Leave' ? { background: '#fef3c7', color: '#b45309' } : { background: '#dcfce7', color: '#16a34a' }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* small inline chips used by the marketing page */
export function FeedbackMock() {
  return (
    <Shell active="reports" title="Customer Feedback">
      <div className="flex flex-col sm:flex-row gap-3 sm:h-full">
        <div className="w-full sm:w-40 bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center shrink-0">
          <div className="text-4xl font-extrabold text-gray-900">4.6</div>
          <div className="flex gap-0.5 my-1">{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}</div>
          <div className="text-[11px] text-gray-400">312 reviews</div>
        </div>
        <div className="flex-1 space-y-2">
          {[[5, 'Great biryani and super quick service!', 'Aarav'], [4, 'Loved the ambience, dosa was crisp.', 'Meera'], [5, 'Best paneer tikka in town.', 'Karan']].map(([r, c, who], i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-3">
              <div className="flex gap-0.5 mb-1">{[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} className={s <= (r as number) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />)}</div>
              <div className="text-[11px] text-gray-700">{c}</div>
              <div className="text-[10px] text-gray-400 mt-1">{who} · via QR menu</div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export { ChevronDown, ChefHat };
