#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — quiet-host gate (§0er): wait for 1-min load < 25, bounded.
lim=${1:-3600}; t=0
while :; do
  l=$(sysctl -n vm.loadavg | awk '{print $2}')
  if awk -v l="$l" 'BEGIN{exit !(l<25)}'; then echo "QUIET load=$l after ${t}s $(date +%H:%M:%S)"; exit 0; fi
  [ $t -ge $lim ] && { echo "TIMEOUT load=$l after ${t}s"; exit 1; }
  sleep 20; t=$((t+20))
done
