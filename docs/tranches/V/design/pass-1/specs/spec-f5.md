# V · pass-1 · SPEC — Family 5 · STRANGLER-BY-GATE

**Pass 1 · SYNTHESIZE · 2026-07-13 · author: pass-1 synthesizer.**
**No dedicated F5 research artifact exists on disk** (the fan-out misrouted; F5 + a dedicated r7/r8
cross-cut went uncovered). This spec is SYNTHESIZED from the cross-cutting gate findings the sibling
probes explicitly handed off to F5 — `r1` (the library-applicable gate matrix), `f2`/`p1` (the
runtime-edge caveat + dead-code union caveat), `t4` (the grammar-fuzz gate to ADD), `f4`/`r4` (the
diagnostics-wired gate), `f6` (the gate-to-hold-the-line-after-the-leap), + portfolio A4 (the gate cull).
Every number is traced to its source probe; none invented. Mechanism concrete for D1–D4; no ranking.

---

## §0 The mechanism (what structure is DERIVED FROM)

**ENFORCEMENT-FIRST PROCESS.** Do NOT move files first. WRITE the born-RED structural gates, let them
fail LOUDLY against today's tree (they WILL), then strangle violations wave-by-wave until green. The gate
is the source of truth; layout converges to satisfy it. This is the **strangler** pole of the charter's
"strangler vs big-bang" axis (F5 vs F6).

**The two central tensions this family MUST reconcile up front** (both from the owner's §0 verbatim):
1. **The owner wants FEWER gates** ("the vast majority of our gates are overfit nonsense"). ADDING a
   battery is adversarial. **Reconciliation**: net gate count FLAT-or-DOWN via REPLACE-not-ADD — excise
   the overfit gates (`barrel-parity`, `close-ledger`, the 2 clear OVERFIT candidates in the re-grown
   10-gate `test:dist`) and add the structural ones in their place; cap the count with a META-gate that
   turns the owner's complaint into an enforceable ceiling.
2. **"NO dual paths, clean breaks."** Strangler tolerates a transient HALF-MIGRATED state — collides with
   the edict. **Reconciliation**: each wave lands a COMPLETE sub-tree (a whole feature/capsule), never a
   partial file — "strangler" here = feature-by-feature complete landings gated green, not file-by-file
   dual-path.

---

## §1 The gates that born-RED TODAY (measured, per source probe)

| gate | asserts | RED today? | source |
|---|---|---|---|
| **`proof:barrel-pure`** (AUTHORED — glass-ui's PROPOSED-not-on-disk G8) | no barrel mixes own runtime with `export … from` | **RED** — `src/index.ts` (23 own+36 re), `parsing/index.ts` (644 L, 11 own, 0 re), `units/index.ts` (451, 5 own) | r1 gap a / survey #4 |
| **`proof:barrel-cycle`** (G4 cycle arm) | no runtime SCC through a barrel | **RED** — src 2 runtime SCCs / 20 nodes | f2/p1 |
| **god-module 500-ceiling** | >500 raw lines (shader-literal + pure-data-manifest exempt) | **RED** — 14 src files (`style-names.ts` 641 EXEMPT pure-data) | survey A3 |
| **`@`-alias-ban** (D1 abrogation; the `no-tier-literal`/`no-glass-in-dist` ANALOG) | 0 `@components\|@lib\|@composables\|@utils` import specifiers | **RED** — 351 sites | f6 |
| **`proof:grammar-fuzz`** (AUTHORED — the one gate D3 ADDS) | the 11 A6 inputs round-trip against a browser/spec oracle | **RED** — #9/#11 open | t4 |
| **`proof:diagnostics-wired`** (AUTHORED) | the public parse entries forward/surface the sink | **RED** — 0 sink refs | f4/r4 |
| **`proof:colocation-globality`** (G1) | globality (T3 ≥2 UNRELATED families) + no-empty-segment (T4) | **RED** — 86–88% of 42 demo globals mis-filed | f3 (with CC-5 overlay) |
| **`no-root-png`** (D4) | 0 loose root `*.png` | **RED** — 39 PNGs | A4 |
| `proof:import-boundaries` (G4) | api 4-node DAG (`subpaths/*` exempt) | **GREEN** (wire STANDING) | r1/f2 |
| `proof:backend-structure` (G9) | 500 · grab-bag · layer-by-type · depth | **GREEN** (0 viol) — wire STANDING | r1 RAN it |
| `proof:depth` (G3) | T2 segment-under-segment; ≤5 below feature root | verify | r1 gap a |

## §2 · D1 — demo/ frontend

`@`-alias-ban gate + `proof:colocation-globality`; demo restructure driven by making the gate pass
**feature-by-feature** (complete-subtree waves — tension 2). **CC-5 fold**: the globality gate counts
edges, but T3 asks "≥2 UNRELATED families" — a semantic overlay the gate cannot compute alone; wire F3's
consumer census (or a curated family map) as the gate's family-relatedness input, else it mis-colocates
public leaves / mis-promotes single-family utils.

## §3 · D2 — api/ backend

`proof:import-boundaries` + `proof:backend-structure` both already GREEN (r1 RAN backend-structure = 0
violations) → wire as STANDING. No strangling needed; D2 is a hold-the-line surface.

## §4 · D3 — src/ library

`proof:barrel-pure` + the 500-line ceiling + `proof:grammar-fuzz` (seeded with the A6 corpus) +
`proof:diagnostics-wired` — all born-RED today; strangle wave-by-wave.
- **CC-1 fold (load-bearing)**: `proof:barrel-cycle` MUST run on **RUNTIME edges only** (`import type`
  erased under `verbatimModuleSyntax:true`) — wired to raw madge it fires 23 RED for 2 real SCCs and
  blocks on build-erased type cycles. Use the deterministic runtime-vs-type-edge scanner (CC-4), not
  raw madge, as the gate's engine.
- **CC-2 fold**: a dead-code gate MUST union `{product ∪ test ∪ e2e ∪ build}` reachability — else it
  RED-flags `units/color/conversions/index.ts` (test-only-alive) as dead.

## §5 · D4 — repo hygiene (the REPLACE arithmetic)

Cull driven by a `no-root-png` gate + a META-gate capping the gate count. **The net move**: excise
`barrel-parity` + `close-ledger` (OVERFIT), add `barrel-pure` + `grammar-fuzz` → `test:dist` gate count
stays FLAT (10 → 10) or drops, satisfying the owner's cull while gaining the structural coverage. KEEP the
5 Q13 behavioral gates (`css-parity`, `round-trip-idempotent`, `perf-target`, `serialize-fidelity`,
`subpath-budget`). **CC-2 sibling (from r1/lane-beta)**: cull ceremony + dead legacy, NEVER real
correctness fallbacks.

---

## §6 · The unresolved idiom question (CC-10 — must be settled in prototype)

F5's gap (a): can the `@`-ban be a pure eslint `no-restricted-imports` rule (cheap, no script)? This
DIRECTLY conflicts with glass-ui §0.5.12 "every structural gate is a device-free born-RED `proof:*`
script, NEVER ESLint." The two poles: eslint is cheaper + IDE-integrated but is the idiom glass-ui bans;
`proof:*` is the constellation idiom but heavier. **Prototype must decide empirically** (write both, compare
RED-fidelity + false-positive rate on the 351 sites).

## §7 · What the pass-2 prototype MUST demonstrate (measured, isolated worktree)

1. **Author + RUN `proof:barrel-pure`** (device-free `.mjs`) → RED on exactly `src/index.ts`,
   `parsing/index.ts`, `units/index.ts` (assert the 3-file set).
2. **Author + RUN `proof:barrel-cycle` on RUNTIME edges** (CC-1) → RED on the 2 src SCCs, and PROVE it
   does NOT fire on the 17 type-only edges (the deflation is the whole point).
3. **Author + RUN `proof:grammar-fuzz`** seeded with the 11 A6 inputs → RED on #9/#11, GREEN on the 9 closed.
4. **Demonstrate the REPLACE arithmetic**: remove `barrel-parity` + `close-ledger`, add `barrel-pure` +
   `grammar-fuzz`; show `test:dist` gate count 10 → 10 (flat) with the structural coverage gained.
5. **Settle CC-10 empirically**: implement the `@`-ban both as eslint `no-restricted-imports` AND as a
   `proof:*` script; compare on the 351 sites (RED count, false positives, `.vue`-coverage).

## §8 · Honest current weaknesses

- **Gates enforce SHAPE not SENSE** — a tree can be gate-green and still incoherent.
- **The owner explicitly wants FEWER gates** — adding a battery is adversarial; mitigated ONLY by the
  strict REPLACE-not-ADD discipline (§5) + the META-gate ceiling.
- **Strangler's transient dual-state collides with "clean break, no dual paths"** — mitigated ONLY by
  complete-subtree waves (§0 tension 2), which erodes the incrementality that is strangler's whole point.
- **`proof:colocation-globality` cannot compute T3 alone** (CC-5) — needs a semantic family overlay.
- **The eslint-vs-`proof:*` idiom tension is unresolved** (CC-10) — a genuine fork, not a detail.

## §9 · Composition (facts, NOT a ranking)

F5 answers **HOW** (the strangler execution pole + the standing enforcement), not WHAT tree. It composes
with a shape family (F1/F2/F3/F4) that supplies the target, and it is the natural gate-battery that holds
the line AFTER an F6 big-bang leap (f6 §6 names exactly this: "one shape thesis × F6 execution × a minimal
F5 born-RED gate to hold the line"). **Convergence facts**: F5's gate battery IS glass-ui's G1–G10
re-parameterized (r1) minus the UI-only CSS gates; its `barrel-pure` + `barrel-cycle` gates enforce the
same carve F1/F2/F4 reach by other derivations; its `grammar-fuzz` + `diagnostics-wired` gates enforce
F4's D3 payload.
