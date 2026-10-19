X-DS value pass 15 cure (critic V15C, 2026-10-18): gates, read on tranche-u with the cure b8cf3fb18 (GradientVisualizer.vue, GradientEasingEditor.vue, EasingAuthoringStage.vue, EasingSpecimenStrip.vue). The served tree carried no other seat's demo/e2e hunks.

HOST STATE: load 21-42 through the e2e runs (guard waited for headroom at load 39).

typecheck (npm run typecheck, guarded --light): exit 0 x2 (typecheck-run1/2.txt).

vitest (npx vitest run --maxWorkers=2, guarded): 1237/1242 x2. The 5 failures are the standing set of passes 11-14 (test/ink.test.ts: D6 resolveMutedInk x2, T-35 x3), identical in both runs (vitest-fails-run1/2.txt differ only in ms timings and order).

e2e (headless, project smoke, workers 1, one guarded call per spec, own server VJS_E2E_PORT=9382 / PERF 9383; specs.txt = the specs that read the changed surfaces plus page-load, walk and o18).
  invalid/: a first attempt passed the spec list as one argument (zsh, no word split) and found no tests; discarded, not counted.
  o17-easing-composition (incl. the V14C-01 handle-registration falsifier at 1440 and 390): 5/5 x2.
  views/gradient.spec: run1 11/12 (the first test's paneSettled setup timed out on the cold server, 30 s); run2 12/12.
  o21-gradient-rail 10/10 x2. a11y-gradient-stop-grammar 5/5 x2. o27-focus-affordance 6/6 x2. o29-scene-contracts 6/6 x2. page-load 2/2 x2.
  o18-contrast-census: 25 passed x2, with the same five standing class (c') cells as passes 13-14 (graph-nodes F-3 dark, T-35 identity light, R27 admin pill A-1 light, R27 profile-menu rows N-3 light+dark).
  walk.spec: 0/1 x2, plus 0/1 x2 on recheck (e2e-recheck-walk-1/2.txt). Every failure is the walk's single 30 s test budget expiring at a different step: the Extract option click ("element is not stable", run1), the Mix option click (recheck 1), the first H1 wait before any navigation (recheck 2). None is an assertion on a changed surface; walk never opens the Easing panel. Passes 13-14 had walk 1/1 x2 at lower load.
  VERDICT: NOT strict-GREEN x2 on this host (walk timeouts; gradient.spec one cold-setup timeout). Every changed-surface spec has two runs, and every product assertion that ran passed outside the standing o18 set.

No visual golden was re-baselined (e2e/visual not run). At the next visual run the Gradient pane (Direction readout "90deg", the wrapped specimen strip, the centred authoring plot, the "Custom curve" rail label) will differ, and needs a named owner-ruling re-baseline (section 0ej).
Frames and census were served by a guarded `vite --port 9381 --strictPort` (VITE_API_URL=http://localhost:9381, VJS_VITE_CACHE_DIR=node_modules/.vite-ds-9381), stopped after the census; e2e servers were Playwright-managed and closed with each run. Nothing from this seat is left running.
