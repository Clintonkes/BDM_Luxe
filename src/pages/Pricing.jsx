import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Minus } from 'lucide-react';
import { planFeatures, plans, priceFactors } from '@/data/content';
import Seo from '@/components/Seo';
import Reveal from '@/components/Reveal';
import { CtaBand, Eyebrow, PageHero, Placeholder } from '@/components/ui';

function Cell({ value }) {
  if (value === true)
    return (
      <>
        <Check className="mx-auto h-5 w-5 text-clipping" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    );
  if (value === false)
    return (
      <>
        <Minus className="mx-auto h-4 w-4 text-lichen/50" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </>
    );
  return <span className="text-sm text-bone">{value}</span>;
}

export default function Pricing() {
  return (
    <>
      <Seo
        title="Pricing & Maintenance Plans"
        description="How BDM Luxe prices lawn care and landscaping in Scioto County: a side-by-side comparison of the Essential, Estate and Atelier maintenance plans, and the factors that set your quote."
      />
      <PageHero
        no="P"
        eyebrow="Pricing"
        title={
          <>
            Priced on your ground, <span className="italic text-clipping">not a guess.</span>
          </>
        }
        intro="Every property is measured on a free walk-through. Here is what each plan includes and what moves the number."
      />

      {/* Plan headers + comparison table */}
      <section aria-labelledby="compare-title" className="frame py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="compare-title" className="text-3xl sm:text-4xl">Compare maintenance plans</h2>
          <Placeholder>Prices — owner to set before publishing</Placeholder>
        </div>

        {/* Mobile: stacked plan tickets */}
        <div className="mt-10 grid gap-5 md:hidden">
          {plans.map((p, pi) => (
            <div key={p.id} className={`ticket p-7 ${p.featured ? 'bg-clipping text-ink' : 'bg-loam'}`}>
              <p className={`label ${p.featured ? '!text-ink/70' : ''}`}>{p.cadence}</p>
              <h3 className={`mt-2 font-display text-3xl ${p.featured ? '!text-ink' : ''}`}>{p.name}</h3>
              <p className={`mt-1 text-sm ${p.featured ? 'text-ink/80' : 'text-bone-dim'}`}>{p.for}</p>
              <p className="mt-4 font-semibold">{p.price}</p>
              <ul className={`mt-5 space-y-2 border-t border-dashed pt-5 text-sm ${p.featured ? 'border-ink/30' : 'border-bone/20'}`}>
                {planFeatures
                  .filter((f) => f.values[pi])
                  .map((f) => (
                    <li key={f.label} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>
                        {f.label}
                        {typeof f.values[pi] === 'string' && <span className="opacity-70"> — {f.values[pi]}</span>}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Desktop: full comparison table */}
        <div className="mt-10 hidden md:block">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">Features included in each BDM Luxe maintenance plan</caption>
            <colgroup>
              <col className="w-[34%]" />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <td className="align-bottom pb-6 pr-6">
                  <p className="text-sm text-lichen">All plans include a fixed route day, weather texts and the same crew every visit.</p>
                </td>
                {plans.map((p) => (
                  <th key={p.id} scope="col" className="px-2 pb-6 align-bottom">
                    <div className={`ticket px-5 py-6 text-center ${p.featured ? 'bg-clipping text-ink' : 'bg-loam'}`}>
                      {p.featured && <p className="label mb-2 !text-ink/70">Most chosen</p>}
                      <p className={`font-display text-3xl font-normal ${p.featured ? 'text-ink' : 'text-bone'}`}>{p.name}</p>
                      <p className={`mt-1 text-xs font-normal ${p.featured ? 'text-ink/75' : 'text-lichen'}`}>{p.for}</p>
                      <p className="mt-4 text-sm font-semibold">{p.price}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-y border-bone/10">
                <th scope="row" className="py-4 pr-6 text-sm font-medium text-bone-dim">
                  Visit cadence
                </th>
                {plans.map((p) => (
                  <td key={p.id} className="px-2 py-4 text-center text-sm text-bone">
                    {p.cadence}
                  </td>
                ))}
              </tr>
              {planFeatures.map((f) => (
                <tr key={f.label} className="border-b border-bone/10 hover:bg-bone/[0.03]">
                  <th scope="row" className="py-4 pr-6 text-sm font-medium text-bone-dim">
                    {f.label}
                  </th>
                  {f.values.map((v, i) => (
                    <td key={i} className="px-2 py-4 text-center">
                      <Cell value={v} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td />
                {plans.map((p) => (
                  <td key={p.id} className="px-2 pt-8 text-center">
                    <Link to={`/quote?plan=${p.id}`} className={`btn w-full ${p.featured ? 'btn-primary' : 'btn-ghost'}`}>
                      Quote {p.name}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* How pricing works */}
      <section aria-labelledby="factors-title" className="bg-bone py-20 text-ink sm:py-28">
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label !text-loam">How pricing works</p>
            <h2 id="factors-title" className="mt-5 text-4xl !text-ink sm:text-5xl">Six things that set your price.</h2>
            <p className="mt-6 text-loam">
              We measure, we don’t estimate from an aerial photo. Your written quote shows each of these so you can see exactly where the time goes.
            </p>
          </div>
          <ol className="grid gap-px bg-ink/15 sm:grid-cols-2 lg:col-span-8">
            {priceFactors.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 60} className="bg-bone p-7">
                <span className="font-display text-4xl text-ink/25">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-sans text-lg font-semibold !text-ink">{f.title}</h3>
                <p className="mt-2 text-[0.95rem] text-loam">{f.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Projects pricing note */}
      <section aria-labelledby="projects-title" className="frame grid gap-10 py-20 sm:py-24 md:grid-cols-2">
        <div>
          <Eyebrow>Projects & one-offs</Eyebrow>
          <h2 id="projects-title" className="mt-4 text-3xl sm:text-4xl">Design, hardscape and cleanups are fixed-price.</h2>
        </div>
        <div className="space-y-4 text-bone-dim">
          <p>
            Projects are quoted as a single fixed price after the walk-through and plan — no hourly surprises. A deposit secures your
            date; the balance is due on completion after you have walked the finished work with us.
          </p>
          <p>Seasonal cleanups are quoted per visit, with haul-away included. Commercial contracts are priced annually and invoiced monthly.</p>
          <Link to="/quote" className="inline-flex items-center gap-2 font-semibold text-clipping hover:underline">
            Start a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
