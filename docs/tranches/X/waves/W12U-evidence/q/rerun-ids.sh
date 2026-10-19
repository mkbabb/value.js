#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q — re-run a batch of not-passed tests read from a run's LIST log while
# that run is still going (the JSON report is only written at its end).
# usage: sh rerun-ids.sh <src-log> <from-n> <to-n> <new-tag> <project> <port>   (repository root)
# Takes the `✘ <n> [project] › file:line:col › …` rows with from-n <= n <= to-n
# (grep selects the glyph: macOS awk compares the two glyphs as equal strings).
Q=docs/tranches/X/waves/W12U-evidence/q
SRC=${1:?}; A=${2:?}; B=${3:?}; TAG=${4:?}; P=${5:?}; PORT=${6:?}
IDS=$(sed 's/\x1b\[[0-9;]*m//g' "$SRC" | grep '^ *✘' | awk -v a="$A" -v b="$B" '$2+0>=a && $2+0<=b {print $5}' | sed 's/:[0-9]*$//' | sort -u)
[ -n "$IDS" ] || { echo "### nothing in $A..$B" > "$Q/logs/$TAG-$P.log.txt"; exit 0; }
OUT=$HOME/.dev-logs/w12u-q/$TAG-$P; mkdir -p "$OUT"
echo "### $P ($TAG: re-run of rows $A..$B of $(basename "$SRC"), $(echo "$IDS" | wc -l | tr -d ' ') ids) start $(date '+%m-%d %H:%M:%S') load1=$(sysctl -n vm.loadavg | awk '{print $2}')" > "$Q/logs/$TAG-$P.log.txt"
# shellcheck disable=SC2086
VJS_E2E_PORT=$PORT VJS_E2E_PERF_PORT=9142 PLAYWRIGHT_JSON_OUTPUT_NAME="$Q/results/$TAG-$P.json" \
  npx playwright test $IDS --project="$P" --workers=1 --trace=retain-on-failure \
  --output="$OUT" --reporter=list,json >> "$Q/logs/$TAG-$P.log.txt" 2>&1
RC=$?
echo "### $P end $(date '+%m-%d %H:%M:%S') load1=$(sysctl -n vm.loadavg | awk '{print $2}') exit=$RC" >> "$Q/logs/$TAG-$P.log.txt"
