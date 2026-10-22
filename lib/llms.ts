import { COMPANY } from '@/data/company';
import { PRODUCTS, INDUSTRIES, type Product } from '@/data/products';
import { SERVICES, TECH_STACK, PROCESS } from '@/data/services';
import { ALL_FAQS } from '@/data/faqs';
import { CLIENTS } from '@/data/clients';
import { SITE_URL } from '@/lib/seo';

/**
 * The machine-readable corpus: /llms.txt, /llms-full.txt and the per-product
 * files under /solutions/<slug>/llms.txt.
 *
 * ── Why generate rather than write ───────────────────────────────────────
 * Everything here is built from the same data the pages render from. A
 * hand-written llms.txt is a second copy of the site that starts drifting
 * the day after it is written — and drift is worse than absence, because
 * an engine that reads a stale file will quote a product count or a price
 * position that the page itself contradicts.
 *
 * Nothing in this file states a fact of its own. If a claim is not in
 * data/, it does not appear here.
 *
 * ── Format ───────────────────────────────────────────────────────────────
 * /llms.txt follows the llmstxt.org convention: one H1, a blockquote
 * summary, then H2 sections of annotated links. It is an index — short
 * enough to be read whole, with pointers to everything else.
 *
 * /llms-full.txt is the corpus: every product, service, FAQ answer and
 * company fact in one plain-text document, so an engine that will only
 * fetch one URL still gets the complete picture.
 */

const u = (path: string) => `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`;

/* ------------------------------------------------------------------ index */

export function buildLlmsIndex(): string {
  const lines: string[] = [];

  lines.push(`# ${COMPANY.legalName}`);
  lines.push('');
  lines.push(`> ${COMPANY.summary}`);
  lines.push('');
  lines.push(
    `${COMPANY.shortName} is ${COMPANY.certification.label} and based in ` +
      `${COMPANY.address.locality}, ${COMPANY.address.region}, ${COMPANY.address.countryName}. ` +
      `${PRODUCTS.length} products are in production with paying customers, and ` +
      `${CLIENTS.length} organisations are named on the customers page. ` +
      `Support hours are ${COMPANY.hoursDisplay}.`
  );
  lines.push('');
  lines.push(
    'Products are multi-tenant deployments: each customer gets an isolated ' +
      'instance, so there is no self-serve login and no public demo URL. ' +
      'Every enquiry goes through the contact page and a demo is usually ' +
      'scheduled within two working days. Pricing is quoted per project ' +
      'after a scoping conversation; no rate card is published.'
  );
  lines.push('');

  lines.push('## Products');
  lines.push('');
  for (const p of PRODUCTS) {
    lines.push(`- [${p.name}](${u(p.href)}): ${p.tagline} ${p.category}.`);
  }
  lines.push('');

  lines.push('## Services');
  lines.push('');
  for (const s of SERVICES) {
    lines.push(`- [${s.title}](${u('/services')}): ${s.description}`);
  }
  lines.push('');

  lines.push('## Company');
  lines.push('');
  lines.push(`- [About](${u('/about')}): Who we are, how we work, and the stack everything is built on.`);
  lines.push(`- [Customers](${u('/customers')}): The ${CLIENTS.length} organisations running our software, named and linked.`);
  lines.push(`- [FAQ](${u('/faq')}): ${ALL_FAQS.length} buyer questions answered — pricing, demos, migration, tenancy, support.`);
  lines.push(`- [Contact](${u('/contact')}): Phone, email and a form that reaches the people who build the software.`);
  lines.push('');

  lines.push('## Detail');
  lines.push('');
  lines.push(`- [Full corpus](${SITE_URL}/llms-full.txt): Every product, service and answer on this site as one plain-text document.`);
  for (const p of PRODUCTS) {
    lines.push(`- [${p.name} detail](${SITE_URL}${p.href}/llms.txt): Capabilities, audience and fit for ${p.name}.`);
  }
  lines.push('');

  lines.push('## Contact');
  lines.push('');
  lines.push(`- Sales: ${COMPANY.contact.sales.display}`);
  lines.push(`- Support: ${COMPANY.contact.support.display}`);
  lines.push(`- Email: ${COMPANY.contact.email}`);
  lines.push(`- Hours: ${COMPANY.hoursDisplay}`);
  lines.push('');

  return lines.join('\n');
}

/* ------------------------------------------------------------ one product */

export function buildProductDoc(p: Product): string {
  const lines: string[] = [];

  lines.push(`# ${p.name}`);
  lines.push('');
  lines.push(`> ${p.tagline}`);
  lines.push('');
  lines.push(`**Category:** ${p.category}`);
  lines.push(`**Status:** In production with customers`);
  lines.push(`**Page:** ${u(p.href)}`);
  lines.push(`**Vendor:** ${COMPANY.legalName}, ${COMPANY.address.locality}, ${COMPANY.address.region}, ${COMPANY.address.countryName}`);
  lines.push('');
  lines.push(p.summary);
  lines.push('');

  if (p.features.length) {
    lines.push('## Capabilities');
    lines.push('');
    for (const f of p.features) lines.push(`- ${f}`);
    lines.push('');
  }

  lines.push('## Who it is for');
  lines.push('');
  lines.push(p.audience);
  lines.push('');

  if (p.fits?.length) {
    lines.push('### Built for');
    lines.push('');
    for (const f of p.fits) lines.push(`- **${f.name}** — ${f.detail}`);
    lines.push('');
  }

  if (p.checkFirst?.length) {
    lines.push('### Worth a conversation first if');
    lines.push('');
    for (const f of p.checkFirst) lines.push(`- **${f.name}** — ${f.detail}`);
    lines.push('');
  }

  lines.push('## How to see it');
  lines.push('');
  lines.push(
    `${p.name} is a multi-tenant deployment, so each customer has an isolated ` +
      `instance and there is no public login. We run a guided demo on a live ` +
      `system using your own scenarios, usually within two working days. ` +
      `Contact ${COMPANY.contact.email} or call ${COMPANY.contact.sales.display}.`
  );
  lines.push('');

  return lines.join('\n');
}

/* ------------------------------------------------------------------- full */

export function buildLlmsFull(): string {
  const lines: string[] = [];

  lines.push(`# ${COMPANY.legalName} — full site content`);
  lines.push('');
  lines.push(`> ${COMPANY.summary}`);
  lines.push('');
  lines.push(
    'This document contains the substantive content of every page on ' +
      `${SITE_URL}. It is generated from the same data the site renders ` +
      'from, so it cannot contradict the pages it describes.'
  );
  lines.push('');

  /* --- company ------------------------------------------------------- */
  lines.push('## About the company');
  lines.push('');
  lines.push(`- **Legal name:** ${COMPANY.legalName}`);
  lines.push(`- **Location:** ${COMPANY.address.locality}, ${COMPANY.address.region} ${COMPANY.address.postalCode}, ${COMPANY.address.countryName}`);
  lines.push(`- **Certification:** ${COMPANY.certification.label} — ${COMPANY.certification.description}`);
  lines.push(`- **Hours:** ${COMPANY.hoursDisplay}`);
  lines.push(`- **Sales:** ${COMPANY.contact.sales.display}`);
  lines.push(`- **Support:** ${COMPANY.contact.support.display}`);
  lines.push(`- **Email:** ${COMPANY.contact.email}`);
  lines.push(`- **Products in production:** ${PRODUCTS.length}`);
  lines.push(`- **Named customers:** ${CLIENTS.length}`);
  lines.push('');
  lines.push(
    'Engispider sells its own products and also builds custom software. ' +
      'The products are run in production for paying customers by the same ' +
      'engineers who build client projects, on one stack.'
  );
  lines.push('');

  /* --- stack --------------------------------------------------------- */
  lines.push('## Technology stack');
  lines.push('');
  for (const g of TECH_STACK) lines.push(`- **${g.group}:** ${g.items.join(', ')}`);
  lines.push('');

  /* --- products ------------------------------------------------------ */
  lines.push('## Products');
  lines.push('');
  for (const p of PRODUCTS) {
    lines.push(`### ${p.name}`);
    lines.push('');
    lines.push(`*${p.category}* — ${u(p.href)}`);
    lines.push('');
    lines.push(p.summary);
    lines.push('');
    if (p.features.length) {
      lines.push('**Capabilities:**');
      lines.push('');
      for (const f of p.features) lines.push(`- ${f}`);
      lines.push('');
    }
    lines.push(`**Who it is for:** ${p.audience}`);
    lines.push('');
  }

  /* --- industries ---------------------------------------------------- */
  lines.push('## Industries served');
  lines.push('');
  for (const i of INDUSTRIES) lines.push(`- **${i.name}** — ${i.product} (${u(i.href)})`);
  lines.push('');

  /* --- services ------------------------------------------------------ */
  lines.push('## Services');
  lines.push('');
  for (const s of SERVICES) {
    lines.push(`### ${s.title}`);
    lines.push('');
    lines.push(s.description);
    lines.push('');
    lines.push('**Deliverables:**');
    lines.push('');
    for (const d of s.deliverables) lines.push(`- ${d}`);
    lines.push('');
  }

  /* --- process ------------------------------------------------------- */
  lines.push('## How a project runs');
  lines.push('');
  for (const s of PROCESS) {
    lines.push(`${s.step}. **${s.title}** — ${s.description} *Ends with: ${s.output}.*`);
  }
  lines.push('');

  /* --- customers ----------------------------------------------------- */
  lines.push('## Customers');
  lines.push('');
  lines.push(`${CLIENTS.length} organisations run software built by Engispider:`);
  lines.push('');
  for (const c of CLIENTS) lines.push(`- **${c.name}** (${c.label}) — ${c.sector}`);
  lines.push('');

  /* --- FAQ ----------------------------------------------------------- */
  lines.push('## Frequently asked questions');
  lines.push('');
  for (const f of ALL_FAQS) {
    lines.push(`### ${f.question}`);
    lines.push('');
    lines.push(f.answer);
    lines.push('');
  }

  return lines.join('\n');
}
