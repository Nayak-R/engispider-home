/**
 * Engispider Campus — every word of the education landing page, in one file.
 *
 * The page is long and the sections are rendered by three different files
 * (a server component, a client tab explorer, a client form). Keeping the
 * copy here means a sales or marketing reviewer reads ONE plain TypeScript
 * file instead of chasing strings through JSX, and it makes a claim audit
 * tractable: everything assertable about the product is in this document.
 *
 * ── The rules this copy was written under ────────────────────────────────
 * Every capability named below appears in the product's own feature list in
 * data/products.ts, in the shipped FAQ answers in data/faqs.ts, or in the
 * screens drawn in components/academic/Mockups.tsx. Nothing here was
 * invented to fill a section.
 *
 * Deliberately absent, because nobody can point at evidence for them:
 *   · testimonials, named endorsements, or quotes from institutions
 *   · student counts, collection-improvement percentages, hours saved
 *   · uptime figures, go-live timelines, fee-recovery guarantees
 *   · claims of board, council or accreditation compliance
 *   · integrations that have not been built for this product
 *
 * Where a capability has a condition on it — a payment gateway the
 * institution has to enable, an approval a human still has to give — the
 * condition is in the sentence rather than in a footnote.
 */

/* ======================================================= D · problem → outcome */

export type ProblemOutcome = {
  /** Short label for the pair. */
  tag: string;
  problem: string;
  outcome: string;
  /** The limit of the claim. Rendered in smaller type, never omitted. */
  limit: string;
};

export const PROBLEMS: readonly ProblemOutcome[] = [
  {
    tag: 'Fee follow-up',
    problem:
      'Working out who has not paid means opening the fee register, cross-checking the receipt book and asking the office — so the follow-up list is already a week old before anyone picks up the phone.',
    outcome:
      'Outstanding dues filter by institute, course, year and section, aged, with the guardian’s phone number already beside the name. The list assembles itself; your staff decide who to call and what to say.',
    limit:
      'The software does not collect the fee. It tells you accurately who still owes what, and when they were last followed up.',
  },
  {
    tag: 'Receipts and accounts',
    problem:
      'A receipt written at the counter, a concession nobody remembers approving, and a cash figure at the end of the day that does not agree with the register.',
    outcome:
      'The cashier raises the receipt and a second person in accounts verifies it before it counts. Numbering runs without gaps, discounts carry their own approval, and an edit is logged with what the value was before it changed.',
    limit:
      'Maker-checker makes an error findable and attributable. It does not replace a statutory audit, and it cannot stop two people agreeing to the same mistake.',
  },
  {
    tag: 'Disconnected records',
    problem:
      'Admissions in one register, fees in a second, hostel and transport in spreadsheets, and someone in accounts re-typing all of it at month end.',
    outcome:
      'One student record carries the admission, the fee plan, the hostel bed, the bus stop and every receipt. Allot a bed and the hostel fee appears on that student’s ledger — the figure is entered once.',
    limit:
      'Existing records still have to come across and be checked. That is what the migration phase is for, and it is the part that takes the longest.',
  },
  {
    tag: 'Parent communication',
    problem:
      'Parents come to the office to ask what is due, to collect a duplicate receipt, or to check attendance — usually on the busiest day of the month.',
    outcome:
      'Families see dues, pay online, download receipts and check attendance and declared results from an Android app or any browser. Notices go to one class or the whole institution from the same system.',
    limit:
      'Parents still ring the office, and some always will. The point is that the routine questions stop arriving at a counter.',
  },
];

/* ================================================== E · the product explorer */

export type ExplorerTab = {
  id: string;
  /** Short label on the tab control. */
  nav: string;
  /** Outcome-focused, not a module name. */
  heading: string;
  body: string;
  bullets: readonly string[];
  /** Caption on the frame — the module, never a URL. */
  caption: string;
  /** Draw it in a phone rather than a browser frame. */
  phone?: boolean;
  /** Optional link out to a related Engispider product or page. */
  link?: { href: string; label: string };
};

export const EXPLORER_TABS: readonly ExplorerTab[] = [
  {
    id: 'admissions',
    nav: 'Admissions & students',
    heading: 'One student record, from the admission form onwards',
    body:
      'Admission captures the course, category, guardian, hostel and transport in a single guided flow, and everything after it — fees, receipts, attendance, results, certificates — hangs off that one record instead of being kept again somewhere else.',
    bullets: [
      'Online admission flow with course, category, hostel and transport set together',
      'Student 360° profile: admission, fees, receipts, payments and certificates',
      'Bulk import of an existing batch from Excel, with an error preview before it commits',
      'Guardian details carried through to the parent portal and the defaulter list',
    ],
    caption: 'Students',
  },
  {
    id: 'fees',
    nav: 'Fees & collections',
    heading: 'Know what has been collected — and what is still due',
    body:
      'Fee plans are set the way your institution actually charges, and the ledger for each student shows what was billed, what was paid, what was waived and what remains. Nobody assembles that from a register.',
    bullets: [
      'Fee plans by course, academic year, category and individual student',
      'Mandatory and optional heads, with hostel and transport attaching on allotment',
      'Printable receipt on the spot for cash, cheque, UPI, card or online payment',
      'Partial payments and instalments tracked on the student ledger',
      'Outstanding and defaulter reports by institute, course, year and section',
    ],
    caption: 'Fees · Receipt approvals',
  },
  {
    id: 'accounting',
    nav: 'Accounting & reports',
    heading: 'The ledger posts itself, so the reports are never a re-typing',
    body:
      'Every approved receipt writes its own double entry — bank or cash debited, the fee head credited, balanced. The day book, trial balance and profit-and-loss are the same data rather than a monthly re-entry of it into a second package.',
    bullets: [
      'Automatic double-entry posting on every approved receipt',
      'Day book, cumulative by payment mode and by cashier, with a day-close guard',
      'Trial balance and P&L live against the same ledger',
      'Vouchers, ledgers and every report exportable to PDF or Excel',
    ],
    caption: 'Accounting · Day book',
  },
  {
    id: 'academics',
    nav: 'Attendance & exams',
    heading: 'Attendance, leave and the whole examination cycle',
    body:
      'Class-wise or day-wise attendance with leave requests and approvals, and an examination cycle that runs from schedule and form fill-up through exam-fee collection to marks upload, declaration and printing.',
    bullets: [
      'Class-wise and day-wise attendance, with leave requests and approvals',
      'Examination schedule, form fill-up and exam-fee collection in one cycle',
      'Marks upload, result declaration and printing',
      'Timetable published once; students and teachers each see their own',
    ],
    caption: 'Academics',
  },
  {
    id: 'operations',
    nav: 'Hostel, transport & library',
    heading: 'Campus operations that feed the fee ledger instead of a spreadsheet',
    body:
      'Allot a hostel bed and the hostel fee appears on that student’s ledger. Map a student to a bus stop and the fare follows. The library keeps its own stock and issues, with fines calculated rather than remembered.',
    bullets: [
      'Hostel rooms, bed allotment, transfers and leave — allotment raises the fee itself',
      'Transport routes, stops and fares, mapped to the student',
      'Library stock and location per copy, with issue, return and automatic fines',
      'All three visible on the same student record as fees and attendance',
    ],
    caption: 'Hostel · Transport · Library',
  },
  {
    id: 'parents',
    nav: 'Parent & student access',
    heading: 'The questions that used to arrive at the counter',
    body:
      'Families get an Android app and a browser portal showing exactly what is due, with receipts, attendance and declared results in the same place. Included in the subscription — there is no per-student charge and no limit on how many parents use it.',
    bullets: [
      'Fee dues by head, with the student’s own payment history',
      'Online payment where your institution has enabled a gateway',
      'Every receipt downloadable, without a trip to the office',
      'Attendance, declared results and leave requests',
    ],
    caption: 'Parent portal',
    phone: true,
  },
  {
    id: 'staff',
    nav: 'Staff & payroll',
    heading: 'Staff records, attendance and payroll under the same controls',
    body:
      'Employee records, attendance and leave feed a payroll run that produces payslips and a bank disbursement file — released only after approval, on the same maker-checker rule as a fee collection.',
    bullets: [
      'Staff records, attendance and leave',
      'Payroll run with payslips and bank disbursement',
      'Maker-checker approval before disbursement is released',
      'Posts to the same ledger as everything else',
    ],
    caption: 'Staff · Payroll run',
    link: { href: '/solutions/hrms', label: 'For a standalone HR and payroll system, see Engispider HRMS' },
  },
  {
    id: 'group',
    nav: 'Multi-institution',
    heading: 'A trust with four institutes, on one deployment',
    body:
      'Each institute keeps its own students, fee plans, receipts and ledger. A group-level role sees collection and outstanding across all of them; an institute-level role sees only their own. One login moves between them.',
    bullets: [
      'Several institutes on one deployment, each one’s records separate',
      'Group view of collection and outstanding across institutes',
      'Role-based access decides who sees the consolidated figures',
      'Fee structures and academic calendars configured per institute',
    ],
    caption: 'Group · All institutes',
  },
];

/* ============================================ F · financial control workflow */

export type TrailStep = {
  step: string;
  /** Who or what performs it — the honest half of the claim. */
  actor: 'Staff action' | 'Automatic' | 'Bank-confirmed' | 'On demand';
  body: string;
};

export const MONEY_TRAIL: readonly TrailStep[] = [
  {
    step: 'Fee collection',
    actor: 'Staff action',
    body:
      'Cash, cheque, UPI or card at the counter, or an online payment the parent makes themselves. A printable receipt is generated at that moment, numbered without gaps.',
  },
  {
    step: 'Verification',
    actor: 'Staff action',
    body:
      'Someone in accounts verifies what the cashier raised. Until that second approval the collection is not final. A discount or concession carries its own approval, traceable to a person.',
  },
  {
    step: 'Accounting entry',
    actor: 'Automatic',
    body:
      'The approved receipt posts its own double entry — bank or cash debited, the fee head credited, balanced. There is no separate bookkeeping step and nothing to re-key.',
  },
  {
    step: 'Reconciliation',
    actor: 'Bank-confirmed',
    body:
      'Online payments settle against the bank statement. A payment that has not landed stays visibly on hold rather than being marked received by someone who expects it to arrive.',
  },
  {
    step: 'Financial report',
    actor: 'On demand',
    body:
      'Day book by mode and cashier with a day-close guard, trial balance, P&L, collection and outstanding reports — all against the same ledger, exportable to PDF or Excel.',
  },
];

export type Control = { name: string; how: 'Automatic' | 'Needs a person' | 'Configured' };

export const MONEY_CONTROLS: readonly Control[] = [
  { name: 'Maker-checker approval on every collection', how: 'Needs a person' },
  { name: 'Discount and concession approval, traceable to a person', how: 'Needs a person' },
  { name: 'Gap-less, audit-ready receipt numbering', how: 'Automatic' },
  { name: 'Double-entry posting on every approved receipt', how: 'Automatic' },
  { name: 'Day book by mode and cashier, with a day-close guard', how: 'Automatic' },
  { name: 'Bank reconciliation for online payments', how: 'Automatic' },
  { name: 'Audit trail with before-and-after on recorded changes', how: 'Automatic' },
  { name: 'Role-based access to figures, approvals and reports', how: 'Configured' },
  { name: 'One-click refund to the original payment source', how: 'Needs a person' },
  { name: 'Outstanding, defaulter and collection reports', how: 'Automatic' },
];

/** The sentence that keeps the section honest. Rendered, never dropped. */
export const MONEY_LIMIT =
  'These controls make a collection traceable and an error findable. They are not a substitute for a statutory audit, they do not certify your accounts, and no approval workflow can prevent every mistake — what it can do is make sure nothing changes without leaving a record of who changed it.';

/* ================================================ G · institution types */

export type InstitutionType = {
  id: string;
  name: string;
  who: string;
  /** The workflows that actually matter to this kind of institution. */
  workflows: readonly string[];
};

export const INSTITUTION_TYPES: readonly InstitutionType[] = [
  {
    id: 'schools',
    name: 'Schools & higher secondary',
    who: 'One campus, one office, and a fee register that has to balance before anyone goes home.',
    workflows: [
      'Term and class-wise fee plans, with optional heads',
      'Class-wise attendance and leave approvals',
      'Parent app and portal for dues, receipts and attendance',
      'Examinations, results and printing',
      'Transport routes mapped to the student',
    ],
  },
  {
    id: 'colleges',
    name: 'Degree & autonomous colleges',
    who: 'Academic-year fee plans, student ledgers and an examination cycle that has to run on time.',
    workflows: [
      'Fee plans by course, academic year and category',
      'Student ledgers with partial payments and instalments',
      'Exam form fill-up and exam-fee collection in one cycle',
      'Hostel allotment and transport on the same ledger',
      'Library stock, issue, return and fines',
    ],
  },
  {
    id: 'technical',
    name: 'Engineering & polytechnic',
    who: 'Branch and year-wise structures, semester cycles, and a hostel most of the roll lives in.',
    workflows: [
      'Branch and year-wise fee structures',
      'Semester examination cycles and results',
      'Hostel blocks, bed allotment and transfers',
      'Staff records and payroll with approval before disbursement',
      'Collection and outstanding reports per branch',
    ],
  },
  {
    id: 'professional',
    name: 'Nursing, pharmacy & professional institutes',
    who: 'Category-wise structures and records that have to be produced years later, intact.',
    workflows: [
      'Category-wise and student-wise fee structures',
      'Complete student history with receipts and certificates',
      'Hostel operations for a largely residential roll',
      'Audit trail and gap-less receipt numbering for inspection',
      'Exports of any register or report to PDF or Excel',
    ],
  },
  {
    id: 'groups',
    name: 'Trusts & multi-campus groups',
    who: 'Several institutes under one management, each with its own fee structure and its own office.',
    workflows: [
      'Each institute’s records kept separate on one deployment',
      'One login to move between institutes',
      'Group-level view of collection and outstanding',
      'Role-based access deciding who sees consolidated figures',
      'Fee structures and academic calendars configured per institute',
    ],
  },
];

export const INSTITUTION_LIMIT =
  'We have not certified Engispider Campus against any board’s, university’s or council’s compliance requirements, and we do not claim it produces every statutory register in a prescribed format. If an inspection requires a specific format, bring it to the demo and we will tell you plainly whether it is already there or would be a change.';

/* ======================================================== I · implementation */

export const IMPLEMENTATION = [
  {
    title: 'Understand how you work now',
    body:
      'We go through your fee structure, your approval rules, your academic calendar and the registers you keep today. The output is a written scope with a phase plan and dates in it — before any work starts.',
  },
  {
    title: 'Configure your institution',
    body:
      'Institutes, courses, academic years, fee heads and plans, discount rules, roles and document formats, set against the way you work rather than a default template.',
  },
  {
    title: 'Import records, then prove them',
    body:
      'Students, guardians, fee plans and opening balances come across from Excel, CSV or a database export. We validate, hand you an error report, and reconcile the result against your current balances before anything is accepted.',
  },
  {
    title: 'Train, go live, and keep support',
    body:
      'Your staff trained on the screens they will actually use, on your own data. Production cutover with us on hand through the first days, then a support agreement with response times and a named contact.',
  },
] as const;

export const IMPLEMENTATION_LIMIT =
  'How long this takes depends on how much history has to come across and how many institutes are involved, so the dates go in your scope document rather than on this page. We would rather give you a plan we can keep than a number that reads well here.';

/* ====================================================== K · honest comparison */

export type ComparisonRow = {
  task: string;
  before: string;
  after: string;
};

export const COMPARISON: readonly ComparisonRow[] = [
  {
    task: 'Finding outstanding dues',
    before: 'Open the fee register, cross-check the receipt book, build the list by hand.',
    after: 'Filter by institute, course, year and section — aged, with guardian contact beside each name.',
  },
  {
    task: 'Generating a receipt',
    before: 'Written or typed at the counter, numbered by whoever is sitting there.',
    after: 'Generated on payment, numbered without gaps, printable immediately.',
  },
  {
    task: 'Reviewing collection approvals',
    before: 'One person’s word, checked at month end if at all.',
    after: 'Cashier raises, accounts verifies. A collection is not final on one approval.',
  },
  {
    task: 'Preparing financial reports',
    before: 'Re-entered into an accounting package or a workbook, usually in the last week of the month.',
    after: 'Day book, trial balance and P&L run against the same ledger the receipts posted to.',
  },
  {
    task: 'Tracking student information',
    before: 'Admission register, fee book, hostel sheet and transport list, each kept separately.',
    after: 'One student record carrying admission, fees, hostel, transport, attendance and results.',
  },
  {
    task: 'Giving parents access',
    before: 'A visit to the office, or a phone call to someone who has to go and look.',
    after: 'Android app and browser portal: dues, online payment, receipts, attendance, results.',
  },
  {
    task: 'Reviewing a change or an approval',
    before: 'Ask around, and hope someone remembers.',
    after: 'Audit trail showing what changed, who changed it, and what the value was before.',
  },
];

export const COMPARISON_LIMIT =
  'This compares Engispider Campus with running an institution on registers and spreadsheets — not with any other ERP product. Other systems do these things too. If you are already on one, the useful question is which of these you can do today without assembling it by hand; bring that list to the demo.';

/* ================================================================== L · FAQs */

export type CampusFaq = { question: string; answer: string };

export const CAMPUS_FAQS: readonly CampusFaq[] = [
  {
    question: 'Is Engispider Campus suitable for our type of school or college?',
    answer:
      'It is built for schools and higher secondary institutions, degree and autonomous colleges, polytechnics, nursing, pharmacy and other professional institutes, and for trusts running several of them. It is least useful if you want a single module on its own — attendance without fees, for example — because the system is built around the fee ledger and the accounts under it. Tell us what you run and we will say plainly whether it fits.',
  },
  {
    question: 'Can we manage multiple institutions under one account?',
    answer:
      'Yes. Several institutes run on one deployment with each institute’s records kept separate, and one login moves between them. A group-level role sees collection and outstanding consolidated across institutes; an institute-level role sees only their own.',
  },
  {
    question: 'Can we migrate student and fee data from Excel?',
    answer:
      'Yes. Data migration is part of every deployment. We import students, guardians, fee plans and opening balances from Excel, CSV or a database export, validate them, show you an error report before anything is committed, and reconcile the result against your current balances.',
  },
  {
    question: 'Can parents pay fees online?',
    answer:
      'Yes, where your institution has enabled a payment gateway. Parents pay from the Android app or the web portal, the receipt is generated immediately, and the payment is reconciled against the bank statement rather than being marked received by hand. A payment that has not settled stays on hold until it does.',
  },
  {
    question: 'How are receipts and accounting entries handled?',
    answer:
      'A cashier raises the receipt and someone in accounts verifies it; until that second approval the collection is not final. Receipt numbering runs without gaps. Each approved receipt posts its own double entry, so the day book, trial balance and profit-and-loss are live against the same ledger rather than re-typed monthly.',
  },
  {
    question: 'Can we configure different courses and fee structures?',
    answer:
      'Yes. Fee plans are set by course, academic year, category and individual student, with mandatory and optional heads. Hostel and transport fees attach to a student when a bed or a stop is allotted, so they do not have to be billed separately.',
  },
  {
    question: 'Do parents need to install an application?',
    answer:
      'No. There is an Android app, and the same portal works in any browser — which is what a parent on a desktop or a non-Android phone uses. Both are included in the subscription, with no per-student charge and no limit on how many parents use them.',
  },
  {
    question: 'What training and implementation support are provided?',
    answer:
      'Configuration, data migration, training and go-live are included with the subscription and are not billed as a separate project. Staff are trained on the screens they will use, on your own data rather than a sample set. After go-live, support continues under an agreement that sets response times and names a contact, during our support hours of Monday to Friday 9:00–18:00 and Saturday 9:00–14:00 IST.',
  },
  {
    question: 'Can we see the product before committing?',
    answer:
      'Yes. We run a guided demo on a live system using your own scenarios — bring your fee structure, your approval rules, or a report you currently struggle to produce. We do not hand out a self-serve login because every customer runs an isolated instance. A demo is usually scheduled within two working days of your enquiry.',
  },
  {
    question: 'How is pricing determined?',
    answer:
      'Pricing depends on the number of institutes and users and on whether you need custom work on top, so we quote after a scoping conversation rather than publishing a rate card — a single school and a four-college trust need very different things. Onboarding, migration and training are included with the subscription.',
  },
];

/* ======================================================= demo form options */

export const INSTITUTION_TYPE_OPTIONS = [
  'School / higher secondary',
  'Degree or autonomous college',
  'Engineering or polytechnic college',
  'Nursing, pharmacy or professional institute',
  'Educational trust / multi-campus group',
  'Other',
] as const;

export const STUDENT_COUNT_OPTIONS = [
  'Under 300',
  '300 – 800',
  '800 – 2,000',
  'Over 2,000',
  'Across several institutes',
] as const;
