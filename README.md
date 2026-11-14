# Masar Arabia — Corporate Website

Website for **Masar Arabia First Trading Company** (Jeddah, Saudi Arabia) — a leading supplier of industrial
products: cooling solutions, water treatment, chemicals, electrical, instrumentation, mechanical,
pipe fittings & alloys, and safety equipment.

| Part | Stack | Folder |
| --- | --- | --- |
| Website + admin panel | Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · GSAP | [`frontend/`](frontend/) |
| API (forms, admin panel, blog) | Django 5 · Django REST Framework · SQLite | [`backend/`](backend/) |
| Server setup | Ubuntu Droplet · Nginx · systemd | [`deploy/`](deploy/) |

The site is hosted on a DigitalOcean Droplet — setup, HTTPS and publishing updates are in
[`deploy/README.md`](deploy/README.md).

---

## Run locally

**Backend**

```bash
cd backend
python -m venv venv
venv\Scripts\activate            # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser # login for the admin panel
python manage.py runserver 8000
```

**Frontend** (proxies `/api` and `/media` to the backend in development)

```bash
cd frontend
npm install
npm run dev                      # http://localhost:3000 — admin panel at /admin
```

On Windows you can also use `run_backend.bat` / `run_frontend.bat`.

Optional `backend/.env` for local work (defaults are fine for development):

```
SECRET_KEY=change-me
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

Run the backend tests with `python manage.py test api`.

### API

- `POST /api/rfq/` — quote request (returns an `RFQ-MA-XXXXXX` reference) · `POST /api/contact/` — general enquiry
- `GET /api/site-settings/` — contact details shown on the website (edited in the admin panel)
- `GET /api/blog/` · `GET /api/blog/<slug>/` · `GET /api/blog/categories/` — published blog posts
- `/api/panel/…` — admin panel API (staff login required)
- `GET /api/health/`

## Pages

| URL | Page |
| --- | --- |
| `/` | Home |
| `/about` | About Us (+ Why Choose Us, clients) |
| `/products` | Products catalogue (8 divisions) |
| `/products/[slug]` · `/products/[slug]/[product]` · `…/valves/[valve]` | Division, product and valve pages (pre-rendered) |
| `/product-range` | Showroom product range |
| `/industries` · `/brands` · `/clients` | Industries served, brands, client logos |
| `/blog` · `/blog/[slug]` | Blog, written and published in the admin panel |
| `/contact` | Contact details + quote form — `/contact?product=Metal%20Valves` pre-fills the form |
| `/admin` | Admin panel: enquiries, blog, contact details, team |

Also generated: `/sitemap.xml` (including blog posts), `/robots.txt` and a branded 404 page. Old
`masararabia.com/*.php` addresses redirect to the matching new pages (`frontend/next.config.mjs`).

Product content (divisions, products, clients) lives in
[`frontend/src/lib/masarContent.ts`](frontend/src/lib/masarContent.ts) and
[`frontend/src/lib/catalog.ts`](frontend/src/lib/catalog.ts); page titles, descriptions and structured
data in [`frontend/src/lib/seo.ts`](frontend/src/lib/seo.ts).
