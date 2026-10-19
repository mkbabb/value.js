X-DS value pass 16 cure (critic V16C, 2026-10-18): gates, read on tranche-u with the cure 9f29879b4 (EasingSpecimenStrip.vue, GradientEasingEditor.vue). pass-16/ already holds an earlier seat's pass 16; this seat's set is pass-16/c16-2026-10-18/.

HOST STATE: load 22-28 through the runs; other seats committed demo/palettes and demo/platform hunks during them (6932b7541 and the X-W11 commits).

typecheck (npm run typecheck, guarded --light): exit 0 x2 (typecheck-run1/2.txt).

vitest (npx vitest run --maxWorkers=2, guarded): run1 1235/1242, run2 1237/1242. The 5 standing failures of passes 11-15 (test/ink.test.ts: D6 resolveMutedInk x2, T-35 x3) are in both runs. Run1 also has 2 in demo/test/palettes/plate-mass.test.ts at 390 ("Execution context was destroyed, most likely because of a navigation"): another seat's palettes commit hot-reloaded the harness page mid-test. Run2 has the standing 5 only. Neither file touches the changed surface.

e2e (headless, project smoke, workers 1, one guarded call per spec, own server pair VJS_E2E_PORT=9392 / PERF 9393; specs.txt; run-e2e.sh):
  o17-easing-composition 5/5 x2. views/gradient.spec 12/12 x2. o21-gradient-rail 10/10 x2. a11y-gradient-stop-grammar 5/5 x2. o27-focus-affordance 6/6 x2. page-load 2/2 x2.
  o23-specimen-gamut-honesty 0/1 x2: the STANDING HSL row (the printed saturation reads back 0 against a true -12.95, through the clamping parser), recorded at pass 13 with an at-HEAD falsifier. Not this diff's surface (o23 reads the colour-space specimen rows, not the easing strip).
  VERDICT: every spec that reads the changed surfaces (the strip, the interval head, the gradient pane) is GREEN x2.

No visual golden was re-baselined (e2e/visual not run). At the next visual run the Gradient pane's open Easing interval (the strip as a two-track grid, 5 lines at 1440) and every interval head (the framed glyph) will differ, and need a named owner-ruling re-baseline (section 0ej).
Frames and census were served by a guarded `vite --port 9391 --strictPort` (VITE_API_URL=http://localhost:9391, VJS_VITE_CACHE_DIR=node_modules/.vite-ds-9391), stopped after the census; e2e servers were Playwright-managed and closed with each run. Nothing from this seat is left running.
