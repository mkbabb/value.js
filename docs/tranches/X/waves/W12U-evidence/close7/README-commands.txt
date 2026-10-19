SERVED MODEL: claude-opus-5-5
X-W12U Close 7 (RESUME 7 close seat, 2026-10-17, Track A, verify-only). Every reading on COMMITTED HEAD 3a551e1cd
(product = .o5c 9e0212c46 + X-DS VP5 3d73afb54), detached worktree T=~/.dev-logs/w12u-g2d/close7/tree (removed at teardown).
G=~/.claude/guard/guarded ; E=docs/tranches/X/waves/W12U-evidence

build:   $G --timeout 25 -- sh $E/g2d/build-tree.sh 3a551e1cd close7                 -> build.txt (built; waited ~18 min in the heavy queue)
G2 x2:   (T) $G --light -- node scripts/perf/eager-bytes.mjs                        -> g2-r{1,2}.txt
floors:  cp -cR api/node_modules T/api/ ; (T) $G --light -- vue-tsc lib/demo/test + tsc e2e (count 'error TS') + npm run lint, x2
                                                                                     -> floors-r{1,2}.txt
O-5+boot x2: $G --timeout 10 -- sh $E/o5c/o5-mv-run.sh T 8251 close7-r{1,2} 3       -> o5-mv-r{1,2}.txt (o5c's committed witness)
reveal x2:   $G --timeout 6 -- sh $E/o5c/reveal-run.sh T 8252 close7-r{1,2}         -> reveal-r{1,2}.txt
no-cut x2:   $G --timeout 10 -- sh $E/g2d/nocut-run.sh T 8253 close7-nocut-r{1,2}   -> nocut-r{1,2}.txt
smoke x2:    sh $E/close7/smoke-batch.sh cl7{a,b} T (a copy of o5c/smoke-batch.sh; logs -> close7/smoke/,
             JSON reporters parked at ~/.dev-logs/w12u-close7/json/)                 -> smoke/
npm test x2: (T) $G --timeout 8 -- npx vitest run --maxWorkers=2                   -> npm-test-r{1,2}.log.txt (r1 by the first close seat, killed after it; r2 by the second close seat, 04:06)
flake reread: sh $E/close7/reread-flakes.sh T (the two rows that failed in one batch only, isolated x2) -> smoke/reread-flakes.txt
