import type { Metadata } from 'next';
import { Inter, Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import RouteTransitionLoader from '@/components/RouteTransitionLoader';
import SmoothScroll from '@/components/motion/SmoothScroll';
import ScrollToTop from '@/components/ScrollToTop';
import { COMPANY } from '@/data/company';
import { PRODUCTS } from '@/data/products';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/**
 * Display face. Bricolage Grotesque is drawn for large editorial setting —
 * it has real character in the counters and terminals at 60px+, where Sora
 * (the previous choice) flattens into something anonymous. Variable, so the
 * full weight range costs one file.
 */
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

/**
 * One accent face, used for a single emphasised word in a headline and
 * nothing else. The grotesque/serif-italic contrast is what stops a page of
 * sans-serif reading as generic — it costs ~15KB and does more for the look
 * than any other single change.
 */
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-serif',
  display: 'swap',
});

/**
 * Monospace carries every label, section number and figure. It is the detail
 * that makes operations software read as an instrument rather than a
 * brochure, so it is a deliberate choice rather than a fallback.
 */
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    // Brand first — one of the signals Google uses to pick the site name shown
    // in results. Kept under 60 characters so it survives truncation.
    default: 'Engispider Infotech | Software Company in Bhubaneswar',
    template: '%s | Engispider',
  },
  description:
    'ISO certified software company in Bhubaneswar building restaurant POS, school and college ERP, retail, LIMS, pharmacy and HR systems — plus custom software on Java, Spring Boot and React.',
  // The 90-term keyword list that used to live here was removed: no search
  // engine has used the keywords meta since 2009, and the list contradicted
  // the stack the company actually works in.
  applicationName: COMPANY.name,
  authors: [{ name: COMPANY.legalName }],
  creator: COMPANY.legalName,
  publisher: COMPANY.legalName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: COMPANY.name,
    title: 'Engispider Infotech — Software Company in Bhubaneswar',
    description:
      'ISO certified. Restaurant POS, school and college ERP, retail, LIMS, pharmacy, HR and custom software built in Bhubaneswar, Odisha.',
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: COMPANY.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engispider Infotech — Software Company in Bhubaneswar',
    description:
      'ISO certified software company building ERP, POS and business systems in Bhubaneswar, Odisha.',
    images: ['/og/default.png'],
  },
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/icon-logo.png', type: 'image/png' },
    ],
    apple: '/images/icon-logo.png',
  },
};

/**
 * Sets `.js` on <html> before first paint.
 *
 * Every scroll-reveal on the site defaults to VISIBLE and is only hidden by
 * the `.js .reveal` rule. That inversion is what keeps the static HTML
 * readable to crawlers and keeps Largest Contentful Paint off the hydration
 * critical path — but it only works without a flash if the class lands before
 * the browser paints, which means a synchronous inline script in <head>.
 */
const JS_FLAG = `document.documentElement.classList.add('js')`;

/**
 * Organization + LocalBusiness + WebSite, emitted as one @graph so the nodes
 * reference each other instead of floating free.
 *
 * Deliberately absent:
 *  - `foundingDate` — the old value (2014) contradicts the company LinkedIn
 *    page (2025). Omitted until confirmed; a contradiction costs more than a
 *    missing field.
 *  - dead `sameAs` entries — two of the three previously listed were 404s.
 *  - `Offer`/`price` on products — the old markup priced paid B2B software at
 *    zero. The free thing is the demo, not the software.
 */
function structuredData() {
  const { address, contact, certification } = COMPANY;

  const organization = {
    '@type': 'Organization',
    '@id': `${COMPANY.url}/#organization`,
    name: COMPANY.legalName,
    legalName: COMPANY.legalName,
    alternateName: ['Engispider', 'Engispider Infotech'],
    url: COMPANY.url,
    logo: {
      '@type': 'ImageObject',
      '@id': `${COMPANY.url}/#logo`,
      url: `${COMPANY.url}/images/EngiSpider-fnl.png`,
      contentUrl: `${COMPANY.url}/images/EngiSpider-fnl.png`,
      caption: COMPANY.legalName,
    },
    image: { '@id': `${COMPANY.url}/#logo` },
    description: COMPANY.summary,
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    email: contact.email,
    telephone: contact.sales.tel,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: contact.sales.tel,
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Odia'],
      },
      {
        '@type': 'ContactPoint',
        telephone: contact.support.tel,
        email: contact.supportEmail,
        contactType: 'technical support',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Odia'],
      },
    ],
    // The one externally-issued credential the company holds. schema.org added
    // Certification in 2024; `hasCertification` is the correct property and
    // degrades harmlessly on parsers that do not know it yet.
    hasCertification: {
      '@type': 'Certification',
      name: certification.name,
      certificationIdentification: certification.standard,
      about: { '@id': `${COMPANY.url}/#organization` },
      ...(certification.certificateNumber
        ? { identifier: certification.certificateNumber }
        : {}),
      ...(certification.issuedBy
        ? { issuedBy: { '@type': 'Organization', name: certification.issuedBy } }
        : {}),
    },
    knowsAbout: [
      'Restaurant point of sale software',
      'School and college ERP',
      'Laboratory Information Management Systems',
      'Pharmacy management software',
      'Retail point of sale',
      'HR and payroll software',
      'Custom software development',
      'Java and Spring Boot development',
    ],
    ...(COMPANY.social.length
      ? { sameAs: COMPANY.social.map((s) => s.url) }
      : {}),
  };

  const localBusiness = {
    '@type': 'ProfessionalService',
    '@id': `${COMPANY.url}/#localbusiness`,
    name: COMPANY.legalName,
    parentOrganization: { '@id': `${COMPANY.url}/#organization` },
    url: COMPANY.url,
    image: { '@id': `${COMPANY.url}/#logo` },
    telephone: contact.sales.tel,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: address.geo.lat,
      longitude: address.geo.lng,
    },
    areaServed: [
      { '@type': 'State', name: 'Odisha' },
      { '@type': 'Country', name: 'India' },
    ],
    // Matches the hours stated in the footer and on /contact. The old markup
    // said Mon–Fri 9–6 while four pages advertised "24/7 Support".
    openingHoursSpecification: COMPANY.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${COMPANY.url}/#website`,
    name: COMPANY.name,
    alternateName: ['Engispider', COMPANY.legalName],
    url: `${COMPANY.url}/`,
    publisher: { '@id': `${COMPANY.url}/#organization` },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${COMPANY.url}/search/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // One SoftwareApplication per real product, with no fabricated Offer price.
  const software = PRODUCTS.filter((p) => p.status !== 'draft').map((p) => ({
    '@type': 'SoftwareApplication',
    '@id': `${COMPANY.url}${p.href}/#software`,
    name: p.name,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: p.category,
    operatingSystem: 'Web browser',
    url: `${COMPANY.url}${p.href}/`,
    description: p.summary,
    publisher: { '@id': `${COMPANY.url}/#organization` },
    provider: { '@id': `${COMPANY.url}/#organization` },
    featureList: p.features,
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, localBusiness, website, ...software],
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
     * suppressHydrationWarning is required here, and only here.
     *
     * The blocking script below adds `js` to <html> before React hydrates,
     * so the server-rendered class attribute and the live DOM genuinely
     * differ by that one token. React cannot know the difference is
     * intentional and reports a hydration mismatch.
     *
     * The flag only suppresses attribute mismatches on THIS element — every
     * child is still fully checked — which is the standard way to handle a
     * pre-paint class flag (next-themes does the same thing).
     */
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${inter.variable} ${display.variable} ${serif.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
        {/*
          Points an AI engine at the plain-text corpus.

          These are deliberately NOT in the sitemap — they are resources,
          not pages, and next-sitemap would list them with a trailing
          slash that 404s. robots.txt and this pair of links are how they
          are found instead.
        */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms-full.txt"
          title="llms-full.txt — full site content"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
      </head>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        {children}
        <ScrollToTop />
        <RouteTransitionLoader />
      </body>
    </html>
  );
}
