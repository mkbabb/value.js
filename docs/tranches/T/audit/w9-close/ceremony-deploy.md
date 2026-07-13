# T close — the ceremony deploy record (2026-07-13)

**The deploy leg of the owner-gated close (`FINAL.md §8.1`), executed and verified.**

## The chain, honestly

1. **Close CI on master `e97a9d1`** (run `29230557187`): `build-and-test (22)` GREEN ·
   `e2e-smoke` GREEN · **`build-and-test (24)` RED twice** (initial + `--failed` rerun) on
   `proof:perf-target` C2-stylesheet — ratio **0.0189 < 0.02** floor while the SAME gate on the
   SAME code passed the node-22 leg both times. Two consecutive node-24 fails against node-22
   greens reads as **node-24 systematic marginality of the ratio floor** (a faster V8
   `JSON.parse` normaliser deflates the ratio), not re-rollable noise — **fresh evidence for
   U-F14** (the perf-ratio flake floor re-anchor, U.W-PERF's named row). No gate weakened.
2. **The designed manual lane fired** (`FINAL.md §8.1`: CI-red → `workflow_dispatch` ships the
   close, recorded): deploy run `29232912462`.
3. **The deploy LANDED**: CF Pages **Production** deployment `ecb75c0b-4e3d-419a-83aa-e6a4f974df9c`,
   branch `master`, source `e97a9d1` (the wrangler `pages deployment list` table is the record).
4. **Custom-domain lineage verified live**: `color.babb.dev` serves `index-D9U9KwTn.js` ==
   the `ecb75c0b` deployment's asset, ≠ the prior 6-day-old Production (`7573d1fb` @ `80c5888`,
   `index-ByclGIr5.js`). **Prod serves the T close.**
5. **The run still concluded `failure` — an ORACLE false-negative, not a deploy failure**: the
   O-25 step asserts `grep "$SHORT"` with `SHORT="${BUILT_SHA:0:8}"` (8 chars, `e97a9d1d`) but
   wrangler **4.110.0** prints 7-char Source shas (`e97a9d1`) → no match → `STALE-PROD` error
   over a good deploy. **Root-fixed in this commit**: `SHORT="${BUILT_SHA:0:7}"` (git's own
   short width; matches the wrangler display). The auto-deploy resumption condition remains as
   designed: CI green (the F14 re-anchor is U.W-PERF's row).

## Verdict

**Deploy leg GREEN** — Production == the close sha, verified at the deployment URL AND the
custom domain. The two reds in the chain were (a) the known U-F14 ratio-floor marginality
(booked, evidence extended) and (b) the O-25 sha-width format drift (root-fixed here). Neither
was laundered; no gate was weakened to ship.

*Companion records: `ceremony-sweep.md` (the 12-worktree sweep) · `e2e-merged-tree.md` (the
merged-tree suite, GREEN-modulo, on `tranche-u`).*
