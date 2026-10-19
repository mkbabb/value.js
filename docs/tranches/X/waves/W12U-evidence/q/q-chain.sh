#!/bin/sh
# SERVED MODEL: claude-opus-5-5
# X.W12U.q (sitting 3, 2026-10-15) — the §0ev.2 re-run round q1, serial, one
# heavy run at a time, each under the guard (run-guarded.sh / run-perf-guarded.sh):
#   smoke           : the 41 s2 failures sitting 2's s3 round never reached
#                     (the session died at 13:24 on 10-14: WindowServer abort)
#   smoke-perf      : the 4 still failing after s3 (re-run 2)
#   oracles-safari  : the 45 s2 failures (re-run 1)
#   WebKit re-read  : addendum (e) — smoke-safari dual-webgl-atmosphere and
#                     oracles-safari o3, --repeat-each=3 (three reads, no retries)
# usage (repository root): sh q-chain.sh
Q=docs/tranches/X/waves/W12U-evidence/q
L=$Q/logs/q1-chain.txt
echo "### q1 chain start $(date '+%m-%d %H:%M:%S') head=$(git rev-parse --short HEAD)" > $L
S=$(node $Q/failures.mjs $Q/results/s2-smoke.json --ids | sort -u | sed -n '10,$p')
echo "### smoke: $(echo "$S" | wc -l | tr -d ' ') ids" >> $L
# shellcheck disable=SC2086
sh $Q/run-guarded.sh q1 smoke $S
P=$(node $Q/failures.mjs $Q/results/s3-smoke-perf.json --ids | sort -u)
echo "### smoke-perf: $(echo "$P" | wc -l | tr -d ' ') ids $(date '+%H:%M:%S')" >> $L
# shellcheck disable=SC2086
sh $Q/run-perf-guarded.sh q1 $P
O=$(node $Q/failures.mjs $Q/results/s2-oracles-safari.json --ids | sort -u)
echo "### oracles-safari: $(echo "$O" | wc -l | tr -d ' ') ids $(date '+%H:%M:%S')" >> $L
# shellcheck disable=SC2086
sh $Q/run-guarded.sh q1 oracles-safari $O
echo "### webkit re-read $(date '+%H:%M:%S')" >> $L
sh $Q/run-guarded.sh q1wk smoke-safari e2e/smoke/safari/dual-webgl-atmosphere.spec.ts --repeat-each=3
sh $Q/run-guarded.sh q1wk oracles-safari e2e/smoke/oracles/o3-headed-gpu-probe.spec.ts --repeat-each=3
echo "### CHAIN DONE $(date '+%m-%d %H:%M:%S')" >> $L
