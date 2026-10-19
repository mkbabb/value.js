SERVED MODEL: claude-opus-5-5
X-W12U Close 6 (RESUME 6 close seat, VERIFY-ONLY), 2026-10-17, on COMMITTED bytes 52263021e (product byte-identical to 441ae4013: git diff --stat 441ae4013 HEAD -- src demo e2e scripts vite.config.ts vite.library.ts package.json -> empty).
E=docs/tranches/X/waves/W12U-evidence ; G=~/.claude/guard/guarded ; T=~/.dev-logs/w12u-g2d/close6/tree (removed at teardown)
$G --timeout 25 -- sh $E/g2d/build-tree.sh 52263021e close6            -> build.txt
G2:   (T) node scripts/perf/eager-bytes.mjs x2                         -> g2-eager-r{1,2}.txt (eager JS gz=293975 x2; identical but generatedAt)
O-5:  $G --timeout 10 -- sh $E/g2d/o5-run.sh $T 8197 close6-r{1,2} 3    -> o5-gpu-r{1,2}.txt (VERDICT RED 0/3 x2)
floors: cp -cR api/node_modules $T/api/node_modules (as q2/export.sh does; without it demo/test read 46 TS2307 'mongodb' each, an instrument artefact)
        (T) $G --light -- vue-tsc lib/demo/test + tsc e2e + npm run lint, x2  -> floors-r{1,2}.txt ("0 0 0 0 lint=0" x2)
no-cut: $G --timeout 10 -- sh $E/g2d/nocut-run.sh $T 8199 close6-r{1,2} -> nocut-r{1,2}.txt (VERDICT GREEN x2)
smoke --workers=1 x2 and npm test: cited on byte identity from Close 5 cl5{a,b} (441ae4013); not re-run.
