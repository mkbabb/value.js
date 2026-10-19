X-DS value pass 13 (critic V13, 2026-10-16): gates, read on tranche-u. Source change: demo/styles/shell.css only (V13-01: `.glass-dock` joins the V5C-05 `--input-on-glass: var(--well-bg)` seat). V13-02 and V13-T1 are glass-owned (O-87), no local override. Other seats' dirty paths present in the tree.
typecheck (npm run typecheck, guarded --light): 0 errors x2 (typecheck-run1/2.txt).
vitest (npx vitest run --maxWorkers=2, guarded): 1214/1221 x2, the SAME 7 standing failures as pass 12 (vitest-fails-run1/2.txt): ink D6 x2, ink T-35 x3, spectrum-luma C-5 (born-RED), reka NG-6.
e2e (headless, workers 1, own server VJS_E2E_PORT=9190). shell.css is global, so pass 12's whole set was re-run, plus the specs that drive the dock login layer:
  project smoke, specs.txt (16 specs = pass 12's 14 + w12-dock, flows/login-register): run 1 72/72, run 2 72/72.
  project smoke-admin, specs-admin.txt (admin-populated + a11y-authed-user): run 1 5/5, run 2 5/5.
  STRICT x2 GREEN.
No visual golden re-baselined.
Frames/census: served by `vite --port 9011 --strictPort` (VITE_API_URL=http://localhost:9011, own VJS_VITE_CACHE_DIR), guarded, stopped afterwards.
Census: run 1 (census-after-run1-underloaded.json) is VOID: under machine load (1-min load ~15) the mix/generate/gradient/atmosphere/blob light and atmosphere/blob dark cells were read before their panes mounted (elements 4451 vs 5304; stateLoopsExempt 10 = loading spinners). Run 2 (census-after.json) read 16 of 18 route cells identical to pass 12 and timed out on goto for /#/ and /#/palettes light; census-after-supplement.json re-read those two cells, identical to pass 12. Combined: identical to pass 12 on all 18 cells and the 8 overlay cells.
