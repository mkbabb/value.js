#!/usr/bin/env bash
# X-DS CLOSE r2 (2026-10-17): every gate x2, serially, each through ~/.claude/guard/guarded.
# value.js and keyframes.js run in detached worktrees at their HEADs (other seats' dirty hunks excluded);
# (the value worktree carries APFS clones of node_modules, not symlinks: a symlinked node_modules put KaTeX fonts
# outside vite's serving allow list and fed a symlink to B3's file walker; that run is kept as value/symlinked-worktree-discarded/)
# fourier runs in place (its tree is clean at HEAD).
set -u
G=~/.claude/guard/guarded
OUT=/Users/mkbabb/Programming/value.js/docs/tranches/X/evidence/DS/close/r2-2026-10-17
VWT=/Users/mkbabb/Programming/value.js/.worktrees/ds-close-r2
KWT=/Users/mkbabb/Programming/keyframes.js/.worktrees/ds-close-r2
FR=/Users/mkbabb/Programming/fourier-analysis
step() { echo "== $(date +%H:%M:%S) $1"; }
if [ -z "${SKIP_VALUE_UNIT:-}" ]; then for n in 1 2; do
  step "value typecheck $n"; (cd $VWT && $G --light -- npm run typecheck > $OUT/value/typecheck-$n.log 2>&1; echo "exit $?" >> $OUT/value/typecheck-$n.log)
  step "value vitest $n"; (cd $VWT && $G --rss-gb 10 -- npx vitest run --maxWorkers=2 > $OUT/value/vitest-$n.log 2>&1; echo "exit $?" >> $OUT/value/vitest-$n.log)
done; fi
for n in 1 2; do
  step "value e2e $n"; (cd $VWT && VJS_E2E_PORT=9293 $G --timeout 75 --rss-gb 12 -- npx playwright test --project=smoke --project=smoke-admin --project=smoke-mobile --workers=1 --reporter=line > $OUT/value/e2e-$n.log 2>&1; echo "exit $?" >> $OUT/value/e2e-$n.log)
done
for n in 1 2; do
  step "kf check $n"; (cd $KWT && $G --light -- npm run check > $OUT/keyframes/check-$n.log 2>&1; echo "exit $?" >> $OUT/keyframes/check-$n.log)
  step "kf lint $n"; (cd $KWT && $G --light -- npm run lint > $OUT/keyframes/lint-$n.log 2>&1; echo "exit $?" >> $OUT/keyframes/lint-$n.log)
  step "kf test:demo $n"; (cd $KWT && $G --rss-gb 8 -- npx vitest run --project demo --maxWorkers=2 > $OUT/keyframes/test-demo-$n.log 2>&1; echo "exit $?" >> $OUT/keyframes/test-demo-$n.log)
  step "kf test:lib $n"; (cd $KWT && $G --rss-gb 8 -- npx vitest run --project library --maxWorkers=2 > $OUT/keyframes/test-lib-$n.log 2>&1; echo "exit $?" >> $OUT/keyframes/test-lib-$n.log)
done
for n in 1 2; do
  step "fourier vue-tsc $n"; (cd $FR/web && $G --light -- npx vue-tsc -b > $OUT/fourier/vue-tsc-$n.log 2>&1; echo "exit $?" >> $OUT/fourier/vue-tsc-$n.log)
  step "fourier vitest $n"; (cd $FR/web && $G --light -- npx vitest run --maxWorkers=2 > $OUT/fourier/vitest-$n.log 2>&1; echo "exit $?" >> $OUT/fourier/vitest-$n.log)
done
for r in A B; do
  step "fourier e2e $r"; $G --timeout 75 --rss-gb 14 -- $OUT/fourier/e2e-run.sh $r > $OUT/fourier/e2e-wrap-$r.log 2>&1
done
step "done"
