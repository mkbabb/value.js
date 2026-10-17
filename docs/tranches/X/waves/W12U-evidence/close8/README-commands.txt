SERVED MODEL: claude-opus-5-5
X-W12U Close 8 (RESUME 8 close seat, 2026-10-17, Track A, verify-only; COHESION §0fw / W12U ADDENDUM (l)).
Every reading on COMMITTED HEAD a027974f6 (product = .o5c 9e0212c46 + X-DS VP5 3d73afb54 + X-DS VC6 b84fda97d);
post tree T=~/.dev-logs/w12u-g2d/close8/tree, pre-cure base tree B=~/.dev-logs/w12u-g2d/close8-base/tree (955efaa03); both removed at teardown.
G=~/.claude/guard/guarded ; E=docs/tranches/X/waves/W12U-evidence

build:       $G --timeout 40 -- sh -c "sh $E/g2d/build-tree.sh a027974f6 close8 && sh $E/g2d/build-tree.sh 955efaa03 close8-base"
boot A/B x2: $G --timeout 20 -- sh $E/close8/ab-interleave.sh B T close8-ab-r{1,2} 6   -> ab-r{1,2}.txt (6 rounds, base/post alternating, load per sitting)
             verdict (post mean <= base mean AND post max <= base max), awk over ab-r{1,2}.txt -> ab-verdict.txt
O-5 x2:      $G --timeout 10 -- sh $E/o5c/o5-mv-run.sh T 8251 close8-r{1,2} 3          -> o5-mv-r{1,2}.txt
reveal x2:   $G --timeout 6  -- sh $E/o5c/reveal-run.sh T 8252 close8-r{1,2}            -> reveal-r{1,2}.txt
no-cut x2:   $G --timeout 10 -- sh $E/g2d/nocut-run.sh T 8253 close8-nocut-r{1,2}       -> nocut-r{1,2}.txt
G2 x2:       (T) $G --light -- node scripts/perf/eager-bytes.mjs                         -> g2-r{1,2}.txt
floors x2:   (T) $G --light -- vue-tsc -p tsconfig.{lib,demo,test}.json + tsc -p tsconfig.e2e.json (count 'error TS') + eslint . --max-warnings=0 -> floors-r{1,2}.txt
smoke x2:    sh $E/close8/smoke-batch.sh cl8{a,b} T (copy of close7/smoke-batch.sh)    -> smoke/
npm test x2: (T) $G --timeout 12 -- npx vitest run --maxWorkers=2                      -> npm-test-r{1,2}.log.txt
