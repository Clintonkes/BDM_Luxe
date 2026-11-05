import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import { site } from '@/config/site';
import { useStoredState } from '@/lib/hooks';
import Logo from './Logo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [announceDismissed, setAnnounceDismissed] = useStoredState('bdm-announce-dismissed', false);
  const { pathname } = useLocation();
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Mobile menu: lock scroll, trap focus, close on Escape, restore focus.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const toggle = toggleRef.current;
    const focusables = () => menuRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? [];
    focusables()[0]?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab') {
        const els = Array.from(focusables());
        if (!els.length) return;
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
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      toggle?.focus();
    };
  }, [open]);

  const showAnnouncement = !announceDismissed && !scrolled;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        {/* Announcement bar */}
        <div className={`grid transition-[grid-template-rows] duration-300 ${showAnnouncement ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`} aria-hidden={!showAnnouncement}>
          <div className="overflow-hidden">
            <div className="mow-accent text-ink">
              <div className="frame flex items-center justify-center gap-3 py-2 text-center text-[0.8rem] font-semibold sm:text-sm">
                <p className="truncate">
                  <span className="hidden sm:inline">{site.announcement.text} </span>
                  <span className="sm:hidden">Spring routes filling — free walk-throughs.</span>{' '}
                  <Link to={site.announcement.href} tabIndex={showAnnouncement ? 0 : -1} className="underline decoration-2 underline-offset-2 hover:no-underline">
                    {site.announcement.linkLabel}
                  </Link>
                </p>
                <button
                  type="button"
                  onClick={() => setAnnounceDismissed(true)}
                  tabIndex={showAnnouncement ? 0 : -1}
                  className="ml-auto shrink-0 p-1 hover:bg-ink/10 sm:absolute sm:right-4"
                  aria-label="Dismiss announcement"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating pill navigation */}
        <header className="frame pt-3">
          <div
            className={`flex items-center justify-between gap-4 rounded-full border py-2 pl-4 pr-2 backdrop-blur-xl transition-all duration-300 sm:pl-5 ${
              scrolled ? 'border-bone/15 bg-ink/85 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]' : 'border-bone/10 bg-ink/55'
            }`}
          >
            <Link to="/" className="shrink-0 rounded-full" aria-label={`${site.name} — home`}>
              <Logo />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors xl:px-4 ${
                          isActive ? 'bg-bone/10 text-clipping' : 'text-bone-dim hover:text-bone'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={site.phoneHref}
                className="hidden h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-bone hover:text-clipping md:inline-flex"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="hidden xl:inline">{site.phone}</span>
                <span className="sr-only xl:hidden">Call {site.phone}</span>
              </a>
              <Link to="/quote" className="btn btn-primary hidden min-h-[44px] px-5 sm:inline-flex">
                Get a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone hover:border-clipping hover:text-clipping lg:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Open menu</span>
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile overlay menu */}
      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex animate-fade-in flex-col overflow-y-auto bg-ink lg:hidden"
        >
          <div className="mow-rule" aria-hidden="true" />
          <div className="frame flex items-center justify-between py-4">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone hover:border-clipping hover:text-clipping"
            >
              <X className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="frame flex-1 pt-6">
            <ul className="divide-y divide-bone/10 border-y border-bone/10">
              {[{ label: 'Home', href: '/' }, ...site.nav, { label: 'FAQ', href: '/faq' }].map((item, i) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      `flex items-baseline justify-between py-4 font-display text-[2rem] leading-none ${isActive ? 'text-clipping' : 'text-bone'}`
                    }
                  >
                    {item.label}
                    <span className="font-sans text-xs text-lichen">{String(i + 1).padStart(2, '0')}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="frame grid gap-3 py-8 sm:grid-cols-2">
            <Link to="/quote" className="btn btn-primary">
              Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call {site.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
