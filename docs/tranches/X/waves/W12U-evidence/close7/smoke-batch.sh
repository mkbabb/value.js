#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U close 7 — a copy of o5c/smoke-batch.sh (itself a copy of q2/batch.sh + q2/run.sh (E-3: those are unchanged) whose logs and JSON results land
# in close7/smoke/. Runs the Chromium projects serially on a COMMITTED tree, one
# guarded admission per project, --workers=1. usage (repo root): sh close7/smoke-batch.sh <tag> <tree>
TAG=${1:?tag}; T=${2:?tree}
O=$(pwd)/docs/tranches/X/waves/W12U-evidence/close7/smoke
mkdir -p "$HOME/.dev-logs/w12u-close7/json"
for P in smoke-admin smoke-mobile smoke-reactivity smoke-perf smoke; do
  LOG=$O/$TAG-$P.log.txt
  echo "### $P ($TAG) start $(date "+%m-%d %H:%M:%S") load1=$(sysctl -n vm.loadavg | awk '{print $2}') tree=$T rev=$(git -C $T rev-parse --short HEAD)" > "$LOG"
  ( cd "$T" && VJS_E2E_PORT=9171 VJS_E2E_PERF_PORT=9172 PLAYWRIGHT_JSON_OUTPUT_NAME="$HOME/.dev-logs/w12u-close7/json/$TAG-$P.json" \
    "$HOME/.claude/guard/guarded" --timeout 45 -- npx playwright test --project="$P" --workers=1 --trace=retain-on-failure \
    --output="$HOME/.dev-logs/w12u-close7/out/$TAG-$P" --reporter=list,json >> "$LOG" 2>&1 )
  RC=$?
  echo "### $P end $(date "+%m-%d %H:%M:%S") load1=$(sysctl -n vm.loadavg | awk '{print $2}') exit=$RC" >> "$LOG"
  echo "$(date "+%m-%d %H:%M:%S") $TAG $P exit=$RC load1=$(sysctl -n vm.loadavg | awk '{print $2}')" >> $O/$TAG-chain.txt
done
