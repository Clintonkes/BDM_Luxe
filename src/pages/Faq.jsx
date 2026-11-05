import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Search } from 'lucide-react';
import { site } from '@/config/site';
import { faqGroups } from '@/data/content';
import Seo from '@/components/Seo';
import { AccordionItem, PageHero } from '@/components/ui';

export default function Faq() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const groups = faqGroups
    .map((g) => ({ ...g, items: q ? g.items.filter((i) => `${i.q} ${i.a}`.toLowerCase().includes(q)) : g.items }))
    .filter((g) => g.items.length);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqGroups.flatMap((g) => g.items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } }))),
  };

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers about BDM Luxe quotes, weekly mowing, rain delays, clippings, design projects, permits, billing and insurance for lawn care in Scioto County, OH."
        jsonLd={jsonLd}
      />
      <PageHero
        no="Q"
        eyebrow="FAQ"
        title={
          <>
            Straight answers, <span className="italic text-clipping">no small print.</span>
          </>
        }
        intro="Grouped by topic. Can’t find it? Call — the owner answers."
      />

      <section className="frame grid gap-12 py-16 sm:py-24 lg:grid-cols-12" aria-label="Questions and answers">
        {/* Side rail: search + topic index */}
        <aside className="lg:col-span-4">
          <div className="space-y-8 lg:sticky lg:top-32">
            <div>
              <label htmlFor="faq-search" className="field-label">
                Search questions
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-lichen" aria-hidden="true" />
                <input
                  id="faq-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. rain, mulch, contract"
                  className="field pl-7"
                />
              </div>
              <p className="mt-2 text-xs text-lichen" aria-live="polite">
                {q ? `${total} matching question${total === 1 ? '' : 's'}` : `${total} questions in ${faqGroups.length} topics`}
              </p>
            </div>
            <nav aria-label="FAQ topics">
              <p className="label">Topics</p>
              <ol className="mt-4 space-y-1">
                {faqGroups.map((g, i) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`} className="group flex items-baseline gap-3 py-1.5 text-bone-dim hover:text-clipping">
                      <span className="text-xs text-lichen">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-display text-xl">{g.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="card p-6">
              <p className="font-semibold">Still wondering?</p>
              <a href={site.phoneHref} className="mt-4 flex items-center gap-2 text-sm text-bone hover:text-clipping">
                <Phone className="h-4 w-4 text-clipping" aria-hidden="true" /> {site.phone}
              </a>
              <a href={site.emailHref} className="mt-2 flex items-center gap-2 text-sm text-bone hover:text-clipping">
                <Mail className="h-4 w-4 text-clipping" aria-hidden="true" /> {site.email}
              </a>
            </div>
          </div>
        </aside>

        {/* Grouped accordions */}
        <div className="space-y-16 lg:col-span-8">
          {groups.length === 0 && (
            <p className="text-bone-dim">
              No questions match “{query}”. Try another word, or{' '}
              <Link to="/contact" className="text-clipping underline underline-offset-4">
                ask us directly
              </Link>
              .
            </p>
          )}
          {groups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-32">
              <div className="flex items-center gap-4">
                <span className="mow-accent block h-1.5 w-10" aria-hidden="true" />
                <h2 id={`${g.id}-title`} className="text-3xl sm:text-4xl">
                  {g.title}
                </h2>
              </div>
              <div className="mt-6 border-t border-bone/10">
                {g.items.map((item) => (
                  <AccordionItem key={`${item.q}-${!!q}`} q={item.q} a={item.a} defaultOpen={!!q} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
