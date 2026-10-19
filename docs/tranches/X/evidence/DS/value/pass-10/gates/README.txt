X-DS value pass 10 (critic V10, 2026-10-16) — gates, read on tranche-u at the cure a5383d50c with other seats' dirty paths in the tree.
typecheck (npm run typecheck, guarded --light): 0 errors x2 (typecheck-run1/2.txt).
vitest (npx vitest run --maxWorkers=2, guarded): 1214/1221 x2, the SAME 7 standing failures both runs and as pass 9 (diffed), none in this diff:
  ink D6 x2, ink T-35 x3, spectrum-luma C-5 (born-RED), reka NG-6.
e2e (headless, workers 1, own server VJS_E2E_PORT=9190):
  project smoke, specs.txt = pass 9's set (every spec that drives the Browse card / inspector, Gradient, the well, the card menus)
    plus views/mix.spec.ts (Mix footer) and scene-action-contract.spec.ts (the Config action bar): run 1 65/65, run 2 65/65.
  project smoke-admin, specs-admin.txt = admin/admin-populated.spec.ts (the two admin panels): run 1 3/3, run 2 3/3.
  STRICT x2 GREEN.
No visual golden re-baselined.
Frames: served by `vite --port 9000` with VITE_API_URL=http://localhost:9000 (the e2e webServer's same-origin env). A first capture
  ran without it, so the app's dev-misconfigured banner showed and Browse could not load; every cell was re-captured on the corrected server.
