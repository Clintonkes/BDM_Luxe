import { useMemo, useState } from 'react';
import { Expand } from 'lucide-react';
import { gallery, galleryCategories } from '@/data/content';
import Seo from '@/components/Seo';
import Img from '@/components/Img';
import Lightbox from '@/components/Lightbox';
import { CtaBand, PageHero, Placeholder } from '@/components/ui';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);
  const items = useMemo(() => (filter === 'All' ? gallery : gallery.filter((g) => g.category === filter)), [filter]);

  return (
    <>
      <Seo
        title="Gallery — Lawns, Beds, Hedges & Hardscape"
        description="A visual reference for the finish BDM Luxe works toward: striped lawns, spade-cut beds, shaped hedges, stone paths and clean autumn properties in southern Ohio."
      />
      <PageHero
        no="G"
        eyebrow="Gallery"
        title={
          <>
            The finish, <span className="italic text-clipping">in pictures.</span>
          </>
        }
        intro="Filter by type of work and open any image full-screen. Use the arrow keys to move between photos."
        aside={
          <p className="mt-5 flex flex-wrap items-center gap-2 text-xs text-lichen">
            <Placeholder>Representative photography</Placeholder> Owner’s project photos to replace.
          </p>
        }
      />

      <section aria-labelledby="gallery-grid" className="frame py-12 sm:py-16">
        <h2 id="gallery-grid" className="sr-only">
          Photo grid
        </h2>
        <div role="group" aria-label="Filter photos by category" className="sticky top-24 z-30 -mx-4 flex gap-2 overflow-x-auto bg-ink/90 px-4 py-3 backdrop-blur sm:mx-0 sm:flex-wrap sm:overflow-visible sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
          {galleryCategories.map((c) => {
            const count = c === 'All' ? gallery.length : gallery.filter((g) => g.category === c).length;
            const active = filter === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  active ? 'border-clipping bg-clipping text-ink' : 'border-bone/20 text-bone-dim hover:border-bone/50 hover:text-bone'
                }`}
              >
                {c} <span className={active ? 'text-ink/60' : 'text-lichen'}>{count}</span>
              </button>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {items.length} photos{filter !== 'All' ? ` in ${filter}` : ''}.
        </p>

        <ul className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((g, i) => (
            <li key={g.id} className="mb-4 break-inside-avoid animate-page-in" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden text-left"
                aria-label={`Open photo: ${g.title}`}
              >
                <Img
                  src={g.src}
                  alt={g.alt}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className={`w-full transition-transform duration-700 group-hover:scale-[1.04] ${i % 3 === 1 ? 'aspect-[4/5]' : i % 4 === 0 ? 'aspect-[4/3]' : 'aspect-square'}`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/0 to-transparent opacity-80 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <span>
                    <span className="label block !text-clipping">{g.category}</span>
                    <span className="mt-1 block font-display text-xl text-bone">{g.title}</span>
                  </span>
                  <Expand className="h-5 w-5 shrink-0 text-bone opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {open !== null && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}

      <CtaBand title="Picture this on your property." />
    </>
  );
}
