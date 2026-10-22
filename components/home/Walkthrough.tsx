'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MaskText, Reveal } from '@/components/motion/Reveal';

/**
 * "From one order to the P&L" — a traced example.
 *
 * Abstract capability lists ("inventory management", "reporting") are
 * forgettable. One job followed end to end makes the whole system legible at
 * once, which is why this sits immediately after the industry screens.
 *
 * The rail is scroll-linked: a fill grows down the track as the section
 * passes, with a marker riding its leading edge, and each step lights up as
 * the marker reaches it.
 *
 * The fill and the active step are driven from the SAME reference line — the
 * vertical middle of the viewport. `useScroll` measures the list against
 * `start 50% / end 50%`, and the IntersectionObserver uses a zero-height band
 * at `-50% 0px -50% 0px`, which is that identical line. Deriving the active
 * index from a separate heuristic is what makes most of these drift, so that
 * the marker sits between two steps while a third is highlighted.
 */

const STEPS = [
  {
    n: '01',
    t: 'The guest orders',
    d: 'A table scans the QR code and orders, or a server rings it in on the POS. The bill is built with the right variant, add-on, HSN code and GST rate automatically.',
    tag: 'POS · QR ordering',
  },
  {
    n: '02',
    t: 'The kitchen sees it',
    d: 'A KOT prints and the ticket lands on the kitchen display the same second, with bump timing so nobody has to shout across the pass.',
    tag: 'Kitchen display',
  },
  {
    n: '03',
    t: 'Stock moves itself',
    d: 'Each dish is linked to its recipe, so the paneer, oil and gas behind that order come out of inventory the moment it is served. No stock-take required to know what you hold.',
    tag: 'Recipes · Inventory',
  },
  {
    n: '04',
    t: 'The books are already done',
    d: 'Sales, cost of goods and expenses land in a real profit-and-loss by outlet. You can see food-cost percentage per dish and find the items quietly losing money.',
    tag: 'P&L · Menu profitability',
  },
];

export default function Walkthrough() {
  const listRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(-1);

  // Progress of the viewport midline through the list.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 50%', 'end 50%'],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!els.length) return;

    // A zero-height band on the viewport midline — the same line the fill is
    // measured against, so marker and highlight always agree.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = els.indexOf(e.target as HTMLLIElement);
            if (i !== -1) setActive(i);
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section border-y border-hairline bg-band">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="marker mono">How it works</p>
              <MaskText as="h2" className="display mt-5 text-f-6xl">
                <>From one order</>
                <>to the <span className="accent-word">P&amp;L</span>.</>
              </MaskText>
              <Reveal delay={140}>
                <p className="mt-6 max-w-md leading-relaxed text-body">
                  Every Engispider product works this way: the operational
                  action a person already takes is the thing that updates
                  stock, the ledger and the reports. Nobody re-keys anything.
                </p>
                <Link href="/solutions/restaurant" className="btn btn-primary mt-8">
                  See Engispider Restro in full <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ol ref={listRef} className="relative pl-16 sm:pl-20">
              {/* Track. The fill and its marker are decorative — every step is
                  fully legible without them.

                  Deliberately heavy: a 2px rail with 24px nodes was too quiet
                  to read as the point of the section. At 4px with 48px nodes
                  the progression is visible in peripheral vision while the
                  reader is on the text. */}
              <div
                aria-hidden
                className="absolute bottom-0 left-4 top-0 w-1 rounded-full bg-hairline-mid sm:left-5"
              >
                <motion.div
                  style={{ height: fill }}
                  className="relative w-full rounded-full bg-accent-500"
                >
                  {/* Marker rides the leading edge of the fill. */}
                  <span className="absolute -bottom-7 left-1/2 block h-14 w-14 -translate-x-1/2 rounded-full bg-accent-500/15 animate-pulse-ring" />
                  <span className="absolute -bottom-3 left-1/2 block h-6 w-6 -translate-x-1/2 rounded-full bg-accent-500 opacity-50 blur-md" />
                  <span className="absolute -bottom-2.5 left-1/2 block h-5 w-5 -translate-x-1/2 rounded-full border-[3px] border-white bg-accent-500 shadow-lg" />
                </motion.div>
              </div>

              {STEPS.map((s, i) => {
                const reached = i <= active;
                return (
                  <li
                    key={s.n}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    className="relative pb-16 last:pb-0 lg:pb-24"
                  >
                    {/* Step node, sitting on the track. */}
                    <span
                      aria-hidden
                      className={`absolute -left-16 top-0 flex h-9 w-9 items-center justify-center rounded-full border-[3px] transition-all duration-300 sm:-left-20 sm:h-11 sm:w-11 ${
                        reached
                          ? 'scale-110 border-accent-500 bg-accent-500 shadow-lg'
                          : 'border-hairline-mid bg-white'
                      }`}
                    >
                      <span
                        className={`mono text-[0.68rem] font-bold transition-colors duration-300 sm:text-[0.78rem] ${
                          reached ? 'text-ink' : 'text-muted'
                        }`}
                      >
                        {s.n}
                      </span>
                    </span>

                    <h3
                      className={`font-display text-f-2xl font-bold leading-tight transition-colors duration-300 ${
                        reached ? 'text-ink' : 'text-muted'
                      }`}
                    >
                      {s.t}
                    </h3>
                    <p className="mt-3 max-w-lg leading-relaxed text-body">{s.d}</p>
                    <span
                      className={`mono mt-4 inline-block rounded border px-2.5 py-1.5 text-[0.62rem] transition-colors duration-300 ${
                        reached
                          ? 'border-accent-300 bg-accent-50 text-accent-800'
                          : 'border-hairline bg-white text-muted'
                      }`}
                    >
                      {s.tag}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
