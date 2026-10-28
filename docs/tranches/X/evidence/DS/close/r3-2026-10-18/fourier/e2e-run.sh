#!/usr/bin/env bash
# X-DS CLOSE r3: one fourier e2e run (arg A|B), the FULL web/e2e suite, chromium + mobile-chromium,
# headless, 1 worker. Own API :8023 (COMPUTE_CONCURRENCY=1) behind a private vite :3233.
# Launch under ~/.claude/guard/guarded; every child is stopped on exit.
set -uo pipefail
R=${1:?run letter}
ROOT=/Users/mkbabb/Programming/fourier-analysis
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/evidence/DS/close/r3-2026-10-18/fourier
cd "$ROOT"; unset VIRTUAL_ENV
mkdir -p "$HOME/.cache/fourier-ds-close-r3/blobs" "$HOME/.dev-logs"
PIDS=()
kill_tree() { for c in $(pgrep -P "$1" 2>/dev/null); do kill_tree "$c"; done; kill "$1" 2>/dev/null || true; }
cleanup() { for p in "${PIDS[@]}"; do kill_tree "$p"; done; wait 2>/dev/null; git -C "$ROOT" checkout -- web/e2e/screenshots 2>/dev/null || true; }
trap cleanup EXIT INT TERM
MONGO_URI="mongodb://localhost:27018/fourier" ADMIN_TOKEN=dev \
BLOB_DIR="$HOME/.cache/fourier-ds-close-r3/blobs" COMPUTE_CONCURRENCY=1 \
COMPUTE_RATE_LIMIT=1000 WRITE_RATE_LIMIT=1000 CORS_ORIGINS="http://localhost:3233" \
  uv run uvicorn api.main:app --host 127.0.0.1 --port 8023 > "$HOME/.dev-logs/fourier-api-ds-close-r3.log" 2>&1 &
PIDS+=($!)
for i in $(seq 1 120); do curl -fsS http://localhost:8023/api/health >/dev/null 2>&1 && break; sleep 1; done
curl -fsS http://localhost:8023/api/health || { echo "API not healthy"; exit 1; }; echo
VITE_PROXY_API="http://localhost:8023" PORT=3233 node "$OUT/vite-private.mjs" > "$HOME/.dev-logs/fourier-vite-ds-close-r3.log" 2>&1 &
PIDS+=($!)
for i in $(seq 1 90); do curl -fsS http://localhost:3233 >/dev/null 2>&1 && break; sleep 1; done
cd "$ROOT/web"
VITE_PROXY_API="http://localhost:8023" BASE_URL="http://localhost:3233" \
  npx playwright test --project=chromium --project=mobile-chromium --workers=1 --reporter=line \
  > "$OUT/e2e-run$R.txt" 2>&1
echo "run $R exit $?"
