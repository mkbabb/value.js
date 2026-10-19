#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q — the whole smoke, one worker, project by project (COHESION §0ev.2).
# usage: sh run-smoke.sh <run-tag> [project ...]     (from the repository root)
# Reads the named mirror :9141 (vite.q.config.ts) and the built server :9142.
# No retries (config: retries 0 off CI); traces kept for failures only, outside
# the repository tree (~/.dev-logs/w12u-q/) so the run does not feed any watcher.
Q=docs/tranches/X/waves/W12U-evidence/q
TAG=${1:?run tag}; shift
[ $# -gt 0 ] || set -- smoke-safari smoke-mobile smoke-reactivity smoke-perf smoke-admin smoke oracles-safari
for P in "$@"; do
  OUT=$HOME/.dev-logs/w12u-q/$TAG-$P
  mkdir -p "$OUT"
  L0=$(sysctl -n vm.loadavg | awk '{print $2}')
  echo "### $P start $(date '+%m-%d %H:%M:%S') load1=$L0" > "$Q/logs/$TAG-$P.log.txt"
  VJS_E2E_PORT=${Q_PORT:-9141} VJS_E2E_PERF_PORT=${Q_PERF_PORT:-9142} PLAYWRIGHT_JSON_OUTPUT_NAME="$Q/results/$TAG-$P.json" \
    npx playwright test --project="$P" --workers=1 --trace=retain-on-failure \
    --output="$OUT" --reporter=list,json >> "$Q/logs/$TAG-$P.log.txt" 2>&1
  RC=$?
  L1=$(sysctl -n vm.loadavg | awk '{print $2}')
  echo "### $P end $(date '+%m-%d %H:%M:%S') load1=$L1 exit=$RC" >> "$Q/logs/$TAG-$P.log.txt"
done
echo "### ALL DONE $(date '+%m-%d %H:%M:%S')" > "$Q/logs/$TAG-DONE.txt"
