import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Facebook, Instagram, Mail, MapPin, Phone, Store } from 'lucide-react';
import { site } from '@/config/site';
import { routerBasename } from '@/lib/paths';
import { LogoMark } from './Logo';

const socialIcon = { Facebook, Instagram, 'Google Business Profile': Store };

export default function Footer() {
  const year = new Date().getFullYear();
  const a = site.address;
  return (
    <footer className="relative mt-10 border-t border-bone/10 bg-ink-2 pb-28 lg:pb-10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="mow-rule" aria-hidden="true" />

      <div className="frame grid gap-12 pt-16 lg:grid-cols-12 lg:pt-20">
        {/* Brand + contact */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <LogoMark className="h-14 w-14 text-clipping" />
            <div>
              <p className="font-display text-3xl leading-none">BDM Luxe</p>
              <p className="label mt-2">{site.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-bone-dim">{site.promise} Owner-operated in Lucasville, serving Scioto County and its neighbours.</p>

          <address className="mt-8 space-y-3 not-italic">
            <a href={site.phoneHref} className="flex items-center gap-3 text-lg font-semibold text-bone hover:text-clipping">
              <Phone className="h-5 w-5 text-clipping" aria-hidden="true" /> {site.phone}
            </a>
            <a href={site.emailHref} className="flex items-center gap-3 text-bone hover:text-clipping">
              <Mail className="h-5 w-5 text-clipping" aria-hidden="true" /> {site.email}
            </a>
            <p className="flex items-start gap-3 text-bone-dim">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-clipping" aria-hidden="true" />
              <span>
                {a.street}, {a.city}, {a.region} {a.postal}
              </span>
            </p>
          </address>
        </div>

        {/* Sitemap */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4">
          {site.footerNav.map((col) => (
            <div key={col.heading}>
              <p className="label">{col.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-sm text-bone-dim hover:text-clipping">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Hours */}
        <div className="lg:col-span-3">
          <p className="label flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Office hours
          </p>
          <dl className="mt-4 space-y-2 text-sm">
            {site.hours.map((h) => (
              <div key={h.label} className="flex justify-between gap-4 border-b border-dashed border-bone/10 pb-2">
                <dt className="text-bone-dim">{h.label}</dt>
                <dd className={h.open ? 'text-bone' : 'text-lichen'}>{h.value}</dd>
              </div>
            ))}
          </dl>
          <Link to="/quote" className="btn btn-primary mt-8 w-full">
            Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="frame mt-16 flex flex-col gap-6 border-t border-bone/10 pt-8 text-xs text-lichen md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {site.legalName}. All rights reserved.
        </p>
        <ul className="flex items-center gap-2" aria-label="Social media">
          {site.social.map((s) => {
            const Icon = socialIcon[s.label] ?? Store;
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/15 text-bone-dim hover:border-clipping hover:text-clipping"
                  title={s.placeholder ? `${s.label} — placeholder link, owner to add profile URL` : s.label}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">
                    {s.label} (opens in a new tab)
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <p className="flex gap-4">
          <Link to="/privacy" className="hover:text-clipping">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-clipping">
            Terms
          </Link>
          <a href={`${routerBasename.replace(/\/$/, '')}/sitemap.xml`} className="hover:text-clipping">
            Sitemap
          </a>
        </p>
      </div>
    </footer>
  );
}
