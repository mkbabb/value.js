#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.pc2: the unit floor (check, lint), one heavy run at a time,
# after the host-load wait of COHESION §0fa (poll 60 s, up to 20 min, while the 1-minute load is > 150).
d=$(cd "$(dirname "$0")" && pwd); tag=$1; cd /Users/mkbabb/Programming/keyframes.js || exit 1
i=0; while [ $i -lt 20 ]; do l=$(sysctl -n vm.loadavg | awk '{print int($2)}'); [ "$l" -le 150 ] && break; echo "wait $i load $l $(date +%H:%M:%S)" >> "$d/gates-$tag.log"; sleep 60; i=$((i+1)); done
echo "check load-start $(sysctl -n vm.loadavg) $(date +%H:%M:%S) kf=$(git rev-parse --short HEAD)" >> "$d/gates-$tag.log"
npm run check > "$d/check-$tag.log" 2>&1; echo "check EXIT $? load-end $(sysctl -n vm.loadavg) $(date +%H:%M:%S)" >> "$d/gates-$tag.log"
npm run lint > "$d/lint-$tag.log" 2>&1; echo "lint EXIT $? load-end $(sysctl -n vm.loadavg) $(date +%H:%M:%S)" >> "$d/gates-$tag.log"
echo DONE >> "$d/gates-$tag.log"
