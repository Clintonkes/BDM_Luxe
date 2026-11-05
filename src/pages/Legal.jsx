import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import { Eyebrow } from '@/components/ui';

/** Shared shell for long-form legal pages: sticky contents rail + article. */
export default function Legal({ seo, no, eyebrow, title, updated, sections, children }) {
  return (
    <>
      <Seo {...seo} />
      <header className="frame border-b border-bone/10 pb-12 pt-36 sm:pt-44">
        <Eyebrow no={no}>{eyebrow}</Eyebrow>
        <h1 className="mt-6 text-5xl sm:text-6xl">{title}</h1>
        <p className="mt-5 text-sm text-lichen">
          Last updated <time dateTime={updated}>{new Date(`${updated}T12:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
        </p>
      </header>
      <div className="frame grid gap-12 py-16 lg:grid-cols-12">
        <nav aria-label="On this page" className="lg:col-span-3">
          <div className="lg:sticky lg:top-32">
            <p className="label">On this page</p>
            <ol className="mt-4 space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-3 text-bone-dim hover:text-clipping">
                    <span className="text-lichen">{String(i + 1).padStart(2, '0')}</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-xs text-lichen">
              Questions? <Link to="/contact" className="text-clipping underline underline-offset-2">Contact us</Link>.
            </p>
          </div>
        </nav>
        <article className="prose-bdm lg:col-span-8 lg:col-start-5 [&_h2]:scroll-mt-32 [&_h2:first-child]:mt-0">{children}</article>
      </div>
    </>
  );
}
