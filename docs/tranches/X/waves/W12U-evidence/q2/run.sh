#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q2 — one smoke project (optionally a subset of ids) on the COMMITTED
# tree from export.sh, under the machine guard (WebKit projects hold the
# machine-wide webkit lock). Ports are this unit's own pair (never shared).
# usage (repo root): sh run.sh <tag> <tree> <project> [ids...]
Q=$(pwd)/docs/tranches/X/waves/W12U-evidence/q2
TAG=${1:?tag}; T=${2:?tree}; P=${3:?project}; shift 3
case "$P" in *safari*) EXCL="--exclusive webkit";; *) EXCL="";; esac
LOG=$Q/logs/$TAG-$P.log.txt
# Q_INNER=1: already inside one guarded batch (batch.sh), which holds the slot
# (and the webkit lock) for every step — run the body directly.
G="$HOME/.claude/guard/guarded --timeout ${Q_TIMEOUT:-45} $EXCL --"; [ -n "$Q_INNER" ] && G=""
# shellcheck disable=SC2086
exec $G sh -c '
Q="$1"; TAG="$2"; T="$3"; P="$4"; LOG="$5"; shift 5
cd "$T" || exit 3
echo "### $P ($TAG) start $(date "+%m-%d %H:%M:%S") load1=$(sysctl -n vm.loadavg | awk "{print \$2}") tree=$T" > "$LOG"
VJS_E2E_PORT=9161 VJS_E2E_PERF_PORT=9162 PLAYWRIGHT_JSON_OUTPUT_NAME="$Q/results/$TAG-$P.json" \
  npx playwright test "$@" --project="$P" --workers=1 --trace=retain-on-failure \
  --output="$HOME/.dev-logs/w12u-q2/out/$TAG-$P" --reporter=list,json >> "$LOG" 2>&1
RC=$?
echo "### $P end $(date "+%m-%d %H:%M:%S") load1=$(sysctl -n vm.loadavg | awk "{print \$2}") exit=$RC" >> "$LOG"
exit $RC
' sh "$Q" "$TAG" "$T" "$P" "$LOG" "$@"
