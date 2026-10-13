#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q — re-run one project's not-passed tests (COHESION §0ev.2: up to 3 runs).
# usage: sh rerun.sh <prev-tag> <new-tag> <project>      (from the repository root)
# Reads results/<prev-tag>-<project>.json, runs exactly those file:line ids
# again with one worker, no retries, traces kept for failures.
Q=docs/tranches/X/waves/W12U-evidence/q
PREV=${1:?}; TAG=${2:?}; P=${3:?}
IDS=$(node "$Q/failures.mjs" "$Q/results/$PREV-$P.json" --ids | sed 's#^#e2e/#')
[ -n "$IDS" ] || { echo "### $P nothing to re-run from $PREV" > "$Q/logs/$TAG-$P.log.txt"; exit 0; }
OUT=$HOME/.dev-logs/w12u-q/$TAG-$P
mkdir -p "$OUT"
echo "### $P ($TAG, re-run of $PREV: $(echo "$IDS" | wc -l | tr -d ' ') ids) start $(date '+%m-%d %H:%M:%S') load1=$(sysctl -n vm.loadavg | awk '{print $2}')" > "$Q/logs/$TAG-$P.log.txt"
# shellcheck disable=SC2086
VJS_E2E_PORT=${Q_PORT:-9141} VJS_E2E_PERF_PORT=${Q_PERF_PORT:-9142} PLAYWRIGHT_JSON_OUTPUT_NAME="$Q/results/$TAG-$P.json" \
  npx playwright test $IDS --project="$P" --workers=1 --trace=retain-on-failure \
  --output="$OUT" --reporter=list,json >> "$Q/logs/$TAG-$P.log.txt" 2>&1
RC=$?
echo "### $P end $(date '+%m-%d %H:%M:%S') load1=$(sysctl -n vm.loadavg | awk '{print $2}') exit=$RC" >> "$Q/logs/$TAG-$P.log.txt"
