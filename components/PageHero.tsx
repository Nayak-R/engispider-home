import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Reveal, MaskWords } from '@/components/motion/Reveal';

/**
 * Hero for the pages that are not products.
 *
 * About, Services, Customers and Contact each had their own black
 * gradient hero with its own type scale. This is the one the product
 * pages use — marker, masked display heading, lede, buttons, optional
 * spec strip — so the whole site opens the same way.
 *
 * The heading masks word by word on an <h1> that is never itself hidden,
 * so it still paints on the first frame and a crawler reads the finished
 * text.
 */
export default function PageHero({
  marker,
  title,
  lede,
  cta,
  secondary,
  spec,
  children,
}: {
  marker: string;
  /** Rendered as the h1. Keep it short — this sets at display size. */
  title: string;
  lede: string;
  cta?: { href: string; label: string };
  secondary?: { href: string; label: string };
  /** Three checkable facts under the fold. */
  spec?: readonly (readonly [string, string])[];
  /** Anything that belongs beside the text — a screen, a logo wall. */
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-4">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="grid-rule absolute inset-0"
          style={{
            maskImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, #000 25%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, #000 25%, transparent 80%)',
          }}
        />
        <div
          className="absolute -top-52 right-0 h-[620px] w-[620px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(251,124,31,0.2), transparent 70%)' }}
        />
      </div>

      <div className="container-page pt-28 md:pt-32">
        <div
          className={`grid items-center gap-12 ${children ? 'lg:grid-cols-12 lg:gap-10' : ''}`}
        >
          <div className={children ? 'lg:col-span-6' : 'max-w-3xl'}>
            <p className="marker mono">{marker}</p>

            {/* LCP element — only the inner spans are masked. */}
            <h1 className="display mt-5 text-f-7xl">
              <MaskWords className="block" step={70}>
                {title}
              </MaskWords>
            </h1>

            <Reveal delay={420}>
              <p className="mt-7 max-w-xl text-f-lg leading-relaxed text-body">{lede}</p>
            </Reveal>

            {(cta || secondary) && (
              <Reveal delay={560}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {cta && (
                    <Link href={cta.href} className="btn btn-primary">
                      {cta.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                  {secondary && (
                    <Link href={secondary.href} className="btn btn-line">
                      {secondary.label}
                    </Link>
                  )}
                </div>
              </Reveal>
            )}
          </div>

          {children && (
            <Reveal direction="scale" delay={140} className="min-w-0 lg:col-span-6">
              {children}
            </Reveal>
          )}
        </div>

        {spec && (
          <dl className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-3">
            {spec.map(([term, value], i) => (
              <Reveal key={term} delay={700 + i * 80} className="bg-canvas">
                <div className="h-full p-6">
                  <dt className="mono text-accent-700">{term}</dt>
                  <dd className="mt-2.5 text-f-xs leading-relaxed text-ink">{value}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
