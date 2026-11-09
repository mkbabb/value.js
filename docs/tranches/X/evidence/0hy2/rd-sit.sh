#!/bin/sh
# §0hy.2 .rd: poll the 1-minute load every 10 min for up to 8 h (48 samples). On a sample < 8 confirmed 2 min later,
# run the W9lg1 L-G1 x2 sitting (run-all.sh, which re-gates load < 8 before each guarded step) in the 4.3.0 tree
# worktree (ff270bed1, tree 27af5703 = v4.3.0^{commit} tree). An aborted sitting resumes polling.
D=~/.dev-logs/bbnf-lockstep/rd-0hy2; T=$D/load-trace.txt; WT=~/.dev-logs/value-430/wt
for i in $(seq 1 48); do
  l=$(sysctl -n vm.loadavg | awk '{print $2}'); echo "$(date -u +%FT%TZ) load1 $l" >> $T
  if awk "BEGIN{exit !($l < 8)}"; then
    sleep 120; l2=$(sysctl -n vm.loadavg | awk '{print $2}'); echo "$(date -u +%FT%TZ) load1 $l2 confirm" >> $T
    if awk "BEGIN{exit !($l2 < 8)}"; then
      echo "$(date -u +%FT%TZ) SIT start" >> $T
      sh $WT/bench/records/W9lg1/run-all.sh > $D/sitting-$i.log 2>&1; rc=$?
      echo "$(date -u +%FT%TZ) SIT end rc $rc" >> $T
      grep -q ALLDONE $D/sitting-$i.log && { echo SAT >> $T; exit 0; }
    fi
  fi
  sleep 600
done
echo NOQUIET >> $T; exit 3
