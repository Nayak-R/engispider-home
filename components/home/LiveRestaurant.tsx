'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Engispider Restro's real dashboard, with the numbers live.
 *
 * Recreated from a screenshot of the running product: the white rail with
 * Place Order / Dashboard as filled blue actions, the blue welcome banner,
 * the four icon stat cards, Today's Summary and Table Status. The product is
 * blue — recolouring it to the site's orange would misrepresent what a buyer
 * logs into.
 *
 * The liveness replaced a simulated cursor. A pointer travelling to
 * coordinates that are not real controls, clicking nothing, reads as exactly
 * what it is. A service in progress doesn't look like someone waving a
 * mouse; it looks like takings climbing, covers counting up and tables
 * flipping between available and occupied — so that is what moves here.
 *
 * Paused while the tab is hidden, frozen entirely under
 * prefers-reduced-motion.
 */

const NAV = [
  'Orders',
  'Settings',
  'Profile',
  'Reservations',
  'Kitchen Display',
  'Attendance',
];

const TICK_MS = 2400;
const TOTAL_TABLES = 10;

const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`;

/** Fixed start, and every step derived arithmetically — Math.random() here
 *  would differ between the server and first client render. */
const START = { revenue: 18240, orders: 37, occupied: 2, tick: 0 };

export default function LiveRestaurant() {
  const [s, setS] = useState(START);
  const reduced = useReducedMotion();
  // Same mount gate as components/mock/Chrome — see the note there for why
  // this is a store read rather than a setState in an effect.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      setS((p) => {
        const tick = p.tick + 1;
        const sale = 180 + ((tick * 137) % 17) * 95;
        return {
          tick,
          revenue: p.revenue + sale,
          orders: p.orders + 1,
          // Tables turn over: fills up, then clears down again.
          occupied: 1 + ((tick * 3) % (TOTAL_TABLES - 2)),
        };
      });
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [reduced]);

  const gross = Math.round(s.revenue * 1.12);
  const tax = Math.round(s.revenue * 0.05);
  const discount = Math.round(s.revenue * 0.03);
  const avg = Math.round(s.revenue / Math.max(s.orders, 1));
  const available = TOTAL_TABLES - s.occupied;

  /**
   * A figure that lifts into place each time it changes.
   *
   * `initial` is withheld until after mount. framer-motion serialises it as
   * an inline style, so hiding on first render shipped every number in this
   * dashboard as style="opacity:0" in the static HTML — thirteen of them on
   * the product page and eight on the homepage, in the hero, above the
   * fold. The entrance was only ever wanted on a LATER value change.
   */
  const Figure = ({ value, className = '' }: { value: string; className?: string }) => (
    <span className="block h-[0.95rem] overflow-hidden">
      <motion.span
        key={value}
        initial={mounted && !reduced ? { y: 12, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
        className={`block font-bold leading-none ${className}`}
      >
        {value}
      </motion.span>
    </span>
  );

  return (
    <div
      aria-hidden="true"
      className="flex overflow-hidden rounded-lg border border-hairline bg-[#F8FAFC] shadow-[0_18px_50px_-28px_rgba(10,15,26,0.3)]"
    >
      {/* Rail */}
      <aside className="hidden w-[128px] shrink-0 border-r border-slate-200 bg-white p-2.5 sm:block">
        <div className="mb-3 flex items-center gap-1.5 px-1">
          <span className="grid h-5 w-5 place-items-center rounded bg-[#F97316] text-[0.5rem] font-bold text-white">
            E
          </span>
          <span className="leading-tight">
            <span className="block text-[0.62rem] font-bold text-slate-900">Engispider Restro</span>
            <span className="block text-[0.4rem] tracking-wide text-slate-500">
              RESTAURANT POS
            </span>
          </span>
        </div>

        <div className="mono mb-1 px-1 text-[0.4rem] text-slate-400">MENU</div>
        <div className="space-y-1">
          <span className="block rounded-md bg-[#2563EB] px-2 py-1.5 text-[0.6rem] font-semibold text-white">
            + Place Order
          </span>
          <span className="block rounded-md bg-[#3B82F6] px-2 py-1.5 text-[0.6rem] font-semibold text-white">
            Dashboard
          </span>
        </div>
        <ul className="mt-1 space-y-[1px]">
          {NAV.map((n) => (
            <li key={n}>
              <span className="block px-2 py-[5px] text-[0.6rem] text-slate-600">{n}</span>
            </li>
          ))}
        </ul>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2">
          <span className="rounded border border-slate-200 px-2 py-0.5 text-[0.56rem] font-medium text-[#2563EB]">
            Test organization
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-right leading-tight">
              <span className="block text-[0.5rem] font-medium text-slate-700">Rahul Test 2</span>
              <span className="block text-[0.42rem] text-slate-400">rahul@engispider.com</span>
            </span>
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#2563EB] text-[0.42rem] font-bold text-white">
              R
            </span>
          </span>
        </div>

        <div className="p-3">
          {/* Blue welcome banner */}
          <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] px-3 py-2.5">
            <span>
              <span className="block text-[0.95rem] font-extrabold leading-tight text-white">
                Welcome back, Rahul ! 👋
              </span>
              <span className="mt-0.5 block text-[0.46rem] text-white/85">
                Test organization • Wednesday, October 21, 2026
              </span>
            </span>
            <span className="grid h-5 w-5 place-items-center rounded bg-white/20 text-[0.5rem] text-white">
              ⟳
            </span>
          </div>

          {/* Stat cards */}
          <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {[
              ['Today’s Revenue', rupees(s.revenue), 'bg-emerald-500', '₹'],
              ['Active Orders', String(s.orders), 'bg-[#2563EB]', '🛒'],
              ['Available Tables', `${available}/${TOTAL_TABLES}`, 'bg-violet-500', '👥'],
              ['Available Items', '4/4', 'bg-amber-500', '🍽'],
            ].map(([label, value, tone, icon]) => (
              <div key={label} className="rounded border border-slate-200 bg-white p-2">
                <span
                  className={`mb-1.5 grid h-5 w-5 place-items-center rounded text-[0.52rem] text-white ${tone}`}
                >
                  {icon}
                </span>
                <span className="block truncate text-[0.44rem] text-slate-500">{label}</span>
                <Figure value={value} className="mt-1 text-[0.8rem] text-slate-900" />
              </div>
            ))}
          </div>

          <div className="mt-2.5 grid grid-cols-[1.6fr_1fr] gap-1.5">
            {/* Today's Summary */}
            <div className="rounded border border-slate-200 bg-white p-2">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[0.56rem] font-bold text-slate-800">Today’s Summary</span>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.4rem] text-slate-500">
                  Oct 21, 2026
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                {[
                  ['Total Orders', String(s.orders), 'bg-blue-50 text-blue-700'],
                  ['Gross Amount', rupees(gross), 'bg-emerald-50 text-emerald-700'],
                  ['Discount', rupees(discount), 'bg-red-50 text-red-600'],
                  ['Tax Collected', rupees(tax), 'bg-violet-50 text-violet-700'],
                  ['Net Revenue', rupees(s.revenue), 'bg-emerald-50 text-emerald-700'],
                  ['Avg Order', rupees(avg), 'bg-amber-50 text-amber-700'],
                ].map(([label, value, tone]) => (
                  <div key={label} className={`rounded p-1.5 ${tone}`}>
                    <span className="block truncate text-[0.42rem] opacity-80">{label}</span>
                    <Figure value={value} className="mt-0.5 text-[0.66rem]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Table Status */}
            <div className="rounded border border-slate-200 bg-white p-2">
              <span className="mb-1.5 block text-[0.56rem] font-bold text-slate-800">
                Table Status
              </span>
              <div className="space-y-1">
                {[
                  ['Available', String(available), 'bg-emerald-50', 'bg-emerald-500'],
                  ['Occupied', String(s.occupied), 'bg-blue-50', 'bg-blue-500'],
                  ['Reserved', '0', 'bg-amber-50', 'bg-amber-500'],
                ].map(([label, value, bg, dot]) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between rounded px-1.5 py-1 ${bg}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                      <span className="text-[0.52rem] text-slate-700">{label}</span>
                    </span>
                    <Figure value={value} className="text-[0.66rem] text-slate-900" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
