import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { site } from '@/config/site';
import { absoluteUrl, SITE_URL } from '@/lib/paths';

/** Per-page title, description, canonical, Open Graph and optional JSON-LD. */
export default function Seo({ title, description, image, type = 'website', jsonLd, noindex = false }) {
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} | ${site.shortName}` : `${site.shortName} | Lawn Care & Landscaping in Lucasville, OH`;
  const url = absoluteUrl(pathname);
  const ogImage = image || `${SITE_URL}/og-image.png`;
  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}

/** Site-wide LocalBusiness structured data, built from src/config/site.js. */
export function LocalBusinessSchema() {
  const { address: a } = site;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: site.name,
    description: site.description,
    url: `${SITE_URL}/`,
    telephone: site.phone,
    email: site.email,
    image: `${SITE_URL}/og-image.png`,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postal,
      addressCountry: a.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: site.serviceArea.map((s) => ({ '@type': 'City', name: `${s.name}, OH` })),
    openingHoursSpecification: site.hours
      .filter((h) => h.open)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days.map((d) => ({ Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday' })[d]),
        opens: h.open,
        closes: h.close,
      })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
