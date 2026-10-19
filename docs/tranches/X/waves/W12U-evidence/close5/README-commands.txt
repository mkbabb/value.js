SERVED MODEL: claude-opus-5-5
X-W12U Close 5 (RESUME 5 close seat, verify-only), 2026-10-16. All readings on COMMITTED bytes 441ae4013 (product = 56e2abb58 demo + 1c04f8c68 lib).
E=docs/tranches/X/waves/W12U-evidence ; G=~/.claude/guard/guarded
# lib + gh-pages tree (hidden sourcemaps)
$G --timeout 25 -- sh $E/g2d/build-tree.sh 441ae4013 close5          -> ~/.dev-logs/w12u-g2d/close5/tree (removed after)
# baseline lib tree for the names gate (4e525939b = RESUME 5 Open product bytes), lib build only
git worktree add --detach ~/.dev-logs/w12u-g2d/close5-base/tree 4e525939b; cp -c -R node_modules <it>; npm run -s build   (removed after)
E-6:        git show HEAD:src/css/bbnf/generated/grammar.js | npx esbuild --minify --loader=js ; wc -c ; gzip < f | wc -c   x2 -> e6.txt
G2:         (tree) node scripts/perf/eager-bytes.mjs x2 -> g2-eager-r{1,2}.json
eager share:(tree) node $E/r1c7/eager-attrib.mjs dist/gh-pages x2 -> attrib-r{1,2}.txt
chunk-exp:  $G --light -- node $E/g2s2/chunk-exp/run.mjs <tree> <scratch> css|color x2 -> chunk-{css,color}-r{1,2}.txt
facade:     $G --light -- node $E/g2s2/facade-check.mjs <tree> x2 -> facade-r{1,2}.txt
sideEffects:$G --light -- node $E/g2s2/side-effects.mjs <tree> <scratch> x2 -> side-effects-r{1,2}.txt
names:      (tree) $G --light -- node $E/g2s2/names.mjs <base-tree> <tree> x2 -> names-r{1,2}.txt
packed:     (tree) npm pack; $G --light -- node scripts/ci/verify-packed-surface.mjs <tgz> x2 -> packed-surface-r{1,2}.txt
MIRROR:     (tree) $G --timeout 20 -- npm run -s test:css-equivalence -- --maxWorkers=2 x2 -> mirror-r{1,2}.txt
V-C:        (tree) $G --timeout 20 -- npx vite-node bench/wpt-conformance/conformance.ts --misses all x2 -> vc-r{1,2}.txt
O-5 GPU:    $G --timeout 10 -- sh $E/g2d/o5-run.sh <tree> 8197 close5-r{1,2} 3 -> o5-gpu-r{1,2}.txt
moved:      $G --timeout 10 -- sh $E/g2d2/moved-run.sh <tree> 8196 close5-r{1,2} -> moved-r{1,2}.txt
no-cut:     $G --timeout 10 -- sh $E/g2d/nocut-run.sh <tree> 8199 close5-r{1,2} -> nocut-r{1,2}.txt
# q2 export tree (committed bytes incl. api/node_modules): ~/.dev-logs/w12u-q2/tree-441ae4013 (removed after)
floors:     (q2 tree) vue-tsc -p tsconfig.{lib,demo,test}.json --noEmit; tsc -p tsconfig.e2e.json --noEmit (count 'error TS'); eslint . --max-warnings=0  x2 -> floors-r{1,2}.txt, lint-r{1,2}.txt
npm test:   (q2 tree) $G --timeout 30 -- npx vitest run --maxWorkers=2 -> npm-test-r1.txt
smoke x2:   sh $E/q2/batch.sh cl5a 441ae4013 C ; sh $E/q2/batch.sh cl5b 441ae4013 C   -> q2/logs/cl5{a,b}-*, q2/results/cl5{a,b}-*; failing ids -> cl5{a,b}-smoke.f
L-G1:       NOT re-run: src/** vite.config.ts vite.library.ts package.json test bench scripts byte-identical 1c04f8c68..HEAD (git diff --stat empty);
            the .g2s2 L-G1 x2 (g2s2/lg1/out, 103/103) stands on these exact bytes.
