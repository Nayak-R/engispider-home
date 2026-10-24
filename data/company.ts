/**
 * Single source of truth for verifiable company facts.
 *
 * Everything here is used in three places at once: the rendered pages, the
 * JSON-LD blocks, and the generated /llms.txt + /*.md files. Keeping one copy
 * is what stops the site contradicting itself — the previous build asserted
 * "24/7 Support" in page copy while its openingHoursSpecification said
 * Mon–Fri 09:00–18:00, and claimed "500+ Happy Clients" beside a customers
 * page listing fifteen.
 *
 * RULE: nothing goes in this file that cannot be pointed at. Claims awaiting
 * evidence live in PLACEHOLDERS at the bottom, clearly marked, so they are
 * impossible to ship by accident.
 */

export const COMPANY = {
  legalName: 'Engispider Infotech Private Limited',
  name: 'Engispider Infotech',
  shortName: 'Engispider',
  url: 'https://engispider.com',

  /** One sentence. Used in meta descriptions, llms.txt and the Organization schema. */
  summary:
    'Engispider Infotech is a software product and development company in Bhubaneswar, Odisha, India, building ERP, POS and business systems for restaurants, schools and colleges, retail, laboratories, pharmacies and clinics — plus custom software on Java, Spring Boot and React.',

  tagline: 'Business software, built to run your whole operation.',

  /**
   * City-level only — deliberate. No street address has been supplied, and
   * inventing one would poison the LocalBusiness schema. See PLACEHOLDERS.
   */
  address: {
    locality: 'Bhubaneswar',
    region: 'Odisha',
    postalCode: '751006',
    country: 'IN',
    countryName: 'India',
    /** Bhubaneswar city centroid — city-level precision, matching the address. */
    geo: { lat: '20.2961', lng: '85.8245' },
  },

  contact: {
    sales: { tel: '+919583315151', display: '+91 95833 15151' },
    support: { tel: '+917377799937', display: '+91 73777 99937' },
    email: 'info@engispider.com',
    accountsEmail: 'accounts@engispider.com',
    supportEmail: 'support@engispider.com',
  },

  /**
   * These hours are the ones asserted in schema. Any "24/7" claim in page copy
   * must match this or be removed — a machine-readable contradiction is worse
   * than a weaker claim.
   */
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { days: ['Saturday'], opens: '09:00', closes: '14:00' },
  ],
  hoursDisplay: 'Mon–Fri 9:00–18:00 · Sat 9:00–14:00 IST',

  /**
   * Organisations served, as supplied by the company.
   *
   * This is NOT the same number as data/clients.ts. CLIENTS is the subset
   * that has agreed to be named and have their mark shown — a permissioned
   * sample, not the total. Both figures appear on the site, so every piece
   * of copy that uses either one has to make the relationship explicit:
   * "150+ served, 15 of them named here". Stated side by side without that
   * framing, the short list reads as a contradiction of the big number,
   * which is worse than publishing neither.
   *
   * `served` is the figure; `servedDisplay` is how it is written, because
   * "150+" is an approximation and must never be rendered as an exact
   * count or counted up digit by digit as though it were one.
   */
  organisations: {
    served: 150,
    servedDisplay: '150+',
  },

  /**
   * ISO certification, verified from the certificate
   * mark supplied by the company (public/images/iso-9001-2015.webp).
   *
   * This is currently the only third-party credential on the site, which makes
   * it disproportionately valuable: an AI engine weighing whether to recommend
   * a vendor looks for exactly this kind of externally-issued signal. The
   * certificate number and issuing body are still needed to make it fully
   * verifiable — see PLACEHOLDERS.
   */
  certification: {
    /**
     * VISIBLE COPY says only "ISO certified" — a deliberate decision by the
     * company. Naming one standard invites the question of which others they
     * do not hold, and the broader claim is the one they want to make.
     *
     * `standard` is still carried because the JSON-LD identifier field exists
     * to say which standard a certification is against, and the answer there
     * is a verifiable fact rather than a marketing claim. Nothing renders it.
     */
    label: 'ISO certified',
    standard: 'ISO 9001:2015',
    name: 'ISO Certified Company',
    description:
      'Engispider Infotech is ISO certified — how work is specified, built, reviewed and delivered is independently audited against an international standard.',
    badge: '/images/iso-9001-2015.webp',
    certificateNumber: null as string | null,
    issuedBy: null as string | null,
  },

  /**
   * Only profiles confirmed to return 200. The previous build shipped
   * linkedin.com/company/engispider and twitter.com/EngispiderTech in both the
   * footer and `sameAs` — both are 404. A partly-false identity block is worse
   * than a short one, because sameAs is precisely the mechanism an engine uses
   * to fuse this site with other evidence into a single entity.
   *
   * Unverified candidates are parked in PLACEHOLDERS, not shipped.
   */
  social: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/engispider-infotech' },
    { name: 'Instagram', url: 'https://www.instagram.com/engispider/' },
    { name: 'YouTube', url: 'https://www.youtube.com/@Engispider' },
    { name: 'Threads', url: 'https://www.threads.net/@engispider' },
    // Included ahead of the account existing, at the company's direction.
    // See the `x-handle` placeholder — this needs re-checking once created.
    { name: 'X', url: 'https://x.com/engispider' },
  ],

  /**
   * Deliberately no public product URLs.
   *
   * restro360/message/crm.engispider.com are login-gated tenant instances. A
   * visitor who clicks through reaches a sign-in wall they have no account
   * for, which is a worse outcome than no link at all. Every product CTA
   * routes to /contact for a demo instead.
   */
} as const;

/**
 * Items the company must supply or confirm before they can appear on the site.
 * Nothing here is rendered anywhere. Listed in the handover notes.
 */
export const PLACEHOLDERS = [
  {
    id: 'iso-certificate-number',
    what: 'ISO 9001:2015 certificate number and the issuing/accrediting body',
    why: 'Turns the badge from a claim into a checkable fact, and lets it ship as a schema.org Certification with an identifier. Highest-value item on this list.',
  },
  {
    id: 'street-address',
    what: 'Full street address of the Bhubaneswar office',
    why: 'LocalBusiness schema and a map embed are both city-level only without it. Needed before a Google Business Profile will verify.',
  },
  {
    id: 'founding-year',
    what: 'Actual year the company was founded',
    why: 'Old schema said 2014 while the LinkedIn page says 2025. foundingDate is omitted entirely until this is settled — a contradiction here is worse than silence.',
  },
  {
    id: 'x-handle',
    what: 'Create the x.com/engispider account — it is already linked from the site',
    why: 'The URL ships in the footer and in Organization.sameAs as the company instructed, but currently returns 404. LinkedIn, Instagram, YouTube and Threads are all verified live. Until the X account exists it is a dead link for visitors and a false identity claim to search and AI engines, which is what the earlier audit flagged as critical. Re-check after creating it.',
  },
  {
    id: 'clinic-product-facts',
    what: 'What the clinic management product actually does — modules, who uses it, whether it is live',
    why: 'No repository or existing page was found for it. Its page ships with a factual skeleton and no invented feature list.',
  },
  {
    id: 'monitoring-product-facts',
    what: 'Smart monitoring platform specifics — supported sensors/devices, cold room vs boiler scope, alerting channels, whether it is live',
    why: 'No repository or existing page was found. Same treatment as the clinic product.',
  },
  {
    id: 'campus360-domain',
    what: 'Whether campus360.engispider.com will be published',
    why: 'It is currently NXDOMAIN but was presented on the homepage as the product URL. All Engispider Campus links now point at /solutions/education until it resolves.',
  },
  {
    id: 'client-permission',
    what: 'Written permission to name the 15 customers whose logos are shown',
    why: 'The logos are already public on the site; confirming consent protects the strongest proof asset you have.',
  },
  {
    id: 'satisfied-users-figure',
    what: 'Basis for the "1 Lakh+ satisfied users" figure shown in the hero',
    why: 'It is the only unverified number on the site. Unlike the old "500+ clients" it does not contradict anything — 15 organisations running campus ERP and POS plausibly reach 100,000+ end users — but we should be able to show the arithmetic (students + staff + diners + patients across live deployments) if a buyer asks. Keep it or replace it with the real count.',
  },
  {
    id: 'team-bios',
    what: 'Named founder/leadership bios with photos and LinkedIn links',
    why: 'E-E-A-T scored 32/100 largely because no human being is named anywhere on the site. This is the cheapest large win available.',
  },
] as const;
