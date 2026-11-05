import { site } from '@/config/site';

const { endpoints, timeoutMs } = site.formSettings;
const apiUrl = import.meta.env.VITE_API_URL || site.formSettings.apiUrl;

export class SubmitError extends Error {
  constructor(message, { status, fields } = {}) {
    super(message);
    this.name = 'SubmitError';
    this.status = status;
    this.fields = fields;
  }
}

/** Pulls a readable message out of a FastAPI error body. */
function describeError(status, body) {
  if (status === 422 && Array.isArray(body?.detail)) {
    const fields = {};
    for (const item of body.detail) {
      const key = item.loc?.[item.loc.length - 1];
      if (key) fields[key] = item.msg;
    }
    const first = Object.keys(fields)[0];
    return new SubmitError(
      first === 'email' ? 'Please check the email address — the server could not accept it.' : 'Some details could not be accepted. Please check the form and try again.',
      { status, fields },
    );
  }
  return new SubmitError('Something went wrong on our side. Please try again, or call us directly.', { status });
}

/**
 * The single submit point for every form on the site.
 *
 * type: 'quote'  → POST {apiUrl}/api/bookings  (backend/main.py create_booking)
 *       'contact'→ POST {apiUrl}/api/contacts  (backend/main.py create_contact)
 *
 * When VITE_API_URL is not configured:
 *  - in local development the submission is simulated so the full UI flow works;
 *  - in a production build it fails loudly, asking the visitor to call/email,
 *    so no enquiry is ever silently lost.
 */
export async function submitForm(type, payload) {
  const path = endpoints[type];
  if (!path) throw new SubmitError(`Unknown form type: ${type}`);

  if (!apiUrl) {
    if (import.meta.env.DEV) {
      console.info(`[BDM Luxe] ${type} submission (dev demo — set VITE_API_URL to send for real)`, payload);
      await new Promise((r) => setTimeout(r, 1100));
      return { demo: true, reference: type === 'quote' ? `BDM-DEMO-${Date.now().toString().slice(-5)}` : undefined };
    }
    throw new SubmitError('Online requests are temporarily unavailable. Please call or email us and we will help right away.', { status: 0 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let res;
  try {
    res = await fetch(`${apiUrl.replace(/\/+$/, '')}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (err) {
    throw new SubmitError(
      err.name === 'AbortError'
        ? 'The request timed out. Please try again in a moment, or call us directly.'
        : 'We could not reach our server. Check your connection and try again, or call us directly.',
      { status: 0 },
    );
  } finally {
    clearTimeout(timer);
  }

  let body = null;
  try {
    body = await res.json();
  } catch {
    /* empty or non-JSON body */
  }
  if (!res.ok) throw describeError(res.status, body);
  return body ?? {};
}
