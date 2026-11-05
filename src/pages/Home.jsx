import { Link } from 'react-router-dom';
import { ArrowUpRight, BadgeCheck, CalendarClock, MapPin, Phone, RotateCcw, ShieldCheck, Star } from 'lucide-react';
import { site } from '@/config/site';
import { services } from '@/data/services';
import { faqGroups, gallery, process, testimonials } from '@/data/content';
import { pexels } from '@/lib/img';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import Reveal from '@/components/Reveal';
import { AccordionItem, ArrowLink, CtaBand, Eyebrow, Placeholder } from '@/components/ui';

const trustIcons = { insured: ShieldCheck, guarantee: RotateCcw, years: CalendarClock, stars: Star };

export default function Home() {
  const featured = services.slice(0, 6);
  const teaser = ['allee', 'shears', 'path', 'stripes', 'leaves'].map((id) => gallery.find((g) => g.id === id));
  const faqTeaser = [faqGroups[0].items[0], faqGroups[1].items[0], faqGroups[3].items[0]];

  return (
    <>
      <Seo
        title="Lawn Care & Landscaping in Lucasville, OH"
        description="BDM Luxe keeps Scioto County lawns and landscapes to a tailored standard — weekly maintenance, landscape design, bed care, hardscape and commercial grounds. Free on-site quotes."
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-36 sm:pt-44 lg:pb-24">
        <div aria-hidden="true" className="mow pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] opacity-70 lg:block" />
        <div className="frame relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-7">
            <Eyebrow no="BDM">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3" aria-hidden="true" /> Lucasville · Scioto County, Ohio
              </span>
            </Eyebrow>
            <h1 id="hero-title" className="mt-8 text-[3.1rem] leading-[0.95] xs:text-[3.6rem] sm:text-7xl lg:text-[6.4rem] xl:text-[7.4rem]">
              Grounds kept
              <span className="block pl-[8%] italic text-clipping">to a tailored</span>
              <span className="block">standard.</span>
            </h1>
            <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end lg:mt-14">
              <p className="max-w-md text-lg leading-relaxed text-bone-dim">
                Owner-operated lawn care and landscaping for homes and businesses across southern Ohio. Mowed at the right height,
                edged by hand, and kept by the same crew every week.
              </p>
              <div className="flex flex-col gap-3 xs:flex-row sm:flex-col">
                <Link to="/quote" className="btn btn-primary">
                  Request a free quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href={site.phoneHref} className="btn btn-ghost">
                  <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Asymmetric image stack */}
          <div className="relative lg:col-span-5 lg:-mt-6">
            <div className="relative ml-auto w-[88%] sm:w-[70%] lg:w-full">
              <Img
                src={pexels(27397124)}
                alt="Striped lawn between tall clipped hedges, leading to a garden gate"
                priority
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="cut-img aspect-[4/5] w-full"
                style={{ '--c': '40px' }}
              />
              <div className="cut absolute -bottom-8 -left-[14%] w-[62%] p-5 sm:-left-10 sm:p-6" style={{ '--c': '16px', '--edge': '#D7F25C', '--fill': '#D7F25C' }}>
                <p className="font-display text-3xl leading-none text-ink sm:text-4xl">3.5″</p>
                <p className="mt-2 text-xs font-semibold leading-snug text-ink/80 sm:text-sm">
                  Our early-summer mowing height. Taller turf shades its roots and crowds out weeds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────── */}
      <section aria-label="Why customers trust us" className="border-y border-bone/10 bg-ink-2">
        <ul className="frame grid grid-cols-1 divide-y divide-bone/10 xs:grid-cols-2 xs:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {site.trust.map((t, i) => {
            const Icon = trustIcons[t.key] ?? BadgeCheck;
            return (
              <Reveal as="li" key={t.key} delay={i * 80} className="flex items-start gap-4 py-6 lg:px-6 lg:first:pl-0">
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-clipping" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-bone">{t.label}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-lichen">
                    {t.detail} {t.placeholder && <Placeholder />}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section aria-labelledby="services-title" className="frame py-24 sm:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow no="01">What we keep</Eyebrow>
            <h2 id="services-title" className="mt-5 text-4xl sm:text-5xl lg:text-6xl">
              Seven disciplines, <span className="italic text-lichen">one standard.</span>
            </h2>
          </div>
          <p className="text-bone-dim lg:col-span-4 lg:col-start-9">
            From the weekly cut to a new patio, every job gets the same attention to edges, timing and cleanup.
          </p>
        </div>

        <ol className="mt-14 border-t border-bone/10">
          {featured.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 50}>
              <Link
                to={`/services/${s.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-bone/10 py-6 transition-colors hover:bg-bone/[0.03] sm:gap-8 sm:py-8 lg:grid-cols-[5rem_1.2fr_1fr_auto]"
              >
                <span className="font-sans text-sm font-semibold text-lichen">{s.no}</span>
                <span className="font-display text-2xl text-bone transition-colors group-hover:text-clipping sm:text-3xl lg:text-4xl">{s.name}</span>
                <span className="hidden text-sm text-bone-dim lg:block">{s.short}</span>
                <span className="cut inline-flex h-11 w-11 items-center justify-center text-bone transition-colors [--c:8px] [--edge:rgb(239_232_218_/_0.25)] [--fill:transparent] group-hover:text-ink group-hover:[--edge:#D7F25C] group-hover:[--fill:#D7F25C]">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
        <div className="mt-10">
          <ArrowLink to="/services">See all services, including commercial grounds care</ArrowLink>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────── */}
      <section aria-labelledby="process-title" className="relative overflow-hidden bg-bone py-24 text-ink sm:py-32">
        <div className="frame">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="label flex items-center gap-3 !text-loam">
                <span className="cut px-2 py-1 text-[0.65rem] text-bone" style={{ '--c': '5px', '--edge': '#121410', '--fill': '#121410' }}>02</span>
                How it works
              </p>
              <h2 id="process-title" className="mt-5 text-4xl !text-ink sm:text-5xl lg:text-6xl">
                From first walk to the hundredth cut.
              </h2>
              <p className="mt-6 max-w-md text-loam">
                No guessed quotes from a satellite photo. We walk your ground, put everything in writing, and keep the same crew on it.
              </p>
              <Link to="/quote" className="btn btn-light mt-8">
                Book a walk-through <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ol className="grid gap-px bg-ink/15 sm:grid-cols-2 lg:col-span-7">
              {process.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 90} className="bg-bone p-6 sm:p-8">
                  <span className="font-display text-6xl leading-none text-ink/20">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-6 font-sans text-xl font-semibold !text-ink">{p.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-loam">{p.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── GALLERY TEASER ───────────────────────────────────────────── */}
      <section aria-labelledby="work-title" className="py-24 sm:py-32">
        <div className="frame flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow no="03">The look we work toward</Eyebrow>
            <h2 id="work-title" className="mt-5 text-4xl sm:text-5xl lg:text-6xl">
              Lines, layers, <span className="italic text-clipping">light.</span>
            </h2>
          </div>
          <ArrowLink to="/gallery">Open the gallery</ArrowLink>
        </div>
        <div className="frame mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4 lg:auto-rows-[260px]">
          {teaser.map((g, i) => (
            <Reveal
              key={g.id}
              delay={i * 70}
              className={`group relative overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <Img src={g.src} alt={g.alt} sizes={i === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'} className={`h-full w-full transition-transform duration-700 group-hover:scale-105 ${i === 0 ? 'cut-img' : ''}`} />
              <p className="label absolute bottom-3 left-3 bg-ink/80 px-2 py-1 !text-bone backdrop-blur">{g.title}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section aria-labelledby="reviews-title" className="border-y border-bone/10 bg-ink-2 py-24 sm:py-32">
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow no="04">In their words</Eyebrow>
            <h2 id="reviews-title" className="mt-5 text-4xl sm:text-5xl">What customers notice first.</h2>
            <p className="mt-6 text-bone-dim">
              Verified reviews will appear here. We only publish reviews from real customers, with their permission.
            </p>
            <p className="mt-4">
              <Placeholder>Review slots — owner to add verified reviews</Placeholder>
            </p>
            <ArrowLink to="/testimonials" className="mt-8">
              All testimonials
            </ArrowLink>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:col-span-8">
            {testimonials.slice(0, 2).map((t, i) => (
              <Reveal as="figure" key={t.id} delay={i * 100} className="ticket flex flex-col justify-between bg-loam p-8 sm:p-10">
                <blockquote className="font-display text-2xl leading-snug text-bone/70">“{t.quote}”</blockquote>
                <figcaption className="mt-8 flex items-center justify-between gap-4 border-t border-dashed border-bone/20 pt-5 text-sm">
                  <span>
                    <span className="block font-semibold text-bone">{t.name}</span>
                    <span className="text-lichen">
                      {t.place} · {t.service}
                    </span>
                  </span>
                  <Placeholder />
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ TEASER ───────────────────────────────────────────────── */}
      <section aria-labelledby="faq-title" className="frame grid gap-12 py-24 sm:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow no="05">Good questions</Eyebrow>
          <h2 id="faq-title" className="mt-5 text-4xl sm:text-5xl">Before you book.</h2>
          <p className="mt-6 max-w-sm text-bone-dim">The three things people ask most. Everything else is on the FAQ page — or just call.</p>
          <ArrowLink to="/faq" className="mt-8">
            Read the full FAQ
          </ArrowLink>
        </div>
        <div className="border-t border-bone/10 lg:col-span-7">
          {faqTeaser.map((f, i) => (
            <AccordionItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      <CtaBand title="Your lawn, on our route." text={`Weekly routes run across ${site.serviceArea.slice(0, 5).map((a) => a.name).join(', ')} and beyond. Tell us about your property and we’ll arrange a walk-through.`} />
    </>
  );
}
