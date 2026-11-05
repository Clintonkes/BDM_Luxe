import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Phone } from 'lucide-react';
import { site } from '@/config/site';
import { getService, services } from '@/data/services';
import { absoluteUrl } from '@/lib/paths';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import Reveal from '@/components/Reveal';
import { CtaBand, Eyebrow } from '@/components/ui';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = getService(slug);
  if (!s) return <NotFound />;

  const idx = services.indexOf(s);
  const next = services[(idx + 1) % services.length];
  const related = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.lede,
    serviceType: s.name,
    url: absoluteUrl(`/services/${s.slug}`),
    provider: { '@id': `${absoluteUrl('/').replace(/\/$/, '')}/#business` },
    areaServed: site.serviceArea.map((a) => `${a.name}, OH`),
  };

  return (
    <>
      <Seo title={`${s.name} in Lucasville & Scioto County`} description={`${s.short} ${s.lede}`.slice(0, 300)} image={`${s.image}?auto=compress&cs=tinysrgb&w=1200`} jsonLd={jsonLd} />

      {/* Split hero: full-height image left, copy right */}
      <header className="grid min-h-[88vh] lg:grid-cols-2">
        <div className="relative min-h-[48vh] lg:order-2">
          <Img src={s.image} alt={s.alt} priority sizes="(min-width: 1024px) 50vw, 100vw" className="absolute inset-0 h-full w-full" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent lg:bg-gradient-to-r lg:from-ink lg:via-transparent" />
        </div>
        <div className="relative flex flex-col justify-end px-4 pb-14 pt-10 sm:px-6 lg:px-10 lg:pb-20 lg:pt-44 xl:pl-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))]">
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-lichen">
              <li>
                <Link to="/" className="hover:text-clipping">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/services" className="hover:text-clipping">Services</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-bone-dim">{s.name}</li>
            </ol>
          </nav>
          <Eyebrow no={s.no}>Service</Eyebrow>
          <h1 className="mt-6 text-5xl sm:text-6xl xl:text-7xl">{s.name}</h1>
          <p className="mt-6 max-w-lg text-lg text-bone-dim">{s.lede}</p>
          <dl className="mt-10 grid max-w-lg gap-6 border-t border-bone/10 pt-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="label">Cadence</dt>
              <dd className="mt-2 text-bone">{s.cadence}</dd>
            </div>
            <div>
              <dt className="label">Ideal for</dt>
              <dd className="mt-2 text-bone">{s.idealFor}</dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row">
            <Link to={`/quote?service=${s.slug}`} className="btn btn-primary">
              Quote this service <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost">
              <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone}
            </a>
          </div>
        </div>
      </header>

      {/* Body + included list */}
      <section className="frame grid gap-14 py-20 sm:py-28 lg:grid-cols-12" aria-labelledby="approach-title">
        <div className="lg:col-span-7">
          <h2 id="approach-title" className="text-4xl sm:text-5xl">How we approach it</h2>
          <div className="prose-bdm mt-8">
            {s.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="included-title">
          <Reveal className="card p-8 lg:sticky lg:top-32">
            <h2 id="included-title" className="font-display text-2xl">What’s included</h2>
            <ul className="mt-6 space-y-3.5">
              {s.includes.map((x) => (
                <li key={x} className="flex gap-3 text-sm text-bone-dim">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-clipping" aria-hidden="true" /> {x}
                </li>
              ))}
            </ul>
            <Link to="/pricing" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-clipping hover:underline">
              How pricing works <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </aside>
      </section>

      {/* Process strip */}
      <section aria-labelledby="steps-title" className="border-y border-bone/10 bg-ink-2 py-16 sm:py-20">
        <div className="frame">
          <h2 id="steps-title" className="label">The steps</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {s.process.map((step, i) => (
              <Reveal as="li" key={step} delay={i * 80} className="relative border-t-2 border-clipping pt-5">
                <span className="font-display text-4xl text-bone/25">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-2 font-semibold text-bone">{step}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Related */}
      <section aria-labelledby="related-title" className="frame py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="related-title" className="text-3xl sm:text-4xl">Often paired with</h2>
          <div className="flex gap-3">
            <Link to="/services" className="btn btn-ghost">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All services
            </Link>
            <Link to={`/services/${next.slug}`} className="btn btn-ghost">
              Next: {next.name.split(' ')[0]} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link to={`/services/${r.slug}`} className="card-ink group flex h-full flex-col p-7">
                <span className="label">{r.no}</span>
                <span className="mt-3 font-display text-2xl group-hover:text-clipping">{r.name}</span>
                <span className="mt-3 text-sm text-bone-dim">{r.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title={`Ready for ${s.name.toLowerCase()}?`} />
    </>
  );
}
