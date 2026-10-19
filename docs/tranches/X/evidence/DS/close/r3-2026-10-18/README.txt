X-DS CLOSE r3 (2026-10-18/19): gate evidence. Kernel zone 4.9M at start (rebooted after r2).
Heads: value.js d6628be70 (tranche-u), keyframes.js 35e64f63 (master), fourier 75182fb (m/w1-bump-migration).
gates.sh ran every gate x2 serially, each through ~/.claude/guard/guarded (gates.log).
value.js: detached worktree at HEAD with APFS clones of node_modules (other seats' dirty hunks excluded).
  typecheck 0 x2; vitest 1253/1253 x2;
  e2e smoke+smoke-admin+smoke-mobile (headless, workers 1, own server :9293): run 1 317 passed / 17 failed / 2 skipped,
  run 2 318 / 16 / 2. Both runs: the 15 X-W10 cells (W10-ADDENDUM-2026-10-16-cprime.md §1: o18 x6, o19 x4, o23:225,
  o26, o28, webgl-blob-idle:210 x2) + admin-walk (the value pass-18..20 carry). Run 1 only: webgl-blob.spec.ts:13
  (canvas not attached at boot; passed in run 2).
keyframes.js: check 0 x2 and lint 0 x2 and library tests 1295 passed / 2 expected-fail / 14 skipped x2 in a detached
  worktree at HEAD. The demo project could NOT be gated in a worktree: with cloned node_modules (nested, and unnested
  in the session scratchpad, with and without the cloned .vite cache) 247/941 failed x2 on a second Vue realm
  (renderSlot "reading 'ce'" via an absolute path into the main tree's node_modules); with a symlinked node_modules
  920/920 passed but one file (playback-ribbon-contract) could not load its vi.mock path. These are discarded as gate
  reads (worktree-discarded/, cloned-node-modules-discarded/; build-lib.log = the dist built for the first retry).
  The demo project was then run on the LIVE tree, as every r9 cure seat did: 941/941 (155 files) x2
  (test-demo-live-1/2.log). The live tree carries another seat's uncommitted hunks in ControlsPaneWrapper.vue,
  KeyframeTimeline.vue and SpringHeatmap.vue; this seat did not touch them. keyframes has no e2e suite.
fourier: in place (clean at HEAD). vue-tsc -b 0 x2; vitest 116/116 x2; full web/e2e chromium + mobile-chromium,
  headless, workers 1, own API :8023 (COMPUTE_CONCURRENCY=1) behind a private vite :3233: run A 529 passed / 1 failed /
  3 skipped, run B 529 / 1 / 3. The one red each run is f-w14u-d d2 (A: 390 dark, B: 1440 dark): the canvas dock never
  reports `collapsed` - the recorded flake since fourier pass 3 (fourier.md), a dock-collapse row on O-88.
All worktrees removed; servers stopped; no golden re-baselined.
