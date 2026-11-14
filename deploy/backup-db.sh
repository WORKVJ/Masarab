#!/usr/bin/env bash
# Daily copy of the database (enquiries, blog posts, settings) and the blog images; keeps the last 14 days.
# Installed to /etc/cron.daily/masar-db-backup by setup.sh.
set -euo pipefail
DB=/srv/masar/app/backend/db.sqlite3
DEST=/srv/masar/backups
[ -f "$DB" ] || exit 0
mkdir -p "$DEST"
sqlite3 "$DB" ".backup '$DEST/db-$(date +%F).sqlite3'"
find "$DEST" -name 'db-*.sqlite3' -mtime +14 -delete
if [ -d /srv/masar/media ]; then
  tar -czf "$DEST/media-$(date +%F).tar.gz" -C /srv/masar media
  find "$DEST" -name 'media-*.tar.gz' -mtime +14 -delete
fi
