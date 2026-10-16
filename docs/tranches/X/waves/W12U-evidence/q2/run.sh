#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q2 — one smoke project (optionally a subset of ids) on the COMMITTED
# tree from export.sh, under its own machine-guard admission (WebKit projects
# hold the machine-wide webkit lock). Ports are this unit's own pair (never
# shared). The guarded child is this script re-run with a leading
# `--playwright` (which also files the run in the guard's browser pool), and
# it `exec`s playwright: no intermediate shell sits between guarded and the
# test runner (chrome-assay V-3, 2026-10-16). batch.sh appends the end
# line; a standalone run's end is in ~/.claude/guard/log/guarded.log.
# usage (repo root): sh run.sh <tag> <tree> <project> [ids...]
if [ "$1" != "--playwright" ]; then
  case "$3" in *safari*) EXCL="--exclusive webkit";; *) EXCL="";; esac
  # shellcheck disable=SC2086
  exec "$HOME/.claude/guard/guarded" --timeout "${Q_TIMEOUT:-45}" $EXCL -- sh "$0" --playwright "$@"
fi
shift
Q=$(pwd)/docs/tranches/X/waves/W12U-evidence/q2
TAG=${1:?tag}; T=${2:?tree}; P=${3:?project}; shift 3
LOG=$Q/logs/$TAG-$P.log.txt
cd "$T" || exit 3
echo "### $P ($TAG) start $(date "+%m-%d %H:%M:%S") load1=$(sysctl -n vm.loadavg | awk "{print \$2}") tree=$T" > "$LOG"
export VJS_E2E_PORT=9161 VJS_E2E_PERF_PORT=9162 PLAYWRIGHT_JSON_OUTPUT_NAME="$Q/results/$TAG-$P.json"
exec npx playwright test "$@" --project="$P" --workers=1 --trace=retain-on-failure \
  --output="$HOME/.dev-logs/w12u-q2/out/$TAG-$P" --reporter=list,json >> "$LOG" 2>&1
