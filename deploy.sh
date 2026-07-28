#!/usr/bin/env bash
# PadhoDost one-command deploy. Run on the VPS:  bash deploy.sh
#
# Order matters: `next start` serves the .next built at process start, so new CODE
# only appears after `npm run build` AND a pm2 restart. Schema changes must be applied
# (prisma db push) and the client regenerated BEFORE the build type-checks it.
set -euo pipefail
cd "$(dirname "$0")"

# ── self-update guard ─────────────────────────────────────────────────────────
# bash reads this script as it runs, so an edit to deploy.sh itself would otherwise
# only take effect on the NEXT deploy (and a mid-run reset runs a stale copy — which
# once skipped `prisma db push` and broke the build). So: sync the repo FIRST, then
# re-exec the freshly-pulled deploy.sh exactly once (guarded by DEPLOY_REEXEC) so any
# change to THIS file applies on the same run.
if [ "${DEPLOY_REEXEC:-}" != "1" ]; then
  echo "==> [0/5] Syncing to origin/main…"
  # fetch + hard-reset, NOT `git pull`: under set -e a pull aborts the whole script
  # when a tracked file drifted on the server, silently skipping build+restart.
  git fetch origin
  git reset --hard origin/main
  exec env DEPLOY_REEXEC=1 bash "$0" "$@"
fi

echo "==> [1/5] Applying schema + regenerating Prisma client…"
# db push is idempotent (no-op when the schema already matches) and applies new
# indexes / unique constraints via DIRECT_URL. It does NOT reliably re-run the
# prisma-client generator in this setup, so regenerate the client EXPLICITLY —
# src/generated is gitignored and the build type-checks against it.
npx prisma db push
npx prisma generate

echo "==> [2/5] Building the app (clean .next + npm run build)…"
rm -rf .next
npm run build

echo "==> [3/5] Seeding new content (npm run db:seed)…"
npm run db:seed

echo "==> [4/5] Restarting the app (pm2 restart padhodost)…"
pm2 restart padhodost --update-env

echo "==> [5/5] ✅ Deployed $(git rev-parse --short HEAD). Live at https://padhodost.com — hard-refresh to see changes."
