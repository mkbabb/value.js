#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — r4pane: the remaining served readings in sequence (load recorded per reading; §0ev item 2: functional reads are taken now under load)
d=$(dirname "$0")
one() { { echo "load-start $(sysctl -n vm.loadavg) $(date +%H:%M:%S)"; timeout 900 node "$d/probe.mjs" "$1" "$2" 2>&1 | cut -c1-600; echo "load-end $(sysctl -n vm.loadavg) $(date +%H:%M:%S)"; } > "$d/$2.log" 2>&1; }
one http://localhost:5894 after-r1
one http://localhost:5895 before-r2
one http://localhost:5894 after-r2
echo SEQ-DONE >> "$d/after-r2.log"
