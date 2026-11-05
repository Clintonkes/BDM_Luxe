import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquareQuote, PenLine, ShieldCheck } from 'lucide-react';
import { site } from '@/config/site';
import { testimonials } from '@/data/content';
import Seo from '@/components/Seo';
import Reveal from '@/components/Reveal';
import { CtaBand, Eyebrow, PageHero, Placeholder, Stars } from '@/components/ui';

export default function Testimonials() {
  const [lead, ...rest] = testimonials;
  return (
    <>
      <Seo
        title="Testimonials & Reviews"
        description="Reviews from BDM Luxe customers across Lucasville and Scioto County. We publish only verified reviews from real customers, with permission."
      />
      <PageHero
        no="T"
        eyebrow="Testimonials"
        title={
          <>
            Judged by the <span className="italic text-clipping">neighbours.</span>
          </>
        }
        intro="The best review of a lawn is the one a passer-by gives it. Here is what customers say — verified, with their permission."
        aside={
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Stars />
            <span className="text-sm text-bone-dim">[X.X] average</span>
            <Placeholder>Owner to link verified rating</Placeholder>
          </div>
        }
      />

      <section aria-labelledby="reviews-heading" className="frame py-16 sm:py-24">
        <h2 id="reviews-heading" className="sr-only">
          Customer reviews
        </h2>
        <div className="mb-10 flex items-start gap-3 border border-dashed border-clipping/40 p-5 text-sm text-bone-dim">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-clipping" aria-hidden="true" />
          <p>
            <strong className="text-bone">Review slots awaiting verified reviews.</strong> The cards below show the layout only. Each will be replaced with a
            real customer review (name or initials, town and service) before publishing — we never invent reviews.
          </p>
        </div>

        {/* Lead review — oversized quote */}
        <Reveal as="figure" className="grid gap-8 border-y border-bone/10 py-12 lg:grid-cols-12">
          <MessageSquareQuote className="h-12 w-12 text-clipping lg:col-span-1" aria-hidden="true" />
          <blockquote className="font-display text-3xl leading-snug text-bone/75 sm:text-4xl lg:col-span-8">“{lead.quote}”</blockquote>
          <figcaption className="text-sm lg:col-span-3 lg:text-right">
            <span className="block font-semibold text-bone">{lead.name}</span>
            <span className="block text-lichen">{lead.place}</span>
            <span className="label mt-3 block">{lead.service}</span>
            <span className="mt-3 inline-block">
              <Placeholder />
            </span>
          </figcaption>
        </Reveal>

        {/* Ticket grid */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((t, i) => (
            <Reveal as="li" key={t.id} delay={(i % 3) * 80}>
              <figure className={`ticket flex h-full flex-col p-8 ${i === 1 ? 'bg-bone text-ink' : 'bg-loam'}`}>
                <div className="flex items-center justify-between">
                  <Stars />
                  <Placeholder />
                </div>
                <blockquote className={`mt-6 flex-1 text-lg leading-relaxed ${i === 1 ? 'text-loam' : 'text-bone/70'}`}>“{t.quote}”</blockquote>
                <figcaption className={`mt-8 border-t border-dashed pt-5 text-sm ${i === 1 ? 'border-ink/25' : 'border-bone/20'}`}>
                  <span className={`block font-semibold ${i === 1 ? 'text-ink' : 'text-bone'}`}>{t.name}</span>
                  <span className={i === 1 ? 'text-loam' : 'text-lichen'}>
                    {t.place} · {t.service}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Leave a review */}
      <section aria-labelledby="leave-title" className="border-y border-bone/10 bg-ink-2">
        <div className="frame grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Eyebrow>
              <span className="inline-flex items-center gap-2">
                <PenLine className="h-3.5 w-3.5" aria-hidden="true" /> Already a customer?
              </span>
            </Eyebrow>
            <h2 id="leave-title" className="mt-4 text-3xl sm:text-4xl">Tell people what you think.</h2>
            <p className="mt-4 max-w-xl text-bone-dim">
              Honest reviews help neighbours decide — and tell us what to keep doing. Leave one on our Google profile, or email it and we’ll
              ask your permission before publishing it here.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <a href={site.social.find((s) => s.label.startsWith('Google'))?.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Review on Google <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={`${site.emailHref}?subject=${encodeURIComponent('My BDM Luxe review')}`} className="btn btn-ghost">
              Email a review
            </a>
          </div>
        </div>
      </section>

      <section className="frame pt-16 text-center">
        <p className="text-bone-dim">
          Want to see the work first?{' '}
          <Link to="/gallery" className="font-semibold text-clipping underline underline-offset-4">
            Browse the gallery
          </Link>
          .
        </p>
      </section>
      <CtaBand />
    </>
  );
}
