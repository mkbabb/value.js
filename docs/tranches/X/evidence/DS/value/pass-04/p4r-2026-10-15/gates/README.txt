X-DS value pass 4 (critic P4R, re-dispatch 2026-10-15/16) — gates, read on tranche-u at f7a21f95a plus other seats' dirty paths.
typecheck (npm run typecheck, guarded --light): 0 errors x2 (typecheck-run1/2.txt).
vitest (npx vitest run --maxWorkers=2, guarded): 1208/1215 x2, the SAME 7 failures both runs, all from the standing pass-4 set, none in this diff:
  ink D6 x2, ink T-35 x3, spectrum-luma C-5 (born-RED), reka NG-6. (v4-css-emerging x2 now passes.)
  test/view-accents.test.ts (the ramp rows, the shifts row restated to +-60) passes x2.
e2e (project smoke, headless, workers 1, Playwright's own server :9177 with its VITE_API_URL; specs.txt; 29 tests):
  run 1 29/29; run 2 28/29 — o14 "dropdown entry + Palettes title each render their per-site guarded stops" timed out
  finding the title (8 s) at a 1-minute load of 108; the same spec re-run alone: 7/7 (e2e-recheck-o14.txt).
  An earlier pair that reused a plain `vite` server (:9176, no VITE_API_URL) was discarded: the dev-misconfig console
  error poisoned the console-clean specs. No visual golden re-baselined.
