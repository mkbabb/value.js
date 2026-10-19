# SERVED MODEL: claude-opus-5-5
# KF.W13X RESUME 1 close: bounded quiet-host waiter (addendum (g)); runs test:demo x2 only at 1-min load < 25.
W=$1; OUT=$2; BOUND=${3:-2400}; t=0; n=0
while [ $t -lt $BOUND ] && [ $n -lt 2 ]; do
  L=$(sysctl -n vm.loadavg | awk '{print $2}')
  echo "$(date +%T) load=$L" >> $OUT/quiet-poll.txt
  if [ "$(echo "$L < 25" | bc)" = "1" ]; then
    n=$((n+1)); echo "START $(date +%T) load=$L" > $OUT/test-demo-$n.log.txt
    (cd $W && npm run test:demo) >> $OUT/test-demo-$n.log.txt 2>&1; echo "EXIT=$? END $(date +%T) load=$(sysctl -n vm.loadavg)" >> $OUT/test-demo-$n.log.txt
  else sleep 30; t=$((t+30)); fi
done
echo "DONE runs=$n waited=${t}s $(date +%T) load=$(sysctl -n vm.loadavg)" >> $OUT/quiet-poll.txt
