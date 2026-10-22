'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';

/**
 * Pinned horizontal scroller.
 *
 * The section is made taller than the viewport; an inner container sticks to
 * the top, and vertical scroll progress through that surplus height is mapped
 * 1:1 onto horizontal travel of the track. That is the mechanism behind the
 * Apple product galleries — the page scrolls normally, but for the duration
 * of this section the movement reads as sideways.
 *
 * Three things make it behave rather than fight the reader:
 *
 *  1. Section height is DERIVED from the measured track width, so the track
 *     finishes travelling exactly as the section ends. Hard-coding a height
 *     is why most implementations either stall at the end or clip the last
 *     item.
 *  2. Only `transform` is animated, so it runs on the compositor at 60fps.
 *  3. It is progressive. Before measurement, with JS off, on touch, or under
 *     prefers-reduced-motion, the identical markup renders as an ordinary
 *     swipeable row with scroll-snap. Nothing is hidden, so every item stays
 *     in the static HTML for crawlers.
 *
 * Pinning is desktop-only and only engages when there is enough overflow to
 * be worth it — hijacking vertical scroll to move content 100px sideways is
 * worse than not doing it at all.
 */

/** Below this much horizontal overflow, pinning is more annoying than useful. */
const MIN_TRAVEL = 220;

/**
 * Above this much travel, pinning is only offered on a large screen.
 *
 * Pinning itself is safe on touch — nothing is hijacked, the track is simply
 * mapped to ordinary page scroll — but the section grows by its travel
 * distance, and a fifteen-card gallery on a phone would become four screens
 * of sideways movement. Short tracks (the five method cards) stay pinned
 * everywhere; long ones fall back to a swipeable row below lg.
 */
const MAX_TRAVEL_SMALL = 1800;

/**
 * Fraction of the section's scroll held still at each end before the track
 * starts moving.
 *
 * This existed because the track began sliding on the first pixel of scroll
 * after pinning, so the first card was already travelling before it could be
 * read. Damped scrolling (components/motion/SmoothScroll.tsx) now solves that
 * at the source — the wheel no longer delivers 400px in one event — so the
 * hold is dead scroll distance and is switched off. Raise it above 0 to
 * bring the pause back.
 */
const HOLD = 0;

/**
 * Scroll-distance multiplier.
 *
 * At 1.0 the track moves one pixel sideways per pixel scrolled, which reads
 * as hurried — the cards flick past faster than they can be read. Stretching
 * the section beyond its minimum slows the apparent travel without changing
 * how far the track actually moves, so each card holds the eye longer.
 */
const PACE = 1.35;

/** How far the marker's brackets sit outside the card they frame, in px. */
const BLEED = 7;

/**
 * The marker's hop between cards.
 *
 * Soft and slightly under-damped: low stiffness so it glides rather than
 * snaps, mass 1 so it carries a little momentum, and damping just high
 * enough to settle without a visible bounce. A stiffer spring made the jump
 * read as a flick — correct, but abrupt against a slow scroll.
 */
const MARKER_SPRING = {
  type: 'spring',
  stiffness: 165,
  damping: 26,
  mass: 1,
} as const;

export default function PinnedScroller({
  header,
  children,
  itemClassName = '',
  ariaLabel,
  className = '',
  highlight = false,
  smallRows = 1,
}: {
  /** Heading block, rendered inside the sticky viewport above the track. */
  header: ReactNode;
  /** One <li> worth of content per entry. */
  children: ReactNode[];
  /** Width classes for each item, e.g. 'w-[268px]'. */
  itemClassName?: string;
  ariaLabel?: string;
  className?: string;
  /** Draw a marker that springs from card to card as the track travels. */
  highlight?: boolean;
  /**
   * Rows to wrap the track into below `lg`. A long track laid out as one
   * row is too much travel to pin on a phone; two rows halve its width and
   * bring it back under the threshold, so the section can animate there
   * instead of falling back to a static swipe.
   */
  smallRows?: 1 | 2;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [travel, setTravel] = useState(0);
  const [pinned, setPinned] = useState(false);
  const reduced = useReducedMotion();

  /*
   * Card geometry for the marker: each card's offset and width WITHIN the
   * track, measured once. `offsetLeft` is a layout value, so it is unaffected
   * by the transform the track is carrying — reading getBoundingClientRect on
   * every card on every frame would give the same answer far more expensively.
   */
  const [cards, setCards] = useState<{ left: number; width: number }[]>([]);
  const [current, setCurrent] = useState(0);


  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mq = window.matchMedia('(min-width: 1024px)');

    const measure = () => {
      if (reduced) {
        setPinned(false);
        setTravel(0);
        return;
      }
      const overflow = track.scrollWidth - window.innerWidth;
      const tooLongForSmall = !mq.matches && overflow > MAX_TRAVEL_SMALL;
      if (overflow > MIN_TRAVEL && !tooLongForSmall) {
        setTravel(overflow);
        setPinned(true);
      } else {
        setPinned(false);
        setTravel(0);
      }

      if (highlight) {
        // `:scope > li` deliberately, not `track.children` — the marker is
        // itself a child of the track, so children[] counted it as card 0 and
        // shifted every index by one.
        const items = [...track.querySelectorAll(':scope > li')] as HTMLLIElement[];
        setCards(items.map((li) => ({ left: li.offsetLeft, width: li.offsetWidth })));
      }
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener('resize', measure);
    mq.addEventListener('change', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      mq.removeEventListener('change', measure);
    };
  }, [reduced, highlight]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /*
   * Built as arrays so HOLD can be 0 without producing duplicate stops,
   * which break interpolation. With a hold, the flat segments at each end
   * are the dwell; without one it is a straight mapping.
   */
  const stops = HOLD > 0 ? [0, HOLD, 1 - HOLD, 1] : [0, 1];
  const xOut = HOLD > 0 ? [0, 0, -travel, -travel] : [0, -travel];
  const pOut = HOLD > 0 ? ['0%', '0%', '100%', '100%'] : ['0%', '100%'];

  const x = useTransform(scrollYProgress, stops, xOut);
  const progress = useTransform(scrollYProgress, stops, pOut);

  /*
   * Which card the marker sits on.
   *
   * Mapped from how far the track has actually travelled, not from a fixed
   * reference line in the viewport. A reference line cannot reach the end of
   * the list: once the track stops, the final cards are parked on the right
   * of the screen and never cross it, so the marker stalled several cards
   * short. Travel progress guarantees the full sweep — card one at rest,
   * the last card when the track has finished moving.
   */
  useMotionValueEvent(x, 'change', (tx) => {
    if (!highlight || cards.length < 2 || !travel) return;
    const t = Math.min(Math.max(-tx / travel, 0), 1);
    setCurrent(Math.round(t * (cards.length - 1)));
  });

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel}
      // useScroll measures against the offset parent; a positioned target
      // keeps those offsets exact (and silences framer-motion's warning).
      className={`relative ${className}`.trim()}
      /*
       * Surplus height accounts for both the dwell at each end and the pace
       * multiplier. The track still moves exactly `travel` pixels, but does
       * so across the middle (1 - 2·HOLD) of a section stretched by PACE —
       * so the held segments and the slower travel both cost real scroll
       * distance rather than eating into the movement.
       */
      style={
        pinned
          ? { height: `calc(100vh + ${Math.round((travel * PACE) / (1 - 2 * HOLD))}px)` }
          : undefined
      }
    >
      <div
        className={
          pinned
            ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden'
            : 'py-14'
        }
      >
        <div className="container-page">{header}</div>

        <motion.ul
          ref={trackRef}
          style={pinned ? { x } : undefined}
          /*
           * `w-max` ONLY while pinned. In the fallback it sat alongside
           * overflow-x-auto on the same element, so the track sized itself to
           * its content, never scrolled, and pushed the whole document
           * sideways — 3.5k pixels of horizontal page scroll on a phone. The
           * scroll container has to be width-constrained; the items keep
           * their size through shrink-0.
           */
          /*
           * Grid rather than flex when wrapping: `grid-flow-col` with a fixed
           * row count fills downwards then across, which is what produces the
           * two-row track. One row everywhere from lg.
           */
          className={`relative mt-10 gap-4 px-[var(--gutter)] ${
            smallRows === 2
              ? 'grid grid-flow-col grid-rows-2 lg:grid-rows-1'
              : 'flex'
          } ${pinned ? 'w-max' : 'w-full snap-x snap-mandatory overflow-x-auto pb-4'}`}
        >
          {/* The marker. One element for the whole track: it springs between
              card positions rather than fading in and out per card, so it
              reads as a single indicator travelling with you. It lives inside
              the track, so the horizontal scroll carries it along for free
              and only the jump between cards is animated. */}
          {highlight && pinned && cards.length > 0 && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute left-0 z-20"
              initial={false}
              animate={{
                // Bleed outside the card so the brackets frame it rather
                // than sitting on its own border.
                x: (cards[current]?.left ?? 0) - BLEED,
                width: (cards[current]?.width ?? 0) + BLEED * 2,
              }}
              style={{ top: -BLEED, bottom: -BLEED }}
              transition={reduced ? { duration: 0 } : MARKER_SPRING}
            >
              {/* Corner brackets, not a full outline — a complete border
                  reads as a selected form field and fights the card's own
                  hairline. Crop marks frame without competing. */}
              {[
                'left-0 top-0 border-l-2 border-t-2 rounded-tl-lg',
                'right-0 top-0 border-r-2 border-t-2 rounded-tr-lg',
                'left-0 bottom-0 border-l-2 border-b-2 rounded-bl-lg',
                'right-0 bottom-0 border-r-2 border-b-2 rounded-br-lg',
              ].map((pos) => (
                <span
                  key={pos}
                  /*
                   * drop-shadow, not box-shadow: it follows the rendered
                   * alpha, so the glow traces the L of the bracket instead
                   * of boxing the whole 24px square. Two passes — a tight
                   * one for definition, a wide one for the halo.
                   */
                  className={`absolute h-6 w-6 border-accent-500 ${pos}`}
                  style={{
                    filter:
                      'drop-shadow(0 0 2px rgba(251,124,31,0.55)) drop-shadow(0 0 9px rgba(251,124,31,0.35))',
                  }}
                />
              ))}
            </motion.span>
          )}
          {/* Each item reveals as it enters. When pinned that plays as the
              track travels; in the swipeable fallback it plays as the reader
              swipes — so the row is never a static wall either way. */}
          {children.map((child, i) => (
            <Reveal
              as="li"
              key={i}
              delay={Math.min(i, 4) * 60}
              className={`shrink-0 snap-start ${itemClassName}`}
            >
              {child}
            </Reveal>
          ))}
        </motion.ul>

        {pinned && (
          <div className="container-page mt-10">
            <div className="h-px w-full bg-hairline-mid">
              <motion.div style={{ width: progress }} className="h-px bg-accent-500" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
