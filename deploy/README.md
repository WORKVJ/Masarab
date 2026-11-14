# Hosting on a DigitalOcean Droplet

One $6/mo Droplet (Ubuntu 24.04, 1 GB RAM, Frankfurt) runs everything:

| Part | Runs as | Port |
| --- | --- | --- |
| Website (Next.js standalone build) | `masar-web` service | 127.0.0.1:3000 |
| Quote / contact form backend (Django + Gunicorn) | `masar-api` service | 127.0.0.1:8000 |
| Nginx (public entry, HTTPS) | `nginx` | 80 / 443 |

Nginx sends `/api/*`, `/django-admin/*` and `/static/*` to Django and everything else to the website, so
the forms and the admin panel talk to the same domain (no CORS). Code lives in `/srv/masar/app`, website builds in
`/srv/masar/web/releases/*` (the `current` symlink is live), enquiry backups in `/srv/masar/backups`.

## 1. First-time setup

SSH in as root and run:

```bash
apt-get update && apt-get install -y git
git clone https://github.com/WORKVJ/Masarab.git /tmp/masar && bash /tmp/masar/deploy/setup.sh
```

(If the repository is private, add a read-only *Deploy key* for the Droplet in GitHub → repo →
Settings → Deploy keys and clone with `REPO=git@github.com:WORKVJ/Masarab.git`.)

When it finishes, open `http://<droplet-ip>` — the full site should load.

## 2. Admin panel

The team's panel is at **`/admin`** on the website: dashboard, quote requests and contact messages
(status, internal notes, CSV export), the company contact details shown on the site, team accounts and
password changes. Create the first administrator on the Droplet:

```bash
cd /srv/masar/app/backend && sudo -u masar /srv/masar/venv/bin/python manage.py createsuperuser
```

Further accounts are added in the panel under **Team**. Django's built-in admin stays available at
`/django-admin/` as a fallback.

### Blog

Posts are written in the panel under **Blog** (drafts, scheduled posts, cover + inline images, SEO fields)
and appear at `/blog` as soon as they are published. Uploaded images are resized to WebP and stored in
`/srv/masar/media` (outside the code checkout, served by Nginx at `/media/`); the daily backup copies
them to `/srv/masar/backups/media-<date>.tar.gz` next to the database.

### Email alerts for new enquiries (optional)

Fill in the SMTP lines in `/srv/masar/app/backend/.env` (e.g. Google Workspace: `EMAIL_HOST=smtp.gmail.com`,
`EMAIL_HOST_USER=` the mailbox, `EMAIL_HOST_PASSWORD=` an app password), then
`systemctl restart masar-api` and enter the recipients in the panel under **Contact Details → Email alerts**.

## 3. Point the domain at the Droplet

At the DNS provider for `masararabia.com`, set:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | droplet IP |
| A | `www` | droplet IP |

## 4. HTTPS (after DNS has switched)

```bash
certbot --nginx -d masararabia.com -d www.masararabia.com --redirect -m <admin email> --agree-tos -n
sed -i 's/^HTTPS=False/HTTPS=True/' /srv/masar/app/backend/.env && systemctl restart masar-api
```

The certificate renews automatically.

## Publishing updates

Push to GitHub, then on the Droplet:

```bash
sudo /srv/masar/app/deploy/deploy.sh
```

It pulls, updates the backend, builds the website next to the live one, switches over, and rolls back
automatically if the new build doesn't start. To roll back by hand:

```bash
ls -1t /srv/masar/web/releases     # pick an older build
sudo -u masar ln -sfn /srv/masar/web/releases/<build> /srv/masar/web/current && sudo systemctl restart masar-web
```

## Useful commands

```bash
systemctl status masar-web masar-api nginx     # are they running?
journalctl -u masar-web -f                     # website logs
journalctl -u masar-api -f                     # form backend logs
free -h                                        # memory + swap
```
