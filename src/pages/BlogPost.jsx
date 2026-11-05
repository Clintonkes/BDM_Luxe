import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import { site } from '@/config/site';
import { formatDate, getPost, posts } from '@/data/posts';
import { absoluteUrl } from '@/lib/paths';
import { sized } from '@/lib/img';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import { Eyebrow } from '@/components/ui';
import NotFound from './NotFound';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <NotFound />;
  const other = posts.find((p) => p.slug !== post.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: sized(post.image, 1200),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
  };

  return (
    <>
      <Seo title={post.title} description={post.excerpt} type="article" image={sized(post.image, 1200)} jsonLd={jsonLd} />
      <article>
        <header className="frame pb-12 pt-36 sm:pt-44">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-lichen hover:text-clipping">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> The Journal
          </Link>
          <div className="mt-10 max-w-4xl">
            <Eyebrow>
              {post.category} · <time dateTime={post.date}>{formatDate(post.date)}</time>
            </Eyebrow>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl">{post.title}</h1>
            <p className="mt-6 flex items-center gap-2 text-sm text-lichen">
              <Clock className="h-4 w-4" aria-hidden="true" /> {post.readMins} minute read · By the {site.shortName} crew
            </p>
          </div>
        </header>
        <div className="frame">
          <Img src={post.image} alt={post.alt} priority sizes="(min-width: 1536px) 1400px, 100vw" className="cut-img aspect-[21/9] w-full" style={{ '--c': '40px' }} />
        </div>
        <div className="frame grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="card p-6 lg:sticky lg:top-32">
              <p className="label">In short</p>
              <p className="mt-3 text-sm text-bone-dim">{post.excerpt}</p>
              <Link to="/quote" className="btn btn-primary mt-6 w-full">
                Get a quote
              </Link>
            </div>
          </aside>
          <div className="prose-bdm order-1 lg:order-2 lg:col-span-8 lg:col-start-5">{post.body}</div>
        </div>
      </article>

      {other && (
        <section aria-labelledby="next-title" className="frame pb-20">
          <h2 id="next-title" className="label">
            Read next
          </h2>
          <Link to={`/blog/${other.slug}`} className="card group mt-5 grid items-center gap-6 overflow-hidden sm:grid-cols-[200px_1fr_auto]">
            <Img src={other.image} alt="" sizes="200px" className="aspect-[4/3] h-full w-full" />
            <span className="px-6 sm:px-0">
              <span className="label block text-clipping">{other.category}</span>
              <span className="mt-2 block font-display text-2xl group-hover:text-clipping sm:text-3xl">{other.title}</span>
            </span>
            <ArrowUpRight className="mx-6 mb-6 h-6 w-6 text-clipping sm:mb-0" aria-hidden="true" />
          </Link>
        </section>
      )}
    </>
  );
}
