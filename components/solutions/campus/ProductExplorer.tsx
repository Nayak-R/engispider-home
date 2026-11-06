'use client';

import { useCallback, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

import { BrowserFrame, PhoneFrame } from '@/components/mock/Chrome';
import {
  AdmissionsMock,
  FeeCollectMock,
  AccountingMock,
  AttendanceExamMock,
  CampusOpsMock,
  PhonePortalMock,
  PayrollMock,
  MultiInstituteMock,
} from '@/components/academic/Mockups';
import { EXPLORER_TABS } from '@/components/solutions/campus/content';
import { track } from '@/lib/analytics';
import DemoCta from '@/components/solutions/campus/DemoCta';

/**
 * The product explorer.
 *
 * Eight modules, one at a time, each with the screen an administrator
 * actually works in. This is the section that has to do the convincing: a
 * buyer who has read the headline wants to see the software, and a grid of
 * thirty feature cards is not seeing the software.
 *
 * ── Why a tab list and not an accordion ──────────────────────────────────
 * The panels are the same shape and the same size, and the comparison a
 * reader is making is between modules. Tabs keep one screen in the same
 * place on the page while the content behind it changes, which is what
 * makes the eight read as one product rather than eight pages.
 *
 * ── Accessibility ────────────────────────────────────────────────────────
 * Full WAI-ARIA tabs pattern: roving tabindex, arrow keys with wrap-around,
 * Home and End, `aria-selected`, `aria-controls` and a labelled panel. The
 * strip scrolls horizontally on a phone and the active tab is kept in view
 * on keyboard navigation only — doing it on click would yank the strip
 * under the finger of someone who just tapped exactly where they meant to.
 *
 * ── No layout shift ──────────────────────────────────────────────────────
 * The panel carries a min-height at each breakpoint, so switching between a
 * four-bullet module and a five-bullet one does not move the page under the
 * reader. Only one panel is mounted at a time: eight live mock screens would
 * mean eight interval timers, and `useLiveTick` only pauses the ones that
 * are off-screen, not the ones hidden behind a tab.
 */

const MOCKS: Record<string, () => React.JSX.Element> = {
  admissions: AdmissionsMock,
  fees: FeeCollectMock,
  accounting: AccountingMock,
  academics: AttendanceExamMock,
  operations: CampusOpsMock,
  parents: PhonePortalMock,
  staff: PayrollMock,
  group: MultiInstituteMock,
};

export default function ProductExplorer() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const stripRef = useRef<HTMLDivElement>(null);

  const tab = EXPLORER_TABS[active];
  const Mock = MOCKS[tab.id];

  const select = useCallback(
    (index: number, viaKeyboard: boolean) => {
      setActive(index);
      track('campus_tab_view', { tab: EXPLORER_TABS[index].id });

      if (!viaKeyboard) return;
      const strip = stripRef.current;
      const button = strip?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index];
      button?.focus();
      button?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    },
    []
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = EXPLORER_TABS.length - 1;
    let next: number | null = null;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;

    if (next === null) return;
    e.preventDefault();
    select(next, true);
  };

  return (
    <div className="mt-12">
      {/* ------------------------------------------------------ tab strip */}
      <div
        ref={stripRef}
        role="tablist"
        aria-label="Engispider Campus modules"
        onKeyDown={onKeyDown}
        className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-2 overflow-x-auto px-[var(--gutter)] pb-3 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {EXPLORER_TABS.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${t.id}`}
              aria-selected={on}
              aria-controls={`${baseId}-panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i, false)}
              className={`shrink-0 snap-start whitespace-nowrap rounded-sm border px-4 py-2.5 text-f-xs font-semibold transition-colors ${
                on
                  ? 'border-accent-500 bg-accent-500 text-ink'
                  : 'border-hairline-mid bg-canvas text-body hover:border-ink hover:text-ink'
              }`}
            >
              <span className="mono-num mr-2 text-[0.72em] opacity-60">
                {String(i + 1).padStart(2, '0')}
              </span>
              {t.nav}
            </button>
          );
        })}
      </div>

      {/* ----------------------------------------------------------- panel */}
      <div
        role="tabpanel"
        id={`${baseId}-panel-${tab.id}`}
        aria-labelledby={`${baseId}-tab-${tab.id}`}
        /* No tabIndex: the ARIA practice is to make a panel focusable only
           when it holds nothing focusable. This one always holds a link and
           a CTA, so a tab stop here would just be an extra press. */
        className="mt-5 rounded-lg border border-hairline bg-canvas p-6 sm:p-8 lg:min-h-[30rem] lg:p-10"
      >
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="mono text-accent-700">
              {String(active + 1).padStart(2, '0')} · {tab.nav}
            </p>
            <h3 className="font-display mt-3 text-f-2xl font-bold leading-tight text-ink">
              {tab.heading}
            </h3>
            <p className="mt-4 leading-relaxed text-body">{tab.body}</p>

            <ul className="mt-6 space-y-2.5">
              {tab.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-500" aria-hidden />
                  <span className="text-f-xs leading-relaxed text-body">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <DemoCta location={`explorer:${tab.id}`} className="btn btn-primary">
                See this in a demo <ArrowRight className="h-4 w-4" />
              </DemoCta>
              {tab.link && (
                <Link href={tab.link.href} className="link-arrow text-f-xs">
                  {tab.link.label} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            {tab.phone ? (
              <div className="flex justify-center">
                <PhoneFrame label={tab.caption}>
                  <Mock />
                </PhoneFrame>
              </div>
            ) : (
              <BrowserFrame label={tab.caption}>
                <Mock />
              </BrowserFrame>
            )}
            <p className="mono mt-4 text-faint">
              Illustrative demo-tenant data · not any institution&rsquo;s figures
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
