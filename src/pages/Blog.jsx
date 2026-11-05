import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { formatDate, posts } from '@/data/posts';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import Reveal from '@/components/Reveal';
import { CtaBand, PageHero } from '@/components/ui';

export default function Blog() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <Seo
        title="The Journal — Lawn & Garden Advice for Southern Ohio"
        description="Practical lawn and landscape advice from BDM Luxe for Scioto County properties: mowing heights by month, mulch depth, bed edging and more."
      />
      <PageHero
        no="J"
        eyebrow="The Journal"
        title={
          <>
            Field notes from <span className="italic text-clipping">southern Ohio ground.</span>
          </>
        }
        intro="Practical, local advice — the same things we tell customers on a walk-through, written down."
      />

      <section aria-labelledby="posts-title" className="frame py-16 sm:py-24">
        <h2 id="posts-title" className="sr-only">
          Articles
        </h2>
        <ol className="space-y-20">
          {sorted.map((p, i) => (
            <Reveal as="li" key={p.slug}>
              <article className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-14 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <Link to={`/blog/${p.slug}`} className="group block overflow-hidden lg:col-span-7" tabIndex={-1} aria-hidden="true">
                  <Img src={p.image} alt="" sizes="(min-width: 1024px) 55vw, 100vw" className="cut-img aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                </Link>
                <div className="lg:col-span-5">
                  <p className="label flex flex-wrap items-center gap-3">
                    <span className="text-clipping">{p.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" /> {p.readMins} min read
                    </span>
                  </p>
                  <h3 className="mt-5 text-3xl sm:text-4xl">
                    <Link to={`/blog/${p.slug}`} className="hover:text-clipping">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-5 text-bone-dim">{p.excerpt}</p>
                  <Link to={`/blog/${p.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-clipping hover:underline" aria-label={`Read: ${p.title}`}>
                    Read the article <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </section>

      <CtaBand title="Rather we handled it?" text="Everything in the Journal is built into our maintenance routes. Request a walk-through and we’ll put it to work on your lawn." />
    </>
  );
}
