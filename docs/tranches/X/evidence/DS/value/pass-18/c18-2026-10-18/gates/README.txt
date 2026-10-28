X-DS value pass 18 cure (critic V18C, 2026-10-18): gates, read on tranche-u with the cure (17 paths: the identity-ink rule and its glyph rung, the resting destructive twin, the titled admin consoles, the dropped head-glyph frame, DESIGN.md C-4, test/ink.test.ts, admin-populated.spec.ts).

HOST STATE: load 32-41 throughout (other seats' heavy runs); another seat's X-W11 work moved package.json / src/color / node_modules mid-run (it committed during run 1).

typecheck (npm run typecheck, guarded --light): exit 0 x2.

vitest (npx vitest run --maxWorkers=2, guarded): 1242/1247 x2. The 5 failures are the standing set of passes 11-17 (test/ink.test.ts: D6 resolveMutedInk x2, T-35 x3), identical titles in both runs (vitest-fails-run1/2.txt). The 5 new V18C-01 cases (certifyIdentityInk) pass.

e2e (headless, workers 1, one guarded call per spec, own server pair VJS_E2E_PORT=9482 / PERF 9483; specs.txt; run-gates.sh):
  o15-dock-register 6/6 x2. w12-dock 6/6 x2. page-load 2/2 x2. w12u-x-admin-tags 6/6 x2.
  o17-easing-composition: run 1 4/5 (the desktop letterbox leg timed out on a click in discloseAuthoring under load), run 2 5/5.
  o18-contrast-census: run 1 26/30, run 2 25/30. The four standing rows of passes 15-17 in both (F-3 graph nodes dark, T-35 identity light, N-3 profile menu rows light+dark). A-1 (the admin pill): GREEN in both schemes in run 1; in run 2 GREEN light, RED dark with ink == ground (rgb 46/46, stack []), the pass-17 instrument fault (it does not see the dock's .dock-plate layer and reads mid-morph); the dark gold is unchanged by this cure (oklch(0.784 0.143 86)).
  views/gradient: run 1 11/12, run 2 10/12; reruns a 11/12, b 9/12 (e2e-gradient-rerun-*.txt). Every red is a 30 s timeout in openView/expandDock/paneSettled on the cold Gradient route under load. A/B: the same spec on the HEAD demo (every pass-18 demo path restored to HEAD for one run) fails 4/12 the same way (ab-head/gradient-HEAD-demo.txt). Not this cure.
  smoke-admin (whole project): 23/25 x2. admin-populated "admin-users renders seeded user rows" read the Users pane title at level 2; V18C-03 makes it the route's level-1 H1 by design, so its leg is re-read at level 1 (named spec re-baseline in the commit body) and is GREEN after (3/3). admin-walk fails in both runs: after hash navigation users -> names the Names region renders EMPTY (no pane). A/B: with every pass-18 demo path restored to HEAD it fails the same way, at the Names control step instead (the App caption still supplied the H1): ab-head/admin-walk-HEAD-demo-error-context.md. Pre-existing at HEAD, not this cure; carried.
No visual golden was re-baselined (e2e/visual not run by this seat).
Frames, witnesses and census were served by a guarded `vite --port 9481 --strictPort` (VITE_API_URL=http://localhost:9481, VJS_VITE_CACHE_DIR=node_modules/.vite-ds-9481), stopped after use. Nothing from this seat is left running.
