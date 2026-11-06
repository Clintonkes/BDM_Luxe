import { Award, FileCheck2, ShieldCheck, Sprout } from 'lucide-react';
import { site } from '@/config/site';
import { credentials, values } from '@/data/content';
import { pexels } from '@/lib/img';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import Reveal from '@/components/Reveal';
import { CtaBand, Eyebrow, PageHero, Placeholder } from '@/components/ui';

const credIcons = [FileCheck2, ShieldCheck, Sprout, Award];

export default function About() {
  return (
    <>
      <Seo
        title="About Us: Owner-Operated in Lucasville, OH"
        description="BDM Luxe is an owner-operated lawn and landscape company based in Lucasville, Ohio. Our story, the standards we work to, and our credentials."
      />
      <PageHero
        no="A"
        eyebrow="About the atelier"
        title={
          <>
            A small crew with <span className="italic text-clipping">particular</span> habits.
          </>
        }
        intro="BDM Luxe started with a simple belief: a lawn looks expensive because of the details, not the square footage."
      />

      {/* Story: editorial two-column with drop cap and pull image */}
      <section aria-labelledby="story-title" className="frame grid gap-14 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-32">
            <Img
              src={pexels(4920288)}
              alt="Groundskeeper with a string trimmer smiling beside a neat row of arborvitae"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="cut-img aspect-[4/5] w-full"
            />
            <p className="mt-3 text-xs text-lichen">Representative photography.</p>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow no="01">Our story</Eyebrow>
          <h2 id="story-title" className="mt-5 text-4xl sm:text-5xl">Built in Lucasville, one route at a time.</h2>
          <div className="prose-bdm mt-8">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-clipping">
              BDM Luxe is owner-operated, and that is the point. The person who walks your property for the quote is the
              person who sets the route, checks the edges and answers the phone. Nothing gets lost between a salesperson
              and a crew.
            </p>
            <p>
              We work across Scioto County: heavy clay soil, humid summers, a long leaf season and winters that heave
              anything built carelessly. Everything we do is shaped by that ground: mowing heights that change with the
              months, plants chosen for wet feet, paver bases dug deeper than the job seems to need.
            </p>
            <p>
              The name says “luxe”, but it isn’t about price. It is about the finish: the spade-cut edge, the clippings
              blown off the drive, the gate latched behind us. Small, repeated things that make a property look kept.
            </p>
            <p className="flex flex-wrap items-center gap-2 text-sm">
              <Placeholder>Owner to add founding year & personal story</Placeholder>
            </p>
          </div>
        </div>
      </section>

      {/* Values: bone band, numbered grid */}
      <section aria-labelledby="values-title" className="bg-bone py-20 text-ink sm:py-28">
        <div className="frame">
          <p className="label !text-loam">02 · What we hold to</p>
          <h2 id="values-title" className="mt-5 max-w-2xl text-4xl !text-ink sm:text-5xl">Four habits we don’t compromise on.</h2>
          <ul className="mt-14 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 80} className="flex flex-col bg-bone p-7">
                <span className="mow-accent block h-1.5 w-12" aria-hidden="true" />
                <h3 className="mt-8 font-display text-2xl !text-ink">{v.title}</h3>
                <p className="mt-3 text-[0.95rem] text-loam">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Credentials */}
      <section aria-labelledby="cred-title" className="border-y border-bone/10 bg-ink-2 py-20 sm:py-28">
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow no="03">Credentials</Eyebrow>
            <h2 id="cred-title" className="mt-5 text-4xl sm:text-5xl">On paper, too.</h2>
            <p className="mt-6 text-bone-dim">
              We only list credentials we can show you. Items marked as placeholders are awaiting the owner’s confirmation.
            </p>
          </div>
          <dl className="grid gap-px bg-bone/10 sm:grid-cols-2 lg:col-span-8">
            {credentials.map((c, i) => {
              const Icon = credIcons[i % credIcons.length];
              return (
                <Reveal key={c.title} delay={i * 70} className="bg-ink-2 p-7">
                  <Icon className="h-6 w-6 text-clipping" aria-hidden="true" />
                  <dt className="mt-5 flex flex-wrap items-center gap-2 font-semibold text-bone">
                    {c.title} {c.placeholder && <Placeholder />}
                  </dt>
                  <dd className="mt-2 text-sm text-bone-dim">{c.text}</dd>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </section>

      <CtaBand title="Meet us on your ground." text={`Call ${site.phone} or request a walk-through. The owner comes out personally.`} />
    </>
  );
}
