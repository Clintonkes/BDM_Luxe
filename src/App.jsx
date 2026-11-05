import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';

// Home ships in the main bundle; every other page is split into its own chunk.
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const ServiceAreas = lazy(() => import('@/pages/ServiceAreas'));
const Testimonials = lazy(() => import('@/pages/Testimonials'));
const Faq = lazy(() => import('@/pages/Faq'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Quote = lazy(() => import('@/pages/Quote'));
const Contact = lazy(() => import('@/pages/Contact'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="mow-loader" aria-hidden="true" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Lazy el={<About />} />} />
        <Route path="services" element={<Lazy el={<Services />} />} />
        <Route path="services/:slug" element={<Lazy el={<ServiceDetail />} />} />
        <Route path="pricing" element={<Lazy el={<Pricing />} />} />
        <Route path="gallery" element={<Lazy el={<Gallery />} />} />
        <Route path="service-areas" element={<Lazy el={<ServiceAreas />} />} />
        <Route path="testimonials" element={<Lazy el={<Testimonials />} />} />
        <Route path="faq" element={<Lazy el={<Faq />} />} />
        <Route path="blog" element={<Lazy el={<Blog />} />} />
        <Route path="blog/:slug" element={<Lazy el={<BlogPost />} />} />
        <Route path="quote" element={<Lazy el={<Quote />} />} />
        <Route path="contact" element={<Lazy el={<Contact />} />} />
        <Route path="privacy" element={<Lazy el={<Privacy />} />} />
        <Route path="terms" element={<Lazy el={<Terms />} />} />
        <Route path="*" element={<Lazy el={<NotFound />} />} />
      </Route>
    </Routes>
  );
}

function Lazy({ el }) {
  return <Suspense fallback={<PageFallback />}>{el}</Suspense>;
}
