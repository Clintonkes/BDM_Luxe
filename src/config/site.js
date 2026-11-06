/**
 * BDM Luxe: single source of truth.
 * Business details, brand colours, fonts, navigation and form settings all live
 * here. tailwind.config.js and vite.config.js read this file too, so a change
 * here flows through the whole site (and sitemap/JSON-LD) on the next build.
 * Keep this file free of imports: it is loaded by Node at build time.
 */

export const site = {
  name: 'BDM Luxe LLC',
  shortName: 'BDM Luxe',
  legalName: 'BDM Luxe LLC',
  industry: 'Lawn care & landscaping',
  tagline: 'Lawn & Landscape Atelier',
  promise: 'Grounds kept to a tailored standard.',
  description:
    'BDM Luxe is an owner-operated lawn care and landscaping company in Lucasville, Ohio, serving Scioto County with weekly maintenance, landscape design, bed care, hardscape and commercial grounds care.',

  phone: '740-727-0803',
  phoneHref: 'tel:+17407270803',
  email: 'bdmluxe@proton.me',
  emailHref: 'mailto:bdmluxe@proton.me',

  address: {
    street: '178 Brooksville Drive',
    city: 'Lucasville',
    region: 'OH',
    postal: '45648',
    country: 'US',
    county: 'Scioto County',
  },
  // Approximate centre of Lucasville, used for the JSON-LD geo field only.
  geo: { lat: 38.8795, lng: -82.9969 },

  hours: [
    { label: 'Monday to Friday', short: 'Mon to Fri', days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], open: '08:00', close: '18:00', value: '8:00 am to 6:00 pm' },
    { label: 'Saturday', short: 'Sat', days: ['Sa'], open: '09:00', close: '14:00', value: '9:00 am to 2:00 pm' },
    { label: 'Sunday', short: 'Sun', days: ['Su'], open: null, close: null, value: 'Closed' },
  ],

  serviceArea: [
    { name: 'Lucasville', note: 'Home base, first-call priority', distance: '0 mi' },
    { name: 'Minford', note: 'Weekly maintenance routes', distance: '8 mi' },
    { name: 'Portsmouth', note: 'Residential & commercial', distance: '11 mi' },
    { name: 'West Portsmouth', note: 'Residential & commercial', distance: '12 mi' },
    { name: 'Wheelersburg', note: 'Weekly maintenance routes', distance: '14 mi' },
    { name: 'Sciotoville', note: 'Residential routes', distance: '15 mi' },
    { name: 'Otway', note: 'Design & install projects', distance: '17 mi' },
    { name: 'Waverly', note: 'Design & install projects', distance: '22 mi' },
    { name: 'Peebles', note: 'Projects by arrangement', distance: '28 mi' },
  ],

  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/', placeholder: true },
    { label: 'Instagram', href: 'https://www.instagram.com/', placeholder: true },
    { label: 'Google Business Profile', href: 'https://www.google.com/business/', placeholder: true },
  ],

  announcement: {
    text: 'Spring 2027 maintenance routes are filling. Book a free walk-through for Scioto County.',
    linkLabel: 'Request a quote',
    href: '/quote',
  },

  /** Brand palette. Tailwind utilities are generated from these names. */
  colors: {
    ink: '#121410', // page background: near-black with a soil undertone
    loam: '#2A2620', // raised surfaces, cards
    bone: '#EFE8DA', // primary text on dark, light sections
    lichen: '#A7AE94', // secondary text, rules
    clipping: '#D7F25C', // the single bold accent: fresh-cut chartreuse
  },

  fonts: {
    display: 'Gloock',
    body: 'Hanken Grotesk',
    googleHref:
      'https://fonts.googleapis.com/css2?family=Gloock&family=Hanken+Grotesk:wght@400;500;600;700&display=swap',
  },

  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Work', href: '/gallery' },
    { label: 'Areas', href: '/service-areas' },
    { label: 'About', href: '/about' },
    { label: 'Journal', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],

  footerNav: [
    {
      heading: 'Studio',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Our work', href: '/gallery' },
        { label: 'Testimonials', href: '/testimonials' },
        { label: 'Journal', href: '/blog' },
      ],
    },
    {
      heading: 'Services',
      links: [
        { label: 'All services', href: '/services' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Service areas', href: '/service-areas' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
    {
      heading: 'Get in touch',
      links: [
        { label: 'Request a quote', href: '/quote' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
  ],

  formSettings: {
    /**
     * Base URL of the FastAPI backend in backend/. Leave empty here and set
     * VITE_API_URL at build time (GitHub repo variable / local .env); that
     * value takes precedence. Quote posts to `${apiUrl}/api/bookings`,
     * contact posts to `${apiUrl}/api/contacts`.
     */
    apiUrl: '',
    endpoints: { quote: '/api/bookings', contact: '/api/contacts' },
    // The free Render plan sleeps when idle; the first request can take ~60s.
    timeoutMs: 75000,
    slowNoticeMs: 6000,
    minMessageLength: 15,
    replyPromise: 'The owner reads every request personally and replies within one business day.',
  },

  /** Trust signals. Everything marked placeholder must be confirmed by the owner. */
  trust: [
    { key: 'insured', label: 'Licensed & insured', detail: 'Policy details on request', placeholder: true },
    { key: 'guarantee', label: 'Re-visit guarantee', detail: 'Missed something? We come back free', placeholder: true },
    { key: 'years', label: '[X] seasons in Scioto County', detail: 'Owner to confirm', placeholder: true },
    { key: 'stars', label: '[X.X] ★ average rating', detail: 'Link verified reviews', placeholder: true },
  ],

  deploy: {
    // GitHub Pages project path. The router and 404.html use this to work on
    // both https://clintonkes.github.io/BDM_Luxe/ and a custom domain root.
    repoBase: 'BDM_Luxe',
    githubUrl: 'https://clintonkes.github.io/BDM_Luxe',
  },
};

/** Every public route, used by the sitemap generator in vite.config.js. */
export const routes = [
  '/',
  '/about',
  '/services',
  '/services/weekly-maintenance',
  '/services/landscape-design',
  '/services/bed-care',
  '/services/hardscape',
  '/services/hedge-shaping',
  '/services/seasonal-cleanups',
  '/services/commercial',
  '/pricing',
  '/gallery',
  '/service-areas',
  '/testimonials',
  '/faq',
  '/blog',
  '/blog/when-to-start-mowing-in-southern-ohio',
  '/blog/mulch-depth-and-edging-guide',
  '/quote',
  '/contact',
  '/privacy',
  '/terms',
];
