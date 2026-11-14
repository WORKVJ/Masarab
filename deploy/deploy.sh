#!/usr/bin/env bash
# Publish the latest code from GitHub:   sudo /srv/masar/app/deploy/deploy.sh
#
# The new website build is made next to the running one and switched in only when it is ready
# (and switched back if it fails to start), so visitors never see a half-built site.
set -euo pipefail

APP=/srv/masar/app
VENV=/srv/masar/venv
WEB=/srv/masar/web
as_masar() { sudo -u masar -H "$@"; }

echo "==> Pulling the latest code"
as_masar git -C "$APP" pull --ff-only

echo "==> Backend (quote & contact forms)"
as_masar "$VENV/bin/pip" install --quiet --upgrade pip
as_masar "$VENV/bin/pip" install --quiet -r "$APP/backend/requirements.txt"
( cd "$APP/backend" && as_masar "$VENV/bin/python" manage.py migrate --noinput && as_masar "$VENV/bin/python" manage.py collectstatic --noinput --verbosity 0 )
systemctl restart masar-api

echo "==> Building the website (takes a few minutes on the 1 GB Droplet)"
cd "$APP/frontend"
as_masar npm ci --no-audit --no-fund --loglevel=error
as_masar env NODE_OPTIONS=--max-old-space-size=1536 NEXT_TELEMETRY_DISABLED=1 npm run build

echo "==> Switching to the new build"
RELEASE="$WEB/releases/$(date +%Y%m%d-%H%M%S)"
as_masar mkdir -p "$RELEASE"
as_masar cp -a .next/standalone/. "$RELEASE/"
as_masar cp -a .next/static "$RELEASE/.next/static"
as_masar cp -a public "$RELEASE/public"
PREVIOUS=$(readlink -f "$WEB/current" 2>/dev/null || true)
as_masar ln -sfn "$RELEASE" "$WEB/current"
systemctl restart masar-web

ok=""
for _ in $(seq 1 30); do
  if curl -fsS -o /dev/null http://127.0.0.1:3000/; then ok=1; break; fi
  sleep 1
done
if [ -z "$ok" ]; then
  echo "!! The new build did not start." >&2
  if [ -n "$PREVIOUS" ] && [ -d "$PREVIOUS" ]; then
    echo "!! Rolling back to $PREVIOUS" >&2
    as_masar ln -sfn "$PREVIOUS" "$WEB/current"
    systemctl restart masar-web
  fi
  journalctl -u masar-web -n 30 --no-pager >&2
  exit 1
fi

# keep the three newest builds for quick rollback
ls -1dt "$WEB"/releases/*/ | tail -n +4 | xargs -r rm -rf

echo "==> Done — live: $(basename "$RELEASE")"
