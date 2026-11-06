'use client';

import { useRef, useState } from 'react';
import { ArrowRight, Check, Loader2, Phone } from 'lucide-react';

import { submitContact } from '@/lib/contactApi';
import { track } from '@/lib/analytics';
import { COMPANY } from '@/data/company';
import {
  INSTITUTION_TYPE_OPTIONS,
  STUDENT_COUNT_OPTIONS,
} from '@/components/solutions/campus/content';

/**
 * The demo request form — the one conversion on this page.
 *
 * ── It posts to the real CRM ─────────────────────────────────────────────
 * `lib/contactApi.submitContact` is the same unauthenticated public endpoint
 * the /contact page has always used, with the same siteKey, reaching the
 * same inbox. No new endpoint was invented and nothing was swapped for a
 * frontend-only fake: the site is a static export, so there is no server of
 * ours in the path at all.
 *
 * ── Why the message body repeats the structured fields ───────────────────
 * The API's typed shape (name, email, mobile, company, subject, message,
 * extraFields) has no slot for an institution type, a district or a student
 * count. They go in `extraFields`, and they are ALSO written into `message`
 * as a readable block. If the CRM does not surface extraFields on the
 * enquiry screen, the person reading it still sees everything the enquirer
 * typed — a silently dropped field is worse than a slightly repetitive one.
 *
 * ── Never claim a booking that did not happen ────────────────────────────
 * The success panel renders only after the endpoint resolves successfully,
 * and it says a demo will be arranged, not that one is booked — nothing on
 * this page confirms a slot, because nothing here can.
 *
 * ── Validation ───────────────────────────────────────────────────────────
 * Checked on submit and then live per field once that field has been
 * touched, which is the pattern that does not shout at someone halfway
 * through typing their phone number. The first invalid control takes focus,
 * so a keyboard user is put where the problem is.
 */

type Fields = {
  name: string;
  institution: string;
  institutionType: string;
  city: string;
  phone: string;
  email: string;
  students: string;
  requirement: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; message: string }
  | { kind: 'error'; message: string };

const EMPTY: Fields = {
  name: '',
  institution: '',
  institutionType: '',
  city: '',
  phone: '',
  email: '',
  students: '',
  requirement: '',
};

/** Indian mobile numbers, with or without a country code or separators. */
const digitsOf = (s: string) => s.replace(/[^\d]/g, '');

function validate(f: Fields): Errors {
  const e: Errors = {};

  if (!f.name.trim()) e.name = 'Please tell us your name.';
  if (!f.institution.trim()) e.institution = 'Please enter the institution name.';
  if (!f.institutionType) e.institutionType = 'Please choose the closest match.';
  if (!f.city.trim()) e.city = 'Please enter your city or district.';

  const digits = digitsOf(f.phone);
  if (!digits) e.phone = 'A phone number is how we arrange the demo.';
  else if (digits.length < 10 || digits.length > 13)
    e.phone = 'That does not look like a complete phone number.';

  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    e.email = 'Check the email address — or leave it blank, it is optional.';

  return e;
}

/** The readable block that lands in the CRM's message field. */
function composeMessage(f: Fields) {
  return [
    'Demo request — Engispider Campus (school & college ERP)',
    '',
    `Institution:        ${f.institution.trim()}`,
    `Type:               ${f.institutionType}`,
    `City / district:    ${f.city.trim()}`,
    `Approx. students:   ${f.students || 'Not stated'}`,
    `Contact:            ${f.name.trim()}`,
    `Phone:              ${f.phone.trim()}`,
    `Email:              ${f.email.trim() || 'Not provided'}`,
    '',
    'Main requirement:',
    f.requirement.trim() || 'Not stated.',
    '',
    'Sent from the Engispider Campus page (/solutions/education/).',
  ].join('\n');
}

export default function DemoForm() {
  const [form, setForm] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const formRef = useRef<HTMLFormElement>(null);

  const set = (key: keyof Fields) => (value: string) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (touched[key]) setErrors(validate(next));
  };

  const blur = (key: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(form));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status.kind === 'sending') return;

    const found = validate(form);
    setErrors(found);
    setTouched({
      name: true,
      institution: true,
      institutionType: true,
      city: true,
      phone: true,
      email: true,
    });

    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstBad}"]`)
        ?.focus();
      return;
    }

    setStatus({ kind: 'sending' });
    track('campus_demo_submit', { institutionType: form.institutionType });

    try {
      const res = await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.phone.trim(),
        company: form.institution.trim(),
        subject: 'Demo request — Engispider Campus',
        message: composeMessage(form),
        extraFields: {
          product: 'Engispider Campus',
          institutionType: form.institutionType,
          city: form.city.trim(),
          approxStudents: form.students,
          requirement: form.requirement.trim(),
        },
      });

      track('campus_demo_success', { institutionType: form.institutionType });
      setStatus({
        kind: 'sent',
        message:
          res?.message ||
          'Your request is with our team. Someone will call or write — usually within one working day — to agree a time.',
      });
      setForm(EMPTY);
      setTouched({});
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'We could not send that. Please try again, or call us on the number below.';
      track('campus_demo_error', { reason: message.slice(0, 80) });
      // Deliberately keeps everything typed — a failed send must not erase it.
      setStatus({ kind: 'error', message });
    }
  }

  /* -------------------------------------------------------------- success */

  if (status.kind === 'sent') {
    return (
      <div
        className="rounded-lg border border-emerald-200 bg-emerald-50 p-7 sm:p-9"
        role="status"
        aria-live="polite"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-600">
          <Check className="h-5 w-5 text-white" aria-hidden />
        </span>
        <h3 className="font-display mt-5 text-f-xl font-bold text-emerald-950">
          Request received.
        </h3>
        <p className="mt-3 max-w-xl leading-relaxed text-emerald-900">{status.message}</p>
        <ul className="mt-5 space-y-2 text-f-xs leading-relaxed text-emerald-900">
          <li>· We read what you sent and come back to agree a time that suits your office.</li>
          <li>· The demo runs on a live system — bring your fee structure or a report you struggle with.</li>
          <li>· Nothing is booked yet: the time is fixed in that conversation, not here.</li>
        </ul>
        <a
          href={`tel:${COMPANY.contact.sales.tel}`}
          className="link-arrow mt-6 text-emerald-900"
        >
          <Phone className="h-4 w-4" aria-hidden /> Or call {COMPANY.contact.sales.display}
        </a>
      </div>
    );
  }

  /* ----------------------------------------------------------------- form */

  const sending = status.kind === 'sending';

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-busy={sending}
      className="rounded-lg border border-hairline bg-canvas p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Your name"
          name="name"
          value={form.name}
          onChange={set('name')}
          onBlur={blur('name')}
          error={touched.name ? errors.name : undefined}
          placeholder="Full name"
          autoComplete="name"
          required
        />
        <Field
          label="Institution name"
          name="institution"
          value={form.institution}
          onChange={set('institution')}
          onBlur={blur('institution')}
          error={touched.institution ? errors.institution : undefined}
          placeholder="As it appears on your letterhead"
          autoComplete="organization"
          required
        />
        <Select
          label="Institution type"
          name="institutionType"
          value={form.institutionType}
          onChange={set('institutionType')}
          onBlur={blur('institutionType')}
          error={touched.institutionType ? errors.institutionType : undefined}
          placeholder="Choose the closest match"
          options={INSTITUTION_TYPE_OPTIONS}
          required
        />
        <Field
          label="City or district"
          name="city"
          value={form.city}
          onChange={set('city')}
          onBlur={blur('city')}
          error={touched.city ? errors.city : undefined}
          placeholder="Bhubaneswar, Cuttack, Balasore…"
          autoComplete="address-level2"
          required
        />
        <Field
          label="Phone number"
          name="phone"
          type="tel"
          inputMode="tel"
          value={form.phone}
          onChange={set('phone')}
          onBlur={blur('phone')}
          error={touched.phone ? errors.phone : undefined}
          placeholder="+91 00000 00000"
          autoComplete="tel"
          required
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          inputMode="email"
          value={form.email}
          onChange={set('email')}
          onBlur={blur('email')}
          error={touched.email ? errors.email : undefined}
          placeholder="office@institution.ac.in"
          autoComplete="email"
          hint="Optional"
        />
        <Select
          label="Approximate students"
          name="students"
          value={form.students}
          onChange={set('students')}
          onBlur={blur('students')}
          placeholder="Select a range"
          options={STUDENT_COUNT_OPTIONS}
          hint="Optional"
        />
        <div className="sm:col-span-2">
          <Field
            label="What would you like to see?"
            name="requirement"
            value={form.requirement}
            onChange={set('requirement')}
            onBlur={blur('requirement')}
            placeholder="Your fee structure, a report you struggle to produce, how approvals should work — anything specific helps us prepare."
            hint="Optional"
            textarea
          />
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={sending}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Request a demo <ArrowRight className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
        <a href={`tel:${COMPANY.contact.sales.tel}`} className="btn btn-line">
          <Phone className="h-4 w-4" aria-hidden /> {COMPANY.contact.sales.display}
        </a>
      </div>

      <p className="mt-4 text-f-2xs leading-relaxed text-muted">
        We use this only to arrange your demo. No newsletter, no list, and no
        third-party marketing. Support and sales hours are {COMPANY.hoursDisplay}.
      </p>

      <div aria-live="polite" className="empty:hidden">
        {status.kind === 'error' && (
          <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-f-xs leading-relaxed text-red-900">
            {status.message} You can also call{' '}
            <a href={`tel:${COMPANY.contact.sales.tel}`} className="font-semibold underline">
              {COMPANY.contact.sales.display}
            </a>{' '}
            or write to{' '}
            <a href={`mailto:${COMPANY.contact.email}`} className="font-semibold underline">
              {COMPANY.contact.email}
            </a>
            . Nothing you typed has been lost.
          </p>
        )}
        {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
          <p className="sr-only">
            {Object.keys(errors).length} field
            {Object.keys(errors).length === 1 ? '' : 's'} need attention before this can be sent.
          </p>
        )}
      </div>
    </form>
  );
}

/* ================================================================== fields */

const CONTROL =
  'mt-2 w-full rounded-lg border bg-canvas px-4 py-3 text-f-xs text-ink outline-none transition-colors placeholder:text-faint focus:ring-2 focus:ring-accent-200';

function Label({
  htmlFor,
  children,
  required,
  hint,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mono flex items-baseline gap-2 text-faint">
      <span>
        {children}
        {required && <span className="text-accent-700"> *</span>}
      </span>
      {hint && <span className="text-[0.9em] normal-case tracking-normal">{hint}</span>}
    </label>
  );
}

function ErrorLine({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-f-2xs font-medium text-red-700">
      {message}
    </p>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = 'text',
  inputMode,
  autoComplete,
  required = false,
  textarea = false,
  hint,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  placeholder?: string;
  type?: string;
  inputMode?: 'tel' | 'email' | 'text';
  autoComplete?: string;
  required?: boolean;
  textarea?: boolean;
  hint?: string;
}) {
  const id = `demo-${name}`;
  const errorId = `${id}-error`;
  const border = error ? 'border-red-400 focus:border-red-500' : 'border-hairline focus:border-accent-400';

  return (
    <div className="min-w-0">
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={4}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${CONTROL} ${border} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${CONTROL} ${border}`}
        />
      )}
      <ErrorLine id={errorId} message={error} />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  options,
  required = false,
  hint,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  placeholder: string;
  options: readonly string[];
  required?: boolean;
  hint?: string;
}) {
  const id = `demo-${name}`;
  const errorId = `${id}-error`;
  const border = error ? 'border-red-400 focus:border-red-500' : 'border-hairline focus:border-accent-400';

  return (
    <div className="min-w-0">
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${CONTROL} ${border} ${value ? 'text-ink' : 'text-faint'} appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ErrorLine id={errorId} message={error} />
    </div>
  );
}
