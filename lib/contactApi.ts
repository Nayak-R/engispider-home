/**
 * Contact-us submission for the EngiSpider CRM public API.
 * Unauthenticated — the siteKey decides which inbox receives the enquiry.
 */
const CONTACT_API_URL =
  process.env.NEXT_PUBLIC_CONTACT_API_URL || 'https://crm.engispider.com/api/v1/public/contact';

export const SITE_KEY = 'engispider';

export type ContactFields = {
  name?: string;
  email?: string;
  mobile?: string;
  subject?: string;
  company?: string;
  country?: string;
  course?: string;
  message?: string;
  extraFields?: Record<string, string>;
};

export async function submitContact(fields: ContactFields) {
  const res = await fetch(CONTACT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      siteKey: SITE_KEY,
      sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      ...fields,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(data.message || 'Could not send your message. Please try again.');
  }
  return data;
}
