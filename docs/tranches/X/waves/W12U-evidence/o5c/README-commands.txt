SERVED MODEL: claude-opus-5-5
X.W12U.o5c (2026-10-17, Track A, RESUME 7). COHESION §0fv arms (a)(b)(c) + gate 4; W12U.md ADDENDUM (k).
G=~/.claude/guard/guarded ; trees under ~/.dev-logs/w12u-g2d/<tag>/tree (g2d/build-tree.sh: lib + gh-pages, hidden maps)

INSTRUMENTS (new, committed here; E-3: g2d/** and open7/** untouched)
  o5-mv-witness.mjs  the lawful §0fv.1 witness: g2d/o5-gpu-witness.mjs measurement with the window from the first rAF frame
                     >= mainVisible, 4,000 ms, legs unchanged (frames>10 · max<=3x median · dropped<=10%), ANGLE-Metal
                     asserted (exit 2 otherwise), boot task banked (longest pre-t0 longtask; > 122 ms = RED, exit 1),
                     preT0 = every pre-t0 longtask. o5-mv-run.sh serves a tree and runs it.
  reveal-probe.mjs   the dock-reveal identity + CLS probe: per-rAF band layout rect (offset*), veil/land class, dock in DOM,
                     band visibility, main offsetTop; layout-shift sum + sources; the dock's finite running animations at
                     first sighting and at reveal; the land animation's computed name/duration/delay. Cells 1280x720 light
                     + dark (the O-5 cell), 390x844, 844x390. reveal-run.sh serves a tree and runs it.
  band-floor-probe.mjs  settled band vs pill vs floor tokens at 10 viewports (the 844x390 floor finding).
  smoke-batch.sh     a copy of q2/batch.sh + q2/run.sh writing into o5c/smoke/ (Chromium projects, --workers=1).

1. base tree 955efaa03:  $G --timeout 25 -- sh g2d/build-tree.sh 955efaa03 o5c-base        -> built (rc=0)
2. base reveal x2:       $G --timeout 6 -- sh o5c/reveal-run.sh <base> 8241 base-r{1,2}      -> base-reveal-r{1,2}.txt
3. base band floor:      band-floor-probe.mjs over <base>                                     -> base-band-floor.txt
   (scratch arm, never committed: the .o5c diff applied in the base worktree, gh-pages rebuilt, read once, then
    `git checkout --` and rebuilt: it found 844x390 band 48 -> 63 on the post-paint mount, CLS 0.01434 -> the floor cure)
4. product commit 9e0212c46; tree: $G --timeout 25 -- sh g2d/build-tree.sh 9e0212c46 o5c
5. reveal x2:            $G --timeout 6 -- sh o5c/reveal-run.sh <o5c> 8244 o5c-r{1,2}         -> reveal-r{1,2}.txt
6. O-5 + boot x2:        $G --timeout 10 -- sh o5c/o5-mv-run.sh <o5c> 8245 o5c-r{1,2} 3       -> o5-mv-r{1,2}.txt
7. boot A/B interleave:  base, o5c, base, o5c (3 sittings each)                               -> ab-interleave.txt
8. G2 x2:                (o5c tree) node scripts/perf/eager-bytes.mjs                          -> g2-r{1,2}.txt
9. no-cut x2:            $G --timeout 10 -- sh g2d/nocut-run.sh <o5c> 8247 o5c-nocut-r{1,2}    -> nocut-r{1,2}.txt
10. floors x2:           cp -cR api/node_modules <o5c>/api/ ; $G --light -- vue-tsc lib/demo/test + tsc e2e + npm run lint
                                                                                              -> floors-r{1,2}.txt
11. smoke x2:            sh o5c/smoke-batch.sh o5c-{a,b} <o5c>                                 -> smoke/
12. reactivity A/B (batch a's one ✘, load1 15.5 -> 20.2; batch b ✓): reactivity-instant.spec.ts:42 on base/o5c interleaved x2
                                                                                              -> smoke/ab-reactivity*.txt (4/4 ✓)
13. boot re-read at load ~11.5: o5-mv-run.sh x2 -> o5-mv-r{3,4}.txt ; second interleave -> ab-interleave-2.txt
14. post-cure boot profile: $G --timeout 6 -- sh o5b/profile-run.sh <o5c> 8248 o5c 2 -> boot-profile-r1.txt (dock.js absent)
Smoke JSON reporters (4.7 MB each) are parked at ~/.dev-logs/w12u-o5c/json/ (durable, not committed); smoke/*.f are the fail lists.
