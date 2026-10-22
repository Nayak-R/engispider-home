'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bell, Search } from 'lucide-react';

/**
 * Shared chrome for every product mockup.
 *
 * Each product draws its own screens, but the frame around them, the
 * liveness, and the proportions of the application shell are the same
 * problem fourteen times over. This is that solved once.
 *
 * ── The proportion rule ──────────────────────────────────────────────────
 * These are drawn at true pixel sizes inside a ~560px column. A 176px
 * sidebar is 17% of a real 1024px app window and 31% of this box, which is
 * why the first drafts read as a huge navigation rail squeezing the content
 * beside it. `MockShell` fixes the rail at 112px — about 20% — and keeps
 * the type small enough to match.
 *
 * ── Liveness ─────────────────────────────────────────────────────────────
 * `useLiveTick` only runs while its screen is on-screen, stops on a hidden
 * tab, and never starts under prefers-reduced-motion, so a page of five
 * dashboards costs one timer at a time rather than five forever.
 *
 * Derive every value arithmetically from the tick. No Math.random(): the
 * server and the first client render must produce identical HTML.
 *
 * ── Hidden from assistive technology ─────────────────────────────────────
 * Every screen is aria-hidden. They illustrate claims that are made in
 * real text beside them, and their contents are demo-tenant figures — a
 * screen reader announcing "Collected today ₹18.49 lakh" as though it
 * were a fact about this company is worse than silence.
 *
 * ── No URLs ──────────────────────────────────────────────────────────────
 * The browser frame shows the MODULE, never an address. The running
 * instances are login-gated tenant deployments a reader has no account
 * for, and a convincing address bar is an invitation to type one.
 */

/* ------------------------------------------------------------ live tick -- */

/** A counter that advances only while visible and motion is allowed. */
export function useLiveTick(ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer: number | undefined;
    const stop = () => {
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (timer === undefined) {
            timer = window.setInterval(() => {
              if (!document.hidden) setTick((t) => t + 1);
            }, ms);
          }
        } else {
          stop();
        }
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [ms]);

  return [ref, tick] as const;
}

/**
 * True only after the first client render.
 *
 * framer-motion serialises `initial` as an inline style, so an `initial`
 * that hides the element ships `style="opacity:0"` in the static HTML.
 * Gate every entrance on this and the server renders the finished state.
 *
 * `useSyncExternalStore` rather than setState-in-an-effect: the server
 * snapshot is false, the client snapshot is true, and the store never
 * changes — so this costs no extra render and no subscription. The
 * effect version triggered a cascading re-render on every mount, which
 * React's own lint rule flags.
 */
const NEVER_CHANGES = () => () => {};
export function useMounted() {
  return useSyncExternalStore(
    NEVER_CHANGES,
    () => true,   // client
    () => false   // server
  );
}

/** A value that lifts into place each time it changes. */
export function Live({ value, className = '' }: { value: string; className?: string }) {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <span className="inline-grid overflow-hidden align-bottom">
      <motion.span
        key={value}
        initial={mounted && !reduced ? { y: '0.75em', opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {value}
      </motion.span>
    </span>
  );
}

/** A small pulse, so a still reader can tell the screen is running. */
export function LiveDot({ label = 'Live' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
      {label}
    </span>
  );
}

/* ---------------------------------------------------------------- frames -- */

export function BrowserFrame({
  children,
  label = 'Engispider',
  className = '',
}: {
  children: React.ReactNode;
  /** The module on screen. Deliberately not a URL. */
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-xl border border-hairline bg-white shadow-[0_18px_50px_-28px_rgba(10,15,26,0.3)] ${className}`}
    >
      <div className="flex h-9 items-center gap-2 border-b border-hairline bg-band px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
        <span className="mono ml-2 truncate text-[0.6rem] text-faint">{label}</span>
      </div>
      <div className="bg-gray-50">{children}</div>
    </div>
  );
}

export function PhoneFrame({
  children,
  label,
  className = '',
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        aria-hidden="true"
        className="relative w-[244px] rounded-[2.2rem] bg-gray-900 p-2.5 shadow-[0_24px_60px_-28px_rgba(10,15,26,0.55)] ring-1 ring-black/20"
      >
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-gray-900" />
        <div className="overflow-hidden rounded-[1.7rem] bg-gray-50">{children}</div>
      </div>
      {label && <p className="mono mt-3 text-center text-[0.6rem] text-faint">{label}</p>}
    </div>
  );
}

/** The detail that makes a phone render read as a phone. */
export function StatusBar({ time = '9:41' }: { time?: string }) {
  return (
    <div className="flex items-center justify-between bg-white px-4 pb-1 pt-2 text-[9px] font-semibold text-gray-700">
      <span>{time}</span>
      <span className="flex items-center gap-1 text-gray-500">
        <span className="inline-block h-2 w-2.5 rounded-[1px] bg-gray-400" />
        <span className="inline-block h-2 w-2.5 rounded-[1px] bg-gray-400" />
        <span className="inline-block h-2 w-4 rounded-[2px] border border-gray-400" />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------ app shell -- */

export type NavItem = { key: string; label: string; Icon: typeof Bell };

/**
 * Generic application shell: a 112px rail, a top bar, and a content well.
 *
 * `accent` is the product's own primary colour. These screens should look
 * like the software they depict, not like this website — recolouring a
 * product to the site's orange misrepresents what a buyer logs into.
 */
export function MockShell({
  product,
  kicker,
  module,
  nav,
  active,
  accent,
  tint,
  rail = 'light',
  badge,
  search = false,
  innerRef,
  children,
}: {
  product: string;
  /** Second line of the lockup, e.g. "SCHOOL ERP". */
  kicker: string;
  module: string;
  nav: NavItem[];
  active: string;
  accent: string;
  /** Light wash of `accent` for the active row and avatar. */
  tint: string;
  /**
   * Some products ship a dark navigation rail — the CRM's is navy. Match
   * the real thing: a buyer who has seen the product should recognise the
   * screenshot, and a buyer who has not should see what they will get.
   */
  rail?: 'light' | 'dark';
  badge?: React.ReactNode;
  search?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
}) {
  return (
    <div ref={innerRef} aria-hidden="true" className="flex text-gray-800 sm:h-[360px]">
      <div
        className={`hidden w-[112px] shrink-0 flex-col py-2.5 sm:flex ${
          rail === 'dark' ? 'bg-[#172554]' : 'border-r border-gray-200 bg-white'
        }`}
      >
        <div
          className={`mb-1.5 flex items-center gap-1.5 border-b px-2.5 pb-2.5 ${
            rail === 'dark' ? 'border-white/10' : 'border-gray-100'
          }`}
        >
          <div
            className="grid h-5 w-5 shrink-0 place-items-center rounded-md text-[9px] font-black text-white"
            style={{ background: accent }}
          >
            E
          </div>
          <span
            className={`min-w-0 text-[9.5px] font-extrabold leading-none ${
              rail === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          >
            {product}
            <span
              className={`mt-0.5 block text-[7px] font-semibold tracking-wide ${
                rail === 'dark' ? 'text-slate-400' : 'text-gray-400'
              }`}
            >
              {kicker}
            </span>
          </span>
        </div>
        {nav.map(({ key, label, Icon }) => {
          const on = key === active;
          return (
            <div key={key} className="px-1.5">
              <div
                className="flex items-center gap-1.5 rounded-md px-2 py-[5px] text-[10px] font-medium"
                style={
                  on
                    ? rail === 'dark'
                      ? { background: 'rgba(255,255,255,0.12)', color: '#fff' }
                      : { background: tint, color: accent }
                    : { color: rail === 'dark' ? '#94a3b8' : '#64748b' }
                }
              >
                <Icon size={12} className="shrink-0" /> {label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-9 items-center justify-between gap-2 border-b border-gray-200 bg-white px-3">
          <span className="flex items-center gap-2 truncate text-[11px] font-bold text-gray-800">
            {module}
            {badge}
          </span>
          <div className="flex shrink-0 items-center gap-2">
            {search && (
              <span className="hidden h-6 w-28 items-center gap-1 rounded-md bg-gray-100 px-1.5 text-[9px] text-gray-400 md:flex">
                <Search size={10} /> Search…
              </span>
            )}
            <span className="relative">
              <Bell size={13} className="text-gray-400" />
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            <div
              className="grid h-5 w-5 place-items-center rounded-full text-[9px] font-bold"
              style={{ background: tint, color: accent }}
            >
              RN
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden p-3">{children}</div>
      </div>
    </div>
  );
}

/** KPI card. Label under the icon, so a four-across row does not ellipse it. */
export function MockStat({
  label,
  value,
  sub,
  Icon,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  Icon: typeof Bell;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-2.5">
      <div
        className="mb-2 grid h-6 w-6 place-items-center rounded-lg"
        style={{ background: `${tone}1a`, color: tone }}
      >
        <Icon size={13} />
      </div>
      <span className="block text-[10px] leading-tight text-gray-500">{label}</span>
      <Live value={value} className="mt-1 block text-sm font-extrabold text-gray-900" />
      {sub && <div className="mt-0.5 text-[9px] font-medium text-emerald-600">{sub}</div>}
    </div>
  );
}
