'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import {
  RestaurantScreen,
  CampusScreen,
  LabScreen,
  PharmacyScreen,
  RetailScreen,
  ClinicScreen,
  SiteScreen,
  HrmsScreen,
} from '@/components/home/Screens';
import { scrollToY } from '@/components/motion/SmoothScroll';

/**
 * The comprehension section — a stacking card deck.
 *
 * This is the part of the page that tells a visitor what the company does, so
 * the screens need room and the section needs to hold attention.
 *
 * Each card is `position: sticky` at an offset 16px lower than the one before
 * it. Scrolling pins a card, the next rides up over it, and the stack builds
 * — every card underneath leaving a visible sliver of its top edge. Covered
 * cards scale down and dim, which is what gives the deck depth instead of
 * looking like flat overlap.
 *
 * Scale and opacity come from ONE `useScroll` on the list, passed down as a
 * MotionValue and re-mapped per card onto its own slice of the range. Eight
 * independent scroll listeners would do the same job far more expensively.
 *
 * It degrades cleanly: sticky does not engage below `lg`, and under
 * prefers-reduced-motion the transforms are skipped entirely — in both cases
 * the cards render as an ordinary stacked list. All eight cards and all eight
 * screens are in the static HTML either way.
 */
/**
 * How far the card above must travel over a card before that card starts to
 * recede. Below this, the covered card stays at full size and full contrast.
 */
const COVER_THRESHOLD = 0.4;

/** Sticky offsets, in px. Card i pins at BASE + i*STEP. */
const STICKY_BASE = 104;
const STICKY_STEP = 16;

const INDUSTRIES = [
  {
    slug: 'restaurants',
    name: 'Restaurants & cafes',
    product: 'Engispider Restro',
    href: '/solutions/restaurant',
    note: 'Billing and QR self-ordering at the front, kitchen display behind it, and ingredient stock that deducts itself from the recipe on every sale.',
    Screen: RestaurantScreen,
  },
  {
    slug: 'education',
    name: 'Schools & colleges',
    product: 'Engispider Campus',
    href: '/solutions/education',
    note: 'Admissions, fee plans by course and category, maker-checker approval on every collection, and gap-less audit-ready receipts.',
    Screen: CampusScreen,
  },
  {
    slug: 'laboratories',
    name: 'Laboratories',
    product: 'Engispider LIMS',
    href: '/solutions/lims',
    note: 'Sample inward through preparation, equipment scheduling and test data capture, to a signed report and invoice — with the audit trail intact.',
    Screen: LabScreen,
  },
  {
    slug: 'pharmacies',
    name: 'Pharmacies',
    product: 'Engispider Pharmacy',
    href: '/solutions/pharmacy',
    note: 'Batch and expiry tracking, GST-compliant billing, prescription handling and automatic reorder alerts — built around what actually causes losses.',
    Screen: PharmacyScreen,
  },
  {
    slug: 'retail',
    name: 'Retail',
    product: 'Engispider Retail',
    href: '/solutions/retail',
    note: 'An item master that renders itself from each category configuration, so adding apparel, grocery or electronics is configuration, not a rebuild.',
    Screen: RetailScreen,
  },
  {
    slug: 'sites',
    name: 'Construction & plants',
    product: 'Engispider Site Manager',
    href: '/solutions/site-manager',
    note: 'Receive, store, issue and transfer consumable stock and fixed assets across warehouses, project sites and plants — scoped per organisation.',
    Screen: SiteScreen,
  },
  {
    slug: 'clinics',
    name: 'Clinics',
    product: 'Engispider Clinic',
    href: '/solutions/clinic',
    note: 'Appointments, patient records and billing for outpatient practice.',
    Screen: ClinicScreen,
  },
  {
    slug: 'hr',
    name: 'Any employer',
    product: 'Engispider HRMS',
    href: '/solutions/hrms',
    note: 'Biometric attendance reconciled against payroll, leave workflows, statutory deductions and an employee self-service portal.',
    Screen: HrmsScreen,
  },
];

export default function IndustryScroll() {
  const listRef = useRef<HTMLUListElement>(null);
  const blockRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start start', 'end end'],
  });

  /*
   * Unclamped page scroll, used only to pick the active card.
   *
   * scrollYProgress saturates at 1 when the list's bottom meets the viewport
   * bottom — but the LAST card pins slightly after that point, so its pin
   * position expressed as progress exceeds 1 and can never be reached. The
   * highlight would stay on the second-to-last card while the last one sat
   * pinned on screen. Absolute scroll has no such ceiling.
   */
  const { scrollY } = useScroll();

  /*
   * Each card's coverage window, as a [start, end] pair in list-scroll
   * progress.
   *
   * These MUST be measured rather than assumed. The first version divided
   * the list into equal 1/N slices, but the list's actual scroll travel is
   * (listHeight - viewportHeight), not listHeight — so every window landed
   * early, and the error compounded with index. By card seven a card was
   * dimming a full 8% of the page scroll before anything had touched it.
   *
   * Card i is covered by card i+1 travelling from card i's bottom edge up to
   * card i's pinned top. In scroll-progress terms:
   *
   *   start = (nextTop - stickyTop - height) / travel
   *   end   = (nextTop - stickyTop)          / travel
   */
  const [windows, setWindows] = useState<[number, number][]>([]);

  /**
   * Layout geometry, kept for the jump handler as well as the windows.
   *
   * `ys` are the cards' LAYOUT offsets, accumulated from their heights.
   * They are deliberately NOT read from `offsetTop`: a stuck
   * `position: sticky` element reports its PINNED offset there, not its
   * layout one, so once the deck stacked every measurement silently became
   * the current scroll position. `offsetHeight` is unaffected by sticky,
   * which makes the running sum the only trustworthy source.
   */
  const geom = useRef<{ ys: number[]; switchPx: number[]; travel: number } | null>(null);

  const measure = useCallback(() => {
    const list = listRef.current;
    const els = blockRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!list || els.length < 2) return;

    const travel = list.offsetHeight - window.innerHeight;
    /*
     * The deck stacks at every width now. Sticky positioning plus a
     * scroll-linked transform does not intercept the touch gesture — the
     * page scrolls normally and the cards respond — so there was no reason
     * to leave phones with a plain list and no motion.
     */
    if (travel <= 0) {
      geom.current = null;
      setWindows([]);
      return;
    }

    const heights = els.map((el) => el.offsetHeight);
    const ys: number[] = [];
    heights.reduce((acc, h, i) => {
      ys[i] = acc;
      return acc + h;
    }, 0);

    /*
     * `pinsPx[i]` is the page scroll at which card i is fully pinned — which
     * is also the moment card i-1 is 100% covered.
     *
     * The index must NOT wait for that. Handing over only once the previous
     * card is completely buried leaves the highlight a full card behind what
     * dominates the screen. `switchPx` moves the hand-over to the same
     * COVER_THRESHOLD the dimming uses, so the label changes at the moment
     * the card beneath starts receding.
     */
    const listTop = list.getBoundingClientRect().top + window.scrollY;
    const pinsPx = ys.map((y, i) => listTop + y - (STICKY_BASE + i * STICKY_STEP));
    const switchPx = pinsPx.map((pin, i) =>
      i === 0 ? pin : pinsPx[i - 1] + (pin - pinsPx[i - 1]) * COVER_THRESHOLD
    );
    geom.current = { ys, switchPx, travel };

    /*
     * Card i is covered by card i+1 travelling from card i's bottom edge up
     * to card i's pinned top:
     *   start = (y[i]   - stickyTop) / travel
     *   end   = (y[i+1] - stickyTop) / travel
     */
    setWindows(
      els.map((_, i) => {
        if (i === els.length - 1) return [1, 1] as [number, number];
        const top = STICKY_BASE + i * STICKY_STEP;
        return [(ys[i] - top) / travel, (ys[i + 1] - top) / travel] as [number, number];
      })
    );
  }, []);

  /*
   * Jumping to a card cannot be left to the native anchor.
   *
   * The targets are `position: sticky`, so once the deck is stacked a card
   * further up the list is already pinned near the top of the viewport. The
   * browser measures its CURRENT position, decides it is practically in
   * view, and scrolls a few pixels — which is why clicking "Laboratories"
   * from "Clinics" barely moved.
   *
   * The right destination is the card's LAYOUT position: the scroll offset
   * at which it becomes pinned and is not yet covered by the next card —
   *
   *   listTop + y(i) - stickyTop(i)
   *
   * The href is kept so the link still works without JS and still reads as
   * a link to assistive tech.
   */
  const jumpTo = useCallback(
    (i: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      const list = listRef.current;
      const g = geom.current;
      // Not measured, or sticky is not in play — let the native anchor run.
      if (!list || !g) return;

      event.preventDefault();
      // The list itself is never sticky, so its rect is always trustworthy.
      const listTop = list.getBoundingClientRect().top + window.scrollY;
      const top = listTop + g.ys[i] - (STICKY_BASE + i * STICKY_STEP);

      // Through Lenis where it is running, so the jump uses the same easing
      // as the wheel instead of fighting the rAF loop.
      scrollToY(top);
    },
    []
  );

  /*
   * Measure-then-set is exactly what useLayoutEffect is for: the card
   * geometry cannot be known until the list is laid out, and the value
   * must be committed before paint or the deck jumps on first scroll.
   */
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  /*
   * Active index is COMPUTED from scroll position, not observed.
   *
   * An IntersectionObserver only fires on transitions. Scrolling down, each
   * card newly enters the observation band and reports itself — which works.
   * Scrolling back up it does not: the card being returned to is a stacked
   * sticky card that never stopped intersecting, so no entry fires and the
   * highlight stays frozen wherever the upward scroll began.
   *
   * The hand-over points are already known exactly, so the active card is
   * simply the last one whose point the scroll has passed. That is
   * direction-agnostic and cannot drift.
   */
  useMotionValueEvent(scrollY, 'change', (y) => {
    const g = geom.current;
    if (!g) return;
    let i = 0;
    while (i + 1 < g.switchPx.length && y >= g.switchPx[i + 1]) i += 1;
    // React bails out when the value is unchanged, so this does not re-render
    // on every scroll frame.
    setActive(i);
  });

  return (
    <section aria-label="Built for your industry" className="section">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ------------------------------------------------ held heading */}
          <div className="min-w-0 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="marker mono">Built for your industry</p>
              <h2 className="display mt-4 text-f-5xl">
                This is what it <span className="accent-word">actually looks like</span>.
              </h2>
              <p className="mt-5 max-w-sm text-f-xs leading-relaxed text-body">
                Not a feature list — the real screens. Find the one that looks
                like your business and we will configure it to your process.
              </p>

              <ol className="mt-9 hidden border-t border-hairline lg:block">
                {INDUSTRIES.map((ind, i) => (
                  <li key={ind.slug}>
                    <a
                      href={`#industry-${ind.slug}`}
                      onClick={jumpTo(i)}
                      aria-current={active === i ? 'true' : undefined}
                      className="group flex items-center gap-3 border-b border-hairline py-2.5"
                    >
                      <span
                        aria-hidden
                        className={`h-px transition-all duration-300 ${
                          active === i ? 'w-6 bg-accent-500' : 'w-2.5 bg-hairline-strong'
                        }`}
                      />
                      <span
                        className={`text-f-xs font-medium transition-colors duration-300 ${
                          active === i
                            ? 'text-accent-ink'
                            : 'text-muted group-hover:text-ink'
                        }`}
                      >
                        {ind.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* ---------------------------------------------- stacking deck */}
          <div className="min-w-0 lg:col-span-7 lg:col-start-6">
            <ul ref={listRef} className="relative space-y-0">
              {INDUSTRIES.map((ind, i) => (
                <IndustryCard
                  key={ind.slug}
                  industry={ind}
                  index={i}
                  total={INDUSTRIES.length}
                  progress={scrollYProgress}
                  coverage={windows[i]}
                  registerRef={(el) => {
                    blockRefs.current[i] = el;
                  }}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustryCard({
  industry,
  index,
  total,
  progress,
  coverage,
  registerRef,
}: {
  industry: (typeof INDUSTRIES)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  /** Measured [start, end] of this card's coverage, in list-scroll progress. */
  coverage?: [number, number];
  registerRef: (el: HTMLLIElement | null) => void;
}) {
  const { slug, name, product, href, note, Screen } = industry;
  const reduced = useReducedMotion();

  // The last card is never covered, so it never recedes.
  const isLast = index === total - 1;

  /*
   * The measured window is held in a ref, and the transform reads it through
   * that ref rather than closing over the value.
   *
   * This matters: `useTransform(value, inputRange, outputRange)` binds its
   * ranges when the motion value is created. The windows arrive one render
   * LATER than first paint (they cannot be measured until the cards are laid
   * out), so a transform parameterised directly by `coverage` keeps the
   * placeholder range it was built with and never animates — which is
   * exactly what went wrong: every card sat permanently at "no coverage"
   * and behaved like the uncovered last one.
   *
   * Reading through a ref inside a function transformer sidesteps it: the
   * closure is stable, but the data it reads is always current. The ranges
   * handed to the transforms below are then constants.
   *
   * The ref is written in an effect, not during render. Mutating a ref
   * while rendering is unsafe under concurrent React — a render that gets
   * thrown away still leaves its write behind — and the transform only
   * reads this on animation frames, which always come after the commit.
   */
  const win = useRef<[number, number] | undefined>(coverage);
  useEffect(() => {
    win.current = coverage;
  }, [coverage]);

  /** 0 → untouched, 1 → fully covered by the card above. */
  const covered = useTransform(progress, (p) => {
    const w = win.current;
    if (!w || isLast) return 0;
    const [s, e] = w;
    if (e <= s) return 0;
    return Math.min(Math.max((p - s) / (e - s), 0), 1);
  });

  /*
   * Nothing happens until the card above has actually covered COVER_THRESHOLD
   * of this one. Receding from the first pixel of overlap meant a card dimmed
   * while still almost entirely visible and being read — the change should
   * follow the coverage, not lead it.
   */
  const scale = useTransform(covered, [COVER_THRESHOLD, 1], [1, 0.94], {
    clamp: true,
  });

  /*
   * Receding cards are dimmed with an opaque white SCRIM laid over them, not
   * by lowering the card's own opacity.
   *
   * Opacity on the card makes the card itself translucent, so the card
   * stacked underneath shows straight through it and both become unreadable.
   * A scrim keeps every card fully opaque — it still hides what is beneath —
   * while washing it out to sit visually behind the one on top.
   */
  const dim = useTransform(covered, [COVER_THRESHOLD, 1], [0, 0.62], {
    clamp: true,
  });

  return (
    <li
      ref={registerRef}
      id={`industry-${slug}`}
      className="scroll-mt-28 sticky pb-5 lg:pb-6"
      // Each card pins STICKY_STEP lower than the previous one, so the stack
      // leaves a visible edge of every card beneath it. These same numbers
      // feed the coverage measurement in the parent.
      style={{ top: `${STICKY_BASE + index * STICKY_STEP}px` }}
    >
      <motion.div
        style={reduced ? undefined : { scale }}
        className="relative origin-top"
      >
        <Link
          href={href}
          className="group block overflow-hidden rounded-xl border border-hairline bg-white shadow-lg transition-colors hover:border-accent-300"
        >
          {/* The screen is a wide table. It scrolls inside its own
              container so the page body never does — at 360px its intrinsic
              width was forcing the grid column 10px past the viewport. */}
          <div className="overflow-x-auto border-b border-hairline bg-band p-4">
            <div className="min-w-[320px]">
              <Screen />
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="mono text-faint">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-f-2xl font-bold leading-tight text-ink transition-colors group-hover:text-accent-ink">
                {name}
              </h3>
              <span className="mono text-accent-700">{product}</span>
            </div>

            <p className="mt-3 max-w-xl text-body">{note}</p>

            <span className="mt-4 inline-flex items-center gap-1.5 text-f-xs font-semibold text-ink transition-all group-hover:gap-2.5 group-hover:text-accent-ink">
              Explore {product} <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>

        {!reduced && (
          <motion.div
            aria-hidden
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 rounded-xl bg-canvas"
          />
        )}
      </motion.div>
    </li>
  );
}
