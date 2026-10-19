# SERVED MODEL: claude-opus-5-5 — KF.W13X.dh2: kf `npm run test:demo` x2 at the final bytes (worktree keyframes-wt-W13X-dh2), each started only at a 1-minute load < 25 (COHESION §0er), bounded.
D=$(pwd)
cd /Users/mkbabb/Programming/keyframes-wt-W13X-dh2 || exit 1
for r in 1 2; do
  n=0
  while :; do
    l=$(sysctl -n vm.loadavg | awk '{print $2}')
    if awk "BEGIN{exit !($l < 25)}"; then break; fi
    n=$((n+1)); [ $n -gt 120 ] && { echo "TIMEOUT load=$l"; exit 1; }
    sleep 20
  done
  echo "test:demo r$r start $(date +%T) load=$l"
  npm run test:demo > "$D/test-demo-r$r.log" 2>&1; echo "EXIT=$?"
  grep -E 'Test Files|Tests  ' "$D/test-demo-r$r.log"
  echo "end load=$(sysctl -n vm.loadavg | awk '{print $2}')"
done
