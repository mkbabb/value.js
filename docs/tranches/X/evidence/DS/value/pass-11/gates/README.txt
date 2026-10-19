X-DS value pass 11 (critic V11, 2026-10-16) — gates, read on tranche-u with the V11-T1 cure in the tree and other seats' dirty paths present.
typecheck (npm run typecheck, guarded --light): 0 errors x2 (typecheck-run1/2.txt).
vitest (npx vitest run --maxWorkers=2, guarded): 1214/1221 x2, the SAME 7 standing failures both runs and as pass 10
  (vitest-fails-run1/2.txt differ only in timings): ink D6 x2, ink T-35 x3, spectrum-luma C-5 (born-RED), reka NG-6. None is in this diff.
e2e (headless, workers 1, own server VJS_E2E_PORT=9190). foundation.css is global, so pass 10's whole card/pane/Config/admin set is re-run:
  project smoke, specs.txt (14 specs): run 1 65/65, run 2 65/65.
  project smoke-admin, specs-admin.txt: run 1 3/3, run 2 3/3.
  STRICT x2 GREEN.
No visual golden re-baselined (none affected: the deleted tokens never painted).
Frames/census/probe: served by `vite --port 9011 --strictPort` (VITE_API_URL=http://localhost:9011, own VJS_VITE_CACHE_DIR), guarded;
  :9000 was held by another process, so this seat used its own port and stopped it afterwards.
