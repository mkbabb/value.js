X-DS value pass 12 (critic V12, 2026-10-16): gates, read on tranche-u. This pass made NO source change (V12-01 is banked as an owner DESIGN-RULING, P6-B1; V12-G1 is glass-owned, O-87/O-88), with other seats' dirty paths present in the tree.
typecheck (npm run typecheck, guarded --light): 0 errors x2 (typecheck-run1/2.txt).
vitest (npx vitest run --maxWorkers=2, guarded): 1214/1221 x2, the SAME 7 standing failures in both runs and as pass 11
  (vitest-fails-run1/2.txt): ink D6 x2, ink T-35 x3, spectrum-luma C-5 (born-RED), reka NG-6.
e2e (headless, workers 1, own server VJS_E2E_PORT=9190), pass 11's set re-run as a no-change control:
  project smoke, specs.txt (14 specs): run 1 65/65, run 2 65/65.
  project smoke-admin, specs-admin.txt: run 1 3/3, run 2 3/3.
  STRICT x2 GREEN.
No visual golden re-baselined.
Frames/census: served by `vite --port 9011 --strictPort` (VITE_API_URL=http://localhost:9011, own VJS_VITE_CACHE_DIR), guarded, stopped afterwards.
