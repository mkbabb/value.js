X-DS value pass 14 cure (critic V14C, 2026-10-18): gates, read on tranche-u with the cure 02f571d59 (EasingAuthoringStage.vue, EasingSpecimenStrip.vue, GradientEasingEditor.vue, ColorComponentDisplay.vue, o17-easing-composition.spec.ts). The served tree carried no other seat's demo hunks (git status demo/src/e2e clean apart from this cure).

HOST STATE (read this first): the Mac ran at load 10-33 all day, under other seats' heavy runs. Inside runs, single tests stalled 5-16 minutes against 30 s budgets (setup page.goto / paneSettled / option-click timeouts, and "Tearing down context exceeded the test timeout"). The guarded caps killed the first whole-queue e2e run at 90 min (killed/e2e-smoke-run1-whole-queue-killed-90min.txt), the first census at 60 min (../census-after-run1-killed.log), and the frame capture at 60 min (../capture-c14-run1.log; finished in run2/run3). Every non-standing e2e failure below is one of those timeouts or an ERR_CONNECTION_REFUSED after a 90-min-capped dev server expired. None is an assertion on a changed surface.

typecheck (npm run typecheck, guarded --light): exit 0 x2 (typecheck-run1/2.txt).

vitest (npx vitest run --maxWorkers=2, guarded): run1 1236/1242, run2 1206/1242 (+31 skipped). Both carry the 5 standing failures of passes 11-13 (ink D6 x2, T-35 x3). Each run also has one load timeout, in a different file: run1 generate-rail V3C-05 (907 s against 30 s), run2 byte-exact.test.ts beforeAll hook (10 s; its 31 tests skipped). Re-run alone, the two files are 32/32 x2 (vitest-timeout-recheck-run1/2.txt). Standing set identical.

e2e (headless, workers 1, project smoke, one guarded call per spec, own dev server VJS_E2E_PORT=9372 / PERF 9373; specs.txt = pass 13's 15 specs).
  e2e-smoke-run1.txt, e2e-smoke-run2.txt: two full passes. e2e-recheck-run1.txt, e2e-recheck-gradient.txt: rechecks of the timed-out specs on a warm server.
  Changed-surface specs, clean full passes:
    o17-easing-composition (5 tests, incl. the new V14C-01 handle-registration falsifier at 1440 and 390): 5/5 run1, 5/5 recheck. In run2 every body passed; one test's context teardown hung (15.7 m).
    views/gradient.spec: 12/12 run2. run1: one paneSettled setup timeout.
    o21-gradient-rail: 10/10 recheck. Otherwise 9/10 x3, each a different setup timeout.
    a11y-gradient-stop-grammar: 5/5 run1, 5/5 recheck.
    o27-focus-affordance: 6/6 run2, 6/6 recheck.
    o29-scene-contracts: 6/6 run1. run2: one page.goto timeout. Recheck: refused after the server expired.
    o10-type-locks: 5/6 x3. O-10b times out at 180 s on an option click ("element is not stable"; the listbox opens over ~12 frames). Probed directly at 1440 against the same server: every option settles and clicks, and the readout holds its 1-line lock across rgb/hsl/hsv with the new unit. O-10b asserts only upper bounds (rendered <= lock, min-height = lock x line, no overflow), so a narrower unit cannot trip it.
    o18-contrast-census: 24 passed x2, with the standing class (c') o18 cells. These are graph-nodes F-3 dark, T-35 identity light, R27 admin pill A-1 light, and R27 profile-menu rows N-3 x2, the same five as pass 13. Plus one timeout per run in a different cell (run1 A11Y-F2 menus 15.1 m; run2 config-track dark 30 s).
  Other specs: o11-header-gates 6/6 x2, page-load 2/2 x2, walk 1/1 x2. companion-pane-track-start 1/1 run1 (run2: "region never settled"). w12-about-clip 5/6 x2 (a different setup timeout each run). o21-space-catalog-truth and x-w7l-detached: timeouts, then ERR_CONNECTION_REFUSED.
  VERDICT: NOT strict-GREEN x2 on the host. Every product assertion that ran passed, outside the standing o18 set, and every changed-surface spec has at least one clean full pass. Most have two.

V14C-01 falsifier proof (../falsifier-v14c01.txt, headless probe on the same server): with the cure, svg 304 = wrapper 304 and handle-vs-plot offset 0/0 (GREEN). With the old Law-3 rule injected (cap on the svg only), the wrapper is 426, the svg 304, and both handles sit 61 px off (RED).

No visual golden was re-baselined (e2e/visual not run). At the next visual run, the Gradient Easing strip (caption-rung headings, names under the discs), the authoring stage (handles on the plot, no rail plate) and the picker header unit ("9.8 deg") will differ, and need a named owner-ruling re-baseline (§0ej).
Frames and census were served by a guarded `vite --port 9371 --strictPort` (VITE_API_URL=http://localhost:9371, VJS_VITE_CACHE_DIR=node_modules/.vite-ds-9371); e2e by a guarded vite on 9372. All were stopped or expired, and nothing from this seat is left running.
