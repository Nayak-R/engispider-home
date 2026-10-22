'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Scroll-linked drift.
 *
 * The element moves a little against the page as it passes through the
 * viewport, so a column of alternating screens reads as depth rather than
 * as a stack of pictures sliding past at one speed. Small on purpose —
 * 28px over a full screen-height of scroll is felt and not seen, which is
 * the only version of this effect that does not become seasickness on a
 * long page.
 *
 * No spring. A spring on a scroll-linked value lags behind the finger and
 * reads as the page being slow; parallax wants to be locked to the scroll
 * position exactly.
 *
 * `y` is a transform, so frames come off the compositor and this costs
 * nothing on the main thread.
 *
 * Reduced motion collapses the RANGE to zero rather than dropping the
 * style. `useReducedMotion` only reports true after hydration, by which
 * point framer-motion has already written `translateY(28px)` inline —
 * and removing the style prop does not clear it, so the first attempt
 * left every screen frozen 24px out of place for exactly the readers who
 * asked for less movement. A [0, 0] range writes translateY(0) and stays
 * there.
 */
export default function Parallax({
  children,
  amount = 28,
  className = '',
}: {
  children: React.ReactNode;
  /** Pixels of travel either side of centre. */
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // From the element entering the bottom of the viewport to leaving the top.
    offset: ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [amount, -amount]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
