import { AppShell, Kpis, Table } from '@/components/home/Screens';

/**
 * Product screens for catalogue entries that have no industry card on the
 * homepage deck.
 *
 * Same rules as components/home/Screens.tsx: modelled on the real products
 * rather than invented, built in HTML/CSS so the labels stay crisp and cost
 * ~2KB instead of a screenshot, server components with no client JS, and
 * aria-hidden because every claim they illustrate is made in real text beside
 * them. Figures are illustrative demo-tenant data and assert nothing about
 * any customer.
 *
 * Nothing is drawn for the two draft products. Engispider Monitoring has no
 * confirmed specification, and a convincing dashboard is exactly the kind of
 * thing that becomes a promise once it is on the page.
 */

/* ============================================================= comms hub */

/**
 * Engispider Comms.
 *
 * Modelled on the service's documented surface: tenants, a provider registry,
 * the template catalogue, the outbox with its exponential-backoff dispatcher
 * and delivery-receipt webhooks flipping rows to DELIVERED / FAILED. The
 * attempt column is the point of the product — a message that failed once and
 * delivered on retry is the case a hand-rolled integration loses silently.
 */
export function CommsScreen() {
  return (
    <AppShell
      product="Engispider Comms"
      module="Outbox · Dispatcher"
      badge={{ label: 'dispatching', tone: 'live' }}
      nav={['Dashboard', 'Tenants', 'Providers', 'Templates', 'Outbox', 'Delivery Logs', 'Quotas']}
      activeNav={4}
    >
      <Kpis
        items={[
          ['Queued', '18'],
          ['Sent today', '4,112'],
          ['Delivered', '4,061'],
          ['Failed', '12'],
        ]}
      />

      <div className="mt-2.5">
        <Table
          cols={['Recipient', 'Channel', 'Template', 'Attempt']}
          rows={[
            { cells: ['+91 98••• ••214', 'WhatsApp', 'FEE_RECEIPT', '1'], status: 'DELIVERED', tone: 'ok' },
            { cells: ['+91 94••• ••708', 'SMS', 'OTP_LOGIN', '2'], status: 'DELIVERED', tone: 'ok' },
            { cells: ['accounts@…', 'Email', 'INVOICE_PDF', '1'], status: 'SENT', tone: 'flat' },
            { cells: ['+91 77••• ••330', 'WhatsApp', 'ORDER_BILL', '3'], status: 'RETRYING', tone: 'warn' },
          ]}
        />
      </div>

      {/* Provider registry — swapping one is configuration here, not a change
          in any of the applications calling the hub. */}
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {[
          ['WHATSAPP', 'Meta Cloud API'],
          ['SMS', 'Gateway A'],
          ['EMAIL', 'SMTP relay'],
        ].map(([channel, provider]) => (
          <div key={channel} className="rounded-sm border border-hairline px-2 py-1.5">
            <div className="mono text-[0.46rem] text-faint">{channel}</div>
            <div className="mt-1 truncate text-[0.6rem] font-medium text-ink">{provider}</div>
            <div className="mono mt-1 inline-block rounded-xs bg-emerald-50 px-1.5 py-0.5 text-[0.46rem] text-emerald-700">
              ACTIVE
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

/* ====================================================== face recognition */

/**
 * Engispider Face Attendance.
 *
 * Split deliberately: the left pane is what a member of staff sees at the
 * kiosk, the right is what the administrator sees in the same second. That
 * pairing is the product — a glance at a screen on one side, a written
 * attendance row on the other.
 *
 * The camera view is an abstract silhouette inside a detection frame, not a
 * photograph of anyone. Cosine similarity and the liveness verdict are the
 * two values the system actually decides on, so they are the two shown.
 */
export function FaceScreen() {
  return (
    <AppShell
      product="Engispider Face Attendance"
      module="Kiosk · Live"
      badge={{ label: 'camera live', tone: 'live' }}
      nav={['Dashboard', 'Employees', 'Enrolment', 'Kiosk', 'Attendance', 'Devices', 'Settings']}
      activeNav={3}
    >
      <div className="grid gap-1.5 sm:grid-cols-[1.05fr_1fr]">
        {/* Kiosk camera view */}
        <div className="overflow-hidden rounded-sm border border-hairline bg-well">
          <div className="relative aspect-[4/3] w-full">
            {/* A shape, not a person. */}
            <svg
              viewBox="0 0 120 90"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <rect width="120" height="90" fill="#EFF3F8" />
              <circle cx="60" cy="38" r="15" fill="#CBD5E1" />
              <path d="M30 90c0-17 13-28 30-28s30 11 30 28z" fill="#CBD5E1" />
            </svg>

            {/* Detection frame */}
            <div className="absolute left-[28%] top-[14%] h-[58%] w-[44%]">
              <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-accent-500" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-accent-500" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-accent-500" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-accent-500" />
            </div>

            <span className="mono absolute left-1.5 top-1.5 rounded-xs bg-ink/80 px-1.5 py-0.5 text-[0.46rem] text-white">
              CAM 01
            </span>
          </div>

          <div className="border-t border-hairline bg-white px-2 py-1.5">
            <div className="text-[0.68rem] font-bold leading-tight text-ink">
              Matched · Employee #1184
            </div>
            <div className="mono mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.46rem] text-faint">
              <span className="rounded-xs bg-emerald-50 px-1.5 py-0.5 text-emerald-700">
                LIVENESS PASS
              </span>
              <span className="rounded-xs bg-accent-100 px-1.5 py-0.5 text-accent-800">
                COSINE 0.71
              </span>
              <span>IN · 09:04</span>
            </div>
          </div>
        </div>

        {/* The administrator's view of the same moment */}
        <div className="min-w-0">
          <div className="grid grid-cols-2 gap-1.5">
            {[
              ['Marked today', '248'],
              ['Enrolled', '312'],
            ].map(([label, value], i) => (
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
              </div>
            ))}
          </div>

          <div className="mt-1.5 overflow-hidden rounded-sm border border-hairline">
            <div className="mono border-b border-hairline bg-band/70 px-2 py-1 text-[0.46rem] text-faint">
              RECOGNITIONS · LAST 5 MIN
            </div>
            <ul>
              {[
                ['#1184', '09:04'],
                ['#0921', '09:03'],
                ['#1402', '09:03'],
                ['#0657', '09:02'],
                ['#1130', '09:01'],
              ].map(([id, time]) => (
                <li
                  key={id}
                  className="flex items-center justify-between border-b border-hairline px-2 py-[5px] last:border-0"
                >
                  <span className="mono-num text-[0.64rem] font-medium text-ink">{id}</span>
                  <span className="mono-num text-[0.6rem] text-body">{time}</span>
                  <span className="mono rounded-xs bg-emerald-50 px-1.5 py-0.5 text-[0.46rem] text-emerald-700">
                    IN
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
