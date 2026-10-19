SERVED MODEL: claude-opus-5-5
X.W12U.g2d — commands (repo root; every heavy run through ~/.claude/guard/guarded; trees under ~/.dev-logs/w12u-g2d, removed at the end)
G=docs/tranches/X/waves/W12U-evidence/g2d
# committed-bytes tree (lib build, then gh-pages with hidden maps)
guarded --timeout 20 -- sh $G/build-tree.sh <commit> <tag>
# G2 x2 per tree (instrument + per-source attribution), then the audit classes x2
cd ~/.dev-logs/w12u-g2d/<tag>/tree; for i in 1 2; do node scripts/perf/eager-bytes.mjs > ../eager-r$i.json; node $G/eager-files.mjs dist/gh-pages > ../files-r$i.txt; node $G/audit-classify.mjs ../files-r$i.txt > ../audit-r$i.txt; done; cmp ../files-r1.txt ../files-r2.txt
# experiment arms (scratch worktree of ec470afa4 + arm script; never committed)
guarded --timeout 30 -- sh $G/exp/exp-build.sh ec470afa4 armA|armB|armC $PWD/$G/exp/arm{A,B,C}.sh
guarded --light -- node $G/exp/root-barrel-rolldown.mjs ~/.dev-logs/w12u-g2d/exp-rd
# O-5 GPU witness x2 (headless channel:'chrome', ANGLE-Metal asserted in o5-gpu-witness.mjs), 3 sittings each
for i in 1 2; do guarded --timeout 10 -- sh $G/o5-run.sh ~/.dev-logs/w12u-g2d/final/tree 8197 final-r$i 3; done
# O-5 attribution (CDP CPU profile over the boot window, sourcemapped)
guarded --timeout 10 -- sh $G/profile-run.sh ~/.dev-logs/w12u-g2d/m2/tree 8198 m2 2
# no feature cut x2
for i in 1 2; do guarded --timeout 10 -- sh $G/nocut-run.sh ~/.dev-logs/w12u-g2d/final/tree 8199 final-r$i; done
# floors
guarded --light -- npm run -s typecheck   (x2)   ;   npm run -s lint   (x2)
