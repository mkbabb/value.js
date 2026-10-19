# SERVED MODEL: claude-opus-5-5 — KF.W13X.esc3: every timing/served reading starts only at a 1-minute load < 25 (COHESION §0er), each bounded to 60 min of waiting.
# Served falsifiers S1 (ESC-spring-1) and T1 (ESC-W13X-tl-1) BEFORE (pristine worktree at 7ed8b703, dev :5871) and AFTER (cure worktree, dev :5872) interleaved x2;
# then, at the cure bytes: the unit falsifiers x2, check x2, lint x2, test:demo x2, build, gh-pages x2.
D=$(cd "$(dirname "$0")" && pwd); cd "$D" || exit 1
quiet() { n=0; while :; do l=$(sysctl -n vm.loadavg | awk '{print $2}'); if awk "BEGIN{exit !($l < 25)}"; then echo "$l"; return 0; fi; n=$((n+1)); [ $n -gt 180 ] && { echo "TIMEOUT load=$l"; return 1; }; sleep 20; done; }
for r in 1 2; do
  for leg in "before http://localhost:5871/" "after-dev http://localhost:5872/"; do
    set -- $leg
    for probe in s1 t1; do
      l=$(quiet) || { echo "$probe $1-r$r UNREAD $l"; continue; }
      echo "$probe $1-r$r start $(date +%T) load=$l"
      if [ "$r" = 1 ]; then node $probe.mjs "$2" "$1-r$r" frames > "$probe-$1-r$r.json"; else node $probe.mjs "$2" "$1-r$r" > "$probe-$1-r$r.json"; fi
      node -e "const d=require('./$probe-$1-r$r.json');console.log('$probe $1-r$r',d.pass+'/'+d.of)"
      echo "$probe $1-r$r end load=$(sysctl -n vm.loadavg | awk '{print $2}')"
    done
  done
done
W=/Users/mkbabb/Programming/keyframes-wt-W13X-esc3-cure
B=/Users/mkbabb/Programming/keyframes-wt-W13X-esc3-before
for r in 1 2; do
  (cd $B && npx vitest run --project demo test/demo/scenes/spring-sweep-time-base.test.ts test/demo/instrument/lane-track-primitive.test.ts > "$D/unit-before-r$r.log" 2>&1; echo "unit before r$r EXIT=$?"; grep -E "Tests " "$D/unit-before-r$r.log")
  (cd $W && npx vitest run --project demo test/demo/scenes/spring-sweep-time-base.test.ts test/demo/instrument/lane-track-primitive.test.ts > "$D/unit-after-r$r.log" 2>&1; echo "unit after r$r EXIT=$?"; grep -E "Tests " "$D/unit-after-r$r.log")
done
cd $W || exit 1
for r in 1 2; do
  npm run check > "$D/check-r$r.log" 2>&1; echo "check r$r EXIT=$?"
  npm run lint > "$D/lint-r$r.log" 2>&1; echo "lint r$r EXIT=$?"
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
