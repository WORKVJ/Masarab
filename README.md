# Masar Arabia — Corporate Website

Website for **Masar Arabia First Trading Company** (Jeddah, Saudi Arabia) — a leading supplier of industrial
products: cooling solutions, water treatment, chemicals, electrical, instrumentation, mechanical,
pipe fittings & alloys, and safety equipment.

| Part | Stack | Folder |
| --- | --- | --- |
| Website (frontend) | Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · GSAP + Lenis | [`frontend/`](frontend/) |
| RFQ / content API (optional) | Django 5 · Django REST Framework · SQLite (PostgreSQL-ready) | [`backend/`](backend/) |

---

## Deploy the website to Vercel

1. In Vercel, **Add New → Project** and import this GitHub repository.
2. Set **Root Directory** to **`frontend`** (Vercel then auto-detects Next.js — no other build settings needed).
3. *(Optional)* Under **Environment Variables**, add `NEXT_PUBLIC_API_URL` pointing to a deployed Django backend,
   e.g. `https://api.example.com/api`. See [`frontend/.env.example`](frontend/.env.example).
4. Click **Deploy**.

**Without a backend** the site is fully functional: all content is built in, and the quote form offers a
pre-filled **"Send by email instead"** button (to `info@masararabia.com`) so no enquiry is lost.
**With a backend**, quote requests are saved and get a reference number (`RFQ-MA-XXXXXX`).

> The Django backend is a separate service — host it on a Python platform (Railway, Render, a VPS, …),
> set `ALLOWED_HOSTS` and add the Vercel domain to `CORS_ALLOWED_ORIGINS` in its environment.

---

## Run locally

**Frontend**

```bash
cd frontend
npm install
npm run dev          # http://localhost:3000
```

**Backend (optional)**

```bash
cd backend
python -m venv venv
venv\Scripts\activate            # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python seed_data.py              # optional sample catalogue
python manage.py createsuperuser # admin login for /admin
python manage.py runserver 8000  # http://127.0.0.1:8000/api/
```

Create `backend/.env` with:

```
SECRET_KEY=change-me
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

On Windows you can also use `run_frontend.bat` / `run_backend.bat`.

### API endpoints

- `GET /api/health/`
- `GET /api/categories/` · `GET /api/products/` · `GET /api/projects/`
- `POST /api/rfq/` — quote request (returns an `RFQ-MA-XXXXXX` reference)
- `POST /api/contact/` — general enquiry

## Pages

| URL | Page |
| --- | --- |
| `/` | Home |
| `/about` | About Us (+ Why Choose Us, clients) |
| `/products` | Products catalog (8-category explorer) |
| `/products/[slug]` | One page per category, e.g. `/products/water-treatment` (pre-rendered) |
| `/product-range` | Showroom product range (16 lines) |
| `/industries` | Industries served |
| `/clients` | Client logos |
| `/contact` | Contact details + quote form — `/contact?product=Metal%20Valves` pre-fills the form |

Also generated: `/sitemap.xml`, `/robots.txt` and a branded 404 page. Every page shares the navbar,
footer, smooth scrolling and animations (see `src/app/layout.tsx` and `src/components/motion/`).

Site content (categories, products, clients, contact details) lives in
[`frontend/src/lib/masarContent.ts`](frontend/src/lib/masarContent.ts); the page list and URLs live in
[`frontend/src/lib/routes.ts`](frontend/src/lib/routes.ts).
