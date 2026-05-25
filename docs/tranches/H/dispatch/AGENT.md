# H tranche — agent dispatch (deltas vs G)

H inherits **G's hardened dispatch contract verbatim** (`docs/tranches/G/dispatch/AGENT.md`, which itself inherits F + E + D + B). This doc carries only the H-specific deltas; binding clauses (hardened git, runtime evidence, worktree-base pinning, build hygiene, sub-gates, proof docs, hard caps, prose) are unchanged.

## H1-H4 — invariants added (`H.md §2`)

### H1 — Cascade-correctness completion (binding)

Every cross-collection write in `api/` MUST be wrapped in `services.withTransaction(async (session) => { ... })`, with `session` threaded through every repository call inside the block. The G.W3 Lane E expansion (3→7 sites) was non-exhaustive — H.W1 Lane A repairs the `createPalette` + `patchPalette` defect (`api/src/services/palette/crud.ts:101-119, 139-184`) and Lane C lands the standing `audit/api-withTransaction-coverage.md` audit-list that prevents the regression class.

### H2 — `as unknown as` corpus retires (target ≤ 3)

Sharpens G2 (`as any` ≤ 5). The 4-site `as unknown as` residue retires to ≤ 3 via the H.W2 Lane A typed `XYZ_FUNCTIONS` mapped-type (the same idiom G.W2 Lane B applied to `DIRECT_PATHS`). The remaining 3 are policy-documented + codified by `proof:as-unknown-as-budget` (H.W2 Lane B; budget = 3).

### H3 — Demo decomposition (no god module in `demo/`)

Every `demo/` file ≤ 400 LoC. `demo/@/lib/palette/api.ts` (484 LoC) decomposes into 8 cohesion-honest modules (H.W3 Lane A); a `demo/` god-module audit (H.W3 Lane B) surfaces + remediates any other ≥ 400 LoC file. G3's ≤ 350 LoC is the `src/` discipline; `demo/`'s ≤ 400 LoC mirrors the standing-mandate ceiling.

### H4 — Cross-tree invariant codification

Extend the proof-script suite to their full applicability — `proof:no-bare-builtins` to `plugins/` + `scripts/` + `bench/` (fixing the one outlier in `plugins/vite-source-export.ts:2`); `proof:no-ts-ignore` to `demo/` (closing the 2 hits in `useMarkdownHighlighting.ts` via a `*.css?inline` module declaration); `proof:as-unknown-as-budget` (NEW); `api/tsconfig.json` strictness lifted to root parity (4 missing flags).

## Cross-repo writes — H default ZERO

Per `H.md §5` file ownership: H makes ZERO cross-repo writes by default. The R11 keyframes.js peer commit `470814e` stays LEAVE LOCAL per user ratification at G open. **AL coordination** (speedtest's open tranche) is informational/briefing-only — H may surface value.js's sole-identified-consumer stake in `glass-ui/MetaballCanvas` via prose, never via a write into a sibling repo.

F3 invariant inherited verbatim.

## Worktree-base pinning — RECONFIRMED LIMITATION

Per the G.W2 Track-2 incident: the harness `isolation: "worktree"` bases off `master` HEAD, not the working-branch HEAD. **Do NOT use `isolation: "worktree"` for tranche-h-pinned agents.** Track-2-style isolation is unavailable; file-disjoint parallelism in the main tree is the correct posture (with sequential ordering where the build/dist contends).

## H.W5 release (release version TBD)

H.W5 lands the close ceremony + a vN.N.N tag. Per `H.md §7 Ratification block E`:
- **Default (i)**: v0.10.0 — idiomatic semver-minor bump.
- **Alternative (ii)**: v1.0.0 — declare stable public API (the H thesis closing + G's foundation may justify it; tranche-architecture decision).

Pre-merge gate matrix at H.W5 extends G's 21-item matrix with 1 H-NEW:
- G's 21 inherited.
- H-NEW: `npm run proof:as-unknown-as-budget` GREEN (budget ≤ 3).

Plus the extensions (no new gates, just broader scope):
- `proof:no-bare-builtins` now covers `plugins/` + `scripts/` + `bench/` in addition to `api/src/`.
- `proof:no-ts-ignore` now covers `demo/` in addition to `src/`.

Total H.W5 pre-merge matrix: **22 items**.

## Parallelism

- H.W0: 6 audit lanes (DONE) + substrate authoring (orchestrator).
- H.W1: 3 lanes (A api/services/palette/crud.ts, B api/tsconfig.json, C audit-list doc). A + C parallelizable; B is small. Largely sequential within `api/`.
- H.W2: 3 lanes (A typed XYZ_FUNCTIONS, B proof:as-unknown-as-budget, C type-predicate). Share `src/units/color/` — sequential.
- H.W3: 5 lanes. A (`demo/@/lib/palette/`) ⊥ B (any demo/ god-module) ⊥ C (`demo/@/components/custom/color-picker/`) ⊥ D (`demo/color-picker/vite.d.ts` + `useMarkdownHighlighting.ts`) ⊥ E (`plugins/` + `scripts/` proof-script edits). 3-4-way parallel feasible.
- H.W4: 5 lanes — all file-disjoint (`vite.config.ts` ⊥ `bench/` ⊥ `e2e/smoke-reactivity/` ⊥ `.github/workflows/node.js.yml` ⊥ `CONTRIBUTING.md`). 5-way parallel feasible.
- H.W5: 7 close-audit lanes (read-only parallel) + close ceremony writes (orchestrator).

## CW Phase-2 (not in H scope; INFORMATIONAL)

Per `coordination/Q.md §4`: speedtest does not consume value.js (G-AUDIT-4 §4.3). CW Phase-2 framing remains INFORMATIONAL; H does not activate.
