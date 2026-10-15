#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q (sitting 2) — `smoke-perf` on a PRIVATE built bundle, under the guard.
# Why (read at 11:22 on 2026-10-14, and by sitting 1 at 16:09 on 10-13): the
# shared `dist/` is emptied by other seats' library builds (`vite build --mode
# production`), so `dist/gh-pages` vanishes under a running perf project and
# every test reads "the built bundle never reached a mounted main". The
# harness's server (`e2e/smoke/perf/serve-built.mjs`) resolves `dist/gh-pages`
# from its cwd, so it is run UNMODIFIED from a private directory holding this
# seat's own gh-pages build of the same tree (`vite build --mode gh-pages
# --outDir <private>`); playwright reuses it on 9152 (reuseExistingServer).
# usage (repository root): sh run-perf-guarded.sh <run-tag> [test ids ...]
Q=docs/tranches/X/waves/W12U-evidence/q
TAG=${1:?run tag}; shift
# Q_INNER=1: already inside one guarded batch (q-batch.sh) — run the body
# directly; the batch holds the slot (and the webkit lock) for every step.
G="$HOME/.claude/guard/guarded --timeout ${Q_TIMEOUT:-60} --"; [ -n "$Q_INNER" ] && G=""
# shellcheck disable=SC2086
exec $G sh -c '
Q='"$Q"'; TAG='"$TAG"'; P=smoke-perf; ROOT=$(pwd)
trap "pkill -TERM -P \$\$ 2>/dev/null" EXIT
B=$HOME/.dev-logs/w12u-q/built-$TAG
(while true; do echo "$(date "+%s %m-%d %H:%M:%S") $(sysctl -n vm.loadavg | awk "{print \$2}")" >> $Q/logs/load-samples.txt; sleep 15; done) &
echo "### $P ($TAG) build start $(date "+%m-%d %H:%M:%S") head=$(git rev-parse --short HEAD)" > $Q/logs/$TAG-$P.log.txt
npx vite build --mode gh-pages --outDir $B/dist/gh-pages >> $Q/logs/$TAG-$P.build.txt 2>&1 || { echo "### build failed" >> $Q/logs/$TAG-$P.log.txt; exit 1; }
(cd $B && PERF_PORT=9152 node $ROOT/e2e/smoke/perf/serve-built.mjs > $HOME/.dev-logs/w12u-q-built-9152.log 2>&1) &
Q_MIRROR_PORT=9151 VITE_API_URL=http://localhost:9151 npx vite --config $Q/vite.q.config.ts --port 9151 --strictPort > $HOME/.dev-logs/w12u-q-mirror-9151.log 2>&1 &
i=0; until { curl -s -m 5 -o /dev/null localhost:9151/ && curl -s -m 5 -o /dev/null localhost:9152/; } || [ $i -ge 30 ]; do sleep 2; i=$((i+1)); done
OUT=$HOME/.dev-logs/w12u-q/$TAG-$P; mkdir -p "$OUT"
echo "### $P ($TAG) start $(date "+%m-%d %H:%M:%S") load1=$(sysctl -n vm.loadavg | awk "{print \$2}") bundle=$B" >> $Q/logs/$TAG-$P.log.txt
VJS_E2E_PORT=9151 VJS_E2E_PERF_PORT=9152 PLAYWRIGHT_JSON_OUTPUT_NAME=$Q/results/$TAG-$P.json \
  npx playwright test "$@" --project=$P --workers=1 --trace=retain-on-failure \
  --output="$OUT" --reporter=list,json >> $Q/logs/$TAG-$P.log.txt 2>&1
RC=$?
echo "### $P end $(date "+%m-%d %H:%M:%S") load1=$(sysctl -n vm.loadavg | awk "{print \$2}") exit=$RC" >> $Q/logs/$TAG-$P.log.txt
' sh "$@"
