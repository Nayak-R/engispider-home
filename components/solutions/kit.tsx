import Link from 'next/link';
import { ArrowRight, Check, type LucideIcon } from 'lucide-react';

import { Reveal, MaskText, CountUp } from '@/components/motion/Reveal';
import Parallax from '@/components/motion/Parallax';
import SectionBackdrop from '@/components/SectionBackdrop';
import { FreeCallout } from '@/components/solutions/FreeTag';
import { BrowserFrame, PhoneFrame } from '@/components/mock/Chrome';

/**
 * The repeated furniture of a deep product page.
 *
 * Four products were written out longhand before this existed — restro,
 * campus, hrms and crm — and they are all the same five blocks in the same
 * order: a stats strip, the ways in, illustrated pillars, a capability
 * grid, a closing link. Writing that a fifth, sixth and seventh time would
 * be ~1,200 lines of copy-paste with seven places for the spacing to drift
 * apart.
 *
 * So the structure lives here and each product supplies only its content.
 * The four earlier pages still carry their own copies: they are built,
 * reviewed and verified, and rewriting them to use this would risk a
 * regression for no visible gain. Worth migrating when one of them is next
 * edited for another reason.
 */

/* ===================================================================== types */

export type Pillar = {
  /** Short label above the heading, e.g. "The device, not a register". */
  kicker: string;
  title: string;
  body: string;
  bullets: readonly string[];
  /** Caption on the frame — the module, never a URL. */
  label: string;
  Mock: () => React.JSX.Element;
  /** Render in a phone rather than a browser frame. */
  phone?: boolean;
};

export type Surface = {
  Icon: LucideIcon;
  name: string;
  /** Who this surface is for, e.g. "Floor staff · Android". */
  who: string;
  body: string;
};

export type CapabilityGroup = {
  group: string;
  items: readonly (readonly [string, string])[];
};

export type Stat = { count?: number; value?: string; label: string };

/* ===================================================================== stats */

export function StatStrip({ stats }: { stats: readonly Stat[] }) {
  return (
    <section className="border-y border-hairline bg-band">
      <div className="container-page">
        <dl className="grid gap-x-10 gap-y-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, i) => (
            <Reveal key={item.label} delay={i * 70} className="relative">
              <span
                aria-hidden
                className="absolute -left-5 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-hairline lg:block"
              />
              <dt className="font-display text-f-2xl font-extrabold leading-none text-ink">
                {/* Only the countable one counts. Animating a word is noise. */}
                {item.count !== undefined ? (
                  <CountUp value={item.count} duration={1100} />
                ) : (
                  item.value
                )}
              </dt>
              <dd className="mono mt-2.5 text-faint">{item.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ================================================================== surfaces */

export function Surfaces({
  marker,
  heading,
  intro,
  free,
  surfaces,
}: {
  marker: string;
  /** Two lines; the second usually carries an `accent-word` span. */
  heading: readonly [React.ReactNode, React.ReactNode];
  intro: string;
  free?: { kicker: string; body: string };
  surfaces: readonly Surface[];
}) {
  const cols =
    surfaces.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : surfaces.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';

  return (
    <section className="section relative">
      <SectionBackdrop side="right" tone="cool" />
      <div className="container-page">
        <SectionHead marker={marker} heading={heading} intro={intro} />

        {free && (
          <div className="mt-10">
            <FreeCallout kicker={free.kicker} delay={60}>
              {free.body}
            </FreeCallout>
          </div>
        )}

        <ul
          className={`mt-8 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline ${cols}`}
        >
          {surfaces.map(({ Icon, name, who, body }, i) => (
            <Reveal as="li" key={name} delay={i * 70} className="bg-canvas">
              <div className="group h-full p-7 transition-colors hover:bg-accent-50">
                <Icon
                  className="h-5 w-5 text-accent-600 transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden
                />
                <h3 className="mt-5 font-display text-f-lg font-bold text-ink">{name}</h3>
                <p className="mono mt-1.5 text-faint">{who}</p>
                <p className="mt-3 text-f-xs leading-relaxed text-body">{body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* =================================================================== pillars */

export function Pillars({
  marker,
  heading,
  intro,
  pillars,
}: {
  marker: string;
  heading: readonly [React.ReactNode, React.ReactNode];
  intro: string;
  pillars: readonly Pillar[];
}) {
  return (
    <section className="section relative border-t border-hairline">
      <SectionBackdrop side="left" tone="warm" />
      <div className="container-page">
        <SectionHead marker={marker} heading={heading} intro={intro} />

        <div className="mt-16 space-y-20 lg:space-y-28">
          {pillars.map((p, i) => (
            <PillarRow key={p.title} pillar={p} index={i} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PillarRow({
  pillar,
  index,
  reverse,
}: {
  pillar: Pillar;
  index: number;
  reverse: boolean;
}) {
  const { kicker, title, body, bullets, label, Mock, phone } = pillar;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className={`lg:col-span-5 ${reverse ? 'lg:order-2 lg:col-start-8' : ''}`}>
        <p className="mono text-accent-700">
          {String(index + 1).padStart(2, '0')} · {kicker}
        </p>
        <MaskText as="h3" className="display mt-4 text-f-3xl">
          <>{title}</>
        </MaskText>
        <Reveal delay={100}>
          <p className="measure mt-5 leading-relaxed text-body">{body}</p>
        </Reveal>

        <ul className="mt-7 space-y-2.5">
          {bullets.map((b, bi) => (
            <Reveal as="li" key={b} delay={160 + bi * 50} className="flex items-start gap-3">
              <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-500" aria-hidden />
              <span className="text-f-xs leading-relaxed text-body">{b}</span>
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal
        direction="scale"
        delay={120}
        className={`min-w-0 lg:col-span-6 ${
          reverse ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'
        }`}
      >
        {/* Phones drift further than browser frames — they are smaller, so
            the same travel reads as less movement. */}
        {phone ? (
          <Parallax amount={34} className="flex justify-center">
            <PhoneFrame label={label}>
              <Mock />
            </PhoneFrame>
          </Parallax>
        ) : (
          <Parallax amount={24}>
            <BrowserFrame label={label}>
              <Mock />
            </BrowserFrame>
          </Parallax>
        )}
      </Reveal>
    </div>
  );
}

/* ============================================================== capabilities */

export function Capabilities({
  intro,
  groups,
  cta,
}: {
  intro: string;
  groups: readonly CapabilityGroup[];
  cta: string;
}) {
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className="section relative border-t border-hairline">
      <SectionBackdrop side="right" tone="mixed" />
      <div className="container-page">
        <SectionHead
          marker="Everything in the box"
          heading={[
            <>{total} capabilities,</>,
            <>
              <span className="accent-word">one</span> subscription.
            </>,
          ]}
          intro={intro}
        />

        <div className="mt-14 space-y-12">
          {groups.map((g) => (
            <div key={g.group}>
              <div className="flex items-baseline gap-4 border-b border-hairline pb-3">
                <h3 className="font-display text-f-lg font-bold text-ink">{g.group}</h3>
                <span className="mono-num text-faint">{g.items.length}</span>
              </div>

              <ul className="grid gap-px overflow-hidden border-x border-b border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
                {g.items.map(([title, desc], i) => (
                  <Reveal as="li" key={title} delay={(i % 4) * 50} className="bg-canvas">
                    <div className="h-full p-5 transition-colors hover:bg-accent-50">
                      <h4 className="text-f-xs font-bold leading-snug text-ink">{title}</h4>
                      <p className="mt-2 text-f-2xs leading-relaxed text-muted">{desc}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link href="/contact" className="link-arrow">
            {cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ====================================================================== head */

/** Marker, two-line display heading, supporting paragraph. */
function SectionHead({
  marker,
  heading,
  intro,
}: {
  marker: string;
  heading: readonly [React.ReactNode, React.ReactNode];
  intro: string;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <p className="marker mono">{marker}</p>
        <MaskText as="h2" className="display mt-5 text-f-5xl">
          {heading[0]}
          {heading[1]}
        </MaskText>
      </div>
      <div className="flex items-end lg:col-span-5 lg:col-start-8">
        <Reveal delay={120}>
          <p className="text-body">{intro}</p>
        </Reveal>
      </div>
    </div>
  );
}

/** Total capabilities across groups — for a stats strip. */
export const countCapabilities = (groups: readonly CapabilityGroup[]) =>
  groups.reduce((n, g) => n + g.items.length, 0);
