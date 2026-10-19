X-DS value pass 6 (critic VC6, re-dispatch 2026-10-15) — gates, read on tranche-u at 01aaf6a9c plus other seats' dirty paths.
typecheck (npm run typecheck, guarded --light): 0 errors x2 (typecheck-run1/2.txt).
vitest (npx vitest run --maxWorkers=2, guarded): 1182/1191 x2, the SAME 9 failures both runs = the pass-4 nine, none in this diff:
  ink D6 x2, ink T-35 x3, spectrum-luma C-5 (born-RED), reka NG-6, v4-css-emerging if(supports()) x2.
  The suites that read this diff's files pass x2: n-fixtures (the band labels, updated for "N tags"), compact-counts,
  format-color, and palette-card-layout (G9/G10 in real Chromium: no overflow, one card height, with the new bands).
e2e (projects smoke + smoke-admin, headless, workers 1, own server :9175; specs.txt; 24 tests): 21/24 x2, the SAME 3 both runs:
  w7-inspector-rows "tag — a refused tag save": the Edit Tags dialog shows no checkbox to click (tag editor, not the card chips);
  w7-inspector-rows "selecting a palette makes its verbs the dock's set": the dock row lacks "palette.save" (scene-action set);
  gradient "selector aurora": a census-hash/version check expecting "@mkbabb/glass-ui 10.1.0" in a doc that now reads otherwise.
  None reads PaletteCardMeta's bands or the code paper. browse-loading, browse-pagination, the rest of gradient (code editor
  round-trips) and a11y-authed-user (the populated wall: accessible-name + target size) pass x2.
e2e is NOT x2 GREEN; nothing in this diff. No visual golden re-baselined.
