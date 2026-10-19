X-DS value pass 4 (re-dispatch 2026-10-16, critic P4R rows P4R-01..05) — gates, read on tranche-u at 8e12bce41 plus other seats' dirty paths. NO source change by this seat (P4R-01/04 cured at f7a21f95a, P5C-03 7de5c708e; both stand at HEAD).
typecheck (npm run typecheck, guarded --light): 0 errors x2 (typecheck-run1/2.txt).
vitest (npx vitest run --maxWorkers=2, guarded): 1227/1234 x2, the SAME 7 standing failures both runs (vitest-fails-run1/2.txt; only timings differ): ink D6 x2, ink T-35 x3, spectrum-luma C-5 (born-RED), reka NG-6.
e2e (project smoke, headless, workers 1, Playwright's own server VJS_E2E_PORT=9214; specs.txt = pass 4's P4R set, 29 tests): run 1 29/29, run 2 29/29. Strict GREEN x2.
No visual golden re-baselined.
Probe/frames/census served by `vite --port 9213 --strictPort` (VITE_API_URL=http://localhost:9213, VJS_VITE_CACHE_DIR=node_modules/.vite-ds-9213), guarded; stopped after.
