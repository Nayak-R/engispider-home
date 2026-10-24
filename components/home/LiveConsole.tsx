'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import LiveRestaurant from '@/components/home/LiveRestaurant';
import {
  CrmScreen,
  HrmsRealScreen,
  AcademicScreen,
} from '@/components/home/RealScreens';

/**
 * Self-playing product walkthrough for the hero.
 *
 * A single static screenshot sat there doing nothing, which undersold a
 * company with fourteen products. This cycles through four of them, so the
 * hero reads as a short product film without being one.
 *
 * Deliberately not a video:
 *   · a 10-second screen recording is 2–5MB and blocks the LCP area; this is
 *     markup already on the page
 *   · text stays real text — crisp at any density, and the terminology is
 *     readable by anything parsing the page
 *   · nothing to re-record when a product UI changes
 *
 * There is deliberately no simulated cursor. A pointer travelling to
 * coordinates that are not real controls, clicking nothing, reads as exactly
 * what it is. The liveness comes from the data instead — rows arriving,
 * figures settling, a status flipping — which is what an operations screen
 * in use actually looks like.
 *
 * SSR: the first screen renders on the server exactly as before, so the
 * static HTML still carries a complete product screen and the hero's LCP is
 * unaffected. Only the swap is client-side.
 *
 * It pauses on hover and whenever the tab is hidden — an animation running
 * in a background tab is wasted battery — and under prefers-reduced-motion
 * it does not auto-advance at all, leaving the tabs as manual controls.
 */

/**
 * All four are recreations of the real applications, built from screenshots
 * of the running products — so what the hero shows is what a customer
 * actually logs into, down to the navigation, column headings and brand
 * colour of each one.
 */
/*
 * Tab labels drop the shared "Engispider " prefix.
 *
 * Every product carries it, so in four narrow tabs side by side it is the
 * one word that is NOT doing any work — and it is long enough that the part
 * that distinguishes them is what gets ellipsed. Four tabs reading
 * "ENGISPIDER RE…", "ENGISPIDER CA…", "ENGISPIDER CRM", "ENGISPIDER HR…"
 * name nothing. The full product name is on the screen's own lockup
 * directly above, and on its page.
 */
/*
 * The first slide is the one most visitors see, because many never wait
 * for the rotation. Restaurant led here, in the catalogue and in the
 * industry deck at the same time, which read as a restaurant-software
 * company that happens to sell other things. Campus leads now and the
 * rest rotate as before — all four are equally the product.
 */
const SLIDES = [
  { id: 'academic', label: 'Campus', note: 'Academic Suite', Screen: AcademicScreen },
  { id: 'hrms', label: 'HRMS', note: 'HR management', Screen: HrmsRealScreen },
  { id: 'crm', label: 'CRM', note: 'CRM Platform', Screen: CrmScreen },
  { id: 'restro', label: 'Restro', note: 'Restaurant POS', Screen: LiveRestaurant },
];

/** Long enough to read the screen, short enough not to stall the hero. */
const DWELL_MS = 5200;

export default function LiveConsole() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const paused = useRef(false);

  /*
   * Progress is a MotionValue, not state. Driving the bar through state
   * would re-render the whole console every animation frame; this writes
   * straight to the transform instead.
   */
  const progress = useMotionValue(0);

  /*
   * Elapsed lives in a ref, not inside the rAF closure: picking a tab has to
   * restart the dwell. With it closed over, `select` could reset the visible
   * progress bar but not the timer behind it, so a chosen slide was swapped
   * away early — sometimes within a second of being clicked.
   */
  const elapsed = useRef(0);

  useEffect(() => {
    if (reduced) return;

    let raf = 0;
    /*
     * Seeded on the first callback, NOT from performance.now() here.
     *
     * requestAnimationFrame passes the timestamp of when the frame began,
     * which can PRECEDE a performance.now() taken while the effect runs,
     * making the first delta negative.
     */
    let last = 0;

    const tick = (now: number) => {
      if (!last) last = now;
      // Also clamped because a backgrounded tab can return a very large
      // delta, which would otherwise skip several slides in one frame.
      const dt = Math.min(Math.max(now - last, 0), 100);
      last = now;

      if (!paused.current && !document.hidden) {
        elapsed.current += dt;
        if (elapsed.current >= DWELL_MS) {
          elapsed.current = 0;
          setIndex((v) => (v + 1) % SLIDES.length);
        }
        progress.set(elapsed.current / DWELL_MS);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, progress]);

  const select = (i: number) => {
    setIndex(i);
    elapsed.current = 0; // restart the dwell, not just the bar
    progress.set(0);
  };

  const slide = SLIDES[index];
  const Active = slide.Screen;

  return (
    <div
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {/* Fixed height so swapping screens never reflows the hero. */}
      <div className="relative min-h-[23rem] sm:min-h-[25rem]">
        {/* A true crossfade, not mode="wait". Waiting unmounts the outgoing
            screen before the next mounts, leaving a blank beat mid-swap that
            reads as dead air; overlapping them dissolves one into the other
            the way a cut in a product film does. */}
        <AnimatePresence initial={false}>
          <motion.div
            key={SLIDES[index].id}
            initial={reduced ? false : { opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.005 }}
            transition={{ duration: reduced ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="live-screen absolute inset-x-0 top-0 shadow-xl"
          >
            <Active />
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Tabs double as the playlist and the progress indicator. */}
      <div
        className="mt-4 grid gap-px overflow-hidden rounded border border-hairline bg-hairline"
        style={{ gridTemplateColumns: `repeat(${SLIDES.length}, minmax(0, 1fr))` }}
      >
        {SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => select(i)}
              aria-current={active ? 'true' : undefined}
              className={`relative min-h-[2.75rem] overflow-hidden bg-canvas px-3 py-2.5 text-left transition-colors ${
                active ? '' : 'hover:bg-band'
              }`}
            >
              <span
                className={`mono block truncate transition-colors ${
                  active ? 'text-accent-700' : 'text-faint'
                }`}
              >
                {s.label}
              </span>
              <span className="mt-0.5 hidden truncate text-[0.68rem] text-muted sm:block">
                {s.note}
              </span>

              {/* Fills across the dwell, so you can see the next swap coming. */}
              {active && !reduced && (
                <motion.span
                  aria-hidden
                  style={{ scaleX: progress }}
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent-500"
                />
              )}
              {active && reduced && (
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-accent-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
