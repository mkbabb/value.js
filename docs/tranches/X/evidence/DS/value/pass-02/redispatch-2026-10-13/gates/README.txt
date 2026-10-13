X-DS value "pass 2" re-dispatch, 2026-10-13 (critic V7C, already cured at a85477894) — gate listings at HEAD b50237f09.
This seat changed NO source file. The listings read HEAD plus the tree's other dirty paths (X-W12U .h orphans in demo/shared/ui, extract, generate, mix).
typecheck-1/2: 0 errors x2 (load 10 -> 85).
vitest-1/2: 1105/1122 x2 (8 skipped), 9 failed x2 + 2 suites, load 85-117.
  - the 7 pre-existing: ink.test resolveMutedInk x2 + T-35 x3, spectrum-luma C-5, reka-binding NG-6.
  - plate-mass G20 + N-17: the page imports demo/palettes/browser/card/PaletteCardSkeleton.vue, a path that moved to demo/shared/ui/ in X-W12U .k2 (785e522c5). A stale path in the test, not a timeout. Owner: X-W12U .k2.
  - palette-card-layout (suite) and plate-mass "plate at 390": the n-fixtures harness's page.goto at 30 s under load.
e2e (smoke project, SwiftShader headless, warm server VJS_E2E_PORT=9000, --workers=1 --timeout 240000; specs = pass-07/v7c-gates/specs-focused.txt):
  e2e-run1 (load 97 -> 153): 11 passed / 15 failed of 26. e2e-run1-o68: O-68 2/2 passed.
  e2e-run2-void-load: first attempt, load 180-190, every test a timeout; stopped at 10/26. Voided.
  e2e-run2 (load 107 -> 454): stopped at 20/26; 6 passed / 14 failed. O-68 run 2 not read.
  Failure classes, the same as pass 7's listing:
   - o19 canvas leg x4: pre-existing RED (pass 7's A/B: the oracle reads a plain render tile under either class set).
   - o29 gradient scene: regionsOf gains a third "undefined:null" region (a glass Collapsible disclosure, cc38595c1).
   - gradient.spec x6-7, mix.spec, o29 j4: the pane under test is not found or never settles (main "Gradient" heading not found, .add-slot-ghost not found, "the scene has no interactive control at all", "the region never settled").
   - companion-pane-track-start: failed run 1 ("the region never settled"), passed run 2.
  e2e is NOT x2 GREEN.
No visual golden was re-baselined.
