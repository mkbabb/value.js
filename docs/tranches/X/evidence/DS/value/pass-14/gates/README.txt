X-DS value pass 14 (critic V14, 2026-10-16): gates, read on tranche-u.
Source change: e78a7fc5a (V14-01: the orphaned V9C-01/03..07 hunks adopted by id, 11 paths) and 5ca07270e (V14-T2 PaletteCardSwatches.vue, V14-T1 demo/DESIGN.md, V14-02 e2e/smoke/fixtures/browse-palettes.ts + scripts/ds-census.mjs).
V9C rows (the dead seat's failing rows, hook timeouts under load): palette-card-layout + plate-mass + demo/test/extract (8 files) 36/36 x2 (v9c-rows-run1/2.txt), before the adoption commit.
typecheck (npm run typecheck, guarded --light): 0 errors x2 (typecheck-run1/2.txt).
vitest (npx vitest run --maxWorkers=2, guarded): 1214/1221 x2, the SAME 7 standing failures as pass 13 (vitest-fails-run1/2.txt, identical to pass-13's list): ink D6 x2, ink T-35 x3, spectrum-luma C-5 (born-RED), reka NG-6.
e2e (headless, workers 1, own server VJS_E2E_PORT=9190):
  project smoke, specs.txt (20 specs = pass 13's 16 + crash-battery, browse-loading (the featured fixture), o20-generate-plate (V9C-07), o9-shadow-palette (V9C-04)): run 1 95/95, run 2 95/95.
  project smoke-admin, specs-admin.txt (admin-populated + a11y-authed-user, which uses the browse fixture): run 1 5/5, run 2 5/5.
  STRICT x2 GREEN.
No visual golden re-baselined (the one visual spec that imports the browse fixture holds it on a 120 s delay, so it frames skeletons only).
Frames/census: served by `vite --port 9011 --strictPort` (VITE_API_URL=http://localhost:9011, own VJS_VITE_CACHE_DIR), guarded, from a demo tree equal to committed HEAD 5ca07270e (../tree-before.txt, ../tree-after.txt).
