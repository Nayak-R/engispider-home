import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal, MaskText } from '@/components/motion/Reveal';
import { HOME_FAQS } from '@/data/faqs';
import { COMPANY } from '@/data/company';

/**
 * Home FAQ, built as a hairline datasheet rather than a list.
 *
 * Four questions, not the full set — the four that remove the most friction
 * for someone deciding whether to make contact. Eight in a single column at
 * the end of a long page is the part everyone scrolls past. The rest live on
 * /faq, which carries its own FAQPage markup.
 *
 * Set as a two-column grid of numbered cells divided by hairlines, so each
 * question gets the weight of a heading and the block scans in one pass.
 *
 * Answers stay visible rather than collapsing into an accordion. They are the
 * most quotable text on the site — written so each one opens with a direct,
 * self-contained sentence — and an answer a reader has to click for is one an
 * AI engine is less likely to lift.
 *
 * A server component: no state, so the section costs no client JS beyond the
 * reveal observer.
 */
export default function Faq() {
  return (
    <section className="section border-t border-hairline bg-band">
      <div className="container-page">
        {/* Heading runs full width — the grid beneath needs both columns. */}
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">FAQ</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>Questions buyers</>
              <>
                <span className="accent-word">actually</span> ask.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                The four that come up most, answered straight. The rest are
                on the full FAQ.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Hairline grid: 1px gaps over a hairline ground give every cell a
            shared rule without doubling borders where they meet. */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-2">
          {HOME_FAQS.map((f, i) => (
            <Reveal key={f.question} delay={(i % 2) * 60} className="bg-canvas">
              <div className="group relative h-full overflow-hidden p-7 transition-colors hover:bg-accent-50 lg:p-8">
                {/* Oversized ghosted figure bleeding off the corner, as on
                    the Method cards — gives each cell a distinct silhouette
                    without competing with the question for contrast. */}
                <span
                  aria-hidden
                  /* Fully inside the cell — see the note on the Method cards:
                     a bled corner sliced the digits and looked like a bug. */
                  className="pointer-events-none absolute right-6 top-4 select-none font-display text-[5.5rem] font-extrabold leading-none text-well transition-colors group-hover:text-accent-100"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative">
                  <span className="mono text-faint transition-colors group-hover:text-accent-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 max-w-[22ch] font-display text-f-lg font-bold leading-snug text-ink">
                    {f.question}
                  </h3>
                  <p className="mt-3 text-f-xs leading-relaxed text-body">{f.answer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Closing strip — the question this page cannot answer. */}
        <Reveal delay={80}>
          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-lg border border-hairline bg-canvas p-7 sm:flex-row sm:items-center lg:p-8">
            <div>
              <p className="font-display text-f-lg font-bold text-ink">
                Something specific to your operation?
              </p>
              <p className="mt-1.5 text-f-xs text-body">
                Tell us what you run today and we will answer it properly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Ask us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/faq" className="btn btn-line">
                All questions <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* FAQPage markup is only legitimate where the answers are visible —
          which they are, as static HTML, not behind a collapsed accordion. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${COMPANY.url}/#faq`,
            mainEntity: HOME_FAQS.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />
    </section>
  );
}
