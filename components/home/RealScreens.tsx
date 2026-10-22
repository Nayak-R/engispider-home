/**
 * Faithful recreations of the real product interfaces.
 *
 * Built from screenshots of the running applications rather than invented,
 * so the sidebars, column headings, status pills, identifiers and brand
 * colours are the ones a customer actually sees:
 *
 *   CRM Platform    dark navy rail, Quotations list, ACCEPTED pills,
 *                   Q/Q/2026-27/xxx quote numbers, red expiry dates
 *   HRMS            violet welcome banner with employee/present/department
 *                   counts, then the four status cards
 *   Academic Suite  Students register with Adm. no, course, category and
 *                   guardian columns, ACTIVE pills
 *
 * Each product keeps its own palette. These are screenshots of software, not
 * site furniture — recolouring them to the site's orange would misrepresent
 * what a buyer is actually going to log into.
 *
 * Still HTML/CSS rather than images: ~3KB each instead of ~200KB, crisp at
 * any density, no layout shift, and nothing to re-capture when a product
 * changes. All aria-hidden — every claim they illustrate is made in real
 * text beside them. Figures are demo-tenant data.
 */

/* ============================================================ CRM Platform */

const QUOTES = [
  ['Q/Q/2026-27/005', 'Test orga', '₹1,41,600.00', '24/6/2026', '10/6/2026'],
  ['Q/Q/2026-27/004', 'RAhul', '₹24,780.00', '9/6/2026', '2/6/2026'],
  ['ES/Q/2026-27/002', 'RRRRR', '₹17,700.00', '27/5/2026', '23/5/2026'],
  ['ES/Q/2026-27/001', 'Test orga', '₹49,560.00', '28/5/2026', '23/5/2026'],
];

const CRM_NAV = [
  'Dashboard', 'Leads', 'Customers', 'Quotations', 'Invoices',
  'Subscriptions', 'Bank Accounts', 'Master Items', 'Tasks', 'Reports',
];

export function CrmScreen() {
  return (
    <div
      aria-hidden="true"
      className="flex overflow-hidden rounded-lg border border-hairline bg-[#F1F5F9] shadow-[0_18px_50px_-28px_rgba(10,15,26,0.3)]"
    >
      {/* Dark navy rail, as in the product */}
      <aside className="hidden w-[132px] shrink-0 bg-[#172554] p-2.5 sm:block">
        <div className="mb-3 flex items-center gap-1.5 px-1">
          <span className="grid h-5 w-5 place-items-center rounded bg-[#F97316] text-[0.5rem] font-bold text-white">
            E
          </span>
          <span className="leading-tight">
            <span className="block text-[0.58rem] font-bold text-white">Engispider</span>
            <span className="block text-[0.44rem] text-slate-400">CRM Platform</span>
          </span>
        </div>
        <ul className="space-y-[1px]">
          {CRM_NAV.map((n) => (
            <li key={n}>
              <span
                className={`block rounded px-2 py-[5px] text-[0.6rem] ${
                  n === 'Quotations'
                    ? 'bg-[#1D4ED8] font-medium text-white'
                    : 'text-slate-300'
                }`}
              >
                {n}
              </span>
            </li>
          ))}
        </ul>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2">
          <span className="rounded border border-slate-200 px-2 py-0.5 text-[0.56rem] text-slate-600">
            Engispider Test
          </span>
          <span className="flex items-center gap-1.5">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#2563EB] text-[0.44rem] font-bold text-white">
              R
            </span>
            <span className="text-[0.52rem] leading-tight text-slate-600">Rahul</span>
          </span>
        </div>

        <div className="p-3">
          <div className="mb-2.5 flex items-end justify-between">
            <span>
              <span className="block text-[0.95rem] font-bold leading-none text-slate-900">
                Quotations
              </span>
              <span className="mt-1 block text-[0.52rem] text-slate-500">4 total</span>
            </span>
            <span className="rounded bg-[#2563EB] px-2.5 py-1 text-[0.54rem] font-semibold text-white">
              + New Quotation
            </span>
          </div>

          <div className="mb-2 flex gap-1.5">
            <span className="flex-1 rounded border border-slate-200 bg-white px-2 py-1 text-[0.52rem] text-slate-400">
              Search by quote number or customer…
            </span>
            <span className="rounded border border-slate-200 bg-white px-2 py-1 text-[0.52rem] text-slate-600">
              All Statuses
            </span>
          </div>

          <div className="overflow-hidden rounded border border-slate-200 bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['QUOTE #', 'CUSTOMER', 'STATUS', 'AMOUNT', 'VALID UNTIL'].map((h, i) => (
                    <th
                      key={h}
                      className={`px-2 py-1 text-[0.44rem] font-semibold tracking-wide text-slate-500 ${
                        i === 3 ? 'text-right' : 'text-left'
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {QUOTES.map(([no, cust, amt, valid]) => (
                  <tr key={no} className="border-b border-slate-100 last:border-0">
                    <td className="px-2 py-[5px] text-[0.58rem] font-medium text-[#2563EB]">
                      {no}
                    </td>
                    <td className="px-2 py-[5px] text-[0.58rem] text-slate-700">{cust}</td>
                    <td className="px-2 py-[5px]">
                      <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[0.44rem] font-semibold text-emerald-700">
                        ACCEPTED
                      </span>
                    </td>
                    <td className="px-2 py-[5px] text-right text-[0.58rem] font-semibold text-slate-900">
                      {amt}
                    </td>
                    <td className="px-2 py-[5px] text-[0.58rem] text-red-500">{valid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================================================================== HRMS */

const HRMS_NAV = [
  'Dashboard', 'Profile', 'Employees', 'Shifts', 'Attendance',
  'Leave', 'Holidays', 'Loans', 'Employee Bonus', 'Reimbursement',
];

const HRMS_CARDS: [string, string, string, string][] = [
  ['1', 'Pending Approvals', 'ACTION REQUIRED', 'border-amber-400'],
  ['0', 'Birthdays Today', '', 'border-pink-400'],
  ['0', 'Holidays This Month', 'UPCOMING', 'border-violet-400'],
  ['0', 'Pending Documents', 'All Clear ✓', 'border-emerald-400'],
];

export function HrmsRealScreen() {
  return (
    <div
      aria-hidden="true"
      className="flex overflow-hidden rounded-lg border border-hairline bg-[#F8FAFC] shadow-[0_18px_50px_-28px_rgba(10,15,26,0.3)]"
    >
      <aside className="hidden w-[126px] shrink-0 border-r border-slate-200 bg-white p-2.5 sm:block">
        <ul className="space-y-[1px]">
          {HRMS_NAV.map((n) => (
            <li key={n}>
              <span
                className={`block rounded px-2 py-[5px] text-[0.6rem] ${
                  n === 'Dashboard'
                    ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] font-semibold text-white'
                    : 'text-slate-600'
                }`}
              >
                {n}
              </span>
            </li>
          ))}
        </ul>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2">
          <span className="leading-tight">
            <span className="block text-[0.7rem] font-bold text-[#6D28D9]">
              Biswal Enterprise Test
            </span>
            <span className="block text-[0.44rem] text-slate-500">
              Human Resource Management System
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#4F46E5] text-[0.42rem] font-bold text-white">
              RN
            </span>
            <span className="text-[0.52rem] text-slate-600">Rahul Nayak</span>
          </span>
        </div>

        <div className="p-3">
          {/* Violet welcome banner */}
          <div className="rounded-lg bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#C084FC] p-3">
            <span className="inline-block rounded-full bg-white/90 px-2 py-0.5 text-[0.46rem] font-medium text-slate-700">
              Good Afternoon
            </span>
            <p className="mt-1.5 text-[0.95rem] font-extrabold leading-tight text-white">
              Welcome back, <span className="text-amber-200">Rahul Nayak</span>!
            </p>
            <p className="mt-0.5 text-[0.46rem] text-white/85">
              Here’s your overview for Wednesday, October 21, 2026
            </p>
            <div className="mt-2 flex gap-1.5">
              {[['54', 'Employees'], ['0%', 'Present'], ['1', 'Departments']].map(([v, l]) => (
                <span key={l} className="rounded bg-white/20 px-2 py-1 leading-tight">
                  <span className="block text-[0.62rem] font-bold text-white">{v}</span>
                  <span className="block text-[0.42rem] text-white/85">{l}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-2.5 grid grid-cols-4 gap-1.5">
            {HRMS_CARDS.map(([value, label, tag, border]) => (
              <div
                key={label}
                className={`rounded border border-slate-200 border-l-2 bg-white p-2 ${border}`}
              >
                {tag && (
                  <span className="mb-1 block truncate text-[0.4rem] font-semibold text-amber-600">
                    {tag}
                  </span>
                )}
                <span className="block text-[0.85rem] font-bold leading-none text-slate-900">
                  {value}
                </span>
                <span className="mt-1 block text-[0.44rem] leading-tight text-slate-500">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================= Academic Suite */

const STUDENTS = [
  ['Sneha Sharma', 'DC/23/BTCS/001', '2023', 'GEN', 'Behera'],
  ['Siddharth Panda', 'DC/23/BTCS/002', '2023', 'GEN', 'Das'],
  ['Sneha Rao', 'DC/23/BTCS/003', '2023', 'OBC', 'Reddy'],
  ['Pranav Patel', 'DC/24/BTCS/001', '2024', 'OBC', 'Sharma'],
  ['Isha Sahoo', 'DC/24/BTCS/002', '2024', 'SC', 'Panda'],
];

const ACADEMIC_NAV = [
  'Dashboard', 'Academics', 'Students', 'Fees', 'Accounting',
  'Attendance', 'Examinations', 'Library', 'Hostel', 'Transport',
];

export function AcademicScreen() {
  return (
    <div
      aria-hidden="true"
      className="flex overflow-hidden rounded-lg border border-hairline bg-[#F8FAFC] shadow-[0_18px_50px_-28px_rgba(10,15,26,0.3)]"
    >
      <aside className="hidden w-[126px] shrink-0 border-r border-slate-200 bg-white p-2.5 sm:block">
        <div className="mb-3 px-1 leading-tight">
          <span className="block text-[0.6rem] font-bold text-slate-800">Engispider</span>
          <span className="block text-[0.42rem] tracking-wide text-slate-500">
            ACADEMIC SUITE
          </span>
        </div>
        <ul className="space-y-[1px]">
          {ACADEMIC_NAV.map((n) => (
            <li key={n}>
              <span
                className={`block rounded px-2 py-[5px] text-[0.6rem] ${
                  n === 'Students'
                    ? 'bg-[#EEF2FF] font-semibold text-[#4338CA]'
                    : 'text-slate-600'
                }`}
              >
                {n}
              </span>
            </li>
          ))}
        </ul>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2">
          <span className="rounded border border-slate-200 px-2 py-0.5 text-[0.56rem] text-slate-700">
            Engispider Demo College
          </span>
          <span className="flex items-center gap-1.5">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#4338CA] text-[0.4rem] font-bold text-white">
              DC
            </span>
            <span className="text-[0.52rem] text-slate-600">Demo College Admin</span>
          </span>
        </div>

        <div className="p-3">
          <div className="mb-2.5 flex items-end justify-between">
            <span>
              <span className="block text-[0.95rem] font-bold leading-none text-slate-900">
                Students
              </span>
              <span className="mt-1 block text-[0.5rem] text-slate-500">
                Onboarded students across the institution.
              </span>
            </span>
            <span className="rounded bg-[#4338CA] px-2.5 py-1 text-[0.54rem] font-semibold text-white">
              + Onboard student
            </span>
          </div>

          <div className="mb-2 flex gap-1.5">
            {['All admission years', 'All courses', 'All categories'].map((f) => (
              <span
                key={f}
                className="flex-1 truncate rounded border border-slate-200 bg-white px-2 py-1 text-[0.5rem] text-slate-500"
              >
                {f}
              </span>
            ))}
          </div>
          <div className="mb-1.5 text-[0.5rem] font-medium text-slate-600">42 students</div>

          <div className="overflow-hidden rounded border border-slate-200 bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['Student', 'Adm. no', 'Adm. year', 'Category', 'Guardian', 'Status'].map((h) => (
                    <th
                      key={h}
                      className="px-2 py-1 text-left text-[0.44rem] font-semibold text-slate-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STUDENTS.map(([name, adm, year, cat, guardian]) => (
                  <tr key={adm} className="border-b border-slate-100 last:border-0">
                    <td className="px-2 py-[5px] text-[0.58rem] font-medium text-slate-800">
                      {name}
                    </td>
                    <td className="mono-num px-2 py-[5px] text-[0.52rem] text-slate-500">
                      {adm}
                    </td>
                    <td className="px-2 py-[5px] text-[0.58rem] text-slate-600">{year}</td>
                    <td className="px-2 py-[5px] text-[0.58rem] text-slate-600">{cat}</td>
                    <td className="px-2 py-[5px] text-[0.58rem] text-slate-600">
                      {guardian} <span className="text-slate-400">(Parent)</span>
                    </td>
                    <td className="px-2 py-[5px]">
                      <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[0.44rem] font-semibold text-emerald-700">
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
