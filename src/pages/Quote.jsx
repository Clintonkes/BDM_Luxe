import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertCircle, ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, Mail, Pencil, Phone } from 'lucide-react';
import { site } from '@/config/site';
import { services } from '@/data/services';
import { plans } from '@/data/content';
import { submitForm } from '@/lib/submitForm';
import { formatPhone, isEmail, isPhone, required, todayISO } from '@/lib/validate';
import { serviceIcon } from '@/components/serviceIcons';
import Seo from '@/components/Seo';
import { Eyebrow } from '@/components/ui';

/* ── Question options ─────────────────────────────────────────────────── */
const OPT = {
  propertyType: [
    { v: 'residential', l: 'Home / residential' },
    { v: 'rental', l: 'Rental or investment' },
    { v: 'commercial', l: 'Business / commercial' },
    { v: 'hoa', l: 'HOA, church or common area' },
  ],
  lotSize: [
    { v: 'under-quarter', l: 'Under ¼ acre', hint: 'Typical town lot' },
    { v: 'quarter-half', l: '¼ to ½ acre', hint: 'Suburban lot' },
    { v: 'half-one', l: '½ to 1 acre' },
    { v: 'one-two', l: '1 to 2 acres' },
    { v: 'two-plus', l: '2+ acres', hint: 'Estate or rural' },
    { v: 'unsure', l: 'Not sure', hint: 'We’ll measure on site' },
  ],
  terrain: [
    { v: 'flat', l: 'Mostly flat' },
    { v: 'some-slope', l: 'Some slopes' },
    { v: 'steep', l: 'Steep banks or hillside' },
  ],
  gate: [
    { v: 'open', l: 'No gate / open access' },
    { v: 'narrow', l: 'Gate under 48″', hint: 'Needs a smaller mower' },
    { v: 'wide', l: 'Gate 48″ or wider' },
    { v: 'unsure', l: 'Not sure' },
  ],
  frequency: [
    { v: 'weekly', l: 'Weekly', hint: 'Recommended in spring flush' },
    { v: 'bi-weekly', l: 'Every two weeks' },
    { v: 'one-time', l: 'One-time cut' },
  ],
  condition: [
    { v: 'kept', l: 'Well kept, just switching provider' },
    { v: 'catch-up', l: 'Needs a catch-up' },
    { v: 'overgrown', l: 'Overgrown / neglected' },
  ],
  clippings: [
    { v: 'mulch', l: 'Mulch them back in' },
    { v: 'bag', l: 'Bag and haul away' },
    { v: 'advise', l: 'Your call' },
  ],
  budget: [
    { v: 'under-2500', l: 'Under $2,500' },
    { v: '2500-7500', l: '$2,500 to $7,500' },
    { v: '7500-15000', l: '$7,500 to $15,000' },
    { v: '15000-plus', l: '$15,000+' },
    { v: 'advise', l: 'Not sure, advise me' },
  ],
  timeline: [
    { v: 'asap', l: 'As soon as possible' },
    { v: '1-3-months', l: 'In 1 to 3 months' },
    { v: 'next-season', l: 'Next season' },
    { v: 'planning', l: 'Just planning' },
  ],
  cleanupSeason: [
    { v: 'spring', l: 'Spring' },
    { v: 'autumn', l: 'Autumn' },
    { v: 'both', l: 'Both' },
  ],
  mulch: [
    { v: 'hardwood', l: 'Shredded hardwood' },
    { v: 'dyed-black', l: 'Dyed black' },
    { v: 'dyed-brown', l: 'Dyed brown' },
    { v: 'cedar', l: 'Cedar' },
    { v: 'advise', l: 'Recommend one' },
  ],
  timeWindow: [
    { v: 'morning', l: 'Morning (8 to 12)' },
    { v: 'afternoon', l: 'Afternoon (12 to 6)' },
    { v: 'either', l: 'Either' },
  ],
  contactBy: [
    { v: 'phone', l: 'Phone call' },
    { v: 'text', l: 'Text message' },
    { v: 'email', l: 'Email' },
  ],
};
const label = (key, v) => OPT[key]?.find((o) => o.v === v)?.l ?? '';

const RECURRING = ['weekly-maintenance', 'commercial'];
const PROJECTS = ['landscape-design', 'hardscape'];

const STEPS = [
  { id: 'services', title: 'Services', heading: 'What can we take care of?' },
  { id: 'property', title: 'Property', heading: 'Tell us about the ground.' },
  { id: 'details', title: 'Details', heading: 'A few specifics.' },
  { id: 'contact', title: 'Contact', heading: 'Where should we reply?' },
  { id: 'review', title: 'Review', heading: 'Check your request.' },
];

const initial = {
  services: [],
  plan: '',
  address: '',
  town: '',
  propertyType: '',
  lotSize: '',
  terrain: '',
  gate: '',
  frequency: '',
  condition: '',
  clippings: '',
  budget: '',
  timeline: '',
  cleanupSeason: '',
  mulch: '',
  startDate: '',
  timeWindow: '',
  name: '',
  email: '',
  phone: '',
  contactBy: '',
  notes: '',
  consent: false,
};

/* ── Validation per step ─────────────────────────────────────────────── */
function validateStep(stepId, d) {
  const e = {};
  const has = (list) => d.services.some((s) => list.includes(s));
  if (stepId === 'services') {
    if (!d.services.length) e.services = 'Choose at least one service.';
  }
  if (stepId === 'property') {
    if (!required(d.address) || d.address.trim().length < 5) e.address = 'Enter the street address of the property.';
    if (!d.town) e.town = 'Choose the town or area.';
    if (!d.propertyType) e.propertyType = 'Choose a property type.';
    if (!d.lotSize) e.lotSize = 'Choose an approximate size.';
    if (!d.terrain) e.terrain = 'Choose the terrain.';
  }
  if (stepId === 'details') {
    if (has(RECURRING)) {
      if (!d.frequency) e.frequency = 'Choose how often.';
      if (!d.condition) e.condition = 'Tell us the current condition.';
    }
    if (has(PROJECTS)) {
      if (!d.budget) e.budget = 'Choose a budget range (or “advise me”).';
      if (!d.timeline) e.timeline = 'Choose a timeline.';
    }
    if (d.services.includes('seasonal-cleanups') && !d.cleanupSeason) e.cleanupSeason = 'Choose which season.';
    if (d.startDate && d.startDate < todayISO()) e.startDate = 'Choose today or a later date.';
    if (!d.timeWindow) e.timeWindow = 'Choose a time window for the walk-through.';
  }
  if (stepId === 'contact') {
    if (!required(d.name) || d.name.trim().length < 2) e.name = 'Enter your full name.';
    if (!isEmail(d.email)) e.email = 'Enter a valid email address, like name@example.com.';
    if (!isPhone(d.phone)) e.phone = 'Enter a 10-digit US phone number.';
    if (!d.contactBy) e.contactBy = 'Choose how you’d like us to reach you.';
    if (d.notes.length > 1500) e.notes = 'Please keep notes under 1,500 characters.';
    if (!d.consent) e.consent = 'Please confirm we may contact you about this request.';
  }
  return e;
}

/* ── Payload for POST /api/bookings (backend/schemas.py BookingCreate) ─ */
function toBooking(d) {
  const names = d.services.map((s) => services.find((x) => x.slug === s)?.name).filter(Boolean);
  const lines = [
    d.plan && `Plan of interest: ${plans.find((p) => p.id === d.plan)?.name}`,
    `Property type: ${label('propertyType', d.propertyType)}`,
    `Terrain: ${label('terrain', d.terrain)}`,
    d.gate && `Gate access: ${label('gate', d.gate)}`,
    d.condition && `Current condition: ${label('condition', d.condition)}`,
    d.clippings && `Clippings: ${label('clippings', d.clippings)}`,
    d.budget && `Budget: ${label('budget', d.budget)}`,
    d.timeline && `Timeline: ${label('timeline', d.timeline)}`,
    d.cleanupSeason && `Cleanup season: ${label('cleanupSeason', d.cleanupSeason)}`,
    d.mulch && `Mulch preference: ${label('mulch', d.mulch)}`,
    `Preferred contact: ${label('contactBy', d.contactBy)}`,
    d.notes.trim() && `Customer notes: ${d.notes.trim()}`,
  ].filter(Boolean);
  return {
    name: d.name.trim(),
    email: d.email.trim(),
    phone: formatPhone(d.phone),
    address: `${d.address.trim()}, ${d.town === 'Other' ? '' : `${d.town}, `}OH`,
    service: names.join(', '),
    frequency: d.frequency ? label('frequency', d.frequency) : null,
    lawn_size: label('lotSize', d.lotSize) || null,
    preferred_date: d.startDate || null,
    preferred_time: d.timeWindow ? label('timeWindow', d.timeWindow) : null,
    notes: lines.join('\n'),
  };
}

/* ── Small form primitives ───────────────────────────────────────────── */
function ErrorText({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="field-error">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" /> {children}
    </p>
  );
}

function RadioGroup({ name, legend, options, value, onChange, error, cols = 'sm:grid-cols-2', optional }) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined} aria-invalid={!!error} data-field={name}>
      <legend className="field-label">
        {legend} {optional && <span className="font-normal text-lichen">(optional)</span>}
      </legend>
      <div className={`grid gap-2.5 ${cols}`}>
        {options.map((o) => (
          <label key={o.v} className="choice">
            <input type="radio" name={name} value={o.v} checked={value === o.v} onChange={() => onChange(name, o.v)} className="sr-only" />
            <span aria-hidden="true" className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${value === o.v ? 'border-clipping bg-clipping' : 'border-bone/40'}`}>
              {value === o.v && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
            </span>
            <span>
              <span className="block font-semibold text-bone">{o.l}</span>
              {o.hint && <span className="mt-0.5 block text-xs text-lichen">{o.hint}</span>}
            </span>
          </label>
        ))}
      </div>
      <ErrorText id={`${name}-error`}>{error}</ErrorText>
    </fieldset>
  );
}

function TextField({ name, label: lbl, value, onChange, error, type = 'text', autoComplete, hint, inputMode, ...rest }) {
  const describedBy = [hint && `${name}-hint`, error && `${name}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div data-field={name}>
      <label htmlFor={`q-${name}`} className="field-label">
        {lbl}
      </label>
      {hint && (
        <p id={`${name}-hint`} className="-mt-1 mb-2 text-xs text-lichen">
          {hint}
        </p>
      )}
      <input
        id={`q-${name}`}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className="field-box"
        {...rest}
      />
      <ErrorText id={`${name}-error`}>{error}</ErrorText>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function Quote() {
  const [params] = useSearchParams();
  const [data, setData] = useState(() => {
    const pre = params.get('service');
    const plan = params.get('plan');
    return {
      ...initial,
      services: services.some((s) => s.slug === pre) ? [pre] : plan ? ['weekly-maintenance'] : [],
      plan: plans.some((p) => p.id === plan) ? plan : '',
      frequency: plan ? 'weekly' : '',
    };
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [slow, setSlow] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [result, setResult] = useState(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const firstRender = useRef(true);

  const current = STEPS[step];
  const has = (list) => data.services.some((s) => list.includes(s));
  const progress = status === 'success' ? 100 : Math.round((step / (STEPS.length - 1)) * 100);

  const set = (name, value) => {
    setData((d) => ({ ...d, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };
  const toggleService = (slug) => {
    set('services', data.services.includes(slug) ? data.services.filter((s) => s !== slug) : [...data.services, slug]);
  };

  // Move focus to the step heading on step change (not on first load).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    const top = formRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 80) window.scrollBy({ top: top - 120 });
  }, [step, status]);

  const focusFirstError = (errs) => {
    const first = Object.keys(errs)[0];
    requestAnimationFrame(() => {
      const el = formRef.current?.querySelector(`[data-field="${first}"] input, [data-field="${first}"] select, [data-field="${first}"] textarea`);
      el?.focus();
    });
  };

  const next = () => {
    const errs = validateStep(current.id, data);
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };
  const goTo = (i) => {
    setErrors({});
    setStep(i);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (current.id !== 'review') return next();
    // Re-validate everything before sending.
    for (let i = 0; i < STEPS.length - 1; i++) {
      const errs = validateStep(STEPS[i].id, data);
      if (Object.keys(errs).length) {
        setStep(i);
        setErrors(errs);
        return focusFirstError(errs);
      }
    }
    setStatus('submitting');
    setSubmitError('');
    const slowTimer = setTimeout(() => setSlow(true), site.formSettings.slowNoticeMs);
    try {
      const res = await submitForm('quote', toBooking(data));
      setResult(res);
      setStatus('success');
    } catch (err) {
      setSubmitError(err.message);
      setStatus('error');
    } finally {
      clearTimeout(slowTimer);
      setSlow(false);
    }
  };

  const summary = useMemo(() => {
    const names = data.services.map((s) => services.find((x) => x.slug === s)?.name).filter(Boolean);
    return [
      { k: 'Services', v: names.join(', '), step: 0 },
      { k: 'Plan', v: plans.find((p) => p.id === data.plan)?.name, step: 0 },
      { k: 'Address', v: data.address && `${data.address}${data.town && data.town !== 'Other' ? `, ${data.town}` : ''}`, step: 1 },
      { k: 'Property', v: [label('propertyType', data.propertyType), label('lotSize', data.lotSize)].filter(Boolean).join(' · '), step: 1 },
      { k: 'Terrain', v: [label('terrain', data.terrain), label('gate', data.gate)].filter(Boolean).join(' · '), step: 1 },
      { k: 'Frequency', v: label('frequency', data.frequency), step: 2 },
      { k: 'Condition', v: label('condition', data.condition), step: 2 },
      { k: 'Budget', v: label('budget', data.budget), step: 2 },
      { k: 'Timeline', v: label('timeline', data.timeline), step: 2 },
      { k: 'Cleanup', v: label('cleanupSeason', data.cleanupSeason), step: 2 },
      { k: 'Mulch', v: label('mulch', data.mulch), step: 2 },
      {
        k: 'Walk-through',
        v: [data.startDate && new Date(`${data.startDate}T12:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), label('timeWindow', data.timeWindow)]
          .filter(Boolean)
          .join(' · '),
        step: 2,
      },
      { k: 'Name', v: data.name, step: 3 },
      { k: 'Reach by', v: [label('contactBy', data.contactBy), data.phone && formatPhone(data.phone)].filter(Boolean).join(' · '), step: 3 },
    ].filter((r) => r.v);
  }, [data]);

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <>
      <Seo
        title="Request a Free Quote"
        description="Request a free, itemised lawn care or landscaping quote from BDM Luxe. A five-step form about your property and services. The owner replies within one business day."
      />

      <section className="frame pb-24 pt-36 sm:pt-40">
        {/* Header + progress */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow no="Q">Free quote · about 3 minutes</Eyebrow>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl">
              {status === 'success' ? (
                'Request received.'
              ) : (
                <>
                  Build your <span className="italic text-clipping">work order.</span>
                </>
              )}
            </h1>
          </div>
          <p className="text-sm text-bone-dim lg:col-span-4">{site.formSettings.replyPromise}</p>
        </div>

        <div className="mt-10">
          <div
            role="progressbar"
            aria-label="Quote progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-valuetext={status === 'success' ? 'Complete' : `Step ${step + 1} of ${STEPS.length}: ${current.title}`}
            className="mow h-3 w-full overflow-hidden bg-ink-2"
          >
            <div className="mow-rule h-full transition-[width] duration-500 ease-out" style={{ width: `${Math.max(progress, 4)}%` }} />
          </div>
          <ol className="mt-4 grid grid-cols-5 gap-2 text-xs">
            {STEPS.map((s, i) => {
              const done = i < step || status === 'success';
              const active = i === step && status !== 'success';
              return (
                <li key={s.id} className="min-w-0">
                  <button
                    type="button"
                    disabled={i > step || status === 'success' || status === 'submitting'}
                    onClick={() => goTo(i)}
                    aria-current={active ? 'step' : undefined}
                    className={`flex w-full items-center gap-2 text-left font-semibold disabled:cursor-default ${active ? 'text-clipping' : done ? 'text-bone hover:text-clipping' : 'text-lichen/70'}`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.7rem] ${active ? 'border-clipping' : done ? 'border-bone/50 bg-bone/10' : 'border-bone/20'}`}>
                      {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                    </span>
                    <span className="hidden truncate sm:inline">{s.title}</span>
                    <span className="sr-only sm:hidden">{s.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {status === 'success' ? (
          <Confirmation data={data} result={result} />
        ) : (
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            {/* Form */}
            <form ref={formRef} onSubmit={submit} noValidate className="lg:col-span-7 xl:col-span-8" aria-labelledby="step-heading">
              <p className="label">
                Step {step + 1} of {STEPS.length}
              </p>
              <h2 id="step-heading" ref={headingRef} tabIndex={-1} className="mt-3 text-3xl focus:outline-none sm:text-4xl">
                {current.heading}
              </h2>

              {errorCount > 0 && (
                <div role="alert" className="mt-6 flex items-start gap-3 border border-danger/50 bg-danger/10 p-4 text-sm text-bone">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
                  <p>
                    {errorCount === 1 ? 'One thing needs' : `${errorCount} things need`} your attention before continuing.
                  </p>
                </div>
              )}

              <div className="mt-8 space-y-9">
                {current.id === 'services' && (
                  <>
                    <fieldset aria-describedby={errors.services ? 'services-error' : 'services-hint'} data-field="services">
                      <legend className="field-label">Choose all that apply</legend>
                      <p id="services-hint" className="-mt-1 mb-3 text-xs text-lichen">
                        Not sure? Pick the closest, and we’ll refine it on the walk-through.
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {services.map((s) => {
                          const Icon = serviceIcon(s.icon);
                          const checked = data.services.includes(s.slug);
                          return (
                            <label key={s.slug} className="choice">
                              <input type="checkbox" checked={checked} onChange={() => toggleService(s.slug)} className="sr-only" />
                              <span aria-hidden="true" className={`flex h-9 w-9 shrink-0 items-center justify-center ${checked ? 'bg-clipping text-ink' : 'bg-bone/5 text-clipping'}`}>
                                {checked ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                              </span>
                              <span>
                                <span className="block font-semibold text-bone">{s.name}</span>
                                <span className="mt-0.5 block text-xs leading-snug text-lichen">{s.short}</span>
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      <ErrorText id="services-error">{errors.services}</ErrorText>
                    </fieldset>
                    {data.plan && (
                      <p className="text-sm text-bone-dim">
                        Interested in the <strong className="text-clipping">{plans.find((p) => p.id === data.plan)?.name}</strong> plan.{' '}
                        <button type="button" className="underline underline-offset-2 hover:text-clipping" onClick={() => set('plan', '')}>
                          Remove
                        </button>
                      </p>
                    )}
                  </>
                )}

                {current.id === 'property' && (
                  <>
                    <div className="grid gap-6 sm:grid-cols-[1.6fr_1fr]">
                      <TextField name="address" label="Street address" value={data.address} onChange={set} error={errors.address} autoComplete="street-address" placeholder="178 Example Road" />
                      <div data-field="town">
                        <label htmlFor="q-town" className="field-label">
                          Town / area
                        </label>
                        <select
                          id="q-town"
                          value={data.town}
                          onChange={(e) => set('town', e.target.value)}
                          aria-invalid={!!errors.town}
                          aria-describedby={errors.town ? 'town-error' : undefined}
                          className="field-box"
                        >
                          <option value="">Select…</option>
                          {site.serviceArea.map((a) => (
                            <option key={a.name} value={a.name}>
                              {a.name}
                            </option>
                          ))}
                          <option value="Other">Other (tell us in notes)</option>
                        </select>
                        <ErrorText id="town-error">{errors.town}</ErrorText>
                      </div>
                    </div>
                    <RadioGroup name="propertyType" legend="Property type" options={OPT.propertyType} value={data.propertyType} onChange={set} error={errors.propertyType} />
                    <RadioGroup name="lotSize" legend="Approximate lot size" options={OPT.lotSize} value={data.lotSize} onChange={set} error={errors.lotSize} cols="grid-cols-2 sm:grid-cols-3" />
                    <RadioGroup name="terrain" legend="Terrain" options={OPT.terrain} value={data.terrain} onChange={set} error={errors.terrain} cols="sm:grid-cols-3" />
                    <RadioGroup name="gate" legend="Gate access to the back yard" options={OPT.gate} value={data.gate} onChange={set} optional />
                  </>
                )}

                {current.id === 'details' && (
                  <>
                    {has(RECURRING) && (
                      <div className="space-y-9 border-l-2 border-clipping/60 pl-5">
                        <p className="label !text-clipping">Ongoing maintenance</p>
                        <RadioGroup name="frequency" legend="How often?" options={OPT.frequency} value={data.frequency} onChange={set} error={errors.frequency} cols="sm:grid-cols-3" />
                        <RadioGroup name="condition" legend="Current condition of the lawn" options={OPT.condition} value={data.condition} onChange={set} error={errors.condition} cols="sm:grid-cols-3" />
                        <RadioGroup name="clippings" legend="Clippings" options={OPT.clippings} value={data.clippings} onChange={set} cols="sm:grid-cols-3" optional />
                      </div>
                    )}
                    {has(PROJECTS) && (
                      <div className="space-y-9 border-l-2 border-clipping/60 pl-5">
                        <p className="label !text-clipping">Design & hardscape project</p>
                        <RadioGroup name="budget" legend="Working budget" options={OPT.budget} value={data.budget} onChange={set} error={errors.budget} cols="grid-cols-1 xs:grid-cols-2 sm:grid-cols-3" />
                        <RadioGroup name="timeline" legend="Timeline" options={OPT.timeline} value={data.timeline} onChange={set} error={errors.timeline} />
                      </div>
                    )}
                    {data.services.includes('seasonal-cleanups') && (
                      <div className="border-l-2 border-clipping/60 pl-5">
                        <RadioGroup name="cleanupSeason" legend="Which cleanup?" options={OPT.cleanupSeason} value={data.cleanupSeason} onChange={set} error={errors.cleanupSeason} cols="grid-cols-3" />
                      </div>
                    )}
                    {data.services.includes('bed-care') && (
                      <div className="border-l-2 border-clipping/60 pl-5">
                        <RadioGroup name="mulch" legend="Mulch preference" options={OPT.mulch} value={data.mulch} onChange={set} cols="grid-cols-1 xs:grid-cols-2 sm:grid-cols-3" optional />
                      </div>
                    )}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <TextField
                        name="startDate"
                        type="date"
                        label="Preferred walk-through date"
                        hint="Optional. We’ll confirm a time with you."
                        value={data.startDate}
                        onChange={set}
                        error={errors.startDate}
                        min={todayISO()}
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                    <RadioGroup name="timeWindow" legend="Best time for a walk-through" options={OPT.timeWindow} value={data.timeWindow} onChange={set} error={errors.timeWindow} cols="sm:grid-cols-3" />
                  </>
                )}

                {current.id === 'contact' && (
                  <>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <TextField name="name" label="Full name" value={data.name} onChange={set} error={errors.name} autoComplete="name" />
                      </div>
                      <TextField name="email" type="email" label="Email" value={data.email} onChange={set} error={errors.email} autoComplete="email" inputMode="email" />
                      <TextField
                        name="phone"
                        type="tel"
                        label="Phone"
                        value={data.phone}
                        onChange={(n, v) => set(n, formatPhone(v))}
                        error={errors.phone}
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="(740) 555-0123"
                      />
                    </div>
                    <RadioGroup name="contactBy" legend="Best way to reach you" options={OPT.contactBy} value={data.contactBy} onChange={set} error={errors.contactBy} cols="sm:grid-cols-3" />
                    <div data-field="notes">
                      <label htmlFor="q-notes" className="field-label">
                        Anything else? <span className="font-normal text-lichen">(optional)</span>
                      </label>
                      <textarea
                        id="q-notes"
                        rows={4}
                        value={data.notes}
                        onChange={(e) => set('notes', e.target.value)}
                        aria-invalid={!!errors.notes}
                        aria-describedby="notes-count"
                        className="field-box resize-y"
                        placeholder="Dogs in the yard, sprinkler heads to avoid, a problem area, gate code…"
                      />
                      <p id="notes-count" className="mt-1 text-right text-xs text-lichen">
                        {data.notes.length}/1500
                      </p>
                      <ErrorText id="notes-error">{errors.notes}</ErrorText>
                    </div>
                    <div data-field="consent">
                      <label className="flex cursor-pointer items-start gap-3 text-sm text-bone-dim">
                        <input
                          type="checkbox"
                          checked={data.consent}
                          onChange={(e) => set('consent', e.target.checked)}
                          aria-invalid={!!errors.consent}
                          aria-describedby={errors.consent ? 'consent-error' : undefined}
                          className="mt-0.5 h-5 w-5 shrink-0 accent-[#D7F25C]"
                        />
                        <span>
                          BDM Luxe may contact me about this request. My details are used only to prepare my quote. See the{' '}
                          <Link to="/privacy" className="text-clipping underline underline-offset-2">
                            privacy policy
                          </Link>
                          .
                        </span>
                      </label>
                      <ErrorText id="consent-error">{errors.consent}</ErrorText>
                    </div>
                  </>
                )}

                {current.id === 'review' && (
                  <div className="space-y-6">
                    <p className="text-bone-dim">Everything look right? Use “Edit” to change any section; your answers are kept.</p>
                    {[0, 1, 2, 3].map((si) => {
                      const rows = summary.filter((r) => r.step === si);
                      if (!rows.length) return null;
                      return (
                        <div key={si} className="card-ink p-6">
                          <div className="flex items-center justify-between">
                            <h3 className="label !text-bone">{STEPS[si].title}</h3>
                            <button type="button" onClick={() => goTo(si)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-clipping hover:underline">
                              <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Edit<span className="sr-only"> {STEPS[si].title}</span>
                            </button>
                          </div>
                          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[9rem_1fr]">
                            {rows.map((r) => (
                              <div key={r.k} className="contents">
                                <dt className="text-lichen">{r.k}</dt>
                                <dd className="text-bone">{r.v}</dd>
                              </div>
                            ))}
                            {si === 3 && (
                              <>
                                <dt className="text-lichen">Email</dt>
                                <dd className="break-all text-bone">{data.email}</dd>
                              </>
                            )}
                            {si === 3 && data.notes && (
                              <>
                                <dt className="text-lichen">Notes</dt>
                                <dd className="whitespace-pre-line text-bone">{data.notes}</dd>
                              </>
                            )}
                          </dl>
                        </div>
                      );
                    })}
                    {status === 'error' && (
                      <div role="alert" className="flex items-start gap-3 border border-danger/50 bg-danger/10 p-5 text-sm">
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
                        <div>
                          <p className="font-semibold text-bone">Your request wasn’t sent.</p>
                          <p className="mt-1 text-bone-dim">{submitError}</p>
                          <p className="mt-3 flex flex-wrap gap-4">
                            <a href={site.phoneHref} className="inline-flex items-center gap-1.5 font-semibold text-clipping">
                              <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone}
                            </a>
                            <a href={site.emailHref} className="inline-flex items-center gap-1.5 font-semibold text-clipping">
                              <Mail className="h-4 w-4" aria-hidden="true" /> {site.email}
                            </a>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Nav buttons */}
              <div className="mt-12 flex flex-col-reverse gap-3 border-t border-bone/10 pt-8 xs:flex-row xs:justify-between">
                {step > 0 ? (
                  <button type="button" onClick={back} disabled={status === 'submitting'} className="btn btn-ghost">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                  </button>
                ) : (
                  <span />
                )}
                <button type="submit" disabled={status === 'submitting'} className="btn btn-primary min-w-[12rem]">
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
                    </>
                  ) : current.id === 'review' ? (
                    <>
                      Send my request <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
              <p className="mt-4 min-h-[1.25rem] text-right text-xs text-lichen" aria-live="polite">
                {status === 'submitting' && (slow ? 'Still sending. Our server can take up to a minute to wake. Please keep this page open.' : 'Sending your request…')}
              </p>
            </form>

            {/* Live summary: a perforated work-order ticket */}
            <aside className="lg:col-span-5 xl:col-span-4" aria-labelledby="summary-title">
              <div className="lg:sticky lg:top-32">
                <div className="ticket bg-bone p-7 text-ink">
                  <div className="flex items-center justify-between">
                    <h2 id="summary-title" className="font-display text-2xl !text-ink">
                      Work order
                    </h2>
                    <span className="label !text-loam">Draft</span>
                  </div>
                  <div className="my-5 border-t border-dashed border-ink/25" />
                  {summary.length ? (
                    <dl className="space-y-3 text-sm" aria-live="polite">
                      {summary.map((r) => (
                        <div key={r.k} className="grid grid-cols-[6.5rem_1fr] gap-3">
                          <dt className="text-loam/80">{r.k}</dt>
                          <dd className="font-semibold text-ink">{r.v}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="text-sm text-loam">Your answers appear here as you go.</p>
                  )}
                  <div className="my-5 border-t border-dashed border-ink/25" />
                  <p className="text-xs text-loam">Free walk-through · written quote within two business days · no obligation.</p>
                </div>
                <p className="mt-5 text-sm text-bone-dim">
                  Prefer to talk?{' '}
                  <a href={site.phoneHref} className="font-semibold text-clipping hover:underline">
                    Call {site.phone}
                  </a>
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}

function Confirmation({ data, result }) {
  const ref = useRef(null);
  useEffect(() => ref.current?.focus(), []);
  const first = data.name.trim().split(' ')[0];
  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-12">
      <div ref={ref} tabIndex={-1} role="status" className="focus:outline-none lg:col-span-7">
        <CheckCircle2 className="h-14 w-14 text-clipping" aria-hidden="true" />
        <h2 className="mt-6 text-4xl sm:text-5xl">Thank you, {first}.</h2>
        <p className="mt-5 max-w-xl text-lg text-bone-dim">
          Your request is with the owner. Expect a {label('contactBy', data.contactBy).toLowerCase() || 'reply'} within one business day to arrange your walk-through
          {data.email && !result?.demo ? `, and a confirmation email at ${data.email}` : ''}.
        </p>
        {result?.demo && import.meta.env.DEV && <p className="mt-4 text-xs text-lichen">(Development demo: no request was actually sent. Set VITE_API_URL to connect the backend.)</p>}
        <ol className="mt-10 space-y-5 border-l border-bone/15 pl-6">
          {['We review your answers and check the route for your area.', 'We contact you to confirm a walk-through time.', 'You receive a written, itemised quote within two business days of the visit.'].map((t, i) => (
            <li key={t} className="relative">
              <span className="absolute -left-[33px] flex h-4 w-4 items-center justify-center rounded-full bg-clipping text-[0.6rem] font-bold text-ink">{i + 1}</span>
              <p className="text-bone">{t}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link to="/blog" className="btn btn-ghost">
            Read the Journal
          </Link>
        </div>
      </div>
      <aside className="lg:col-span-5" aria-label="Your reference">
        <div className="ticket bg-clipping p-8 text-ink">
          <p className="label !text-ink/70">Reference</p>
          <p className="mt-2 break-all font-display text-4xl text-ink">{result?.reference ?? 'Pending'}</p>
          <div className="my-5 border-t border-dashed border-ink/30" />
          <p className="text-sm">Quote this number if you call us about your request.</p>
          <a href={site.phoneHref} className="mt-4 inline-flex items-center gap-2 font-semibold underline underline-offset-2">
            <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone}
          </a>
        </div>
      </aside>
    </div>
  );
}
