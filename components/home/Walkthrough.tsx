'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MaskText, Reveal } from '@/components/motion/Reveal';

/**
 * The pattern every product shares, traced end to end.
 *
 * Abstract capability lists ("inventory management", "reporting") are
 * forgettable. One chain followed from the first action to the finished
 * report makes the whole system legible at once, which is why this sits
 * immediately after the industry screens.
 *
 * ── Why it is no longer a restaurant story ──────────────────────────────
 * This said "From one order to the P&L" and walked through a guest
 * scanning a QR code, a KOT printing, paneer leaving inventory and
 * food-cost per dish — while its own lede claimed "every Engispider
 * product works this way". One product was standing in for fourteen, on
 * the homepage, directly after a deck of eight industries.
 *
 * Each step now states the general capability and grounds it in examples
 * drawn from several products. That costs a little narrative momentum and
 * buys the thing the section is actually for: showing that this is how
 * the company builds, not how one of its products happens to work.
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
    t: 'Someone does their job',
    d: 'A guest scans the code on the table. A parent pays a fee from their phone. A sample arrives at the lab counter. A face looks at the attendance camera. The action that was happening anyway is the only input the system needs.',
    tag: 'POS · Portal · Kiosk',
  },
  {
    n: '02',
    t: 'It is captured once, correctly',
    d: 'The document builds itself with the right tax, code and number — GST and HSN on a bill, gap-less audit-ready numbering on a fee receipt, a generated sample ID on an inward, statutory rates on a payslip. Nobody looks anything up.',
    tag: 'Billing · Compliance',
  },
  {
    n: '03',
    t: 'Everything downstream moves itself',
    d: 'Stock comes off the recipe as the dish is served. A hostel bed allotment raises its own fee. An approved receipt posts its own double entry. A biometric punch reaches the payroll run. No second system to update, and no re-keying.',
    tag: 'Stock · Ledger · Payroll',
  },
  {
    n: '04',
    t: 'The report is already written',
    d: 'Profit and loss by outlet, outstanding by course and year, food-cost per dish, headcount against payroll — live, because they are the same data rather than a monthly re-entry of it. Day-end summaries arrive without anyone running them.',
    tag: 'Reports · P&L · Day-end',
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
                <>Enter it once.</>
                <>It lands <span className="accent-word">everywhere</span>.</>
              </MaskText>
              <Reveal delay={140}>
                <p className="mt-6 max-w-md leading-relaxed text-body">
                  Every product here is built on the same chain. Whatever a
                  person was already doing — taking an order, collecting a
                  fee, booking in a sample — is the thing that moves stock,
                  posts the ledger and writes the report. There is no second
                  system to keep in step.
                </p>
                <Link href="/solutions" className="btn btn-primary mt-8">
                  See all products <ArrowRight className="h-4 w-4" />
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
