X-DS value pass 7 (critic V7R, 2026-10-16) — gates, read on tranche-u at 7c0ba5993 plus this seat's hunks
(z-popover on the 6 DropdownMenuContent call sites, the shell.css comment, the v7r-overlay-layer oracle, the census overlay
cells) and other seats' dirty paths in the served tree.
typecheck (npm run typecheck, guarded --light): 0 errors x2 (typecheck-run1/2.txt).
vitest (npx vitest run --maxWorkers=2, guarded): 1212/1219 x2, the SAME 7 standing failures both runs, none in this diff:
  ink D6 x2, ink T-35 x3, spectrum-luma C-5 (born-RED), reka NG-6.
e2e (projects smoke + smoke-admin, headless, workers 1, Playwright's own server VJS_E2E_PORT=9183; specs.txt + specs-admin.txt =
  every spec that opens one of the 6 menus, plus the new oracle v7r-overlay-layer; 82 tests):
  run 1 76/82, run 2 76/82 — the SAME 6 failures both runs, all o18 contrast-ink rows standing since pass 6:
  graph nodes F-3 (dark), IDENTITY leg T-35 (light), admin pill A-1 (light, dark), profile menu row labels N-3 (light, dark).
  N-3 reads the profile menu's row INK (contrast), not its layer; it failed identically before this diff (pass-06 gates).
  v7r-overlay-layer 2/2 x2. Not a strict x2 GREEN; nothing in this diff. No visual golden re-baselined.
Falsifier: the same paint-order read, run before the cure (../before/overlays.json), fails 4/4 menu cells (wrapper z auto).
