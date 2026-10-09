X-DS value pass 7 (critic V7C) — gate listings. Host load 107-530 throughout (other seats' builds and browsers).
typecheck-1/2: 0 errors x2.
vitest-1/2: 1104/1120 x2 (8 skipped). Failures = the 7 pre-existing (ink.test resolveMutedInk x2 + T-35 x3, spectrum-luma C-5, reka-binding NG-6) + generate-rail EC-10 timing out at the 5 s default under load (passes alone with --testTimeout 30000, 2.9 s).
e2e-run0-void-load: the pass-6 22-spec set + o19 + o29 (153 tests), stopped at 37/153 — every failure a 30 s timeout or nav wait at load 270-530. Voided.
e2e-run1/2 (+ -o68): the focused set touching the changed files (specs-focused.txt), --timeout 240000. O-68 (x-w7l, re-aimed) 2/2 passed x2. D8-1 passed x2; companion-pane-track-start passed run 1.
e2e-rerun-a: the same set at load ~145. Failure classes, none on a changed surface:
  - nav/settle at load: getByRole(main) not found, "the region never settled" on the PICKER's div.pane-shell, paneSettled timeouts, "Loading the scene" lazy-chunk plates.
  - o29 gradient: regionsOf returns a third "undefined:null" region = a glass Collapsible disclosure (role=region) from the concurrent X-W12U .k2 commit cc38595c1, not this cure.
  - o19 canvas leg: PRE-EXISTING RED. The A/B on the live tile (o19 window x .90-.98, y .35-.50, dpr 2): 390 light new 14.0 vs pre-cure classes 1.5; 390 dark 12.6 vs 1.5; 1280 (tile unchanged) 1.6. The retired netting plate is gone; the oracle reads a plain render tile under either class set.
