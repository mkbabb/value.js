X-DS value pass 8 (critic V3C) — gate listings. Host load 92-450 throughout (other seats' builds, vitest and Playwright fleets).
typecheck-1/2: vue-tsc lib/demo/test + tsc e2e, 0 errors x2.
vitest-1: 1095/1120 (10 skipped, 15 failed); vitest-2: 1100/1120 (10 failed). Failures:
  - pre-existing (as pass 7): ink.test resolveMutedInk x2 + T-35 x3, spectrum-luma C-5, reka-binding NG-6; ink-real-composite x2 (run 1 only).
  - load timeouts: byte-exact PNG x2 (30 s), extract-session x2 (run 1), admin-u3 / admin-destructive (5 s), generate-rail V3C-05 (run 1, 30 s).
  - palette-card-layout + plate-mass: the n-fixtures harness's in-file 60 s beforeAll (a cold Vite server + Chromium) times out under load.
  vitest-timeouts-alone(-long): the timed-out files alone; with --testTimeout 180000 generate-rail (re-aimed) and admin-destructive PASS; byte-exact keeps its in-file 30 s, the harness files their in-file 60 s hook (no assertion reached).
e2e-run0-void-load: the focused set (specs-focused.txt, 48 tests, 2 workers, cold 8090 server) at load 300-450: 43 failed, nearly all goto / dock / pane-visible timeouts and half-booted pages. Voided.
e2e-run0b-void-load: the same set, 1 worker, stopped at 15/48 (same classes). Voided.
void-cold-8090-*: the targeted set (specs-targeted.txt) on a cold 8090 server: every test a page.goto timeout. Voided.
e2e-run1/2 (+ -o11): the targeted set against the warm dev server (VJS_E2E_PORT=9000), --timeout 240000, x2.
  PASS x2: O-9 Extract (the re-aimed STILL leg: no cell animates, re-segments to 16 without growing, PRM static) and O-9 Browse empty commons.
  FAIL x2, one class: openView's option click never finds the dock listbox option "stable" (SwiftShader smoke project at load; the dock select is glass/dock, not in this diff), so the pane under test never opens: O-20 x2, O-9 Mix / My Palettes / error!=empty, mix.spec, O-11 gates 1+2 x2. companion-pane-track-start: "the region never settled" (a pane-shell animation still running at load), the pass-7 class.
  The same openView walk in a direct headless-Chrome probe (1280x720, warm server) opens Generate, Mix, Browse, Gradient and Extract in 1.3-2.7 s each.
  e2e is NOT x2 GREEN.
No visual golden re-baselined.
