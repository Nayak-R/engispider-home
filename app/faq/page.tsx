import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/motion/Reveal';
import { ALL_FAQS } from '@/data/faqs';
import { COMPANY } from '@/data/company';

/**
 * /faq
 *
 * Every answer is rendered as visible static HTML rather than inside a
 * collapsed accordion. FAQPage markup is only legitimate where the answer is
 * actually on the page, and an answer a crawler has to expand is an answer an
 * AI engine will not quote.
 */
export default function FaqPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="section pt-32 md:pt-40">
          <div className="container-page">
            <div className="max-w-2xl">
              <p className="eyebrow">FAQ</p>
              <h1 className="mt-3 text-fluid-5xl font-extrabold">
                Questions, answered plainly.
              </h1>
              <p className="mt-5 text-fluid-lg text-body">
                What we build, how a deployment runs, and what happens after
                go-live. If something is missing, ask us — we will add it here.
              </p>
              <Link href="/contact" className="btn btn-primary mt-7">
                Ask a question <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <dl className="mt-14 max-w-3xl divide-y divide-line border-y border-line">
              {ALL_FAQS.map((f, i) => (
                <Reveal key={f.question} delay={Math.min(i, 6) * 40} className="py-7">
                  <dt className="font-display text-fluid-xl font-bold text-ink">
                    {f.question}
                  </dt>
                  <dd className="mt-3 text-body">{f.answer}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${COMPANY.url}/faq/#faq`,
            mainEntity: ALL_FAQS.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />
    </>
  );
}
