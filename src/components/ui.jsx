import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone, Plus } from 'lucide-react';
import { site } from '@/config/site';
import Reveal from './Reveal';

/** "Plot marker" eyebrow: a number tag + label, used to open every section. */
export function Eyebrow({ no, children, className = '' }) {
  return (
    <p className={`label flex items-center gap-3 ${className}`}>
      {no && (
        <span className="cut px-2 py-1 font-sans text-[0.65rem] text-ink" style={{ '--c': '5px', '--edge': '#D7F25C', '--fill': '#D7F25C' }}>
          {no}
        </span>
      )}
      <span>{children}</span>
    </p>
  );
}

/** Signature motif divider: a strip of mow stripes. */
export function MowRule({ accent = false, className = '' }) {
  return <div aria-hidden="true" className={`${accent ? 'mow-rule' : 'mow h-10 w-full'} ${className}`} />;
}

/** Owner-to-confirm marker for trust signals and other unverified content. */
export function Placeholder({ children = 'Placeholder', title = 'Placeholder: owner to confirm before publishing' }) {
  return (
    <span className="ph" title={title}>
      {children}
    </span>
  );
}

export function ArrowLink({ to, children, className = '' }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-2 text-sm font-semibold text-bone underline-offset-[6px] hover:text-clipping hover:underline ${className}`}>
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

/**
 * Inner-page header. Typographic and asymmetric, matching the home hero:
 * an oversized title on the left, a short standfirst pinned bottom-right.
 */
export function PageHero({ no, eyebrow, title, intro, children, aside }) {
  return (
    <header className="relative overflow-hidden border-b border-bone/10 pb-14 pt-36 sm:pb-20 sm:pt-44">
      <div aria-hidden="true" className="mow-diag pointer-events-none absolute inset-0 opacity-60" />
      <div className="frame relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Eyebrow no={no} className="animate-page-in">{eyebrow}</Eyebrow>
          <h1 className="mt-6 animate-page-in text-[2.6rem] xs:text-5xl sm:text-6xl lg:text-[5.2rem]">{title}</h1>
        </div>
        <div className="lg:col-span-4 lg:pb-3">
          {intro && <p className="max-w-md text-lg text-bone-dim">{intro}</p>}
          {aside}
        </div>
      </div>
      {children}
    </header>
  );
}

/** Closing call to action, shared by inner pages. */
export function CtaBand({ title = 'Let’s walk your property.', text = 'A free, no-pressure walk-through and a written quote within two business days.' }) {
  return (
    <section aria-labelledby="cta-title" className="frame py-20 sm:py-28">
      <Reveal className="card overflow-hidden" style={{ '--c': '34px' }}>
        <div className="mow-rule" aria-hidden="true" />
        <div className="grid gap-10 p-7 sm:p-12 lg:grid-cols-12 lg:items-end lg:p-16">
          <div className="lg:col-span-8">
            <Eyebrow>Free on-site quote</Eyebrow>
            <h2 id="cta-title" className="mt-5 text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
            <p className="mt-5 max-w-xl text-bone-dim">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
            <Link to="/quote" className="btn btn-primary">
              Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost">
              <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Accessible accordion item (button + region). */
export function AccordionItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-b border-bone/10">
      <h3 className="font-sans text-base">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full items-start justify-between gap-6 py-5 text-left text-[1.05rem] font-semibold text-bone hover:text-clipping"
        >
          <span>{q}</span>
          <Plus
            aria-hidden="true"
            className={`mt-1 h-5 w-5 shrink-0 text-clipping transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className={`max-w-2xl pb-6 text-bone-dim ${open ? '' : 'invisible'}`}>{a}</p>
        </div>
      </div>
    </div>
  );
}

/** Star row for review layouts. Purely decorative when used with placeholders. */
export function Stars({ className = '' }) {
  return (
    <span className={`flex gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-clipping">
          <path d="M10 1.5 12.6 7l6 .6-4.5 4 1.3 5.9L10 14.6l-5.4 2.9L5.9 11.6 1.4 7.6l6-.6z" />
        </svg>
      ))}
    </span>
  );
}
