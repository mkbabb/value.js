# SERVED MODEL: claude-opus-5-5 — r4state: test:demo x2, each started only at 1-minute load < 25 (§0er quiet-host gate), waits <= 60 min
E=/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13X/r4state
cd /Users/mkbabb/Programming/keyframes.js || exit 1
for i in 1 2; do
  n=0
  while :; do
    L=$(sysctl -n vm.loadavg | awk '{print $2}')
    if [ "$(echo "$L < 25" | bc)" = 1 ]; then break; fi
    n=$((n+1)); [ $n -gt 360 ] && { echo "UNREAD r$i load $L" > $E/test-demo-r$i.log; continue 2; }
    sleep 10
  done
  echo "START load $L $(date +%T)" > $E/test-demo-r$i.log
  npm run test:demo >> $E/test-demo-r$i.log 2>&1
  echo "EXIT=$? END load $(sysctl -n vm.loadavg | awk '{print $2}')" >> $E/test-demo-r$i.log
done
echo DONE
