#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q (sitting 2, 2026-10-14) — one smoke project (or a re-run batch) under
# the machine guard (COHESION §0fb): `~/.claude/guard/guarded` admits the run,
# caps its tree RSS, and reaps every descendant (the watcher-less mirror, the
# built server playwright starts, every browser, the load sampler) when it ends.
# Sitting 1 left its mirror and an unbounded load-sampler loop running for 17 h
# after its session died; this wrapper makes that impossible by construction.
# usage (repository root): sh run-guarded.sh <run-tag> <project> [test ids ...]
#   mirror port 9151, built-bundle port 9152 (fresh pair; never a shared server).
Q=docs/tranches/X/waves/W12U-evidence/q
TAG=${1:?run tag}; P=${2:?project}; shift 2
case "$P" in *safari*) EXCL="--exclusive webkit";; *) EXCL="";; esac
# sitting 3 (2026-10-15): WebKit runs hold the machine-wide webkit lock (guard
# --exclusive, new 10-15); the default timeout is the guard law's 45 min.
# shellcheck disable=SC2086
# Q_INNER=1: already inside one guarded batch (q-batch.sh) — run the body
# directly; the batch holds the slot (and the webkit lock) for every step.
G="$HOME/.claude/guard/guarded --timeout ${Q_TIMEOUT:-45} $EXCL --"; [ -n "$Q_INNER" ] && G=""
# shellcheck disable=SC2086
exec $G sh -c '
Q='"$Q"'; TAG='"$TAG"'; P='"$P"'
trap "pkill -TERM -P \$\$ 2>/dev/null" EXIT
(while true; do echo "$(date "+%s %m-%d %H:%M:%S") $(sysctl -n vm.loadavg | awk "{print \$2}")" >> $Q/logs/load-samples.txt; sleep 15; done) &
Q_MIRROR_PORT=9151 VITE_API_URL=http://localhost:9151 npx vite --config $Q/vite.q.config.ts --port 9151 --strictPort > $HOME/.dev-logs/w12u-q-mirror-9151.log 2>&1 &
i=0; until curl -s -m 5 -o /dev/null localhost:9151/ || [ $i -ge 30 ]; do sleep 2; i=$((i+1)); done
OUT=$HOME/.dev-logs/w12u-q/$TAG-$P; mkdir -p "$OUT"
echo "### $P ($TAG) start $(date "+%m-%d %H:%M:%S") load1=$(sysctl -n vm.loadavg | awk "{print \$2}") head=$(git rev-parse --short HEAD)" > $Q/logs/$TAG-$P.log.txt
VJS_E2E_PORT=9151 VJS_E2E_PERF_PORT=9152 PLAYWRIGHT_JSON_OUTPUT_NAME=$Q/results/$TAG-$P.json \
  npx playwright test "$@" --project="$P" --workers=1 --trace=retain-on-failure \
  --output="$OUT" --reporter=list,json >> $Q/logs/$TAG-$P.log.txt 2>&1
RC=$?
echo "### $P end $(date "+%m-%d %H:%M:%S") load1=$(sysctl -n vm.loadavg | awk "{print \$2}") exit=$RC" >> $Q/logs/$TAG-$P.log.txt
' sh "$@"
