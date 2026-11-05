import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { serviceIcon } from '@/components/serviceIcons';
import { services } from '@/data/services';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import Reveal from '@/components/Reveal';
import { CtaBand, Eyebrow, PageHero } from '@/components/ui';

export default function Services() {
  const [lead, ...rest] = services;
  return (
    <>
      <Seo
        title="Lawn & Landscape Services in Scioto County"
        description="Weekly lawn maintenance, landscape design and installation, bed care and mulching, hardscape and pavers, hedge shaping, seasonal cleanups and commercial grounds care in Lucasville and Scioto County, OH."
      />
      <PageHero
        no="S"
        eyebrow="Services"
        title={
          <>
            Everything the ground <span className="italic text-clipping">asks for.</span>
          </>
        }
        intro="Seven services, each done to the same finish. Pick one, or let us look after the whole property."
        aside={
          <nav aria-label="Jump to a service" className="mt-6 flex flex-wrap gap-2">
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="rounded-full border border-bone/20 px-3 py-1.5 text-xs font-semibold text-bone-dim hover:border-clipping hover:text-clipping">
                {s.name.replace(' & ', ' + ')}
              </Link>
            ))}
          </nav>
        }
      />

      {/* Lead service — wide feature card */}
      <section aria-label="Featured service" className="frame pt-16 sm:pt-24">
        <Reveal>
          <Link to={`/services/${lead.slug}`} className="card group grid overflow-hidden lg:grid-cols-2" style={{ '--c': '30px' }}>
            <Img src={lead.image} alt={lead.alt} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/10] h-full w-full transition-transform duration-700 group-hover:scale-[1.03] lg:aspect-auto" />
            <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
              <div>
                <p className="label">
                  {lead.no} · Most requested
                </p>
                <h2 className="mt-5 text-4xl group-hover:text-clipping sm:text-5xl">{lead.name}</h2>
                <p className="mt-5 text-lg text-bone-dim">{lead.lede}</p>
              </div>
              <ul className="grid gap-2 text-sm text-bone-dim sm:grid-cols-2">
                {lead.includes.slice(0, 4).map((x) => (
                  <li key={x} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-clipping" aria-hidden="true" /> {x}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-clipping">
                Service details <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Remaining services — bento grid */}
      <section aria-labelledby="all-services" className="frame py-16 sm:py-24">
        <h2 id="all-services" className="sr-only">
          All services
        </h2>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {rest.map((s, i) => {
            const Icon = serviceIcon(s.icon);
            const wide = i === 0 || i === 3;
            return (
              <Reveal as="li" key={s.slug} delay={(i % 3) * 80} className={wide ? 'lg:col-span-4' : 'lg:col-span-2'}>
                <Link to={`/services/${s.slug}`} className="card group flex h-full flex-col overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Img src={s.image} alt={s.alt} sizes={wide ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'} className={`w-full transition-transform duration-700 group-hover:scale-105 ${wide ? 'aspect-[16/8]' : 'aspect-[4/3]'}`} />
                    <span className="cut absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center text-ink" style={{ '--c': '8px', '--edge': '#D7F25C', '--fill': '#D7F25C' }}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="label">{s.no}</p>
                    <h3 className="mt-3 font-display text-2xl group-hover:text-clipping sm:text-3xl">{s.name}</h3>
                    <p className="mt-3 flex-1 text-sm text-bone-dim">{s.short}</p>
                    <p className="mt-6 border-t border-bone/10 pt-4 text-xs text-lichen">
                      <span className="font-semibold text-bone-dim">Cadence:</span> {s.cadence}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* Bundling note */}
      <section aria-labelledby="bundle-title" className="border-y border-bone/10 bg-ink-2">
        <div className="frame grid gap-8 py-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <Eyebrow>Whole-property care</Eyebrow>
            <h2 id="bundle-title" className="mt-4 text-3xl sm:text-4xl">Combine services on one route and one invoice.</h2>
          </div>
          <p className="text-bone-dim md:col-span-5">
            Most customers pair weekly maintenance with a spring bed refresh and an autumn cleanup. Our{' '}
            <Link to="/pricing" className="text-clipping underline underline-offset-4">
              plan comparison
            </Link>{' '}
            shows what each level includes.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
