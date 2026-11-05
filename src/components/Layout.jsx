import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { BackToTop, CookieBanner, MobileCallBar, ScrollToTop } from './Chrome';
import { LocalBusinessSchema } from './Seo';

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <a
        href="#main"
        className="cut fixed left-4 top-3 z-[70] -translate-y-24 px-4 py-3 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
        style={{ '--c': '8px', '--edge': '#D7F25C', '--fill': '#D7F25C' }}
      >
        Skip to content
      </a>
      <LocalBusinessSchema />
      <ScrollToTop />
      <Header />
      {/* Keyed on the path so each page plays the entrance transition. */}
      <main id="main" tabIndex={-1} key={pathname} className="animate-page-in focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <MobileCallBar />
      <BackToTop />
      <CookieBanner />
    </>
  );
}
