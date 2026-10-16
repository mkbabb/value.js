X-DS value pass 8 (critic V8C, 2026-10-16) — gates, read on tranche-u with this seat's hunks (specimen-format.ts, CurrentPaletteEditor.vue,
the new specimen-format.test.ts) and other seats' dirty paths in the served tree.
typecheck (npm run typecheck, guarded --light): 0 errors x2 (typecheck-run1/2.txt).
vitest (npx vitest run --maxWorkers=2, guarded): 1214/1221 x2 (the 2 new V8C-01 cases pass), the SAME 7 standing failures both runs, none in this diff:
  ink D6 x2, ink T-35 x3, spectrum-luma C-5 (born-RED), reka NG-6.
e2e (project smoke, headless, workers 1, Playwright's own server VJS_E2E_PORT=9184; specs.txt = every spec reading the specimen
  catalog or the My Palettes well/empty state; 43 tests):
  run 1 36/43, run 2 36/43 — the SAME 7 failures both runs:
  o18 F-3 (dark), T-35 (light), A-1 (light, dark), N-3 (light, dark) — standing since pass 6;
  o23 "no printed coordinate was projected" — fails on the HSL row (printed saturation 0 vs true -12.95: the parser clamps a
  negative hsl() saturation), NOT on the RGB row this diff changes. Falsifier o23-at-HEAD.txt: the same spec with HEAD's
  specimen-format.ts fails identically (RGB row then printed the 66-char 12-decimal string). Standing, not this diff.
Not a strict x2 GREEN; nothing in this diff. No visual golden re-baselined.
