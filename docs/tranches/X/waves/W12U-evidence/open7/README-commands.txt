SERVED MODEL: claude-opus-5-5
X-W12U RESUME 7 OPEN baseline (2026-10-17, seat 0, Track A), read-only, on COMMITTED 955efaa03
(product bytes identical to 441ae4013: git diff --stat 441ae4013 HEAD -- src demo e2e scripts vite.config.ts vite.library.ts package.json -> empty).
1. ~/.claude/guard/guarded --timeout 25 -- sh ../g2d/build-tree.sh 955efaa03 open7            -> build.txt (rc=0)
2. ~/.claude/guard/guarded --timeout 10 -- sh o5-mv-run.sh <tree> 8197 open7-r{1,2} 3          -> o5-mv-r{1,2}.txt
   o5-mv-baseline.mjs = g2d/o5-gpu-witness.mjs copied (E-3: original untouched) with the §0fv.1 window
   (frames after the first rAF frame >= mainVisible) and the boot task banked (longest longtask before mainVisible).
3. (tree) node scripts/perf/eager-bytes.mjs x2                                                 -> g2-r{1,2}.txt
4. git worktree remove --force ~/.dev-logs/w12u-g2d/open7/tree ; lsof -ti :8197 -> 0
