import { site } from '@/config/site';
import Legal from './Legal';

const sections = [
  { id: 'collect', title: 'What we collect' },
  { id: 'use', title: 'How we use it' },
  { id: 'share', title: 'Who we share it with' },
  { id: 'cookies', title: 'Cookies & local storage' },
  { id: 'retention', title: 'How long we keep it' },
  { id: 'rights', title: 'Your choices' },
  { id: 'contact', title: 'Contact' },
];

export default function Privacy() {
  const a = site.address;
  return (
    <Legal
      seo={{ title: 'Privacy Policy', description: `How ${site.name} collects, uses and protects the information you share through our quote and contact forms.` }}
      no="§"
      eyebrow="Legal"
      title="Privacy policy"
      updated="2026-11-06"
      sections={sections}
    >
      <p>
        {site.name} (“BDM Luxe”, “we”) respects your privacy. This policy explains what information we collect through this website, why, and
        what you can do about it. We keep it short because we collect very little.
      </p>
      <h2 id="collect">What we collect</h2>
      <p>We only collect information you choose to give us:</p>
      <ul>
        <li><strong>Quote requests:</strong> your name, email, phone number, property address, the services you’re interested in and your answers about the property.</li>
        <li><strong>Contact messages:</strong> your name, email, optional phone number, topic and message.</li>
        <li><strong>Technical data:</strong> our hosting providers may log standard request data (IP address, browser type, time of visit) for security and reliability.</li>
      </ul>
      <p>We do not use advertising trackers, sell data, or build marketing profiles.</p>
      <h2 id="use">How we use it</h2>
      <ul>
        <li>To respond to your enquiry, arrange a walk-through and prepare your quote.</li>
        <li>To send you a confirmation of your request and updates about it.</li>
        <li>To schedule and deliver services you have agreed to, and to invoice for them.</li>
      </ul>
      <h2 id="share">Who we share it with</h2>
      <p>We share information only with service providers who help us run the website and respond to you, and only as much as they need:</p>
      <ul>
        <li>Website and server hosting providers.</li>
        <li>A transactional email provider, used to send confirmation emails.</li>
      </ul>
      <p>We may disclose information if required by law. We never sell or rent your personal information.</p>
      <h2 id="cookies">Cookies & local storage</h2>
      <p>
        This site does not set advertising or analytics cookies. It uses your browser’s local storage to remember small preferences — for example,
        that you dismissed the announcement bar or answered the cookie notice. You can clear this at any time in your browser settings.
      </p>
      <h2 id="retention">How long we keep it</h2>
      <p>
        Enquiries that don’t become work are deleted within 24 months. Customer records are kept for as long as needed to provide service and to
        meet tax and accounting obligations.
      </p>
      <h2 id="rights">Your choices</h2>
      <p>
        You can ask us to show, correct or delete the personal information we hold about you at any time. Email us and we will respond within 30 days.
      </p>
      <h2 id="contact">Contact</h2>
      <p>
        {site.name}, {a.street}, {a.city}, {a.region} {a.postal}. Email <a href={site.emailHref}>{site.email}</a> or call{' '}
        <a href={site.phoneHref}>{site.phone}</a>.
      </p>
    </Legal>
  );
}
