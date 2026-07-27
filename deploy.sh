#!/usr/bin/env bash
# PadhoDost one-command deploy.
# Pulls the latest code, rebuilds the Next.js app, seeds new content into the DB,
# and RESTARTS the pm2 process so the new build is actually served.
#
# Usage on the VPS:   bash deploy.sh
#
# Why the restart matters: `next start` loads the built .next at process startup.
# `npm run db:seed` updates DB content (questions), but new CODE (exam prep pages,
# UI changes) only appears after `npm run build` AND a pm2 restart. Missing the
# restart is what makes "updates not showing on the frontend".
set -euo pipefail
cd "$(dirname "$0")"

echo "==> [1/4] Pulling latest code…"
git pull

echo "==> [2/4] Building the app (npm run build)…"
npm run build

echo "==> [3/4] Seeding new content (npm run db:seed)…"
npm run db:seed

echo "==> [4/4] Restarting the app (pm2 restart padhodost)…"
pm2 restart padhodost --update-env

echo "✅ Deployed. Live at https://padhodost.com — hard-refresh to see changes."
