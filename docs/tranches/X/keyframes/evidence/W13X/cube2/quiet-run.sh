#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — X.KF.W13X.cube2 quiet-host wrapper (§0er): waits (≤60 min) for 1-min load < 25, then runs "$@"
for i in $(seq 1 360); do l=$(sysctl -n vm.loadavg | awk '{print $2}'); if [ "$(echo "$l < 25" | bc)" = 1 ]; then echo "QUIET-START load1=$l $(date +%H:%M:%S)"; exec "$@"; fi; sleep 10; done; echo "UNREAD: load never < 25 within 60 min"; exit 3
