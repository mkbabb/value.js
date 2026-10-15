#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q (sitting 3, 2026-10-15) — the remaining §0ev.2 rounds as TWO guarded
# batches, each admitted once. Why: per-run admission starved. q1's
# oracles-safari waited 1 h 51 min for a slot (13:02 → 14:34) while other
# sessions' 20–170 min runs held all three. A batch holds one slot, plus the
# webkit lock for the WebKit batch, for its whole span. Inside it each step runs
# unguarded (Q_INNER=1) and serially. Nothing runs in parallel, and there are no
# retries: each step is a fresh single attempt.
#   batch W (WebKit, --exclusive webkit): oracles-safari q1 → q2 → q3 over what
#     the previous round left failing; then the addendum (e) re-read
#     (smoke-safari dual-webgl-atmosphere, oracles-safari o3, --repeat-each=3).
#   batch C (Chromium): smoke q2 → q3 (q2 also carries s3's six ✘ ids);
#     smoke-perf q2 only (its rounds were s3 · q1 · q2 — three re-runs).
# usage (repository root): sh q-batch.sh W|C   (the guard wraps it: see q-run.sh)
Q=docs/tranches/X/waves/W12U-evidence/q
B=${1:?W or C}; L=$Q/logs/q-batch-$B.txt
export Q_INNER=1
ids() { [ -f "$1" ] && node $Q/failures.mjs "$1" --ids | sort -u; }
echo "### batch $B start $(date '+%m-%d %H:%M:%S') load1=$(sysctl -n vm.loadavg | awk '{print $2}') head=$(git rev-parse --short HEAD)" >> $L
if [ "$B" = W ]; then
  prevj=$Q/results/s2-oracles-safari.json
  for TAG in q1 q2 q3; do
    O=$(ids $prevj); echo "### $TAG oracles-safari $(echo "$O" | grep -c .) ids $(date '+%H:%M:%S')" >> $L
    # shellcheck disable=SC2086
    [ -n "$O" ] && sh $Q/run-guarded.sh $TAG oracles-safari $O
    prevj=$Q/results/$TAG-oracles-safari.json
  done
  echo "### webkit re-read $(date '+%H:%M:%S')" >> $L
  sh $Q/run-guarded.sh q1wk smoke-safari e2e/smoke/safari/dual-webgl-atmosphere.spec.ts --repeat-each=3
  sh $Q/run-guarded.sh q1wk oracles-safari e2e/smoke/oracles/o3-headed-gpu-probe.spec.ts --repeat-each=3
else
  S3=$(grep -E '^\s+✘' $Q/logs/s3-smoke.log.txt | sed -E 's/.*› e2e\/(smoke\/[^ ]+):([0-9]+):[0-9]+ ›.*/\1:\2/' | sort -u)
  S=$( { ids $Q/results/q1-smoke.json; echo "$S3"; } | sort -u)
  echo "### q2 smoke $(echo "$S" | grep -c .) ids $(date '+%H:%M:%S')" >> $L
  # shellcheck disable=SC2086
  sh $Q/run-guarded.sh q2 smoke $S
  S=$(ids $Q/results/q2-smoke.json); echo "### q3 smoke $(echo "$S" | grep -c .) ids $(date '+%H:%M:%S')" >> $L
  # shellcheck disable=SC2086
  [ -n "$S" ] && sh $Q/run-guarded.sh q3 smoke $S
  P=$(ids $Q/results/q1-smoke-perf.json); echo "### q2 smoke-perf $(echo "$P" | grep -c .) ids $(date '+%H:%M:%S')" >> $L
  # shellcheck disable=SC2086
  [ -n "$P" ] && sh $Q/run-perf-guarded.sh q2 $P
fi
echo "### batch $B DONE $(date '+%m-%d %H:%M:%S') load1=$(sysctl -n vm.loadavg | awk '{print $2}')" >> $L
