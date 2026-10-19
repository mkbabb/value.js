SERVED MODEL: claude-opus-5-5
X.W12U.g2s2 (COHESION §0ft.1; W12U.md ADDENDUM (i)) — gates read on COMMITTED bytes.
Product commit 1c04f8c68; baseline 4e525939b (RESUME 5 Open HEAD's product bytes = 90d6e9f4d's).
Trees: ~/.claude/guard/guarded --timeout 25 -- sh W12U-evidence/g2d/build-tree.sh 1c04f8c68 g2s2   (and 4e525939b g2s2-base)
       detached worktrees ~/.dev-logs/w12u-g2d/{g2s2,g2s2-base}/tree, lib build then gh-pages hidden sourcemaps; removed after.
       api/ and docs/ node_modules APFS-cloned into the g2s2 tree for the demo/test typecheck programs (environment, not bytes).
chunk-exp (i):  guarded --light -- node chunk-exp/run.mjs <tree> <scratch> css|color      x2 -> chunk-exp/{css,color}-r{1,2}.txt
facade:         guarded --light -- node facade-check.mjs <tree>                           x2 -> facade-r{1,2}.txt
sideEffects:    guarded --light -- node side-effects.mjs <tree> <scratch>                 x2 -> side-effects-r{1,2}.txt
names (iii):    guarded --light -- node names.mjs <base-tree> <tree>                      x2 -> names-r{1,2}.txt
packed surface: npm pack (tree); guarded --light -- node scripts/ci/verify-packed-surface.mjs <tgz>  x2 -> packed-surface-r{1,2}.txt
eager share:    (tree) node W12U-evidence/r1c7/eager-attrib.mjs dist/gh-pages             x2 -> attrib-r{1,2}.txt
G2 (info):      (tree) node scripts/perf/eager-bytes.mjs                                  x2 -> eager-r{1,2}.json (differ only in generatedAt)
E-6:            git show 1c04f8c68:src/css/bbnf/generated/grammar.js | npx esbuild --minify --loader=js ; wc -c ; gzip < f | wc -c   x2 -> e6.txt
L-G1 trigger:   guarded --light -- node bench/records/W8lg1c/entry-diff.mjs <scratch> 4e525939b 1c04f8c68  x2 -> entry-diff-r{1,2}.txt
L-G1 x2:        bash lg1/run-all.sh <tree> lg1/out   (node reads 1/2; chromium, webkit (--exclusive webkit), firefox; bootstrap) -> lg1/out/**
floors:         (tree) guarded --light -- vue-tsc -p tsconfig.{lib,demo,test}.json --noEmit; tsc -p tsconfig.e2e.json; eslint . --max-warnings=0  x2 -> floors-r{1,2}.txt
MIRROR / V-C / npm test: see mirror-r*, vc-r*, npm-test-r* (run in the tree, heavy pool, after L-G1).
