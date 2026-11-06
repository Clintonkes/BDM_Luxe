import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowUpRight, Check, Clock, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { site } from '@/config/site';
import { submitForm } from '@/lib/submitForm';
import { formatPhone, isEmail, isPhone } from '@/lib/validate';
import { useOpenNow } from '@/lib/hooks';
import Seo from '@/components/Seo';
import Reveal from '@/components/Reveal';

const TOPICS = ['General question', 'Existing customer', 'Billing', 'Scheduling change', 'Careers', 'Something else'];
const empty = { name: '', email: '', phone: '', topic: 'General question', message: '', company: '' };

function validate(d) {
  const e = {};
  if (d.name.trim().length < 2) e.name = 'Please tell us your name.';
  if (!isEmail(d.email)) e.email = 'Enter a valid email so we can reply.';
  if (d.phone.trim() && !isPhone(d.phone)) e.phone = 'That phone number looks incomplete. Check it, or leave it blank.';
  if (d.message.trim().length < site.formSettings.minMessageLength) e.message = `A little more detail, please (at least ${site.formSettings.minMessageLength} characters).`;
  if (d.message.length > 2000) e.message = 'Please keep your message under 2,000 characters.';
  return e;
}

/** Stylised map placeholder (no third-party embed, no tracking). */
function MapPlaceholder() {
  const a = site.address;
  const q = encodeURIComponent(`${a.street}, ${a.city}, ${a.region} ${a.postal}`);
  return (
    <div className="relative overflow-hidden">
      <svg viewBox="0 0 400 240" className="h-full w-full" role="img" aria-label={`Map placeholder showing ${a.street}, ${a.city}`}>
        <rect width="400" height="240" fill="#191B16" />
        <g stroke="#EFE8DA" strokeOpacity="0.08" strokeWidth="1">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 22} y1="0" x2={i * 22 - 60} y2="240" />
          ))}
        </g>
        <path d="M-10 170 C 80 150, 140 200, 230 160 S 360 120, 420 140" stroke="#A7AE94" strokeOpacity="0.35" strokeWidth="10" fill="none" />
        <path d="M120 -10 L 160 250" stroke="#EFE8DA" strokeOpacity="0.18" strokeWidth="6" />
        <path d="M0 90 L 400 70" stroke="#EFE8DA" strokeOpacity="0.12" strokeWidth="4" />
        <path d="M260 0 C 250 80, 290 120, 270 240" stroke="#EFE8DA" strokeOpacity="0.12" strokeWidth="3" />
        <circle cx="205" cy="98" r="34" fill="#D7F25C" fillOpacity="0.08" />
        <circle cx="205" cy="98" r="16" fill="#D7F25C" fillOpacity="0.15" />
        <path d="M205 70c-11 0-19 8-19 18 0 14 19 32 19 32s19-18 19-32c0-10-8-18-19-18z" fill="#D7F25C" />
        <circle cx="205" cy="88" r="6" fill="#121410" />
      </svg>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${q}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary absolute bottom-4 right-4 min-h-[40px] px-4 py-2 text-xs"
      >
        Open in Maps <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}

export default function Contact() {
  const [d, setD] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [demo, setDemo] = useState(false);
  const formRef = useRef(null);
  const successRef = useRef(null);
  const { open, today } = useOpenNow(site.hours);

  const set = (k, v) => {
    setD((x) => ({ ...x, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (d.company) return; // honeypot: bots fill hidden fields
    const errs = validate(d);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector(`#c-${first}`)?.focus();
      return;
    }
    setStatus('submitting');
    setSubmitError('');
    try {
      const res = await submitForm('contact', {
        name: d.name.trim(),
        email: d.email.trim(),
        phone: d.phone.trim() ? formatPhone(d.phone) : null,
        subject: d.topic,
        message: d.message.trim(),
      });
      setDemo(!!res.demo);
      setStatus('success');
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      setSubmitError(err.message);
      setStatus('error');
    }
  };

  const field = (k, lbl, props = {}) => (
    <div>
      <label htmlFor={`c-${k}`} className="field-label">
        {lbl}
      </label>
      <input
        id={`c-${k}`}
        value={d[k]}
        onChange={(e) => set(k, k === 'phone' ? formatPhone(e.target.value) : e.target.value)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `c-${k}-err` : undefined}
        className="field"
        {...props}
      />
      {errors[k] && (
        <p id={`c-${k}-err`} className="field-error">
          <AlertCircle className="h-4 w-4" aria-hidden="true" /> {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <>
      <Seo
        title="Contact Us: Phone, Email & Hours"
        description={`Call ${site.phone}, email ${site.email}, or send a quick message. BDM Luxe office hours, address in Lucasville, Ohio, and how to reach us.`}
      />

      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <div className="frame">
          <h1 className="text-[3.4rem] leading-[0.9] sm:text-8xl lg:text-[9rem]">
            Say <span className="italic text-clipping">hello.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-bone-dim">
            Questions, scheduling, billing, or just checking we cover your road. For a price on work, the{' '}
            <Link to="/quote" className="text-clipping underline underline-offset-4">
              quote form
            </Link>{' '}
            gets you there faster.
          </p>
        </div>

        {/* Tap-to-call / email tiles */}
        <div className="frame mt-12 grid gap-4 md:grid-cols-2">
          <a href={site.phoneHref} className="card group flex items-center justify-between gap-6 p-7 sm:p-9">
            <span>
              <span className="label flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" /> Tap to call
              </span>
              <span className="mt-3 block font-display text-4xl tabular-nums group-hover:text-clipping sm:text-5xl">{site.phone}</span>
            </span>
            <ArrowUpRight className="h-8 w-8 shrink-0 text-clipping transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a href={site.emailHref} className="card group flex items-center justify-between gap-6 p-7 sm:p-9">
            <span className="min-w-0">
              <span className="label flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Tap to email
              </span>
              <span className="mt-3 block break-all font-display text-3xl group-hover:text-clipping sm:text-4xl">{site.email}</span>
            </span>
            <ArrowUpRight className="h-8 w-8 shrink-0 text-clipping transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="frame grid gap-12 pb-24 lg:grid-cols-12" aria-label="Message form and office details">
        {/* Details column */}
        <div className="space-y-8 lg:col-span-5">
          <Reveal className="card overflow-hidden">
            <MapPlaceholder />
            <div className="flex items-start gap-3 p-6">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-clipping" aria-hidden="true" />
              <address className="not-italic text-bone">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postal}
                <span className="mt-1 block text-sm text-lichen">Office and yard. Visits by appointment.</span>
              </address>
            </div>
          </Reveal>

          <Reveal className="card-ink p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="label flex items-center gap-2 !text-bone">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Hours
              </h2>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${open ? 'bg-clipping text-ink' : 'bg-bone/10 text-bone-dim'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${open ? 'bg-ink' : 'bg-lichen'}`} aria-hidden="true" />
                {open ? 'Open now' : 'Closed now'}
              </span>
            </div>
            <dl className="mt-5 space-y-2.5 text-sm">
              {site.hours.map((h) => (
                <div key={h.label} className={`flex justify-between gap-4 ${today?.label === h.label ? 'font-semibold text-bone' : 'text-bone-dim'}`}>
                  <dt>
                    {h.label}
                    {today?.label === h.label && <span className="sr-only"> (today)</span>}
                  </dt>
                  <dd>{h.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 border-t border-bone/10 pt-4 text-xs text-lichen">Eastern Time. Crews are on site during these hours, so calls may go to voicemail, but we return every one the same day.</p>
          </Reveal>
        </div>

        {/* Short form */}
        <div className="lg:col-span-7">
          <div className="border-t-2 border-clipping pt-8">
            {status === 'success' ? (
              <div ref={successRef} tabIndex={-1} role="status" className="focus:outline-none">
                <span className="cut inline-flex h-14 w-14 items-center justify-center text-ink" style={{ '--c': '10px', '--edge': '#D7F25C', '--fill': '#D7F25C' }}>
                  <Check className="h-7 w-7" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-4xl sm:text-5xl">Message sent.</h2>
                <p className="mt-4 max-w-md text-bone-dim">
                  Thanks, {d.name.trim().split(' ')[0]}. {site.formSettings.replyPromise} A copy is on its way to {d.email}.
                </p>
                {demo && <p className="mt-3 text-xs text-lichen">(Development demo: nothing was actually sent.)</p>}
                <button
                  type="button"
                  onClick={() => {
                    setD(empty);
                    setStatus('idle');
                  }}
                  className="btn btn-ghost mt-8"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="contact-form-title">
                <h2 id="contact-form-title" className="flex items-center gap-3 text-3xl sm:text-4xl">
                  <MessageCircle className="h-7 w-7 text-clipping" aria-hidden="true" /> Quick message
                </h2>
                <p className="mt-3 text-sm text-lichen">Three fields and you’re done.</p>

                <fieldset className="mt-8">
                  <legend className="field-label">What’s it about?</legend>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                      <label key={t} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-clipping ${d.topic === t ? 'border-clipping bg-clipping text-ink' : 'border-bone/20 text-bone-dim hover:border-bone/50'}`}>
                        <input type="radio" name="topic" value={t} checked={d.topic === t} onChange={() => set('topic', t)} className="sr-only" />
                        {t}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  {field('name', 'Your name', { autoComplete: 'name' })}
                  {field('email', 'Email', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
                  <div className="sm:col-span-2">{field('phone', 'Phone (optional)', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}</div>
                  <div className="sm:col-span-2">
                    <label htmlFor="c-message" className="field-label">
                      Message
                    </label>
                    <textarea
                      id="c-message"
                      rows={5}
                      value={d.message}
                      onChange={(e) => set('message', e.target.value)}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'c-message-err' : undefined}
                      className="field resize-y"
                      placeholder="How can we help?"
                    />
                    {errors.message && (
                      <p id="c-message-err" className="field-error">
                        <AlertCircle className="h-4 w-4" aria-hidden="true" /> {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Honeypot: hidden from people and assistive tech */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="c-company">Company</label>
                  <input id="c-company" tabIndex={-1} autoComplete="off" value={d.company} onChange={(e) => set('company', e.target.value)} />
                </div>

                {status === 'error' && (
                  <div role="alert" className="mt-8 flex items-start gap-3 border border-danger/50 bg-danger/10 p-4 text-sm">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
                    <p className="text-bone-dim">
                      <strong className="block text-bone">Not sent.</strong> {submitError}
                    </p>
                  </div>
                )}

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-lichen">
                    By sending, you agree we may reply using these details. <Link to="/privacy" className="underline underline-offset-2 hover:text-clipping">Privacy</Link>
                  </p>
                  <button type="submit" disabled={status === 'submitting'} className="btn btn-primary">
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <Send className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
                <p className="sr-only" aria-live="polite">
                  {status === 'submitting' ? 'Sending your message…' : ''}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
