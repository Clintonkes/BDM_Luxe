# BDM Luxe LLC

Marketing site and quote/contact backend for **BDM Luxe LLC**, a lawn care and landscaping company in Lucasville, Ohio (Scioto County).

- **Frontend**: React 18, Vite, React Router, Tailwind and react-helmet-async, in `src/`. Deployed to GitHub Pages by `.github/workflows/frontend.yml` on every push to `main`.
- **Backend**: FastAPI and SQLAlchemy, in `backend/`. Deployed to Render from `render.yaml` and the `Dockerfile`.

## Where things live

| What | File |
| --- | --- |
| Business details, colours, fonts, nav, hours, service areas, trust signals, form settings | `src/config/site.js` (read by Tailwind and Vite too) |
| Services (cards and `/services/:slug` detail pages) | `src/data/services.js` |
| Gallery, testimonials, FAQ, team, credentials, pricing plans | `src/data/content.js` |
| Journal posts | `src/data/posts.jsx` |
| Form submission (the single submit function) | `src/lib/submitForm.js` |
| Logo | `src/components/Logo.jsx`, `public/favicon.svg` |

Items marked **Placeholder** on the site (trust signals, reviews, team names, prices, credentials, social links) need the owner to confirm or replace them before launch. The photos are verified Pexels images used as representative photography.

## Routes

`/`, `/about`, `/services`, `/services/:slug` (7 services), `/pricing`, `/gallery`, `/service-areas`, `/testimonials`, `/faq`, `/blog`, `/blog/:slug` (2 posts), `/quote`, `/contact`, `/privacy`, `/terms`, and a custom 404.

## Forms → backend

| Form | Endpoint | Notes |
| --- | --- | --- |
| Quote wizard (`/quote`) | `POST /api/bookings` | The service, frequency, lot size, preferred date/time and address map to their own columns. All other answers go into `notes`. The returned `reference` is shown on the confirmation screen. |
| Contact (`/contact`) | `POST /api/contacts` | The topic is stored as `subject`. |

Each submission is saved, the customer gets a confirmation email, and `ADMIN_EMAIL` gets a notification. Replying to that notification goes straight to the customer.

If `VITE_API_URL` is not set, the forms run in demo mode (dev and production): visitors see the success screen, but nothing is stored or emailed. Set `VITE_API_URL` once the backend is deployed.

## Local development

```bash
# backend (uses a local SQLite file unless DATABASE_URL is set)
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
ADMIN_PASSWORD=devpass123 uvicorn main:app --reload   # http://localhost:8000, docs at /docs

# frontend
cp .env.example .env               # VITE_API_URL=http://localhost:8000
npm install
npm run dev                        # http://localhost:5173
```

Checks: `npm run lint` and `npm run build`. To test a production build locally against the backend, run `npm run preview` (port 4173) and start the backend with `CORS_ORIGINS=http://localhost:4173`.

## Deploying

### 1. Backend (Render)

1. Render → New → Blueprint → pick this repo. It creates `bdm-luxe-backend` from `render.yaml`.
2. Set these environment variables:
   - `DATABASE_URL`: a Postgres database (for example Neon).
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD`: the admin API login. New quote and contact notifications go to `ADMIN_EMAIL`.
   - `RESEND_API_KEY` and `EMAIL_FROM`: optional. Without them, emails are logged instead of sent.
   - `CORS_ORIGINS`: optional extra frontend origins. bdmluxe.com is already allowed.
3. Check that `https://<service>.onrender.com/api/health` returns `{"status":"ok"}`.

The free Render plan sleeps when idle, so the first submission after a quiet spell can take up to a minute. The forms wait 75 s and tell the visitor what's happening.

### 2. Frontend (GitHub Pages)

1. Repo → Settings → Pages → Source: **GitHub Actions**.
2. Repo → Settings → Secrets and variables → Actions → **Variables**: set `VITE_API_URL` to the Render URL.
3. Push to `main`, or open Actions → "Deploy Frontend to GitHub Pages" → Run workflow.

The site is live at **https://bdmluxe.com** (the github.io URL, https://clintonkes.github.io/BDM_Luxe/, redirects there).

### 3. Custom domain (bdmluxe.com, set up)

The same build works under `/BDM_Luxe/` and at a domain root. The router base and asset URLs are worked out in the browser (`src/lib/paths.js`, `vite.config.js`), and `public/404.html` handles deep links in both cases.

1. At your registrar, add these DNS records:
   - `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www`: `clintonkes.github.io`
2. Repo → Settings → Pages → **Custom domain**: enter the domain, then tick **Enforce HTTPS** once the certificate is issued.
3. Add the repo variable `CUSTOM_DOMAIN` (for example `example.com`) and re-run the workflow. This points canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt` at the domain.
4. `https://bdmluxe.com`, `https://www.bdmluxe.com` and `https://clintonkes.github.io` are already allowed in `backend/main.py`, so `CORS_ORIGINS` can stay empty.

Once the domain is attached, GitHub redirects the github.io link to it, so both links keep working.

### Admin

There is no admin UI. Use the admin API from `https://<service>.onrender.com/docs`:

1. `POST /api/admin/login` to get a token.
2. List, update or delete bookings and contacts, or call `GET /api/admin/dashboard` for counts.

Changing a booking's status emails the customer. To set the credentials, use `ADMIN_EMAIL`/`ADMIN_PASSWORD` or run `python backend/set_admin.py <email> <password>`.
