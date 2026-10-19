# SERVED MODEL: claude-opus-5-5 — KF.W13X.esc1: every timing/served reading started only at a 1-minute load < 25 (COHESION §0er), each bounded to 60 min of waiting:
# served falsifier BEFORE (pristine worktree at 2f259248, dev :5852) and AFTER (worktree at 1688c84c, dev :5851) interleaved x2, then kf `npm run test:demo` x2 at the final bytes.
D=$(cd "$(dirname "$0")" && pwd); cd "$D" || exit 1
quiet() { n=0; while :; do l=$(sysctl -n vm.loadavg | awk '{print $2}'); if awk "BEGIN{exit !($l < 25)}"; then echo "$l"; return 0; fi; n=$((n+1)); [ $n -gt 180 ] && { echo "TIMEOUT load=$l"; return 1; }; sleep 20; done; }
for r in 1 2; do
  for leg in "before http://localhost:5852/" "after-dev http://localhost:5851/"; do
    set -- $leg; l=$(quiet) || { echo "$1-r$r UNREAD $l"; continue; }
    echo "$1-r$r start $(date +%T) load=$l"
    if [ "$r" = 1 ]; then node esc1.mjs "$2" "$1-r$r" frames; else node esc1.mjs "$2" "$1-r$r"; fi | tail -15
    echo "$1-r$r end load=$(sysctl -n vm.loadavg | awk '{print $2}')"
  done
done
cd /Users/mkbabb/Programming/keyframes-wt-W13X-esc1 || exit 1
for r in 1 2; do
  l=$(cd "$D" && quiet) || { echo "test:demo r$r UNREAD $l"; continue; }
  echo "test:demo r$r start $(date +%T) load=$l"
  npm run test:demo > "$D/test-demo-r$r.log" 2>&1; echo "EXIT=$?"
  grep -E 'Test Files|Tests  ' "$D/test-demo-r$r.log"
  echo "test:demo r$r end load=$(sysctl -n vm.loadavg | awk '{print $2}')"
done
