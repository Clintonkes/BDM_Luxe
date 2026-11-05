import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { sized } from '@/lib/img';

/** Accessible lightbox: focus trapped, Esc closes, arrow keys navigate. */
export default function Lightbox({ items, index, onClose, onIndex }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const item = items[index];
  const go = useCallback((d) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);

  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        const els = Array.from(dialogRef.current?.querySelectorAll('button') ?? []);
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  if (!item) return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${items.length}: ${item.title}`}
      className="fixed inset-0 z-[80] flex animate-fade-in flex-col bg-ink/[0.97] backdrop-blur"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-8">
        <p className="label" aria-live="polite">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} — {item.category}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/25 text-bone hover:border-clipping hover:text-clipping"
        >
          <X className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Close</span>
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <figure className="flex max-h-full max-w-6xl flex-col">
          <img
            key={item.id}
            src={sized(item.src, 2000)}
            alt={item.alt}
            className="cut-img max-h-[72vh] w-auto animate-fade-in object-contain"
          />
          <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-display text-2xl text-bone">{item.title}</span>
            <span className="text-sm text-lichen">{item.alt}</span>
          </figcaption>
        </figure>
        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/25 bg-ink/70 text-bone hover:border-clipping hover:text-clipping sm:left-6"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Previous photo</span>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/25 bg-ink/70 text-bone hover:border-clipping hover:text-clipping sm:right-6"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Next photo</span>
        </button>
      </div>
      <div className="h-6" />
    </div>,
    document.body,
  );
}
