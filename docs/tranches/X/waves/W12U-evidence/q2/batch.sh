#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q2 — export the committed bytes of <rev>, then run the batch's
# projects serially, ONE guarded admission PER PROJECT (run.sh guards itself):
# each project gets its own RSS/CPU accounting and a 45-min bound in
# guarded.log, instead of one multi-hour slot whose `sh -c` loop hid every
# browser behind a single run id (chrome-assay V-3, 2026-10-16).
#   C = Chromium (smoke-admin smoke-mobile smoke-reactivity smoke-perf smoke)
#   W = WebKit (smoke-safari oracles-safari; run.sh takes --exclusive webkit)
# usage (repo root): sh batch.sh <tag> <rev> <C|W> [projects...] [-- ids...]
TAG=${1:?tag}; REV=${2:?rev}; B=${3:?C|W}; shift 3
Q=docs/tranches/X/waves/W12U-evidence/q2
case "$B" in
  C) DEF="smoke-admin smoke-mobile smoke-reactivity smoke-perf smoke";;
  W) DEF="smoke-safari oracles-safari";;
  *) echo "batch: B must be C or W" >&2; exit 2;;
esac
PS=""; while [ $# -gt 0 ] && [ "$1" != "--" ]; do PS="$PS $1"; shift; done; [ "$1" = "--" ] && shift
[ -z "$PS" ] && PS="$DEF"
# Children run in the background and are waited on, so a signal to this
# script reaches the trap at once; the trap stops the in-flight guarded run
# (guarded kills its whole tree, browsers included). Not `kill 0`: this
# script shares its caller's process group and must not signal the caller.
CH=""
trap '[ -n "$CH" ] && kill "$CH" 2>/dev/null' EXIT
trap 'exit 130' INT TERM HUP
unset Q_INNER
T=$(sh $Q/export.sh "$REV") || exit 3
for P in $PS; do
  sh $Q/run.sh "$TAG" "$T" "$P" "$@" & CH=$!; wait $CH; RC=$?; CH=""
  echo "### $P end $(date "+%m-%d %H:%M:%S") load1=$(sysctl -n vm.loadavg | cut -d" " -f2) exit=$RC" >> "$Q/logs/$TAG-$P.log.txt"
  echo "$(date "+%m-%d %H:%M:%S") $TAG $P rev=$REV exit=$RC load1=$(sysctl -n vm.loadavg | cut -d" " -f2)" >> $Q/logs/$TAG-chain.txt
done
