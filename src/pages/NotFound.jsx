import { Link } from 'react-router-dom';
import { ArrowUpRight, Home, Phone } from 'lucide-react';
import { site } from '@/config/site';
import Seo from '@/components/Seo';

const suggestions = [
  { label: 'Services', href: '/services' },
  { label: 'Request a quote', href: '/quote' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/faq' },
];

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="This page has gone to seed. Head back to the BDM Luxe homepage or request a quote." noindex />
      <section className="relative flex min-h-[92vh] items-center overflow-hidden pb-20 pt-36">
        {/* The mow-stripe motif — with one stripe left uncut. */}
        <div aria-hidden="true" className="absolute inset-0 flex">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className={`flex-1 ${i === 9 ? 'bg-gradient-to-b from-clipping/25 via-clipping/10 to-transparent' : i % 2 ? 'bg-bone/[0.035]' : 'bg-bone/[0.015]'}`} />
          ))}
        </div>
        <div className="frame relative">
          <p className="label">Error 404 · Plot not found</p>
          <h1 className="mt-6 text-[5.5rem] leading-[0.85] sm:text-[9rem] lg:text-[13rem]">
            4<span className="italic text-clipping">0</span>4
          </h1>
          <p className="mt-8 max-w-lg font-display text-3xl leading-snug sm:text-4xl">We missed a stripe. This page has gone to seed.</p>
          <p className="mt-4 max-w-md text-bone-dim">The link may be old or mistyped. Here’s where most people were heading:</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <li key={s.href}>
                <Link to={s.href} className="inline-flex items-center gap-1.5 rounded-full border border-bone/20 px-4 py-2 text-sm font-semibold text-bone hover:border-clipping hover:text-clipping">
                  {s.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row">
            <Link to="/" className="btn btn-primary">
              <Home className="h-4 w-4" aria-hidden="true" /> Back to home
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost">
              <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
