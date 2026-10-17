SERVED MODEL: claude-opus-5-5
X-W12U RESUME 6 Open baseline (seat 0, read-only), 2026-10-17, on COMMITTED bytes cd21d41b5 (product byte-identical to 441ae4013).
E=docs/tranches/X/waves/W12U-evidence ; G=~/.claude/guard/guarded
$G --timeout 25 -- sh $E/g2d/build-tree.sh cd21d41b5 open6      -> ~/.dev-logs/w12u-g2d/open6/tree (removed after) ; build.txt
G2:  (tree) node scripts/perf/eager-bytes.mjs x2                 -> g2-eager-r{1,2}.txt
O-5: $G --timeout 10 -- sh $E/g2d/o5-run.sh <tree> 8197 open6-r1 3 -> o5-gpu-r1.txt
