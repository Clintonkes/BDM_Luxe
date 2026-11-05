import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUp, Cookie, Phone } from 'lucide-react';
import { site } from '@/config/site';
import { useStoredState } from '@/lib/hooks';

/** Scrolls to the top on route change (keeps hash links working). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

/** Fixed call / quote bar on small screens. */
export function MobileCallBar() {
  const { pathname } = useLocation();
  if (pathname === '/quote') return null;
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-bone/10 bg-ink/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a href={site.phoneHref} className="btn btn-ghost min-h-[48px]" aria-label={`Call ${site.shortName} at ${site.phone}`}>
          <Phone className="h-4 w-4" aria-hidden="true" /> Call now
        </a>
        <Link to="/quote" className="btn btn-primary min-h-[48px]">
          Free quote
        </Link>
      </div>
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };
  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`cut fixed bottom-24 right-4 z-40 inline-flex h-12 w-12 items-center justify-center text-ink transition-all duration-300 lg:bottom-8 lg:right-8 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      style={{ '--c': '9px', '--edge': '#D7F25C', '--fill': '#D7F25C' }}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

/**
 * Cookie notice. The site sets no tracking cookies; this records the visitor's
 * choice (localStorage) so analytics can be gated on it if added later.
 */
export function CookieBanner() {
  const [choice, setChoice] = useStoredState('bdm-cookie-choice', null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, []);
  if (choice || !ready) return null;
  return (
    <section
      role="region"
      aria-label="Cookie preferences"
      className="card fixed bottom-24 left-4 right-4 z-50 animate-page-in p-5 shadow-2xl sm:left-auto sm:max-w-sm lg:bottom-8 lg:right-8"
    >
      <div className="flex items-start gap-3">
        <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-clipping" aria-hidden="true" />
        <div>
          <p className="font-semibold text-bone">A note on cookies</p>
          <p className="mt-1.5 text-sm text-bone-dim">
            We only store your preferences on this device — no advertising trackers. Details in our{' '}
            <Link to="/privacy" className="text-clipping underline underline-offset-2">
              privacy policy
            </Link>
            .
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => setChoice('accepted')} className="btn btn-primary min-h-[42px] px-4 py-2">
              Accept
            </button>
            <button type="button" onClick={() => setChoice('declined')} className="btn btn-ghost min-h-[42px] px-4 py-2">
              Decline
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
