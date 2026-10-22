/**
 * FAQ content.
 *
 * Written to be *extractable*: each answer opens with a direct, self-contained
 * sentence that resolves the question without needing the question restated.
 * That is the single biggest factor in whether an AI engine quotes a passage,
 * and the previous site had no answer-shaped content anywhere — the audit
 * found 4 buyer questions answered, 3 answered badly, and 8 not addressed.
 *
 * Every claim here is one the company can stand behind. No pricing figures,
 * no delivery guarantees and no client names appear until they are confirmed.
 *
 * The product count is interpolated rather than written out: it read
 * "thirteen" on the same page whose catalogue heading said "Fourteen", and
 * this text also feeds the FAQPage markup — so the contradiction was being
 * published to search engines as well as to readers.
 */

import { PRODUCT_COUNT_WORD } from './products';

export type Faq = {
  question: string;
  answer: string;
  /**
   * Shown in the homepage FAQ block. Four only — the four that remove the
   * most friction for someone deciding whether to make contact. The rest are
   * not cut, they live on /faq, which carries its own FAQPage markup.
   */
  home?: boolean;
  /**
   * Shown on every product page. These are the questions asked about ANY
   * product rather than about one of them — demo, migration, timeline,
   * price, tenancy, support — so the same six answer the reader whichever
   * page they landed on, and each page carries its own FAQPage markup.
   */
  product?: boolean;
};

/** Every question, in reading order. */
export const ALL_FAQS: Faq[] = [
  {
    question: 'What does Engispider Infotech do?',
    answer:
      `Engispider Infotech is an ISO certified software company in Bhubaneswar, Odisha that builds and runs business systems for restaurants, schools and colleges, retail chains, laboratories, pharmacies and clinics. We sell ${PRODUCT_COUNT_WORD} ready-built products — including Engispider Restro for restaurants and Engispider Campus for education — and also develop custom software on Java, Spring Boot, MySQL, React and Flutter.`,
  },
  {
    question: 'Where is Engispider located, and do you work outside Odisha?',
    answer:
      'Our office is in Bhubaneswar, Odisha, India. We work with customers across India and deliver remotely, with on-site visits for installation, data migration and training where a project needs them. Support runs Monday to Friday 9:00–18:00 and Saturday 9:00–14:00 IST.',
  },
  {
    question: 'Which restaurant POS software works for a restaurant in Odisha?',
    home: true,
    answer:
      'Engispider Restro is our restaurant management and POS system, built and supported from Bhubaneswar. It covers dine-in, takeaway and delivery billing, QR self-ordering, kitchen display, GST-compliant invoicing, ingredient inventory with automatic recipe deduction, supplier payables, and profit and loss per outlet. It runs on web and mobile and supports multiple outlets under one account.',
  },
  {
    question: 'Do you have a school or college ERP suitable for institutions in India?',
    home: true,
    answer:
      'Engispider Campus is our school and college ERP. It handles online admissions, fee plans by course, year and category, maker-checker approval on collections, gap-less audit-ready receipt numbering, online fee payment with automatic bank reconciliation, examinations, hostel, transport, library and staff payroll. It supports multi-institution groups, so a trust running several colleges manages them from one deployment.',
  },
  {
    question: 'Can I see the software before buying?',
    product: true,
    home: true,
    answer:
      'Yes. We run a guided demo on a live system with your own scenarios, rather than giving out a self-serve login — our products are multi-tenant deployments where each customer has their own isolated instance. Contact us and we will schedule a demo, usually within two working days.',
  },
  {
    question: 'Can you migrate data from the system we use now?',
    product: true,
    home: true,
    answer:
      'Yes. Data migration is part of every deployment. We import existing records — students, items, customers, stock, ledgers — from Excel, CSV or a direct database export, validate them, show you an error report before anything is committed, and reconcile the result against your current balances.',
  },
  {
    question: 'Do you build custom software, or only sell these products?',
    answer:
      'Both. Where one of our products fits, configuring it is faster and cheaper. Where your process genuinely differs, we build a custom system — requirements, architecture, build, deployment and support — using the same Java, Spring Boot, MySQL and React stack as our own products, so it is maintainable by the same team.',
  },
  {
    question: 'What does ISO certification mean for a customer?',
    answer:
      'It means an independent auditor — not us — has verified that we follow a documented, repeatable process for how work is specified, built, reviewed and delivered, and that we track and correct problems when they occur. For a customer it means the same process applies to your project as to every other, and that it is re-checked rather than self-declared.',
  },
  {
    question: 'How long does a deployment take?',
    product: true,
    answer:
      'A product deployment typically runs in phases: configuration, data migration, training, then go-live. The length depends on how much historical data has to come across and how many sites are involved. We give a phase plan with dates in the scope document before work starts, and each phase ends with working software you can check.',
  },
  {
    question: 'How is the software priced?',
    product: true,
    answer:
      'Pricing depends on the product, the number of users or outlets, and whether you need custom work on top. We quote per project after a scoping conversation rather than publishing a rate card, because a single-outlet cafe and a twelve-college group need very different things. Contact us for a quote.',
  },
  {
    question: 'Is our data kept separate from other customers?',
    product: true,
    answer:
      'Yes. Our multi-tenant products scope every record to an organisation identifier taken from the authenticated session and enforced on the server for every query, so no request can read another tenant’s data. Where a customer requires it, we also deploy a dedicated instance.',
  },
  {
    question: 'Do your systems work on mobile?',
    answer:
      'Yes. The web applications are responsive and usable on a tablet or phone, and several products also ship native mobile apps built in Flutter for Android and iOS — for example order-taking and attendance.',
  },
  {
    question: 'Can you integrate with payment gateways, WhatsApp or SMS?',
    answer:
      'Yes. We integrate payment gateways with automatic reconciliation against collections, and we run our own multi-tenant messaging service that sends WhatsApp, SMS and email from one API with retries and delivery receipts. We also integrate biometric attendance devices and accounting systems.',
  },
  {
    question: 'What happens after go-live?',
    product: true,
    answer:
      'Support continues under an agreement that sets out response times and a named contact. That covers bug fixes, updates and enhancements. Our support hours are Monday to Friday 9:00–18:00 and Saturday 9:00–14:00 IST.',
  },
  {
    question: 'Who owns the code for custom projects?',
    answer:
      'For bespoke development, ownership terms are set out in the contract before work begins. Our ready-built products are licensed rather than sold, which is what allows them to keep receiving updates. Ask us during scoping and we will put the specific terms in writing.',
  },
];

/**
 * The homepage selection, derived rather than duplicated — the two lists
 * previously held their own copies of the same strings, which is how the
 * product count drifted out of sync in the first place.
 */
export const HOME_FAQS: Faq[] = ALL_FAQS.filter((f) => f.home);

/** The product-page selection. Same derivation, same reason. */
export const PRODUCT_FAQS: Faq[] = ALL_FAQS.filter((f) => f.product);
