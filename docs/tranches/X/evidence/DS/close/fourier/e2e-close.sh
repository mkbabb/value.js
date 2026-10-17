#!/usr/bin/env bash
# X-DS CLOSE: fourier e2e x2 on the pass-16 spec set, headless, 1 worker.
# Own API :8017 (COMPUTE_CONCURRENCY=1, rate limits 1000, dev mongo :27018) behind vite :3137.
# Launch under ~/.claude/guard/guarded; every child is stopped on exit.
set -uo pipefail
ROOT=/Users/mkbabb/Programming/fourier-analysis
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/evidence/DS/close/fourier
SPECS=$(cat /Users/mkbabb/Programming/value.js/docs/tranches/X/evidence/DS/fourier/pass-16/e2e-specs.txt)
cd "$ROOT"; unset VIRTUAL_ENV
mkdir -p "$HOME/.cache/fourier-e2e-close-blobs" "$HOME/.dev-logs"
PIDS=()
kill_tree() { for c in $(pgrep -P "$1" 2>/dev/null); do kill_tree "$c"; done; kill "$1" 2>/dev/null || true; }
cleanup() { for p in "${PIDS[@]}"; do kill_tree "$p"; done; wait 2>/dev/null; }
trap cleanup EXIT INT TERM

MONGO_URI="mongodb://localhost:27018/fourier" ADMIN_TOKEN=dev \
BLOB_DIR="$HOME/.cache/fourier-e2e-close-blobs" COMPUTE_CONCURRENCY=1 \
COMPUTE_RATE_LIMIT=1000 WRITE_RATE_LIMIT=1000 CORS_ORIGINS="http://localhost:3137" \
  uv run uvicorn api.main:app --host 127.0.0.1 --port 8017 > "$HOME/.dev-logs/fourier-api-ds-close.log" 2>&1 &
PIDS+=($!)
for i in $(seq 1 90); do curl -fsS http://localhost:8017/api/health >/dev/null 2>&1 && break; sleep 1; done
curl -fsS http://localhost:8017/api/health || { echo "API not healthy"; exit 1; }; echo

VITE_PROXY_API="http://localhost:8017" npx --prefix web vite web --port 3137 --strictPort > "$HOME/.dev-logs/fourier-vite-ds-close.log" 2>&1 &
PIDS+=($!)
for i in $(seq 1 60); do curl -fsS http://localhost:3137 >/dev/null 2>&1 && break; sleep 1; done

cd "$ROOT/web"
for r in A B; do
  VITE_PROXY_API="http://localhost:8017" BASE_URL="http://localhost:3137" \
    npx playwright test --project=chromium --project=mobile-chromium --workers=1 --reporter=line $SPECS \
    > "$OUT/e2e-run$r.txt" 2>&1
  echo "run $r exit $?"
  git -C "$ROOT" checkout -- web/e2e/screenshots/f-w14 2>/dev/null || true
done
