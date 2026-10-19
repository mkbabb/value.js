SERVED MODEL: claude-opus-5-5
X.W12U.g2d2 — commands (repo root; heavy runs via ~/.claude/guard/guarded; trees under ~/.dev-logs/w12u-g2d/<tag>, removed at the end)
G=docs/tranches/X/waves/W12U-evidence/g2d ; G2=docs/tranches/X/waves/W12U-evidence/g2d2
# committed-bytes tree (the g2d instrument, unchanged)
guarded --timeout 25 -- sh $G/build-tree.sh <commit> <tag>
# G2 x2 + per-source attribution x2 + audit classes x2 (the g2d instruments, unchanged)
cd ~/.dev-logs/w12u-g2d/<tag>/tree; for i in 1 2; do node scripts/perf/eager-bytes.mjs > ../eager-r$i.json; node $G/eager-files.mjs dist/gh-pages > ../files-r$i.txt; node $G/audit-classify.mjs ../files-r$i.txt > ../audit-r$i.txt; done; cmp ../files-r1.txt ../files-r2.txt
# scratch arms (never committed): detached worktree + arm script
guarded --timeout 30 -- sh $G/exp/exp-build.sh <commit> g2d2-armX $PWD/$G2/exp/armX.sh
# no feature cut x2 for the two moves (menus' Avatar renders in the opened menu; the loading plate carries its 2 Skeleton bars on a held pane chunk)
for i in 1 2; do guarded --timeout 10 -- sh $G2/moved-run.sh ~/.dev-logs/w12u-g2d/g2d2-final/tree 8196 final-r$i > $G2/readings/moved-final-r$i.txt; done
# routes render x2 (the g2d probe, unchanged)
for i in 1 2; do guarded --timeout 10 -- sh $G/nocut-run.sh ~/.dev-logs/w12u-g2d/g2d2-final/tree 8199 final-r$i > $G2/readings/nocut-final-r$i.txt; done
# O-5 real-GPU witness x2 (headless channel:'chrome', ANGLE-Metal asserted), 3 sittings each
for i in 1 2; do guarded --timeout 10 -- sh $G/o5-run.sh ~/.dev-logs/w12u-g2d/g2d2-final/tree 8197 final-r$i 3 > $G2/readings/o5-final-r$i.txt; done
# floors x2 in the committed final tree (api/node_modules APFS-cloned for the demo/test programs; note: pretypecheck runs the lib build, which
# empties dist/ incl. dist/gh-pages — the probe reads were therefore taken AFTER the floors, on a rebuilt gh-pages; G2 re-read x2 = 293,980, readings/final-rebuild-eager-r{1,2}.json)
cd ~/.dev-logs/w12u-g2d/g2d2-final/tree; for i in 1 2; do guarded --light -- npm run -s typecheck > $G2/readings/typecheck-r$i.txt; guarded --light -- npm run -s lint > $G2/readings/lint-r$i.txt; done
