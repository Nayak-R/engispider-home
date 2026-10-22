/**
 * The product catalogue.
 *
 * Feature lists are drawn from the shipped product pages and, for the newly
 * surfaced products, from their own repositories (LIMS build spec, Site
 * Manager and Engispider Comms READMEs, Engispider Retail web).
 *
 * EVERY PRODUCT HERE IS BUILT AND IN PRODUCTION. Nothing on this site says
 * "coming soon". The clinic system and the monitoring platform are real
 * applications with customers; they simply had no repository to read a
 * feature list out of, so theirs are shorter. A short list is not a
 * roadmap, and no page may read as though it were.
 *
 * `status` drives what the UI is allowed to say:
 *   'shipping' — in production with customers; the demo is booked, not self-serve
 *
 * No product carries a public app URL. The running instances
 * (restro360/message/crm.engispider.com) are login-gated tenant deployments,
 * so linking them would send a prospect to a sign-in wall. Every CTA goes to
 * /contact.
 */

export type ProductStatus = 'shipping' | 'draft';

export type Product = {
  slug: string;
  /** Route. Existing routes are preserved exactly — none are renamed. */
  href: string;
  /** Product name as it should always be written. */
  name: string;
  /** Plain category, for buyers searching by what it is rather than by brand. */
  category: string;
  /** One line, benefit-led, used on cards. */
  tagline: string;
  /** Two to three sentences for the product page intro and the .md export. */
  summary: string;
  /** Who it is for — concrete buyer, not "businesses of all sizes". */
  audience: string;
  /**
   * The same answer, broken into the operations a buyer recognises
   * themselves in. One sentence set in display type reads as a slogan; a
   * named list of operators reads as a qualification you either match or
   * do not. Optional — products without it fall back to `audience`.
   */
  fits?: { name: string; detail: string }[];
  /**
   * Cases where the honest answer is "let's talk before you buy".
   *
   * Deliberately on the page. The site's whole argument is claims you can
   * check, and a product page that cannot name a single situation it suits
   * badly is not describing a product.
   */
  checkFirst?: { name: string; detail: string }[];
  features: string[];
  status: ProductStatus;
  /** Flagships get homepage feature sections. */
  flagship?: boolean;
  /**
   * The capability list is shorter than the product deserves — we have not
   * been given the full one yet. This never changes what a page CLAIMS;
   * the product ships either way. It only marks where detail is owed.
   */
  needsFacts?: boolean;
  /** Short accent label for the card chip. */
  chip: string;
  /**
   * Per-page search metadata, for products rendered by the shared template.
   *
   * Written rather than derived: a description cut algorithmically out of
   * `summary` lands mid-clause on half the catalogue, and this string is the
   * one a search result actually shows. Keep it to ~155 characters.
   *
   * Products that still have a hand-built page carry their metadata in that
   * page's own layout.tsx; they gain this field as they are converted.
   */
  seo?: {
    /** WITHOUT the brand suffix — the /solutions layout template appends it. */
    title: string;
    description: string;
    keywords: string[];
  };
};

export const PRODUCTS: Product[] = [
  // ---------------------------------------------------------------- flagships
  {
    slug: 'restro360',
    href: '/solutions/restaurant',
    name: 'Engispider Restro',
    category: 'Restaurant management & POS',
    chip: 'Restaurants',
    tagline: 'Run the floor from the table, the kitchen — or another city.',
    summary:
      'Billing, kitchen, stock and real profit in one system. Four ways in — web app, Android waiter app, owner app with live takings, and QR self-ordering for guests. All included.',
    audience:
      'Independent restaurants, cafes, cloud kitchens and multi-outlet chains that have outgrown a cash register.',
    fits: [
      {
        name: 'Independent restaurants',
        detail:
          'One floor, one kitchen, and an owner who is also the manager, the buyer and the accountant.',
      },
      {
        name: 'Cafés and coffee shops',
        detail:
          'High cover counts and small tickets, where a queue cannot wait for someone to find the bill.',
      },
      {
        name: 'Cloud kitchens',
        detail:
          'No floor at all. Orders in, KOTs out, and a margin per dish that has to be right to survive.',
      },
      {
        name: 'Multi-outlet chains',
        detail:
          'Several kitchens on one login, stock moving between them, and one set of numbers at the end of the day.',
      },
    ],
    checkFirst: [
      {
        name: 'A single counter and a notebook',
        detail:
          'If a cash register genuinely covers it today, this is more system than you need. Tell us and we will say so.',
      },
      {
        name: 'You only want a billing machine',
        detail:
          'Billing is the cheapest part of this. The value is stock, recipes and profit joining up — buy it for that.',
      },
    ],
    features: [
      'Web app, Android waiter app and Android owner app — all included',
      'QR self-ordering — guests scan and order, no app needed',
      'Live takings, orders and table status on the owner app from anywhere',
      'Lightning POS for dine-in, takeaway and delivery',
      'Table management with merge/split bills',
      'KOT printing and a live kitchen display',
      'Menu variants, add-ons and HSN/GST-ready pricing',
      'Ingredient inventory with automatic recipe deduction',
      'Suppliers, purchases and payables',
      'Inter-branch stock transfers with an audit trail',
      'Menu profitability — food-cost % and margin per dish',
      'Expenses and true P&L: sales − COGS − expenses',
      'Day-end summary emailed automatically at close',
      'Weekly reports on sales, items, payments, stock and staff',
      'Loyalty, promotions and reservations',
      'Staff attendance and multi-outlet reporting',
    ],
    status: 'shipping',
    flagship: true,
  },
  {
    slug: 'campus360',
    href: '/solutions/education',
    name: 'Engispider Campus',
    category: 'School & college ERP',
    chip: 'Education',
    tagline: 'Admissions to accounting, for one campus or a whole group.',
    summary:
      'Admissions, fees, accounts, exams, hostel, transport and payroll in one ERP. Every rupee posts itself to the books, with maker-checker approval and gap-less receipts — and parents pay from an Android app or the web portal.',
    audience:
      'Schools, colleges, polytechnics, nursing and pharmacy institutes, and multi-institution education groups.',
    fits: [
      {
        name: 'Schools',
        detail:
          'One campus, one office, and a fee register that has to balance before anyone goes home.',
      },
      {
        name: 'Colleges & polytechnics',
        detail:
          'Semester fee plans, exam form fill-up and hostel allotment all feeding the same ledger.',
      },
      {
        name: 'Nursing & pharmacy institutes',
        detail:
          'Category-wise fee structures and records that have to survive an inspection years later.',
      },
      {
        name: 'Multi-institution groups',
        detail:
          'Several institutes on one deployment, each one’s data separate, one login to move between them.',
      },
    ],
    checkFirst: [
      {
        name: 'You need one module, not an ERP',
        detail:
          'This is built around the fee ledger and the accounts under it. For attendance alone it is far more system than you need.',
      },
      {
        name: 'One person does everything',
        detail:
          'Maker-checker is the point: a cashier raises, someone else verifies. With a single administrator you lose the control you are buying.',
      },
    ],
    features: [
      'Web app for the office, plus an Android app and web portal for families — all included',
      'Multi-institution — run a whole group from one deployment',
      'Online admissions with course, category, hostel and transport in one flow',
      'Student 360° profile: fees, receipts, payments, certificates',
      'Bulk student import from Excel with validation and error preview',
      'Fee plans by course, year, category and student',
      'Maker-checker approval on every collection',
      'Instant automatic receipt on payment',
      'Gap-less, audit-ready receipt numbering',
      'Discount and concession approval workflow',
      'Online fee payment with automatic bank reconciliation',
      'One-click refunds to the original payment source',
      'Examinations, hostel, transport, library and staff payroll',
      'Student and parent portal on Android and the web',
    ],
    status: 'shipping',
    flagship: true,
  },

  // -------------------------------------------------------- business systems
  {
    slug: 'hrms',
    href: '/solutions/hrms',
    name: 'Engispider HRMS',
    category: 'HR & payroll management',
    chip: 'HR',
    tagline: 'Hire, track attendance and run payroll without spreadsheets.',
    summary:
      'The whole employee lifecycle in one system — hiring, records, leave, biometric attendance and payroll with statutory deductions. The attendance device feeds payroll directly, and staff check payslips and apply for leave themselves.',
    audience:
      'Growing companies and institutions running HR on spreadsheets, and anyone with biometric attendance to reconcile against payroll.',
    fits: [
      {
        name: 'Companies outgrowing spreadsheets',
        detail:
          'Fifty people is the point where one workbook stops being a record and starts being a liability.',
      },
      {
        name: 'Anywhere with a biometric device',
        detail:
          'Punches already exist in a machine. The work is getting them into payroll without a month-end re-typing.',
      },
      {
        name: 'Multi-location employers',
        detail:
          'Several sites, several devices, one headcount — and one payroll run that has to cover all of them.',
      },
      {
        name: 'Institutions with statutory payroll',
        detail:
          'EPF, ESI and TDS computed on the run rather than reconciled afterwards against a consultant’s sheet.',
      },
    ],
    checkFirst: [
      {
        name: 'Under about ten staff',
        detail:
          'At that size a shared sheet genuinely does the job. Tell us your headcount and we will say so plainly.',
      },
      {
        name: 'Payroll is fully outsourced',
        detail:
          'If a consultant runs it end to end, the attendance and leave half may be all you need. Worth scoping before you buy the rest.',
      },
    ],
    features: [
      'Employee database with document storage',
      'Leave tracking with approval workflows and balances',
      'Biometric attendance integration and real-time monitoring',
      'Automated payroll with tax and statutory deductions',
      'Performance reviews, goals and KPI tracking',
      'Recruitment from job posting through onboarding',
      'Employee self-service portal on mobile',
      'Role-based access control',
    ],
    status: 'shipping',
  },
  {
    slug: 'crm',
    href: '/solutions/crm',
    name: 'Engispider CRM',
    category: 'Customer relationship management',
    chip: 'Sales',
    tagline: 'Lead to quotation to invoice, without retyping any of it.',
    summary:
      'A CRM that does not stop at the pipeline. Leads, quotations, invoices and recurring subscriptions in one system, with every call and follow-up logged against the customer — so an accepted quote becomes an invoice rather than a figure someone copies across.',
    audience: 'Sales teams, agencies and service businesses tracking leads across calls, email and WhatsApp.',
    fits: [
      {
        name: 'Teams that quote before they sell',
        detail:
          'Where the deal is a document — a priced quotation that gets revised twice before anyone signs.',
      },
      {
        name: 'Recurring-revenue businesses',
        detail:
          'Retainers, AMCs and subscriptions that have to invoice themselves on a cycle nobody wants to diarise.',
      },
      {
        name: 'Phone-first sales',
        detail:
          'Most of the relationship happens on a call. The record of it should not live in a notebook.',
      },
      {
        name: 'Agencies & service firms',
        detail:
          'A handful of people, a long pipeline, and no appetite for a CRM that needs its own administrator.',
      },
    ],
    checkFirst: [
      {
        name: 'You sell at a counter',
        detail:
          'For walk-in retail there is no pipeline to manage — Engispider Retail or Restro is the closer fit.',
      },
      {
        name: 'You already run an accounting package',
        detail:
          'Invoices and subscriptions here may overlap it. Worth a scoping call to decide which system owns the ledger.',
      },
    ],
    features: [
      'Centralised contact database with full interaction history',
      'Visual sales pipeline from lead to conversion',
      'Quotations with versioning, sent and accepted states',
      'Invoices raised from an accepted quotation, not retyped',
      'Recurring subscriptions billed on their own cycle',
      'Bank accounts and master items for consistent pricing',
      'Task assignment and team productivity tracking',
      'Integrated calling with logging and analytics',
      'Email campaigns and automated follow-ups',
      'Dashboards and reporting',
      'Mobile access to customer data',
      'Workflow automation for repetitive steps',
    ],
    status: 'shipping',
  },
  {
    slug: 'retail360',
    href: '/solutions/retail',
    name: 'Engispider Retail',
    category: 'Retail POS & item master',
    chip: 'Retail',
    tagline: 'One catalogue engine that adapts to any retail vertical.',
    summary:
      'Engispider Retail is point-of-sale and catalogue management for shops and chains. Its item master renders itself from each category’s configuration, so adding a new vertical — apparel, grocery, electronics — needs configuration rather than a rebuild.',
    audience: 'Single-store retailers and chains that need category-specific product attributes without custom software for each one.',
    features: [
      'Category-driven item master — new verticals need no code',
      'Configurable product attributes per category',
      'Point-of-sale billing',
      'Stock and pricing management',
      'Role-based access with JWT authentication',
      'Shares its architecture and auth model with Engispider Restro',
    ],
    status: 'shipping',
    seo: {
      title: 'Retail POS Software | Engispider Retail Billing & Stock',
      description:
        'Engispider Retail is point-of-sale and catalogue software for shops and chains in India — a category-driven item master, billing, stock and pricing, with role-based access.',
      keywords: [
        'Retail POS Software India',
        'Retail Billing Software',
        'Retail Management System',
        'Point of Sale Software',
        'Shop Billing Software',
        'Retail Chain Software',
        'Item Master Software',
        'Retail Software Bhubaneswar',
      ],
    },
  },
  {
    slug: 'inventory',
    href: '/solutions/inventory',
    name: 'Engispider Inventory',
    category: 'Stock & warehouse management',
    chip: 'Inventory',
    tagline: 'Know what you hold, where it is, and when to reorder.',
    summary:
      'Real-time stock tracking across multiple locations, with barcode scanning, purchase and sales orders, automated low-stock alerts, and reporting on turnover and movement.',
    audience: 'Distributors, wholesalers and multi-location businesses managing physical stock.',
    fits: [
      {
        name: 'Distributors & wholesalers',
        detail:
          'Thousands of SKUs, thin margins, and a count that has to be right because the margin is in the count.',
      },
      {
        name: 'Multi-warehouse operations',
        detail:
          'Stock in four places, and a question — "do we have it?" — that currently takes four phone calls.',
      },
      {
        name: 'Anyone barcoding goods in',
        detail:
          'Receiving against a purchase order is where stock stops being accurate. Scanning is where it stays accurate.',
      },
      {
        name: 'Businesses with capital in stock',
        detail:
          'If dead stock is money you cannot name, turnover reporting pays for the system on its own.',
      },
    ],
    checkFirst: [
      {
        name: 'Your stock is already inside another product',
        detail:
          'Restro, Retail and Pharmacy each carry their own stock. Running this alongside one of them usually duplicates it.',
      },
      {
        name: 'You hold a handful of lines',
        detail:
          'Under about fifty SKUs in one place, a sheet is honestly fine. We would rather say so than sell you a warehouse system.',
      },
    ],
    features: [
      'Real-time inventory across multiple locations',
      'Barcode and QR scanning',
      'Multi-warehouse, location-based tracking',
      'Purchase orders, sales orders and delivery tracking',
      'Low-stock alerts and reorder points',
      'Turnover and stock-movement analytics',
      'Excel and CSV import/export',
      'Mobile stock operations',
    ],
    status: 'shipping',
  },
  {
    slug: 'site-manager',
    href: '/solutions/site-manager',
    name: 'Engispider Site Manager',
    category: 'Multi-site inventory & asset management',
    chip: 'Projects',
    tagline: 'Track consumable stock and fixed assets across every site.',
    summary:
      'A multi-tenant SaaS for companies operating across warehouses, project sites and plants. It handles receiving, storing, issuing, transferring and tracking both consumable stock and fixed assets per site, with every record scoped to its organisation and enforced server-side.',
    audience: 'Construction, infrastructure and manufacturing companies running stock and equipment across multiple physical sites.',
    features: [
      'Per-site receiving, issue, transfer and tracking',
      'Consumable stock and fixed assets in one system',
      'Multi-tenant — many client organisations from one deployment',
      'Organisation scoping enforced server-side on every query',
      'Role-based security with JWT',
      'Built on Java 17, Spring Boot 3.3 and MySQL 8',
    ],
    status: 'shipping',
    seo: {
      title: 'Site Inventory & Asset Management Software',
      description:
        'Engispider Site Manager tracks consumable stock and fixed assets across warehouses, project sites and plants — receiving, issue, transfer and custody, scoped per site.',
      keywords: [
        'Site Inventory Management Software',
        'Construction Inventory Software',
        'Asset Management Software India',
        'Multi Site Stock Management',
        'Project Material Management',
        'Plant Asset Tracking',
        'Site Management Software Bhubaneswar',
      ],
    },
  },

  // ---------------------------------------------------------- health sciences
  {
    slug: 'pharmacy',
    href: '/solutions/pharmacy',
    name: 'Engispider Pharmacy',
    category: 'Pharmacy & medical store software',
    chip: 'Pharmacy',
    tagline: 'Batch, expiry and GST billing handled correctly.',
    summary:
      'Pharmacy management with a full drug database, batch and expiry tracking, GST-compliant billing, prescription handling and automatic reorder alerts — built around the parts of a medical store that actually cause losses.',
    audience: 'Retail pharmacies, medical stores and hospital dispensaries.',
    fits: [
      {
        name: 'Retail pharmacies',
        detail:
          'A counter that has to move fast, and a back room where the expiry losses quietly happen.',
      },
      {
        name: 'Medical stores with batch stock',
        detail:
          'Anywhere a recall or a return means finding one batch among hundreds, at speed.',
      },
      {
        name: 'Hospital dispensaries',
        detail:
          'Prescriptions arriving from named doctors, with Schedule H paperwork that has to hold up.',
      },
      {
        name: 'Owners who cannot see margin',
        detail:
          'If you know your turnover but not what each line earns, that gap is usually the whole profit.',
      },
    ],
    checkFirst: [
      {
        name: 'You do not track batches',
        detail:
          'Most of the value here is batch-level. Without it you are buying a billing machine, which is the cheap part.',
      },
      {
        name: 'You already run a hospital system',
        detail:
          'The dispensary may belong inside it. Worth scoping which system owns the patient record before adding another.',
      },
    ],
    features: [
      'Drug database with batch tracking',
      'Expiry and near-expiry alerts',
      'GST-compliant billing with multiple payment modes',
      'Digital prescription handling and doctor database',
      'Real-time stock with automatic reorder notifications',
      'Drug interaction and contraindication alerts',
      'Sales, profit-margin and trend reporting',
      'Bill, label and report printing',
    ],
    status: 'shipping',
  },
  {
    slug: 'lims',
    href: '/solutions/lims',
    name: 'Engispider LIMS',
    category: 'Laboratory Information Management System',
    chip: 'Laboratories',
    tagline: 'From sample inward to signed report, with the audit trail intact.',
    summary:
      'A LIMS covering the full testing workflow: customer work orders, sample inward with generated sample IDs, preparation job cards, equipment scheduling, test-wise raw data capture, report generation, invoicing and outward delivery challans — with role-based access and an audit trail throughout.',
    audience: 'Testing and calibration laboratories, materials labs, and analytical service providers.',
    features: [
      'Customer and work order management',
      'Sample inward with automatic sample ID generation',
      'Sample preparation and job cards',
      'Equipment master with intelligent scheduling',
      'Test-wise raw data capture',
      'Report generation including consolidated reports',
      'Invoicing',
      'Sample return and outward delivery challan',
      'Notifications across the workflow',
      'Role-based access, security hardening and audit logging',
      'Admin dashboard and analytics',
    ],
    status: 'shipping',
    seo: {
      title: 'LIMS Software India | Laboratory Management System',
      description:
        'Engispider LIMS runs the full lab workflow — work orders, sample inward, job cards, equipment scheduling, test reports and invoicing, with a full audit trail.',
      keywords: [
        'LIMS Software India',
        'Laboratory Information Management System',
        'Lab Management Software',
        'Testing Laboratory Software',
        'Calibration Lab Software',
        'Sample Management Software',
        'Lab Report Software',
        'LIMS Bhubaneswar',
      ],
    },
  },
  {
    slug: 'clinic',
    href: '/solutions/clinic',
    name: 'Engispider Clinic',
    category: 'Clinic & practice management',
    chip: 'Clinics',
    tagline: 'Appointments, records and billing for outpatient practice.',
    summary:
      'Clinic management for outpatient practice — appointments, patient records and billing in one system, so the front desk, the consulting room and the cash drawer are all looking at the same day.',
    audience: 'Outpatient clinics and individual practices.',
    features: [
      'Appointment booking with a day and week view',
      'Patient records held against the person, visit by visit',
      'Consultation notes and prescription capture',
      'Billing and receipts at the front desk',
      'Doctor and clinic-wide schedules',
      'Role-based access for reception and practitioners',
    ],
    status: 'shipping',
    needsFacts: true,
    seo: {
      title: 'Clinic Management Software | Engispider Clinic',
      description:
        'Clinic management software for outpatient practices, from Engispider Infotech in Bhubaneswar. Talk to us about appointments, records and billing for your clinic.',
      keywords: [
        'Clinic Management Software',
        'Clinic Software India',
        'Practice Management Software',
        'OPD Management Software',
        'Doctor Appointment Software',
        'Clinic Billing Software Bhubaneswar',
      ],
    },
  },

  // --------------------------------------------------------------- platform
  {
    slug: 'whatsapp',
    href: '/solutions/whatsapp',
    name: 'Engispider Comms',
    category: 'WhatsApp, SMS & email messaging API',
    chip: 'Messaging',
    tagline: 'One API for WhatsApp, SMS and email — with retries and receipts.',
    summary:
      'A multi-tenant communication service that centralises outbound WhatsApp, SMS and email. Applications post a channel, recipient and template code; the hub resolves the provider, sends, retries with exponential backoff, and records delivery receipts. Switching SMS providers becomes a config change rather than a code change.',
    audience: 'Product teams that need transactional messaging without each application integrating Meta WhatsApp, an SMS gateway and SMTP separately.',
    features: [
      'One API for WhatsApp, SMS and email',
      'Multi-tenant — per-tenant providers, templates, keys and quotas',
      'Provider-agnostic routing; swap providers without touching calling apps',
      'Outbox and scheduled dispatcher with exponential-backoff retries',
      'Delivery-receipt webhooks flip messages to DELIVERED / FAILED',
      'Template management with preview, cURL and test-send',
      'Admin dashboard for tenants, providers, users, quotas and logs',
      'Ships as a single self-contained Spring Boot JAR',
    ],
    status: 'shipping',
    seo: {
      title: 'WhatsApp, SMS & Email API | Engispider Comms',
      description:
        'One API for WhatsApp, SMS and email. Engispider Comms is a multi-tenant messaging service with provider routing, retries and delivery receipt webhooks.',
      keywords: [
        'WhatsApp Business API India',
        'Transactional Messaging API',
        'Bulk SMS API India',
        'WhatsApp API Integration',
        'SMS Gateway Integration',
        'Email API India',
        'Messaging Platform Bhubaneswar',
      ],
    },
  },
  {
    slug: 'face-recognition',
    href: '/solutions/face-recognition',
    name: 'Engispider Face Attendance',
    category: 'Face recognition attendance kiosk',
    chip: 'Biometrics',
    tagline: 'Staff look at the screen. Attendance is already marked.',
    summary:
      'A face recognition kiosk that enrols staff from a single photo and identifies them on arrival, marking attendance without cards, fingerprints or a queue. Passive liveness detection rejects a photo or a phone screen held up to the camera, and the kiosk app keeps working when the network does not.',
    audience:
      'Employers replacing fingerprint readers — useful anywhere shared-touch biometrics are impractical, and for sites with high headcount at shift change.',
    features: [
      'Enrol an employee from one photograph',
      'Recognition on arrival — no card, no touch, no queue',
      'Passive liveness detection rejects printed photos and phone screens',
      'Attendance written straight through to the HR system',
      'Kiosk app for Android tablets, with an offline state',
      'ArcFace embeddings matched by cosine similarity in memory',
      'Self-hosted — faces never leave your infrastructure',
      'Deploys as a container alongside your other systems',
    ],
    status: 'shipping',
    seo: {
      title: 'Face Recognition Attendance System | Kiosk',
      description:
        'Face recognition attendance that enrols staff from one photograph and marks them on arrival. Passive liveness detection, self-hosted, with an Android kiosk app.',
      keywords: [
        'Face Recognition Attendance System',
        'Face Attendance Software India',
        'Touchless Attendance System',
        'Facial Recognition Kiosk',
        'Biometric Attendance Software',
        'Attendance Software Bhubaneswar',
      ],
    },
  },
  {
    slug: 'monitoring',
    href: '/solutions/monitoring',
    name: 'Engispider Monitoring',
    category: 'Temperature & equipment monitoring',
    chip: 'Monitoring',
    tagline: 'Continuous temperature logging and alarms for critical equipment.',
    summary:
      'Continuous temperature logging for cold rooms, boilers and other critical equipment, with alarms when a reading leaves its safe range — so a failure is something you are told about rather than something you discover.',
    audience: 'Cold storage operators, food and pharmaceutical facilities, and plants running temperature-critical equipment.',
    features: [
      'Continuous temperature logging against each piece of equipment',
      'Alarms when a reading leaves its configured safe range',
      'History retained for the period you need to evidence',
      'Multiple rooms, units or plants on one view',
    ],
    status: 'shipping',
    needsFacts: true,
    seo: {
      title: 'Temperature Monitoring System | Engispider Monitoring',
      description:
        'Continuous temperature logging and alarms for cold rooms, boilers and other critical equipment, from Engispider Infotech in Bhubaneswar.',
      keywords: [
        'Temperature Monitoring System India',
        'Cold Storage Monitoring',
        'Cold Chain Monitoring',
        'Equipment Monitoring Software',
        'Temperature Data Logger',
        'Boiler Monitoring System',
      ],
    },
  },

  // ---------------------------------------------------------------- custom
  {
    slug: 'business',
    href: '/solutions/business',
    name: 'Engispider Custom Software',
    category: 'Bespoke software development',
    chip: 'Custom',
    tagline: 'When the process is yours, the software should be too.',
    summary:
      'Where a packaged product does not fit, we build the system. ERP, internal tools, integrations and migrations — designed around how your business actually works, on the same Java, Spring Boot, MySQL and React stack as our products.',
    audience: 'Organisations with a workflow no off-the-shelf product models correctly.',
    fits: [
      {
        name: 'A process nothing models',
        detail:
          'The thing that makes your business yours is usually the thing no packaged product has a screen for.',
      },
      {
        name: 'Software you have outgrown',
        detail:
          'A system that worked at ten people and is now the reason three of them have a job.',
      },
      {
        name: 'Systems that must talk',
        detail:
          'Keep what works, connect it properly, and stop exporting a file between two of them every Monday.',
      },
      {
        name: 'Products of your own',
        detail:
          'Multi-tenant SaaS built the way we build ours — isolation enforced server-side from the first commit.',
      },
    ],
    checkFirst: [
      {
        name: 'A product in the catalogue nearly fits',
        detail:
          'Configuring one is faster and cheaper than building. We will tell you when that is the honest answer.',
      },
      {
        name: 'The requirement is not settled yet',
        detail:
          'Discovery can establish it — but a build started before anyone agrees the scope is the most expensive way to find out.',
      },
    ],
    features: [
      'Custom ERP and internal line-of-business tools',
      'System integration and data migration',
      'Payment gateway, WhatsApp and SMS integrations',
      'Cloud architecture and deployment',
      'Mobile applications on Flutter',
      'Business intelligence dashboards',
    ],
    status: 'shipping',
  },
];

/**
 * The catalogue size, in both forms copy needs.
 *
 * Derived rather than written out, because the count has already changed
 * twice and every hardcoded "thirteen" is a future contradiction between
 * the headline and the list directly beneath it.
 */
const COUNT_WORDS = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
  'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
  'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
];

export const PRODUCT_COUNT = PRODUCTS.length;
export const PRODUCT_COUNT_WORD = COUNT_WORDS[PRODUCTS.length] ?? String(PRODUCTS.length);
export const PRODUCT_COUNT_WORD_CAP =
  PRODUCT_COUNT_WORD.charAt(0).toUpperCase() + PRODUCT_COUNT_WORD.slice(1);

/** Products with a dedicated homepage feature section. */
export const FLAGSHIPS = PRODUCTS.filter((p) => p.flagship);

/** Everything else, for the catalogue grid. */
export const CATALOGUE = PRODUCTS.filter((p) => !p.flagship);

export function productBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

/**
 * Industries, derived from products that actually exist rather than a stock
 * list. Each names the product that serves it, so the claim is checkable.
 */
export const INDUSTRIES = [
  { name: 'Restaurants & cafes', product: 'Engispider Restro', href: '/solutions/restaurant' },
  { name: 'Schools & colleges', product: 'Engispider Campus', href: '/solutions/education' },
  { name: 'Retail', product: 'Engispider Retail', href: '/solutions/retail' },
  { name: 'Laboratories', product: 'Engispider LIMS', href: '/solutions/lims' },
  { name: 'Pharmacies', product: 'Engispider Pharmacy', href: '/solutions/pharmacy' },
  { name: 'Clinics & healthcare', product: 'Engispider Clinic', href: '/solutions/clinic' },
  { name: 'Construction & infrastructure', product: 'Engispider Site Manager', href: '/solutions/site-manager' },
  { name: 'Logistics', product: 'Custom software', href: '/solutions/business' },
] as const;
