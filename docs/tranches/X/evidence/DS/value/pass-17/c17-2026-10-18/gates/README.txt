X-DS value pass 17 cure (critic V17C, 2026-10-18): gates, read on tranche-u with the cure bd72e216e (13 paths: the gold recipe, its per-ground token, DESIGN.md C-4).

HOST STATE: load 16-27; another seat's `--project=visual` run held the browser pool during run 1's page-load (queued, not failed).

typecheck (npm run typecheck, guarded --light): exit 0 x2.

vitest (npx vitest run --maxWorkers=2, guarded): 1237/1242 x2, the same 5 standing failures of passes 11-16 (test/ink.test.ts: D6 resolveMutedInk x2, T-35 x3) in both runs (vitest-fails-run1/2.txt).

e2e (headless, workers 1, one guarded call per spec, own server pair VJS_E2E_PORT=9472 / PERF 9473; specs.txt; run-gates.sh):
  smoke-admin (whole project) 25/25 x2. o15-dock-register 6/6 x2. w12-dock 6/6 x2. page-load 2/2 x2.
  o18-contrast-census: run 1 25/30, run 2 26/30.
    Standing in both runs and in pass 15 (identical titles): graph nodes F-3 (dark), the T-35 IDENTITY leg (light), the profile menu ROW LABELS N-3 (light, dark).
    The admin pill A-1 (light), born-RED by arithmetic on raw gold: run 1 RED, run 2 GREEN. Run 1's row reads the ink through an opacity chain at 0 (ink == ground, rgb 109 / 109; raw is now the band-certified gold), and its ground is the bare ambient (stack [], the instrument does not see the dock's .dock-plate layer). Pass 15's same row read raw gold oklch(0.751 0.147 84.2) at a low effective alpha. The frame-pixel reading (../v17.json) is this cure's witness: trigger 1.08 -> 5.45 in light.
  VERDICT: every spec on the changed surface is GREEN x2 except o18, whose four standing rows are unchanged and whose admin row turned GREEN in run 2 (timing-sensitive instrument, see above).

No visual golden was re-baselined (e2e/visual not run by this seat). At the next visual run, every light admin-mode dock cell (the view trigger, the admin trigger, the seal glyph: raw gold -> certified bronze) and any frame with the crown needs a named owner-ruling re-baseline (section 0ej).
Frames and census were served by a guarded `vite --port 9471 --strictPort` (VITE_API_URL=http://localhost:9471, VJS_VITE_CACHE_DIR=node_modules/.vite-ds-9471), stopped after the census. Nothing from this seat is left running.
