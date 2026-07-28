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

echo "==> [1/4] Syncing to origin/main…"
# Use fetch + hard-reset, NOT `git pull`. Under `set -e`, a plain pull ABORTS the
# whole script when a tracked file has drifted on the server (package-lock.json is
# the usual offender — prisma/npm regenerate it), so it silently skips build+restart
# and the deploy looks like it ran but nothing changed. This is a deploy target, so
# forcing the tree to match GitHub is the intended behaviour.
git fetch origin
git reset --hard origin/main

echo "==> [2/4] Building the app (clean .next + npm run build)…"
rm -rf .next
npm run build

echo "==> [3/4] Seeding new content (npm run db:seed)…"
npm run db:seed

echo "==> [4/4] Restarting the app (pm2 restart padhodost)…"
pm2 restart padhodost --update-env

echo "✅ Deployed $(git rev-parse --short HEAD). Live at https://padhodost.com — hard-refresh to see changes."
