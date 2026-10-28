X-DS value pass 19 cure (critic V19C, 2026-10-18): gates, read on tranche-u with the cure 98aca278a (21 paths).

HOST STATE: load 15-19; other seats committing to tranche-u during the run.

typecheck (npm run typecheck, guarded --light): exit 0 x2.

vitest (npx vitest run --maxWorkers=2, guarded):
  run 1: 1245/1253. The standing 5 (test/ink.test.ts D6 x2, T-35 x3) plus 3 new:
    admin-crud row 3 found the Users Refresh by its visible word "Refresh", which V19C-04 removes by design
      (Refresh is now the named icon button of all four consoles). Re-read by its accessible name
      "Refresh users" (named spec re-baseline in 98aca278a); GREEN after (12/12 alone).
    plate-mass x2 at 390: "Execution context was destroyed" / a null card in its browser harness (a page
      navigation mid-evaluate). Not reproduced in runs 2 and 3.
  run 2: 1248/1253, the standing 5 only (the re-read leg passes).
  run 3 (after e2e, final tree): 1253/1253 (the standing 5 now pass on HEAD, which carries other seats' commits).

e2e (headless, workers 1, one guarded call per spec, own server pair VJS_E2E_PORT=9492 / PERF 9493; specs.txt; run-gates.sh):
  o15-dock-register 6/6 x2. w12-dock 6/6 x2. page-load 2/2 x2. views/gradient 12/12 x2. w12u-x-admin-tags 6/6 x2.
  o21-space-catalog-truth 1/1 x2.
  o17-easing-composition: runs 1 and 2 4/5, the desktop leg timing out on the interval-head click (pass 18's
    run-1 signature). A/B on the pre-cure demo passed (ab-head/o17-...); re-run on the cure: 5/5 and 5/5
    (e2e-o17-rerun-a.txt, -b.txt). Load flake, not the cure.
  o23-specimen-gamut-honesty: RED x2 on the HSL row ("hsl channel 1 printed 0 against -12.95"), a CSS-form row
    V19C-07 does not touch. A/B: identical failure with every pass-19 demo path restored to its pre-cure bytes
    (ab-head/o23-...-HEAD-demo.txt). Pre-existing; carried.
  o18-contrast-census: run 1 25/30, run 2 24/30. The four standing rows (F-3 graph nodes dark, T-35 identity
    light, N-3 profile menu rows light+dark) plus A-1 (the admin pill): RED light in run 1, light+dark in run 2,
    each with ink == ground and stack [] (the pass-17 instrument fault: it does not composite the band's
    .dock-plate). The frame witness reads the admin word at 5.46 default light, 5.16 owner-brown light,
    4.78 / 5.05 dark (v19.json dockInk).
  smoke-admin (whole project): 24/25 x2. admin-walk RED in both runs (no route H1 after hash navigation),
    the pass-18 carry; A/B on the pre-cure demo fails the same way (ab-head/admin-walk-HEAD-demo.txt).
No visual golden was re-baselined (e2e/visual not run by this seat).
Frames, witnesses and census were served by a guarded `vite --port 9491 --strictPort`
(VITE_API_URL=http://localhost:9491, VJS_VITE_CACHE_DIR=node_modules/.vite-ds-9491), stopped after use.
Nothing from this seat is left running.
