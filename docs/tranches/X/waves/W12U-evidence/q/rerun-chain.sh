#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q (sitting 2) — the §0ev.2 re-run rounds over sitting 2's whole run
# (tag s2): each round re-runs ONLY the tests the previous round did not pass,
# one project at a time under the guard (run-guarded.sh / run-perf-guarded.sh).
# usage (repository root): sh rerun-chain.sh <prev-tag> <tag> [project ...]
Q=docs/tranches/X/waves/W12U-evidence/q
PREV=${1:?}; TAG=${2:?}; shift 2
[ $# -gt 0 ] || set -- smoke-reactivity smoke-perf smoke oracles-safari
for P in "$@"; do
  J=$Q/results/$PREV-$P.json
  [ -f "$J" ] || { echo "### $P: no $J" >> $Q/logs/$TAG-chain.txt; continue; }
  IDS=$(node $Q/failures.mjs "$J" --ids | sort -u)
  [ -n "$IDS" ] || { echo "### $P: nothing to re-run after $PREV" >> $Q/logs/$TAG-chain.txt; continue; }
  echo "### $P: $(echo "$IDS" | wc -l | tr -d ' ') ids after $PREV $(date '+%H:%M:%S')" >> $Q/logs/$TAG-chain.txt
  # shellcheck disable=SC2086
  if [ "$P" = smoke-perf ]; then sh $Q/run-perf-guarded.sh "$TAG" $IDS
  else Q_TIMEOUT=120 sh $Q/run-guarded.sh "$TAG" "$P" $IDS; fi
done
echo "### CHAIN DONE $(date '+%m-%d %H:%M:%S')" >> $Q/logs/$TAG-chain.txt
