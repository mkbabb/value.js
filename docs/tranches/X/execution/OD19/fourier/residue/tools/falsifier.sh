#!/usr/bin/env bash
# ESC-FREL-ci-1 falsifier: the equation nav cell under CI 39595581721's condition
# (software raster + the compute held 3,052 ms), HEAD spec (e4c2e1d) vs the cure.
#   falsifier.sh head|cure <n>     (run under ~/.claude/guard/guarded)
set -euo pipefail
MODE=$1; N=$2
HERE=$(cd "$(dirname "$0")" && pwd); OUT=$(dirname "$HERE")
WEB=/Users/mkbabb/Programming/fourier-analysis/web
cd "$WEB"
PIDS=()
TMPSPEC=""
cleanup() { for p in "${PIDS[@]}"; do kill "$p" 2>/dev/null || true; done; if [ -n "$TMPSPEC" ]; then rm -f "$TMPSPEC"; fi; }
trap cleanup EXIT
[ -d dist/e2e-preview ] || npx vite build --outDir dist/e2e-preview --emptyOutDir >/dev/null 2>&1
PORT=8091 DELAY_MS=3052 node "$HERE/delay-proxy.mjs" & PIDS+=($!)
npx vite preview --outDir dist/e2e-preview --port 4190 --strictPort >/dev/null 2>&1 & PIDS+=($!)
VITE_PROXY_API=http://localhost:8091 npx vite preview --outDir dist/e2e-preview --port 4191 --strictPort >/dev/null 2>&1 & PIDS+=($!)
for u in http://localhost:4190/ http://localhost:4191/; do for i in $(seq 60); do curl -sf -o /dev/null "$u" && break; sleep 1; done; done
if [ "$MODE" = head ]; then
  TMPSPEC=e2e/od19-load-head-falsifier.spec.ts
  git -C .. show e4c2e1d:web/e2e/od19-load.spec.ts > "$TMPSPEC"
  SPEC=$TMPSPEC; PROJ="--project=chromium"
else
  SPEC=e2e/od19-load.spec.ts; PROJ="--project=chromium --project=chrome-gpu"
fi
BASE_URL=http://localhost:4190 OD19_LOAD_PROD=http://localhost:4191 OD19_LOAD_OUT="$OUT/falsifier-$MODE-$N.json" \
  npx playwright test "$SPEC" $PROJ --workers=1 --reporter=line -g "equation: an in-app navigation" 2>&1 | grep -v "^\[WebServer\]" | tail -40
