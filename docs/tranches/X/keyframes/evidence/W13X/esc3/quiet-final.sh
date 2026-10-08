# SERVED MODEL: claude-opus-5-5 — KF.W13X.esc3, the gates at the COMMITTED head (kf 2f76c390, worktree keyframes-wt-W13X-esc3-final, dev :5873):
# every timing/served reading starts only at a 1-minute load < 25 (COHESION §0er), each bounded to 60 min of waiting.
D=$(cd "$(dirname "$0")" && pwd); cd "$D" || exit 1
quiet() { n=0; while :; do l=$(sysctl -n vm.loadavg | awk '{print $2}'); if awk "BEGIN{exit !($l < 25)}"; then echo "$l"; return 0; fi; n=$((n+1)); [ $n -gt 180 ] && { echo "TIMEOUT load=$l"; return 1; }; sleep 20; done; }
for r in 1 2; do
  for probe in s1 t1; do
    l=$(quiet) || { echo "$probe final-r$r UNREAD $l"; continue; }
    echo "$probe final-r$r start $(date +%T) load=$l"
    if [ "$r" = 1 ]; then node $probe.mjs http://localhost:5873/ "final-r$r" frames > "$probe-final-r$r.json"; else node $probe.mjs http://localhost:5873/ "final-r$r" > "$probe-final-r$r.json"; fi
    node -e "const d=require('./$probe-final-r$r.json');console.log('$probe final-r$r',d.pass+'/'+d.of)"
    echo "$probe final-r$r end load=$(sysctl -n vm.loadavg | awk '{print $2}')"
  done
done
W=/Users/mkbabb/Programming/keyframes-wt-W13X-esc3-final
cd $W || exit 1
for r in 1 2; do
  npx vitest run --project demo test/demo/scenes/spring-sweep-time-base.test.ts test/demo/instrument/lane-track-primitive.test.ts > "$D/unit-final-r$r.log" 2>&1; echo "unit final r$r EXIT=$?"; grep -E "Tests " "$D/unit-final-r$r.log"
done
for r in 1 2; do
  npm run check > "$D/check-r$r.log" 2>&1; echo "check r$r EXIT=$?"; tail -1 "$D/check-r$r.log"
  npm run lint > "$D/lint-r$r.log" 2>&1; echo "lint r$r EXIT=$?"; grep "dependency violations" "$D/lint-r$r.log"
  l=$(cd "$D" && quiet) || { echo "test:demo r$r UNREAD $l"; continue; }
  echo "test:demo r$r start $(date +%T) load=$l"
  npm run test:demo > "$D/test-demo-r$r.log" 2>&1; echo "EXIT=$?"
  grep -E 'Test Files|Tests  |Duration' "$D/test-demo-r$r.log"
  echo "test:demo r$r end load=$(sysctl -n vm.loadavg | awk '{print $2}')"
done
npm run build > "$D/build.log" 2>&1; echo "build EXIT=$?"; tail -3 "$D/build.log"
for r in 1 2; do
  l=$(cd "$D" && quiet) || { echo "gh-pages r$r UNREAD $l"; continue; }
  echo "gh-pages r$r start $(date +%T) load=$l"
  npm run gh-pages > "$D/gh-pages-r$r.log" 2>&1; echo "gh-pages r$r EXIT=$?"; tail -2 "$D/gh-pages-r$r.log"
  echo "gh-pages r$r end load=$(sysctl -n vm.loadavg | awk '{print $2}')"
done
echo DONE
