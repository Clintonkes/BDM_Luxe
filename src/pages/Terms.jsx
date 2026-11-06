import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import Legal from './Legal';

const sections = [
  { id: 'site', title: 'Using this website' },
  { id: 'quotes', title: 'Quotes' },
  { id: 'service', title: 'Scheduling & weather' },
  { id: 'access', title: 'Property access' },
  { id: 'billing', title: 'Billing & cancellation' },
  { id: 'liability', title: 'Liability' },
  { id: 'law', title: 'Governing law' },
];

export default function Terms() {
  return (
    <Legal
      seo={{ title: 'Terms of Service', description: `Terms for using the ${site.name} website and for quotes, scheduling, access and billing for lawn care and landscaping services.` }}
      no="§"
      eyebrow="Legal"
      title="Terms of service"
      updated="2026-11-06"
      sections={sections}
    >
      <p>
        These terms apply to this website and, together with your written quote or service agreement, to work carried out by {site.name}. Where a signed
        agreement says something different, the agreement wins.
      </p>
      <h2 id="site">Using this website</h2>
      <p>
        Content on this site is provided for general information. Lawn care advice in our Journal is general guidance for southern Ohio and may not
        suit every property. Photography marked as representative illustrates the standard of work and is not a record of specific BDM Luxe projects.
      </p>
      <h2 id="quotes">Quotes</h2>
      <ul>
        <li>Submitting a quote request does not create a contract or commit you to anything.</li>
        <li>Written quotes are valid for 30 days and are based on the property as seen on the walk-through.</li>
        <li>If conditions differ significantly from what we saw (for example, hidden debris or drainage problems), we will discuss any change before doing extra work.</li>
      </ul>
      <h2 id="service">Scheduling & weather</h2>
      <p>
        Maintenance visits happen on your route day. We do not mow saturated turf; when weather forces a change we will let you know and reschedule to the next
        suitable day. Project dates are estimates and may move with weather or material availability.
      </p>
      <h2 id="access">Property access</h2>
      <ul>
        <li>Please make sure gates are unlocked and pets are secured on service days.</li>
        <li>Tell us about sprinkler heads, invisible dog fences, low-voltage lighting and other hidden features. We cannot be responsible for damage to unmarked features.</li>
        <li>Please clear toys, hoses and furniture from lawn areas where practical.</li>
      </ul>
      <h2 id="billing">Billing & cancellation</h2>
      <ul>
        <li>Maintenance is invoiced monthly for completed visits; payment is due within 15 days.</li>
        <li>Residential maintenance agreements can be cancelled with two weeks’ written notice.</li>
        <li>Projects require a deposit to schedule, with the balance due on completion. Deposit terms are stated on your quote.</li>
      </ul>
      <h2 id="liability">Liability</h2>
      <p>
        We take care to protect your property. If something is damaged through our work, tell us within 48 hours and we will put it right or agree fair
        compensation. We are not liable for pre-existing conditions, unmarked hidden features, or plant losses caused by drought, flooding, pests or lack of
        watering after installation.
      </p>
      <h2 id="law">Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Ohio. Questions? <Link to="/contact">Contact us</Link>; most things are easier sorted on the phone
        at <a href={site.phoneHref}>{site.phone}</a>.
      </p>
    </Legal>
  );
}
