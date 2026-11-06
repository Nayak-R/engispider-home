import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CampusPage from '@/components/solutions/campus/Sections';
import { CAMPUS_FAQS } from '@/components/solutions/campus/content';

import { COMPANY } from '@/data/company';
import { productBySlug } from '@/data/products';
import { SITE_URL } from '@/lib/seo';

/**
 * Engispider Campus — /solutions/education
 *
 * The one product page not rendered through `components/solutions/ProductPage`.
 * The reason is written out at the top of
 * `components/solutions/campus/Sections.tsx`: the shared template opens on
 * the product name at display size, which is the wrong first sentence for a
 * principal comparing ERPs, and it has nowhere to put the demo form, the
 * money trail or the support facts that decide this particular sale.
 *
 * Everything else is unchanged and deliberately so — same Header, same
 * Footer, same route, same canonical, same breadcrumb (emitted once, in
 * layout.tsx, rather than twice as it was while this page used the template
 * that emits its own).
 *
 * ── Structured data ──────────────────────────────────────────────────────
 * SoftwareApplication is built from data/products.ts, so the feature list
 * here cannot drift from the one in /llms.txt and the sitewide @graph. No
 * `offers` and no `price`: pricing is quoted per project, and the previous
 * build's `price: "0"` on paid software was a machine-readable falsehood.
 *
 * FAQPage marks up the ten answers that are rendered on the page — the same
 * strings, from the same module, so the markup cannot say something the
 * visible page does not.
 */

const product = productBySlug('campus360')!;

export default function EducationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'SoftwareApplication',
                '@id': `${SITE_URL}${product.href}/#software`,
                name: product.name,
                applicationCategory: 'BusinessApplication',
                applicationSubCategory: product.category,
                description: product.summary,
                url: `${SITE_URL}${product.href}/`,
                /*
                 * Must stay identical to the sitewide @graph in
                 * app/layout.tsx, which already publishes a
                 * SoftwareApplication for this product at the SAME @id.
                 * Two nodes sharing an @id are merged by every consumer, so
                 * a differing value here ("Web browser, Android") would
                 * publish two contradictory operating systems for one
                 * product. The Android app is stated in `featureList` and
                 * all over the visible page instead.
                 */
                operatingSystem: 'Web browser',
                featureList: product.features,
                // The two properties this node adds over the sitewide one.
                audience: { '@type': 'Audience', audienceType: product.audience },
                provider: {
                  '@type': 'Organization',
                  name: COMPANY.legalName,
                  url: COMPANY.url,
                },
                areaServed: [
                  { '@type': 'State', name: 'Odisha' },
                  { '@type': 'Country', name: 'India' },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': `${SITE_URL}${product.href}/#faq`,
                mainEntity: CAMPUS_FAQS.map((f) => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: { '@type': 'Answer', text: f.answer },
                })),
              },
            ],
          }),
        }}
      />

      <Header />

      <main id="main">
        <CampusPage />
      </main>

      <Footer />
    </>
  );
}
