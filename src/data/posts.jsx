import { Link } from 'react-router-dom';
import { pexels } from '@/lib/img';

/* Journal posts. Bodies are JSX so they can link to other pages. */
export const posts = [
  {
    slug: 'when-to-start-mowing-in-southern-ohio',
    title: 'When to start mowing in southern Ohio, and how high to cut',
    excerpt:
      'The first cut of the year sets up the whole season. Here is how to time it by soil temperature, not the calendar, and the mowing heights we use month by month.',
    category: 'Lawn care',
    date: '2026-03-02',
    readMins: 6,
    image: pexels(6728925),
    alt: 'Low view across sunlit grass toward a push mower in warm spring light',
    body: (
      <>
        <p>
          Every spring the same question comes in: <em>when should the first mow happen?</em> In Scioto County the honest
          answer is “later than you think, and higher than you think.” Cool-season lawns (the tall fescue,
          Kentucky bluegrass and ryegrass blends that make up most yards here) wake up on soil temperature, and
          cutting too early or too short costs you the rest of the season.
        </p>

        <h2>Time it by the soil, not the date</h2>
        <p>
          Cool-season grass starts active growth once soil at a two-inch depth holds around 50°F for several days.
          In the Lucasville and Portsmouth area that usually lands somewhere between late March and mid-April, depending
          on the year. Two easy signals:
        </p>
        <ul>
          <li>Forsythia is in full bloom, a reliable natural soil-temperature marker.</li>
          <li>The lawn has visibly grown about an inch past its winter height and is greening evenly, not just in patches.</li>
        </ul>
        <p>
          Before that, the ground is often soft. Mowing saturated clay (and most of southern Ohio is clay) compacts
          it and leaves ruts that last into summer. If your shoe sinks when you walk across the lawn, wait.
        </p>

        <h2>The one-third rule</h2>
        <p>
          Never remove more than a third of the grass blade in a single cut. Taking more forces the plant to pull
          from its root reserves to regrow leaf, right when it should be building roots for summer. If the lawn
          has got away from you, bring it down in two cuts a few days apart rather than one scalping pass.
        </p>

        <h2>Mowing heights we use, month by month</h2>
        <table>
          <thead>
            <tr>
              <th scope="col">Period</th>
              <th scope="col">Height (tall fescue blends)</th>
              <th scope="col">Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>First cut (late Mar to Apr)</td>
              <td>3 in</td>
              <td>Tidies winter growth without stressing waking roots.</td>
            </tr>
            <tr>
              <td>May to June</td>
              <td>3.5 in</td>
              <td>Peak growth; height shades out crabgrass seedlings.</td>
            </tr>
            <tr>
              <td>July to August</td>
              <td>4 in</td>
              <td>Taller blades shade the soil and hold moisture through heat.</td>
            </tr>
            <tr>
              <td>September to October</td>
              <td>3.5 in</td>
              <td>Recovery season; supports autumn root growth.</td>
            </tr>
            <tr>
              <td>Final cuts (Nov)</td>
              <td>2.5 to 3 in</td>
              <td>Shorter going into winter reduces snow mould risk.</td>
            </tr>
          </tbody>
        </table>
        <p>
          Kentucky bluegrass-heavy lawns can sit about half an inch lower in each band. If you are not sure what
          you have, err on the higher side; cutting too tall is very rarely the problem.
        </p>

        <h2>Sharp blades matter more than the mower</h2>
        <p>
          A dull blade tears the leaf instead of slicing it. The torn tips brown within a day or two, giving the
          whole lawn a greyish cast, and the ragged wounds are an easy entry for fungal disease in humid weather.
          Sharpen at least once a season for a home mower; we sharpen weekly because we cut every day.
        </p>

        <blockquote>Mow high, mow often, and keep the blade sharp. Almost everything else is detail.</blockquote>

        <h2>Leave the clippings</h2>
        <p>
          With the one-third rule followed, clippings are short enough to fall between the blades and break down
          within days. They return nitrogen to the soil and do not cause thatch. Thatch is made of roots and
          stems, not leaf clippings. Bag only when the grass is long or wet enough to clump.
        </p>

        <h2>Quick checklist for your first mow</h2>
        <ol>
          <li>Wait for forsythia bloom and dry, firm ground.</li>
          <li>Clear sticks, stones and winter debris first.</li>
          <li>Set the deck to 3 inches and sharpen the blade.</li>
          <li>Mow in a different direction from your last cut of autumn.</li>
          <li>Edge beds and walks once, to set clean lines for the season.</li>
        </ol>
        <p>
          Would rather hand the whole thing over? Our <Link to="/services/weekly-maintenance">weekly maintenance</Link>{' '}
          routes follow exactly this calendar.{' '}
          <Link to="/quote">Request a walk-through</Link> and we will put you on a route day.
        </p>
      </>
    ),
  },
  {
    slug: 'mulch-depth-and-edging-guide',
    title: 'Mulch depth and bed edging: a field guide',
    excerpt:
      'How deep mulch should really be, why “mulch volcanoes” kill trees, and how to cut a spade edge that lasts all season instead of a month.',
    category: 'Beds & borders',
    date: '2026-04-14',
    readMins: 7,
    image: pexels(4079768),
    alt: 'Groundskeeper trimming low clipped hedging beside a crisp bed edge in a formal garden',
    body: (
      <>
        <p>
          Fresh mulch and sharp bed edges are the fastest way to make a property look cared for. They are also two
          of the most commonly over-done jobs in landscaping. Here is what we do, and why.
        </p>

        <h2>How deep should mulch be?</h2>
        <p>
          <strong>Two to three inches, settled.</strong> That is enough to block light from weed seeds and slow
          evaporation, while still letting water and air reach the soil. Less than two inches and weeds push
          through; more than four and you start to cause problems:
        </p>
        <ul>
          <li>Water sheds off the top instead of soaking in, so plants go thirsty under a “moist-looking” bed.</li>
          <li>Roots grow up into the mulch layer, where they dry out and freeze more easily.</li>
          <li>In our heavy clay, a thick layer on top of slow-draining soil keeps the root zone waterlogged.</li>
        </ul>
        <p>
          If last year’s mulch is still an inch or two deep, you only need a light top-up, or simply rake and
          refresh what is there. Piling a new three inches on every spring is how beds end up eight inches deep.
        </p>

        <h2>Never build a mulch volcano</h2>
        <p>
          Mulch heaped against a tree trunk is one of the most common, and most damaging, sights in residential
          landscaping. Bark is not meant to stay wet. Constant moisture against the trunk invites rot, fungal
          cankers and voles, which tunnel in and chew the bark in winter.
        </p>
        <p>
          The fix is simple: pull mulch back so the <strong>root flare</strong> (where the trunk widens into the
          roots) is visible, leaving a gap of three to six inches. Think doughnut, not volcano. The same applies to
          shrub stems and perennial crowns.
        </p>

        <h2>Which mulch?</h2>
        <table>
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Good for</th>
              <th scope="col">Watch for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Double-shredded hardwood</td>
              <td>Most beds; knits together and stays put on slopes</td>
              <td>Fades to grey within a season</td>
            </tr>
            <tr>
              <td>Dyed (black / brown)</td>
              <td>Holding colour all summer; strong contrast with turf</td>
              <td>Choose products made from clean wood, not pallets</td>
            </tr>
            <tr>
              <td>Cedar</td>
              <td>Slow to break down; pleasant scent</td>
              <td>Lighter, can float off in heavy rain</td>
            </tr>
            <tr>
              <td>Pine bark nuggets</td>
              <td>Acid-loving plants like azaleas and hollies</td>
              <td>Washes out on any slope</td>
            </tr>
          </tbody>
        </table>

        <h2>Cutting a spade edge that lasts</h2>
        <p>
          A string-trimmed edge looks neat for a week. A proper spade edge holds its line for the whole season. The
          method:
        </p>
        <ol>
          <li>
            <strong>Mark the line.</strong> Use a garden hose for curves or a string line for straight runs. Smooth,
            generous curves are easier to mow around than tight wiggles.
          </li>
          <li>
            <strong>Cut vertically on the lawn side.</strong> Drive a flat edging spade straight down 3 to 4 inches
            along the line. The vertical face is what stops grass roots creeping into the bed.
          </li>
          <li>
            <strong>Bevel on the bed side.</strong> Angle back from the bottom of the cut toward the bed, creating a
            small V-shaped trench. Lift out the wedge of soil and turf.
          </li>
          <li>
            <strong>Leave the trench open.</strong> Mulch should finish just below the turf, filling the bed but not
            the trench. That shadow line is what makes an edge look crisp.
          </li>
        </ol>
        <p>
          Re-cut in spring, and touch up lightly mid-summer where Bermuda or creeping grasses try to bridge the gap.
        </p>

        <h2>When to mulch</h2>
        <p>
          Mid to late spring, once the soil has warmed, usually late April to May in southern Ohio. Mulching
          cold, wet soil in March keeps it cold longer and delays plant growth. A light autumn top-up after leaf
          cleanup helps insulate perennials through winter.
        </p>

        <p>
          Our <Link to="/services/bed-care">bed care service</Link> does all of the above in a single visit: edge,
          weed, mulch at the right depth and clear trunks.{' '}
          <Link to="/quote">Get a quote for your beds</Link>.
        </p>
      </>
    ),
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
