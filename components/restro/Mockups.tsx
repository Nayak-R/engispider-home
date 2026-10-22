'use client';

import { motion } from 'framer-motion';
import {
  BrowserFrame,
  PhoneFrame,
  StatusBar,
  LiveDot,
  Live,
  useLiveTick,
  useMounted,
} from '@/components/mock/Chrome';
import {
  LayoutDashboard, ShoppingCart, UtensilsCrossed, Boxes, BarChart3, Users,
  Armchair, Plus, Minus, Search, Bell, IndianRupee, TrendingUp,
  AlertTriangle, Star, CheckCircle2, Clock, Wallet,
} from 'lucide-react';

/*
 * Engispider Restro — product screens.
 *
 * Drawn in HTML rather than exported as images: text stays crisp at any
 * density, each costs a couple of KB instead of ~150KB, there is no network
 * request or layout shift, and nothing goes stale when the product UI moves.
 *
 * ── They are alive ────────────────────────────────────────────────────────
 * A restaurant at service is not a still photograph. Orders arrive, tickets
 * age, stock falls, takings climb and reviews land — so these do that. Every
 * screen is driven by `useLiveTick`, which:
 *
 *   · only runs while the screen is actually on-screen (IntersectionObserver)
 *   · stops when the tab is hidden
 *   · never starts under prefers-reduced-motion
 *
 * so a page of five dashboards costs one timer at a time, not five forever.
 *
 * Every value is derived arithmetically from the tick. No Math.random():
 * the server and the first client render have to produce identical HTML or
 * React throws a hydration mismatch.
 *
 * ── Two corrections from the first build ─────────────────────────────────
 *  1. The chrome shows the MODULE, not a URL. It used to print
 *     restro360.engispider.com — a login-gated tenant deployment a reader
 *     has no account for, and a convincing address bar is an invitation to
 *     type it.
 *  2. Primary is the product's real blue (#2563EB). These were drawn in
 *     indigo while the dashboard recreated from an actual screenshot uses
 *     blue, so the same product appeared in two colours on one site.
 */

export { BrowserFrame, PhoneFrame };

const PRIMARY = '#2563EB';
const TINT = '#EFF6FF';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

/* ------------------------------------------------------------ live tick -- */




/* ---------------------------------------------------------------- frames -- */




/* ------------------------------------------------------------- dish art -- */

/**
 * A drawing per dish, instead of one icon six times.
 *
 * Every menu tile used the same crossed-fork glyph on the same amber
 * square, so a menu of six dishes rendered as six identical placeholders —
 * which is exactly what a menu must not look like. These are flat SVGs, a
 * few hundred bytes each, no network request, and each one is recognisably
 * the thing it names.
 *
 * Decorative: the dish name is printed directly beside every tile, so the
 * art is aria-hidden rather than repeating it to a screen reader.
 */
const DISH_ART: Record<string, { bg: string; art: React.JSX.Element }> = {
  'Paneer Tikka': {
    bg: 'linear-gradient(135deg,#FFE9D1,#FFD2A8)',
    art: (
      <g>
        <path d="M7 31 L31 9" stroke="#A16207" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="10" y="20" width="8" height="8" rx="1.6" transform="rotate(-45 14 24)" fill="#FFF7ED" stroke="#F59E0B" strokeWidth="1.2" />
        <rect x="16" y="14" width="8" height="8" rx="1.6" transform="rotate(-45 20 18)" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.2" />
        <rect x="22" y="8" width="8" height="8" rx="1.6" transform="rotate(-45 26 12)" fill="#FFF7ED" stroke="#F59E0B" strokeWidth="1.2" />
      </g>
    ),
  },
  'Veg Biryani': {
    bg: 'linear-gradient(135deg,#FEF3C7,#FDE68A)',
    art: (
      <g>
        {/* Bowl first, rice sitting INSIDE it — drawn the other way round
            the mound read as a hat balanced on a rim. */}
        <path d="M8 19 h24 a12 12 0 0 1 -24 0 Z" fill="#FFFFFF" stroke="#D6D3D1" strokeWidth="1" />
        <path d="M10 19 h20 a10 10 0 0 1 -20 0 Z" fill="#FEF9C3" />
        <circle cx="16" cy="23" r="1.5" fill="#16A34A" />
        <circle cx="24" cy="22.5" r="1.5" fill="#DC2626" />
        <circle cx="20" cy="26" r="1.3" fill="#F59E0B" />
        <path d="M11 19 q4 -4 9 -4 t9 4" fill="#FFFBEB" stroke="#E7E5E4" strokeWidth="0.8" />
        <rect x="6" y="17.6" width="28" height="2.6" rx="1.3" fill="#B45309" />
      </g>
    ),
  },
  'Masala Dosa': {
    bg: 'linear-gradient(135deg,#FFEDD5,#FED7AA)',
    art: (
      <g>
        <ellipse cx="20" cy="29" rx="15" ry="4.4" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
        {/* The rolled cylinder, with the spiral at the open end. */}
        <rect x="7" y="14" width="26" height="11" rx="5.5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.2" />
        <ellipse cx="33" cy="19.5" rx="2.4" ry="5.5" fill="#FCD34D" stroke="#D97706" strokeWidth="1.1" />
        <path d="M33 17 a2 2 0 0 1 0 5" stroke="#D97706" strokeWidth="0.9" fill="none" />
        <circle cx="12" cy="29" r="2.4" fill="#86EFAC" />
        <circle cx="20" cy="30" r="2.2" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" />
        <circle cx="28" cy="29" r="2.3" fill="#FCA5A5" />
      </g>
    ),
  },
  'Butter Naan': {
    bg: 'linear-gradient(135deg,#FEF9C3,#FDE68A)',
    art: (
      <g>
        <path d="M20 8 C29 10 33 18 31 25 C29 31 23 33 18 32 C11 31 7 25 8 19 C9 13 14 7 20 8 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.3" />
        <circle cx="17" cy="17" r="1.1" fill="#D97706" opacity="0.6" />
        <circle cx="23" cy="22" r="1.1" fill="#D97706" opacity="0.6" />
        <circle cx="15" cy="25" r="0.9" fill="#D97706" opacity="0.5" />
        <circle cx="25" cy="14" r="0.9" fill="#D97706" opacity="0.5" />
      </g>
    ),
  },
  'Cold Coffee': {
    bg: 'linear-gradient(135deg,#EFE4DA,#D9C3B0)',
    art: (
      <g>
        <path d="M23 6 L29 10 L22 20" stroke="#DC2626" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 11 h14 l-2 20 a2 2 0 0 1 -2 2 h-6 a2 2 0 0 1 -2 -2 Z" fill="#FFFFFF" stroke="#A8A29E" strokeWidth="1.1" />
        <path d="M13.7 18 h12.6 l-1.3 13 a2 2 0 0 1 -2 2 h-6 a2 2 0 0 1 -2 -2 Z" fill="#8B5E3C" />
        <ellipse cx="20" cy="14" rx="6" ry="2.3" fill="#FFF7ED" stroke="#E7E5E4" strokeWidth="0.8" />
      </g>
    ),
  },
  'Gulab Jamun': {
    bg: 'linear-gradient(135deg,#FDE2E4,#F8C8C8)',
    art: (
      <g>
        <path d="M7 21 h26 a13 13 0 0 1 -26 0 Z" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
        <ellipse cx="20" cy="21" rx="13" ry="2.4" fill="#C2410C" opacity="0.25" />
        <circle cx="15" cy="20" r="5" fill="#8B4513" />
        <circle cx="25" cy="21" r="4.4" fill="#7C3A10" />
        <circle cx="13.4" cy="18.2" r="1.3" fill="#FFFFFF" opacity="0.55" />
        <circle cx="23.7" cy="19.4" r="1.1" fill="#FFFFFF" opacity="0.45" />
      </g>
    ),
  },
};

function DishArt({ name }: { name: string }) {
  const dish = DISH_ART[name];
  if (!dish) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
        <UtensilsCrossed size={13} className="text-amber-500" />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="flex h-full w-full items-center justify-center"
      style={{ background: dish.bg }}
    >
      {/*
        62% of a deliberately SMALL swatch.

        The first pass filled an oversized swatch edge to edge and read as
        a blown-up icon. Shrinking only the drawing left a big empty colour
        block with a speck in it — so the swatch came down too, and the
        drawing sits at a normal thumbnail ratio inside it.
      */}
      <svg viewBox="0 0 40 40" className="aspect-square h-[62%] w-auto" preserveAspectRatio="xMidYMid meet">
        {dish.art}
      </svg>
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
    <div className="hidden w-[112px] shrink-0 flex-col border-r border-gray-200 bg-white py-2.5 sm:flex">
      <div className="mb-1.5 flex items-center gap-1.5 border-b border-gray-100 px-2.5 pb-2.5">
        <div
          className="grid h-5 w-5 shrink-0 place-items-center rounded-md text-[9px] font-black text-white"
          style={{ background: PRIMARY }}
        >
          E
        </div>
        <span className="min-w-0 text-[9.5px] font-extrabold leading-none text-gray-800">
          Engispider
          <span className="mt-0.5 block text-[7px] font-semibold tracking-wide text-gray-400">
            RESTRO · POS
          </span>
        </span>
      </div>
      {items.map(({ k, label, Icon }) => {
        const on = k === active;
        return (
          <div key={k} className="px-1.5">
            <div
              className="flex items-center gap-1.5 rounded-md px-2 py-[5px] text-[10px] font-medium"
              style={on ? { background: TINT, color: PRIMARY } : { color: '#64748b' }}
            >
              <Icon size={12} className="shrink-0" /> {label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TopBar({ title, badge }: { title: string; badge?: React.ReactNode }) {
  return (
    <div className="flex h-9 items-center justify-between border-b border-gray-200 bg-white px-3">
      <span className="flex items-center gap-2 text-[11px] font-bold text-gray-800">
        {title}
        {badge}
      </span>
      <div className="flex items-center gap-3">
        <span className="relative">
          <Bell size={13} className="text-gray-400" />
          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-red-500" />
        </span>
        <div
          className="grid h-5 w-5 place-items-center rounded-full text-[9px] font-bold"
          style={{ background: TINT, color: PRIMARY }}
        >
          RN
        </div>
      </div>
    </div>
  );
}


function Stat({
  label,
  value,
  sub,
  Icon,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  Icon: typeof Boxes;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3">
      <div
        className="mb-2 grid h-6 w-6 place-items-center rounded-lg"
        style={{ background: `${tone}1a`, color: tone }}
      >
        <Icon size={13} />
      </div>
      <span className="block text-[10px] leading-tight text-gray-500">{label}</span>
      <Live value={value} className="mt-1 block text-sm font-extrabold text-gray-900" />
      {sub && <div className="mt-0.5 text-[10px] font-medium text-emerald-600">{sub}</div>}
    </div>
  );
}

function Shell({
  active,
  title,
  badge,
  innerRef,
  children,
}: {
  active: string;
  title: string;
  badge?: React.ReactNode;
  innerRef?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
}) {
  return (
    <div ref={innerRef} aria-hidden="true" className="flex text-gray-800 sm:h-[360px]">
      <Sidebar active={active} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title={title} badge={badge} />
        <div className="flex-1 overflow-hidden p-3">{children}</div>
      </div>
    </div>
  );
}

/* ============================================================== dashboard */


/* ============================================================ place order */

const MENU: [string, number][] = [
  ['Paneer Tikka', 220],
  ['Veg Biryani', 180],
  ['Masala Dosa', 120],
  ['Butter Naan', 40],
  ['Cold Coffee', 110],
  ['Gulab Jamun', 80],
];

export function PlaceOrderMock() {
  const [ref, t] = useLiveTick(1900);
  const mounted = useMounted();
  // The order builds up one line at a time, then the table is settled and
  // the next one starts — which is what the screen does during service.
  const count = (t % 4) + 1;
  const lines = MENU.slice(0, count);
  const total = lines.reduce((n, [, p]) => n + p, 0);
  const table = 3 + Math.floor(t / 4) % 9;

  return (
    <Shell innerRef={ref} active="orders" title="Place Order" badge={<LiveDot label={`Table ${table}`} />}>
      <div className="grid grid-cols-1 gap-3 sm:h-full sm:grid-cols-5">
        <div className="flex min-h-0 flex-col sm:col-span-3">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-7 flex-1 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 text-[11px] text-gray-400">
              <Search size={12} /> Search menu…
            </div>
            <span className="rounded-full px-2 py-1 text-[10px] font-medium" style={{ background: TINT, color: PRIMARY }}>
              Dine-in
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 overflow-hidden">
            {MENU.slice(0, 4).map(([n, p], i) => {
              const added = i < count;
              return (
                <div
                  key={n}
                  className="rounded-lg border bg-white p-2 transition-colors"
                  style={{ borderColor: added ? PRIMARY : '#e5e7eb' }}
                >
                  <div className="mb-1.5 h-[26px] overflow-hidden rounded-md">
                    <DishArt name={n} />
                  </div>
                  <div className="truncate text-[11px] font-semibold text-gray-800">{n}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[11px] font-bold" style={{ color: PRIMARY }}>₹{p}</span>
                    <span
                      className="grid h-5 w-5 place-items-center rounded-md text-white transition-colors"
                      style={{ background: added ? '#16a34a' : PRIMARY }}
                    >
                      {added ? <CheckCircle2 size={11} /> : <Plus size={12} />}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-3 sm:col-span-2">
          <span className="mb-2 text-xs font-bold text-gray-800">
            Current Order · T{table}
          </span>
          <div className="flex-1 space-y-2">
            {lines.map(([n, p], i) => (
              <motion.div
                key={n}
                initial={mounted ? { opacity: 0, x: 8 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.28, delay: i * 0.03 }}
                className="flex items-center justify-between gap-2 text-[11px]"
              >
                <div className="flex min-w-0 items-center gap-1.5">
                  {/* Tight stepper: at gap-1.5 with 11px icons it took ~45px
                      of a ~175px row and left the dish name reading
                      "Pane…". The name is the part worth seeing. */}
                  <span className="flex shrink-0 items-center gap-0.5 text-gray-400">
                    <Minus size={9} />
                    <span className="text-[10px] font-bold text-gray-700">1</span>
                    <Plus size={9} />
                  </span>
                  <span className="leading-tight text-gray-700">{n}</span>
                </div>
                <span className="shrink-0 font-semibold text-gray-800">₹{p}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-2 border-t border-gray-100 pt-2">
            <div className="flex justify-between text-xs font-bold text-gray-900">
              <span>Total</span>
              <Live value={inr(total)} />
            </div>
            <button
              type="button"
              tabIndex={-1}
              className="mt-2 w-full rounded-lg py-2 text-xs font-bold text-white"
              style={{ background: PRIMARY }}
            >
              Place &amp; Print KOT
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ============================================================== inventory */

export function InventoryMock() {
  const [ref, t] = useLiveTick(2300);

  // Stock falls through service and is topped up on the purchase cycle.
  const rows = [
    { name: 'Paneer', unit: 'kg', start: 6.5, rate: 0.4 },
    { name: 'Basmati Rice', unit: 'kg', start: 24, rate: 0.9 },
    { name: 'Cooking Oil', unit: 'L', start: 3.0, rate: 0.35 },
    { name: 'Tomato', unit: 'kg', start: 14, rate: 0.6 },
    { name: 'Cheese', unit: 'kg', start: 4.2, rate: 0.25 },
  ].map((r) => {
    const left = Math.max(0, r.start - ((t * r.rate) % (r.start + 1)));
    const status = left === 0 ? 'Out' : left < r.start * 0.3 ? 'Low' : 'In Stock';
    const tone = left === 0 ? '#dc2626' : status === 'Low' ? '#d97706' : '#16a34a';
    return { ...r, left, status, tone, pct: Math.round((left / r.start) * 100) };
  });

  const low = rows.filter((r) => r.status === 'Low').length;
  const out = rows.filter((r) => r.status === 'Out').length;

  return (
    <Shell innerRef={ref} active="inventory" title="Inventory · Stock Items" badge={<LiveDot />}>
      <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Total Items" value="86" Icon={Boxes} tone={PRIMARY} />
        <Stat label="Low Stock" value={String(low)} Icon={AlertTriangle} tone="#d97706" />
        <Stat label="Out of Stock" value={String(out)} Icon={AlertTriangle} tone="#dc2626" />
        <Stat label="Stock Value" value="₹1.4L" Icon={Wallet} tone="#16a34a" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.3fr_0.9fr_1fr_0.8fr] border-b border-gray-100 px-3 py-2 text-[10px] font-semibold uppercase text-gray-400">
          <span>Item</span>
          <span>Stock</span>
          <span>Level</span>
          <span className="text-right">Status</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.name}
            className="grid grid-cols-[1.3fr_0.9fr_1fr_0.8fr] items-center border-b border-gray-50 px-3 py-2 text-[11px] last:border-0"
          >
            <span className="truncate font-medium text-gray-800">{r.name}</span>
            <Live value={`${r.left.toFixed(1)} ${r.unit}`} className="text-gray-600" />
            {/* A bar reads as a level at a glance; a number does not. */}
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
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{ background: `${r.tone}1a`, color: r.tone }}
              >
                {r.status}
              </span>
            </span>
          </div>
        ))}
      </div>
    </Shell>
  );
}

/* ==================================================================== P&L */

export function PnlMock() {
  const [ref, t] = useLiveTick(2500);
  const gross = 482500 + t * 1850;
  const gst = Math.round(gross * 0.0854);
  const net = gross - gst;
  const cogs = Math.round(net * 0.36);
  const grossProfit = net - cogs;
  const opex = 112000;
  const profit = grossProfit - opex;
  const margin = ((profit / net) * 100).toFixed(1);

  const rows: [string, string, boolean?][] = [
    ['Gross Sales', inr(gross)],
    ['Less: GST', `−${inr(gst)}`],
    ['Net Sales', inr(net), true],
    ['Less: COGS (ingredients)', `−${inr(cogs)}`],
    ['Gross Profit', inr(grossProfit), true],
    ['Less: Operating Expenses', `−${inr(opex)}`],
  ];

  return (
    <Shell innerRef={ref} active="reports" title="Profit & Loss" badge={<LiveDot label="This month" />}>
      <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat label="Net Sales" value={`₹${(net / 100000).toFixed(2)}L`} Icon={IndianRupee} tone={PRIMARY} />
        <Stat label="Food Cost" value="36%" Icon={TrendingUp} tone="#d97706" />
        <Stat
          label="Net Profit"
          value={`₹${(profit / 100000).toFixed(2)}L`}
          sub={`${margin}% margin`}
          Icon={TrendingUp}
          tone="#16a34a"
        />
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-3">
        <span className="text-xs font-bold text-gray-800">P&amp;L Statement · This Month</span>
        <div className="mt-2 space-y-1.5">
          {rows.map(([l, v, bold]) => (
            <div
              key={l}
              className={`flex justify-between text-[11px] ${
                bold ? 'border-t border-gray-100 pt-1.5 font-bold text-gray-900' : 'text-gray-600'
              }`}
            >
              <span>{l}</span>
              <Live value={v} />
            </div>
          ))}
          <div
            className="mt-1 flex justify-between border-t border-gray-200 pt-2 text-xs font-extrabold"
            style={{ color: '#16a34a' }}
          >
            <span>Net Profit</span>
            <Live value={inr(profit)} />
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ==================================================================== KDS */

export function KdsMock() {
  const [ref, t] = useLiveTick(1800);

  /*
   * Six tickets, two rows of three.
   *
   * Three stretched across a single row left the bottom half of the frame
   * empty, which is the opposite of what a kitchen screen looks like at
   * service — the whole point of the display is that it is full. Six is
   * also enough for all three states to be on screen at once, so the
   * colour coding explains itself without a legend.
   */
  /*
   * `base` is how old each ticket already is on the first frame.
   *
   * Starting them all at zero meant the board opened as six identical
   * green NEW cards and only differentiated after half a minute of
   * watching — so the colour coding, which is the entire point of a
   * kitchen screen, never showed. Staggered, the first frame is already a
   * service in progress: some new, some cooking, one late.
   */
  const tickets = [
    { table: 'T3', items: ['2× Paneer Tikka', '1× Butter Naan'], base: 11 },
    { table: 'T7', items: ['1× Veg Biryani', '2× Cold Coffee'], base: 6 },
    { table: 'T1', items: ['3× Masala Dosa'], base: 2 },
    { table: 'T9', items: ['1× Paneer Tikka', '2× Butter Naan', '1× Gulab Jamun'], base: 9 },
    { table: 'T4', items: ['2× Veg Biryani'], base: 4 },
    { table: 'T12', items: ['1× Masala Dosa', '1× Cold Coffee'], base: 1 },
  ].map((tk, i) => {
    const age = (tk.base + t) % 14;
    const tone = age > 8 ? '#dc2626' : age > 4 ? '#d97706' : '#16a34a';
    const state = age > 8 ? 'LATE' : age > 4 ? 'COOKING' : 'NEW';
    return { ...tk, age, tone, state, id: 1042 + i + Math.floor(t / 14) * 6 };
  });

  return (
    <Shell innerRef={ref} active="orders" title="Kitchen Display" badge={<LiveDot />}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {tickets.map((tk) => (
          <div
            key={tk.table}
            className="flex flex-col rounded-lg border border-t-[3px] border-gray-200 bg-white p-2"
            style={{ borderTopColor: tk.tone }}
          >
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-800">
                {tk.table} · #{tk.id}
              </span>
              <span
                className="flex items-center gap-0.5 text-[9px] font-semibold"
                style={{ color: tk.tone }}
              >
                <Clock size={9} />
                <Live value={`${tk.age}m`} />
              </span>
            </div>

            <div className="flex-1 space-y-1">
              {tk.items.map((it) => (
                <div
                  key={it}
                  className="truncate rounded bg-gray-50 px-1.5 py-[3px] text-[9.5px] text-gray-700"
                >
                  {it}
                </div>
              ))}
            </div>

            <div className="mt-1.5 flex items-center gap-1">
              <span
                className="rounded px-1.5 py-[2px] text-[8px] font-bold tracking-wide"
                style={{ background: `${tk.tone}1a`, color: tk.tone }}
              >
                {tk.state}
              </span>
              <span
                className="flex flex-1 items-center justify-center gap-1 rounded py-[3px] text-[9px] font-bold text-white"
                style={{ background: '#16a34a' }}
              >
                <CheckCircle2 size={10} /> Ready
              </span>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

/* =============================================================== feedback */

const REVIEWS: [number, string, string][] = [
  [5, 'Great biryani and super quick service!', 'Aarav'],
  [4, 'Loved the ambience, dosa was crisp.', 'Meera'],
  [5, 'Best paneer tikka in town.', 'Karan'],
  [5, 'Ordered from the QR menu, no waiting.', 'Divya'],
  [4, 'Good food, bill came on WhatsApp.', 'Rohit'],
];

export function FeedbackMock() {
  const [ref, t] = useLiveTick(3000);
  const mounted = useMounted();
  // Reviews land newest-first, so the list rotates.
  const shown = [0, 1, 2].map((i) => REVIEWS[(t + i) % REVIEWS.length]);
  const count = 312 + t;
  const score = (4.55 + ((t * 3) % 7) / 100).toFixed(2);

  return (
    <Shell innerRef={ref} active="reports" title="Customer Feedback" badge={<LiveDot />}>
      <div className="flex flex-col gap-3 sm:h-full sm:flex-row">
        <div className="flex w-full shrink-0 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 sm:w-36">
          <Live value={score} className="text-3xl font-extrabold text-gray-900" />
          <div className="my-1 flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <Live value={`${count} reviews`} className="text-[11px] text-gray-400" />
        </div>
        <div className="flex-1 space-y-2">
          {shown.map(([r, c, who], i) => (
            <motion.div
              key={`${who}-${c}`}
              initial={mounted ? { opacity: 0, y: -8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-gray-200 bg-white p-3"
            >
              <div className="mb-1 flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={11}
                    className={s <= r ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                  />
                ))}
              </div>
              <div className="text-[11px] text-gray-700">{c}</div>
              <div className="mt-1 text-[10px] text-gray-400">{who} · via QR menu</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ============================================== phone — waiter order app */

export function PhoneOrderMock() {
  const [ref, t] = useLiveTick(2000);
  const added = (t % 4) + 1;
  const total = MENU.slice(0, added).reduce((n, [, p]) => n + p, 0);

  return (
    <div ref={ref} aria-hidden="true" className="bg-gray-50">
      <StatusBar />
      <div className="flex items-center justify-between bg-white px-4 pb-2">
        <span className="text-xs font-extrabold text-gray-800">Place Order</span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ background: TINT, color: PRIMARY }}
        >
          Table 5
        </span>
      </div>
      <div className="h-[340px] space-y-2 overflow-hidden p-3">
        {MENU.slice(0, 5).map(([n, p], i) => {
          const on = i < added;
          return (
            <div
              key={n}
              className="flex items-center gap-2.5 rounded-xl border bg-white p-2.5 transition-colors"
              style={{ borderColor: on ? PRIMARY : '#e5e7eb' }}
            >
              <div className="h-[30px] w-[30px] shrink-0 overflow-hidden rounded-lg">
                <DishArt name={n} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-semibold leading-tight text-gray-800">{n}</div>
                <div className="text-[12px] font-bold" style={{ color: PRIMARY }}>
                  ₹{p}
                </div>
              </div>
              {on ? (
                <div className="flex items-center gap-2 text-gray-700">
                  <Minus size={13} />
                  <span className="text-xs font-bold">1</span>
                  <Plus size={13} style={{ color: PRIMARY }} />
                </div>
              ) : (
                <span
                  className="rounded-lg px-2.5 py-1 text-[11px] font-bold"
                  style={{ background: TINT, color: PRIMARY }}
                >
                  ADD
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="border-t border-gray-100 bg-white p-3">
        <button
          type="button"
          tabIndex={-1}
          className="w-full rounded-xl py-2.5 text-xs font-bold text-white"
          style={{ background: PRIMARY }}
        >
          Place Order · <Live value={inr(total)} />
        </button>
      </div>
    </div>
  );
}

/* ============================================= phone — owner's remote app */

/**
 * The owner's view, from anywhere.
 *
 * This is the screen the whole page argues for: takings, covers, tables and
 * the kitchen, live, on a phone that is not in the building.
 */
export function PhoneOwnerMock() {
  const [ref, t] = useLiveTick(2200);
  const mounted = useMounted();
  const revenue = 42850 + t * 640;
  const orders = 128 + t;
  const busy = 4 + ((t * 3) % 7);

  return (
    <div ref={ref} aria-hidden="true" className="bg-gray-50">
      <StatusBar />
      <div className="flex items-center justify-between bg-white px-4 pb-2">
        <span className="text-xs font-extrabold text-gray-800">Today</span>
        <LiveDot />
      </div>
      <div className="h-[340px] space-y-2.5 overflow-hidden p-3">
        <div className="rounded-2xl p-3.5 text-white" style={{ background: PRIMARY }}>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
            Takings so far
          </div>
          <Live value={inr(revenue)} className="block text-2xl font-extrabold" />
          <div className="mt-1 text-[10px] text-white/80">Linden Street · open now</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            ['Orders', String(orders), '#2563EB'],
            ['Tables busy', `${busy}/12`, '#7c3aed'],
          ].map(([l, v, tone]) => (
            <div key={l} className="rounded-xl border border-gray-200 bg-white p-2.5">
              <div className="text-[10px] text-gray-500">{l}</div>
              <Live value={v} className="block text-base font-extrabold" />
              <span className="mt-1 block h-1 w-8 rounded-full" style={{ background: tone }} />
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-800">Latest orders</span>
            <span className="text-[9px] text-gray-400">auto-refresh</span>
          </div>
          {[0, 1, 2].map((i) => {
            const id = 1042 + orders - i;
            const amt = 320 + ((id * 37) % 9) * 85;
            return (
              <motion.div
                key={id}
                initial={mounted ? { opacity: 0, y: -6 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="flex items-center justify-between border-b border-gray-50 py-1.5 text-[11px] last:border-0"
              >
                <span className="text-gray-600">
                  #{id} · T{3 + (id % 9)}
                </span>
                <span className="font-semibold text-gray-800">{inr(amt)}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================== phone — staff attendance */


/* ================================================ phone — guest QR menu */

/**
 * What the guest sees after scanning the code on the table.
 *
 * No app, no download, no account — which is the whole argument for it, so
 * the screen leads with the table number it already knows and a running
 * total, not a sign-in.
 */
export function PhoneQrMock() {
  const [ref, t] = useLiveTick(2100);
  const picked = (t % 3) + 1;
  const total = MENU.slice(1, 1 + picked).reduce((n, [, p]) => n + p, 0);

  return (
    <div ref={ref} aria-hidden="true" className="bg-gray-50">
      <StatusBar />
      <div className="px-4 pb-3 pt-1 text-center">
        <div className="text-[13px] font-extrabold text-gray-900">Linden Street Kitchen</div>
        <div className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Scanned at Table 9
        </div>
      </div>

      <div className="flex gap-1.5 overflow-hidden px-3 pb-2">
        {['Starters', 'Mains', 'Drinks'].map((c, i) => (
          <span
            key={c}
            className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold"
            style={i === 1 ? { background: PRIMARY, color: '#fff' } : { background: '#fff', color: '#64748b' }}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="h-[280px] space-y-2 overflow-hidden px-3">
        {MENU.slice(1, 5).map(([n, p], i) => {
          const on = i < picked;
          return (
            <div
              key={n}
              className="flex items-center gap-2.5 rounded-xl border bg-white p-2.5 transition-colors"
              style={{ borderColor: on ? PRIMARY : '#e5e7eb' }}
            >
              <div className="h-[30px] w-[30px] shrink-0 overflow-hidden rounded-lg">
                <DishArt name={n} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-semibold leading-tight text-gray-800">{n}</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold" style={{ color: PRIMARY }}>₹{p}</span>
                  {/* The Indian veg mark — a green dot in a green square.
                      Instantly readable here, and the one piece of menu
                      furniture every guest in this market looks for. */}
                  <span
                    aria-hidden
                    className="grid h-2.5 w-2.5 place-items-center rounded-[1px] border"
                    style={{ borderColor: '#16A34A' }}
                  >
                    <span className="block h-1 w-1 rounded-full" style={{ background: '#16A34A' }} />
                  </span>
                </div>
              </div>
              {on ? (
                <span className="grid h-6 w-6 place-items-center rounded-lg text-white" style={{ background: '#16a34a' }}>
                  <CheckCircle2 size={13} />
                </span>
              ) : (
                <span className="rounded-lg px-2.5 py-1 text-[11px] font-bold" style={{ background: TINT, color: PRIMARY }}>
                  ADD
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-100 bg-white p-3">
        <button
          type="button"
          tabIndex={-1}
          className="w-full rounded-xl py-2.5 text-xs font-bold text-white"
          style={{ background: PRIMARY }}
        >
          Send to kitchen · <Live value={inr(total)} />
        </button>
        <p className="mt-1.5 text-center text-[9px] text-gray-400">No app. No sign-in.</p>
      </div>
    </div>
  );
}
