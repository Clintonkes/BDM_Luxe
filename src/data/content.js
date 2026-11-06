import { pexels } from '@/lib/img';

/* ── Gallery ───────────────────────────────────────────────────────────
   Representative photography (verified Pexels images) until the owner's own
   project photos are added. The gallery page says so on screen. */
export const galleryCategories = ['All', 'Maintenance', 'Design', 'Hedges & beds', 'Cleanups', 'Hardscape'];

export const gallery = [
  { id: 'allee', src: pexels(27397124), category: 'Design', title: 'Hedge allée & striped turf', alt: 'Long lawn striped by mowing, framed by tall clipped hedges leading to a wooden gate', w: 3, h: 2 },
  { id: 'stripes', src: pexels(280222), category: 'Maintenance', title: 'Front lawn, double-cut stripes', alt: 'White farmhouse-style home behind a bright, evenly striped front lawn under blue sky', w: 3, h: 2 },
  { id: 'shears', src: pexels(38936344), category: 'Hedges & beds', title: 'Hand-finished hedge top', alt: 'Close-up of hands guiding orange-handled hedge shears across a flat-topped hedge', w: 3, h: 2 },
  { id: 'aerial', src: pexels(3280078), category: 'Design', title: 'Formal parterre, aerial', alt: 'Aerial view of geometric garden beds and paths radiating from a central fountain', w: 3, h: 2 },
  { id: 'mower', src: pexels(37554739), category: 'Maintenance', title: 'Evening cut', alt: 'Orange and white mower parked on a lawn at the edge of dark woodland in low light', w: 3, h: 2 },
  { id: 'path', src: pexels(39117267), category: 'Hardscape', title: 'Set-stone garden path', alt: 'Flat stepping stones laid flush with turf, curving past a boulder through planted beds', w: 3, h: 2 },
  { id: 'hedge2', src: pexels(38936351), category: 'Hedges & beds', title: 'Boxwood shaping', alt: 'Gardener in hi-vis workwear clipping the side of a dense boxwood hedge', w: 3, h: 2 },
  { id: 'leaves', src: pexels(20805905), category: 'Cleanups', title: 'Autumn leaf clearance', alt: 'Leaves flying from a blower as a worker clears a wooded garden in autumn', w: 3, h: 2 },
  { id: 'pool', src: pexels(8143675), category: 'Maintenance', title: 'Poolside lawn & specimen tree', alt: 'Manicured lawn with a single young tree beside a swimming pool and brick house', w: 3, h: 2 },
  { id: 'patio', src: pexels(7546775), category: 'Hardscape', title: 'Covered patio & open lawn', alt: 'Modern single-storey home with a covered patio opening onto a wide, even lawn', w: 3, h: 2 },
  { id: 'tractor', src: pexels(39625998), category: 'Maintenance', title: 'Large-site striping', alt: 'Green ride-on mower cutting broad stripes across a large lawn bordered by hedges', w: 3, h: 2 },
  { id: 'formal', src: pexels(4079768), category: 'Hedges & beds', title: 'Formal bed maintenance', alt: 'Groundskeeper trimming the edge of low clipped hedging in a formal garden', w: 3, h: 2 },
  { id: 'blower', src: pexels(9620215), category: 'Cleanups', title: 'Bed & lawn blow-off', alt: 'Worker with a backpack blower clearing fallen leaves from a garden bed', w: 3, h: 2 },
  { id: 'evergreens', src: pexels(4920288), category: 'Hedges & beds', title: 'Arborvitae row trim', alt: 'Smiling groundskeeper with a string trimmer beside a row of tall arborvitae', w: 3, h: 2 },
  { id: 'golden', src: pexels(6728925), category: 'Maintenance', title: 'Golden-hour mowing', alt: 'Low view across sunlit grass toward a push mower in warm evening light', w: 3, h: 2 },
  { id: 'trim', src: pexels(11364122), category: 'Maintenance', title: 'Trimming along hard edges', alt: 'String trimmer line cutting grass along a paved edge, close to the ground', w: 3, h: 2 },
];

/* ── Testimonials ──────────────────────────────────────────────────────
   NOT real reviews. These are clearly marked layout placeholders showing the
   shape of a review; replace each with a verified customer review (with
   permission) before launch. */
export const testimonials = [
  {
    id: 't1',
    quote: 'Replace with a verified review about weekly maintenance: what changed, and what the customer noticed first.',
    name: 'Customer name',
    place: 'Lucasville, OH',
    service: 'Weekly maintenance',
    placeholder: true,
  },
  {
    id: 't2',
    quote: 'Replace with a verified review about a design or bed project: how the plan was explained and how it looks a season later.',
    name: 'Customer name',
    place: 'Wheelersburg, OH',
    service: 'Landscape design',
    placeholder: true,
  },
  {
    id: 't3',
    quote: 'Replace with a verified review from a commercial client: reliability, communication and invoicing.',
    name: 'Property manager',
    place: 'Portsmouth, OH',
    service: 'Commercial grounds',
    placeholder: true,
  },
  {
    id: 't4',
    quote: 'Replace with a verified review about hardscape: how the base was prepared and how it held up through winter.',
    name: 'Customer name',
    place: 'Minford, OH',
    service: 'Hardscape',
    placeholder: true,
  },
  {
    id: 't5',
    quote: 'Replace with a verified review about an autumn cleanup: thoroughness and haul-away.',
    name: 'Customer name',
    place: 'Sciotoville, OH',
    service: 'Seasonal cleanup',
    placeholder: true,
  },
  {
    id: 't6',
    quote: 'Replace with a verified review about hedge shaping: before and after.',
    name: 'Customer name',
    place: 'West Portsmouth, OH',
    service: 'Hedge shaping',
    placeholder: true,
  },
];

/* ── FAQ ───────────────────────────────────────────────────────────── */
export const faqGroups = [
  {
    id: 'start',
    title: 'Getting started',
    items: [
      {
        q: 'How does a quote work?',
        a: 'Send the quote form or call. We arrange a short on-site walk-through (usually within the week), measure the property, talk through what you want, and send a written, itemised quote. It is free and there is no obligation.',
      },
      {
        q: 'Do I need to be home for the walk-through?',
        a: 'It helps for design and hardscape projects, since we will want to talk through how you use the space. For maintenance quotes we can walk the property on our own if the yard is accessible and you tell us about gates, pets or sprinkler heads.',
      },
      {
        q: 'Which areas do you serve?',
        a: 'We are based in Lucasville and cover most of Scioto County, with Portsmouth, Wheelersburg, Minford, Sciotoville and West Portsmouth on regular routes, plus design and install projects in Otway, Waverly and Peebles. See the Service Areas page for the full list.',
      },
      {
        q: 'How soon can you start?',
        a: 'Maintenance routes have limited spots and fill in late winter. Once a quote is accepted we can usually start within one to two weeks in season. Design and hardscape projects are scheduled by date after the plan is approved.',
      },
    ],
  },
  {
    id: 'maintenance',
    title: 'Lawn maintenance',
    items: [
      {
        q: 'Weekly or bi-weekly: which do I need?',
        a: 'In May and June, cool-season grass in southern Ohio can grow an inch or more a week. Bi-weekly mowing at that rate means removing too much blade at once, which stresses the lawn. We recommend weekly through the spring flush, and can move to bi-weekly in the summer slowdown if you prefer.',
      },
      {
        q: 'Do you bag clippings?',
        a: 'Usually not. Mulching clippings returns nitrogen to the soil. We bag on request, for the first cut of spring, or when growth gets ahead of us after heavy rain.',
      },
      {
        q: 'What happens when it rains on my day?',
        a: 'Mowing wet turf tears the grass and ruts the soil. If rain is forecast we shift the route and text you the evening before with your new day, usually the next dry day.',
      },
      {
        q: 'Do you treat weeds and fertilise?',
        a: 'Fertiliser and herbicide applications require state certification in Ohio. Confirm our current application licensing with us directly before booking those services. We can coordinate with a licensed applicator if needed.',
      },
    ],
  },
  {
    id: 'projects',
    title: 'Design & hardscape projects',
    items: [
      {
        q: 'How far ahead should I plan a project?',
        a: 'Late winter is ideal for spring installs; early summer for autumn planting. Autumn is actually the best time to plant trees and shrubs here: the soil is warm and roots establish before winter.',
      },
      {
        q: 'Do you guarantee plants?',
        a: 'Our plant warranty terms are confirmed in writing with each quote. The best warranty is good installation, so we amend clay soil, set root flares at grade and give you a watering schedule for the first year.',
      },
      {
        q: 'Do I need a permit for a patio or wall?',
        a: 'Most residential patios and low garden walls do not need a permit in unincorporated Scioto County, but walls retaining significant soil and work in some municipalities may. We check during the quote and tell you before work starts.',
      },
    ],
  },
  {
    id: 'billing',
    title: 'Billing & policies',
    items: [
      {
        q: 'How do you bill?',
        a: 'Maintenance customers are billed monthly for the visits completed. Projects are quoted as a fixed price with a deposit to schedule and the balance on completion. Commercial contracts are invoiced monthly.',
      },
      {
        q: 'Is there a contract for weekly service?',
        a: 'Residential maintenance is a season agreement you can cancel with two weeks’ notice. Commercial clients usually prefer an annual contract for scheduling and budgeting.',
      },
      {
        q: 'Are you insured?',
        a: 'Proof of insurance is available on request, and commercial clients can ask for a certificate for their vendor file. (Owner: confirm coverage details before publishing.)',
      },
    ],
  },
];

/* ── About ─────────────────────────────────────────────────────────── */
export const values = [
  { title: 'Cut for the season', text: 'Mowing height, pruning timing and planting dates follow the calendar and the species, not a one-size routine.' },
  { title: 'The same faces', text: 'Your property gets the same crew every visit. Standards stay consistent and nobody has to re-learn your yard.' },
  { title: 'Edges are the work', text: 'Crisp transitions between lawn, bed and hardscape are what make a property look kept. We give them real time.' },
  { title: 'Leave it cleaner', text: 'Clippings off the drive, debris hauled away, gates latched. Nothing blown into the street or onto a neighbour’s yard.' },
];

export const credentials = [
  { title: 'Registered Ohio LLC', text: 'BDM Luxe LLC is the business entity for all contracts and invoices.', placeholder: false },
  { title: 'General liability insurance', text: 'Certificate available on request for commercial vendor files.', placeholder: true },
  { title: 'Pesticide applicator licence', text: 'Only list if held: Ohio Department of Agriculture licence number.', placeholder: true },
  { title: 'Industry training', text: 'List any certifications (e.g. landscape or hardscape installer training) once confirmed.', placeholder: true },
];

/* ── Process (home) ────────────────────────────────────────────────── */
export const process = [
  { title: 'Walk the ground', text: 'A free on-site visit. We measure, look at sun, slope and drainage, and listen to how you use the space.' },
  { title: 'Put it in writing', text: 'An itemised quote within two business days: what we will do, how often, and exactly what it costs.' },
  { title: 'Set the route', text: 'Maintenance customers get a fixed route day. Projects get a start date and a crew lead you can call.' },
  { title: 'Keep the standard', text: 'Same crew every visit, a text before any weather change, and a walk-back after every project.' },
];

/* ── Pricing ───────────────────────────────────────────────────────── */
export const plans = [
  {
    id: 'essential',
    name: 'Essential',
    for: 'Tidy, dependable weekly care',
    cadence: 'Weekly or bi-weekly',
    price: '[From $__ / visit]',
  },
  {
    id: 'estate',
    name: 'Estate',
    for: 'Lawn and beds kept to show standard',
    cadence: 'Weekly',
    price: '[From $__ / month]',
    featured: true,
  },
  {
    id: 'atelier',
    name: 'Atelier',
    for: 'Whole-property stewardship, all season',
    cadence: 'Weekly + seasonal visits',
    price: '[Custom quote]',
  },
];

/** true = included, false = not included, string = note. */
export const planFeatures = [
  { label: 'Mowing at seasonal height', values: [true, true, true] },
  { label: 'Hard edging on walks and drives', values: [true, true, true] },
  { label: 'Trimming and clippings blow-off', values: [true, true, true] },
  { label: 'Fixed route day + weather texts', values: [true, true, true] },
  { label: 'Bed weeding', values: [false, 'Monthly', 'Every visit'] },
  { label: 'Bed edge re-cut', values: [false, 'Spring', 'Spring + autumn'] },
  { label: 'Spring mulch refresh', values: [false, 'Add-on', true] },
  { label: 'Hedge & shrub shaping', values: [false, '1 visit', '2 to 3 visits'] },
  { label: 'Spring & autumn cleanups', values: [false, 'Autumn', 'Both'] },
  { label: 'Seasonal colour planting', values: [false, false, true] },
  { label: 'Priority scheduling for projects', values: [false, true, true] },
];

export const priceFactors = [
  { title: 'Mowable area', text: 'Measured on the walk-through, not guessed from the lot size. Slopes and obstacles count.' },
  { title: 'Access', text: 'Gate width matters. A 36-inch gate means a smaller mower and more time than a 60-inch one.' },
  { title: 'Detail work', text: 'Linear feet of edging, number of beds, trees to trim around. This is where the time goes.' },
  { title: 'Condition at start', text: 'An overgrown lawn needs a reset cut or two before regular pricing applies.' },
  { title: 'Frequency', text: 'Weekly visits take less time each than bi-weekly ones, which shows up in the per-visit price.' },
  { title: 'Disposal', text: 'Projects and cleanups include haul-away; heavy debris volumes are quoted upfront.' },
];
