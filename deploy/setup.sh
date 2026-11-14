#!/usr/bin/env bash
# One-time setup of a fresh Ubuntu 24.04 Droplet (run as root) - see deploy/README.md:
#   git clone https://github.com/WORKVJ/Masarab.git /tmp/masar && bash /tmp/masar/deploy/setup.sh
#
# Installs Node 22, Python, Nginx and a firewall, runs the website and the form backend as
# background services, adds 2 GB of swap (so the 1 GB Droplet can build), and a daily
# backup of the enquiries database. Safe to run again.
set -euo pipefail

REPO="${REPO:-https://github.com/WORKVJ/Masarab.git}"
DOMAIN="${DOMAIN:-masararabia.com}"
APP=/srv/masar/app
export DEBIAN_FRONTEND=noninteractive

echo "==> Swap (2 GB)"
if ! swapon --show | grep -q /swapfile; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo 'vm.swappiness=10' > /etc/sysctl.d/99-masar-swap.conf
  sysctl -q -p /etc/sysctl.d/99-masar-swap.conf
fi

echo "==> System packages"
apt-get update -q
apt-get upgrade -yq
apt-get install -yq nginx git python3-venv python3-pip sqlite3 ufw certbot python3-certbot-nginx curl ca-certificates

echo "==> Node.js 22"
if ! command -v node >/dev/null || ! node -v | grep -q '^v22'; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -yq nodejs
fi

echo "==> App user and code"
id masar >/dev/null 2>&1 || useradd --system --create-home --home-dir /srv/masar --shell /bin/bash masar
if [ ! -d "$APP/.git" ]; then
  sudo -u masar -H git clone "$REPO" "$APP"
fi
sudo -u masar -H mkdir -p /srv/masar/web/releases /srv/masar/backups /srv/masar/media
[ -d /srv/masar/venv ] || sudo -u masar -H python3 -m venv /srv/masar/venv

echo "==> Settings"
IP=$(curl -fsS --max-time 3 http://169.254.169.254/metadata/v1/interfaces/public/0/ipv4/address || hostname -I | awk '{print $1}')
if [ ! -f "$APP/backend/.env" ]; then
  SECRET=$(python3 -c 'import secrets; print(secrets.token_urlsafe(50))')
  cat > "$APP/backend/.env" <<ENV
SECRET_KEY=$SECRET
DEBUG=False
ALLOWED_HOSTS=$DOMAIN,www.$DOMAIN,$IP,127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=https://$DOMAIN,https://www.$DOMAIN
CSRF_TRUSTED_ORIGINS=https://$DOMAIN,https://www.$DOMAIN,http://$IP
# switch to True once the HTTPS certificate is installed (secure admin login cookies)
HTTPS=False
ENV
  chown masar:masar "$APP/backend/.env"
  chmod 600 "$APP/backend/.env"
fi
# Website <-> backend: the browser calls /api on the same domain; the website server reads the contact
# details straight from Django, and Django asks it to refresh them (shared secret) when they change.
add_env() { grep -q "^$2=" "$1" 2>/dev/null || echo "$2=$3" >> "$1"; }
REVALIDATE_SECRET=$(grep -s '^REVALIDATE_SECRET=' "$APP/backend/.env" | cut -d= -f2- || true)
[ -n "$REVALIDATE_SECRET" ] || REVALIDATE_SECRET=$(python3 -c 'import secrets; print(secrets.token_urlsafe(32))')
FRONT_ENV="$APP/frontend/.env.production.local"
sudo -u masar touch "$FRONT_ENV"
add_env "$FRONT_ENV" NEXT_PUBLIC_API_URL /api
add_env "$FRONT_ENV" INTERNAL_API_URL http://127.0.0.1:8000/api
add_env "$FRONT_ENV" REVALIDATE_SECRET "$REVALIDATE_SECRET"
chmod 600 "$FRONT_ENV"
BACK_ENV="$APP/backend/.env"
add_env "$BACK_ENV" REVALIDATE_SECRET "$REVALIDATE_SECRET"
add_env "$BACK_ENV" NEXT_REVALIDATE_URL http://127.0.0.1:3000/revalidate-cache
add_env "$BACK_ENV" PANEL_URL "https://$DOMAIN/admin"
# blog images uploaded in the panel live outside the code checkout (Nginx serves them at /media/)
add_env "$BACK_ENV" MEDIA_ROOT /srv/masar/media
# email alerts for new enquiries: fill these in to switch them on (see deploy/README.md)
add_env "$BACK_ENV" EMAIL_HOST ""
add_env "$BACK_ENV" EMAIL_PORT 587
add_env "$BACK_ENV" EMAIL_HOST_USER ""
add_env "$BACK_ENV" EMAIL_HOST_PASSWORD ""
add_env "$BACK_ENV" DEFAULT_FROM_EMAIL ""

# Nginx serves the admin's CSS from backend/staticfiles: let it pass through (not list) the folders
chmod o+x /srv/masar "$APP" "$APP/backend"
chmod 755 /srv/masar/media

echo "==> Services"
install -m 644 "$APP/deploy/masar-web.service" /etc/systemd/system/masar-web.service
install -m 644 "$APP/deploy/masar-api.service" /etc/systemd/system/masar-api.service
systemctl daemon-reload
systemctl enable masar-web masar-api

echo "==> Nginx"
install -m 644 "$APP/deploy/nginx-masar.conf" /etc/nginx/sites-available/masar
ln -sfn /etc/nginx/sites-available/masar /etc/nginx/sites-enabled/masar
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "==> Firewall (SSH, HTTP, HTTPS only)"
ufw allow OpenSSH >/dev/null
ufw allow 'Nginx Full' >/dev/null
ufw --force enable >/dev/null

echo "==> Daily database backup"
install -m 755 "$APP/deploy/backup-db.sh" /etc/cron.daily/masar-db-backup

echo "==> First deploy"
bash "$APP/deploy/deploy.sh"

echo
echo "All set. Open http://$IP to check the site."
echo "Next: point the domain's DNS at $IP, then run the HTTPS step in deploy/README.md."
