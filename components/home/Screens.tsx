/**
 * Industry product screens.
 *
 * The fastest way to make a visitor understand what this company does is to
 * show the software, per industry, at a size where the labels are readable.
 *
 * These are modelled on the ACTUAL products, not invented. Module names,
 * statuses and column headings are taken from the real codebases:
 *
 *   Engispider Restro    restro360-web  — Net Revenue / Tax Collected / Avg Order
 *                               KPIs, Available·Occupied·Reserved table
 *                               states, PENDING·READY·COMPLETED·PAID orders
 *   Engispider Campus    school-erp-ui  — Fee Heads, Fee Plans, Outstanding, Receipt
 *                               and Discount Approvals; PENDING·APPROVED·
 *                               PARTIAL·OVERDUE
 *   LIMS         lims           — work order OPEN·TESTING·REPORTING·INVOICED,
 *                               sample REGISTERED·IN_PREP·QUEUED·TESTING·
 *                               TESTED, equipment IDLE·RUNNING·MAINTENANCE,
 *                               MTSPL sample IDs, job cards
 *   Engispider Site Manager site-manager   — GRN, issue, inter-site transfer
 *                               (dispatch → in-transit → receive), gate pass,
 *                               asset custody, movement ledger
 *   HRMS         hrms-ui        — Attendance Ledger, Leave Application,
 *                               Bonus Ledger, Holidays, Designations
 *   Engispider Retail    retail360-web  — dynamic category-driven item master,
 *                               batches, adjustments, AR/AP ageing
 *
 * Built in HTML/CSS rather than exported images: text stays crisp at any
 * density, each costs ~2KB instead of ~150KB, there is no network request or
 * layout shift, and no screenshot to go stale when a product UI changes.
 *
 * All are server components with no state, so they add zero client JS, and
 * all are aria-hidden — they illustrate claims made in real text beside them.
 *
 * The figures are illustrative sample data for a demo tenant, chosen to look
 * like a plausible working day. They assert nothing about any customer.
 */

/* ===================================================== shared app chrome */

export function AppShell({
  product,
  module,
  nav,
  activeNav = 0,
  badge,
  children,
}: {
  product: string;
  module: string;
  nav: string[];
  activeNav?: number;
  badge?: { label: string; tone?: 'live' | 'warn' };
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className="flex overflow-hidden rounded-lg border border-hairline bg-white shadow-[0_18px_50px_-28px_rgba(10,15,26,0.3)]"
    >
      {/* sidebar — real module names from the product */}
      <aside className="hidden w-[126px] shrink-0 border-r border-hairline bg-band/70 p-2 sm:block">
        <div className="mono px-1.5 pb-2 text-[0.5rem] text-faint">{product}</div>
        <ul className="space-y-[1px]">
          {nav.map((n, i) => (
            <li key={n}>
              <span
                className={`flex items-center gap-1.5 rounded-sm px-1.5 py-[5px] text-[0.64rem] leading-tight ${
                  i === activeNav
                    ? 'bg-white font-medium text-ink shadow-sm'
                    : 'text-muted'
                }`}
              >
                <span
                  className={`h-1 w-1 shrink-0 rounded-full ${
                    i === activeNav ? 'bg-accent-500' : 'bg-hairline-strong'
                  }`}
                />
                {n}
              </span>
            </li>
          ))}
        </ul>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2 border-b border-hairline px-3 py-2">
          <span className="mono text-[0.56rem] text-ink">{module}</span>
          {badge && (
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-hairline px-1.5 py-0.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  badge.tone === 'warn' ? 'bg-accent-500' : 'bg-emerald-500'
                }`}
              />
              <span className="mono text-[0.5rem] text-muted">{badge.label}</span>
            </span>
          )}
        </div>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}

export function Kpis({ items }: { items: [string, string, string?][] }) {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {items.map(([label, value, delta], i) => (
        <div
          key={label}
          className={`rounded-sm border p-2 ${
            i === 0 ? 'border-accent-200 bg-accent-50' : 'border-hairline'
          }`}
        >
          <div className="mono truncate text-[0.46rem] text-faint">{label}</div>
          <div
            className={`mono-num mt-1 text-[0.8rem] font-bold leading-none ${
              i === 0 ? 'text-accent-800' : 'text-ink'
            }`}
          >
            {value}
          </div>
          {delta && (
            <div className="mono-num mt-1 text-[0.5rem] text-emerald-600">{delta}</div>
          )}
        </div>
      ))}
    </div>
  );
}

const TONE: Record<string, string> = {
  ok: 'bg-emerald-50 text-emerald-700',
  warn: 'bg-accent-100 text-accent-800',
  flat: 'bg-well text-muted',
};

export function Table({
  cols,
  rows,
}: {
  cols: string[];
  rows: { cells: string[]; status: string; tone: keyof typeof TONE }[];
}) {
  return (
    <div className="overflow-hidden rounded-sm border border-hairline">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-hairline bg-band/70">
            {cols.map((c) => (
              <th
                key={c}
                className="mono px-2 py-1 text-left text-[0.46rem] font-medium text-faint"
              >
                {c}
              </th>
            ))}
            <th className="px-2 py-1" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-hairline last:border-0">
              {r.cells.map((cell, j) => (
                <td
                  key={j}
                  className={`px-2 py-[5px] text-[0.64rem] ${
                    j === 0
                      ? 'font-medium text-ink'
                      : /^[₹\d]/.test(cell)
                        ? 'mono-num text-ink'
                        : 'text-body'
                  }`}
                >
                  {cell}
                </td>
              ))}
              <td className="px-2 py-[5px] text-right">
                <span
                  className={`mono rounded-xs px-1.5 py-0.5 text-[0.46rem] ${TONE[r.tone]}`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============================================================ restaurants */

export function RestaurantScreen() {
  return (
    <AppShell
      product="Engispider Restro"
      module="Dashboard"
      badge={{ label: 'Live' }}
      nav={['Dashboard', 'Orders', 'Kitchen Display', 'Items', 'Inventory', 'Expenses', 'Customers']}
    >
      <Kpis
        items={[
          ['Net Revenue', '₹48,250', '+12.4%'],
          ['Total Orders', '142'],
          ['Avg Order', '₹340'],
          ['Tax Collected', '₹2,412'],
        ]}
      />

      {/* Table floor — Available / Occupied / Reserved, as in the product */}
      <div className="mt-2.5 rounded-sm border border-hairline p-2">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="mono text-[0.46rem] text-faint">Tables in use</span>
          <span className="flex gap-2">
            {[
              ['Occupied', 'bg-accent-500'],
              ['Reserved', 'bg-accent-200'],
              ['Available', 'bg-well'],
            ].map(([l, c]) => (
              <span key={l} className="flex items-center gap-1">
                <span className={`h-1.5 w-1.5 rounded-[1px] ${c}`} />
                <span className="mono text-[0.42rem] text-faint">{l}</span>
              </span>
            ))}
          </span>
        </div>
        <div className="grid grid-cols-12 gap-[3px]">
          {Array.from({ length: 24 }, (_, i) => (
            <div
              key={i}
              className={`rounded-[2px] py-[3px] text-center ${
                [1, 4, 5, 9, 12, 17, 20].includes(i)
                  ? 'bg-accent-500'
                  : [2, 7, 15].includes(i)
                    ? 'bg-accent-200'
                    : 'bg-well'
              }`}
            >
              <span className="mono text-[0.38rem] text-ink/70">T{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2.5">
        <Table
          cols={['Order', 'Table', 'Items', 'Total']}
          rows={[
            { cells: ['#4821', 'T-07', '4', '₹1,240'], status: 'PAID', tone: 'ok' },
            { cells: ['#4822', 'QR-12', '2', '₹480'], status: 'READY', tone: 'warn' },
            { cells: ['#4823', 'T-02', '6', '₹2,180'], status: 'PENDING', tone: 'flat' },
          ]}
        />
      </div>
    </AppShell>
  );
}

/* ============================================================== education */

export function CampusScreen() {
  return (
    <AppShell
      product="Engispider Campus"
      module="Fees · Receipt approvals"
      badge={{ label: '6 pending', tone: 'warn' }}
      nav={['Dashboard', 'Admissions', 'Fee Plans', 'Outstanding', 'Receipt Approvals', 'Day Book', 'Examinations']}
      activeNav={4}
    >
      <Kpis
        items={[
          ['Collected today', '₹2,84,500'],
          ['Receipts', '63'],
          ['Outstanding', '₹11.4L'],
          ['Refunds', '2'],
        ]}
      />

      <div className="mt-2.5 rounded-sm border border-hairline p-2">
        <div className="flex items-center justify-between">
          <span className="mono text-[0.46rem] text-faint">Collection vs target</span>
          <span className="mono-num text-[0.5rem] text-muted">₹3.9L target</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-well">
          <div className="h-full w-[72%] rounded-full bg-accent-500" />
        </div>
        <div className="mono-num mt-1 text-[0.5rem] text-accent-700">72%</div>
      </div>

      <div className="mt-2.5">
        <Table
          cols={['Student', 'Course · Year', 'Head', 'Amount']}
          rows={[
            { cells: ['A. Mohanty', 'B.Pharm · 2', 'Tuition', '₹18,000'], status: 'APPROVED', tone: 'ok' },
            { cells: ['S. Behera', 'Nursing · 1', 'Hostel', '₹22,500'], status: 'PENDING', tone: 'warn' },
            { cells: ['R. Das', 'Polytechnic · 3', 'Tuition', '₹15,750'], status: 'PARTIAL', tone: 'flat' },
          ]}
        />
      </div>
    </AppShell>
  );
}

/* =========================================================== laboratories */

export function LabScreen() {
  return (
    <AppShell
      product="Engispider LIMS"
      module="Samples · Register"
      badge={{ label: '24 in test', tone: 'warn' }}
      nav={['Dashboard', 'Work Orders', 'Sample Inward', 'Job Cards', 'Equipment', 'Test Reports', 'Invoicing']}
      activeNav={2}
    >
      <Kpis
        items={[
          ['In testing', '24'],
          ['Due today', '6'],
          ['Open work orders', '11'],
          ['Awaiting report', '8'],
        ]}
      />

      <div className="mt-2.5">
        <Table
          cols={['Sample ID', 'Material', 'Tests', 'Work order']}
          rows={[
            { cells: ['MTSPL-2291', 'Mild steel', '4', 'WO-0418'], status: 'TESTING', tone: 'warn' },
            { cells: ['MTSPL-2292', 'Cement OPC-53', '3', 'WO-0416'], status: 'TESTED', tone: 'ok' },
            { cells: ['MTSPL-2293', 'Soil', '7', 'WO-0419'], status: 'IN_PREP', tone: 'flat' },
            { cells: ['MTSPL-2294', 'Water', '2', 'WO-0420'], status: 'QUEUED', tone: 'flat' },
          ]}
        />
      </div>

      {/* Equipment scheduling — IDLE / RUNNING / MAINTENANCE in the product */}
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {[
          ['UTM-04', 'RUNNING', 'bg-accent-100 text-accent-800'],
          ['SPECTRO-01', 'IDLE', 'bg-well text-muted'],
          ['HARDNESS-02', 'MAINT.', 'bg-well text-muted'],
        ].map(([id, st, cls]) => (
          <div key={id} className="rounded-sm border border-hairline px-2 py-1.5">
            <div className="mono text-[0.46rem] text-faint">{id}</div>
            <div className={`mono mt-1 inline-block rounded-xs px-1.5 py-0.5 text-[0.46rem] ${cls}`}>
              {st}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

/* ================================================================ pharmacy */

export function PharmacyScreen() {
  return (
    <AppShell
      product="Engispider Pharmacy"
      module="Billing · New sale"
      badge={{ label: '3 expiring', tone: 'warn' }}
      nav={['Dashboard', 'Billing', 'Prescriptions', 'Drug Master', 'Batches', 'Expiry Alerts', 'Reports']}
      activeNav={1}
    >
      <Kpis
        items={[
          ['Bill total', '₹1,845'],
          ['CGST + SGST', '₹142'],
          ['Items', '13'],
          ['Today', '₹38,410'],
        ]}
      />

      <div className="mt-2.5">
        <Table
          cols={['Medicine', 'Batch', 'Qty', 'Amount']}
          rows={[
            { cells: ['Azithral 500', 'B-2291', '2', '₹196'], status: 'EXP 11/27', tone: 'ok' },
            { cells: ['Dolo 650', 'B-1180', '10', '₹310'], status: 'EXP 04/28', tone: 'ok' },
            { cells: ['Pan-D 40', 'B-7741', '1', '₹148'], status: 'EXP 02/26', tone: 'warn' },
          ]}
        />
      </div>

      <div className="mt-2.5 flex items-center gap-2 rounded-sm border border-accent-200 bg-accent-50 px-2 py-1.5">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
        <span className="mono text-[0.5rem] text-accent-800">
          3 batches expire within 90 days · reorder 7 items
        </span>
      </div>
    </AppShell>
  );
}

/* ================================================================== retail */

export function RetailScreen() {
  return (
    <AppShell
      product="Engispider Retail"
      module="Item master · Apparel"
      badge={{ label: '17 low', tone: 'warn' }}
      nav={['Dashboard', 'Item Master', 'Categories', 'Billing', 'Stock Adjust', 'AR / AP Ageing', 'Accounting']}
      activeNav={1}
    >
      <Kpis
        items={[
          ['SKUs', '1,284'],
          ['Below reorder', '17'],
          ['Stock value', '₹18.4L'],
          ['Categories', '9'],
        ]}
      />

      {/* The item master renders from the selected category's config */}
      <div className="mt-2.5 flex flex-wrap gap-1">
        {['Apparel', 'Grocery', 'Electronics', 'Home', 'Footwear'].map((c, i) => (
          <span
            key={c}
            className={`mono rounded-xs px-1.5 py-0.5 text-[0.48rem] ${
              i === 0 ? 'bg-accent-500 text-ink' : 'bg-well text-muted'
            }`}
          >
            {c}
          </span>
        ))}
        <span className="mono rounded-xs border border-dashed border-hairline-strong px-1.5 py-0.5 text-[0.48rem] text-faint">
          + category
        </span>
      </div>

      <div className="mt-2.5">
        <Table
          cols={['Item', 'Variant', 'Stock', 'MRP']}
          rows={[
            { cells: ['Cotton shirt', 'M · Blue', '42', '₹1,299'], status: 'IN STOCK', tone: 'ok' },
            { cells: ['Cotton shirt', 'L · Blue', '6', '₹1,299'], status: 'LOW', tone: 'warn' },
            { cells: ['Denim jacket', 'M · Indigo', '18', '₹2,499'], status: 'IN STOCK', tone: 'ok' },
          ]}
        />
      </div>
    </AppShell>
  );
}

/* ========================================================= sites / plants */

export function SiteScreen() {
  return (
    <AppShell
      product="Engispider Site Manager"
      module="Stock · Movement ledger"
      badge={{ label: '2 in transit', tone: 'warn' }}
      nav={['Dashboard', 'Sites', 'Stock Ledger', 'GRN', 'Transfers', 'Asset Register', 'Gate Pass']}
      activeNav={2}
    >
      <Kpis
        items={[
          ['Active sites', '6'],
          ['Open GRNs', '4'],
          ['Assets tagged', '318'],
          ['Low stock', '11'],
        ]}
      />

      <div className="mt-2.5">
        <Table
          cols={['Item', 'Site', 'Qty', 'Ref']}
          rows={[
            { cells: ['Cement OPC-53', 'Site A', '240 bags', 'GRN-1142'], status: 'RECEIVED', tone: 'ok' },
            { cells: ['TMT 12mm', 'Site C', '4.2 t', 'ISS-0391'], status: 'ISSUED', tone: 'flat' },
            { cells: ['Scaffold set', 'B → D', '30', 'TRF-0088'], status: 'IN TRANSIT', tone: 'warn' },
          ]}
        />
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
        <div className="rounded-sm border border-hairline px-2 py-1.5">
          <div className="mono text-[0.46rem] text-faint">Gate pass · returnable</div>
          <div className="mono-num mt-1 text-[0.7rem] font-bold text-ink">3 open</div>
        </div>
        <div className="rounded-sm border border-accent-200 bg-accent-50 px-2 py-1.5">
          <div className="mono text-[0.46rem] text-accent-700">Preventive maintenance</div>
          <div className="mono-num mt-1 text-[0.7rem] font-bold text-accent-800">2 due</div>
        </div>
      </div>
    </AppShell>
  );
}

/* ================================================================= clinics */

export function ClinicScreen() {
  return (
    <AppShell
      product="Engispider Clinic"
      module="Appointments · Today"
      badge={{ label: '4 waiting', tone: 'warn' }}
      nav={['Dashboard', 'Appointments', 'Patients', 'Consultations', 'Billing', 'Reports']}
      activeNav={1}
    >
      <Kpis
        items={[
          ['Appointments', '18'],
          ['Waiting', '4'],
          ['Completed', '11'],
          ['Collected', '₹14,200'],
        ]}
      />

      <div className="mt-2.5">
        <Table
          cols={['Time', 'Patient', 'Doctor', 'Type']}
          rows={[
            { cells: ['09:30', 'P-1042', 'Dr. Rao', 'Follow-up'], status: 'DONE', tone: 'ok' },
            { cells: ['10:00', 'P-1108', 'Dr. Rao', 'New'], status: 'IN ROOM', tone: 'warn' },
            { cells: ['10:30', 'P-0977', 'Dr. Sahu', 'Review'], status: 'WAITING', tone: 'flat' },
            { cells: ['11:00', 'P-1121', 'Dr. Sahu', 'Follow-up'], status: 'WAITING', tone: 'flat' },
          ]}
        />
      </div>
    </AppShell>
  );
}

/* ==================================================================== HRMS */

export function HrmsScreen() {
  return (
    <AppShell
      product="Engispider HRMS"
      module="Attendance ledger"
      badge={{ label: 'Synced 11:40' }}
      nav={['Dashboard', 'Employees', 'Attendance Ledger', 'Leave', 'Payroll', 'Bonus Ledger', 'Holidays']}
      activeNav={2}
    >
      <Kpis
        items={[
          ['Present', '142 / 156'],
          ['On leave', '9'],
          ['Late marks', '5'],
          ['Payroll', '₹18.4L'],
        ]}
      />

      <div className="mt-2.5 rounded-sm border border-hairline p-2">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="mono text-[0.46rem] text-faint">Attendance · last 12 working days</span>
          <span className="mono-num text-[0.46rem] text-muted">avg 91%</span>
        </div>
        <div className="flex h-11 items-end gap-[3px]">
          {[70, 82, 78, 91, 88, 94, 86, 90, 76, 84, 92, 89].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-[1px] ${i === 5 ? 'bg-accent-500' : 'bg-well'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-2.5">
        <Table
          cols={['Employee', 'Dept', 'In', 'Hours']}
          rows={[
            { cells: ['EMP-0142', 'Engineering', '09:12', '8.4'], status: 'PRESENT', tone: 'ok' },
            { cells: ['EMP-0088', 'Accounts', '—', '0.0'], status: 'LEAVE', tone: 'warn' },
            { cells: ['EMP-0231', 'Support', '10:05', '7.1'], status: 'LATE', tone: 'flat' },
          ]}
        />
      </div>
    </AppShell>
  );
}
