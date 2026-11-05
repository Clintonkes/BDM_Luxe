import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Navigation } from 'lucide-react';
import { site } from '@/config/site';
import Seo from '@/components/Seo';
import Reveal from '@/components/Reveal';
import { CtaBand, Eyebrow, PageHero } from '@/components/ui';

/* Positions on the schematic map (percent of the SVG box), roughly true to
   geography relative to Lucasville. Illustrative, not to scale. */
const pins = {
  Lucasville: [50, 40],
  Minford: [64, 44],
  Portsmouth: [52, 72],
  'West Portsmouth': [41, 70],
  Wheelersburg: [68, 70],
  Sciotoville: [61, 74],
  Otway: [27, 49],
  Waverly: [50, 10],
  Peebles: [10, 30],
};

function AreaMap() {
  return (
    <svg viewBox="0 0 100 90" className="h-full w-full" role="img" aria-labelledby="map-title map-desc">
      <title id="map-title">Schematic map of the BDM Luxe service area</title>
      <desc id="map-desc">
        Lucasville sits at the centre. Regular routes cover Minford, Portsmouth, West Portsmouth, Wheelersburg and Sciotoville within
        about 15 miles; Otway, Waverly and Peebles are served for projects.
      </desc>
      <defs>
        <pattern id="mowpat" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
          <rect width="3" height="6" fill="#EFE8DA" opacity="0.05" />
        </pattern>
      </defs>
      <rect width="100" height="90" fill="url(#mowpat)" />
      {/* Ohio River (schematic) */}
      <path d="M0 80 C 20 76, 30 82, 45 79 S 70 84, 100 74" fill="none" stroke="#A7AE94" strokeOpacity="0.35" strokeWidth="1.6" />
      {/* Scioto River (schematic) */}
      <path d="M48 0 C 50 20, 46 35, 49 50 S 52 70, 50 79" fill="none" stroke="#A7AE94" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="1.5 1.5" />
      {/* Route radius */}
      <circle cx="50" cy="40" r="34" fill="#D7F25C" fillOpacity="0.05" stroke="#D7F25C" strokeOpacity="0.45" strokeWidth="0.4" strokeDasharray="1.2 1.2" />
      <circle cx="50" cy="40" r="18" fill="#D7F25C" fillOpacity="0.07" stroke="#D7F25C" strokeOpacity="0.5" strokeWidth="0.3" />
      {site.serviceArea.map((a) => {
        const [x, y] = pins[a.name] ?? [50, 40];
        const home = a.name === 'Lucasville';
        return (
          <g key={a.name}>
            {home ? (
              <path d={`M${x - 2.6} ${y - 2.6}h5.2v5.2h-5.2z`} fill="#D7F25C" transform={`rotate(45 ${x} ${y})`} />
            ) : (
              <circle cx={x} cy={y} r="1.3" fill="#EFE8DA" />
            )}
            <text x={x + (x > 80 ? -3 : 3)} y={y + 1} fontSize={home ? 3.4 : 2.6} fill={home ? '#D7F25C' : '#CFC7B6'} textAnchor={x > 80 ? 'end' : 'start'} fontFamily="Hanken Grotesk, sans-serif" fontWeight={home ? 700 : 500}>
              {a.name}
            </text>
          </g>
        );
      })}
      <text x="96" y="86" fontSize="2.2" fill="#A7AE94" textAnchor="end" fontFamily="Hanken Grotesk, sans-serif">
        Ohio River · not to scale
      </text>
    </svg>
  );
}

export default function ServiceAreas() {
  const routes = site.serviceArea.filter((a) => parseInt(a.distance, 10) <= 15);
  const projects = site.serviceArea.filter((a) => parseInt(a.distance, 10) > 15);
  return (
    <>
      <Seo
        title="Service Areas — Lucasville, Portsmouth, Wheelersburg & Scioto County"
        description="BDM Luxe serves Lucasville, Minford, Portsmouth, West Portsmouth, Wheelersburg and Sciotoville on weekly routes, plus Otway, Waverly and Peebles for landscape projects."
      />
      <PageHero
        no="M"
        eyebrow="Service areas"
        title={
          <>
            Rooted in Lucasville. <span className="italic text-clipping">Routed across Scioto.</span>
          </>
        }
        intro="Tight routes mean more time on your lawn and less on the road. Here is where our crews run."
      />

      <section aria-labelledby="map-heading" className="frame grid gap-10 py-16 sm:py-24 lg:grid-cols-12">
        <h2 id="map-heading" className="sr-only">
          Map and list of towns served
        </h2>
        <Reveal className="card aspect-[10/9] overflow-hidden p-4 lg:col-span-7" style={{ '--c': '30px' }}>
          <AreaMap />
        </Reveal>

        <div className="space-y-10 lg:col-span-5">
          <div>
            <Eyebrow no="15">Weekly routes · within ~15 miles</Eyebrow>
            <ul className="mt-5 divide-y divide-bone/10 border-y border-bone/10">
              {routes.map((a) => (
                <li key={a.name} className="flex items-center justify-between gap-4 py-4">
                  <span className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-clipping" aria-hidden="true" />
                    <span>
                      <span className="block font-display text-xl">{a.name}</span>
                      <span className="text-xs text-lichen">{a.note}</span>
                    </span>
                  </span>
                  <span className="text-sm tabular-nums text-bone-dim">{a.distance}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow no="30">Projects by arrangement</Eyebrow>
            <ul className="mt-5 divide-y divide-bone/10 border-y border-bone/10">
              {projects.map((a) => (
                <li key={a.name} className="flex items-center justify-between gap-4 py-4">
                  <span className="flex items-center gap-3">
                    <Navigation className="h-4 w-4 text-lichen" aria-hidden="true" />
                    <span>
                      <span className="block font-display text-xl">{a.name}</span>
                      <span className="text-xs text-lichen">{a.note}</span>
                    </span>
                  </span>
                  <span className="text-sm tabular-nums text-bone-dim">{a.distance}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-lichen">Distances are approximate driving miles from our Lucasville base.</p>
        </div>
      </section>

      <section aria-labelledby="outside-title" className="border-y border-bone/10 bg-ink-2">
        <div className="frame grid gap-8 py-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 id="outside-title" className="text-3xl sm:text-4xl">Just outside the map?</h2>
            <p className="mt-4 max-w-md text-bone-dim">
              We take on projects across {site.address.county} and neighbouring Pike and Adams counties when the schedule allows. Commercial
              contracts are considered case by case. Ask — the worst we can say is “not this season.”
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Link to="/contact" className="btn btn-ghost">
              Ask about your town
            </Link>
            <Link to="/quote" className="btn btn-primary">
              Request a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
