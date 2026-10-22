'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Clock, Mail, MapPin, Phone, Loader2 } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SectionBackdrop from '@/components/SectionBackdrop';
import { Reveal, MaskText } from '@/components/motion/Reveal';
import { submitContact } from '@/lib/contactApi';
import { COMPANY } from '@/data/company';
import { PRODUCTS } from '@/data/products';

/**
 * Contact.
 *
 * The form posts to the live CRM public endpoint (lib/contactApi) with the
 * same field mapping as before — name, email, mobile, company, message.
 * That part is untouched on purpose: it is wired to a real inbox.
 *
 * ── What changed ─────────────────────────────────────────────────────────
 *  · Light, in the site's own type, with the shared hero.
 *  · No `alert()`. Success and failure are rendered inline, where the
 *    person is already looking, and the form keeps what they typed when a
 *    send fails — the old version threw a browser dialog and, on error,
 *    left them re-reading a modal instead of their own words.
 *  · A real submitting state. The button was previously clickable during
 *    the request, so a slow network produced duplicate enquiries.
 *  · Labels are real <label> elements tied to inputs, and the status
 *    message is a live region, so a screen reader is told what happened.
 */

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; message: string }
  | { kind: 'error'; message: string };

const EMPTY = { name: '', email: '', phone: '', company: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status.kind === 'sending') return;
    setStatus({ kind: 'sending' });

    try {
      const res = await submitContact({
        name: form.name,
        email: form.email,
        mobile: form.phone,
        company: form.company,
        message: form.message,
      });
      setStatus({
        kind: 'sent',
        message: res?.message || 'Thanks — your message is with us. We usually reply within one working day.',
      });
      // Only clear on success. A failed send must not eat what they wrote.
      setForm(EMPTY);
    } catch (err) {
      setStatus({
        kind: 'error',
        message:
          err instanceof Error
            ? err.message
            : 'Could not send your message. Please try again, or call us on the number below.',
      });
    }
  }

  return (
    <>
      <Header />

      <main id="main">
        <PageHero
          marker="Contact"
          title="Tell us what breaks."
          lede="A guided demo on a live system using your own scenarios, or a scoping conversation if none of the products fit. Either way you will speak to someone who builds the software, not a call centre."
          spec={[
            ['Response', 'Usually within one working day'],
            ['Demo', 'Usually within two working days'],
            ['Hours', COMPANY.hoursDisplay],
          ]}
        />

        <section className="section relative">
          <SectionBackdrop side="right" tone="warm" />
          <div className="container-page">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
              {/* ------------------------------------------------ form --- */}
              <div className="lg:col-span-7">
                <p className="marker mono">Send a message</p>
                <MaskText as="h2" className="display mt-5 text-f-4xl">
                  <>Start a</>
                  <>
                    <span className="accent-word">conversation</span>.
                  </>
                </MaskText>

                <Reveal delay={120}>
                  <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate={false}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Your name"
                        name="name"
                        value={form.name}
                        onChange={change}
                        placeholder="Rahul Nayak"
                        required
                        autoComplete="name"
                      />
                      <Field
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={change}
                        placeholder="you@company.com"
                        required
                        autoComplete="email"
                      />
                      <Field
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={change}
                        placeholder="+91 00000 00000"
                        autoComplete="tel"
                      />
                      <Field
                        label="Organisation"
                        name="company"
                        value={form.company}
                        onChange={change}
                        placeholder="Your restaurant, college or company"
                        autoComplete="organization"
                      />
                    </div>

                    <Field
                      label="What are you trying to solve?"
                      name="message"
                      value={form.message}
                      onChange={change}
                      placeholder="What you run today, and what goes wrong with it."
                      required
                      textarea
                    />

                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        type="submit"
                        disabled={status.kind === 'sending'}
                        className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {status.kind === 'sending' ? (
                          <>
                            <Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send message <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                      <p className="text-f-2xs text-muted">
                        We reply from a real address. No newsletter, no list.
                      </p>
                    </div>

                    {/*
                      Announced to assistive tech the moment it appears,
                      rather than thrown as a browser dialog the user has
                      to dismiss before they can see their own form again.
                    */}
                    <div aria-live="polite">
                      {status.kind === 'sent' && (
                        <p className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 text-f-xs leading-relaxed text-emerald-900">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                          {status.message}
                        </p>
                      )}
                      {status.kind === 'error' && (
                        <p className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-f-xs leading-relaxed text-red-900">
                          {status.message}
                        </p>
                      )}
                    </div>
                  </form>
                </Reveal>
              </div>

              {/* --------------------------------------------- details --- */}
              <div className="lg:col-span-4 lg:col-start-9">
                <Reveal delay={160}>
                  <div className="overflow-hidden rounded-lg border border-hairline">
                    <Detail
                      Icon={Phone}
                      label="Sales"
                      value={COMPANY.contact.sales.display}
                      href={`tel:${COMPANY.contact.sales.tel}`}
                    />
                    <Detail
                      Icon={Phone}
                      label="Support"
                      value={COMPANY.contact.support.display}
                      href={`tel:${COMPANY.contact.support.tel}`}
                    />
                    <Detail
                      Icon={Mail}
                      label="Email"
                      value={COMPANY.contact.email}
                      href={`mailto:${COMPANY.contact.email}`}
                    />
                    <Detail
                      Icon={MapPin}
                      label="Office"
                      value={`${COMPANY.address.locality}, ${COMPANY.address.region} ${COMPANY.address.postalCode}`}
                    />
                    <Detail Icon={Clock} label="Hours" value={COMPANY.hoursDisplay} last />
                  </div>
                </Reveal>

                <Reveal delay={240}>
                  <div className="mt-8 rounded-lg border border-accent-200 bg-accent-50 p-6">
                    <p className="mono text-accent-700">Before you write</p>
                    <p className="mt-3 text-f-xs leading-relaxed text-body">
                      If you already know which product you want, say so and we
                      will bring that demo. There are {PRODUCTS.length} of them.
                    </p>
                    <Link href="/solutions" className="link-arrow mt-5">
                      Browse the catalogue <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <Expect />
      </main>

      <Footer />
    </>
  );
}

/* =================================================================== parts */

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  textarea = false,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const id = `f-${name}`;
  const cls =
    'mt-2 w-full rounded-lg border border-hairline bg-canvas px-4 py-3 text-f-xs text-ink outline-none transition-colors placeholder:text-faint focus:border-accent-400 focus:ring-2 focus:ring-accent-200';

  return (
    <div className={textarea ? '' : 'min-w-0'}>
      <label htmlFor={id} className="mono block text-faint">
        {label}
        {required && <span className="text-accent-700"> *</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={5}
          className={`${cls} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={cls}
        />
      )}
    </div>
  );
}

function Detail({
  Icon,
  label,
  value,
  href,
  last = false,
}: {
  Icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  last?: boolean;
}) {
  const inner = (
    <span className="flex items-start gap-4">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden />
      <span className="min-w-0">
        <span className="mono block text-faint">{label}</span>
        <span className="mono-num mt-1 block break-words text-f-xs text-ink">{value}</span>
      </span>
    </span>
  );

  const cls = `block p-5 ${last ? '' : 'border-b border-hairline'}`;

  return href ? (
    <a href={href} className={`${cls} transition-colors hover:bg-accent-50`}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/* ================================================================== EXPECT */

function Expect() {
  return (
    <section className="section relative border-t border-hairline">
      <SectionBackdrop side="left" tone="cool" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="marker mono">What happens next</p>
            <MaskText as="h2" className="display mt-5 text-f-5xl">
              <>No sales sequence.</>
              <>
                Just a <span className="accent-word">reply</span>.
              </>
            </MaskText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-body">
                Your message reaches the people who build the software. You
                will not be added to a list, and nobody will ring you four
                times about a whitepaper.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline md:grid-cols-3">
          {[
            ['We read it', 'A person reads what you wrote and replies — usually within one working day.'],
            ['We show you', 'A guided demo on a live system with your own scenarios, usually within two working days.'],
            ['We scope it', 'If a product fits, we configure it. If none do, discovery ends with a scope and a fixed-price estimate.'],
          ].map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 70} className="bg-canvas">
              <div className="group relative h-full overflow-hidden p-7 transition-colors hover:bg-accent-50">
                <span
                  aria-hidden
                  className="mono-num pointer-events-none absolute right-3 top-1 select-none font-display text-[4.5rem] font-extrabold leading-none text-hairline transition-colors group-hover:text-accent-200"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative">
                  <h3 className="font-display text-f-lg font-bold text-ink">{t}</h3>
                  <p className="mt-3 text-f-xs leading-relaxed text-body">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
