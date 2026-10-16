#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q2 — ONE guarded admission per engine batch (the guard queues a fresh
# FIFO ticket per call; one ticket per batch, as .q's q-batch.sh measured):
# export the committed bytes of <rev>, then run the batch's projects serially.
#   C = Chromium (smoke-admin smoke-mobile smoke-reactivity smoke-perf smoke)
#   W = WebKit under --exclusive webkit (smoke-safari oracles-safari)
# usage (repo root): sh batch.sh <tag> <rev> <C|W> [projects...] [-- ids...]
TAG=${1:?tag}; REV=${2:?rev}; B=${3:?C|W}; shift 3
Q=docs/tranches/X/waves/W12U-evidence/q2
case "$B" in
  C) EXCL=""; DEF="smoke-admin smoke-mobile smoke-reactivity smoke-perf smoke";;
  W) EXCL="--exclusive webkit"; DEF="smoke-safari oracles-safari";;
esac
# shellcheck disable=SC2086
exec "$HOME/.claude/guard/guarded" --timeout "${Q_TIMEOUT:-240}" $EXCL -- sh -c '
Q="$1"; TAG="$2"; REV="$3"; DEF="$4"; shift 4
PS=""; while [ $# -gt 0 ] && [ "$1" != "--" ]; do PS="$PS $1"; shift; done; [ "$1" = "--" ] && shift
[ -z "$PS" ] && PS="$DEF"
export Q_INNER=1
T=$(sh $Q/export.sh "$REV") || exit 3
for P in $PS; do
  sh $Q/run.sh "$TAG" "$T" "$P" "$@"; RC=$?
  echo "$(date "+%m-%d %H:%M:%S") $TAG $P rev=$REV exit=$RC load1=$(sysctl -n vm.loadavg | cut -d" " -f2)" >> $Q/logs/$TAG-chain.txt
done
' sh "$Q" "$TAG" "$REV" "$DEF" "$@"
