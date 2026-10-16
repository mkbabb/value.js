X-DS value pass 5 (critic P5C, 2026-10-16) — gates, read on tranche-u at 1960910cf plus this seat's PaletteCardSkeleton.vue hunks and other seats' dirty paths (the pass-9 V9C hunks in ExtractWorkbench/ExtractControls/PaletteCardSkeleton are in the served tree, uncommitted, not this seat's).
typecheck (npm run typecheck, guarded --light): 0 errors x2 (typecheck-run1/2.txt).
vitest (npx vitest run --maxWorkers=2, guarded): 1212/1219 x2, the SAME 7 standing failures both runs, none in this diff:
  ink D6 x2, ink T-35 x3, spectrum-luma C-5 (born-RED), reka NG-6. plate-mass (PaletteCardSkeleton instrument/shadow/developing) passes x2.
e2e (project smoke, headless, workers 1, Playwright's own server VJS_E2E_PORT=9179; specs.txt; 21 tests):
  run 1 21/21; run 2 20/21 — o9 "instrument face" no-growth leg: 46.836 vs 46.724 px (boundingBox caught the plate's
  arrival transform; a sub-pixel transient, the cure adds no block-axis box). Re-run alone --repeat-each=3: 3/3
  (e2e-recheck-o9.txt). Another seat's 4d6d0f96d (landed during this run) re-reads that leg as layout height for exactly
  this transient. No visual golden re-baselined.
