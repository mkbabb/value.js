#!/bin/sh
# §0hy.2 .rd resume: the remaining W9lg1 steps, each run only when load1 < 8 (sampled, confirmed 2 min later),
# each banked to partial-16/ the moment it ends; polled every 10 min until 12:38Z (the 8 h bound from 04:38Z).
D=~/.dev-logs/bbnf-lockstep/rd-0hy2; T=$D/load-trace.txt; WT=~/.dev-logs/value-430/wt; G=~/.claude/guard/guarded
cd $WT || exit 1; R=bench/records/W9lg1
STEPS="chromium-n31-eq|chromium|acc-eq,rej-eq||eq
webkit-n31-main|webkit|acc,rej,large-eq||main
webkit-n31-eq|webkit|acc-eq,rej-eq||eq
firefox-n31-acc|firefox|acc||acc
firefox-n31-rej|firefox|rej||rej
firefox-n31-leq|firefox|large-eq||leq
firefox-n31-eq|firefox|acc-eq,rej-eq||eq
firefox-n31-whole|firefox|whole|parseCssScalar|whole"
quiet() { l=$(sysctl -n vm.loadavg | awk '{print $2}'); echo "$(date -u +%FT%TZ) load1 $l" >> $T; awk "BEGIN{exit !($l < 8)}" || return 1
  sleep 120; l=$(sysctl -n vm.loadavg | awk '{print $2}'); echo "$(date -u +%FT%TZ) load1 $l confirm" >> $T; awk "BEGIN{exit !($l < 8)}"; }
echo "$STEPS" | while IFS='|' read name eng cls ent suf; do
  [ -f $D/partial-16/browser/$name.log ] && grep -q 'guarded exit 0' $D/partial-16/browser/$name.log && continue
  while :; do
    [ "$(date -u +%H%M)" -ge 1238 ] && { echo "NOQUIET before $name" >> $T; exit 3; }
    if quiet; then
      X=""; [ $eng = webkit ] && X="--exclusive webkit"; TO=60; [ $eng = firefox ] && TO=90
      echo "$(date -u +%FT%TZ) STEP $name" >> $T
      { uptime; $G --cpu-cores 0 $X --timeout $TO -- sh $R/browser-read.sh $eng 31 $cls "$ent" $suf; echo "guarded exit $?"; uptime; } > $R/browser/$name.log 2>&1
      cp $R/browser/$name.log $D/partial-16/browser/; cp $R/browser/w9lg1-$eng-n31-$suf.json $D/partial-16/browser/ 2>/dev/null
      grep -q 'guarded exit 0' $R/browser/$name.log && break
    fi
    sleep 600
  done
done
[ $? = 3 ] && exit 3
echo "SAT resume $(date -u +%FT%TZ)" >> $T
