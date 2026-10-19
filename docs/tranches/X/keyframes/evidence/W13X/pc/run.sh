#!/bin/sh
# SERVED MODEL: claude-opus-5-5 — KF.W13X.pc: one served falsifier reading at the quiet-host gate (§0er).
# usage: sh run.sh <base> <tag>   → <tag>/<tag>.log (load before/after recorded beside the reading)
d=$(dirname "$0"); base=$1; tag=$2; mkdir -p "$d/$tag"
sh "$d/wait-quiet.sh" 3000 || exit 1
{ echo "load-start $(sysctl -n vm.loadavg) $(date +%H:%M:%S) base=$base"; node "$d/measure.mjs" "$base" "$tag" "$d/$tag" 2>&1 | cut -c1-260; echo "load-end $(sysctl -n vm.loadavg) $(date +%H:%M:%S)"; } > "$d/$tag/$tag.log"
tail -3 "$d/$tag/$tag.log"
