# SERVED MODEL: claude-opus-5-5 — KF.W13X.dh2: the served predicates, each run only at a 1-minute load < 25 (COHESION §0er), bounded (~30 min per run).
# Usage: sh quiet-gh.sh <base> <tag> [first-run-frames-dir] ; runs r1, r2.
for r in 1 2; do
  n=0
  while :; do
    l=$(sysctl -n vm.loadavg | awk '{print $2}')
    if awk "BEGIN{exit !($l < 25)}"; then break; fi
    n=$((n+1)); [ $n -gt 90 ] && { echo "TIMEOUT load=$l"; exit 1; }
    sleep 20
  done
  echo "run $r start $(date +%T) load=$l"
  if [ $r = 1 ] && [ -n "$3" ]; then node dh2.mjs "$1" "$2-q$r" "$3" 2>&1 | tail -1; else node dh2.mjs "$1" "$2-q$r" 2>&1 | tail -1; fi
  echo "run $r end load=$(sysctl -n vm.loadavg | awk '{print $2}')"
done
