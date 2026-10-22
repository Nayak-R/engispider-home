'use client';

import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { scrollToY } from '@/components/motion/SmoothScroll';

/**
 * Scroll-to-top control.
 *
 * The ring around it is the page's read-progress, not decoration: it closes
 * as you move down the document, so the control doubles as "how much is
 * left". That is worth more than a bare arrow on a page this long, and it
 * reuses the same progress-ring idiom as the catalogue counter.
 *
 * It appears only after a screen and a half of scrolling — before that the
 * header is still in reach and a floating button is just clutter.
 */

const R = 20;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  /*
   * Spring the progress rather than binding the raw value. Lenis already
   * eases the scroll position, and a ring driven straight off it reads as
   * slightly jittery on a trackpad; a light spring settles it.
   */
  const smooth = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });
  const dashOffset = useTransform(smooth, (p) => CIRCUMFERENCE * (1 - p));

  useMotionValueEvent(scrollY, 'change', (y) => {
    setVisible(y > window.innerHeight * 1.5);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => scrollToY(0)}
          aria-label="Scroll back to top"
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 12 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 12 }}
          transition={
            reduced
              ? { duration: 0.15 }
              : { type: 'spring', stiffness: 340, damping: 26, mass: 0.7 }
          }
          whileHover={reduced ? undefined : { y: -3 }}
          whileTap={reduced ? undefined : { scale: 0.94 }}
          className="group fixed bottom-6 right-6 z-40 grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full border border-hairline bg-white/90 shadow-lg backdrop-blur transition-colors hover:border-accent-300 md:bottom-8 md:right-8"
        >
          {/* Read progress. -90deg so it starts at twelve o'clock. */}
          <svg
            viewBox="0 0 44 44"
            aria-hidden
            className="absolute inset-0 h-full w-full -rotate-90"
          >
            <circle
              cx="22"
              cy="22"
              r={R}
              fill="none"
              stroke="var(--hairline)"
              strokeWidth="2"
            />
            <motion.circle
              cx="22"
              cy="22"
              r={R}
              fill="none"
              stroke="var(--accent-500)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>

          <ArrowUp
            className="relative h-[1.1rem] w-[1.1rem] text-ink transition-colors group-hover:text-accent-ink"
            strokeWidth={2.25}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
