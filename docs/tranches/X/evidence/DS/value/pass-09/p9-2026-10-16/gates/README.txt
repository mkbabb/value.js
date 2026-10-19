X-DS value pass 9 (critic P9R, 2026-10-16) — gates, read on tranche-u at the cure a86622b18 with other seats' dirty paths in the tree.
typecheck (npm run typecheck, guarded --light): 0 errors x2 (typecheck-run1/2.txt).
vitest (npx vitest run --maxWorkers=2, guarded): 1214/1221 x2, the SAME 7 standing failures both runs (diffed), none in this diff:
  ink D6 x2, ink T-35 x3, spectrum-luma C-5 (born-RED), reka NG-6.
e2e (project smoke, headless, workers 1, own server VJS_E2E_PORT=9186; specs.txt = the new P9R-01 oracle plus every spec that
  drives the Browse card / inspector, the Gradient pane, the My Palettes well or the card menus; 54 tests):
  run 1 54/54, run 2 54/54. STRICT x2 GREEN.
New oracle e2e/smoke/oracles/p9r-card-detail-row.spec.ts (meta row and detail band do not intersect on an expanded card,
  1440 and 390): oracle-run1.txt 2/2; also inside both e2e runs. oracle-first.txt is the first draft's run: its 1440 leg read
  the band mid-morph (height 0), so the spec now polls the band open before the geometry read; no assertion weakened.
  BEFORE (the child selector): the critic's own read (critic-p9r/: meta and detail both in grid row 3).
No visual golden re-baselined.
